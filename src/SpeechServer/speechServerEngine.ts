import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../navigator";
import { ReadiumSpeechUtterance } from "../utterance";
import { ReadiumSpeechVoice } from "../voices/types";
import { mapServerVoice } from "./speechServerVoiceMapping";
import { toSpeechServerError } from "./errors";
import { SpeechServerSynthesizeBoundaryResponse, SpeechServerTimingMark, SpeechServerVoice } from "./types";

export interface SpeechServerEngineOptions {
  baseUrl: string;
  fetch?: typeof fetch;
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

// <audio>.playbackRate has no reliable browser-enforced range; most engines
// distort or silently clamp outside ~0.25-4.
function clampPlaybackRate(rate: number): number {
  return Math.max(0.25, Math.min(4, rate));
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
  }

  // Lets a provider that already fetched /voices seed this engine without a second request.
  setAvailableVoices(voices: ReadiumSpeechVoice[]): void {
    this.voices = voices;
  }

  // Queue Management
  loadUtterances(contents: ReadiumSpeechUtterance[]): void {
    this.currentUtterances = contents;
    this.currentUtteranceIndex = 0;
    this.setState("ready");
    this.emitEvent({ type: "ready" });
  }

  // Voice Configuration
  setVoice(voice: ReadiumSpeechVoice | string): void {
    if (typeof voice === "string") {
      const found = this.voices.find(v => v.identifier === voice || v.name === voice);
      // Not in the cached list yet (e.g. a raw identifier set before getAvailableVoices())
      // — the server accepts a raw identifier/originalName directly, so keep it usable.
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
  }

  getSpeakInContentLanguage(): boolean {
    return this.speakInContentLanguage;
  }

  // Playback Control
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
    const content = this.currentUtterances[this.currentUtteranceIndex];

    try {
      const { audioUrl, format, boundaries } = await this.synthesize(content);

      if (generation !== this.speakGeneration) {
        URL.revokeObjectURL(audioUrl);
        return;
      }

      this.playAudio(audioUrl, format, boundaries, generation);
    } catch (error) {
      if (generation !== this.speakGeneration) {
        return;
      }
      this.setState("idle");
      this.emitEvent({
        type: "error",
        detail: error instanceof Error ? { message: error.message } : { message: String(error) }
      });
    }
  }

  private async synthesize(content: ReadiumSpeechUtterance): Promise<{
    audioUrl: string;
    format: string;
    boundaries: SpeechServerTimingMark[] | null;
  }> {
    const useSSML = !content.plain && !!content.ssml;
    const language = this.speakInContentLanguage ? content.language : undefined;

    const response = await this.fetchImpl(`${this.baseUrl}/synthesize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: content.id,
        text: content.plain ?? content.ssml ?? "",
        ssml: useSSML,
        language,
        voice: this.currentVoice?.identifier ?? this.currentVoice?.name,
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
    // Only fake the rate on playback when the voice won't honor `output.speed` itself
    // (true today for every PocketTTS voice) — otherwise a future provider that does
    // apply server-side speed would get sped up twice.
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
    this.currentUtteranceIndex = 0;
    this.setState("idle");
    this.emitEvent({ type: "stop" });
  }

  // Playback Parameters
  setRate(rate: number): void {
    this.rate = Math.max(0.1, Math.min(10, rate));
  }

  getRate(): number {
    return this.rate;
  }

  setPitch(pitch: number): void {
    this.pitch = Math.max(0, Math.min(2, pitch));
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

  // State
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

  // Events
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
