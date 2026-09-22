# Highlighting

While playback is underway, most read aloud experiences highlight the content currently being spoken (e.g. the current word or sentence), so that readers can follow along visually.

Highlighting is handled by [`@readium/decorator`](https://github.com/readium/ts-toolkit/tree/main/decorator), re-exported from `@readium/speech`. It works by applying and removing decorations — styled overlays anchored to a `Locator` — grouped under an arbitrary name (e.g. `"tts"`) so that a later call for the same group replaces its previous decorations.

## Setting it up

`setupDecorations()` wires up decoration support for the current window (as opposed to inside a navigator iframe) and returns a ready-to-use `ReadiumSpeechDecorationController`:

```typescript
function setupDecorations(
  wnd?: Window,                        // defaults to `window`
  config?: DecorationControllerConfig
): ReadiumSpeechDecorationController;
```

`ReadiumSpeechDecorationController` extends `@readium/decorator`'s `DecorationController` with one extra convenience method (`decorate`, see below):

```typescript
class ReadiumSpeechDecorationController extends DecorationController {
  decorate(decorations: DecorationInput[], group: string): void;
  // plus everything inherited from DecorationController:
  applyDecorations(decorations: Decoration[], group: string): void;
  supportsDecorationStyle(styleTypeId: string): boolean;
  registerDecorationObserver(group: string, observer: DecorationObserver): void;
  unregisterDecorationObserver(observer: DecorationObserver): void;
  destroy(): void; // unmounts the underlying Decorator and releases its comms channel
}
```

## Applying decorations

There are three ways to apply a decoration, at different levels of control.
Which one to use is a matter of use case and preference, not a hierarchy —
all three remain fully supported.

### 1. `decorate`

Batch convenience for the common case of "apply N decorations to a group
right now" — combines `createLocator` and `applyDecorations` into one call.
Note it takes an *array*: `applyDecorations` (and so `decorate`) replaces the
entire decoration set for a group on every call, so batch everything for a
group into a single `decorate` call rather than calling it once per
decoration (which would clobber the previous one).

```typescript
import { setupDecorations, DecorationStyleType } from "@readium/speech";

const decorations = setupDecorations();

decorations.decorate([{
  id: "tts-word",
  style: { type: DecorationStyleType.Highlight, tint: "#ffeb3b", enforceContrast: false },
  text: { highlight: "world", before: "Hello ", after: "." },
}], "tts");
```

### 2. `createLocator` + `applyDecorations`

`Locator` requires `href`/`type`, but they're never read when anchoring
within the current document — `createLocator` synthesizes them for you, so
you only provide what actually locates the content: `text: { highlight,
before, after }` (text-quote matching) and/or `cssSelector`/`domRange`/`fragment`
(CSS-selector, exact DOM-range, or element-id/raw-fragment anchoring — combine
`cssSelector` with `text` to scope the text search to that selector). `fragment`
also takes a raw WICG `:~:text=...` directive — the only way to express a
`textStart,textEnd` range, since `text.highlight` holds one exact quote (see
[Guided Navigation](GuidedNavigation.md)). You still build the `Decoration`
array and manage the group yourself.

```typescript
import { setupDecorations, createLocator, DecorationStyleType } from "@readium/speech";

const decorations = setupDecorations();

decorations.applyDecorations([{
  id: "tts-word",
  locator: createLocator({ text: { highlight: "world", before: "Hello ", after: "." } }),
  style: { type: DecorationStyleType.Highlight, tint: "#ffeb3b", enforceContrast: false },
}], "tts");
```

### 3. Raw `Locator` + `applyDecorations`

Full control over every `Locator`/`Decoration` field, including things the
helpers above don't expose (`locations.progression`/`position`, custom
`otherLocations` extension keys, `title`). `Locator`, `LocatorLocations`, and
`LocatorText` are all re-exported from `@readium/speech` — note that
`LocatorLocations`'s `fragments` field is required on the type itself (even
though the constructor defaults it), so build it via `new LocatorLocations(...)`
rather than a plain object literal when going beyond what `createLocator`
covers.

```typescript
import { setupDecorations, DecorationStyleType, Locator } from "@readium/speech";

const decorations = setupDecorations();

decorations.applyDecorations([{
  id: "tts-word",
  locator: new Locator({
    href: window.location.href,
    type: "text/html",
    text: { highlight: "world", before: "Hello ", after: "." },
  }),
  style: { type: DecorationStyleType.Highlight, tint: "#ffeb3b", enforceContrast: false },
}], "tts");
```

### Clearing and teardown

Clearing and teardown are plain `DecorationController` methods — unaffected
by which of the three ways above you used to apply a decoration on that
controller:

```typescript
// Clear a group once playback moves on
decorations.applyDecorations([], "tts");

// When done with highlighting altogether
decorations.destroy();
```

Pairing any of these with `ReadiumSpeechNavigator` events (see the [Playback API](Playback.md)) lets you re-apply the decoration on word/sentence boundaries as playback progresses — see `demo/script.js` and `demo/voice-selection/script.js` for complete examples driven by TTS boundary events.

## Highlighting from `locate`/`offsets`

An utterance's own `locate`/`offsets` (see [`ReadiumSpeechUtterance`](Playback.md#readiumspeechutterance)) are what let you anchor decorations to the exact source element(s) it came from, instead of searching page text for a match that could occur more than once.

> [!WARNING]
> `locate`'s `cssSelector`/`domRange` are resolved against the DOM at resolution (decoration) time, not the DOM as it looked when the GND was generated. If the document's structure changed in between, resolution can silently land on the wrong element.

### Using `ReadiumSpeechNavigator`

`"boundary"` events already carry `detail.locate` — a single `LocatorOptions` for `"word"`, a `LocatorOptions[]` for `"sentence"`/`"structure"` (see [Playback.md](Playback.md#boundary-events)) — resolved via the same two functions documented below. You still build and apply the `Decoration`s yourself; only the locate resolution is done for you.

### Without `ReadiumSpeechNavigator`

There's no `"boundary"` event to read `detail.locate` off, so resolve it yourself, with one of two functions depending on what you're highlighting.

#### Sentence/structure-level

Which `LocatorOptions` to decorate for the whole utterance depends on the `segmentation` option ([Utterance Extraction](UtteranceExtraction.md#segmentation)) it was extracted with, not on a per-utterance fallback. Call `resolveUtteranceLocate(utterance, segmentation)` whenever you start speaking a new utterance:

```typescript
import { resolveUtteranceLocate, setupDecorations, createLocator, DecorationStyleType } from "@readium/speech";

const decorations = setupDecorations();
const style = { type: DecorationStyleType.Highlight, tint: "#ffeb3b", enforceContrast: false };

function highlightUtterance(utterance, segmentation) {
  const locates = resolveUtteranceLocate(utterance, segmentation);
  decorations.applyDecorations(
    locates.map((locate, i) => ({ id: `tts-sentence-${i}`, locator: createLocator(locate), style })),
    "tts-sentence",
  );
}
```

- With `segmentation: "structure"` (default): always the utterance's own `locate` — one whole structural element, regardless of how many `offsets` it happens to carry (e.g. a footnote's start/content/end merged into one utterance still decorates as one piece, not as separate sentences).
- With `segmentation: "sentence"`: one `LocatorOptions` per contributing source element — a sentence reconstructed across multiple elements decorates as multiple pieces, not one box spanning the gap between them.

A synthesized announcement (contextualization text, alt/caption description...) carries no `offsets` in either mode but still returns its own `locate` — handle that separately if you don't want it highlighted, since it has no real source text to scope a piece-level decoration to.

#### Word-level

`charIndex`/`charLength` on a boundary are always positions in `utterance.plain` — decided at runtime by whichever engine/voice/language is speaking, not by this library — so they can't be looked up directly against `offsets` (each entry's own source text). Call `resolveBoundaryLocate()` whenever your engine reports one:

```typescript
import { resolveBoundaryLocate } from "@readium/speech";

engine.on("boundary", (event) => {
  const resolved = resolveBoundaryLocate(currentUtterance, event.detail.charIndex, event.detail.charLength);
  if (!resolved) return;

  decorations.applyDecorations([{
    id: "tts-word",
    locator: createLocator(resolved.locate),
    style: { type: DecorationStyleType.Highlight, tint: "#ffeb3b", enforceContrast: false },
  }], "tts-word");
});
```
