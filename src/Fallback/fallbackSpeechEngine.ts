import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechEngineProvider } from "../provider";
import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../navigator";
import { ReadiumSpeechUtterance } from "../utterance";
import { ReadiumSpeechVoice } from "../voices/types";
import { WebSpeechVoiceManager } from "../WebSpeech/WebSpeechVoiceManager";
import { isRecoverableFailure } from "./recoverableFailure";

export interface FallbackSpeechEngineOptions {
  primaryEngine: ReadiumSpeechPlaybackEngine;
  primaryProvider: ReadiumSpeechEngineProvider;
  fallbackProvider: ReadiumSpeechEngineProvider;
  // Mirrors SpeechServerEngineOptions.overLengthText's "split" | "error" shape: using this
  // wrapper at all means you want the permissive behavior by default. Default "fallback".
  // "fallbackAndRecover" additionally polls the primary while on the fallback and swaps back
  // once it's reachable again, see healthCheckIntervalMs.
  onFailure?: "fallback" | "error" | "fallbackAndRecover";
  // Only used when onFailure is "fallbackAndRecover". Default 30000.
  healthCheckIntervalMs?: number;
}

const DEFAULT_HEALTH_CHECK_INTERVAL_MS = 30000;

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
  private readonly primaryProvider: ReadiumSpeechEngineProvider;
  private readonly fallbackProvider: ReadiumSpeechEngineProvider;
  private readonly onFailure: "fallback" | "error" | "fallbackAndRecover";
  private readonly healthCheckIntervalMs: number;

  // Once true, "error" events are always forwarded as-is — either because we already swapped
  // (nothing left to fall back to), or because falling back itself failed once already.
  // Reset to false after recovering to the primary, so a later failure can fall back again.
  private hasFallenBack = false;

  private healthCheckTimer: ReturnType<typeof setTimeout> | null = null;
  // Set once a health-check probe confirms the primary is reachable again; the actual swap still
  // waits for the active engine to stop playing, see maybeRecoverNow().
  private primaryReachable = false;
  private recoveryInFlight = false;

  // State the ReadiumSpeechPlaybackEngine interface doesn't expose getters for, kept here so it
  // can be replayed into a freshly created fallback (or recovered primary) engine.
  private currentUtterances: ReadiumSpeechUtterance[] = [];
  private lastVoiceRequest: ReadiumSpeechVoice | string | undefined;

  private eventListeners: Map<ReadiumSpeechPlaybackEvent["type"], ((event: ReadiumSpeechPlaybackEvent) => void)[]> = new Map();
  private unbindActiveEngine: (() => void) | null = null;

  constructor(options: FallbackSpeechEngineOptions) {
    this.activeEngine = options.primaryEngine;
    this.primaryProvider = options.primaryProvider;
    this.fallbackProvider = options.fallbackProvider;
    this.onFailure = options.onFailure ?? "fallback";
    this.healthCheckIntervalMs = options.healthCheckIntervalMs ?? DEFAULT_HEALTH_CHECK_INTERVAL_MS;
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
    const unsubscribers = FORWARDED_EVENTS.map(type => engine.on(type, (event) => {
      this.emitEvent(event);
      this.maybeRecoverNow();
    }));
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

      if (this.onFailure === "fallbackAndRecover") {
        this.startHealthCheck();
      }

      await primaryEngine.destroy();
    } catch {
      // Falling back itself failed (e.g. Web Speech API unavailable too) — nothing more we can
      // do, surface the original failure and stop attempting to fall back on future errors.
      this.hasFallenBack = true;
      this.emitEvent(originalEvent);
    }
  }

  // Polls the primary provider until it's reachable again, then hands off to maybeRecoverNow()
  // to swap back at the next safe moment. Chained setTimeout rather than setInterval so a slow
  // probe can't overlap with the next one.
  private startHealthCheck(): void {
    if (this.healthCheckTimer !== null) return;

    this.healthCheckTimer = setTimeout(async () => {
      this.healthCheckTimer = null;
      try {
        await this.primaryProvider.getVoices();
        this.primaryReachable = true;
        this.maybeRecoverNow();
      } catch {
        this.startHealthCheck();
      }
    }, this.healthCheckIntervalMs);
  }

  // Swaps back to the primary the moment nothing is audibly playing, so a caller never hears a
  // voice change mid-utterance.
  private maybeRecoverNow(): void {
    if (!this.primaryReachable || this.recoveryInFlight) return;
    if (this.activeEngine.getState() === "playing") return;
    void this.recoverToPrimary();
  }

  private async recoverToPrimary(): Promise<void> {
    this.recoveryInFlight = true;
    const fallbackEngine = this.activeEngine;
    const resumeIndex = fallbackEngine.getCurrentUtteranceIndex();
    const wasPaused = fallbackEngine.getState() === "paused";

    try {
      const primaryEngine = await this.primaryProvider.createEngine(this.lastVoiceRequest);
      primaryEngine.setRate(fallbackEngine.getRate());
      primaryEngine.setPitch(fallbackEngine.getPitch());
      primaryEngine.setVolume(fallbackEngine.getVolume());
      primaryEngine.setSpeakInContentLanguage(fallbackEngine.getSpeakInContentLanguage());

      this.unbindActiveEngine?.();
      this.activeEngine = primaryEngine;
      this.hasFallenBack = false;
      this.primaryReachable = false;
      this.recoveryInFlight = false;
      this.bindActiveEngine();

      const unsubscribeReady = primaryEngine.on("ready", () => {
        unsubscribeReady();
        if (wasPaused) primaryEngine.setCurrentUtteranceIndex(resumeIndex, () => {});
      });
      primaryEngine.loadUtterances(this.currentUtterances);

      this.emitEvent({ type: "enginerecovered", detail: { voice: primaryEngine.getCurrentVoice() } });
      await fallbackEngine.destroy();
    } catch {
      // Still down despite the probe succeeding (e.g. it dropped again in between) — stay on
      // the fallback and keep polling.
      this.recoveryInFlight = false;
      this.startHealthCheck();
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
    if (this.healthCheckTimer !== null) {
      clearTimeout(this.healthCheckTimer);
      this.healthCheckTimer = null;
    }
    this.unbindActiveEngine?.();
    this.eventListeners.clear();
    await this.activeEngine.destroy();
  }
}
