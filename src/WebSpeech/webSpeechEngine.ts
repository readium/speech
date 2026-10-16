import { ReadiumSpeechPlaybackEngine } from "../engine.js";
import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../navigator.js";
import { ReadiumSpeechUtterance } from "../utterance.js";
import { ReadiumSpeechVoice } from "../voices/types.js";
import { WebSpeechVoiceManager } from "./WebSpeechVoiceManager.js";
import { normalizeLanguageCode } from "../voices/languages.js";
import { filterByBoundarySupport } from "../voices/sorting.js";
import { keepsSelectedVoice, voiceMatchesLanguage } from "../voices/languageMatching.js";

import { detectFeatures, WebSpeechFeatures } from "../utils/features.js";
import { detectPlatformFeatures, WebSpeechPlatformPatches } from "../utils/patches.js";
import { EventEmitter } from "../utils/eventEmitter.js";
import { clampIndex } from "../utils/array.js";
import { clamp } from "../utils/clamp.js";

import { decodeResidualHtmlEntities, neutralizeAngleBrackets } from "../utils/text.js";
import { stripSsmlTags } from "../utterances/text.js";

export class WebSpeechEngine implements ReadiumSpeechPlaybackEngine {
  private speechSynthesis: SpeechSynthesis;
  private speechSynthesisUtterance: any;
  private currentVoice: ReadiumSpeechVoice | null = null;
  // The voice of the utterance being spoken, reported in its "start" event.
  private speakingVoice: ReadiumSpeechVoice | null = null;
  private currentUtterances: ReadiumSpeechUtterance[] = [];
  private currentUtteranceIndex: number = 0;
  private playbackState: ReadiumSpeechPlaybackState = "idle";
  private readonly events = new EventEmitter<ReadiumSpeechPlaybackEvent["type"], ReadiumSpeechPlaybackEvent>();

  private voiceManager: WebSpeechVoiceManager | null = null;
  private defaultVoice: ReadiumSpeechVoice | null = null;

  // Keyed by `${language}:${needsBoundary}` — the boundary requirement rides in the key
  // so a voice switch that flips it warms/reads a distinct slot instead of a stale one.
  private languageVoiceCache: Map<string, ReadiumSpeechVoice | null> = new Map();
  // Languages of utterances' own voices loaded into the manager, even if it still lacks the voice
  private loadedOwnVoiceLanguages: Set<string> = new Set();
  private warmingLanguages: Map<string, Promise<void>> = new Map();
  private speakGeneration: number = 0;

  // Enhanced properties for cross-browser compatibility
  private resumeInfinityTimer?: number;
  private isSpeakingInternal: boolean = false;
  private restartPending: boolean = false;
  private isPausedInternal: boolean = false;
  private isAndroidPaused: boolean = false; // Explicitly tracks Android's paused state
  private pausedAtUtteranceIndex: number | null = null; // Tracks which utterance was playing when paused
  private initialized: boolean = false;
  private maxLengthExceeded: "error" | "none" | "warn" = "warn";
  private utterancesBeingCancelled: boolean = false; // Flag to track if utterances are being cancelled
  private hasCancelledInTask: boolean = false; // Safari: cancel() stopped speech in the current task
  private lacksNativePauseEvents: boolean = false; // Google and Chrome OS voices never fire onpause/onresume

  // Playback parameters
  private rate: number = 1.0;
  private pitch: number = 1.0;
  private volume: number = 1.0;

  private features: WebSpeechFeatures;
  private patches: WebSpeechPlatformPatches;

  constructor() {
    // Use detected features instead of hardcoded window properties
    this.features = detectFeatures();
    this.patches = detectPlatformFeatures();

    if (!this.features.speechSynthesis || !this.features.speechSynthesisUtterance) {
      throw new Error("Web Speech API is not available in this environment");
    }
    this.speechSynthesis = this.features.speechSynthesis;
    this.speechSynthesisUtterance = this.features.speechSynthesisUtterance;
  }

  // From Easy Speech,
  // Check infinity pattern for long texts (except on problematic platforms)
  // Skip resume infinity for Microsoft Natural voices as they have different behavior 
  // Only for voices without pause events (Chrome's Google voices, which cut off long texts): others would report each pause/resume
  private shouldUseResumeInfinity(): boolean {
    const selectedVoice = this.speakingVoice ?? this.currentVoice;
    const isMsNatural = !!(selectedVoice?.name &&
                         typeof selectedVoice.name === "string" &&
                         selectedVoice.name.toLocaleLowerCase().includes("(natural)"));
    return this.patches.isAndroid !== true && !this.patches.isFirefox && !this.patches.isSafari && !isMsNatural && this.lacksNativePauseEvents;
  }

  // Creates a new SpeechSynthesisUtterance using detected constructor
  private createUtterance(text: string): SpeechSynthesisUtterance {
    return new this.speechSynthesisUtterance(text);
  }

  async initialize(options: {
    languages?: string[];
    maxTimeout?: number;
    interval?: number;
    maxLengthExceeded?: "error" | "none" | "warn";
  } = {}): Promise<boolean> {
    const { languages, maxTimeout, interval, maxLengthExceeded = "warn" } = options;

    if (this.initialized) {
      return false;
    }

    this.maxLengthExceeded = maxLengthExceeded;

    try {
      // Initialize voice manager with provided options and get voices
      this.voiceManager = await WebSpeechVoiceManager.initialize({
        languages,
        maxTimeout,
        interval
      });

      // Find the best matching voice for the user's language using the optimized method
      const preferredLanguages = languages || [...(navigator.languages || ["en"])];
      this.defaultVoice = await this.voiceManager.getDefaultVoice(preferredLanguages, this.voices);

      this.initialized = true;
      return true;
    } catch (error) {
      console.error("Failed to initialize WebSpeechEngine:", error);
      this.initialized = false;
      return false;
    }
  }

  // Text length validation matching EasySpeech
  private validateText(text: string): void {
    const textBytes = new TextEncoder().encode(text);
    if (textBytes.length > 4096) {
      const message = "Text exceeds max length of 4096 bytes, which may not work with some voices.";
      switch (this.maxLengthExceeded) {
        case "none":
          break;
        case "error":
          throw new Error(`WebSpeechEngine: ${message}`);
        case "warn":
        default:
          console.warn(`WebSpeechEngine: ${message}`);
      }
    }
  }

  private getCurrentVoiceForUtterance(voice?: ReadiumSpeechVoice | string | null): ReadiumSpeechVoice | null {
    if (voice && typeof voice === "object") {
      return voice;
    }
    if (typeof voice === "string") {
      return this.voices.find(v => v.name === voice || v.language === voice) || null;
    }

    return this.currentVoice || this.defaultVoice;
  }

  private languageCacheKey(language: string, needsBoundary: boolean): string {
    return `${language}:${needsBoundary}`;
  }

  // By `voiceURI`, as voices of one `name` can differ in quality or language.
  private ownVoice(content: ReadiumSpeechUtterance): ReadiumSpeechVoice | undefined {
    if (!content.voice) return undefined;
    const voices = this.voices;
    return voices.find(voice => voice.voiceURI === content.voice) ?? voices.find(voice => voice.name === content.voice);
  }

  // The language of the utterance's voice when the browser has it but the manager hasn't loaded that language.
  private unloadedOwnVoiceLanguage(content: ReadiumSpeechUtterance): string | undefined {
    if (!content.voice || this.ownVoice(content)) return undefined;
    const browserVoices = this.speechSynthesis.getVoices();
    const language = (browserVoices.find(voice => voice.voiceURI === content.voice) ?? browserVoices.find(voice => voice.name === content.voice))?.lang;
    return language && !this.loadedOwnVoiceLanguages.has(language) ? language : undefined;
  }

  // Returns `undefined` (not a fallback voice) when content.language hasn't
  // been warmed into languageVoiceCache yet, or its own voice's language loaded — callers must await for it.
  private voiceForUtteranceSync(content: ReadiumSpeechUtterance): ReadiumSpeechVoice | null | undefined {
    const ownVoice = this.ownVoice(content);
    if (ownVoice) {
      return ownVoice;
    }
    if (this.unloadedOwnVoiceLanguage(content)) {
      return undefined;
    }

    const selectedVoice = this.getCurrentVoiceForUtterance(this.currentVoice);

    if (!content.language) {
      return selectedVoice;
    }

    const language = normalizeLanguageCode(content.language);

    if (keepsSelectedVoice(selectedVoice, language)) {
      return selectedVoice;
    }

    const needsBoundary = selectedVoice?.controls?.boundary !== false;
    const key = this.languageCacheKey(language, needsBoundary);
    if (this.languageVoiceCache.has(key)) {
      return this.languageVoiceCache.get(key) ?? selectedVoice;
    }

    return undefined;
  }

  // Awaits warming for a not-yet-seen content language rather than falling back
  // to the wrong-language voice.
  private async voiceForUtterance(content: ReadiumSpeechUtterance): Promise<ReadiumSpeechVoice | null> {
    const sync = this.voiceForUtteranceSync(content);
    if (sync !== undefined) {
      return sync;
    }

    const ownVoiceLanguage = this.unloadedOwnVoiceLanguage(content);
    if (ownVoiceLanguage) {
      await WebSpeechVoiceManager.initialize({ languages: [ownVoiceLanguage] });
      this.loadedOwnVoiceLanguages.add(ownVoiceLanguage);
      const synced = this.voiceForUtteranceSync(content);
      if (synced !== undefined) return synced;
    }
    await this.warmLanguageVoiceCache([content]);
    return this.voiceForUtteranceSync(content) ?? this.getCurrentVoiceForUtterance(this.currentVoice);
  }

  // Dedupes in-flight warms per (language, boundary requirement) so an awaited call and a
  // fire-and-forget one for the same slot don't redo the work.
  private async warmLanguageVoiceCache(contents: ReadiumSpeechUtterance[]): Promise<void> {
    if (!this.voiceManager) {
      return;
    }

    const selectedVoice = this.getCurrentVoiceForUtterance(this.currentVoice);
    const needsBoundary = selectedVoice?.controls?.boundary !== false;

    const languages = new Set(
      contents
        .filter(content => !this.ownVoice(content))
        .map(content => content.language)
        .filter((language): language is string => !!language)
        .map(language => normalizeLanguageCode(language))
        .filter(language => !keepsSelectedVoice(selectedVoice, language))
        .filter(language => !this.languageVoiceCache.has(this.languageCacheKey(language, needsBoundary)))
    );

    const pending = [...languages].filter(language => this.warmingLanguages.has(this.languageCacheKey(language, needsBoundary)));
    const toWarm = [...languages].filter(language => !this.warmingLanguages.has(this.languageCacheKey(language, needsBoundary)));

    const warmPromises = toWarm.map((language) => {
      const key = this.languageCacheKey(language, needsBoundary);
      const promise = (async () => {
        // Broaden the singleton in case initialize() was scoped narrower than this content needs
        await WebSpeechVoiceManager.initialize({ languages: [language] });

        const languageMatches = this.voices.filter(voice => voiceMatchesLanguage(voice, language));
        const candidates = filterByBoundarySupport(languageMatches, needsBoundary);

        const sorted = await this.voiceManager!.sortVoicesByQuality(candidates);
        const matched = sorted[0] ?? null;
        this.languageVoiceCache.set(key, matched);
        if (!matched) {
          this.emitEvent({ type: "languagefallback", detail: { language, reason: "no-matching-voice" } });
        }
      })();
      this.warmingLanguages.set(key, promise.finally(() => this.warmingLanguages.delete(key)));
      return this.warmingLanguages.get(key)!;
    });

    await Promise.all([
      ...warmPromises,
      ...pending.map(language => this.warmingLanguages.get(this.languageCacheKey(language, needsBoundary))!)
    ]);
  }

  // The default voice until one is set
  getCurrentVoice(): ReadiumSpeechVoice | null {
    return this.currentVoice ?? this.defaultVoice;
  }

  // Web Speech API has no SSML support: use the authored plain text, falling
  // back to a tag-stripped rendering of the SSML only when no plain
  // alternative was provided by the source.
  private toPlainText(utterances: ReadiumSpeechUtterance[]): ReadiumSpeechUtterance[] {
    return utterances.map(content => ({
      ...content,
      plain: content.plain ?? (content.ssml ? stripSsmlTags(decodeResidualHtmlEntities(content.ssml)) : "")
    }));
  }

  // Queue Management
  loadUtterances(contents: ReadiumSpeechUtterance[], startIndex?: number): void {
    this.currentUtterances = this.toPlainText(contents);
    this.currentUtteranceIndex = clampIndex(startIndex ?? 0, contents.length);
    void this.warmLanguageVoiceCache(this.currentUtterances);
    // Not setState(): never passes through "loading" first, so back-to-back loads while already
    // "ready" must still each emit — setState's diff-based emit would swallow the second one.
    this.playbackState = "ready";
    this.emitEvent({ type: "ready" });
  }

  // Voice Configuration
  async setVoice(voice: ReadiumSpeechVoice | string): Promise<void> {
    const previousVoice = this.currentVoice;

    if (typeof voice === "string") {
      // Find voice by name or language
      const foundVoice = this.voices.find(v => v.name === voice || v.language === voice);
      if (foundVoice) {
        this.currentVoice = foundVoice;
      } else {
        console.warn(`Voice "${voice}" not found`);
      }
    } else {
      this.currentVoice = voice;
    }

    if (this.currentVoice?.name !== previousVoice?.name) {
      this.scheduleRestartIfSpeaking();
    }

    // Update default voice if language changed
    if (
      this.voiceManager && 
      this.defaultVoice && this.currentVoice &&
      this.currentVoice.language !== this.defaultVoice.language
    ) {
      this.defaultVoice = await this.voiceManager.getDefaultVoice([this.currentVoice.language], this.voices);
    }
  }

  // Read from the manager each time, as initializing it with other languages adds theirs
  private get voices(): ReadiumSpeechVoice[] {
    return this.voiceManager?.getVoices() ?? [];
  }

  async getAvailableVoices(): Promise<ReadiumSpeechVoice[]> {
    if (this.voiceManager) {
      return this.voices;
    }

    // If voices not loaded yet, initialize first
    try {
      await this.initialize();
      return this.voices;
    } catch {
      return [];
    }
  }

  // Playback Control
  speak(utteranceIndex?: number): void {
    if (utteranceIndex !== undefined) {
      if (utteranceIndex < 0 || utteranceIndex >= this.currentUtterances.length) {
        throw new Error("Invalid utterance index");
      }
      this.currentUtteranceIndex = utteranceIndex;
    }
    this.restartPending = false; // any real speak() call supersedes a stale deferred restart

    if (this.currentUtterances.length === 0) {
      console.warn("No utterances loaded");
      return;
    }

    // Cancel any ongoing speech with Firefox workaround
    // Safari fires the replaced utterance's "canceled" error within cancel(): made stale first, as elsewhere
    if (this.patches.isSafari) this.speakGeneration++;
    this.cancelCurrentSpeech();
    const generation = ++this.speakGeneration;

    // Reset internal state
    this.isSpeakingInternal = true;
    this.isPausedInternal = false;

    // Set state to playing before starting new speech, for immediate UI
    // feedback — the "start" event itself waits for onstart below, the
    // actual signal that audio began, not just that speak() was called.
    this.setState("playing");
    this.stopResumeInfinity();

    // Ensure the utterance index is valid
    if (this.currentUtteranceIndex >= this.currentUtterances.length) {
      this.currentUtteranceIndex = 0;
    }

    // Safari ends an utterance spoken in the same task as cancel() at once, without speaking it
    if (this.patches.isSafari && this.hasCancelledInTask) {
      this.speakNextTask(generation, true);
      return;
    }

    // Speak immediately for responsive navigation; voice resolution only
    // actually awaits anything when the content's language isn't cached yet
    void this.speakCurrentUtterance(generation);
  }

  private cancelCurrentSpeech(): void {
    if (this.patches.isFirefox && this.speechSynthesis.speaking) {
      // Firefox workaround: set flag to ignore delayed onend events
      this.utterancesBeingCancelled = true;
      
      // Clear cancelled flag after delay
      setTimeout(() => {
        this.utterancesBeingCancelled = false;
      }, 100);
    }

    if (this.patches.isSafari && this.speechSynthesis.speaking) {
      this.hasCancelledInTask = true;
      setTimeout(() => {
        this.hasCancelledInTask = false;
      }, 0);
    }
    
    this.speechSynthesis.cancel();
  }
  
  // Safari: `retryIfUnstarted` speaks it once more if Safari ends it without starting it, as it can right after cancel()
  private speakNextTask(generation: number, retryIfUnstarted: boolean): void {
    setTimeout(() => {
      // A later speak() or stop() superseded it
      if (generation === this.speakGeneration) void this.speakCurrentUtterance(generation, retryIfUnstarted);
    }, 0);
  }

  private async speakCurrentUtterance(generation: number, retryIfUnstarted = false): Promise<void> {
    if (this.currentUtteranceIndex >= this.currentUtterances.length) {
      this.setState("idle");
      this.emitEvent({ type: "end" });
      return;
    }

    const content = this.currentUtterances[this.currentUtteranceIndex];
    const text = content.plain ?? "";

    // Validate text length
    this.validateText(text);

    const utterance = this.createUtterance(neutralizeAngleBrackets(text));

    // Enhanced voice selection with MSNatural detection, optionally
    // matched to this utterance's own content language
    const selectedVoice = await this.voiceForUtterance(content);

    // A newer speak()/stop() call superseded this one while resolving the voice
    if (generation !== this.speakGeneration) {
      return;
    }

    this.lacksNativePauseEvents = false;
    this.speakingVoice = selectedVoice;
    if (selectedVoice && this.voiceManager) {
      // Convert ReadiumSpeechVoice to SpeechSynthesisVoice using the initialized voiceManager
      const nativeVoice = this.voiceManager.convertToSpeechSynthesisVoice(selectedVoice);
      
      if (nativeVoice) {
        utterance.voice = nativeVoice; // Use the real native voice from cache
        utterance.lang = nativeVoice.lang;
        this.lacksNativePauseEvents = nativeVoice.name.startsWith("Google") || nativeVoice.name.startsWith("Chrome OS");
      }
    }

    if (content.language) {
      utterance.lang = content.language;
    }

    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = this.volume;

    // Set up event handlers with resume infinity pattern
    let started = false;
    utterance.onstart = () => {
      started = true;
      if (generation !== this.speakGeneration) return;
      this.isSpeakingInternal = true;
      this.isPausedInternal = false;
      this.setState("playing");
      this.emitEvent({ type: "start", detail: { voice: selectedVoice } });

      // Clear Android paused state when new utterance actually starts
      if (this.patches.isAndroid && this.isAndroidPaused) {
        this.isAndroidPaused = false;
      }

      const shouldUseResumeInfinity = this.shouldUseResumeInfinity();
      if (shouldUseResumeInfinity) {
        this.startResumeInfinity(utterance);
      }
    };

    utterance.onend = () => {
      // Firefox workaround: ignore onend from cancelled utterances
      if (this.utterancesBeingCancelled) {
        this.utterancesBeingCancelled = false;
        return;
      }
      if (generation !== this.speakGeneration) return;

      // Don't continue if stopped
      if (this.playbackState === "idle") {
        return;
      }

      if (retryIfUnstarted && !started && this.playbackState === "playing") {
        this.speakNextTask(generation, false);
        return;
      }
      
      // Just report completion - navigator handles playback decisions
      this.isSpeakingInternal = false;
      this.isPausedInternal = false;
      this.stopResumeInfinity();
      
      // Set idle state if we've reached the end
      if (this.currentUtteranceIndex >= this.currentUtterances.length - 1) {
        this.setState("idle");
      }
      
      this.emitEvent({ type: "end" });
    };

    utterance.onerror = (event) => {
      if (generation !== this.speakGeneration) return;
      // Skip error handling for Android pause operations
      if (event.error === "interrupted" && this.patches.isAndroid && this.isAndroidPaused) {
        return;
      }

      // Common cleanup
      this.isSpeakingInternal = false;
      this.isPausedInternal = false;
      this.stopResumeInfinity();
      this.setState("idle");

      // Fatal errors that break playback completely - reset to beginning
      const fatalErrors = ["synthesis-unavailable", "audio-hardware", "voice-unavailable"];
      if (fatalErrors.includes(event.error)) {
        console.log(`[ENGINE] fatal error detected, resetting index to 0`);
        this.currentUtteranceIndex = 0;
      }

      // Handle interrupted/canceled as stop events
      if (event.error === "interrupted" || event.error === "canceled") {
        this.emitEvent({ type: "stop" });
      } else {
        // All other errors
        this.emitEvent({
          type: "error",
          detail: {
            error: event.error,  // Preserve original error type
            message: `Speech synthesis error: ${event.error}`
          }
        });
      }
    };

    utterance.onpause = () => {
      if (generation !== this.speakGeneration) return;
      this.isPausedInternal = true;
      this.isSpeakingInternal = false;
      this.emitEvent({ type: "pause" });
    };

    utterance.onresume = () => {
      if (generation !== this.speakGeneration) return;
      this.isPausedInternal = false;
      this.isSpeakingInternal = true;
      this.emitEvent({ type: "resume" });
    };

    // Handle word and sentence boundaries
    utterance.onboundary = (event) => {
      // A stray/delayed boundary from an already-cancelled utterance must not
      // be resolved against whatever utterance is current by now.
      if (generation !== this.speakGeneration) return;
      this.emitEvent({
        type: "boundary",
        detail: {
          charIndex: event.charIndex,
          charLength: event.charLength,
          elapsedTime: event.elapsedTime,
          name: event.name
        }
      });
    };

    // Handle SSML marks
    utterance.onmark = (event) => {
      if (generation !== this.speakGeneration) return;
      this.emitEvent({
        type: "mark",
        detail: {
          name: event.name
        }
      });
    };

    this.speechSynthesis.speak(utterance);
  }

  private startResumeInfinity(utterance: SpeechSynthesisUtterance): void {
    const shouldUseResumeInfinity = this.shouldUseResumeInfinity();
    
    if (!shouldUseResumeInfinity) {
      return;
    }
    
    // Use the same logic as EasySpeech with internal patching
    this.resumeInfinityTimer = window.setTimeout(() => {
      // Check if utterance still exists and speech is active
      if (utterance) {
        // Include internal patching, since some systems have problems with
        // pause/resume and updating the internal state on speechSynthesis
        const { paused, speaking } = this.speechSynthesis;
        const isSpeaking = speaking || this.isSpeakingInternal;
        const isPaused = paused || this.isPausedInternal;
        
        if (isSpeaking && !isPaused) {
          this.speechSynthesis.pause();
          this.speechSynthesis.resume();
        }
      }
      
      // Continue the pattern (matches EasySpeech recursive pattern)
      this.startResumeInfinity(utterance);
    }, 5000);
  }

  private stopResumeInfinity(): void {
    if (this.resumeInfinityTimer) {
      clearTimeout(this.resumeInfinityTimer);
      this.resumeInfinityTimer = undefined;
    }
  }

  pause(): void {
    if (this.playbackState === "playing") {
      // Store the current index when pausing
      this.pausedAtUtteranceIndex = this.currentUtteranceIndex;

      // Common state updates
      this.isPausedInternal = true;
      this.isSpeakingInternal = false;
      this.setState("paused");

      if (this.patches.isAndroid) {
        this.isAndroidPaused = true;
        this.speechSynthesis.cancel();
        // Android's cancel() never fires the native onpause handler below — this is the only "pause" signal there.
        this.emitEvent({ type: "pause" });
      } else {
        this.speechSynthesis.pause();
        // Non-Android fires the native onpause handler asynchronously, so emitting here would duplicate it,
        // except for voices that never fire it.
        if (this.lacksNativePauseEvents) this.emitEvent({ type: "pause" });
      }
    }
  }

  resume(): void {
    if (this.playbackState === "paused" && (this.currentUtteranceIndex < this.currentUtterances.length)) {
      // Common state updates
      this.isPausedInternal = false;
      this.isSpeakingInternal = true;
      this.setState("playing");

      // Check if we need to restart or can resume
      const shouldRestart = this.patches.isAndroid || 
                          this.pausedAtUtteranceIndex !== this.currentUtteranceIndex;
      
      if (shouldRestart) {
        // speak() emits its own "start", not "resume" — this is the only "resume" signal for a restart.
        this.emitEvent({ type: "resume" });
        this.speak(this.currentUtteranceIndex);
      } else {
        // Otherwise, resume from where we left off — the native onresume handler
        // fires asynchronously; emitting here too would duplicate it, except for voices that never fire it.
        this.speechSynthesis.resume();
        if (this.lacksNativePauseEvents) this.emitEvent({ type: "resume" });
      }
      
      // Reset the paused index
      this.pausedAtUtteranceIndex = null;
    }
  }

  stop(): void {
    this.cancelCurrentSpeech();
    this.speakGeneration++;
    this.currentUtteranceIndex = 0;  // Reset to beginning when stopped
    
    // Reset Android paused state when stopping
    if (this.patches.isAndroid) {
      this.isAndroidPaused = false;
    }
    
    this.setState("idle");
    this.emitEvent({ type: "stop" });  // Emit immediately
  }

  // Playback Parameters
  setRate(rate: number): void {
    const clamped = clamp(rate, 0.1, 10, this.rate);
    if (clamped === this.rate) return;
    this.rate = clamped;
    this.scheduleRestartIfSpeaking();
  }

  getRate(): number {
    return this.rate;
  }

  setPitch(pitch: number): void {
    const clamped = clamp(pitch, 0, 2, this.pitch);
    if (clamped === this.pitch) return;
    this.pitch = clamped;
    this.scheduleRestartIfSpeaking();
  }

  getPitch(): number {
    return this.pitch;
  }

  setVolume(volume: number): void {
    const clamped = clamp(volume, 0, 1, this.volume);
    if (clamped === this.volume) return;
    this.volume = clamped;
    this.scheduleRestartIfSpeaking();
  }

  getVolume(): number {
    return this.volume;
  }

  // Voice, language, rate, pitch and volume are baked into the SpeechSynthesisUtterance at speak()-time:
  // restart it so a change applies now (or on resume when paused). Same-tick changes coalesce.
  private scheduleRestartIfSpeaking(): void {
    if (this.playbackState === "paused") {
      this.pausedAtUtteranceIndex = null; // makes resume() restart instead of resuming natively
      return;
    }
    if (!this.isSpeakingInternal || this.restartPending) return;
    this.restartPending = true;
    queueMicrotask(() => {
      if (!this.restartPending) return; // a real speak() call already superseded this
      this.restartPending = false;
      if (this.playbackState === "paused") this.pausedAtUtteranceIndex = null;
      else if (this.isSpeakingInternal) this.speak(this.currentUtteranceIndex);
    });
  }

  // State
  getState(): ReadiumSpeechPlaybackState {
    return this.playbackState;
  }

  getCurrentUtteranceIndex(): number {
    return this.currentUtteranceIndex;
  }

  setCurrentUtteranceIndex(index: number, onComplete?: (success: boolean) => void): void {
    // Validate the new index
    if (index < 0 || index >= this.currentUtterances.length) {
      onComplete?.(false);
      return;
    }

    // If the index isn't changing
    if (index === this.currentUtteranceIndex) {
      onComplete?.(true);
      return;
    }

    // First, handle any ongoing speech
    if (!this.isPausedInternal && this.isSpeakingInternal) {
      this.cancelCurrentSpeech();
    }

    // Update the index
    this.currentUtteranceIndex = index;
    onComplete?.(true);
  }

  getUtteranceCount(): number {
    return this.currentUtterances.length;
  }

  // Events
  on(event: ReadiumSpeechPlaybackEvent["type"], callback: (event: ReadiumSpeechPlaybackEvent) => void): () => void {
    return this.events.on(event, callback);
  }

  private emitEvent(event: ReadiumSpeechPlaybackEvent): void {
    this.events.emit(event.type, event);
  }

  private setState(state: ReadiumSpeechPlaybackState): void {
    const oldState = this.playbackState;
    this.playbackState = state;

    // Emit state change events
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

  // Cleanup with comprehensive error handling
  async destroy(): Promise<void> {
    this.stop();
    this.stopResumeInfinity();
    this.events.clear();
    this.currentUtterances = [];
    this.currentVoice = null;
    this.speakingVoice = null;
    this.voiceManager = null;
    this.defaultVoice = null;
    this.languageVoiceCache.clear();
    this.warmingLanguages.clear();
    this.initialized = false;
  }
}