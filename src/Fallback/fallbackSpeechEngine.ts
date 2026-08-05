import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechEngineProvider } from "../provider";
import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../navigator";
import { ReadiumSpeechUtterance } from "../utterance";
import { ReadiumSpeechVoice } from "../voices/types";
import { WebSpeechVoiceManager } from "../WebSpeech/WebSpeechVoiceManager";
import { isRecoverableFailure } from "./recoverableFailure";

export interface FallbackSpeechEngineOptions {
  primaryEngine: ReadiumSpeechPlaybackEngine;
  fallbackProvider: ReadiumSpeechEngineProvider;
  // Mirrors SpeechServerEngineOptions.overLengthText's "split" | "error" shape: using this
  // wrapper at all means you want the permissive behavior by default. Default "fallback".
  onFailure?: "fallback" | "error";
}

// Every event a wrapped engine can emit except "error", which is intercepted (see handleError)
// to decide whether it's worth swapping engines over before being forwarded or not.
const FORWARDED_EVENTS: ReadiumSpeechPlaybackEvent["type"][] = [
  "start", "pause", "resume", "end", "stop", "skip", "boundary", "mark",
  "idle", "loading", "ready", "voiceschanged", "languagefallback"
];

// Wraps a primary engine and swaps to a fallback provider's engine the first time the primary
// reports a recoverable failure, resuming at the same utterance with the best matching voice.
export class FallbackSpeechEngine implements ReadiumSpeechPlaybackEngine {
  private activeEngine: ReadiumSpeechPlaybackEngine;
  private readonly fallbackProvider: ReadiumSpeechEngineProvider;
  private readonly onFailure: "fallback" | "error";

  // Once true, "error" events are always forwarded as-is — either because we already swapped
  // (nothing left to fall back to), or because falling back itself failed once already.
  private hasFallenBack = false;

  // State the ReadiumSpeechPlaybackEngine interface doesn't expose getters for, kept here so it
  // can be replayed into a freshly created fallback engine.
  private currentUtterances: ReadiumSpeechUtterance[] = [];
  private lastVoiceRequest: ReadiumSpeechVoice | string | undefined;

  private eventListeners: Map<ReadiumSpeechPlaybackEvent["type"], ((event: ReadiumSpeechPlaybackEvent) => void)[]> = new Map();
  private unbindActiveEngine: (() => void) | null = null;

  constructor(options: FallbackSpeechEngineOptions) {
    this.activeEngine = options.primaryEngine;
    this.fallbackProvider = options.fallbackProvider;
    this.onFailure = options.onFailure ?? "fallback";
    this.bindActiveEngine();
  }

  async initialize(): Promise<unknown> {
    return this.activeEngine.initialize?.();
  }

  loadUtterances(contents: ReadiumSpeechUtterance[]): void {
    this.currentUtterances = contents;
    this.activeEngine.loadUtterances(contents);
  }

  setVoice(voice: ReadiumSpeechVoice | string): void {
    this.lastVoiceRequest = voice;
    this.activeEngine.setVoice(voice);
  }

  getCurrentVoice(): ReadiumSpeechVoice | null {
    return this.activeEngine.getCurrentVoice();
  }

  getAvailableVoices(): Promise<ReadiumSpeechVoice[]> {
    return this.activeEngine.getAvailableVoices();
  }

  setSpeakInContentLanguage(enabled: boolean): void {
    this.activeEngine.setSpeakInContentLanguage(enabled);
  }

  getSpeakInContentLanguage(): boolean {
    return this.activeEngine.getSpeakInContentLanguage();
  }

  speak(utteranceIndex?: number): void {
    this.activeEngine.speak(utteranceIndex);
  }

  pause(): void {
    this.activeEngine.pause();
  }

  resume(): void {
    this.activeEngine.resume();
  }

  stop(): void {
    this.activeEngine.stop();
  }

  setRate(rate: number): void {
    this.activeEngine.setRate(rate);
  }

  getRate(): number {
    return this.activeEngine.getRate();
  }

  setPitch(pitch: number): void {
    this.activeEngine.setPitch(pitch);
  }

  getPitch(): number {
    return this.activeEngine.getPitch();
  }

  setVolume(volume: number): void {
    this.activeEngine.setVolume(volume);
  }

  getVolume(): number {
    return this.activeEngine.getVolume();
  }

  getState(): ReadiumSpeechPlaybackState {
    return this.activeEngine.getState();
  }

  getCurrentUtteranceIndex(): number {
    return this.activeEngine.getCurrentUtteranceIndex();
  }

  setCurrentUtteranceIndex(index: number, onComplete?: (success: boolean) => void): void {
    this.activeEngine.setCurrentUtteranceIndex(index, onComplete);
  }

  getUtteranceCount(): number {
    return this.activeEngine.getUtteranceCount();
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

  private bindActiveEngine(): void {
    const engine = this.activeEngine;
    const unsubscribers = FORWARDED_EVENTS.map(type => engine.on(type, (event) => this.emitEvent(event)));
    unsubscribers.push(engine.on("error", (event) => this.handleError(event)));
    this.unbindActiveEngine = () => unsubscribers.forEach(unsubscribe => unsubscribe());
  }

  private handleError(event: ReadiumSpeechPlaybackEvent): void {
    if (this.hasFallenBack || this.onFailure === "error" || !isRecoverableFailure(event)) {
      this.emitEvent(event);
      return;
    }
    void this.swapToFallback(event);
  }

  private async swapToFallback(originalEvent: ReadiumSpeechPlaybackEvent): Promise<void> {
    const primaryEngine = this.activeEngine;
    const resumeIndex = primaryEngine.getCurrentUtteranceIndex();

    try {
      const failedVoice = primaryEngine.getCurrentVoice() ?? (typeof this.lastVoiceRequest === "object" ? this.lastVoiceRequest : null);
      const language = failedVoice?.language || this.currentUtterances[resumeIndex]?.language || navigator.language;

      const bestVoice = await this.pickBestFallbackVoice(language, failedVoice?.gender);

      const fallbackEngine = await this.fallbackProvider.createEngine(bestVoice ?? undefined);
      fallbackEngine.setRate(primaryEngine.getRate());
      fallbackEngine.setPitch(primaryEngine.getPitch());
      fallbackEngine.setVolume(primaryEngine.getVolume());
      fallbackEngine.setSpeakInContentLanguage(primaryEngine.getSpeakInContentLanguage());

      this.unbindActiveEngine?.();
      this.activeEngine = fallbackEngine;
      this.hasFallenBack = true;
      this.bindActiveEngine();

      const unsubscribeReady = fallbackEngine.on("ready", () => {
        unsubscribeReady();
        fallbackEngine.speak(resumeIndex);
      });
      fallbackEngine.loadUtterances(this.currentUtterances);

      this.emitEvent({ type: "enginefallback", detail: { reason: originalEvent.detail, voice: bestVoice } });
    } catch {
      // Falling back itself failed (e.g. Web Speech API unavailable too) — nothing more we can
      // do, surface the original failure and stop attempting to fall back on future errors.
      this.hasFallenBack = true;
      this.emitEvent(originalEvent);
    }
  }

  // Falls back to a language-only match if nothing satisfies both language and gender — a
  // language-correct voice of the wrong gender beats no voice at all.
  private async pickBestFallbackVoice(language: string, gender: ReadiumSpeechVoice["gender"]): Promise<ReadiumSpeechVoice | null> {
    const manager = await WebSpeechVoiceManager.initialize({ languages: [language] });

    if (gender) {
      const matchingGender = manager.getVoices({ languages: [language], gender });
      if (matchingGender.length > 0) {
        return manager.getDefaultVoice(language, matchingGender);
      }
    }

    const anyGender = manager.getVoices({ languages: [language] });
    return manager.getDefaultVoice(language, anyGender);
  }

  async destroy(): Promise<void> {
    this.unbindActiveEngine?.();
    this.eventListeners.clear();
    await this.activeEngine.destroy();
  }
}
