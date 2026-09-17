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

Pairing any of these with `ReadiumSpeechNavigator` events (see the [Playback API](Playback.md)) lets you re-apply the decoration on word/sentence boundaries as playback progresses — see `demo/script.js` and `demo/article/script.js` for complete examples driven by TTS boundary events.

## Highlighting from `locate`/`offsets`

An utterance's own `locate`/`offsets` (see [`ReadiumSpeechUtterance`](Playback.md#readiumspeechutterance)) are what let you anchor decorations to the exact source element(s) it came from, instead of searching page text for a match that could occur more than once.

Which locator(s) to decorate depends on the `segmentation` option ([Utterance Extraction](UtteranceExtraction.md#segmentation)) the utterances were extracted with, not on a per-utterance fallback. A synthesized announcement (contextualization text, alt/caption description...) carries no `offsets` in either mode — handle that separately if you want it highlighted too, since it has no real source text to scope a piece-level decoration to.

### Structure-level

With `segmentation: "structure"` (default), one utterance is already one whole structural element, so decorate `locate` directly:

```typescript
import { setupDecorations, createLocator, DecorationStyleType } from "@readium/speech";

const decorations = setupDecorations();
const style = { type: DecorationStyleType.Highlight, tint: "#ffeb3b", enforceContrast: false };

function highlightUtterance(utterance) {
  if (!utterance.locate) return;
  decorations.applyDecorations([{ id: "tts-structure", locator: createLocator(utterance.locate), style }], "tts-structure");
}
```

### Sentence-level

With `segmentation: "sentence"`, a sentence can be reconstructed across multiple source elements, so decorate each `offsets` entry separately:

```typescript
function highlightUtterance(utterance) {
  if (!utterance.offsets?.length) return;
  decorations.applyDecorations(
    utterance.offsets.map((offset, i) => ({ id: `tts-sentence-${i}`, locator: createLocator(offset.locate), style })),
    "tts-sentence",
  );
}
```

### Word-level

On a `"boundary"` event, `charIndex`/`charLength` index the utterance's spoken text (`plain`/`ssml`) as a whole — not each `offsets` entry's own source text — so first find which offset the boundary falls in, then re-locate the word within that offset's own text before decorating it:

```typescript
function locatePieceAt(utterance, charIndex) {
  const offsets = utterance.offsets;
  if (!offsets?.length) return null;
  if (offsets.length === 1) {
    return { offset: offsets[0], localIndex: charIndex };
  }

  const outputText = utterance.plain ?? utterance.ssml ?? "";
  let cursor = 0;
  for (const offset of offsets) {
    const pieceText = offset.locate.text?.highlight;
    if (!pieceText) continue;
    const start = outputText.indexOf(pieceText, cursor);
    if (charIndex < start + pieceText.length) return { offset, localIndex: charIndex - start };
    cursor = start + pieceText.length;
  }
  return null;
}

navigator.on("boundary", (event) => {
  const utterance = navigator.getCurrentContent();
  const found = utterance && locatePieceAt(utterance, event.detail.charIndex);
  if (!found) return;

  const { offset, localIndex } = found;
  const pieceText = offset.locate.text.highlight;
  const word = pieceText.substring(localIndex, localIndex + event.detail.charLength);

  decorations.applyDecorations([{
    id: "tts-word",
    locator: createLocator({
      ...offset.locate,
      text: { highlight: word, before: pieceText.substring(0, localIndex), after: pieceText.substring(localIndex + word.length) },
    }),
    style: { type: DecorationStyleType.Highlight, tint: "#ffeb3b", enforceContrast: false },
  }], "tts-word");
});
```
