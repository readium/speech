# API Reference

## Class: WebSpeechVoiceManager

The main class for managing Web Speech API voices with enhanced functionality.

### Initialize the Voice Manager

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

Returns a Promise that resolves with a `WebSpeechSpeechManager` instance. This instance is a singleton to ensure the same voice manager is used whether initialized directly or through the PlaybackEngine.

### Get Voices

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
  removeDuplicates?: boolean;  // Remove duplicate voices, true by default
}
```

By default, this method returns all voices, excluding novelty voices and very low quality voices, as well as removing what can be considered duplicate voices (lower quality, online/offline, etc).

### Get Languages and Regions

```typescript
voiceManager.getLanguages(localization?: string, filterOptions?: VoiceFilterOptions, voices?: ReadiumSpeechVoice[]): { code: string; label: string; count: number }[]

voiceManager.getRegions(localization?: string, filterOptions?: VoiceFilterOptions, voices?: ReadiumSpeechVoice[]): { code: string; label: string; count: number }[]
```

Returns arrays of languages and regions with their display names and voice counts. Both methods preserve the order of first occurrence when custom voices are provided.

### Get Default Voice

```typescript
async voiceManager.getDefaultVoice(languages: string | string[], voices?: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice | null>
```

Automatically selects the best available voice based on quality and language preferences. This is the recommended method for getting a suitable voice without manual selection.

```typescript
// Get the best voice for user's browser language
const defaultVoice = await voiceManager.getDefaultVoice(navigator.languages);

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

### Filter Voices

```typescript
voiceManager.filterVoices(options: VoiceFilterOptions, voices?: ReadiumSpeechVoice[]): ReadiumSpeechVoice[]
```

Filters voices based on the specified criteria. If no voices are provided, it filters the instance's internal voice list.

### Group Voices

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

### Sort Voices

The library provides opinionated voice sorting capabilities to help you find the best voice for your needs.

If you need more control over the sorting process, you can implement and apply your own sorting logic on filtered voices.

#### 1. Sort by Quality

Sort voices from highest to lowest quality:

```typescript
async voiceManager.sortVoicesByQuality(voices?: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice[]>;
// Returns: [veryHigh, high, normal, low, veryLow, null]
```

If no voices are provided, it sorts the instance's internal voice list.

#### 2. Sort by Language

Prioritize specific languages while maintaining JSON data’s quality order within each language group:

```typescript
async voiceManager.sortVoicesByLanguages(preferredLanguages?: string[], voices?: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice[]>;
// Returns: [preferred languages voices, other languages voices...]
```

If no voices are provided, it sorts the instance's internal voice list.

#### 3. Sort by Region

Sort voices by preferred languages and regions, while maintaining JSON data’s quality order within each region group:

```typescript
async voiceManager.sortVoicesByRegions(preferredLanguages?: string[], voices?: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice[]>;
// Returns: [languages in preferred then alphabetical order → regions: preferred regions → default region → alphabetical regions → voice quality within each region]
```

If no voices are provided, it sorts the instance's internal voice list.

## Testing

### Get Test Utterance

```typescript
voiceManager.getTestUtterance(language: string): string
```

Retrieves a sample text string suitable for testing text-to-speech functionality in the specified language. If no sample text is available for the specified language, it returns an empty string.

## Playback API

The playback API is a high-level API that provides a simple interface for playing, pausing, and stopping speech. It relies on an engine that you provide to it, or fallback to WebSpeech if none is provided.

Once initialized, you can use the navigator to load content (utterances) and control playback.

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

#### Example Usage

```typescript
import { WebSpeechReadAloudNavigator } from "@readium/speech";

const navigator = new WebSpeechReadAloudNavigator();

navigator.loadContent([
  { text: "Hello world.", language: "en" }
]);

function togglePlayback() {
  const state = navigator.getState();
  if (state === "playing") {
    navigator.pause();
  } else {
    navigator.play();
  }
}

togglePlayback();
```

## Events

### ReadiumSpeechPlaybackEvent

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

### ReadiumSpeechPlaybackState

```typescript
type ReadiumSpeechPlaybackState = "playing" | "paused" | "idle" | "loading" | "ready";
```

## Interfaces

### `ReadiumSpeechVoice`

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

### `LanguageInfo`

```typescript
interface LanguageInfo {
  code: string;
  label: string;
  count: number;
}
```

### ReadiumSpeechUtterance

```typescript
interface ReadiumSpeechUtterance {
  id?: string;          // Unique identifier for this content
  text: string;         // Text or SSML content
  ssml?: boolean;       // If true, text contains SSML
  language?: string;    // Language of this content (BCP 47)
}
```

Represents a single piece of content to be spoken. Can contain plain text or SSML markup.

## Enums

### `TQuality`

```typescript
type TQuality = null | "veryLow" | "low" | "normal" | "high" | "veryHigh";
```

### `TGender`

```typescript
type TGender = "female" | "male" | "neutral";
```

### `TSource`

```typescript
type TSource = "json" | "browser";
```