# Playback API

The playback API is a high-level API that provides a simple interface for playing, pausing, and stopping speech. `ReadiumSpeechNavigator` wraps a `ReadiumSpeechPlaybackEngine` that you provide — e.g. [`WebSpeechEngine`](WebSpeechEngine.md) or [`SpeechServerEngine`](SpeechServerEngine.md), each documented separately for construction/options; this page covers the shared engine contract and navigator API.

Once initialized, you can use the navigator to load content (utterances) and control playback.

## ReadiumSpeechNavigator

`ReadiumSpeechNavigator` implements `ReadiumSpeechNavigatorContract`, which extends `Configurable<SpeechSettings, SpeechPreferences>` — see [Preferences](Preferences.md) for verbosity/prosody settings (`settings`, `preferencesEditor`, `submitPreferences()`, omitted below):

```typescript
interface ReadiumSpeechNavigatorContract {
  // Voice Management
  getVoices(): Promise<ReadiumSpeechVoice[]>; // set one with the `voice` preference
  
  // Content Management
  loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[], options?: ReadiumSpeechContentOptions): void;
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

Both take the content's language as a whole, as `{ language }`. Utterances without a `language` of their own get it, and so does every utterance extracted with [`language: "none"`](UtteranceExtraction.md#language), which ignores the languages declared inside the content. On content loaded via `loadGndContent()`, it is extraction's [`contentLanguage`](UtteranceExtraction.md#contentlanguage): sentences are segmented in it, and [`languageOverrides`](Preferences.md) applies to it. Without it, those utterances have no `language`, and the engine's voice speaks them.

```typescript
await navigator.loadGndContent(nodes, { language: "de" });
```

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

The `segmentation` and `reconstruct` preferences (`segmentation.mode`/`segmentation.reconstruct`) stay live `submitPreferences()` settings (see [Preferences](Preferences.md#prosody)) — only `suppressions` and `segmenter` are construction-time, since neither is meant to change mid-session.

### `substitutions`

Also set once at construction, and forwarded to [`substitutions`](UtteranceExtraction.md#substitutions) for content loaded via `loadGndContent()`, merged by key over `builtInSubstitutions`:

```typescript
const navigator = new ReadiumSpeechNavigator(engine, {
  substitutions: { "fig.": "figure", "(r)": null },
});
```

`null` removes a built-in rule, like `"(r)"`'s here.

### `languages`

The content's languages, main first, e.g. a publication's, also set once at construction:

```typescript
const navigator = new ReadiumSpeechNavigator(engine, { languages: ["en", "fr"] });
```

Each gets a voice picked as soon as the engine is initialized, in the language the [`languageOverrides`](Preferences.md) preference speaks it in, before any content in it is loaded: `settings.voice` has one for each (see [Preferences](Preferences.md#voice)). Without `languages`, the content's language given to `loadContent()`/`loadGndContent()` stands in. See [Speaking in an utterance's own content language](#speaking-in-an-utterances-own-content-language).

## Events

### `ReadiumSpeechPlaybackEvent`

Each event's `detail` is typed by its `type`, and `on()` hands a listener the event of the type it listens to:

```typescript
interface ReadiumSpeechPlaybackEventDetails {
  start: { voice: ReadiumSpeechVoice | null };  // Playback started
  pause: undefined;                             // Playback paused
  resume: undefined;                            // Playback resumed
  end: undefined;                               // Playback ended naturally
  stop: undefined;                              // Playback stopped manually
  skip: { position: number };                   // Skipped to another utterance
  error: ErrorEventDetail;                      // An error occurred
  boundary: ReadiumSpeechBoundaryDetail;        // Reached a word/sentence/structure boundary
  mark: { name: string };                       // Reached a named mark in SSML
  idle: undefined;                              // No content loaded
  loading: undefined;                           // Loading content
  ready: undefined;                             // Ready to play
  voiceschanged: undefined;                     // Available voices changed
  languagefallback: { language: string; reason: "no-matching-voice" }; // No voice matched an utterance's content language
  enginefallback: { reason: ErrorEventDetail; voice: ReadiumSpeechVoice | null }; // Swapped to a fallback engine
  enginerecovered: { voice: ReadiumSpeechVoice | null }; // Swapped back to the primary engine
}

// The navigator's events: the engine's, plus contentchange and waiting.
interface ReadiumSpeechNavigatorEventDetails extends ReadiumSpeechPlaybackEventDetails {
  contentchange: { content: ReadiumSpeechUtterance[] };
  waiting: undefined; // Playing, but the utterance's audio isn't there yet
}

interface ReadiumSpeechBoundaryDetail {
  name: string;
  charIndex: number;
  charLength: number;
  elapsedTime?: number;
  locate?: LocatorOptions | LocatorOptions[];
  word?: string;
}
```

`ErrorEventDetail` is described in [FallbackEngine](FallbackEngine.md#custom-primary-engines).

`ReadiumSpeechPlaybackEvent<T>` (engines) and `ReadiumSpeechNavigatorEvent<T>` (navigator) are `{ type: T; detail }` for one type, or the union of all of them without `T`:

```typescript
navigator.on("start", (event) => event.detail.voice?.name);
navigator.on("error", (event) => event.detail.recoverable);
```

### `"waiting"` events

Fired when playback is asked for and the utterance's audio isn't there yet: while `SpeechServerEngine` synthesizes it (`getState()` stays `"playing"`), or while content loads, on a `play()` before it's ready or a reload while playing (`getState()` is `"loading"`). The utterance's `"start"` ends the wait, as does `"pause"`, `"stop"` or `"error"`:

```typescript
navigator.on("waiting", () => playButton.classList.add("busy"));
for (const type of ["start", "pause", "stop", "error"] as const) {
  navigator.on(type, () => playButton.classList.remove("busy"));
}
```

`"loading"` tells content loading, whether playback waits for it or not.

### `"boundary"` events

`detail.name` is `"word"`, `"sentence"`, or `"structure"` — the last two mirror the `segmentation` option's own values ([Utterance Extraction](UtteranceExtraction.md#segmentation)).

For `"word"`, `detail.charIndex`/`detail.charLength` are always positions in `utterance.plain` — the coordinate space the engine actually speaks against, regardless of which engine or whether the utterance was originally authored with `ssml`. When the boundary can be resolved against the current utterance's `offsets`, the navigator also attaches `detail.locate` (a `LocatorOptions`, ready for `createLocator()`) and `detail.word` (the matched word's text).

`"sentence"` (utterances extracted with `segmentation: "sentence"`) and `"structure"` (`segmentation: "structure"`, the default) are synthesized by the navigator itself whenever the current utterance changes — real engines rarely emit a native sentence boundary mark. `detail.locate` is here a `LocatorOptions[]` (a `"word"` boundary's `detail.locate` is a single `LocatorOptions` — same key, the shape follows `detail.name`), already resolved for the active segmentation mode.

See [Highlighting.md](Highlighting.md#highlighting-from-locateoffsets) for how to turn `detail.locate` into a decoration, and for the `resolveBoundaryLocate()`/`resolveUtteranceLocate()` functions this attaches internally — needed directly only when driving playback without `ReadiumSpeechNavigator`.

### Speaking an utterance with its own voice

An utterance's `voice` is the voice an engine speaks it with, when it has that voice: matched by `voiceURI` on `WebSpeechEngine` (then `name`, which voices of different quality or languages can share), among every voice of the browser, loading its language's voice data if `WebSpeechVoiceManager.initialize()` wasn't called with it; by `identifier` or `name` on `SpeechServerEngine`. Without one, or with a voice the engine doesn't have (e.g. a `WebSpeechEngine` voice once `FallbackSpeechEngine` has swapped to a server), the engine speaks it with its current voice, the one set with `setVoice()` else its default, whatever the utterance's language. The navigator gives utterances a voice for their language, as below.

`ReadiumSpeechNavigator` sets it on the utterances without one from its [`voice` preference](Preferences.md#voice), so it's only worth setting by hand for a specific utterance.

Every engine's `"start"` event, and so `ReadiumSpeechNavigator`'s, reports the voice actually used, as `detail.voice` (a `ReadiumSpeechVoice`, or `null` when none could be resolved), for consumers that depend on its `controls` — e.g. whether word boundaries will come.

### Speaking in an utterance's own content language

`ReadiumSpeechNavigator` gives each utterance without a voice of its own a voice for its `language`:

1. The voice chosen for that language in the [`voice` preference](Preferences.md#voice), if the engine has it.
2. Otherwise, a voice it picks for that language.

How it picks:

- **Region**: the content's region first, then the language's default region, then any other. `fr-CA` content with no `fr-CA` voice gets an `fr-FR` one.
- **No region**: `en` content is read with the voice of the content's `en-GB` (or other `en-*`) text, so the voice doesn't change mid-text, unless a voice is chosen or picked for `en` itself.
- **Like the main voice**: voices match on where they come from, then on boundary events, so speech doesn't move between the browser and a server, and word highlighting doesn't come and go:
  - The main language prefers a voice with boundary events. The other languages follow the main language's voice: a browser or server voice like it, then with boundary events if it has them.
  - The main language is the first of [`languages`](#languages), else the content's language given to `loadContent()`/`loadGndContent()`.
  - Without a main language, all languages follow what the voices chosen in the `voice` preference share. With none chosen, or chosen voices that differ, any source, with boundary events.
  - A language with no voice like it gets one from anywhere.

For example, with a browser voice without boundary events chosen for English, French gets a browser voice without boundary events too, even when a server has a better one.

Voices are picked again when the engine's voices change. A [`FallbackSpeechEngine`](FallbackEngine.md) swap isn't one: the engine speaks the content's voices with the fallback voices it picks for them.

- **Waiting for a pick**: the navigator stays `"loading"`. A `play()` meanwhile plays once it's done.
- **No voice for a language**: its utterances get the engine's current voice, and `"languagefallback"` fires once, with `detail: { language, reason: "no-matching-voice" }`.
- **No `language`**: the utterance only gets a voice from a `voice` preference that is one voice for all content.

Extraction's [`language`](UtteranceExtraction.md#language) option decides which languages utterances carry: `"none"` keeps one voice throughout.

Without the navigator, an engine given an utterance without a voice picks one itself: its current voice if it speaks that language, else the best voice for it, with the same boundary events as the current voice.

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
  voice?: string;       // Voice to speak it with: a voice's `voiceURI`, or its `identifier` for a server voice
  locate?: LocatorOptions; // Decoded from the source node's textref — spread into createLocator()/decorate()
  offsets?: UtteranceOffset[]; // Ranges of each source node's own text, each with that node's locate
}

interface UtteranceOffset {
  start: number;
  end: number;
  locate: LocatorOptions;
}
```

Represents a single piece of content to be spoken, as plain text and/or SSML.

`offsets` covers the text that came verbatim from the document, one entry per stretch of a source node's own text, each with that node's `locate`. `start`/`end` are positions in that node's own text, the same with `format: "plain"` or `"ssml"`, not in `plain`/`ssml`: with `segmentation: { mode: "sentence" }`, "Bye now." from `<p>Hello world. Bye now.</p>` has `start: 13, end: 21`, and a cell read with its header, "Name: Ada", has `start: 0, end: 3`. A figure or table caption has them in the caption's text.

An entry covering part of its node's text quotes it with the rest of that text as `text.before`/`text.after`, up to any aria label read in place of an element's text, or any noteref or page break marker the node's text leaves out, neither of which is on the page as quoted. Spoken text that isn't in the node's own text has no entry: in `Text (<a role="doc-noteref">1</a>) after.` read with `interruptions: { noteref: "inline" }`, the brackets around the note have none.

Text not on the page (most announcements, e.g. a table's "Table. 3 lines. 2 columns.", or an alt-derived description) has no `offsets`: `locate` is still safe for element-scoped highlighting, but there's no real text to search for. Content without a textref has none either, so a missing `offsets` doesn't identify an announcement. A single utterance carries several entries when its text comes from several stretches or elements: around a link, a footnote or a language change, or one sentence split across two `<div>`s.
