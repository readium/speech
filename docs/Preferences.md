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

`submitPreferences()` always resolves `navigator.settings`. Prosody (`pauseDuration`, `autoPause`, `rate`, `pitch`, `volume`) applies regardless of how content was loaded, except that `autoPause: "block"` only has block boundaries to work with on content loaded via `loadGndContent()` — content loaded via `loadContent()` has none, so it never triggers there. The extraction group (`format`, `inlineContextualization`, `verbosity`, `skip`, `contextualize`, `language`) only takes effect on content loaded via `loadGndContent()` — see [Playback](Playback.md) — and only reloads the queue when one of those fields actually changes value. A reload during playback resumes at the same content rather than restarting, falling back to the nearest earlier point still present if that exact content got skipped by the new settings.

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

Each preset resolves to a fixed set of roles that are skipped and a fixed set whose contextualizations fire, from `skippedAtVerbosity`/`contextualizedAtVerbosity` — `"few"` (the default) covers non-textual/math content only; `"most"` covers everything with a catalog entry. It also resolves each role's contextualization shape (`contextualizationShapesAtVerbosity`) — e.g. `table` is `"inline"` at `"few"`, `"block"` at `"some"`/`"most"` (see [Utterance Extraction](UtteranceExtraction.md#options)). `skip`/`contextualize` on `SpeechPreferences` only apply under `"custom"`; every other preset uses its own fixed sets and ignores them:

```typescript
new SpeechPreferences({ verbosity: "custom", contextualize: ["chapter", "footnote"] });
```

## Prosody

```typescript
pauseDuration?: number;                          // ms, default 300
autoPause?: "none" | "utterance" | "block";      // fully pause instead of continuing automatically, default "none"
rate?: number;                                   // default 1.0, range [0.1, 10]
pitch?: number;                                  // default 1.0, range [0, 2]
volume?: number;                                 // default 1.0, range [0, 1]
```

`pauseDuration` and `autoPause` are unrelated. `pauseDuration` always delays the navigator's next automatic `speak()` call after an utterance ends — it's just a gap, playback keeps going on its own. `autoPause` decides whether that automatic continuation happens at all: `"none"` (the default) never interrupts it; `"utterance"` stops playback after every utterance; `"block"` stops it only where the next utterance starts a new block-level element (a paragraph, heading, list item, table cell, ...). An auto-pause fires a `pause` event and moves `navigator.getState()` to `"paused"`, exactly like calling `pause()` yourself — nothing plays again until `play()` is called.

`rate`/`pitch`/`volume` are pushed straight to the engine's own `setRate`/`setPitch`/`setVolume` on every `submitPreferences()` call — unlike the extraction-time preferences, no reload. An engine that needs to re-synthesize already-buffered content on parameter changes handles that itself inside those setters.

`language` (`"none" | "block-level" | "always"`) is the same option documented in [Utterance Extraction](UtteranceExtraction.md#options).

## `format` / `inlineContextualization`

Set once via `submitPreferences()` instead of on every `extractUtterances()` call:

```typescript
format?: "plain" | "ssml";     // default "plain"
inlineContextualization?: boolean;   // default false
```
