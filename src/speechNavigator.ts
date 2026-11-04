import { ReadiumSpeechPlaybackEngine } from "./engine.js";
import type { GuidedNavigationObject } from "@readium/shared";
import { ReadiumSpeechContentOptions, ReadiumSpeechNavigatorContract, ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "./navigator.js";
import { extractionPreferenceKeys } from "./preferences/constraints.js";
import { ISpeechDefaults, SpeechDefaults } from "./preferences/SpeechDefaults.js";
import { ISpeechPreferences, SpeechPreferences, VoicePreference } from "./preferences/SpeechPreferences.js";
import { SpeechPreferencesEditor } from "./preferences/SpeechPreferencesEditor.js";
import { SpeechSettings } from "./preferences/SpeechSettings.js";
import { ContextualizationShapeOverrides, resolveContextualizationShapes } from "./preferences/verbosityTables.js";
import { ReadiumSpeechUtterance } from "./utterance.js";
import { resolveBoundaryLocate } from "./utterances/boundaryLocate.js";
import { resolveUtteranceLocate } from "./utterances/utteranceLocate.js";
import { extractUtterancesWithSources, type SourceTrace } from "./utterances/extractUtterances.js";
import { Contextualizations } from "./utterances/types.js";
import { overriddenLanguage } from "./utterances/language.js";
import type { SentenceSegmenter } from "./utterances/sentenceSegmenter.js";
import { ReadiumSpeechVoice } from "./voices/types.js";
import { getVoiceId } from "./voices/voiceId.js";
import { pickLanguageVoice } from "./voices/defaultVoice.js";
import { normalizeLanguageCode } from "./voices/languageCode.js";
import { voiceBaseLanguage, voiceForLanguage } from "./voices/voiceForLanguage.js";
import { extractLangRegionFromBCP47 } from "./utils/language.js";
import { EventEmitter } from "./utils/eventEmitter.js";

// Set once at construction, never through `submitPreferences()` — none of
// this changes at runtime the way a preference does.
export interface ContextualizationOverrides {
  contextualizations?: Contextualizations;
  shapes?: ContextualizationShapeOverrides;
  params?: (role: string, node: GuidedNavigationObject) => Record<string, string> | undefined;
}

// Same rationale as ContextualizationOverrides — static, not a preference.
export interface SegmentationOverrides {
  suppressions?: Record<string, string[]>;
  segmenter?: SentenceSegmenter;
}

export interface ReadiumSpeechNavigatorConfiguration {
  preferences?: ISpeechPreferences;
  defaults?: ISpeechDefaults;
  contextualizationOverrides?: ContextualizationOverrides;
  segmentationOverrides?: SegmentationOverrides;
  // The content's languages, main first, e.g. a publication's: each gets a voice picked before content in it is loaded.
  languages?: string[];
}

export class ReadiumSpeechNavigator implements ReadiumSpeechNavigatorContract {
  private engine: ReadiumSpeechPlaybackEngine;
  private readonly languages: string[];
  private contentQueue: ReadiumSpeechUtterance[] = [];
  // `contentQueue` as loaded, before `voice` stamped it — re-stamped when that changes.
  private loadedQueue: ReadiumSpeechUtterance[] = [];
  private loadedLanguages: string[] = [];
  private readonly events = new EventEmitter<ReadiumSpeechPlaybackEvent["type"] | "contentchange", ReadiumSpeechPlaybackEvent>();

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
  private preferencesEditorVoice: VoicePreference | null = null;
  private readonly contextualizationOverrides?: ContextualizationOverrides;
  private readonly segmentationOverrides?: SegmentationOverrides;

  // The raw GND source, retained only when content was loaded via
  // `loadGndContent()`. Its absence is what makes submitPreferences()'s
  // extraction-affecting fields (format, verbosity, skip, contextualize,
  // language, segmentation) a no-op on content loaded via loadContent() — prosody
  // fields (rate/pitch/volume/pauseDuration/autoPause) still apply.
  private source: GuidedNavigationObject[] | undefined;

  // The language of the loaded content as a whole, given with it.
  private contentLanguage: string | undefined;

  // Parallel to `contentQueue`, from the extraction that produced it — lets
  // reextract() find where to resume after a reload (see resolveResumeIndex).
  private contentSources: SourceTrace = [];

  // Parallel to `contentQueue`: whether each utterance begins a new
  // block-level element. loadContent() content has no boundaries of its own.
  private contentBlockStarts: boolean[] = [];

  // Set by setContentQueue() when a reload should resume mid-queue rather
  // than at the start; consumed once by the engine's "ready" handler.
  private pendingResumeIndex: number | null = null;
  private pendingResumeState: "playing" | "paused" | null = null;

  // Index to speak() on the next play() when autoPause has stopped playback between utterances.
  private pendingAutoPauseIndex: number | null = null;

  // The engine's voices, as last listed, which content without a voice of its own gets one of.
  private voices: ReadiumSpeechVoice[] = [];
  private voiceIds: Set<string> = new Set();
  // Keyed by `${language}:${needsBoundary}`: the voice picked for content in a language, null when it has none.
  private pickedVoices: Map<string, ReadiumSpeechVoice | null> = new Map();
  private pickingVoices: Map<string, Promise<void>> = new Map();
  // The engine's latest voice listing: one resolving after a newer one started gives way to it.
  private voiceListing: Promise<ReadiumSpeechVoice[]> | null = null;
  private reportedLanguageFallbacks: Set<string> = new Set();
  // `settings.voice` as "voiceschanged" last told it, so loads and refreshes racing each other tell a change once.
  private notifiedVoice: VoicePreference | null = null;
  // Bumped by every setContentQueue(), so a load still waiting for its voices knows it was superseded.
  private loadGeneration = 0;

  constructor(engine: ReadiumSpeechPlaybackEngine, configuration: ReadiumSpeechNavigatorConfiguration = {}) {
    this.engine = engine;
    this._defaults = new SpeechDefaults(configuration.defaults);
    this._preferences = new SpeechPreferences(configuration.preferences);
    this._settings = new SpeechSettings(this._preferences, this._defaults);
    this.contextualizationOverrides = configuration.contextualizationOverrides;
    this.segmentationOverrides = configuration.segmentationOverrides;
    this.languages = configuration.languages ?? [];
    this.setupEngineListeners();
    this.applyEngineParameters();
    this.notifiedVoice = this.spokenVoice();
    void this.initializeEngine();
  }

  // Unlike pauseDuration/autoPause (read live off settings), the engine owns rate/pitch/volume and must be pushed.
  private applyEngineParameters(): void {
    this.engine.setRate(this._settings.rate);
    this.engine.setPitch(this._settings.pitch);
    this.engine.setVolume(this._settings.volume);
  }

  private async initializeEngine(): Promise<void> {
    try {
      await this.engine.initialize?.();
      await this.refreshVoices();
    } catch (error) {
      console.warn("Failed to initialize speech engine:", error);
    }
  }

  // The languages voices are picked for ahead: the configured ones, as `languageOverrides` speaks them, else the content's.
  private spokenLanguages(): string[] {
    const languages = this.languages.length > 0 ? this.languages : this.contentLanguage ? [this.contentLanguage] : [];
    return languages.map(language => overriddenLanguage(language, this._settings.languageOverrides) ?? language);
  }

  // The voice for content in `language`: a single voice for all, else the record's exact tag, then its base language.
  private voiceIdFor(voice: VoicePreference | null, language: string | undefined): string | undefined {
    if (typeof voice === "string") return voice;
    return voice && language ? voiceForLanguage(voice, language) : undefined;
  }

  // The main language's voice prefers boundary events; the others match its boundary support.
  private needsBoundary(language: string): boolean {
    const [main] = this.spokenLanguages();
    if (!main || normalizeLanguageCode(language) === normalizeLanguageCode(main)) return true;
    const picked = this.pickedVoices.get(this.pickKey(main, true));
    const id = this.voiceIdFor(this.settingsWith(picked ? { [this.pickedVoiceKey(main, picked)]: getVoiceId(picked) } : null).voice, main);
    const mainVoice = this.voices.find(voice => getVoiceId(voice) === id);
    return mainVoice?.controls?.boundary !== false;
  }

  private pickKey(language: string, needsBoundary: boolean): string {
    return `${normalizeLanguageCode(language)}:${needsBoundary}`;
  }

  // `undefined` until picked
  private pickedVoice(language: string): ReadiumSpeechVoice | null | undefined {
    return this.pickedVoices.get(this.pickKey(language, this.needsBoundary(language)));
  }

  private async pickVoice(language: string): Promise<void> {
    const needsBoundary = this.needsBoundary(language);
    const key = this.pickKey(language, needsBoundary);
    if (this.pickedVoices.has(key)) return;
    let picking = this.pickingVoices.get(key);
    if (!picking) {
      const voices = this.voices;
      picking = pickLanguageVoice(language, voices, needsBoundary)
        .then((voice) => {
          // Unless the engine's voices changed meanwhile
          if (this.voices === voices) this.pickedVoices.set(key, voice);
        })
        .finally(() => this.pickingVoices.delete(key));
      this.pickingVoices.set(key, picking);
    }
    await picking;
  }

  // Lists the engine's voices for the spoken languages and `languages`, and picks one for each, the main language first.
  private async pickVoices(languages: string[] = []): Promise<void> {
    const spoken = this.spokenLanguages();
    const all = [...new Set([...spoken, ...languages].map(language => normalizeLanguageCode(language)).filter(Boolean))];
    let listing = this.engine.getAvailableVoices(all, this.preferredVoiceIds());
    this.voiceListing = listing;
    let voices = await listing;
    while (listing !== this.voiceListing) {
      listing = this.voiceListing!;
      voices = await listing;
    }
    if (voices.length !== this.voices.length || voices.some(voice => !this.voiceIds.has(getVoiceId(voice)))) {
      this.voices = voices;
      this.voiceIds = new Set(voices.map(voice => getVoiceId(voice)));
      this.pickedVoices.clear();
      this.pickingVoices.clear();
    }
    if (spoken[0]) await this.pickVoice(spoken[0]);
    await Promise.all(all.map(language => this.pickVoice(language)));
  }

  // Picks again, re-stamping loaded content whose voice that changes, and tells when the spoken voices change.
  private async refreshVoices(): Promise<void> {
    await this.pickVoices(this.loadedLanguages);
    if (this.loadedQueue.length > 0 && this.stamped().some((utterance, index) => utterance.voice !== this.contentQueue[index]?.voice)) {
      const { index, state } = this.resumeTarget();
      await this.setContentQueue(this.loadedQueue, index, state);
    }
    this.notifyVoicesChanged();
  }

  // A swapped-in engine starts the queue stamped with the previous one's voices: held, then reloaded with its own.
  private async refreshVoicesForEngine(): Promise<void> {
    // Between utterances, playback resumes at the next one, unless moved meanwhile
    const next = this.pendingAdvanceTimeout !== null ? this.getCurrentUtteranceIndex() + 1 : null;
    this.clearPendingAdvance();
    this.engine.pause();
    await this.pickVoices(this.loadedLanguages);
    if (this.loadedQueue.length > 0) {
      const { index, state } = this.resumeTarget();
      const resumeIndex = state && next !== null && this.getCurrentUtteranceIndex() === next - 1 ? next : index;
      await this.setContentQueue(this.loadedQueue, resumeIndex, state);
    }
    this.notifyVoicesChanged();
  }

  private notifyVoicesChanged(): void {
    const voice = this.spokenVoice();
    if (this.sameSettingValue(this.notifiedVoice, voice)) return;
    this.notifiedVoice = voice;
    this.emitEvent({ type: "voiceschanged" });
  }

  private spokenVoice(): VoicePreference | null {
    return this.settings.voice;
  }

  // The preference's voices the engine has, by their ids; an engine listing no voice can't tell, so it's trusted with them.
  private availableVoice(voice: VoicePreference | null): VoicePreference | null {
    if (typeof voice === "string") return this.listedVoiceId(voice) ?? null;
    if (!voice) return null;
    const voices = Object.fromEntries(Object.entries(voice).flatMap(([language, id]) => {
      const listed = this.listedVoiceId(id);
      return listed ? [[language, listed]] : [];
    }));
    return Object.keys(voices).length > 0 ? voices : null;
  }

  // Listed whatever their language, so they're kept rather than taken for another browser's.
  private preferredVoiceIds(): string[] {
    const voice = this._settings.voice;
    return typeof voice === "string" ? [voice] : voice ? Object.values(voice) : [];
  }

  // Matched by id, else by name, as engines match a voice.
  private listedVoiceId(id: string): string | undefined {
    if (this.voices.length === 0) return id;
    const voice = this.voices.find(voice => getVoiceId(voice) === id) ?? this.voices.find(voice => voice.name === id);
    return voice && getVoiceId(voice);
  }

  // The voice picked for each spoken and loaded language.
  private pickedVoiceRecord(): Record<string, string> | null {
    const voices: Record<string, string> = {};
    for (const language of new Set([...this.spokenLanguages(), ...this.loadedLanguages])) {
      const picked = this.pickedVoice(language);
      if (picked) voices[this.pickedVoiceKey(language, picked)] ??= getVoiceId(picked);
    }
    return Object.keys(voices).length > 0 ? voices : null;
  }

  // A pick is for the language's region only when the voice is of it, else for its base language.
  private pickedVoiceKey(language: string, picked: ReadiumSpeechVoice): string {
    const [base, region] = extractLangRegionFromBCP47(language);
    if (region && extractLangRegionFromBCP47(picked.language)[1] === region) return language;
    // Unless the base is another voice language's too, e.g. zh, Mandarin's, for zh-HK's Cantonese
    return voiceBaseLanguage(base) === voiceBaseLanguage(language) ? base : language;
  }

  private setupEngineListeners(): void {
    // Bridge engine events to navigator state management
    this.engine.on("start", (event) => {
      this.setNavigatorState("playing");
      // Emitted before "start" so a "start" listener already sees fresh
      // sentence/utterance locate info instead of the previous utterance's.
      const utterance = this.getCurrentContent();
      if (utterance) this.emitUtteranceBoundary(utterance);
      this.emitEvent({ type: "start", detail: event.detail });
    });

    this.engine.on("end", () => {
      const currentIndex = this.engine.getCurrentUtteranceIndex();
      const totalCount = this.engine.getUtteranceCount();

      if (currentIndex < totalCount - 1) {
        const inAutoPauseScope =
          this._settings.autoPause === "utterance" || this.contentBlockStarts[currentIndex + 1] === true;
        if (this._settings.autoPause !== "none" && inAutoPauseScope) {
          this.pendingAutoPauseIndex = currentIndex + 1;
          this.setNavigatorState("paused");
          this.emitEvent({ type: "pause" });
        } else {
          this.pendingAdvanceTimeout = setTimeout(() => {
            this.pendingAdvanceTimeout = null;
            this.engine.speak(currentIndex + 1);
          }, this._settings.pauseDuration);
        }
      } else {
        // Reached end - reset to the start so a later play() restarts rather than replaying
        // the last utterance, then set navigator to idle
        this.engine.setCurrentUtteranceIndex(0);
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
      if (this.contentQueue.length === 0) return;

      const resumeIndex = this.pendingResumeIndex;
      const resumeState = this.pendingResumeState;
      this.pendingResumeIndex = null;
      this.pendingResumeState = null;
      if (this.navigatorState !== "loading") return; // stop()/pause()/play() already took over

      if (resumeState === "playing") {
        this.setNavigatorState("playing");
        this.engine.speak(resumeIndex ?? 0);
        return;
      }
      if (resumeState === "paused") {
        const index = resumeIndex ?? 0;
        // The engine is "ready", not "paused", after the reload: play() must speak() rather than resume().
        this.pendingAutoPauseIndex = index;
        if (index > 0) this.engine.setCurrentUtteranceIndex(index, () => this.setNavigatorState("paused"));
        else this.setNavigatorState("paused");
        return;
      }

      this.setNavigatorState("ready");
      this.emitEvent({ type: "ready" });
    });

    this.engine.on("boundary", (event) => {
      const { charIndex, charLength } = event.detail ?? {};
      // As extracted, not as stamped: substitution metadata is keyed by the extracted utterance.
      const utterance = this.loadedQueue[this.getCurrentUtteranceIndex()];
      const resolved = utterance && typeof charIndex === "number" && typeof charLength === "number"
        ? resolveBoundaryLocate(utterance, charIndex, charLength)
        : undefined;
      this.emitEvent(resolved ? { ...event, detail: { ...event.detail, ...resolved } } : event);
    });

    this.engine.on("mark", (event) => {
      this.emitEvent(event);
    });

    this.engine.on("voiceschanged", () => {
      void this.refreshVoices();
    });

    this.engine.on("enginefallback", (event) => {
      this.emitEvent(event);
      void this.refreshVoicesForEngine();
    });

    this.engine.on("enginerecovered", (event) => {
      this.emitEvent(event);
      void this.refreshVoicesForEngine();
    });
  }

  private setNavigatorState(state: ReadiumSpeechPlaybackState): void {
    this.navigatorState = state;
  }

  // Voice Management
  async getVoices(): Promise<ReadiumSpeechVoice[]> {
    return this.engine.getAvailableVoices();
  }

  // Content Management
  loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[], options: ReadiumSpeechContentOptions = {}): void {
    if (this.source) {
      throw new Error("loadContent() cannot be used after loadGndContent() — the two are exclusive. Create a new navigator instance to switch content sources.");
    }

    this.contentLanguage = options.language;
    void this.setContentQueue(content);
  }

  async loadGndContent(nodes: GuidedNavigationObject[], options: ReadiumSpeechContentOptions = {}): Promise<void> {
    this.source = nodes;
    this.contentLanguage = options.language;
    await this.reextract();
  }

  private async setContentQueue(
    content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[],
    resumeIndex: number | null = null,
    resumeState: "playing" | "paused" | null = null,
  ): Promise<void> {
    // Cancel any in-flight speech/pause before the reload — loadUtterances() resets the engine's index regardless.
    this.clearPendingAdvance();
    this.pendingAutoPauseIndex = null;
    if (this.navigatorState === "playing" || this.navigatorState === "paused") {
      this.engine.stop();
    }

    this.loadedQueue = Array.isArray(content) ? [...content] : [content];
    // Until loaded, the engine's "ready" is the previous content's
    this.contentQueue = [];
    this.pendingResumeIndex = resumeIndex;
    this.pendingResumeState = resumeState;

    // Readiness comes from the engine's own "ready" event (see setupEngineListeners),
    // not set here — engines that buffer ahead (e.g. SpeechServerEngine) fire it once
    // they're confident playback won't immediately stall.
    this.setNavigatorState("loading");
    this.emitEvent({ type: "loading" });

    // Content in a language without a picked voice waits for it rather than starting with another language's
    const generation = ++this.loadGeneration;
    const unvoiced = this.loadedQueue.map((utterance) => this.withLanguage(utterance)).filter((utterance) => !utterance.voice && utterance.language);
    this.loadedLanguages = [...new Set(unvoiced.map((utterance) => utterance.language!))];
    const unpicked = this.loadedLanguages.filter((language) => this.pickedVoice(language) === undefined);
    if (unpicked.length > 0) {
      await this.pickVoices(unpicked).catch(() => {});
      if (generation !== this.loadGeneration) return;
    }

    const contents = this.stamped();
    this.contentQueue = contents;
    this.reportLanguageFallbacks(contents);
    this.engine.loadUtterances(contents, resumeIndex ?? undefined);
    this.emitContentChangeEvent({ content: contents });
    this.notifyVoicesChanged();
  }

  private stamped(): ReadiumSpeechUtterance[] {
    const voice = this.settings.voice;
    return this.loadedQueue.map((utterance) => this.withVoice(this.withLanguage(utterance), voice));
  }

  // Once per language, for content in a language the engine has no voice for, spoken with the engine's own.
  private reportLanguageFallbacks(contents: ReadiumSpeechUtterance[]): void {
    if (this.voices.length === 0) return;
    for (const utterance of contents) {
      if (utterance.voice || !utterance.language || this.pickedVoice(utterance.language) !== null) continue;
      const language = normalizeLanguageCode(utterance.language);
      if (this.reportedLanguageFallbacks.has(language)) continue;
      this.reportedLanguageFallbacks.add(language);
      this.emitEvent({ type: "languagefallback", detail: { language: utterance.language, reason: "no-matching-voice" } });
    }
  }

  // The content's language when a loadContent() utterance has none; extraction applies it to loadGndContent()'s.
  private withLanguage(utterance: ReadiumSpeechUtterance): ReadiumSpeechUtterance {
    if (this.source !== undefined || this.contentLanguage === undefined || utterance.language) return utterance;
    return { ...utterance, language: this.contentLanguage };
  }

  // The utterance's own voice, else the spoken voice for its language.
  private withVoice(utterance: ReadiumSpeechUtterance, spokenVoice: VoicePreference | null): ReadiumSpeechUtterance {
    if (utterance.voice) return utterance;
    const voice = this.voiceIdFor(spokenVoice, utterance.language);
    return voice ? { ...utterance, voice } : utterance;
  }

  // Re-runs extraction from `this.source`, resuming near the old position if playback was underway.
  private async reextract(): Promise<void> {
    if (!this.source) return;
    const { index: oldIndex, state: resumeState } = this.resumeTarget();
    const oldSources = this.contentSources;

    const { utterances, sources, blockStarts } = await extractUtterancesWithSources(this.source, {
      format: this._settings.format,
      interruptions: this._settings.interruptions,
      skip: this._settings.skip,
      contextualize: this._settings.contextualize,
      contextualization: {
        contextualizations: this.contextualizationOverrides?.contextualizations,
        shapes: resolveContextualizationShapes(this._settings.verbosity, this.contextualizationOverrides?.shapes),
        params: this.contextualizationOverrides?.params,
      },
      language: this._settings.language,
      contentLanguage: this.contentLanguage,
      languageOverrides: this._settings.languageOverrides,
      segmentation: {
        mode: this._settings.segmentation,
        reconstruct: this._settings.reconstruct,
        suppressions: this.segmentationOverrides?.suppressions,
        segmenter: this.segmentationOverrides?.segmenter,
      },
    });
    this.contentSources = sources;
    this.contentBlockStarts = blockStarts;

    const resumeIndex = resumeState && oldIndex !== null ? this.resolveResumeIndex(oldSources, oldIndex, sources) : null;
    await this.setContentQueue(utterances, resumeIndex, resumeState);
  }

  // Nearest node at or before oldIndex that's still present in newSources.
  // A reconstructed-sentence span (a `[first, last]` tuple) is a fresh array
  // each extraction, so it never matches by identity — skipped in favor of
  // the next plain single-node entry further back.
  private resolveResumeIndex(oldSources: SourceTrace, oldIndex: number, newSources: SourceTrace): number | null {
    for (let i = Math.min(oldIndex, oldSources.length - 1); i >= 0; i--) {
      const node = oldSources[i];
      if (node === undefined || Array.isArray(node)) continue;
      const found = newSources.indexOf(node);
      if (found !== -1) return found;
    }
    return null;
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

  // Where play() continues: the utterance autoPause or a pause between utterances withheld, else the current one.
  private resumePosition(): number {
    return this.pendingAutoPauseIndex ?? this.getCurrentUtteranceIndex();
  }

  // The playback a reload restores: the current one, or the one a reload still loading was to restore.
  private resumeTarget(): { index: number | null; state: "playing" | "paused" | null } {
    if (this.navigatorState === "loading") return { index: this.pendingResumeIndex, state: this.pendingResumeState };
    const state = this.navigatorState === "playing" || this.navigatorState === "paused" ? this.navigatorState : null;
    return { index: state ? this.resumePosition() : null, state };
  }

  // Playback Control - Navigator coordinates engine operations
  play(): void {
    if (this.navigatorState === "paused") {
      this.setNavigatorState("playing");
      if (this.pendingAutoPauseIndex !== null) {
        // autoPause stopped playback between utterances — nothing for the
        // engine to resume, so speak() the utterance it was withheld on.
        const index = this.pendingAutoPauseIndex;
        this.pendingAutoPauseIndex = null;
        this.engine.speak(index);
      } else {
        this.engine.resume();
      }
    } else if (this.navigatorState === "ready" || this.navigatorState === "idle") {
      // Start playing from beginning
      this.setNavigatorState("playing");
      this.engine.speak();
    } else if (this.navigatorState === "playing") {
      // Already playing, do nothing or restart
      return;
    } else if (this.navigatorState === "loading") {
      // Played once the engine is ready, e.g. while the content's voices are picked
      this.pendingResumeState = "playing";
    }
  }

  pause(): void {
    if (this.navigatorState === "playing") {
      if (this.pendingAdvanceTimeout !== null) {
        // Between utterances the engine has nothing to pause, so play() must speak() the next one instead.
        this.clearPendingAdvance();
        this.pendingAutoPauseIndex = this.getCurrentUtteranceIndex() + 1;
        this.setNavigatorState("paused");
        this.emitEvent({ type: "pause" });
        return;
      }
      this.pendingAutoPauseIndex = null;
      this.setNavigatorState("paused");
      this.engine.pause();
    } else if (this.navigatorState === "loading" && this.pendingResumeState === "playing") {
      // Paused once the engine is ready, at the position it was to play from
      this.pendingResumeState = "paused";
    }
  }

  stop(): void {
    this.clearPendingAdvance();
    this.pendingAutoPauseIndex = null;
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
      if (this.pendingAutoPauseIndex !== null) this.pendingAutoPauseIndex = targetIndex;
      // For paused state, just update the index without speaking
      this.engine.setCurrentUtteranceIndex(targetIndex, (success) => {
        if (success) {
          const utterance = this.getCurrentContent();
          if (utterance) this.emitUtteranceBoundary(utterance);
          this.emitEvent({
            type: "skip",
            detail: { position: targetIndex }
          });
        }
      });
    } else {
      this.pendingAutoPauseIndex = null;
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
    return this.events.on(event, listener);
  }

  private emitEvent(event: ReadiumSpeechPlaybackEvent): void {
    this.events.emit(event.type, event);
  }

  // Real engines rarely emit a native "sentence" boundary mark (the Web Speech
  // API allows it but implementations don't), so the navigator synthesizes the
  // whole-utterance boundary itself whenever the current utterance changes.
  // Same `detail.locate` key as a "word" boundary uses (see engine.on("boundary")
  // above) — only its type differs, a LocatorOptions[] here vs a single
  // LocatorOptions there — and the same "resolve, then skip if there's nothing
  // to show" shape, since there's no raw engine event to fall back to unenriched.
  private emitUtteranceBoundary(utterance: ReadiumSpeechUtterance): void {
    const segmentation = this._settings.segmentation;
    const locate = resolveUtteranceLocate(utterance, segmentation);
    if (!locate.length) return;
    const name = segmentation === "sentence" ? "sentence" : "structure";
    this.emitEvent({
      type: "boundary",
      detail: { name, charIndex: 0, charLength: (utterance.plain ?? "").length, locate },
    });
  }

  private emitContentChangeEvent(event: { content: ReadiumSpeechUtterance[] }): void {
    this.events.emit("contentchange", { type: "contentchange", detail: event } as unknown as ReadiumSpeechPlaybackEvent);
  }

  // Preferences API (Configurable<SpeechSettings, SpeechPreferences>)
  get settings(): SpeechSettings {
    return this.settingsWith(this.pickedVoiceRecord());
  }

  // `picks` are the voice defaults; the preference's voices the engine doesn't have give way to them.
  private settingsWith(picks: Record<string, string> | null): SpeechSettings {
    return new SpeechSettings(
      this._preferences.merging(new SpeechPreferences({ voice: this.availableVoice(this._settings.voice) })),
      new SpeechDefaults({ ...this._defaults, voice: picks })
    );
  }

  // Rebuilt, staged edits kept, once the spoken voices change, e.g. when they're picked after being read.
  get preferencesEditor(): SpeechPreferencesEditor {
    const voice = this.spokenVoice();
    if (this._preferencesEditor === null || !this.sameSettingValue(voice, this.preferencesEditorVoice)) {
      this._preferencesEditor = new SpeechPreferencesEditor(this._preferencesEditor?.preferences ?? this._preferences, this.settings);
      this.preferencesEditorVoice = voice;
    }
    return this._preferencesEditor;
  }

  async submitPreferences(preferences: SpeechPreferences): Promise<void> {
    if (!this.source && this.contentQueue.length > 0 && extractionPreferenceKeys.some((key) => preferences[key] !== undefined)) {
      console.warn(
        "submitPreferences(): extraction-affecting preferences (format, interruptions, verbosity, skip, contextualize, language, languageOverrides, segmentation, reconstruct) have no effect on content loaded via loadContent() — use loadGndContent() to re-extract on submission.",
      );
    }

    this._preferences = this._preferences.merging(preferences);
    await this.applyPreferences();
  }

  private async applyPreferences(): Promise<void> {
    const previousSettings = this._settings;
    this._settings = new SpeechSettings(this._preferences, this._defaults);
    this.applyEngineParameters();

    // Another main voice or spoken language changes the voices picked
    if (!this.sameSettingValue(previousSettings.voice, this._settings.voice) || !this.sameSettingValue(previousSettings.languageOverrides, this._settings.languageOverrides)) {
      await this.pickVoices().catch(() => {});
    }

    if (this._preferencesEditor !== null) {
      this._preferencesEditor = new SpeechPreferencesEditor(this._preferences, this.settings);
    }

    // Skip reextract() unless it would actually produce a different queue.
    if (extractionPreferenceKeys.some((key) => !this.sameSettingValue(this.extractionValue(previousSettings, key), this.extractionValue(this._settings, key)))) {
      await this.reextract();
    } else if (this.loadedQueue.length > 0 && !this.sameSettingValue(previousSettings.voice, this._settings.voice)) {
      const { index, state } = this.resumeTarget();
      await this.setContentQueue(this.loadedQueue, index, state);
    }
    this.notifyVoicesChanged();
  }

  // `reconstruct` only shapes extraction in sentence segmentation.
  private extractionValue(settings: SpeechSettings, key: (typeof extractionPreferenceKeys)[number]): unknown {
    return key === "reconstruct" ? settings.segmentation === "sentence" && settings.reconstruct : settings[key];
  }

  // Arrays (skip/contextualize) compare as sets and records (languageOverrides) by entries, not by reference.
  private sameSettingValue(a: unknown, b: unknown): boolean {
    if (Array.isArray(a) && Array.isArray(b)) {
      return a.length === b.length && a.every((role) => b.includes(role));
    }
    if (a && b && typeof a === "object" && typeof b === "object") {
      const entries = Object.entries(a);
      return entries.length === Object.keys(b).length && entries.every(([key, value]) => (b as Record<string, unknown>)[key] === value);
    }
    return a === b;
  }

  async destroy(): Promise<void> {
    // A load still waiting for its voices is dropped, and the content isn't reloaded once voices are listed
    this.loadGeneration++;
    this.loadedQueue = [];
    this.clearPendingAdvance();
    this.events.clear();
    await this.engine.destroy();
  }
}
