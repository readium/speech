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
  highlight: "world",
  before: "Hello ",
  after: ".",
}], "tts");
```

### 2. `createLocator` + `applyDecorations`

`Locator` requires `href`/`type`, but they're never read when anchoring
within the current document — `createLocator` synthesizes them for you, so
you only provide what actually locates the content: `highlight`/`before`/
`after` (text-quote matching) and/or `selector`/`fragment` (CSS-selector or
element-id anchoring — combine `selector` with text fields to scope the text
search to that selector). You still build the `Decoration` array and manage
the group yourself.

```typescript
import { setupDecorations, createLocator, DecorationStyleType } from "@readium/speech";

const decorations = setupDecorations();

decorations.applyDecorations([{
  id: "tts-word",
  locator: createLocator({ highlight: "world", before: "Hello ", after: "." }),
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
