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
      excludeVeryLowQuality: true
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

Documentation provides guide for:

- [SpeechSynthesis in browsers and OSes](docs/WebSpeech.md)
- [Voices and Filtering](docs/VoicesAndFiltering.md)

## API Reference

### Class: WebSpeechVoiceManager

The main class for managing Web Speech API voices with enhanced functionality.

#### Initialize the Voice Manager

```typescript
static initialize(options?: {
  languages?: string[];
  maxTimeout?: number;
  interval?: number;
}): Promise<WebSpeechVoiceManager>
```

Creates and initializes a new WebSpeechVoiceManager instance. This static factory method must be called to create an instance.

- `languages`: Optional array of preferred language codes to filter voices during initialization
- `maxTimeout`: Maximum time in milliseconds to wait for voices to load (default: 10000ms)
- `interval`: Interval in milliseconds between voice loading checks (default: 100ms)
- Returns: Promise that resolves with a new WebSpeechVoiceManager instance

#### Get filtered Voices

By default, the instance keeps all voices in memory. You can filter them using the `getVoices` method with optional filter criteria and use this array instead.

```typescript
voiceManager.getVoices(options?: VoiceFilterOptions): ReadiumSpeechVoice[]
```

Fetches all available voices that match the specified filter criteria.

```typescript
interface VoiceFilterOptions {
  languages?: string | string[];  // Filter by language code(s) (e.g., "en", "fr-FR")
  source?: TSource;  // Filter by voice source ("json" | "browser")
  gender?: TGender;  // "male" | "female" | "other"
  quality?: TQuality | TQuality[];  // "high" | "medium" | "low" | "veryLow"
  offlineOnly?: boolean;  // Only return voices available offline
  provider?: string;  // Filter by voice provider
  excludeNovelty?: boolean;  // Exclude novelty voices, true by default
  excludeVeryLowQuality?: boolean;  // Exclude very low quality voices, true by default
}
```

#### Get Languages and Regions

```typescript
voiceManager.getLanguages(localization?: string, filterOptions?: VoiceFilterOptions, voices?: ReadiumSpeechVoice[]): { code: string; label: string; count: number }[]

voiceManager.getRegions(localization?: string, filterOptions?: VoiceFilterOptions, voices?: ReadiumSpeechVoice[]): { code: string; label: string; count: number }[]
```

Returns arrays of languages and regions with their display names and voice counts. Both methods preserve the order of first occurrence when custom voices are provided.

#### Get Default Voice

```typescript
async voiceManager.getDefaultVoice(languages: string | string[], voices?: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice | null>
```

Automatically selects the best available voice based on quality and language preferences. This is the recommended method for getting a suitable voice without manual selection.

```typescript
// Get the best voice for user's browser language
const defaultVoice = await voiceManager.getDefaultVoice(navigator.languages || ["en"]);

// Get the best voice for specific preferred languages
const frenchVoice = await voiceManager.getDefaultVoice(["fr-FR", "fr-CA"]);

// Get the best voice from a pre-filtered voice list
const customVoice = await voiceManager.getDefaultVoice(["en-US", "en-GB"], customVoiceList);
```

The selection algorithm:
1. Filters voices by the specified languages (or uses provided voices array)
2. Sorts by region preference within matching languages  
3. Returns the highest quality voice from the best language/region match
4. Returns `null` if no voices match or if languages parameter is empty

#### Filter Voices

```typescript
voiceManager.filterVoices(options: VoiceFilterOptions, voices?: ReadiumSpeechVoice[]): ReadiumSpeechVoice[]
```

Filters voices based on the specified criteria. If no voices are provided, it filters the instance's internal voice list.

#### Group Voices

```typescript
voiceManager.groupVoices(groupBy: "languages" | "region" | "gender" | "quality" | "provider", voices?: ReadiumSpeechVoice[]): VoiceGroup
```

Organizes voices into groups based on the specified criteria. The available grouping options are:

- `"languages"`: Groups voices by their language code
- `"region"`: Groups voices by their region
- `"gender"`: Groups voices by gender
- `"quality"`: Groups voices by quality level
- `"provider"`: Groups voices by their provider

If no voices are provided, it groups the instance's internal voice list.

#### Sort Voices

The library provides opinionated voice sorting capabilities to help you find the best voice for your needs.

If you need more control over the sorting process, you can implement and apply your own sorting logic on filtered voices.

##### 1. Sort by Quality

Sort voices from highest to lowest quality:

```typescript
async voiceManager.sortVoicesByQuality(voices?: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice[]>;
// Returns: [veryHigh, high, normal, low, veryLow, null]
```

If no voices are provided, it sorts the instance's internal voice list.

##### 2. Sort by Language

Prioritize specific languages while maintaining JSON data’s quality order within each language group:

```typescript
async voiceManager.sortVoicesByLanguages(preferredLanguages?: string[], voices?: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice[]>;
// Returns: [preferred languages voices, other languages voices...]
```

If no voices are provided, it sorts the instance's internal voice list.

##### 3. Sort by Region

Sort voices by preferred languages and regions, while maintaining JSON data’s quality order within each region group:

```typescript
async voiceManager.sortVoicesByRegions(preferredLanguages?: string[], voices?: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice[]>;
// Returns: [languages in preferred then alphabetical order → regions: preferred regions → default region → alphabetical regions → voice quality within each region]
```

### Testing

#### Get Test Utterance

```typescript
voiceManager.getTestUtterance(language: string): string
```

Retrieves a sample text string suitable for testing text-to-speech functionality in the specified language. If no sample text is available for the specified language, it returns an empty string.

### Interfaces

#### `ReadiumSpeechVoice`

```typescript
interface ReadiumSpeechVoice {
  source: TSource;        // "json" | "browser"

  // Core identification (required)
  label: string;          // Human-friendly label for the voice
  name: string;           // JSON Name (or Web Speech API name if not found)
  originalName: string;   // Original name of the voice
  voiceURI?: string;      // For Web Speech API compatibility
  
  // Localization
  language: string;       // BCP-47 language tag
  localizedName?: TLocalizedName; // Localization pattern (android/apple)
  altNames?: string[];     // Alternative names (mostly for Apple voices)
  altLanguage?: string;    // Alternative BCP-47 language tag
  otherLanguages?: string[]; // Other languages this voice can speak
  multiLingual?: boolean;  // If voice can handle multiple languages
  
  // Voice characteristics
  gender?: TGender;       // Voice gender ("female" | "male" | "neutral")
  children?: boolean;     // If this is a children's voice
  
  // Quality and capabilities
  quality?: TQuality[];    // Available quality levels for this voice ("veryLow" | "low" | "normal" | "high" | "veryHigh")
  pitchControl?: boolean;  // Whether pitch can be controlled
  
  // Performance settings
  pitch?: number;         // Current pitch (0-2, where 1 is normal)
  rate?: number;          // Speech rate (0.1-10, where 1 is normal)
  
  // Platform and compatibility
  browser?: string[];     // Supported browsers
  os?: string[];          // Supported operating systems
  preloaded?: boolean;    // If the voice is preloaded on the system
  nativeID?: string | string[]; // Platform-specific voice ID(s)
  
  // Additional metadata
  note?: string;          // Additional notes about the voice
  provider?: string;      // Voice provider (e.g., "Microsoft", "Google")
  
  // Allow any additional properties that might be in the JSON
  [key: string]: any;
}
```

#### `LanguageInfo`

```typescript
interface LanguageInfo {
  code: string;
  label: string;
  count: number;
}
```

### Enums

#### `TQuality`

```typescript
type TQuality = "veryLow" | "low" | "normal" | "high" | "veryHigh";
```

#### `TGender`

```typescript
type TGender = "female" | "male" | "neutral";
```

#### `TSource`

```typescript
type TSource = "json" | "browser";
```

## Playback API

### ReadiumSpeechNavigator

```typescript
interface ReadiumSpeechNavigator {
  // Voice Management
  getVoices(): Promise<ReadiumSpeechVoice[]>;
  setVoice(voice: ReadiumSpeechVoice | string): Promise<void>;
  getCurrentVoice(): ReadiumSpeechVoice | null;
  
  // Content Management
  loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[]): void;
  getCurrentContent(): ReadiumSpeechUtterance | null;
  getContentQueue(): ReadiumSpeechUtterance[];
  
  // Playback Control
  play(): void;
  pause(): void;
  stop(): void;
  
  // Navigation
  next(): boolean;
  previous(): boolean;
  jumpTo(utteranceIndex: number): void;
  
  // Playback Parameters
  setRate(rate: number): void;
  getRate(): number;
  setPitch(pitch: number): void;
  getPitch(): number;
  setVolume(volume: number): void;
  getVolume(): number;
  
  // State
  getState(): ReadiumSpeechPlaybackState;
  getCurrentUtteranceIndex(): number;
  
  // Events
  on(
    event: ReadiumSpeechPlaybackEvent["type"],
    listener: (event: ReadiumSpeechPlaybackEvent) => void
  ): void;
  
  // Cleanup
  destroy(): void;
}
```

### Events

#### ReadiumSpeechPlaybackEvent

```typescript
type ReadiumSpeechPlaybackEvent = {
  type: 
    | "start"           // Playback started
    | "pause"           // Playback paused
    | "resume"          // Playback resumed
    | "end"             // Playback ended naturally
    | "stop"            // Playback stopped manually
    | "skip"            // Skipped to another utterance
    | "error"           // An error occurred
    | "boundary"        // Reached a word/sentence boundary
    | "mark"            // Reached a named mark in SSML
    | "idle"            // No content loaded
    | "loading"         // Loading content
    | "ready"           // Ready to play
    | "voiceschanged";   // Available voices changed
  detail?: any;  // Event-specific data
};
```

#### ReadiumSpeechPlaybackState

```typescript
type ReadiumSpeechPlaybackState = "playing" | "paused" | "idle" | "loading" | "ready";
```

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
