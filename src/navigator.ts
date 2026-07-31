import { GndObject } from "./gnd/types";
import { Configurable } from "./preferences/Configurable";
import { SpeechPreferences } from "./preferences/SpeechPreferences";
import { SpeechSettings } from "./preferences/SpeechSettings";
import { ReadiumSpeechVoice } from "./voices/types";
import { ReadiumSpeechUtterance } from "./utterance";

export type ReadiumSpeechPlaybackState = "playing" | "paused" | "idle" | "loading" | "ready";

export interface ReadiumSpeechPlaybackEvent {
  type: 
    | "start"           // Playback started
    | "pause"           // Playback paused
    | "resume"          // Playback resumed
    | "end"             // Playback ended naturally
    | "stop"            // Playback stopped manually
    | "skip"            // Skipped to another utterance
    | "error"           // An error occurred
    | "boundary"        // Reached a word/sentence boundary
    | "mark"            // Reached a named mark in SSML
    | "idle"            // No content loaded
    | "loading"         // Loading content
    | "ready"           // Ready to play
    | "voiceschanged"   // Available voices changed
    | "languagefallback"; // No voice matched an utterance's content language
  detail?: any;  // Event-specific data
}

export interface ReadiumSpeechNavigatorContract extends Configurable<SpeechSettings, SpeechPreferences> {
  // Voice Management
  getVoices(): Promise<ReadiumSpeechVoice[]>;
  setVoice(voice: ReadiumSpeechVoice | string): void;
  getCurrentVoice(): ReadiumSpeechVoice | null;
  setSpeakInContentLanguage(enabled: boolean): void;
  getSpeakInContentLanguage(): boolean;

  // Content Management
  loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[]): void;
  // Loads a raw Guided Navigation tree and re-runs extraction whenever
  // preferences change via `submitPreferences()`. `loadContent()` above
  // keeps no source, so preference changes are no-ops on content loaded
  // that way.
  loadGndContent(nodes: GndObject[]): void;
  getCurrentContent(): ReadiumSpeechUtterance | null;
  getContentQueue(): ReadiumSpeechUtterance[];
  
  // Playback Control
  play(): void;
  pause(): void;
  stop(): void;
  
  // Navigation
  next(): boolean; 
  previous(): boolean;
  jumpTo(utteranceIndex: number): void;
  
  // Playback Parameters
  setRate(rate: number): void;
  getRate(): number;
  setPitch(pitch: number): void;
  getPitch(): number;
  setVolume(volume: number): void;
  getVolume(): number;
  
  // State
  getState(): ReadiumSpeechPlaybackState;
  
  // Events
  on(
    event: ReadiumSpeechPlaybackEvent["type"] | "contentchange",
    listener: (event: ReadiumSpeechPlaybackEvent) => void
  ): () => void;
  
  // Lifecycle
  destroy(): Promise<void>;
}