import { ReadiumSpeechPlaybackEngine } from "./engine";
import { GndObject } from "./gnd/types";
import { ReadiumSpeechNavigatorContract, ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "./navigator";
import { SpeechDefaults } from "./preferences/SpeechDefaults";
import { SpeechPreferences } from "./preferences/SpeechPreferences";
import { SpeechPreferencesEditor } from "./preferences/SpeechPreferencesEditor";
import { SpeechSettings } from "./preferences/SpeechSettings";
import { ReadiumSpeechUtterance } from "./utterance";
import { extractUtterances } from "./utterances/extractUtterances";
import { ReadiumSpeechVoice } from "./voices/types";

export class ReadiumSpeechNavigator implements ReadiumSpeechNavigatorContract {
  private engine: ReadiumSpeechPlaybackEngine;
  private contentQueue: ReadiumSpeechUtterance[] = [];
  private eventListeners: Map<ReadiumSpeechPlaybackEvent["type"] | "contentchange", ((event: ReadiumSpeechPlaybackEvent) => void)[]> = new Map();

  // Navigator owns the state, not the engine
  private navigatorState: ReadiumSpeechPlaybackState = "idle";

  // Preferences API (Configurable<SpeechSettings, SpeechPreferences>)
  private _defaults = new SpeechDefaults();
  private _preferences = new SpeechPreferences();
  private _settings = new SpeechSettings(this._preferences, this._defaults);
  private _preferencesEditor: SpeechPreferencesEditor | null = null;

  // The raw GND source, retained only when content was loaded via
  // `loadGndContent()` — content loaded via plain `loadContent()` has no
  // source to re-extract from, so preferences changes are no-ops on it.
  private source: GndObject[] | undefined;

  constructor(engine: ReadiumSpeechPlaybackEngine) {
    this.engine = engine;
    this.setupEngineListeners();
    void this.initializeEngine();
  }

  private async initializeEngine(): Promise<void> {
    try {
      await this.engine.initialize?.();
    } catch (error) {
      console.warn("Failed to initialize speech engine:", error);
    }
  }

  private setupEngineListeners(): void {
    // Bridge engine events to navigator state management
    this.engine.on("start", () => {
      this.setNavigatorState("playing");
      this.emitEvent({ type: "start" });
    });

    this.engine.on("end", () => {
      const currentIndex = this.engine.getCurrentUtteranceIndex();
      const totalCount = this.engine.getUtteranceCount();

      if (currentIndex < totalCount - 1) {
        // Navigator handles continuous playback. `pauseScope` picks which
        // transitions get `pauseDuration`: every one ("utterance", default),
        // or only where the next utterance starts a new block ("block").
        // Out-of-scope transitions still yield to the event loop (delay 0),
        // never a synchronous call.
        const inPauseScope =
          this._settings.pauseScope === "utterance" || this.contentQueue[currentIndex + 1]?.startsNewBlock === true;
        const delay = inPauseScope ? this._settings.pauseDuration : 0;
        setTimeout(() => this.engine.speak(currentIndex + 1), delay);
      } else {
        // Reached end - set navigator to idle
        this.setNavigatorState("idle");
      }

      this.emitEvent({ type: "end" });
    });

    this.engine.on("pause", () => {
      this.setNavigatorState("paused");
      this.emitEvent({ type: "pause" });
    });

    this.engine.on("resume", () => {
      this.setNavigatorState("playing");
      this.emitEvent({ type: "resume" });
    });

    this.engine.on("stop", () => {
      this.setNavigatorState("idle");
      this.emitEvent({ type: "stop" });
    });

    this.engine.on("error", (event) => {
      this.setNavigatorState("idle");
      this.emitEvent(event);
    });

    this.engine.on("ready", () => {
      if (this.contentQueue.length > 0) {
        this.setNavigatorState("ready");
        this.emitEvent({ type: "ready" });
      }
    });

    this.engine.on("boundary", (event) => {
      this.emitEvent(event);
    });

    this.engine.on("mark", (event) => {
      this.emitEvent(event);
    });

    this.engine.on("voiceschanged", () => {
      this.emitEvent({ type: "voiceschanged" });
    });

    this.engine.on("languagefallback", (event) => {
      this.emitEvent(event);
    });
  }

  private setNavigatorState(state: ReadiumSpeechPlaybackState): void {
    this.navigatorState = state;
  }

  // Voice Management
  async getVoices(): Promise<ReadiumSpeechVoice[]> {
    return this.engine.getAvailableVoices();
  }

  setVoice(voice: ReadiumSpeechVoice | string): void {
    this.engine.setVoice(voice);
  }

  getCurrentVoice(): ReadiumSpeechVoice | null {
    return this.engine.getCurrentVoice();
  }

  setSpeakInContentLanguage(enabled: boolean): void {
    this.engine.setSpeakInContentLanguage(enabled);
  }

  getSpeakInContentLanguage(): boolean {
    return this.engine.getSpeakInContentLanguage();
  }

  // Content Management
  loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[]): void {
    const contents = Array.isArray(content) ? content : [content];
    this.contentQueue = [...contents];

    // Readiness comes from the engine's own "ready" event (see setupEngineListeners),
    // not set here — engines that buffer ahead (e.g. SpeechServerEngine) fire it once
    // they're confident playback won't immediately stall.
    this.setNavigatorState("loading");
    this.emitEvent({ type: "loading" });
    this.engine.loadUtterances(contents);
    this.emitContentChangeEvent({ content: contents });
  }

  loadGndContent(nodes: GndObject[]): void {
    this.source = nodes;
    this.reextract();
  }

  // Re-runs extraction from `this.source` using the resolved settings.
  private reextract(): void {
    if (!this.source) return;
    const utterances = extractUtterances(this.source, {
      format: this._settings.format,
      interruptSentence: this._settings.interruptSentence,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      language: this._settings.language,
    });
    this.loadContent(utterances);
  }

  getCurrentContent(): ReadiumSpeechUtterance | null {
    const index = this.getCurrentUtteranceIndex();
    return index < this.contentQueue.length ? this.contentQueue[index] : null;
  }

  getContentQueue(): ReadiumSpeechUtterance[] {
    return [...this.contentQueue];
  }

  private getCurrentUtteranceIndex(): number {
    return this.engine.getCurrentUtteranceIndex();
  }

  // Playback Control - Navigator coordinates engine operations
  play(): void {
    if (this.navigatorState === "paused") {
      // Resume from pause
      this.setNavigatorState("playing");
      this.engine.resume();
    } else if (this.navigatorState === "ready" || this.navigatorState === "idle") {
      // Start playing from beginning
      this.setNavigatorState("playing");
      this.engine.speak();
    } else if (this.navigatorState === "playing") {
      // Already playing, do nothing or restart
      return;
    }
  }

  pause(): void {
    if (this.navigatorState === "playing") {
      this.setNavigatorState("paused");
      this.engine.pause();
    }
  }

  stop(): void {
    this.setNavigatorState("idle");
    this.engine.stop();  // Reset engine index first
    this.emitEvent({ type: "stop" });  // Then emit event for UI update
  }

  private skipToPosition(targetIndex: number, forcePlay: boolean = false): boolean {
    const currentIndex = this.getCurrentUtteranceIndex();

    // Check if the target index is valid
    if (targetIndex < 0 || targetIndex >= this.contentQueue.length) {
      return false;
    }

    // Don't do anything if we're already at the target index
    if (targetIndex === currentIndex) {
      return true;
    }

    if (this.navigatorState === "paused" && !forcePlay) {
      // For paused state, just update the index without speaking
      this.engine.setCurrentUtteranceIndex(targetIndex, (success) => {
        if (success) {
          this.emitEvent({
            type: "skip",
            detail: { position: targetIndex }
          });
        }
      });
    } else {
      this.setNavigatorState("playing");
      this.engine.speak(targetIndex);
    }

    return true;
  }

  // Navigation - Navigator coordinates with proper state management
  next(forcePlay: boolean = false): boolean {
    const currentIndex = this.getCurrentUtteranceIndex();
    return this.skipToPosition(currentIndex + 1, forcePlay);
  }

  previous(forcePlay: boolean = false): boolean {
    const currentIndex = this.getCurrentUtteranceIndex();
    return this.skipToPosition(currentIndex - 1, forcePlay);
  }

  jumpTo(utteranceIndex: number, forcePlay: boolean = false): boolean {
    return this.skipToPosition(utteranceIndex, forcePlay);
  }

  // Playback Parameters
  setRate(rate: number): void {
    this.engine.setRate(rate);
  }

  getRate(): number {
    return this.engine.getRate();
  }

  setPitch(pitch: number): void {
    this.engine.setPitch(pitch);
  }

  getPitch(): number {
    return this.engine.getPitch();
  }

  setVolume(volume: number): void {
    this.engine.setVolume(volume);
  }

  getVolume(): number {
    return this.engine.getVolume();
  }

  // State - Navigator is the single source of truth
  getState(): ReadiumSpeechPlaybackState {
    return this.navigatorState;
  }

  // Events
  on(event: ReadiumSpeechPlaybackEvent["type"] | "contentchange", listener: (event: ReadiumSpeechPlaybackEvent) => void): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(listener);

    return () => {
      const listeners = this.eventListeners.get(event);
      if (listeners) {
        const index = listeners.indexOf(listener);
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

  private emitContentChangeEvent(event: { content: ReadiumSpeechUtterance[] }): void {
    const listeners = this.eventListeners.get("contentchange");
    if (listeners) {
      listeners.forEach(callback => callback({ type: "contentchange", detail: event } as unknown as ReadiumSpeechPlaybackEvent));
    }
  }

  // Preferences API (Configurable<SpeechSettings, SpeechPreferences>)
  get settings(): SpeechSettings {
    return this._settings;
  }

  get preferencesEditor(): SpeechPreferencesEditor {
    if (this._preferencesEditor === null) {
      this._preferencesEditor = new SpeechPreferencesEditor(this._preferences, this.settings);
    }
    return this._preferencesEditor;
  }

  submitPreferences(preferences: SpeechPreferences): void {
    this._preferences = this._preferences.merging(preferences);
    this.applyPreferences();
  }

  private applyPreferences(): void {
    this._settings = new SpeechSettings(this._preferences, this._defaults);

    if (this._preferencesEditor !== null) {
      this._preferencesEditor = new SpeechPreferencesEditor(this._preferences, this._settings);
    }

    // Only takes effect on content loaded via loadGndContent(); prosody
    // settings need no push here since the `end` handler reads
    // `this._settings` live.
    this.reextract();
  }

  async destroy(): Promise<void> {
    this.eventListeners.clear();
    await this.engine.destroy();
  }
}
