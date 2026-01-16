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

The second demo focuses on in-context reading with seamless voice selection (grouped by region and sorted based on quality), and playback control, providing an optional read-along experience that integrates naturally with the content.

## QuickStart

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/readium/speech.git
   cd speech
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the package:
   ```bash
   npm run build
   ```

4. Link the package locally (optional, for development):
   ```bash
   npm link
   # Then in your project directory:
   # npm link readium-speech
   ```

### Basic Usage

```typescript
import { WebSpeechVoiceManager } from "readium-speech";

async function setupVoices() {
  try {
    // Initialize the voice manager
    const voiceManager = await WebSpeechVoiceManager.initialize();
    
    // Get all available voices
    const allVoices = voiceManager.getVoices();
    console.log("Available voices:", allVoices);
    
    // Get voices with filters
    const filteredVoices = voiceManager.getVoices({
      languages: ["en", "fr"],
      gender: "female",
      quality: "high",
      offlineOnly: true,
      excludeNovelty: true,
      excludeVeryLowQuality: true,
      removeDuplicates: true
    });
    
    // Sort by quality
    const sortedByQuality = await voiceManager.sortVoicesByQuality(filteredVoices);

    // Sort by preferred languages
    const sortedByLanguage = await voiceManager.sortVoicesByLanguages(["en", "fr"], filteredVoices);

    // Sort by preferred languages and regions
    const sortedByRegion = await voiceManager.sortVoicesByRegions(["en-US", "en-GB"], filteredVoices);
    
    // Get a test utterance for a specific language
    const testText = voiceManager.getTestUtterance("en");
    
  } catch (error) {
    console.error("Error initializing voice manager:", error);
  }
}

await setupVoices();
```

## Docs

Documentation provides guides for:

- [SpeechSynthesis in browsers and OSes](docs/WebSpeech.md)
- [Voices and Filtering](docs/VoicesAndFiltering.md)
- [API Reference](docs/API.md)

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
   npm run serve
   ```

2. Open your browser to:
   - [Voice selection demo](http://localhost:8080/demo)
   - [In-context reading demo](http://localhost:8080/demo/article)

### ChromeOS Debugging

For ChromeOS development, the project includes a debug mode that mocks the Web Speech API with the set of voices exported from the ChromeOS browser:

1. Open the debug page: http://localhost:8080/debug

2. The debug page loads mock voices from a json file which contains a snapshot of ChromeOS voices.

### Running Tests

To run the test suite for `WebSpeechVoiceManager`:
```bash
npm test
```
