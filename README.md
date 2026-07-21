# Readium Speech

Readium Speech is a TypeScript library for implementing a read aloud feature with Web technologies. It follows [best practices](https://github.com/HadrienGardeur/read-aloud-best-practices) gathered through interviews with members of the digital publishing industry.

While this project is still in a very early stage, it is meant to power the read aloud feature for two different Readium projects: [Readium Web](https://readium.org/guided-navigation) and [Thorium](https://thorium.edrlab.org/).

Readium Speech was spun out as a separate project in order to facilitate its integration as a shared component, but also because of its potential outside of the realm of ebook reading apps.

## Scope

* Extracting [Guided Navigation objects](https://readium.org/guided-navigation) from a document (or a fragment of a document)
* Generating utterances from these Guided Navigation objects
* Processing utterances (prepending/appending text to utterances based on context, pronunciation through SSML/PLS…)
* Voice selection
* TTS playback
* Highlighting

## Current focus

For our initial work on this project, we focused on voice selection based on [recommended voices](https://github.com/HadrienGardeur/web-speech-recommended-voices).

The outline of this work has been explored in a [GitHub discussion](https://github.com/HadrienGardeur/web-speech-recommended-voices/discussions/9) and through a [best practices document](https://github.com/HadrienGardeur/read-aloud-best-practices/blob/main/voice-selection.md).

In the second phase, we focused on implementing a WebSpeech API-based solution with an architecture designed for future extensibility:

- **Engine Layer**: Core TTS functionality through `ReadiumSpeechPlaybackEngine`
- **Navigator Layer**: Content and playback management via (a temporary) `ReadiumSpeechNavigator`
- **Current Implementation**: WebSpeech API with cross-browser compatibility
- **Future-Proof Design**: Architecture prepared for additional TTS service adapters

Key features include advanced voice selection, cross-browser playback control, flexible content loading, and comprehensive event handling for UI feedback. The architecture is designed to be extensible for different TTS backends while maintaining TypeScript-first development practices.

In the third phase, we added highlighting: content currently being spoken (e.g. the current word or sentence) can be highlighted as playback progresses. See the [Highlighting guide](docs/Highlighting.md).

We are now focused on the fourth phase: extracting [Guided Navigation objects](https://readium.org/guided-navigation) from a document (or a fragment of a document), and generating utterances from these objects.

## Demos

Two live demos are available:

1. [Voice selection with playback demo](https://readium.org/speech/demo)
2. [In-context demo](https://readium.org/speech/demo/article)

The first demo showcases the following features:

- fetching a list of all available languages, translating them to the user's locale and sorting them based on these translations
- returning a list of voices for a given language, grouped by region and sorted based on quality
- filtering languages and voices based on gender and offline availability
- using embedded test utterances to demo voices
- using the current Navigator for playback control

The second demo focuses on in-context reading with seamless voice selection (grouped by region and sorted based on quality), and playback control, providing an optional read-along experience that integrates naturally with the content. Both demos also showcase highlighting: as playback progresses, the current word/sentence is highlighted.

## Installation

Install the package using npm:

```bash
npm install @readium/speech
```

Or using yarn:

```bash
yarn add @readium/speech
```

## Quick Start

```typescript
import {
  WebSpeechVoiceManager,
  WebSpeechReadAloudNavigator,
  setupDecorations,
  DecorationStyleType,
} from "@readium/speech";

// Initialize voice manager
const voiceManager = await WebSpeechVoiceManager.initialize({ 
  languages: ["en", "fr", "es"] // List of languages to fetch voices for
});

// Get the best available voice for a specific language
const voice = await voiceManager.getDefaultVoice("en-US");

// Create a navigator instance
const navigator = new WebSpeechReadAloudNavigator();
await navigator.setVoice(voice);

const content = document.getElementById("content");
if (!content) throw new Error("Missing #content element");

// Set up highlighting for the current window
const decorations = setupDecorations();

// Handle playback events
navigator.on("play", () => console.log("Playback started"));
navigator.on("pause", () => console.log("Playback paused"));
navigator.on("end", () => console.log("Playback completed"));

// Highlight each word as it's spoken
navigator.on("boundary", (event) => {
  const { charIndex, charLength } = event.detail;
  const utterance = content.textContent ?? "";
  const word = utterance.substring(charIndex, charIndex + charLength);

  decorations.decorate([{
    id: "tts-word",
    style: { type: DecorationStyleType.Highlight, tint: "#ffeb3b" },
    highlight: word,
  }], "tts");
});

// Load and play content
navigator.loadContent(content);
navigator.play();
```

See the [Highlighting guide](docs/Highlighting.md) for the other ways to build and apply decorations.

## Docs

Documentation provides guides for:

- [SpeechSynthesis in browsers and OSes](docs/WebSpeech.md)
- [Voices and Filtering](docs/VoicesAndFiltering.md)
- [Voice Management](docs/VoiceManagement.md)
- [Playback API](docs/Playback.md)
- [Highlighting](docs/Highlighting.md)
- [Guided Navigation](docs/GuidedNavigation.md) — extracting [Guided Navigation objects](https://readium.org/guided-navigation) from HTML/XHTML content
- [Utterance Extraction](docs/UtteranceExtraction.md) — extracting utterances from Guided Navigation objects

## Development

We are trying to use a test-driven development approach as much as possible, where we write tests before implementing the code. Currently, this is true for the `WebSpeechVoiceManager` class as it deals primarily with voice selection and management, where mocking is straightforward.

The playback logic is more complex and may not be suitable for this approach yet, as it involves more intricate state management and user interactions that is difficult to handle through mock objects, especially as browsers vary significantly in their implementation of the Web Speech API.

### Building the Library

To build the library:
```bash
npm run build
```

This will compile the TypeScript code and generate the following outputs in the `build/` directory:
- `index.js` (ES modules)
- `index.cjs` (CommonJS)
- TypeScript type definitions

### Running Demos Locally

The project includes two demo applications that can be served locally:

1. Start the local development server:
   ```bash
   npm run start
   ```

2. Open your browser to:
   - [Voice selection demo](http://localhost:8080/demo)
   - [In-context reading demo](http://localhost:8080/demo/article)

### ChromeOS Debugging

For ChromeOS development, the project includes a debug mode that mocks the Web Speech API with the set of voices exported from the ChromeOS browser:

1. Open the debug page: http://localhost:8080/debug

2. The debug page loads mock voices from a json file which contains a snapshot of ChromeOS voices.

### Testing

`npm test` builds the library and runs the full test suite (`ava`) across `test/**/*.test.ts`. Narrower scripts are available for working on one area at a time:

```bash
npm test           # build + full suite
npm run test:voices     # WebSpeechVoiceManager only
npm run test:gnd        # HTML/XHTML -> Guided Navigation conversion
npm run test:utterances # Guided Navigation -> utterance extraction
```

`test:gnd` and `test:utterances` are both driven by [`fixtures/`](fixtures/README.md), a language-agnostic conformance suite of paired input/expected-output files (`input.html`/`input.xhtml`, `gnd.json`, `utterances.json`) covering the [Guided Navigation](docs/GuidedNavigation.md) and [utterance extraction](docs/UtteranceExtraction.md) stages one role/encoding/option at a time. Each fixture is a plain-file test case any platform implementation can consume, not just this TypeScript one — see [fixtures/README.md](fixtures/README.md) for the format, how to add a fixture, and how a fixture "passes".

## Acknowledgments

This project is based on the work done initially by [Hadrien Gardeur](https://github.com/hadriengardeur) in the [web-speech-recommended-voices](https://github.com/HadrienGardeur/web-speech-recommended-voices) repository.

Hundreds of voices have been documented as JSON and [released under a CC0 license](https://github.com/HadrienGardeur/web-speech-recommended-voices/tree/main?tab=CC0-1.0-1-ov-file#readme).
