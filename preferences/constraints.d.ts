import { AutoPauseScope, ExtractionFormat, ISpeechPreferences, LanguageMode, VerbosityPreset } from './SpeechPreferences.js';
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
export declare const autoPauseScopes: AutoPauseScope[];
export declare const extractionPreferenceKeys: (keyof ISpeechPreferences)[];
