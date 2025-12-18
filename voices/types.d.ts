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
export type TSource = "json" | "browser";
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
export interface VoiceFilterData {
    voices: Array<{
        name: string;
        altNames?: string[];
        [key: string]: any;
    }>;
}
export interface ReadiumSpeechVoice {
    source: TSource;
    label: string;
    name: string;
    originalName: string;
    voiceURI?: string;
    language: string;
    localizedName?: TLocalizedName;
    altNames?: string[];
    altLanguage?: string;
    otherLanguages?: string[];
    multiLingual?: boolean;
    gender?: TGender;
    children?: boolean;
    quality?: TQuality;
    pitchControl?: boolean;
    pitch?: number;
    rate?: number;
    browser?: TBrowser[];
    os?: TOperatingSystem[];
    preloaded?: boolean;
    nativeID?: string | string[];
    note?: string;
    provider?: string;
    [key: string]: any;
}
export interface VoiceData {
    language: string;
    defaultRegion: string;
    testUtterance: string;
    voices: ReadiumSpeechVoice[];
}
