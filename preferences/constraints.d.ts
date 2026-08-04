import { ExtractionFormat, ISpeechPreferences, LanguageMode, PauseScope, VerbosityPreset } from './SpeechPreferences.js';
export interface RangeConfig {
    range: [number, number];
    step: number;
}
export declare const pauseDurationRangeConfig: RangeConfig;
export declare const rateRangeConfig: RangeConfig;
export declare const pitchRangeConfig: RangeConfig;
export declare const volumeRangeConfig: RangeConfig;
export declare const verbosityPresets: VerbosityPreset[];
export declare const languageModes: LanguageMode[];
export declare const extractionFormats: ExtractionFormat[];
export declare const pauseScopes: PauseScope[];
export declare const extractionPreferenceKeys: (keyof ISpeechPreferences)[];
