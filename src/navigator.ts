import type { GuidedNavigationObject } from "@readium/shared";
import { Configurable } from "./preferences/Configurable.js";
import { SpeechPreferences } from "./preferences/SpeechPreferences.js";
import { SpeechSettings } from "./preferences/SpeechSettings.js";
import { ReadiumSpeechVoice } from "./voices/types.js";
import { ReadiumSpeechUtterance } from "./utterance.js";
import type { LocatorOptions } from "./decorator/createLocator.js";
import type { ErrorEventDetail } from "./Fallback/recoverableFailure.js";

export type ReadiumSpeechPlaybackState = "playing" | "paused" | "idle" | "loading" | "ready";

export interface ReadiumSpeechBoundaryDetail {
  name: string; // "word" or "sentence" from engines; the navigator adds "sentence"/"structure" utterance boundaries
  charIndex: number;
  charLength: number;
  elapsedTime?: number;
  locate?: LocatorOptions | LocatorOptions[]; // set by the navigator: one for "word", one per offset otherwise
  word?: string; // set by the navigator for "word"
}

// Each engine event type's `detail`, `undefined` for those without one.
export interface ReadiumSpeechPlaybackEventDetails {
  start: { voice: ReadiumSpeechVoice | null }; // Playback started
  pause: undefined; // Playback paused
  resume: undefined; // Playback resumed
  end: undefined; // Playback ended naturally
  stop: undefined; // Playback stopped manually
  skip: { position: number }; // Skipped to another utterance
  error: ErrorEventDetail; // An error occurred
  boundary: ReadiumSpeechBoundaryDetail; // Reached a word/sentence/structure boundary
  mark: { name: string }; // Reached a named mark in SSML
  idle: undefined; // No content loaded
  loading: undefined; // Loading content
  ready: undefined; // Ready to play
  voiceschanged: undefined; // Available voices changed
  languagefallback: { language: string; reason: "no-matching-voice" }; // No voice matched an utterance's content language
  enginefallback: { reason: ErrorEventDetail; voice: ReadiumSpeechVoice | null }; // Swapped to a fallback engine after the primary one failed
  enginerecovered: { voice: ReadiumSpeechVoice | null }; // Swapped back to the primary engine after it became reachable again
}

export interface ReadiumSpeechNavigatorEventDetails extends ReadiumSpeechPlaybackEventDetails {
  contentchange: { content: ReadiumSpeechUtterance[] }; // The content queue changed
}

type EventOf<Details, T extends keyof Details> = {
  [K in T]: Details[K] extends undefined ? { type: K; detail?: undefined } : { type: K; detail: Details[K] };
}[T];

export type ReadiumSpeechPlaybackEvent<T extends keyof ReadiumSpeechPlaybackEventDetails = keyof ReadiumSpeechPlaybackEventDetails> =
  EventOf<ReadiumSpeechPlaybackEventDetails, T>;

export type ReadiumSpeechNavigatorEvent<T extends keyof ReadiumSpeechNavigatorEventDetails = keyof ReadiumSpeechNavigatorEventDetails> =
  EventOf<ReadiumSpeechNavigatorEventDetails, T>;

export interface ReadiumSpeechContentOptions {
  // BCP 47 tag of the content as a whole
  language?: string;
}

export interface ReadiumSpeechNavigatorContract extends Configurable<SpeechSettings, SpeechPreferences> {
  // Voice Management
  getVoices(): Promise<ReadiumSpeechVoice[]>;

  // Content Management
  loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[], options?: ReadiumSpeechContentOptions): void;
  // Loads a raw Guided Navigation tree and re-runs extraction whenever
  // preferences change via `submitPreferences()`. `loadContent()` above
  // keeps no source, so preference changes are no-ops on content loaded
  // that way.
  loadGndContent(nodes: GuidedNavigationObject[], options?: ReadiumSpeechContentOptions): Promise<void>;
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

  // State
  getState(): ReadiumSpeechPlaybackState;
  
  // Events
  on<T extends keyof ReadiumSpeechNavigatorEventDetails>(
    event: T,
    listener: (event: ReadiumSpeechNavigatorEvent<T>) => void
  ): () => void;
  
  // Lifecycle
  destroy(): Promise<void>;
}