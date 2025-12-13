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
    source: TSource;
    label: string;
    name: string;
    voiceURI?: string;
    language: string;
    localizedName?: TLocalizedName;
    altNames?: string[];
    altLanguage?: string;
    otherLanguages?: string[];
    multiLingual?: boolean;
    gender?: TGender;
    children?: boolean;
    quality?: TQuality[];
    pitchControl?: boolean;
    pitch?: number;
    rate?: number;
    browser?: string[];
    os?: string[];
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
