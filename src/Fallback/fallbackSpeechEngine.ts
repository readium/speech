import { ReadiumSpeechPlaybackEngine } from "../engine.js";
import { ReadiumSpeechEngineProvider } from "../provider.js";
import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../navigator.js";
import { ReadiumSpeechUtterance } from "../utterance.js";
import { ReadiumSpeechVoice } from "../voices/types.js";
import { EventEmitter } from "../utils/eventEmitter.js";
import { isIndexInRange } from "../utils/array.js";
import { isRecoverableFailure } from "./recoverableFailure.js";
import { isVoiceReachable } from "../voices/reachability.js";
import { getVoiceId } from "../voices/voiceId.js";
import { findVoice } from "../voices/voiceLookup.js";
import { hasBoundaryEvents } from "../voices/voiceMatching.js";
import { pickFallbackVoice } from "./fallbackVoice.js";
import { playbackEventTypes } from "../playbackEvents.js";

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

// Every event a wrapped engine can emit, except:
// - "error", intercepted (see handleError) to decide whether to swap engines before forwarding it;
// - "enginefallback" and "enginerecovered": this wrapper sends its own;
// - "languagefallback", which only the navigator sends.
const FORWARDED_EVENTS = playbackEventTypes("error", "languagefallback", "enginefallback", "enginerecovered");

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

  // State the ReadiumSpeechPlaybackEngine interface doesn't expose getters for, kept here so it
  // can be replayed into a freshly created fallback (or recovered primary) engine.
  private currentUtterances: ReadiumSpeechUtterance[] = [];
  private currentIsContextual: ((index: number) => boolean) | undefined;
  private lastVoiceRequest: ReadiumSpeechVoice | string | undefined;

  // Live, not a snapshot — a swap in progress reads these at "ready" time, not when it started.
  private desiredIndex = 0;
  private desiredPlaying = false;
  // False the instant a new engine becomes active, true once it's actually been told to speak().
  // While false, playback state/index live here instead of on the (unspoken) active engine.
  private engineStarted = true;

  // True during swapToFallback()/recoverToPrimary(), until activeEngine is reassigned — while
  // true, activeEngine is untrustworthy and control methods must only update desired state.
  private swapInFlight = false;
  // Bumped only by destroy(), to abort an in-flight swap and destroy the arriving engine instead
  // of adopting it. stop()/loadUtterances()/speak() let an in-flight swap land instead.
  private teardownEpoch = 0;
  // Bumped by every loadUtterances() call, so startEngineWhenReady() can tell its queue is stale.
  private loadToken = 0;

  // Every voice each engine has listed, by id, kept across listings as each lists only what it was asked for.
  private readonly listedVoices = new WeakMap<ReadiumSpeechPlaybackEngine, Map<string, ReadiumSpeechVoice>>();

  private readonly events = new EventEmitter<ReadiumSpeechPlaybackEvent["type"], ReadiumSpeechPlaybackEvent>();
  private unbindActiveEngine: (() => void) | null = null;

  constructor(options: FallbackSpeechEngineOptions) {
    this.activeEngine = options.primaryEngine;
    this.primaryProvider = options.primaryProvider;
    this.fallbackProvider = options.fallbackProvider;
    this.onFailure = options.onFailure ?? "fallback";
    this.healthCheckIntervalMs = options.healthCheckIntervalMs ?? DEFAULT_HEALTH_CHECK_INTERVAL_MS;
    // createEngine(voice) never goes through setVoice(), so pick it up here instead.
    this.lastVoiceRequest = options.primaryEngine.getCurrentVoice() ?? undefined;
    this.bindActiveEngine();
  }

  async initialize(): Promise<unknown> {
    return this.activeEngine.initialize?.();
  }

  // Mid-swap, only records the new queue live — activeEngine is dying/about to be replaced.
  loadUtterances(contents: ReadiumSpeechUtterance[], startIndex?: number, isContextual?: (index: number) => boolean): void {
    this.loadToken++;
    this.currentUtterances = contents;
    this.currentIsContextual = isContextual;
    this.desiredIndex = startIndex ?? 0;
    this.desiredPlaying = false;
    if (this.swapInFlight) return;
    this.engineStarted = true;
    this.activeEngine.loadUtterances(this.withReachableVoices(contents, this.activeEngine), startIndex, isContextual);
  }

  setVoice(voice: ReadiumSpeechVoice | string): void {
    this.lastVoiceRequest = voice;
    this.activeEngine.setVoice(voice);
  }

  getCurrentVoice(): ReadiumSpeechVoice | null {
    return this.activeEngine.getCurrentVoice();
  }

  // Reachable voices only, on either engine, so content isn't given a voice that fails for lack of network.
  async getAvailableVoices(languages?: string[], voiceIds?: string[]): Promise<ReadiumSpeechVoice[]> {
    const engine = this.activeEngine;
    const voices = await engine.getAvailableVoices(languages, voiceIds);
    this.recordListedVoices(engine, voices);
    return this.reachableVoices(voices);
  }

  // The navigator advances to the next utterance via speak(nextIndex) — the one gap where we can
  // recover without an audible glitch, so intercept it if the primary is already reachable.
  speak(utteranceIndex?: number): void {
    if (utteranceIndex !== undefined && !isIndexInRange(utteranceIndex, this.currentUtterances.length)) {
      throw new Error("Invalid utterance index");
    }
    this.desiredIndex = utteranceIndex ?? this.desiredIndex;
    this.desiredPlaying = true;
    if (this.swapInFlight) return; // read live once the arriving engine's "ready" fires
    if (this.hasFallenBack && this.primaryReachable && this.activeEngine.getState() !== "playing") {
      void this.recoverToPrimary();
      return;
    }
    this.engineStarted = true;
    this.activeEngine.speak(this.desiredIndex);
  }

  pause(): void {
    this.desiredPlaying = false;
    if (!this.isEngineTrusted()) return;
    this.activeEngine.pause();
  }

  resume(): void {
    this.desiredPlaying = true;
    if (this.swapInFlight) return; // read live once the arriving engine's "ready" fires
    if (!this.engineStarted) {
      this.engineStarted = true;
      this.activeEngine.speak(this.desiredIndex);
      return;
    }
    this.activeEngine.resume();
  }

  // Lets an in-flight swap land rather than aborting it — aborting would strand the wrapper on
  // the already-failed primary in the swapToFallback direction.
  stop(): void {
    this.desiredPlaying = false;
    this.desiredIndex = 0;
    if (this.swapInFlight) return;
    this.engineStarted = true;
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

  // True only when this.activeEngine is safe to read from directly: no swap in flight, and it's
  // actually been told to speak() (otherwise its own state/index don't reflect desired* yet).
  private isEngineTrusted(): boolean {
    return !this.swapInFlight && this.engineStarted;
  }

  getState(): ReadiumSpeechPlaybackState {
    if (!this.isEngineTrusted()) return this.desiredPlaying ? "loading" : "paused";
    return this.activeEngine.getState();
  }

  getCurrentUtteranceIndex(): number {
    if (!this.isEngineTrusted()) return this.desiredIndex;
    return this.activeEngine.getCurrentUtteranceIndex();
  }

  // Keeps desiredIndex authoritative even while trusted, like speak() does — otherwise a seek
  // followed by a failure with no intervening speak() would resume at the stale pre-seek index.
  setCurrentUtteranceIndex(index: number, onComplete?: (success: boolean) => void): void {
    if (!isIndexInRange(index, this.currentUtterances.length)) {
      onComplete?.(false);
      return;
    }
    this.desiredIndex = index;
    if (!this.isEngineTrusted()) {
      onComplete?.(true);
      return;
    }
    this.activeEngine.setCurrentUtteranceIndex(index, onComplete);
  }

  getUtteranceCount(): number {
    return this.activeEngine.getUtteranceCount();
  }

  on<T extends ReadiumSpeechPlaybackEvent["type"]>(event: T, callback: (event: ReadiumSpeechPlaybackEvent<T>) => void): () => void {
    return this.events.on(event, callback as (event: ReadiumSpeechPlaybackEvent) => void);
  }

  private emitEvent(event: ReadiumSpeechPlaybackEvent): void {
    this.events.emit(event.type, event);
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

  private handleError(event: ReadiumSpeechPlaybackEvent<"error">): void {
    if (this.hasFallenBack || this.swapInFlight || this.onFailure === "error" || !isRecoverableFailure(event)) {
      this.emitEvent(event);
      return;
    }
    void this.swapToFallback(event);
  }

  // Copies playback parameters onto a freshly created engine — shared by both swap directions so
  // this can't drift between them the way two separately maintained copies did.
  private copyPlaybackParameters(from: ReadiumSpeechPlaybackEngine, to: ReadiumSpeechPlaybackEngine): void {
    to.setRate(from.getRate());
    to.setPitch(from.getPitch());
    to.setVolume(from.getVolume());
  }

  // Starts or defers a freshly loaded engine based on live intent, not a snapshot from before the
  // swap — shared by both swap directions so a racing pause()/speak() is respected either way.
  private startEngineWhenReady(engine: ReadiumSpeechPlaybackEngine): void {
    const loadToken = this.loadToken;
    const unsubscribeReady = engine.on("ready", () => {
      unsubscribeReady();
      if (loadToken !== this.loadToken) return; // a newer loadUtterances() superseded this queue
      if (this.desiredPlaying) {
        this.engineStarted = true;
        engine.speak(this.desiredIndex);
      } else {
        this.engineStarted = false; // stays paused at desiredIndex until resume()
      }
    });
  }

  // Polls the primary provider until it's available again, then hands off to maybeRecoverNow()
  // to swap back at the next safe moment. Chained setTimeout rather than setInterval so a slow
  // probe can't overlap with the next one. A provider without isAvailable() is never recovered.
  private startHealthCheck(): void {
    const isAvailable = this.primaryProvider.isAvailable?.bind(this.primaryProvider);
    if (this.healthCheckTimer !== null || !isAvailable) return;

    this.healthCheckTimer = setTimeout(async () => {
      this.healthCheckTimer = null;
      if (await isAvailable().catch(() => false)) {
        this.primaryReachable = true;
        this.maybeRecoverNow();
      } else {
        this.startHealthCheck();
      }
    }, this.healthCheckIntervalMs);
  }

  // Swaps back to the primary the moment nothing is audibly playing, so a caller never hears a
  // voice change mid-utterance.
  private maybeRecoverNow(): void {
    if (!this.hasFallenBack || !this.primaryReachable || this.swapInFlight) return;
    if (this.activeEngine.getState() === "playing") return;
    void this.recoverToPrimary();
  }

  private async swapToFallback(originalEvent: ReadiumSpeechPlaybackEvent<"error">): Promise<void> {
    let bestVoice: ReadiumSpeechVoice | null = null;

    await this.performSwap(
      async () => {
        const primaryEngine = this.activeEngine;
        const failedVoice = await this.utteranceVoice(primaryEngine, this.currentUtterances[this.desiredIndex])
          ?? primaryEngine.getCurrentVoice()
          ?? (typeof this.lastVoiceRequest === "object" ? this.lastVoiceRequest : null);
        const language = failedVoice?.language || this.currentUtterances[this.desiredIndex]?.language;
        bestVoice = await pickFallbackVoice(this.fallbackProvider, language, failedVoice?.gender, failedVoice ? hasBoundaryEvents(failedVoice) : true);
        if (!bestVoice) throw new Error("no offline-available fallback voice found");
        return this.fallbackProvider.createEngine(bestVoice);
      },
      () => {
        this.hasFallenBack = true;
        if (this.onFailure === "fallbackAndRecover") {
          this.startHealthCheck();
        }
        return { type: "enginefallback", detail: { reason: originalEvent.detail, voice: bestVoice } };
      },
      () => {
        // Falling back itself failed (e.g. Web Speech API unavailable too) — nothing more we can
        // do, surface the original failure and stop attempting to fall back on future errors.
        this.hasFallenBack = true;
        this.emitEvent(originalEvent);
      }
    );
  }

  // The utterance's own voice, when the engine has it.
  private async utteranceVoice(engine: ReadiumSpeechPlaybackEngine, utterance: ReadiumSpeechUtterance | undefined): Promise<ReadiumSpeechVoice | undefined> {
    if (!utterance?.voice) return undefined;
    await this.listUtteranceVoices(engine, [utterance]);
    return this.listedVoice(engine, utterance.voice);
  }

  private async recoverToPrimary(): Promise<void> {
    await this.performSwap(
      () => this.primaryProvider.createEngine(this.lastVoiceRequest),
      (primaryEngine) => {
        this.hasFallenBack = false;
        this.primaryReachable = false;
        return { type: "enginerecovered", detail: { voice: primaryEngine.getCurrentVoice() } };
      },
      () => {
        // Still down despite the probe succeeding (e.g. it dropped again in between) — stay on
        // the fallback and keep polling.
        this.primaryReachable = false;
        this.startHealthCheck();
      }
    );
  }

  // Shared by both swap directions so the epoch/teardown races and event-forwarding rebind
  // can't drift between them. createEngine builds the replacement (and may fail, invoking
  // onCreateFailed instead of swapping); onSwapped runs once the new engine is live and
  // returns the event to emit for that direction.
  private async performSwap(
    createEngine: () => Promise<ReadiumSpeechPlaybackEngine>,
    onSwapped: (newEngine: ReadiumSpeechPlaybackEngine) => ReadiumSpeechPlaybackEvent,
    onCreateFailed: () => void
  ): Promise<void> {
    this.swapInFlight = true;
    const teardownEpoch = this.teardownEpoch;
    const oldEngine = this.activeEngine;

    let newEngine: ReadiumSpeechPlaybackEngine;
    try {
      newEngine = await createEngine();
    } catch {
      this.swapInFlight = false;
      onCreateFailed();
      return;
    }
    await this.listUtteranceVoices(newEngine, this.currentUtterances);

    if (teardownEpoch !== this.teardownEpoch) {
      this.swapInFlight = false;
      await newEngine.destroy();
      return;
    }
    this.copyPlaybackParameters(oldEngine, newEngine);

    this.unbindActiveEngine?.();
    this.activeEngine = newEngine;
    this.engineStarted = false;
    this.swapInFlight = false;
    this.bindActiveEngine();

    // Emitted before the calls below, which can synchronously cascade into "ready"/"start".
    this.emitEvent(onSwapped(newEngine));

    this.startEngineWhenReady(newEngine);
    newEngine.loadUtterances(this.withReachableVoices(this.currentUtterances, newEngine), this.desiredIndex, this.currentIsContextual); // live read — picks up any reload that raced the swap

    // Outside the try: a teardown failure here must not be mistaken for the swap itself failing.
    await oldEngine.destroy();
  }

  private reachableVoices(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] {
    return voices.filter(isVoiceReachable);
  }

  private recordListedVoices(engine: ReadiumSpeechPlaybackEngine, voices: ReadiumSpeechVoice[]): void {
    const listed = this.listedVoices.get(engine) ?? new Map<string, ReadiumSpeechVoice>();
    voices.forEach(voice => listed.set(getVoiceId(voice), voice));
    this.listedVoices.set(engine, listed);
  }

  private listedVoice(engine: ReadiumSpeechPlaybackEngine, id: string): ReadiumSpeechVoice | undefined {
    return findVoice(this.listedVoices.get(engine)?.values() ?? [], id);
  }

  // Lists the utterances' own voices on the engine, so withReachableVoices() can tell which it can't reach.
  private async listUtteranceVoices(engine: ReadiumSpeechPlaybackEngine, utterances: ReadiumSpeechUtterance[]): Promise<void> {
    const ids = [...new Set(utterances.flatMap(utterance => utterance.voice ?? []))];
    if (ids.length === 0) return;
    this.recordListedVoices(engine, await engine.getAvailableVoices(undefined, ids).catch(() => []));
  }

  // Drops an utterance's own voice the engine lists as unreachable, so the engine speaks it with its own instead.
  private withReachableVoices(utterances: ReadiumSpeechUtterance[], engine: ReadiumSpeechPlaybackEngine): ReadiumSpeechUtterance[] {
    return utterances.map(utterance => {
      const voice = utterance.voice ? this.listedVoice(engine, utterance.voice) : undefined;
      if (!voice || isVoiceReachable(voice)) return utterance;
      const { voice: _unreachable, ...rest } = utterance;
      return rest;
    });
  }

  async destroy(): Promise<void> {
    this.teardownEpoch++;
    if (this.healthCheckTimer !== null) {
      clearTimeout(this.healthCheckTimer);
      this.healthCheckTimer = null;
    }
    this.unbindActiveEngine?.();
    this.events.clear();
    await this.activeEngine.destroy();
  }
}
