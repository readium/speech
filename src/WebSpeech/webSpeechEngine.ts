import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../navigator";
import { ReadiumSpeechUtterance } from "../utterance";
import { ReadiumSpeechVoice } from "../voices";
import { getSpeechSynthesisVoices, parseSpeechSynthesisVoices, filterOnLanguage } from "../voices";

import { detectFeatures, WebSpeechFeatures } from "../utils/features";
import { detectPlatformFeatures, WebSpeechPlatformPatches } from "../utils/patches";

import { stripHtml } from "string-strip-html";

export class WebSpeechEngine implements ReadiumSpeechPlaybackEngine {
  private speechSynthesis: SpeechSynthesis;
  private speechSynthesisUtterance: any;
  private currentVoice: ReadiumSpeechVoice | null = null;
  private currentUtterances: ReadiumSpeechUtterance[] = [];
  private currentUtteranceIndex: number = 0;
  private playbackState: ReadiumSpeechPlaybackState = "idle";
  private eventListeners: Map<ReadiumSpeechPlaybackEvent["type"], ((event: ReadiumSpeechPlaybackEvent) => void)[]> = new Map();

  private voices: ReadiumSpeechVoice[] = [];
  private browserVoices: SpeechSynthesisVoice[] = [];
  private defaultVoice: ReadiumSpeechVoice | null = null;

  // Enhanced properties for cross-browser compatibility
  private resumeInfinityTimer?: number;
  private isPausedInternal: boolean = false;
  private isSpeakingInternal: boolean = false;
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
    maxTimeout?: number;
    interval?: number;
    maxLengthExceeded?: "error" | "none" | "warn";
  } = {}): Promise<boolean> {
    const { maxTimeout = 10000, interval = 10, maxLengthExceeded = "warn" } = options;

    if (this.initialized) {
      return false;
    }

    this.maxLengthExceeded = maxLengthExceeded;

    try {
      // Get and cache the browser's native voices
      this.browserVoices = await getSpeechSynthesisVoices(maxTimeout, interval);
      // Parse them into our internal format
      this.voices = parseSpeechSynthesisVoices(this.browserVoices);

      // Try to find voice matching user's language
      const langVoices = filterOnLanguage(this.voices);
      this.defaultVoice = langVoices.length > 0 ? langVoices[0] : this.voices[0] || null;

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

  getCurrentVoice(): ReadiumSpeechVoice | null {
    return this.currentVoice;
  }

  // SSML Escaping
  private escapeSSML(utterances: ReadiumSpeechUtterance[]): ReadiumSpeechUtterance[] {
    return utterances.map(content => ({
      ...content,
      text: content.ssml ? stripHtml(content.text).result : content.text
    }));
  }

  // Queue Management
  loadUtterances(contents: ReadiumSpeechUtterance[]): void {
    // Escape SSML entirely for the time being
    this.currentUtterances = this.escapeSSML(contents);
    this.currentUtteranceIndex = 0;
    this.setState("ready");
    this.emitEvent({ type: "ready" });
  }

  // Voice Configuration
  setVoice(voice: ReadiumSpeechVoice | string): void {
    const previousVoice = this.currentVoice;

    if (typeof voice === "string") {
      // Find voice by name or language
      this.getAvailableVoices().then(voices => {
        const foundVoice = voices.find(v => v.name === voice || v.language === voice);
        if (foundVoice) {
          this.currentVoice = foundVoice;
          // Reset position when voice changes for fresh start with new voice
          if (previousVoice && previousVoice.name !== foundVoice.name) {
            this.currentUtteranceIndex = 0;
          }
        } else {
          console.warn(`Voice "${voice}" not found`);
        }
      });
    } else {
      this.currentVoice = voice;
      // Reset position when voice changes for fresh start with new voice
      if (previousVoice && previousVoice.name !== voice.name) {
        this.currentUtteranceIndex = 0;
      }
    }
  }

  getAvailableVoices(): Promise<ReadiumSpeechVoice[]> {
    return new Promise((resolve) => {
      if (this.voices.length > 0) {
        resolve(this.voices);
      } else {
        // If voices not loaded yet, initialize first
        this.initialize().then(() => {
          resolve(this.voices);
        }).catch(() => {
          resolve([]);
        });
      }
    });
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

    // Reset internal state
    this.isSpeakingInternal = true;
    this.isPausedInternal = false;
    
    // Set state to playing before starting new speech
    this.setState("playing");
    this.emitEvent({ type: "start" });
    this.stopResumeInfinity();

    // Reset utterance index to ensure we're starting fresh
    this.currentUtteranceIndex = utteranceIndex ?? 0;

    // Ensure the utterance index is valid
    if (this.currentUtteranceIndex >= this.currentUtterances.length) {
      this.currentUtteranceIndex = 0;
    }

    // Speak immediately for responsive navigation
    this.speakCurrentUtterance();
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
  
  private async speakCurrentUtterance(): Promise<void> {
    if (this.currentUtteranceIndex >= this.currentUtterances.length) {
      this.setState("idle");
      this.emitEvent({ type: "end" });
      return;
    }

    const content = this.currentUtterances[this.currentUtteranceIndex];
    const text = content.ssml ? content.text : content.text;

    // Validate text length
    this.validateText(text);

    const utterance = this.createUtterance(text);

    // Configure utterance
    if (content.language) {
      utterance.lang = content.language;
    }

    // Enhanced voice selection with MSNatural detection
    const selectedVoice = this.getCurrentVoiceForUtterance(this.currentVoice);

    if (selectedVoice) {
      // Find the matching voice in our cached browser voices
      // as converting ReadiumSpeechVoice to SpeechSynthesisVoice is not possible
      const nativeVoice = this.browserVoices.find(v => 
        v.name === selectedVoice.name && 
        v.lang === (selectedVoice.__lang || selectedVoice.language)
      );
      
      if (nativeVoice) {
        utterance.voice = nativeVoice; // Use the real native voice from cache
      }
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
      this.isSpeakingInternal = false;
      this.isPausedInternal = false;
      this.stopResumeInfinity();

      // Fatal errors that break playback completely - reset to beginning
      const fatalErrors = ["synthesis-unavailable", "audio-hardware", "voice-unavailable"];
      if (fatalErrors.includes(event.error)) {
        console.log(`[ENGINE] fatal error detected, resetting index to 0`);
        this.currentUtteranceIndex = 0;
      }

      this.setState("idle");
      this.emitEvent({
        type: "error",
        detail: {
          error: event.error,  // Preserve original error type
          message: `Speech synthesis error: ${event.error}`
        }
      });
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
      // Call the appropriate method based on platform
      this.patches.isAndroid 
        ? this.speechSynthesis.cancel()  // Android
        : this.speechSynthesis.pause();  // Other platforms
      
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

      // Platform-specific resumption
      this.patches.isAndroid
        ? this.speak(this.currentUtteranceIndex)  // Android: restart current utterance
        : this.speechSynthesis.resume();          // Other platforms: resume normally
    }
  }

  stop(): void {
    this.speechSynthesis.cancel();
    this.currentUtteranceIndex = 0;  // Reset to beginning when stopped
    this.setState("idle");
    this.emitEvent({ type: "stop" });  // Emit immediately
  }

  // Playback Parameters
  setRate(rate: number): void {
    this.rate = Math.max(0.1, Math.min(10, rate));
  }

  setPitch(pitch: number): void {
    this.pitch = Math.max(0, Math.min(2, pitch));
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  // State
  getState(): ReadiumSpeechPlaybackState {
    return this.playbackState;
  }

  getCurrentUtteranceIndex(): number {
    return this.currentUtteranceIndex;
  }

  getUtteranceCount(): number {
    return this.currentUtterances.length;
  }

  // Events
  on(event: ReadiumSpeechPlaybackEvent["type"], callback: (event: ReadiumSpeechPlaybackEvent) => void): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);

    // Return unsubscribe function
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
    this.eventListeners.clear();
    this.currentUtterances = [];
    this.currentVoice = null;
    this.voices = [];
    this.defaultVoice = null;
    this.initialized = false;
  }
}