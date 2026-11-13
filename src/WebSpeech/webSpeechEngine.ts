import { ReadiumSpeechPlaybackEngine } from "../engine.js";
import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../navigator.js";
import { ReadiumSpeechUtterance } from "../utterance.js";
import { ReadiumSpeechVoice } from "../voices/types.js";
import { WebSpeechVoiceManager } from "./WebSpeechVoiceManager.js";
import { pickDefaultVoice } from "../voices/defaultVoice.js";
import { getVoiceId } from "../voices/voiceId.js";

import { detectFeatures, WebSpeechFeatures } from "../utils/features.js";
import { detectPlatformFeatures, WebSpeechPlatformPatches } from "../utils/patches.js";
import { EventEmitter } from "../utils/eventEmitter.js";
import { clampIndex } from "../utils/array.js";
import { clamp } from "../utils/clamp.js";

import { decodeResidualHtmlEntities, neutralizeAngleBrackets } from "../utils/text.js";
import { stripSsmlTags } from "../utterances/text.js";

// Safari ends whichever utterance is current when a cancelled one's late "finished" arrives, about 100 ms after cancel()
const SAFARI_CANCEL_SETTLE_DELAY = 250;

export class WebSpeechEngine implements ReadiumSpeechPlaybackEngine {
  private speechSynthesis: SpeechSynthesis;
  private speechSynthesisUtterance: typeof SpeechSynthesisUtterance;
  private currentVoice: ReadiumSpeechVoice | null = null;
  // The voice of the utterance being spoken, reported in its "start" event.
  private speakingVoice: ReadiumSpeechVoice | null = null;
  private currentUtterances: ReadiumSpeechUtterance[] = [];
  private currentUtteranceIndex: number = 0;
  private playbackState: ReadiumSpeechPlaybackState = "idle";
  private readonly events = new EventEmitter<ReadiumSpeechPlaybackEvent["type"], ReadiumSpeechPlaybackEvent>();

  private voiceManager: WebSpeechVoiceManager | null = null;
  private defaultVoice: ReadiumSpeechVoice | null = null;
  // Shared by concurrent initialize() calls, e.g. an app's with languages and its navigator's without
  private initializing: Promise<boolean> | null = null;

  // Languages of utterances' own voices loaded into the manager, even if it still lacks the voice
  private loadedOwnVoiceLanguages: Set<string> = new Set();
  private speakGeneration: number = 0;

  // Enhanced properties for cross-browser compatibility
  private resumeInfinityTimer?: number;
  private isSpeakingInternal: boolean = false;
  private restartPending: boolean = false;
  private isPausedInternal: boolean = false;
  private lacksNativePause: boolean; // Android and Firefox on Linux (speech-dispatcher) ignore pause()
  private restartOnResume: boolean = false;
  private pausedAtUtteranceIndex: number | null = null; // Tracks which utterance was playing when paused
  private initialized: boolean = false;
  private maxLengthExceeded: "error" | "none" | "warn" = "warn";
  private utterancesBeingCancelled: boolean = false; // Flag to track if utterances are being cancelled
  private lastCancelAt: number = -Infinity; // Safari: when cancel() last stopped speech
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
    this.lacksNativePause = this.patches.isAndroid || (this.patches.isFirefox && this.patches.isLinux);

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
    if (this.initialized) {
      return false;
    }
    this.initializing ??= this.load(options).finally(() => {
      this.initializing = null;
    });
    return this.initializing;
  }

  private async load(options: {
    languages?: string[];
    maxTimeout?: number;
    interval?: number;
    maxLengthExceeded?: "error" | "none" | "warn";
  }): Promise<boolean> {
    const { languages, maxTimeout, interval, maxLengthExceeded = "warn" } = options;
    this.maxLengthExceeded = maxLengthExceeded;

    try {
      // Initialize voice manager with provided options and get voices
      this.voiceManager = await WebSpeechVoiceManager.initialize({
        languages,
        maxTimeout,
        interval
      });

      this.defaultVoice = await pickDefaultVoice(languages, this.voices);

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

  // By `voiceURI`, as voices of one `name` can differ in quality or language.
  private findVoice(id: string): ReadiumSpeechVoice | undefined {
    const voices = this.voices;
    return voices.find(voice => voice.voiceURI === id) ?? voices.find(voice => voice.name === id);
  }

  private ownVoice(content: ReadiumSpeechUtterance): ReadiumSpeechVoice | undefined {
    return content.voice ? this.findVoice(content.voice) : undefined;
  }

  // The language of a voice the browser has, whether or not the manager has loaded it.
  private browserVoiceLanguage(id: string): string | undefined {
    const browserVoices = this.speechSynthesis.getVoices();
    return (browserVoices.find(voice => voice.voiceURI === id) ?? browserVoices.find(voice => voice.name === id))?.lang;
  }

  // The language of the utterance's voice when the browser has it but the manager hasn't loaded that language.
  private unloadedOwnVoiceLanguage(content: ReadiumSpeechUtterance): string | undefined {
    if (!content.voice || this.ownVoice(content)) return undefined;
    const language = this.browserVoiceLanguage(content.voice);
    return language && !this.loadedOwnVoiceLanguages.has(language) ? language : undefined;
  }

  // The utterance's own voice, loading its language first when needed, else the current voice.
  private async voiceForUtterance(content: ReadiumSpeechUtterance): Promise<ReadiumSpeechVoice | null> {
    const ownVoiceLanguage = this.unloadedOwnVoiceLanguage(content);
    if (ownVoiceLanguage) {
      await WebSpeechVoiceManager.initialize({ languages: [ownVoiceLanguage] });
      this.loadedOwnVoiceLanguages.add(ownVoiceLanguage);
    }
    return this.ownVoice(content) ?? this.getCurrentVoice();
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
    // Not setState(): never passes through "loading" first, so back-to-back loads while already
    // "ready" must still each emit — setState's diff-based emit would swallow the second one.
    this.playbackState = "ready";
    this.emitEvent({ type: "ready" });
  }

  // Voice Configuration
  async setVoice(voice: ReadiumSpeechVoice | string): Promise<void> {
    const previousVoice = this.currentVoice;

    if (typeof voice === "string") {
      const foundVoice = this.findVoice(voice);
      if (foundVoice) {
        this.currentVoice = foundVoice;
      } else {
        console.warn(`Voice "${voice}" not found`);
      }
    } else {
      this.currentVoice = voice;
    }

    if ((this.currentVoice && getVoiceId(this.currentVoice)) !== (previousVoice && getVoiceId(previousVoice))) {
      this.scheduleRestartIfSpeaking();
    }
  }

  // Read from the manager each time, as initializing it with other languages adds theirs
  private get voices(): ReadiumSpeechVoice[] {
    return this.voiceManager?.getVoices() ?? [];
  }

  async getAvailableVoices(languages?: string[], voiceIds?: string[]): Promise<ReadiumSpeechVoice[]> {
    try {
      if (!this.voiceManager) await this.initialize();
      // Broadens the manager when initialize() was scoped to other languages
      const all = [...(languages ?? []), ...(voiceIds ?? []).flatMap(id => this.browserVoiceLanguage(id) ?? [])];
      if (all.length) await WebSpeechVoiceManager.initialize({ languages: all });
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

    // Safari ends an utterance spoken before the last cancel() settled
    const settleDelay = this.lastCancelAt + SAFARI_CANCEL_SETTLE_DELAY - Date.now();
    if (this.patches.isSafari && settleDelay > 0) {
      this.speakNextTask(generation, 1, settleDelay);
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

    if (this.patches.isSafari && this.speechSynthesis.speaking) this.lastCancelAt = Date.now();
    
    this.speechSynthesis.cancel();
  }
  
  // Safari: `unstartedRetries` is how many more times to speak it if Safari ends it without starting it, as it can right after cancel()
  private speakNextTask(generation: number, unstartedRetries: number, delay: number = 0): void {
    setTimeout(() => {
      // A later speak() or stop() superseded it
      if (generation !== this.speakGeneration) return;
      // Paused before it was spoken: resume() speaks it from the start
      if (this.playbackState === "paused") {
        this.pausedAtUtteranceIndex = null;
        return;
      }
      // Other content was loaded before it was spoken
      if (this.playbackState !== "playing") return;
      void this.speakCurrentUtterance(generation, unstartedRetries);
    }, delay);
  }

  private async speakCurrentUtterance(generation: number, unstartedRetries?: number): Promise<void> {
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
      // A new utterance started: nothing left to restart. Before the events, whose listeners may pause again
      this.restartOnResume = false;
      this.isSpeakingInternal = true;
      this.isPausedInternal = false;
      this.setState("playing");
      this.emitEvent({ type: "start", detail: { voice: selectedVoice } });

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

      // Never spoken: not an end. resume() speaks it from the start when paused
      if (unstartedRetries !== undefined && !started) {
        if (this.playbackState === "paused") {
          this.pausedAtUtteranceIndex = null;
          return;
        }
        if (this.playbackState === "playing" && unstartedRetries > 0) {
          this.speakNextTask(generation, unstartedRetries - 1);
          return;
        }
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
            message: `Speech synthesis error: ${event.error}`,
            recoverable: event.error === "network"
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

      if (this.lacksNativePause) {
        this.restartOnResume = true;
        // Stale first, so the cancelled utterance's onend/onerror can't undo the pause
        this.speakGeneration++;
        this.speechSynthesis.cancel();
        // cancel() never fires the native onpause handler below — this is the only "pause" signal there.
        this.emitEvent({ type: "pause" });
      } else {
        this.speechSynthesis.pause();
        // Native pause() fires the onpause handler asynchronously, so emitting here would duplicate it,
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
      const shouldRestart = this.restartOnResume || 
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
    
    // Nothing to restart once stopped
    if (this.restartOnResume) {
      this.restartOnResume = false;
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
  on<T extends ReadiumSpeechPlaybackEvent["type"]>(event: T, callback: (event: ReadiumSpeechPlaybackEvent<T>) => void): () => void {
    return this.events.on(event, callback as (event: ReadiumSpeechPlaybackEvent) => void);
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
    this.initialized = false;
  }
}