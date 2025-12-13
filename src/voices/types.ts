// Auto-generated file - DO NOT EDIT

/**
 * Voice gender as defined in the schema
 */
export type TGender = "neutral" | "female" | "male";

/**
 * Voice quality levels as defined in the schema
 */
export type TQuality = "veryLow" | "low" | "normal" | "high" | "veryHigh";

/**
 * Localization type for voice names
 */
export type TLocalizedName = "android" | "apple";

/**
 * Source of the voice data
 */
export type TSource = "json" | "browser";

export interface VoiceFilterData {
  voices: Array<{
    name: string;
    altNames?: string[];
    [key: string]: any;
  }>;
}

export interface ReadiumSpeechVoice {
  source: TSource;       // Source of the voice data

  // Core identification (required)
  label: string;          // Human-friendly label for the voice
  name: string;           // System/technical name (matches Web Speech API voiceURI)
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
  quality?: TQuality[];    // Available quality levels for this voice
  pitchControl?: boolean;  // Whether pitch can be controlled
  
  // Performance settings
  pitch?: number;         // Current pitch (0-2, where 1 is normal)
  rate?: number;          // Speech rate (0.1-10, where 1 is normal)
  
  // Platform and compatibility
  browser?: string[];      // Supported browsers
  os?: string[];          // Supported operating systems
  preloaded?: boolean;    // If the voice is preloaded on the system
  nativeID?: string | string[]; // Platform-specific voice ID(s)
  
  // Additional metadata
  note?: string;          // Additional notes about the voice
  provider?: string;      // Voice provider (e.g., "Microsoft", "Google")
  
  // Allow any additional properties that might be in the JSON
  [key: string]: any;
}

export interface VoiceData {
  language: string;        // BCP-47 language tag
  defaultRegion: string;   // Default region for this language
  testUtterance: string;   // Sample text for testing the voice
  voices: ReadiumSpeechVoice[]; // Array of available voices
}