import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../navigator";
import { ReadiumSpeechUtterance } from "../utterance";
import { ReadiumSpeechVoice } from "../voices/types";
import { WebSpeechVoiceManager } from "./WebSpeechVoiceManager";
import { normalizeLanguageCode } from "../voices/languages";
import { extractLangRegionFromBCP47 } from "../utils/language";

import { detectFeatures, WebSpeechFeatures } from "../utils/features";
import { detectPlatformFeatures, WebSpeechPlatformPatches } from "../utils/patches";
import { EventEmitter } from "../utils/eventEmitter";

import { stripHtml } from "string-strip-html";

export class WebSpeechEngine implements ReadiumSpeechPlaybackEngine {
  private speechSynthesis: SpeechSynthesis;
  private speechSynthesisUtterance: any;
  private currentVoice: ReadiumSpeechVoice | null = null;
  private currentUtterances: ReadiumSpeechUtterance[] = [];
  private currentUtteranceIndex: number = 0;
  private playbackState: ReadiumSpeechPlaybackState = "idle";
  private readonly events = new EventEmitter<ReadiumSpeechPlaybackEvent["type"], ReadiumSpeechPlaybackEvent>();

  private voiceManager: WebSpeechVoiceManager | null = null;
  private voices: ReadiumSpeechVoice[] = [];
  private defaultVoice: ReadiumSpeechVoice | null = null;

  private speakInContentLanguage: boolean = false;
  private languageVoiceCache: Map<string, ReadiumSpeechVoice | null> = new Map();
  private warmingLanguages: Map<string, Promise<void>> = new Map();
  private speakGeneration: number = 0;

  // Enhanced properties for cross-browser compatibility
  private resumeInfinityTimer?: number;
  private isSpeakingInternal: boolean = false;
  private isPausedInternal: boolean = false;
  private isAndroidPaused: boolean = false; // Explicitly tracks Android's paused state
  private pausedAtUtteranceIndex: number | null = null; // Tracks which utterance was playing when paused
  private initialized: boolean = false;
  private maxLengthExceeded: "error" | "none" | "warn" = "warn";
  private utterancesBeingCancelled: boolean = false; // Flag to track if utterances are being cancelled

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
  private shouldUseResumeInfinity(): boolean {
    const selectedVoice = this.currentVoice;
    const isMsNatural = !!(selectedVoice?.name &&
                         typeof selectedVoice.name === "string" &&
                         selectedVoice.name.toLocaleLowerCase().includes("(natural)"));
    return this.patches.isAndroid !== true && !this.patches.isFirefox && !this.patches.isSafari && !isMsNatural;
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
      this.voices = this.voiceManager.getVoices();

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

  // No cross-region fallback: fr-FR content must not match an fr-CA voice.
  private voiceMatchesLanguage(voice: ReadiumSpeechVoice, language: string): boolean {
    const [lang, region] = extractLangRegionFromBCP47(language);
    const [voiceLang, voiceRegion] = extractLangRegionFromBCP47(voice.language);
    return voiceLang === lang && (!region || voiceRegion === region);
  }

  // Returns `undefined` (not a fallback voice) when content.language hasn't
  // been warmed into languageVoiceCache yet — callers must await for it.
  private voiceForUtteranceSync(content: ReadiumSpeechUtterance): ReadiumSpeechVoice | null | undefined {
    const selectedVoice = this.getCurrentVoiceForUtterance(this.currentVoice);

    if (!this.speakInContentLanguage || !content.language) {
      return selectedVoice;
    }

    const language = normalizeLanguageCode(content.language);

    if (selectedVoice && this.voiceMatchesLanguage(selectedVoice, language)) {
      return selectedVoice;
    }

    if (this.languageVoiceCache.has(language)) {
      return this.languageVoiceCache.get(language) ?? selectedVoice;
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

    await this.warmLanguageVoiceCache([content]);
    return this.voiceForUtteranceSync(content) ?? this.getCurrentVoiceForUtterance(this.currentVoice);
  }

  // Dedupes in-flight warms per language so an awaited call and a
  // fire-and-forget one for the same language don't redo the work.
  private async warmLanguageVoiceCache(contents: ReadiumSpeechUtterance[]): Promise<void> {
    if (!this.speakInContentLanguage || !this.voiceManager) {
      return;
    }

    const languages = new Set(
      contents
        .map(content => content.language)
        .filter((language): language is string => !!language)
        .map(language => normalizeLanguageCode(language))
        .filter(language => !this.languageVoiceCache.has(language))
    );

    const pending = [...languages].filter(language => this.warmingLanguages.has(language));
    const toWarm = [...languages].filter(language => !this.warmingLanguages.has(language));

    const warmPromises = toWarm.map((language) => {
      const promise = (async () => {
        // Broaden the singleton in case initialize() was scoped narrower than this content needs
        await WebSpeechVoiceManager.initialize({ languages: [language] });
        this.voices = this.voiceManager!.getVoices();

        const candidates = this.voices.filter(voice => this.voiceMatchesLanguage(voice, language));
        const sorted = await this.voiceManager!.sortVoicesByQuality(candidates);
        const matched = sorted[0] ?? null;
        this.languageVoiceCache.set(language, matched);
        if (!matched) {
          this.emitEvent({ type: "languagefallback", detail: { language, reason: "no-matching-voice" } });
        }
      })();
      this.warmingLanguages.set(language, promise.finally(() => this.warmingLanguages.delete(language)));
      return this.warmingLanguages.get(language)!;
    });

    await Promise.all([
      ...warmPromises,
      ...pending.map(language => this.warmingLanguages.get(language)!)
    ]);
  }

  getCurrentVoice(): ReadiumSpeechVoice | null {
    return this.currentVoice;
  }

  setSpeakInContentLanguage(enabled: boolean): void {
    this.speakInContentLanguage = enabled;
    if (enabled) {
      void this.warmLanguageVoiceCache(this.currentUtterances);
    }
  }

  getSpeakInContentLanguage(): boolean {
    return this.speakInContentLanguage;
  }

  // Web Speech API has no SSML support: use the authored plain text, falling
  // back to a tag-stripped rendering of the SSML only when no plain
  // alternative was provided by the source.
  private toPlainText(utterances: ReadiumSpeechUtterance[]): ReadiumSpeechUtterance[] {
    return utterances.map(content => ({
      ...content,
      plain: content.plain ?? (content.ssml ? stripHtml(content.ssml).result : "")
    }));
  }

  // Queue Management
  loadUtterances(contents: ReadiumSpeechUtterance[], startIndex?: number): void {
    this.currentUtterances = this.toPlainText(contents);
    this.currentUtteranceIndex = Math.min(Math.max(startIndex ?? 0, 0), Math.max(contents.length - 1, 0));
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
        // Reset position when voice changes for fresh start with new voice
        if (previousVoice && previousVoice.name !== foundVoice.name) {
          this.currentUtteranceIndex = 0;
        }
      } else {
        console.warn(`Voice "${voice}" not found`);
      }
    } else {
      this.currentVoice = voice;
      // Reset position when voice changes for fresh start with new voice
      if (previousVoice && previousVoice.name !== voice.name) {
        this.currentUtteranceIndex = 0;
      }
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

  async getAvailableVoices(): Promise<ReadiumSpeechVoice[]> {
    if (this.voices.length > 0) {
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

    if (this.currentUtterances.length === 0) {
      console.warn("No utterances loaded");
      return;
    }

    // Cancel any ongoing speech with Firefox workaround
    this.cancelCurrentSpeech();
    const generation = ++this.speakGeneration;

    // Reset internal state
    this.isSpeakingInternal = true;
    this.isPausedInternal = false;

    // Set state to playing before starting new speech
    this.setState("playing");
    this.emitEvent({ type: "start" });
    this.stopResumeInfinity();

    // Reset utterance index to ensure we're starting fresh
    this.currentUtteranceIndex = utteranceIndex ?? this.currentUtteranceIndex;

    // Ensure the utterance index is valid
    if (this.currentUtteranceIndex >= this.currentUtterances.length) {
      this.currentUtteranceIndex = 0;
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
    
    this.speechSynthesis.cancel();
  }
  
  private async speakCurrentUtterance(generation: number): Promise<void> {
    if (this.currentUtteranceIndex >= this.currentUtterances.length) {
      this.setState("idle");
      this.emitEvent({ type: "end" });
      return;
    }

    const content = this.currentUtterances[this.currentUtteranceIndex];
    const text = content.plain ?? "";

    // Validate text length
    this.validateText(text);

    const utterance = this.createUtterance(text);

    // Enhanced voice selection with MSNatural detection, optionally
    // matched to this utterance's own content language
    const selectedVoice = await this.voiceForUtterance(content);

    // A newer speak()/stop() call superseded this one while resolving the voice
    if (generation !== this.speakGeneration) {
      return;
    }

    if (selectedVoice && this.voiceManager) {
      // Convert ReadiumSpeechVoice to SpeechSynthesisVoice using the initialized voiceManager
      const nativeVoice = this.voiceManager.convertToSpeechSynthesisVoice(selectedVoice);
      
      if (nativeVoice) {
        utterance.voice = nativeVoice; // Use the real native voice from cache
        utterance.lang = nativeVoice.lang;
      }
    }

    if (content.language) {
      utterance.lang = content.language;
    }

    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = this.volume;

    // Set up event handlers with resume infinity pattern
    utterance.onstart = () => {
      this.isSpeakingInternal = true;
      this.isPausedInternal = false;
      this.setState("playing");
      this.emitEvent({ type: "start" });

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
      
      // Don't continue if stopped
      if (this.playbackState === "idle") {
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
      this.isPausedInternal = true;
      this.isSpeakingInternal = false;
      this.emitEvent({ type: "pause" });
    };

    utterance.onresume = () => {
      this.isPausedInternal = false;
      this.isSpeakingInternal = true;
      this.emitEvent({ type: "resume" });
    };

    // Handle word and sentence boundaries
    utterance.onboundary = (event) => {
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
      
      if (this.patches.isAndroid) {
        this.isAndroidPaused = true;
        this.speechSynthesis.cancel();
      } else {
        this.speechSynthesis.pause();
      }
      
      // Common state updates
      this.isPausedInternal = true;
      this.isSpeakingInternal = false;
      this.setState("paused");
      this.emitEvent({ type: "pause" });
    }
  }

  resume(): void {
    if (this.playbackState === "paused" && (this.currentUtteranceIndex < this.currentUtterances.length)) {
      // Common state updates
      this.isPausedInternal = false;
      this.isSpeakingInternal = true;
      this.setState("playing");
      this.emitEvent({ type: "resume" });

      // Check if we need to restart or can resume
      const shouldRestart = this.patches.isAndroid || 
                          this.pausedAtUtteranceIndex !== this.currentUtteranceIndex;
      
      if (shouldRestart) {
        // If index changed or on Android, start fresh from the new index
        this.speak(this.currentUtteranceIndex);
      } else {
        // Otherwise, resume from where we left off
        this.speechSynthesis.resume();
      }
      
      // Reset the paused index
      this.pausedAtUtteranceIndex = null;
    }
  }

  stop(): void {
    this.speechSynthesis.cancel();
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
    // Validate the new index
    if (index < 0 || index >= this.currentUtterances.length) {
      onComplete?.(false);
      return;
    }

    // If the index isn't changing
    if (index === this.currentUtteranceIndex) {
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
    this.voices = [];
    this.defaultVoice = null;
    this.languageVoiceCache.clear();
    this.warmingLanguages.clear();
    this.initialized = false;
  }
}