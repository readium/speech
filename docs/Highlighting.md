# Highlighting

While playback is underway, most read aloud experiences highlight the content currently being spoken (e.g. the current word or sentence), so that readers can follow along visually.

Highlighting is handled by [`@readium/decorator`](https://github.com/readium/ts-toolkit/tree/main/decorator), re-exported from `@readium/speech`. It works by applying and removing decorations — styled overlays anchored to a `Locator` — grouped under an arbitrary name (e.g. `"tts"`) so that a later call for the same group replaces its previous decorations.

## Setting it up

`createDecorations()` wires up decoration support for the current window (as opposed to inside a navigator iframe) and returns a ready-to-use `DecorationController`:

```typescript
function createDecorations(
  wnd?: Window,                        // defaults to `window`
  config?: DecorationControllerConfig
): DecorationController;
```

`DecorationController` exposes:

```typescript
interface DecorationController {
  applyDecorations(decorations: Decoration[], group: string): void;
  supportsDecorationStyle(styleTypeId: string): boolean;
  registerDecorationObserver(group: string, observer: DecorationObserver): void;
  unregisterDecorationObserver(observer: DecorationObserver): void;
  destroy(): void; // unmounts the underlying Decorator and releases its comms channel
}
```

## Example Usage

```typescript
import { createDecorations, DecorationStyleType, Locator } from "@readium/speech";

const decorations = createDecorations();

decorations.applyDecorations([{
  id: "tts-word",
  locator: new Locator({
    href: window.location.href,
    type: "text/html",
    text: { highlight: "world", before: "Hello ", after: "." },
  }),
  style: { type: DecorationStyleType.Highlight, tint: "#ffeb3b", enforceContrast: false },
}], "tts");

// Clear it once playback moves on
decorations.applyDecorations([], "tts");

// When done with highlighting altogether
decorations.destroy();
```

Pairing this with `ReadiumSpeechNavigator` events (see the [Playback API](Playback.md)) lets you re-apply the decoration on word/sentence boundaries as playback progresses — see `demo/script.js` for a complete example driven by TTS boundary events.
