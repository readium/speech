// Auto-generated file - DO NOT EDIT
export type TGender = "female" | "male" | "nonbinary";
export type TQuality = "veryLow" | "low" | "normal" | "high" | "veryHigh";

export interface IVoice {
  // Core identification
  label: string;          // User-friendly display name
  name: string;           // System/technical name (matches Web Speech API voiceURI)
  voiceURI?: string;      // For Web Speech API compatibility
  
  // Localization
  language: string;       // BCP 47 language tag (e.g., "en-US")
  localizedName?: string;  // Name in the voice's language (optional in some cases)
  altNames?: string[];     // Alternative names or aliases
  otherLanguages?: string[]; // Other language codes this voice can speak (e.g., ["es", "fr"])
  altLanguage?: string;      // Alternative language code this voice can speak
  multiLingual?: boolean;    // Whether the voice is multilingual
  
  // Voice characteristics
  gender?: TGender;       // Voice gender
  age?: string;           // Voice age group (e.g., "child", "adult", "senior")
  children?: boolean;     // Whether the voice is designed for children
  
  // Quality and capabilities
  quality?: TQuality[];    // Quality ratings across different systems (optional in some cases)
  pitchControl?: boolean;  // Whether pitch can be controlled (optional in some cases)
  
  // Performance settings
  pitch?: number;             // Current pitch (0-2, where 1 is normal)
  recommendedPitch?: number;  // Default pitch (0-2, where 1 is normal)
  rate?: number;              // Speech rate (0.1-10, where 1 is normal)
  recommendedRate?: number;   // Default rate (0.1-10, where 1 is normal)
  
  // Platform and compatibility
  browser?: string[];      // Browsers that support this voice (e.g., ["Chrome", "Edge"])
  offlineAvailability?: boolean; // If the voice works offline (optional in some cases)
  provider?: string;       // Voice provider (e.g., "Microsoft", "Google", "Amazon")
  isDefault?: boolean;     // If this is a default voice for its language
  isDeprecated?: boolean;  // If this voice is deprecated
  isNovelty?: boolean;     // If this is a novelty voice
  isLowQuality?: boolean;  // If this is a low-quality voice
  nativeID?: string | string[];    // Platform-specific voice ID(s)
  os?: string[];          // Supported operating systems
  preloaded?: boolean;    // If the voice is preloaded on the system
  note?: string;          // Additional notes about the voice
  
  // Additional fields from the data
  [key: string]: any;     // Allow for additional properties that might be present in the data
}