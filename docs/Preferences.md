# Preferences

`ReadiumSpeechNavigator` implements Readium's [Preferences API](https://readium.org/architecture/proposals/009-preferences-api.html) pattern: submit a `SpeechPreferences` object, read back the resolved `SpeechSettings`, or use a `SpeechPreferencesEditor` for per-field `value`/`effectiveValue`/`isEffective` handles.

```typescript
navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
navigator.settings.verbosity; // "most"

const editor = navigator.preferencesEditor;
editor.verbosity.effectiveValue; // "most"
editor.pauseDuration.value = 500;
navigator.submitPreferences(editor.preferences);
```

`submitPreferences()` always resolves `navigator.settings` from the submitted preferences, whatever content is loaded. But only the prosody group (`pauseDuration`, `pauseScope`, `rate`, `pitch`, `volume`) actually changes anything on content loaded via plain `loadContent()` — the extraction group (`format`, `inlineContextualization`, `verbosity`, `skip`, `contextualize`, `language`) has nowhere to re-run extraction without a retained source, so it's a no-op there. Load content via `loadGndContent()` instead to get re-extraction on every submission — see [Playback](Playback.md#example-usage). `extractUtterances()` itself never sees a "preference": `SpeechSettings` resolves everything down to the plain `skip`/`contextualize`/`language`/`format`/`inlineContextualization` options it already accepts (see [Utterance Extraction](UtteranceExtraction.md)).

## Defaults

Every default (`"few"` verbosity, 300ms `pauseDuration`, rate/pitch/volume of `1.0`, ...) is itself configurable — pass a `defaults` object to `ReadiumSpeechNavigator`'s constructor, alongside optional initial `preferences`:

```typescript
const navigator = new ReadiumSpeechNavigator(engine, {
  preferences: { verbosity: "most" },
  defaults: { pauseDuration: 500, rate: 1.2 },
});
```

Both `preferences` and `defaults` go through the same validation as `submitPreferences()`: an out-of-range or unsupported value is dropped, falling back to the built-in literal default rather than propagating.

## Validation

Every field on `SpeechPreferences` (and `SpeechDefaults`) is checked against its declared range/enum/type when constructed — an out-of-range number, an unrecognized enum value, or a wrong-typed value is dropped to `undefined` (or, for `SpeechDefaults`, falls back to the built-in literal) rather than silently accepted. This applies however the value arrives — `new SpeechPreferences(...)`, `submitPreferences(...)`, or a value deserialized from storage — not just when set through `SpeechPreferencesEditor`, whose per-field setters additionally throw immediately for interactive feedback (e.g. a UI slider going out of bounds).

`skip`/`contextualize` are only checked for shape (an array of strings), not role membership — GND roles are an open vocabulary, not a fixed catalog.

## Verbosity

```typescript
type VerbosityPreset = "none" | "few" | "some" | "most" | "custom";
```

Each preset resolves to a fixed set of roles that are skipped and a fixed set whose announcements fire, from `skippableAtVerbosity`/`contextualizedAtVerbosity` — `"few"` (the default) covers non-textual/math content only; `"most"` covers everything with a catalog entry. `skip`/`contextualize` on `SpeechPreferences` only apply under `"custom"`; every other preset uses its own fixed sets and ignores them:

```typescript
new SpeechPreferences({ verbosity: "custom", contextualize: ["chapter", "footnote"] });
```

## Prosody

```typescript
pauseDuration?: number;                      // ms, default 300
pauseScope?: "utterance" | "block";          // which transitions get pauseDuration, default "utterance"
automaticPausesAtPageOrSpreadEnd?: boolean;  // typed, no effect yet
rate?: number;                               // default 1.0, range [0.1, 10]
pitch?: number;                              // default 1.0, range [0, 2]
volume?: number;                             // default 1.0, range [0, 1]
```

`pauseDuration` delays the navigator's next `speak()` call after each utterance ends, scoped by `pauseScope`: `"utterance"` (the default) applies it between every utterance; `"block"` applies it only where the next utterance starts a new block-level element (a paragraph, heading, list item, table cell, ...), derived from the source Guided Navigation document by `extractUtterances()` — transitions within the same block get no pause. `automaticPausesAtPageOrSpreadEnd` is typed but has no effect today: pausing at a page/spread boundary needs context (where a page actually ends) that this library doesn't have — likely a concern for the consuming app, not something resolved here.

`rate`/`pitch`/`volume` are pushed straight to the engine's own `setRate`/`setPitch`/`setVolume` on every `submitPreferences()` call — unlike the extraction-time preferences below, they apply immediately to whatever's currently loaded, not just the next `loadGndContent()`/`reextract()`.

`language` (`"none" | "block-level" | "always"`) is the same option documented in [Utterance Extraction](UtteranceExtraction.md#options).

## `format` / `inlineContextualization`

Set once via `submitPreferences()` instead of on every `extractUtterances()` call:

```typescript
format?: "plain" | "ssml";     // default "plain"
inlineContextualization?: boolean;   // default false
```
