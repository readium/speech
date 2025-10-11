import { ReadiumSpeechPlaybackEngine } from "./engine";
import { ReadiumSpeechVoice } from "./voices";
import { ReadiumSpeechUtterance } from "./utterance";

import { WebSpeechEngine } from "./WebSpeech/webSpeechEngine";

export type ReadiumSpeechPlaybackState = "playing" | "paused" | "idle" | "loading" | "ready";

export interface ReadiumSpeechPlaybackEvent {
  type: 
    | "start"     // Playback started
    | "pause"     // Playback paused
    | "resume"    // Playback resumed
    | "end"       // Playback ended naturally
    | "stop"      // Playback stopped manually
    | "error"     // An error occurred
    | "boundary"  // Reached a word/sentence boundary
    | "mark"      // Reached a named mark in SSML
    | "idle"      // No content loaded
    | "loading"   // Loading content
    | "ready"     // Ready to play
    | "voiceschanged"; // Available voices changed
  detail?: any;  // Event-specific data
}

// This should evolve dramatically as WebSpeech is kind of an outlier
// And it will be impacted by adapters from external services
export interface ReadiumSpeechNavigator {
  // Voice Management
  getVoices(): Promise<ReadiumSpeechVoice[]>;
  setVoice(voice: ReadiumSpeechVoice | string): Promise<void>;
  getCurrentVoice(): ReadiumSpeechVoice | null;
  
  // Content Management
  loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[]): void;
  getCurrentContent(): ReadiumSpeechUtterance | null;
  getContentQueue(): ReadiumSpeechUtterance[];
  
  // Playback Control
  play(): Promise<void>;
  pause(): void;
  stop(): void;
  togglePlayPause(): Promise<void>;
  
  // Navigation
  next(): Promise<boolean>; 
  previous(): Promise<boolean>;
  jumpTo(utteranceIndex: number): void;
  
  // Playback Parameters
  setRate(rate: number): void;
  setPitch(pitch: number): void;
  setVolume(volume: number): void;
  
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