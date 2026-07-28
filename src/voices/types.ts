/**
 * Voice gender as defined in the schema
 */
export type TGender = "neutral" | "female" | "male";

/**
 * Voice quality levels as defined in the schema
 */
export type TQuality = null | "veryLow" | "low" | "normal" | "high" | "veryHigh";

/**
 * Localization type for voice names
 */
export type TLocalizedName = "android" | "apple";

/**
 * Source of the voice data
 */
export type TSource = "json" | "browser" | "server";

/**
 * Controls a speech-server voice reports as enabled, e.g. {ssml: true}.
 * A control absent from this object is not supported by that voice.
 */
export interface TServerVoiceControls {
  pitch?: boolean;
  speed?: boolean;
  ssml?: boolean;
  boundary?: boolean;
}

/**
 * Supported operating systems for voices
 */
export type TOperatingSystem = "Android" | "ChromeOS" | "iOS" | "iPadOS" | "macOS" | "Windows";

/**
 * Supported browsers for voices
 */
export type TBrowser = "ChromeDesktop" | "Edge" | "Firefox" | "Safari";

/**
 * Represents a voice from the JSON data file
 */
export interface ReadiumSpeechJSONVoice {
  label?: string;
  name: string;
  localizedName?: "android" | "apple";
  note?: string;
  altNames?: string[];
  nativeID?: string[];
  language?: string;
  altLanguage?: string;
  otherLanguages?: string[];
  multiLingual?: boolean;
  gender?: TGender;
  children?: boolean;
  quality?: TQuality[];
  rate?: number;  
  pitch?: number;
  pitchControl?: boolean;
  os?: TOperatingSystem[];
  browser?: TBrowser[];
  preloaded?: boolean;
}

export interface ReadiumSpeechVoice {
  source: TSource;       // Source of the voice data

  // Core identification (required)
  label: string;          // Human-friendly label for the voice
  name: string;           // JSON Name (or Web Speech API name if not found)
  originalName: string;   // Web Speech API name
  voiceURI?: string;      // For Web Speech API compatibility
  
  // Localization
  language: string;       // BCP-47 language tag
  localizedName?: TLocalizedName; // Localization pattern (android/apple)
  altNames?: string[];     // Alternative names (mostly for Apple voices)
  altLanguage?: string;    // Alternative BCP-47 language tag
  otherLanguages?: string[]; // Other languages this voice can speak
  multiLingual?: boolean;  // If voice can handle multiple languages
  
  // Voice characteristics
  gender?: TGender;       // Voice gender
  children?: boolean;     // If this is a children's voice
  
  // Quality and capabilities
  quality?: TQuality;      // Voice quality level
  pitchControl?: boolean;  // Whether pitch can be controlled
  
  // Performance settings
  pitch?: number;         // Current pitch (0-2, where 1 is normal)
  rate?: number;          // Speech rate (0.1-10, where 1 is normal)
  
  // Platform and compatibility
  browser?: TBrowser[];      // Supported browsers
  os?: TOperatingSystem[];          // Supported operating systems
  preloaded?: boolean;    // If the voice is preloaded on the system
  nativeID?: string | string[]; // Platform-specific voice ID(s)
  
  // Additional metadata
  note?: string;          // Additional notes about the voice
  provider?: string;      // Voice provider (e.g., "Microsoft", "Google", or a speech-server provider id)
  identifier?: string;    // Opaque id to send back to a server provider (e.g. a speech-server voice URN)
  controls?: TServerVoiceControls; // Which playback controls a server-sourced voice actually honors

  // Runtime-derived flags
  isDefault?: boolean;    // Whether this is the platform's default voice
  offlineAvailability?: boolean; // Whether the voice works without a network connection
  isNovelty?: boolean;    // Whether this is a novelty/joke voice
  isLowQuality?: boolean; // Whether this voice was inferred to be very low quality
}

export interface VoiceData {
  language: string;        // BCP-47 language tag
  defaultRegion: string;   // Default region for this language
  testUtterance: string;   // Sample text for testing the voice
  voices: ReadiumSpeechJSONVoice[]; // Array of available voices, as loaded from JSON
}