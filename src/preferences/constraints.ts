import type { ExtractionFormat, LanguageMode, Segmentation } from "../utterances/types.js";
import type { AutoPauseScope, ISpeechPreferences, VerbosityPreset } from "./SpeechPreferences.js";

export interface RangeConfig {
  readonly range: readonly [number, number];
  readonly step: number;
}

// Frozen because Preference/SpeechPreferences validate against these exact objects.
const rangeConfig = (min: number, max: number, step: number): RangeConfig =>
  Object.freeze({ range: Object.freeze([min, max] as const), step });

export const pauseDurationRangeConfig = rangeConfig(0, 5000, 100);
export const rateRangeConfig = rangeConfig(0.1, 10, 0.1);
export const pitchRangeConfig = rangeConfig(0, 2, 0.1);
export const volumeRangeConfig = rangeConfig(0, 1, 0.05);

export const verbosityPresets: readonly VerbosityPreset[] = Object.freeze(["none", "few", "some", "most", "custom"]);
export const languageModes: readonly LanguageMode[] = Object.freeze(["none", "block-level", "always"]);
export const extractionFormats: readonly ExtractionFormat[] = Object.freeze(["plain", "ssml"]);
export const autoPauseScopes: readonly AutoPauseScope[] = Object.freeze(["none", "utterance", "block"]);
export const segmentationModes: readonly Segmentation[] = Object.freeze(["structure", "sentence"]);

// Fields that only affect the extracted content queue, resolved via
// ReadiumSpeechNavigator's reextract() — as opposed to the prosody group,
// which applies regardless of how content was loaded.
export const extractionPreferenceKeys: readonly (keyof ISpeechPreferences)[] = Object.freeze([
  "format",
  "inlineContextualization",
  "verbosity",
  "skip",
  "contextualize",
  "language",
  "segmentation",
]);
