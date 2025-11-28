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
      language: ["en", "fr"],
      gender: "female",
      quality: "high",
      offlineOnly: true,
      excludeNovelty: true,
      excludeVeryLowQuality: true
    });
    
    // Get voices grouped by language
    const voices = voiceManager.getVoices();
    const groupedByLanguage = voiceManager.groupVoices(voices, "language");
    
    // Get a test utterance for a specific language
    const testText = voiceManager.getTestUtterance("en");
    
  } catch (error) {
    console.error("Error initializing voice manager:", error);
  }
}

await setupVoices();
```

## API Reference

### Class: WebSpeechVoiceManager

The main class for managing Web Speech API voices with enhanced functionality.

#### Initialize the Voice Manager

```typescript
static initialize(maxTimeout?: number, interval?: number): Promise<WebSpeechVoiceManager>
```

Creates and initializes a new WebSpeechVoiceManager instance. This static factory method must be called to create an instance.

- `maxTimeout`: Maximum time in milliseconds to wait for voices to load (default: 10000ms)
- `interval`: Interval in milliseconds between voice loading checks (default: 100ms)
- Returns: Promise that resolves with a new WebSpeechVoiceManager instance

#### Get Available Voices

```typescript
voiceManager.getVoices(options?: VoiceFilterOptions): ReadiumSpeechVoice[]
```

Fetches all available voices that match the specified filter criteria.

```typescript
interface VoiceFilterOptions {
  language?: string | string[];  // Filter by language code(s) (e.g., "en", "fr")
  gender?: TGender;  // "male" | "female" | "other"
  quality?: TQuality | TQuality[];  // "high" | "medium" | "low" | "veryLow"
  offlineOnly?: boolean;  // Only return voices available offline
  provider?: string;  // Filter by voice provider
  excludeNovelty?: boolean;  // Exclude novelty voices
  excludeVeryLowQuality?: boolean;  // Exclude very low quality voices
}
```

#### Group Voices

```typescript
voiceManager.groupVoices(voices: ReadiumSpeechVoice[], groupBy: "language" | "region" | "gender" | "quality" | "provider"): VoiceGroup
```

Organizes voices into groups based on the specified criteria. The available grouping options are:

- `"language"`: Groups voices by their language code
- `"region"`: Groups voices by their region
- `"gender"`: Groups voices by gender
- `"quality"`: Groups voices by quality level
- `"provider"`: Groups voices by their provider

#### Sort Voices

```typescript
voiceManager.sortVoices(voices: ReadiumSpeechVoice[], options: SortOptions): ReadiumSpeechVoice[]
```

Arranges voices according to the specified sorting criteria. The `SortOptions` interface allows you to sort by various properties and specify sort order.

```typescript
interface SortOptions {
  by: "name" | "language" | "gender" | "quality" | "region";
  order?: "asc" | "desc";
}
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
  // Core identification
  label: string;          // User-friendly display name
  name: string;           // System/technical name (matches Web Speech API voiceURI)
  voiceURI?: string;      // For Web Speech API compatibility
  
  // Localization
  language: string;       // BCP 47 language tag (e.g., "en-US")
  localizedName?: string;  // Name in the voice's language
  altNames?: string[];     // Alternative names or aliases
  otherLanguages?: string[]; // Other language codes this voice can speak
  altLanguage?: string;    // Alternative language code this voice can speak
  multiLingual?: boolean;  // Whether the voice is multilingual
  
  // Voice characteristics
  gender?: TGender;       // Voice gender ("female" | "male" | "neutral")
  age?: string;           // Voice age group (e.g., "child", "adult", "senior")
  children?: boolean;     // Whether the voice is designed for children
  
  // Quality and capabilities
  quality?: TQuality[];    // Quality ratings ("veryLow" | "low" | "normal" | "high" | "veryHigh")
  pitchControl?: boolean;  // Whether pitch can be controlled
  
  // Performance settings
  pitch?: number;             // Current pitch (0-2, where 1 is normal)
  recommendedPitch?: number;  // Default pitch
  rate?: number;              // Speech rate (0.1-10, where 1 is normal)
  recommendedRate?: number;   // Default rate
  
  // Platform and compatibility
  browser?: string[];         // Browsers that support this voice
  offlineAvailability?: boolean; // If the voice works offline
  provider?: string;          // Voice provider (e.g., "Microsoft", "Google")
  isDefault?: boolean;        // If this is a default voice for its language
  isNovelty?: boolean;        // If this is a novelty voice
  isLowQuality?: boolean;     // If this is a low-quality voice
  nativeID?: string | string[]; // Platform-specific voice ID(s)
  os?: string[];              // Supported operating systems
  preloaded?: boolean;        // If the voice is preloaded on the system
  note?: string;              // Additional notes about the voice
  
  // Sample text for testing
  sampleText?: string;        // Sample text for testing the voice
  
  // For compatibility with Web Speech API
  localService?: boolean;     // If the voice is provided by the local system
  default?: boolean;          // If this is the default voice for the language
  
  // Allow for additional properties
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