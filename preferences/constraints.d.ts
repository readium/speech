import { ExtractionFormat, LanguageMode, Segmentation } from '../utterances/types.js';
import { AutoPauseScope, ISpeechPreferences, VerbosityPreset } from './SpeechPreferences.js';
export interface RangeConfig {
    readonly range: readonly [number, number];
    readonly step: number;
}
export declare const pauseDurationRangeConfig: RangeConfig;
export declare const rateRangeConfig: RangeConfig;
export declare const pitchRangeConfig: RangeConfig;
export declare const volumeRangeConfig: RangeConfig;
export declare const verbosityPresets: readonly VerbosityPreset[];
export declare const languageModes: readonly LanguageMode[];
export declare const extractionFormats: readonly ExtractionFormat[];
export declare const autoPauseScopes: readonly AutoPauseScope[];
export declare const segmentationModes: readonly Segmentation[];
export declare const extractionPreferenceKeys: readonly (keyof ISpeechPreferences)[];
