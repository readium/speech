import { ReadiumSpeechPlaybackEngine } from "./engine";
import { GndObject } from "./gnd/types";
import { ReadiumSpeechNavigatorContract, ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "./navigator";
import { extractionPreferenceKeys } from "./preferences/constraints";
import { ISpeechDefaults, SpeechDefaults } from "./preferences/SpeechDefaults";
import { ISpeechPreferences, SpeechPreferences } from "./preferences/SpeechPreferences";
import { SpeechPreferencesEditor } from "./preferences/SpeechPreferencesEditor";
import { SpeechSettings } from "./preferences/SpeechSettings";
import { ReadiumSpeechUtterance } from "./utterance";
import { extractUtterances } from "./utterances/extractUtterances";
import { ReadiumSpeechVoice } from "./voices/types";

export interface ReadiumSpeechNavigatorConfiguration {
  preferences?: ISpeechPreferences;
  defaults?: ISpeechDefaults;
}

export class ReadiumSpeechNavigator implements ReadiumSpeechNavigatorContract {
  private engine: ReadiumSpeechPlaybackEngine;
  private contentQueue: ReadiumSpeechUtterance[] = [];
  private eventListeners: Map<ReadiumSpeechPlaybackEvent["type"] | "contentchange", ((event: ReadiumSpeechPlaybackEvent) => void)[]> = new Map();

  // Navigator owns the state, not the engine
  private navigatorState: ReadiumSpeechPlaybackState = "idle";

  // Scheduled by the "end" handler's pauseDuration delay — cleared on
  // stop()/pause()/destroy() so a stale delayed speak() can't fire after
  // playback was told to stop or pause.
  private pendingAdvanceTimeout: ReturnType<typeof setTimeout> | null = null;

  // Preferences API (Configurable<SpeechSettings, SpeechPreferences>)
  private _defaults: SpeechDefaults;
  private _preferences: SpeechPreferences;
  private _settings: SpeechSettings;
  private _preferencesEditor: SpeechPreferencesEditor | null = null;

  // The raw GND source, retained only when content was loaded via
  // `loadGndContent()`. Its absence is what makes submitPreferences()'s
  // extraction-affecting fields (format, verbosity, skip, contextualize,
  // language) a no-op on content loaded via loadContent() — prosody
  // fields (rate/pitch/volume/pauseDuration/pauseScope) still apply.
  private source: GndObject[] | undefined;

  constructor(engine: ReadiumSpeechPlaybackEngine, configuration: ReadiumSpeechNavigatorConfiguration = {}) {
    this.engine = engine;
    this._defaults = new SpeechDefaults(configuration.defaults);
    this._preferences = new SpeechPreferences(configuration.preferences);
    this._settings = new SpeechSettings(this._preferences, this._defaults);
    this.setupEngineListeners();
    this.applyEngineParameters();
    void this.initializeEngine();
  }

  // Unlike pauseDuration/pauseScope (read live off settings), the engine owns rate/pitch/volume and must be pushed.
  private applyEngineParameters(): void {
    this.engine.setRate(this._settings.rate);
    this.engine.setPitch(this._settings.pitch);
    this.engine.setVolume(this._settings.volume);
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
        this.pendingAdvanceTimeout = setTimeout(() => {
          this.pendingAdvanceTimeout = null;
          this.engine.speak(currentIndex + 1);
        }, delay);
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
    if (this.source) {
      throw new Error("loadContent() cannot be used after loadGndContent() — the two are exclusive. Create a new navigator instance to switch content sources.");
    }

    this.setContentQueue(content);
  }

  loadGndContent(nodes: GndObject[]): void {
    this.source = nodes;
    this.reextract();
  }

  private setContentQueue(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[]): void {
    // Cancel in-flight speech and any scheduled pause before swapping the
    // queue out from under them — loadUtterances() resets the engine's index
    // regardless, so leaving them running would race a mismatched queue.
    this.clearPendingAdvance();
    if (this.navigatorState === "playing" || this.navigatorState === "paused") {
      this.engine.stop();
    }

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

  // Re-runs extraction from `this.source` using the resolved settings.
  private reextract(): void {
    if (!this.source) return;
    const utterances = extractUtterances(this.source, {
      format: this._settings.format,
      inlineContextualization: this._settings.inlineContextualization,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      language: this._settings.language,
    });
    this.setContentQueue(utterances);
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
      this.clearPendingAdvance();
      this.setNavigatorState("paused");
      this.engine.pause();
    }
  }

  stop(): void {
    this.clearPendingAdvance();
    this.setNavigatorState("idle");
    this.engine.stop();  // Reset engine index first
    this.emitEvent({ type: "stop" });  // Then emit event for UI update
  }

  private clearPendingAdvance(): void {
    if (this.pendingAdvanceTimeout !== null) {
      clearTimeout(this.pendingAdvanceTimeout);
      this.pendingAdvanceTimeout = null;
    }
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

    this.clearPendingAdvance();

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
    if (!this.source && extractionPreferenceKeys.some((key) => preferences[key] !== undefined)) {
      console.warn(
        "submitPreferences(): extraction-affecting preferences (format, inlineContextualization, verbosity, skip, contextualize, language) have no effect on content loaded via loadContent() — use loadGndContent() to re-extract on submission.",
      );
    }

    this._preferences = this._preferences.merging(preferences);
    this.applyPreferences();
  }

  private applyPreferences(): void {
    this._settings = new SpeechSettings(this._preferences, this._defaults);
    this.applyEngineParameters();

    if (this._preferencesEditor !== null) {
      this._preferencesEditor = new SpeechPreferencesEditor(this._preferences, this._settings);
    }

    // Only takes effect on content loaded via loadGndContent(); prosody
    // settings need no push here since the `end` handler reads
    // `this._settings` live.
    this.reextract();
  }

  async destroy(): Promise<void> {
    this.clearPendingAdvance();
    this.eventListeners.clear();
    await this.engine.destroy();
  }
}
