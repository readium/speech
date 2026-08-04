import type { AutoPauseScope, ExtractionFormat, ISpeechPreferences, LanguageMode, VerbosityPreset } from "./SpeechPreferences.js";

export interface RangeConfig {
  range: [number, number];
  step: number;
}

export const pauseDurationRangeConfig: RangeConfig = { range: [0, 5000], step: 100 };
export const rateRangeConfig: RangeConfig = { range: [0.1, 10], step: 0.1 };
export const pitchRangeConfig: RangeConfig = { range: [0, 2], step: 0.1 };
export const volumeRangeConfig: RangeConfig = { range: [0, 1], step: 0.05 };

export const verbosityPresets: VerbosityPreset[] = ["none", "few", "some", "most", "custom"];
export const languageModes: LanguageMode[] = ["none", "block-level", "always"];
export const extractionFormats: ExtractionFormat[] = ["plain", "ssml"];
export const autoPauseScopes: AutoPauseScope[] = ["none", "utterance", "block"];

// Fields that only affect the extracted content queue, resolved via
// ReadiumSpeechNavigator's reextract() — as opposed to the prosody group,
// which applies regardless of how content was loaded.
export const extractionPreferenceKeys: (keyof ISpeechPreferences)[] = [
  "format",
  "inlineContextualization",
  "verbosity",
  "skip",
  "contextualize",
  "language",
];
