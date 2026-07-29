import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../navigator";
import { ReadiumSpeechUtterance } from "../utterance";
import { ReadiumSpeechVoice } from "../voices/types";
import { mapServerVoice } from "./speechServerVoiceMapping";
import { SpeechServerError, toSpeechServerError } from "./errors";
import { SpeechServerSynthesizeBoundaryResponse, SpeechServerTimingMark, SpeechServerVoice } from "./types";

export interface SpeechServerEngineOptions {
  baseUrl: string;
  fetch?: typeof fetch;
  // Utterances to keep pre-fetched ahead of playback (buffer depth, not concurrency — requests are chained one at a time).
  prefetchWindow?: number;
}

const DEFAULT_PREFETCH_WINDOW = 3;

interface SynthesizeResult {
  audioUrl: string;
  format: string;
  boundaries: SpeechServerTimingMark[] | null;
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function mimeTypeForFormat(format: string): string {
  switch (format) {
    case "mp3":
      return "audio/mpeg";
    case "opus":
      return "audio/ogg";
    case "wav":
    default:
      return "audio/wav";
  }
}

// <audio>.playbackRate distorts or silently clamps outside ~0.25-4 in most engines.
function clampPlaybackRate(rate: number): number {
  return Math.max(0.25, Math.min(4, rate));
}

function utteranceText(utterance: ReadiumSpeechUtterance | undefined): string | undefined {
  return utterance?.plain ?? utterance?.ssml ?? undefined;
}

function toErrorDetail(error: unknown): Record<string, unknown> {
  if (error instanceof SpeechServerError) {
    return { message: error.message, status: error.status, type: error.type, title: error.title, instance: error.instance };
  }
  if (error instanceof Error) {
    return { message: error.message };
  }
  return { message: String(error) };
}

export class SpeechServerEngine implements ReadiumSpeechPlaybackEngine {
  private baseUrl: string;
  private fetchImpl: typeof fetch;

  private currentVoice: ReadiumSpeechVoice | null = null;
  private voices: ReadiumSpeechVoice[] = [];
  private currentUtterances: ReadiumSpeechUtterance[] = [];
  private currentUtteranceIndex: number = 0;
  private playbackState: ReadiumSpeechPlaybackState = "idle";
  private eventListeners: Map<ReadiumSpeechPlaybackEvent["type"], ((event: ReadiumSpeechPlaybackEvent) => void)[]> = new Map();

  private speakInContentLanguage: boolean = false;
  private speakGeneration: number = 0;

  // Rolling buffer of upcoming utterances' audio, fetched one at a time via prefetchChainTail.
  private readonly prefetchWindow: number;
  private prefetchCache: Map<number, Promise<SynthesizeResult>> = new Map();
  private prefetchChainTail: Promise<void> = Promise.resolve();

  private audio: HTMLAudioElement | null = null;
  private audioObjectUrl: string | null = null;
  private boundaryMarks: SpeechServerTimingMark[] = [];
  private nextBoundaryIndex: number = 0;
  private onTimeUpdate = (): void => this.checkBoundaries();

  private rate: number = 1.0;
  private pitch: number = 1.0;
  private volume: number = 1.0;

  constructor(options: SpeechServerEngineOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.fetchImpl = options.fetch ?? fetch.bind(globalThis);
    this.prefetchWindow = options.prefetchWindow ?? DEFAULT_PREFETCH_WINDOW;
  }

  // Lets a provider that already fetched /voices seed this engine without a second request.
  setAvailableVoices(voices: ReadiumSpeechVoice[]): void {
    this.voices = voices;
  }

  loadUtterances(contents: ReadiumSpeechUtterance[]): void {
    this.clearPrefetchCache();
    this.currentUtterances = contents;
    this.currentUtteranceIndex = 0;
    this.setState("ready");
    this.emitEvent({ type: "ready" });
  }

  setVoice(voice: ReadiumSpeechVoice | string): void {
    if (typeof voice === "string") {
      const found = this.voices.find(v => v.identifier === voice || v.name === voice);
      // Not cached yet — the server accepts a raw identifier/originalName directly.
      this.currentVoice = found ?? {
        source: "server",
        label: voice,
        name: voice,
        originalName: voice,
        language: "",
        identifier: voice
      };
    } else {
      this.currentVoice = voice;
    }
    this.clearPrefetchCache();
  }

  getCurrentVoice(): ReadiumSpeechVoice | null {
    return this.currentVoice;
  }

  async getAvailableVoices(): Promise<ReadiumSpeechVoice[]> {
    if (this.voices.length > 0) {
      return this.voices;
    }

    const response = await this.fetchImpl(`${this.baseUrl}/voices`);
    if (!response.ok) {
      throw await toSpeechServerError(response);
    }
    const serverVoices: SpeechServerVoice[] = await response.json();
    this.voices = serverVoices.map(mapServerVoice);
    return this.voices;
  }

  setSpeakInContentLanguage(enabled: boolean): void {
    this.speakInContentLanguage = enabled;
    this.clearPrefetchCache();
  }

  getSpeakInContentLanguage(): boolean {
    return this.speakInContentLanguage;
  }

  speak(utteranceIndex?: number): void {
    if (utteranceIndex !== undefined) {
      if (utteranceIndex < 0 || utteranceIndex >= this.currentUtterances.length) {
        throw new Error("Invalid utterance index");
      }
      this.currentUtteranceIndex = utteranceIndex;
    }

    if (this.currentUtterances.length === 0) {
      console.warn("No utterances loaded");
      return;
    }

    this.stopAudio();
    const generation = ++this.speakGeneration;
    this.setState("loading"); // emits "loading" itself, via the state-change switch below

    void this.synthesizeAndPlay(generation);
  }

  private async synthesizeAndPlay(generation: number): Promise<void> {
    const index = this.currentUtteranceIndex;

    try {
      const { audioUrl, format, boundaries } = await this.resolveSynthesis(index);

      if (generation !== this.speakGeneration) {
        URL.revokeObjectURL(audioUrl);
        return;
      }

      this.playAudio(audioUrl, format, boundaries, generation);
      this.fillPrefetchWindow(index);
    } catch (error) {
      if (generation !== this.speakGeneration) {
        return;
      }
      this.setState("idle");
      this.emitEvent({
        type: "error",
        detail: toErrorDetail(error)
      });
    }
  }

  // Reuses a cached prefetch if one exists; a fresh fetch bypasses the prefetch chain
  // (shouldn't wait behind buffered-ahead requests), and a failed prefetch retries fresh.
  private async resolveSynthesis(index: number): Promise<SynthesizeResult> {
    const cached = this.prefetchCache.get(index);
    if (cached) {
      this.prefetchCache.delete(index);
      try {
        return await cached;
      } catch {
        // fall through to a fresh attempt
      }
    }
    return this.synthesize(index);
  }

  // Chains up to `prefetchWindow` upcoming indices onto prefetchChainTail, one at a time.
  private fillPrefetchWindow(afterIndex: number): void {
    const end = Math.min(afterIndex + this.prefetchWindow, this.currentUtterances.length - 1);
    for (let index = afterIndex + 1; index <= end; index++) {
      this.queuePrefetch(index);
    }
  }

  private queuePrefetch(index: number): void {
    if (this.prefetchCache.has(index)) {
      return;
    }
    const promise = this.prefetchChainTail.then(() => this.synthesize(index));
    this.prefetchCache.set(index, promise);
    this.prefetchChainTail = promise.then(() => undefined, () => undefined);
    promise.catch(() => {}); // avoid an unhandled rejection if nothing ever consumes this
  }

  // Revokes every buffered prefetch's blob URL once settled, and empties the cache.
  private clearPrefetchCache(): void {
    for (const promise of this.prefetchCache.values()) {
      promise.then(({ audioUrl }) => URL.revokeObjectURL(audioUrl)).catch(() => {});
    }
    this.prefetchCache.clear();
  }

  private async synthesize(index: number): Promise<SynthesizeResult> {
    const content = this.currentUtterances[index];
    const useSSML = !content.plain && !!content.ssml;
    const language = this.speakInContentLanguage ? content.language : undefined;

    // ReadiumSpeechUtterance has no prev/next fields of its own — read neighbors from the queue.
    const prevUtterance = utteranceText(this.currentUtterances[index - 1]);
    const nextUtterance = utteranceText(this.currentUtterances[index + 1]);

    const response = await this.fetchImpl(`${this.baseUrl}/synthesize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: content.id,
        text: utteranceText(content) ?? "",
        ssml: useSSML,
        language,
        voice: this.currentVoice?.identifier ?? this.currentVoice?.name,
        prev_utterance: prevUtterance,
        next_utterance: nextUtterance,
        boundary: true,
        output: { speed: this.rate, pitch: this.pitch }
      })
    });

    if (!response.ok) {
      throw await toSpeechServerError(response);
    }

    const json: SpeechServerSynthesizeBoundaryResponse = await response.json();
    const buffer = base64ToArrayBuffer(json.audio);
    const blob = new Blob([buffer], { type: mimeTypeForFormat(json.format) });
    const audioUrl = URL.createObjectURL(blob);

    return { audioUrl, format: json.format, boundaries: json.boundaries };
  }

  private playAudio(url: string, _format: string, boundaries: SpeechServerTimingMark[] | null, generation: number): void {
    const audio = new Audio(url);
    this.audio = audio;
    this.audioObjectUrl = url;
    this.boundaryMarks = boundaries ?? [];
    this.nextBoundaryIndex = 0;

    audio.volume = Math.max(0, Math.min(1, this.volume));
    // Only fake the rate locally when the server won't honor output.speed itself, else it'd double up.
    const speedHonoredByServer = this.currentVoice?.controls?.speed === true;
    audio.playbackRate = speedHonoredByServer ? 1 : clampPlaybackRate(this.rate);

    audio.addEventListener("timeupdate", this.onTimeUpdate);

    audio.onended = () => {
      if (generation !== this.speakGeneration) {
        return;
      }
      this.checkBoundaries();
      if (this.currentUtteranceIndex >= this.currentUtterances.length - 1) {
        this.setState("idle");
      }
      this.emitEvent({ type: "end" });
    };

    audio.onerror = () => {
      if (generation !== this.speakGeneration) {
        return;
      }
      this.setState("idle");
      this.emitEvent({ type: "error", detail: { message: "Audio playback failed" } });
    };

    this.setState("playing");
    this.emitEvent({ type: "start" });
    void audio.play();
  }

  private checkBoundaries(): void {
    const audio = this.audio;
    if (!audio) {
      return;
    }
    while (
      this.nextBoundaryIndex < this.boundaryMarks.length &&
      audio.currentTime >= this.boundaryMarks[this.nextBoundaryIndex].elapsedTime
    ) {
      const mark = this.boundaryMarks[this.nextBoundaryIndex];
      this.emitEvent({
        type: "boundary",
        detail: {
          name: mark.name,
          charIndex: mark.charIndex,
          charLength: mark.charLength,
          elapsedTime: mark.elapsedTime
        }
      });
      this.nextBoundaryIndex++;
    }
  }

  private stopAudio(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.removeEventListener("timeupdate", this.onTimeUpdate);
      this.audio.src = "";
      this.audio = null;
    }
    if (this.audioObjectUrl) {
      URL.revokeObjectURL(this.audioObjectUrl);
      this.audioObjectUrl = null;
    }
    this.boundaryMarks = [];
    this.nextBoundaryIndex = 0;
  }

  pause(): void {
    if (this.playbackState === "playing" && this.audio) {
      this.audio.pause();
      this.setState("paused");
      this.emitEvent({ type: "pause" });
    }
  }

  resume(): void {
    if (this.playbackState === "paused" && this.audio) {
      void this.audio.play();
      this.setState("playing");
      this.emitEvent({ type: "resume" });
    }
  }

  stop(): void {
    this.speakGeneration++;
    this.stopAudio();
    this.clearPrefetchCache();
    this.currentUtteranceIndex = 0;
    this.setState("idle");
    this.emitEvent({ type: "stop" });
  }

  setRate(rate: number): void {
    this.rate = Math.max(0.1, Math.min(10, rate));
    this.clearPrefetchCache();
  }

  getRate(): number {
    return this.rate;
  }

  setPitch(pitch: number): void {
    this.pitch = Math.max(0, Math.min(2, pitch));
    this.clearPrefetchCache();
  }

  getPitch(): number {
    return this.pitch;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  getVolume(): number {
    return this.volume;
  }

  getState(): ReadiumSpeechPlaybackState {
    return this.playbackState;
  }

  getCurrentUtteranceIndex(): number {
    return this.currentUtteranceIndex;
  }

  setCurrentUtteranceIndex(index: number, onComplete?: (success: boolean) => void): void {
    if (index < 0 || index >= this.currentUtterances.length) {
      onComplete?.(false);
      return;
    }
    if (index === this.currentUtteranceIndex) {
      onComplete?.(true);
      return;
    }

    this.stopAudio();
    this.currentUtteranceIndex = index;
    onComplete?.(true);
  }

  getUtteranceCount(): number {
    return this.currentUtterances.length;
  }

  on(event: ReadiumSpeechPlaybackEvent["type"], callback: (event: ReadiumSpeechPlaybackEvent) => void): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);

    return () => {
      const listeners = this.eventListeners.get(event);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    };
  }

  private emitEvent(event: ReadiumSpeechPlaybackEvent): void {
    const listeners = this.eventListeners.get(event.type);
    if (listeners) {
      listeners.forEach(callback => callback(event));
    }
  }

  private setState(state: ReadiumSpeechPlaybackState): void {
    const oldState = this.playbackState;
    this.playbackState = state;

    if (oldState !== state) {
      switch (state) {
        case "idle":
          this.emitEvent({ type: "idle" });
          break;
        case "loading":
          this.emitEvent({ type: "loading" });
          break;
        case "ready":
          this.emitEvent({ type: "ready" });
          break;
      }
    }
  }

  async destroy(): Promise<void> {
    this.stop();
    this.eventListeners.clear();
    this.currentUtterances = [];
    this.currentVoice = null;
    this.voices = [];
  }
}
