import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../navigator";
import { ReadiumSpeechUtterance } from "../utterance";
import { ReadiumSpeechVoice } from "../voices/types";
import { mapServerVoice } from "./speechServerVoiceMapping";
import { SpeechServerError, toSpeechServerError } from "./errors";
import { chunkPlainText, chunkSsmlText, TextChunk } from "./chunkText";
import { CanPlayType, mimeTypeForFormat, selectBitrate, selectFormat, SpeechServerFormatOptions } from "./selectFormat";
import {
  SpeechServerServiceInfo,
  SpeechServerSynthesizeBoundaryResponse,
  SpeechServerTimingMark,
  SpeechServerVoice
} from "./types";

// navigator.connection (the Network Information API) isn't in the default lib.dom types and is
// Chromium-only — this narrow local shape avoids reaching for `any` to read it.
interface NavigatorConnection {
  connection?: { saveData?: boolean; effectiveType?: string };
}

export interface SpeechServerEndpoints {
  voices: string;
  synthesize: string;
  service: string;
}

export interface SpeechServerEngineOptions {
  endpoints: SpeechServerEndpoints;
  fetch?: typeof fetch;
  // Utterances to keep pre-fetched ahead of playback (buffer depth, not concurrency — requests are chained one at a time).
  prefetchWindow?: number;
  // Combined character count to have buffered before declaring "ready", so playback doesn't
  // outrun the buffer right after the first utterance.
  readyBufferChars?: number;
  // Over-long utterance text: split into multiple /synthesize requests ("split", default), or
  // fail fast with a SpeechServerError 413 payload_too_large ("error").
  overLengthText?: "split" | "error";
  // Output format/bitrate selection. Omit entirely to keep today's behavior (server's
  // advertised default format, no bitrate sent). See SpeechServerFormatOptions for fields.
  format?: SpeechServerFormatOptions;
}

const DEFAULT_PREFETCH_WINDOW = 3;
// ~30s of speech at an average reading pace (~150wpm, ~5 chars/word) — an unmeasured guess at
// how much buffer is needed to outlast a typical synth request, not tuned against real latency.
const DEFAULT_READY_BUFFER_CHARS = 400;

interface SynthesizedChunk {
  audioUrl: string;
  format: string;
  boundaries: SpeechServerTimingMark[] | null;
  // Character offset of this chunk's text within the original (unchunked) utterance text —
  // added to each boundary mark's charIndex so events stay relative to the whole utterance.
  textOffset: number;
}

// One utterance's synthesis result, as one or more sequential chunks (see synthesize()).
type SynthesizeResult = SynthesizedChunk[];

function revokeChunkUrls(chunks: SynthesizeResult): void {
  chunks.forEach(chunk => URL.revokeObjectURL(chunk.audioUrl));
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
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
  private endpoints: SpeechServerEndpoints;
  private fetchImpl: typeof fetch;

  private currentVoice: ReadiumSpeechVoice | null = null;
  private voices: ReadiumSpeechVoice[] = [];
  private serviceInfo: SpeechServerServiceInfo | null = null;
  private serviceInfoPromise: Promise<SpeechServerServiceInfo> | null = null;
  private currentUtterances: ReadiumSpeechUtterance[] = [];
  private currentUtteranceIndex: number = 0;
  private playbackState: ReadiumSpeechPlaybackState = "idle";
  private eventListeners: Map<ReadiumSpeechPlaybackEvent["type"], ((event: ReadiumSpeechPlaybackEvent) => void)[]> = new Map();

  private speakInContentLanguage: boolean = false;
  private speakGeneration: number = 0;
  private loadGeneration: number = 0;

  // Rolling buffer of upcoming utterances' audio, fetched one at a time via prefetchChainTail.
  private readonly prefetchWindow: number;
  private readonly readyBufferChars: number;
  private readonly overLengthText: "split" | "error";
  private readonly formatOptions: SpeechServerFormatOptions;
  private readonly canPlayType: CanPlayType;
  private prefetchCache: Map<number, Promise<SynthesizeResult>> = new Map();
  private prefetchChainTail: Promise<void> = Promise.resolve();

  private audio: HTMLAudioElement | null = null;
  private boundaryMarks: SpeechServerTimingMark[] = [];
  private nextBoundaryIndex: number = 0;
  private onTimeUpdate = (): void => this.checkBoundaries();

  // The utterance chunk sequence currently playing/paused, and which of its chunks is live.
  private currentChunks: SynthesizeResult = [];
  private currentChunkIndex: number = 0;

  private rate: number = 1.0;
  private pitch: number = 1.0;
  private volume: number = 1.0;

  constructor(options: SpeechServerEngineOptions) {
    this.endpoints = options.endpoints;
    this.fetchImpl = options.fetch ?? fetch.bind(globalThis);
    this.prefetchWindow = options.prefetchWindow ?? DEFAULT_PREFETCH_WINDOW;
    this.readyBufferChars = options.readyBufferChars ?? DEFAULT_READY_BUFFER_CHARS;
    this.overLengthText = options.overLengthText ?? "split";
    this.formatOptions = options.format ?? {};
    this.canPlayType = typeof Audio !== "undefined" ? (mime: string) => new Audio().canPlayType(mime) : () => "";
  }

  // Lets a provider that already fetched /voices seed this engine without a second request.
  setAvailableVoices(voices: ReadiumSpeechVoice[]): void {
    this.voices = voices;
  }

  loadUtterances(contents: ReadiumSpeechUtterance[]): void {
    this.clearPrefetchCache();
    this.currentUtterances = contents;
    this.currentUtteranceIndex = 0;
    this.setState("loading");
    void this.bufferUntilReady(++this.loadGeneration);
  }

  // Buffers enough leading utterances to cover readyBufferChars before declaring "ready",
  // so playback doesn't catch up to an empty prefetch cache right after the first utterance.
  private async bufferUntilReady(generation: number): Promise<void> {
    // Bounded by prefetchWindow too — the initial buffer is just the front of that same
    // lookahead, not a second, larger one.
    const targetIndex = Math.min(this.indexCoveringChars(this.readyBufferChars), this.prefetchWindow);
    const pending: Promise<SynthesizeResult>[] = [];
    for (let index = 0; index <= targetIndex; index++) {
      this.queuePrefetch(index);
      const cached = this.prefetchCache.get(index);
      if (cached) {
        pending.push(cached);
      }
    }

    try {
      await Promise.all(pending);
    } catch {
      // A failed prefetch still unblocks "ready" — the actual error surfaces when speak() retries it.
    }

    if (generation !== this.loadGeneration) {
      return;
    }
    this.setState("ready");
    this.emitEvent({ type: "ready" });
  }

  private indexCoveringChars(targetChars: number): number {
    if (this.currentUtterances.length === 0) {
      return -1;
    }
    let total = 0;
    for (let index = 0; index < this.currentUtterances.length; index++) {
      total += (utteranceText(this.currentUtterances[index]) ?? "").length;
      if (total >= targetChars) {
        return index;
      }
    }
    return this.currentUtterances.length - 1;
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

    const response = await this.fetchImpl(this.endpoints.voices);
    if (!response.ok) {
      throw await toSpeechServerError(response);
    }
    const serverVoices: SpeechServerVoice[] = await response.json();
    this.voices = serverVoices.map(mapServerVoice);
    return this.voices;
  }

  // Cached after the first successful fetch; a failed fetch isn't cached, so the next
  // synthesize() call retries rather than being stuck on a transient network error.
  private async getServiceInfo(): Promise<SpeechServerServiceInfo> {
    if (this.serviceInfo) {
      return this.serviceInfo;
    }
    if (!this.serviceInfoPromise) {
      this.serviceInfoPromise = this.fetchServiceInfo().catch(error => {
        this.serviceInfoPromise = null;
        throw error;
      });
    }
    this.serviceInfo = await this.serviceInfoPromise;
    return this.serviceInfo;
  }

  private async fetchServiceInfo(): Promise<SpeechServerServiceInfo> {
    const response = await this.fetchImpl(this.endpoints.service);
    if (!response.ok) {
      throw await toSpeechServerError(response);
    }
    return response.json();
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
      const chunks = await this.resolveSynthesis(index);

      if (generation !== this.speakGeneration) {
        revokeChunkUrls(chunks);
        return;
      }

      this.playChunks(chunks, generation);
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

  // Revokes every buffered prefetch's blob URLs once settled, and empties the cache.
  private clearPrefetchCache(): void {
    for (const promise of this.prefetchCache.values()) {
      promise.then(revokeChunkUrls).catch(() => {});
    }
    this.prefetchCache.clear();
  }

  private async synthesize(index: number): Promise<SynthesizeResult> {
    const content = this.currentUtterances[index];
    const useSSML = !content.plain && !!content.ssml;
    const language = this.speakInContentLanguage ? content.language : undefined;
    const text = utteranceText(content) ?? "";

    // ReadiumSpeechUtterance has no prev/next fields of its own — read neighbors from the queue.
    const prevUtterance = utteranceText(this.currentUtterances[index - 1]);
    const nextUtterance = utteranceText(this.currentUtterances[index + 1]);

    const serviceInfo = await this.getServiceInfo();
    const format = selectFormat(serviceInfo.output, this.formatOptions, this.canPlayType);
    const connection = (navigator as unknown as NavigatorConnection).connection;
    const bitrate = selectBitrate(format, this.formatOptions.adaptBitrateToNetwork ?? false, connection);

    if (text.length <= serviceInfo.limits.maxTextLength) {
      const chunk = await this.synthesizeChunk(content, text, 0, useSSML, language, prevUtterance, nextUtterance, format, bitrate);
      return [chunk];
    }

    if (this.overLengthText === "error") {
      throw new SpeechServerError(
        `Text exceeds this server's maximum length of ${serviceInfo.limits.maxTextLength} characters`,
        {
          status: 413,
          type: "https://readium.org/speech-server/error#payload_too_large",
          title: "Payload Too Large"
        }
      );
    }

    const textChunks: TextChunk[] = useSSML
      ? chunkSsmlText(text, serviceInfo.limits.maxTextLength)
      : chunkPlainText(text, serviceInfo.limits.maxTextLength);
    const chunks: SynthesizedChunk[] = [];
    for (let i = 0; i < textChunks.length; i++) {
      const prevText = i === 0 ? prevUtterance : textChunks[i - 1].text;
      const nextText = i === textChunks.length - 1 ? nextUtterance : textChunks[i + 1].text;
      chunks.push(await this.synthesizeChunk(content, textChunks[i].text, textChunks[i].offset, useSSML, language, prevText, nextText, format, bitrate));
    }
    return chunks;
  }

  private async synthesizeChunk(
    content: ReadiumSpeechUtterance,
    text: string,
    textOffset: number,
    useSSML: boolean,
    language: string | undefined,
    prevText: string | undefined,
    nextText: string | undefined,
    format: string,
    bitrate: number | undefined
  ): Promise<SynthesizedChunk> {
    const response = await this.fetchImpl(this.endpoints.synthesize, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: content.id,
        text,
        ssml: useSSML,
        language,
        voice: this.currentVoice?.identifier ?? this.currentVoice?.name,
        prev_utterance: prevText,
        next_utterance: nextText,
        boundary: true,
        output: { format, bitrate, speed: this.rate, pitch: this.pitch }
      })
    });

    if (!response.ok) {
      throw await toSpeechServerError(response);
    }

    const json: SpeechServerSynthesizeBoundaryResponse = await response.json();
    const buffer = base64ToArrayBuffer(json.audio);
    const blob = new Blob([buffer], { type: mimeTypeForFormat(json.format) });
    const audioUrl = URL.createObjectURL(blob);

    return { audioUrl, format: json.format, boundaries: json.boundaries, textOffset };
  }

  private playChunks(chunks: SynthesizeResult, generation: number): void {
    this.currentChunks = chunks;
    this.currentChunkIndex = 0;
    this.setState("playing");
    this.emitEvent({ type: "start" });
    this.playChunk(0, generation);
  }

  private playChunk(chunkIndex: number, generation: number): void {
    const chunk = this.currentChunks[chunkIndex];
    const audio = new Audio(chunk.audioUrl);
    this.audio = audio;
    this.boundaryMarks = chunk.boundaries ?? [];
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

      if (chunkIndex < this.currentChunks.length - 1) {
        this.currentChunkIndex = chunkIndex + 1;
        this.playChunk(chunkIndex + 1, generation);
        return;
      }

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

    void audio.play();
  }

  private checkBoundaries(): void {
    const audio = this.audio;
    if (!audio) {
      return;
    }
    const chunk = this.currentChunks[this.currentChunkIndex];
    const charOffset = chunk?.textOffset ?? 0;
    while (
      this.nextBoundaryIndex < this.boundaryMarks.length &&
      audio.currentTime >= this.boundaryMarks[this.nextBoundaryIndex].elapsedTime
    ) {
      const mark = this.boundaryMarks[this.nextBoundaryIndex];
      this.emitEvent({
        type: "boundary",
        detail: {
          name: mark.name,
          charIndex: mark.charIndex + charOffset,
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
    // Revokes every chunk of the current utterance, played or not — URL.revokeObjectURL is a
    // safe no-op on an already-revoked URL, so this also covers chunks consumed via onended.
    revokeChunkUrls(this.currentChunks);
    this.currentChunks = [];
    this.currentChunkIndex = 0;
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
    this.loadGeneration++;
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
