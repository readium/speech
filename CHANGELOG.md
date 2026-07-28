# Changelog

All notable changes to this project are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project follows [Semantic Versioning](https://semver.org/).

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
