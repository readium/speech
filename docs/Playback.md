# Playback API

The playback API is a high-level API that provides a simple interface for playing, pausing, and stopping speech. It relies on an engine that you provide to it, or fallback to WebSpeech if none is provided.

Once initialized, you can use the navigator to load content (utterances) and control playback.

## ReadiumSpeechNavigator

```typescript
interface ReadiumSpeechNavigator {
  // Voice Management
  getVoices(): Promise<ReadiumSpeechVoice[]>;
  setVoice(voice: ReadiumSpeechVoice | string): Promise<void>;
  getCurrentVoice(): ReadiumSpeechVoice | null;
  
  // Content Management
  loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[]): void;
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
  getCurrentUtteranceIndex(): number;
  
  // Events
  on(
    event: ReadiumSpeechPlaybackEvent["type"],
    listener: (event: ReadiumSpeechPlaybackEvent) => void
  ): void;
  
  // Cleanup
  destroy(): void;
}
```

### Example Usage

```typescript
import { WebSpeechReadAloudNavigator } from "@readium/speech";

const navigator = new WebSpeechReadAloudNavigator();

navigator.loadContent([
  { text: "Hello world.", language: "en" }
]);

function togglePlayback() {
  const state = navigator.getState();
  if (state === "playing") {
    navigator.pause();
  } else {
    navigator.play();
  }
}

togglePlayback();
```

## Events

### `ReadiumSpeechPlaybackEvent`

```typescript
type ReadiumSpeechPlaybackEvent = {
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
    | "voiceschanged";   // Available voices changed
  detail?: any;  // Event-specific data
};
```

### `ReadiumSpeechPlaybackState`

```typescript
type ReadiumSpeechPlaybackState = "playing" | "paused" | "idle" | "loading" | "ready";
```

## `ReadiumSpeechUtterance`

```typescript
interface ReadiumSpeechUtterance {
  id?: string;          // Unique identifier for this content
  text: string;         // Text or SSML content
  ssml?: boolean;       // If true, text contains SSML
  language?: string;    // Language of this content (BCP 47)
}
```

Represents a single piece of content to be spoken. Can contain plain text or SSML markup.
