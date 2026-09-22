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
  loadGndContent(nodes: GndObject[]): Promise<void>;
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

### `contextualizationOverrides`

Set once at construction — not part of `submitPreferences()`, since it doesn't change at runtime:

```typescript
const navigator = new ReadiumSpeechNavigator(engine, {
  contextualizationOverrides: { contextualizations, shapes, params },
});
```

Each field forwards to the matching [`extractUtterances` option](UtteranceExtraction.md#contextualization) — see that doc for what each does and worked examples for every use case (rewording a role, adding a role the catalog has none for, feeding a placeholder the extractor doesn't compute on its own):

- `contextualizations` → [`contextualization.contextualizations`](UtteranceExtraction.md#contextualizationcontextualizations)
- `params` → [`contextualization.params`](UtteranceExtraction.md#contextualizationparams)
- `shapes` → [`contextualization.shapes`](UtteranceExtraction.md#contextualizationshapes), but keyed one level deeper, by [verbosity level](Preferences.md#verbosity) (`{ table: { few: "inline", most: "block" } }`) — each preset already has its own built-in shape table, so an override here only needs the levels you want to change, `"custom"` included (custom is the one level with no built-in table of its own).

### `segmentationOverrides`

Also set once at construction, same rationale as `contextualizationOverrides`:

```typescript
const navigator = new ReadiumSpeechNavigator(engine, {
  segmentationOverrides: { suppressions, segmenter },
});
```

- `suppressions` → [`segmentation.suppressions`](UtteranceExtraction.md#segmentation)
- `segmenter` → [`segmentation.segmenter`](UtteranceExtraction.md#segmenter)

`segmentation.mode` itself stays a live `submitPreferences()` setting (see [Preferences](Preferences.md#verbosity)) — only these two are construction-time, since neither is meant to change mid-session.

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
    | "boundary"        // Reached a word/sentence/structure boundary
    | "mark"            // Reached a named mark in SSML
    | "idle"            // No content loaded
    | "loading"         // Loading content
    | "ready"           // Ready to play
    | "voiceschanged"   // Available voices changed
    | "languagefallback"; // No voice matched an utterance's content language
  detail?: any;  // Event-specific data
};
```

### `"boundary"` events

`detail.name` is `"word"`, `"sentence"`, or `"structure"` — the last two mirror the `segmentation` option's own values ([Utterance Extraction](UtteranceExtraction.md#segmentation)).

For `"word"`, `detail.charIndex`/`detail.charLength` are always positions in `utterance.plain` — the coordinate space the engine actually speaks against, regardless of which engine or whether the utterance was originally authored with `ssml`. When the boundary can be resolved against the current utterance's `offsets`, the navigator also attaches `detail.locate` (a `LocatorOptions`, ready for `createLocator()`) and `detail.word` (the matched word's text).

`"sentence"` (utterances extracted with `segmentation: "sentence"`) and `"structure"` (`segmentation: "structure"`, the default) are synthesized by the navigator itself whenever the current utterance changes — real engines rarely emit a native sentence boundary mark. `detail.locate` is here a `LocatorOptions[]` (a `"word"` boundary's `detail.locate` is a single `LocatorOptions` — same key, the shape follows `detail.name`), already resolved for the active segmentation mode.

See [Highlighting.md](Highlighting.md#highlighting-from-locateoffsets) for how to turn `detail.locate` into a decoration, and for the `resolveBoundaryLocate()`/`resolveUtteranceLocate()` functions this attaches internally — needed directly only when driving playback without `ReadiumSpeechNavigator`.

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
  locate?: LocatorOptions; // Decoded from the source node's textref — spread into createLocator()/decorate()
  offsets?: UtteranceOffset[]; // Ranges of plain/ssml backed by real source text, each with its own locate
}

interface UtteranceOffset {
  start: number;
  end: number;
  locate: LocatorOptions;
}
```

Represents a single piece of content to be spoken, as plain text and/or SSML.

`offsets` covers the stretches of `plain`/`ssml` that came verbatim from the document, each with the `locate` of the DOM node it came from — a word-level substring/text-quote search is safe within those ranges. A synthesized label/announcement (a contextualization catalog entry, or an alt/caption-derived description — e.g. a table's "Table. 3 lines. 2 columns." or a pagebreak's label) has no `offsets` at all: `locate` is still safe for element-scoped highlighting, but there's no real text to search for. A single utterance can carry more than one entry when its text was reconstructed across multiple source elements (e.g. one sentence split across two `<div>`s).
