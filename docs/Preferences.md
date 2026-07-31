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

Preferences only take effect on content loaded via `loadGndContent()` — see [Playback](Playback.md#example-usage). `extractUtterances()` itself never sees a "preference": `SpeechSettings` resolves everything down to the plain `skip`/`contextualize`/`language`/`format`/`interruptSentence` options it already accepts (see [Utterance Extraction](UtteranceExtraction.md)).

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
pauseDuration?: number;                      // ms between utterances, default 300
automaticPausesBetweenUtterances?: boolean;  // default false
automaticPausesAtPageOrSpreadEnd?: boolean;  // typed, no effect yet
```

`automaticPausesBetweenUtterances` delays the navigator's next `speak()` call by `pauseDuration`. `automaticPausesAtPageOrSpreadEnd` has no effect today — this library has no concept of a "page" or "spread" boundary, so nothing can trigger it yet.

`language` (`"none" | "block-level" | "always"`) is the same option documented in [Utterance Extraction](UtteranceExtraction.md#options).

## `format` / `interruptSentence`

Set once via `submitPreferences()` instead of on every `extractUtterances()` call:

```typescript
format?: "plain" | "ssml";     // default "plain"
interruptSentence?: boolean;   // default false
```
