import { ReadiumSpeechPlaybackEngine } from "../engine.js";
import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../navigator.js";
import { ReadiumSpeechUtterance } from "../utterance.js";
import { ReadiumSpeechVoice } from "../voices/types.js";
import { getVoiceId } from "../voices/voiceId.js";
import { findVoice, uniqueVoices } from "../voices/voiceLookup.js";
import { EventEmitter } from "../utils/eventEmitter.js";
import { clampIndex, isIndexInRange } from "../utils/array.js";
import { settleAll } from "../utils/settleAll.js";
import { playbackEventTypes } from "../playbackEvents.js";

export interface RoutingSpeechEngineOptions {
  // In priority order: a voice listed by several engines is spoken by the first.
  engines: ReadiumSpeechPlaybackEngine[];
  // The engine content without a voice of its own is spoken with. Default 0.
  currentEngine?: number;
}

const ENGINE_SWAP_EVENTS: ReadiumSpeechPlaybackEvent["type"][] = ["enginefallback", "enginerecovered"];
// Forwarded only from the engine speaking the current utterance.
const PLAYBACK_EVENTS = playbackEventTypes("ready", "voiceschanged", "languagefallback", ...ENGINE_SWAP_EVENTS);

// Speaks each utterance with the engine listing its voice, so one queue mixes voices of several providers.
export class RoutingSpeechEngine implements ReadiumSpeechPlaybackEngine {
  private readonly engines: ReadiumSpeechPlaybackEngine[];
  private currentEngine: number;
  // Every voice each engine has listed, by id, kept across listings as each lists only what it was asked for.
  private readonly listedVoices: Map<string, ReadiumSpeechVoice>[];

  private utterances: ReadiumSpeechUtterance[] = [];
  private isContextual: ((index: number) => boolean) | undefined;
  // The engine speaking each utterance; null while the utterances' voices are being listed.
  private owners: number[] | null = [];
  private activeEngine: number;
  private currentIndex = 0;
  // Whether the active engine has been told to speak since it became active.
  private started = true;
  // Whether the active engine is mid-utterance: engines stay "playing" between utterances.
  private speaking = false;
  // Playback's state when it moved to another engine's utterance, until that engine is spoken: its own state says nothing of playback.
  private stateOnSwitch: ReadiumSpeechPlaybackState | null = null;
  // Playback asked for before the queue was split: speak(), then pause() or resume().
  private pendingPlayback: "playing" | "paused" | null = null;
  private readyEmitted = false;
  // Bumped by every loadUtterances() and by destroy(), so a listing can tell its queue is stale.
  private loadToken = 0;
  // Bumped by every setVoice() and by destroy(), so a listing can tell its voice is stale.
  private voiceToken = 0;
  // Set while a setVoice() voice is being listed: routing waits for it.
  private voiceListing: Promise<void> | null = null;

  private readonly events = new EventEmitter<ReadiumSpeechPlaybackEvent["type"], ReadiumSpeechPlaybackEvent>();
  private readonly unsubscribers: (() => void)[] = [];

  constructor(options: RoutingSpeechEngineOptions) {
    if (options.engines.length === 0) throw new Error("RoutingSpeechEngine needs at least one engine");
    this.engines = options.engines;
    this.currentEngine = clampIndex(options.currentEngine ?? 0, this.engines.length);
    this.activeEngine = this.currentEngine;
    this.listedVoices = this.engines.map(() => new Map());
    this.engines.forEach((engine, index) => this.bindEngine(engine, index));
  }

  async initialize(): Promise<unknown> {
    await settleAll(this.engines.map(async engine => engine.initialize?.()));
    return true;
  }

  loadUtterances(contents: ReadiumSpeechUtterance[], startIndex?: number, isContextual?: (index: number) => boolean): void {
    const loadToken = ++this.loadToken;
    this.utterances = contents;
    this.isContextual = isContextual;
    this.currentIndex = clampIndex(startIndex ?? 0, contents.length);
    this.owners = null;
    this.pendingPlayback = null;
    this.readyEmitted = false;
    if (this.started && this.speaking) this.engines[this.activeEngine].stop();
    this.resetPlayback();

    const unlisted = [...new Set(contents.flatMap(utterance => utterance.voice ?? []))].filter(id => this.ownerOf(id) === undefined);
    if (unlisted.length === 0 && !this.voiceListing) {
      this.route(loadToken);
      return;
    }
    this.emitEvent({ type: "loading" });
    const listing = unlisted.length > 0 ? this.listVoices(undefined, unlisted).catch(() => {}) : undefined;
    void Promise.resolve(listing).then(() => {
      if (loadToken === this.loadToken) this.route(loadToken);
    });
  }

  // Loads every engine with the whole queue, the utterances of other engines as context; the engine of the start utterance
  // is loaded last, as its "ready" is the queue's. Waits for a setVoice() still listing its voice, as it picks the current engine.
  private route(loadToken: number): void {
    if (this.voiceListing) {
      void this.voiceListing.then(() => {
        if (loadToken === this.loadToken) this.route(loadToken);
      });
      return;
    }
    const voiceIds = new Set(this.utterances.flatMap(utterance => utterance.voice ?? []));
    const ownerById = new Map([...voiceIds].map(id => [id, this.ownerOf(id)]));
    const owners = this.utterances.map(utterance => (utterance.voice ? ownerById.get(utterance.voice) : undefined) ?? this.currentEngine);
    this.owners = owners;
    this.activeEngine = owners[this.currentIndex] ?? this.currentEngine;

    const isContextual = this.isContextual;
    const order = [...this.engines.keys()].filter(index => index !== this.activeEngine).concat(this.activeEngine);
    for (const index of order) {
      this.engines[index].loadUtterances(this.utterances, this.currentIndex, position => isContextual?.(position) || owners[position] !== index);
    }

    const pending = this.pendingPlayback;
    this.pendingPlayback = null;
    if (pending === "playing") {
      this.speak(this.currentIndex);
    } else if (pending === "paused") {
      this.started = false;
      this.stateOnSwitch = "paused";
    }
  }

  // A voice not listed yet is listed first, as an utterance's is.
  setVoice(voice: ReadiumSpeechVoice | string): void {
    const voiceToken = ++this.voiceToken;
    const id = typeof voice === "string" ? voice : getVoiceId(voice);
    if (this.ownerOf(id) !== undefined) {
      this.voiceListing = null;
      this.applyVoice(voice, id);
      return;
    }
    this.voiceListing = this.listVoices(undefined, [id]).catch(() => {}).then(() => {
      if (voiceToken !== this.voiceToken) return;
      this.voiceListing = null;
      this.applyVoice(voice, id);
    });
  }

  private applyVoice(voice: ReadiumSpeechVoice | string, id: string): void {
    this.currentEngine = this.ownerOf(id) ?? this.currentEngine;
    this.engines[this.currentEngine].setVoice(voice);
  }

  getCurrentVoice(): ReadiumSpeechVoice | null {
    return this.engines[this.currentEngine].getCurrentVoice();
  }

  async getAvailableVoices(languages?: string[], voiceIds?: string[]): Promise<ReadiumSpeechVoice[]> {
    return uniqueVoices(await this.listVoices(languages, voiceIds));
  }

  // Each engine's voices, empty for one that failed.
  private async listVoices(languages?: string[], voiceIds?: string[]): Promise<ReadiumSpeechVoice[][]> {
    const listings = await settleAll(this.engines.map(engine => engine.getAvailableVoices(languages, voiceIds)));
    return listings.map((voices = [], index) => {
      voices.forEach(voice => this.listedVoices[index].set(getVoiceId(voice), voice));
      return voices;
    });
  }

  // The first engine listing the voice.
  private ownerOf(id: string): number | undefined {
    const voice = findVoice(this.listedVoices.flatMap(voices => [...voices.values()]), id);
    return voice && this.listedVoices.findIndex(voices => voices.has(getVoiceId(voice)));
  }

  speak(utteranceIndex?: number): void {
    if (utteranceIndex !== undefined && !isIndexInRange(utteranceIndex, this.utterances.length)) {
      throw new Error("Invalid utterance index");
    }
    const index = utteranceIndex ?? this.currentIndex;
    if (!this.owners) {
      this.currentIndex = index;
      this.pendingPlayback = "playing";
      return;
    }
    if (this.utterances.length === 0) {
      this.engines[this.activeEngine].speak();
      return;
    }
    this.activate(this.owners[index]);
    this.currentIndex = index;
    this.started = true;
    this.speaking = true;
    this.stateOnSwitch = null;
    this.engines[this.activeEngine].speak(index);
  }

  // Stops the previous engine only mid-utterance, unheard: two Web Speech engines share one speechSynthesis.
  private activate(engine: number): void {
    if (engine === this.activeEngine) return;
    const previous = this.engines[this.activeEngine];
    const interrupted = this.started && this.speaking;
    this.activeEngine = engine;
    this.speaking = false;
    if (interrupted) previous.stop();
  }

  pause(): void {
    if (!this.owners) {
      if (this.pendingPlayback === "playing") {
        this.pendingPlayback = "paused";
        this.emitEvent({ type: "pause" });
      }
      return;
    }
    if (this.started) {
      this.engines[this.activeEngine].pause();
    } else if (this.stateOnSwitch === "playing") {
      this.stateOnSwitch = "paused";
      this.emitEvent({ type: "pause" });
    }
  }

  resume(): void {
    if (!this.owners) {
      if (this.pendingPlayback === "paused") {
        this.pendingPlayback = "playing";
        this.emitEvent({ type: "resume" });
      }
      return;
    }
    if (!this.started) {
      if (this.getState() !== "paused") return;
      this.emitEvent({ type: "resume" });
      this.speak(this.currentIndex);
      return;
    }
    this.engines[this.activeEngine].resume();
  }

  stop(): void {
    this.pendingPlayback = null;
    this.currentIndex = 0;
    this.resetPlayback();
    if (!this.owners) return;
    this.stopInactive();
    this.engines[this.activeEngine].stop();
  }

  // Engines left between utterances stay "playing", e.g. a Fallback waiting for that to end to recover.
  // Only once nothing plays: two Web Speech engines share one speechSynthesis.
  private stopInactive(): void {
    this.engines.forEach((engine, index) => {
      const state = engine.getState();
      if (index !== this.activeEngine && (state === "playing" || state === "paused")) engine.stop();
    });
  }

  private resetPlayback(): void {
    this.started = true;
    this.speaking = false;
    this.stateOnSwitch = null;
  }

  setRate(rate: number): void {
    this.engines.forEach(engine => engine.setRate(rate));
  }

  getRate(): number {
    return this.engines[this.activeEngine].getRate();
  }

  setPitch(pitch: number): void {
    this.engines.forEach(engine => engine.setPitch(pitch));
  }

  getPitch(): number {
    return this.engines[this.activeEngine].getPitch();
  }

  setVolume(volume: number): void {
    this.engines.forEach(engine => engine.setVolume(volume));
  }

  getVolume(): number {
    return this.engines[this.activeEngine].getVolume();
  }

  getState(): ReadiumSpeechPlaybackState {
    if (!this.owners) return this.pendingPlayback === "paused" ? "paused" : "loading";
    if (!this.started && this.stateOnSwitch) return this.stateOnSwitch;
    return this.engines[this.activeEngine].getState();
  }

  getCurrentUtteranceIndex(): number {
    return this.currentIndex;
  }

  setCurrentUtteranceIndex(index: number, onComplete?: (success: boolean) => void): void {
    if (!isIndexInRange(index, this.utterances.length)) {
      onComplete?.(false);
      return;
    }
    if (!this.owners) {
      this.currentIndex = index;
      onComplete?.(true);
      return;
    }
    const owner = this.owners[index];
    let interrupted = false;
    if (owner !== this.activeEngine) {
      const previous = this.engines[this.activeEngine];
      const paused = this.started && this.speaking && previous.getState() === "paused";
      interrupted = this.started && this.speaking && !paused;
      this.activate(owner);
      if (this.started) {
        const state = paused ? "paused" : previous.getState();
        // Before playback, the state is the new engine's own loading or ready.
        this.stateOnSwitch = state === "loading" || state === "ready" ? null : state;
      }
      this.started = false;
    }
    this.currentIndex = index;
    // The stopped engine's own "idle" and "stop" aren't forwarded: told here, as a single engine does, once moved and before onComplete
    const tellStopped = () => {
      if (!interrupted) return;
      interrupted = false;
      this.emitEvent({ type: "idle" });
      this.emitEvent({ type: "stop" });
    };
    this.engines[owner].setCurrentUtteranceIndex(index, (success) => {
      tellStopped();
      onComplete?.(success);
    });
    // An engine may not call onComplete
    tellStopped();
  }

  getUtteranceCount(): number {
    return this.utterances.length;
  }

  on<T extends ReadiumSpeechPlaybackEvent["type"]>(event: T, callback: (event: ReadiumSpeechPlaybackEvent<T>) => void): () => void {
    return this.events.on(event, callback as (event: ReadiumSpeechPlaybackEvent) => void);
  }

  private emitEvent(event: ReadiumSpeechPlaybackEvent): void {
    this.events.emit(event.type, event);
  }

  private bindEngine(engine: ReadiumSpeechPlaybackEngine, index: number): void {
    const isActive = () => this.owners !== null && index === this.activeEngine;
    for (const type of PLAYBACK_EVENTS) {
      this.unsubscribers.push(engine.on(type, (event) => {
        if (!isActive()) return;
        if (event.type === "end" || event.type === "stop" || event.type === "error") this.speaking = false;
        if (event.type === "end" && this.currentIndex === this.utterances.length - 1) this.stopInactive();
        this.emitEvent(event);
      }));
    }
    this.unsubscribers.push(engine.on("ready", (event) => {
      if (!isActive() || this.readyEmitted) return;
      this.readyEmitted = true;
      this.emitEvent(event);
    }));
    this.unsubscribers.push(engine.on("voiceschanged", (event) => this.emitEvent(event)));
    // Its voices are another engine's now
    for (const type of ENGINE_SWAP_EVENTS) {
      this.unsubscribers.push(engine.on(type, (event) => {
        this.listedVoices[index].clear();
        this.emitEvent(event);
      }));
    }
  }

  async destroy(): Promise<void> {
    this.loadToken++;
    this.voiceToken++;
    this.voiceListing = null;
    this.unsubscribers.forEach(unsubscribe => unsubscribe());
    this.events.clear();
    await Promise.allSettled(this.engines.map(engine => engine.destroy()));
  }
}
