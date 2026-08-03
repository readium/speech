# Playback API

The playback API is a high-level API that provides a simple interface for playing, pausing, and stopping speech. `ReadiumSpeechNavigator` wraps a `ReadiumSpeechPlaybackEngine` that you provide — e.g. [`WebSpeechEngine`](WebSpeechEngine.md) or [`SpeechServerEngine`](SpeechServerEngine.md), each documented separately for construction/options; this page covers the shared engine contract and navigator API.

Once initialized, you can use the navigator to load content (utterances) and control playback.

## ReadiumSpeechNavigator

`ReadiumSpeechNavigator` implements `ReadiumSpeechNavigatorContract`, which extends `Configurable<SpeechSettings, SpeechPreferences>` — see [Preferences](Preferences.md) for verbosity/prosody settings (`settings`, `preferencesEditor`, `submitPreferences()`, omitted below):

```typescript
interface ReadiumSpeechNavigatorContract {
  // Voice Management
  getVoices(): Promise<ReadiumSpeechVoice[]>;
  setVoice(voice: ReadiumSpeechVoice | string): void;
  getCurrentVoice(): ReadiumSpeechVoice | null;
  setSpeakInContentLanguage(enabled: boolean): void;
  getSpeakInContentLanguage(): boolean;
  
  // Content Management
  loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[]): void;
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
```

### Example Usage

```typescript
import { WebSpeechEngine, ReadiumSpeechNavigator } from "@readium/speech";

const navigator = new ReadiumSpeechNavigator(new WebSpeechEngine());

navigator.loadContent([
  { plain: "Hello world.", language: "en" }
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

Two ways to load content — simple and advanced:

- `loadContent()` takes already-extracted `ReadiumSpeechUtterance`s directly. No GND, no extraction options — you own the utterance list.
- `loadGndContent(nodes)` takes a raw [Guided Navigation](GuidedNavigation.md) tree instead. The navigator retains it and re-runs [`extractUtterances`](UtteranceExtraction.md) itself when an extraction-affecting preference changes via `submitPreferences()`, so verbosity/skip/contextualize/language stay live over the whole tree — `loadContent()` keeps no such source, so those preferences are no-ops on it; prosody preferences still apply either way — see [Preferences](Preferences.md).

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
    | "voiceschanged"   // Available voices changed
    | "languagefallback"; // No voice matched an utterance's content language
  detail?: any;  // Event-specific data
};
```

### Speaking in an utterance's own content language

By default, playback always uses the selected/default voice. Call `setSpeakInContentLanguage(true)` to instead match each utterance's own `language` field to the best available voice for that language, falling back to the selected/default voice when no match exists (which also fires a `"languagefallback"` event with `detail: { language, reason: "no-matching-voice" }`).

### `ReadiumSpeechPlaybackState`

```typescript
type ReadiumSpeechPlaybackState = "playing" | "paused" | "idle" | "loading" | "ready";
```

## `ReadiumSpeechUtterance`

```typescript
interface ReadiumSpeechUtterance {
  id?: string;          // Unique identifier for this content
  plain?: string;       // Plain-text rendering, when available
  ssml?: string;        // SSML rendering, when available
  language?: string;    // Language of this content (BCP 47)
}
```

Represents a single piece of content to be spoken, as plain text and/or SSML.
