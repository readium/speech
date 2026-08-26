# Changelog

All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project follows [Semantic Versioning](https://semver.org/).

## [0.7.1] - 2026-08-26

### Fixed

- `SpeechServerEngine`/`SpeechServerEngineProvider` no longer double-apply speed on voices whose provider already applies it server-side (e.g. ElevenLabs). [speech-server](https://github.com/readium/speech-server) stopped sending `controls` per voice on `GET /voices`, moving it to `GET /service`'s `providers[]` only — voice mapping now merges each voice's `controls` from there instead of a field the server no longer sends.

## [0.7.0] - 2026-08-04

### Added

- `autoPause` preference (`"none" | "utterance" | "block"`, default `"none"`) — fully pauses playback between utterances or blocks (fires `pause`, `navigator.getState()` becomes `"paused"`) instead of continuing on its own; playback resumes only when `play()` is called. See [Preferences.md](docs/Preferences.md#prosody).

### Changed

- `SpeechDefaults.language` default is now `"block-level"`, was `"always"`.
- `ReadiumSpeechUtterance` drops `startsNewBlock`. Block-boundary info is now internal to extraction — `autoPause: "block"` only has effect on content loaded via `loadGndContent()`; content loaded via `loadContent()` never triggers it.
- `pauseDuration` always delays the next automatic continuation now that `pauseScope` is gone — it's no longer scoped to a subset of transitions.

### Removed

- `SpeechPreferences.pauseScope` / `SpeechDefaults.pauseScope`, added in 0.6.0. It was meant to implement automatic pausing between utterances/paragraphs but only ever delayed an automatic continuation rather than actually pausing — replaced by `autoPause`.

## [0.6.0] - 2026-08-04

### Added

- Preferences API on `ReadiumSpeechNavigator` (`submitPreferences()`, `settings`, `preferencesEditor`), covering verbosity presets and prosody (`pauseDuration`, `pauseScope`, `rate`, `pitch`, `volume`). See [Preferences.md](docs/Preferences.md).
- `ReadiumSpeechNavigator.loadGndContent()`, retaining a Guided Navigation tree so preferences can re-run extraction on it.
- `ReadiumSpeechUtterance.startsNewBlock`, marking utterances that begin a new block-level element — used by `pauseScope: "block"`.
- Default announcements for several previously-uncataloged roles.

### Changed

- `ExtractUtterancesOptions.contextualize` is now `GndRole[]` (which roles announce), replacing the previous on/off `boolean`; default is now nothing contextualized.
- `ExtractUtterancesOptions.interruptSentence` renamed to `inlineContextualization`.
- `ReadiumSpeechNavigatorContract` drops `setRate`/`getRate`/`setPitch`/`getPitch`/`setVolume`/`getVolume` — use the Preferences API instead.
- Each fixture's `utterances.json` now pairs one result with every option-set that produces it (`options` is an array), instead of repeating identical results per option-set — see [fixtures/README.md](fixtures/README.md).

## [0.5.0] - 2026-07-31

### Added

- `SpeechServerEngine` / `SpeechServerEngineProvider`, a second `ReadiumSpeechPlaybackEngine` implementation backed by a [Readium Speech Server](https://github.com/readium/speech-server) HTTP service — with utterance prefetching, chunk-streaming for long/over-limit utterances, gapless Web Audio API scheduling, format/bitrate selection, and RFC 9457 error handling. See [SpeechServerEngine.md](docs/SpeechServerEngine.md).
- `ReadiumSpeechProviderRegistry`, for registering multiple `ReadiumSpeechEngineProvider`s (e.g. WebSpeech and speech-server) side by side and querying voices/creating engines across all of them. See [ProviderRegistry.md](docs/ProviderRegistry.md).
- `ReadiumSpeechVoice.identifier` and `ReadiumSpeechVoice.controls` (which playback controls a server-sourced voice actually honors), and `"server"` added to `TSource`.

### Changed

- `ReadiumSpeechNavigator` (renamed from `WebSpeechReadAloudNavigator`) is now engine-agnostic: its constructor requires an explicit `ReadiumSpeechPlaybackEngine` (e.g. `new ReadiumSpeechNavigator(new WebSpeechEngine())`), instead of defaulting to WebSpeech.
- `WebSpeechEngineProvider.getVoices()` no longer requires an engine to have been created first.

## [0.4.0] - 2026-07-28

### Added

- `setSpeakInContentLanguage(enabled)` / `getSpeakInContentLanguage()` on `ReadiumSpeechNavigator` and `ReadiumSpeechPlaybackEngine`: when enabled, each utterance is spoken in the best available voice for its own `language`, falling back to the selected/default voice when none matches (never racing ahead of voice loading and picking the wrong-language voice).
- `"languagefallback"` playback event, fired when no voice matches an utterance's content language (`detail: { language, reason: "no-matching-voice" }`).
- `WebSpeechVoiceManager.initialize({ languages })` can now be called again on an already-initialized singleton to broaden it to additional languages, instead of being silently ignored.

## [0.3.0] - 2026-07-22

### Added

- `makeGnd`, extracting a Guided Navigation (GND) JSON tree from HTML/XHTML.
- `extractUtterances`, walking a GND tree into a flat, ordered list of `ReadiumSpeechUtterance`s.
- Playground demo, published to GitHub Pages, with SSML-safe previews and word/sentence highlighting during playback.

## [0.2.0] - 2026-07-21

### Added

- Integration with `@readium/decorator` for highlighting, via a new wrapper API that simplifies common usage (including `Locator` handling).

### Changed

- `ReadiumSpeechVoice` is now fully typed, dropping the `any` fallback (#48).

### Fixed

- `textContent` coercion in demos; README quickstart example.

## [0.1.1] - 2026-06-22

### Added

- Veena voice data.

### Fixed

- Francisca voice data/naming.

## [0.1.0] - 2026-01-20

Initial release.
