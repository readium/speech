# Voice Management

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

Calling `initialize()` again on an already-initialized singleton doesn't create a new instance or reset it — it broadens the existing one to also cover any newly requested `languages`, keeping voices already loaded for earlier languages. Omitting `languages` on that later call is a no-op (not a retroactive "load everything"); only the very first call's absence of `languages` loads every voice.

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
voiceManager.getLanguages(localization?: string, filterOptions?: VoiceFilterOptions, voices?: ReadiumSpeechVoice[]): LanguageInfo[]

voiceManager.getRegions(localization?: string, filterOptions?: VoiceFilterOptions, voices?: ReadiumSpeechVoice[]): LanguageInfo[]
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

### Get Test Utterance

```typescript
voiceManager.getTestUtterance(language: string): string
```

Retrieves a sample text string suitable for testing text-to-speech functionality in the specified language. If no sample text is available for the specified language, it returns an empty string.

## Interfaces & Types

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
