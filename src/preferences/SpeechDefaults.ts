import type { GndRole } from "../gnd/types.js";
import {
  autoPauseScopes,
  extractionFormats,
  languageModes,
  pauseDurationRangeConfig,
  pitchRangeConfig,
  rateRangeConfig,
  verbosityPresets,
  volumeRangeConfig,
} from "./constraints.js";
import { ensureBoolean, ensureEnumValue, ensureStringArray, ensureValueInRange } from "./guards.js";
import type { AutoPauseScope, ExtractionFormat, LanguageMode, VerbosityPreset } from "./SpeechPreferences.js";

// Guarded like ISpeechPreferences — an invalid value here falls back to the literal default below.
export interface ISpeechDefaults {
  format?: ExtractionFormat | null;
  inlineContextualization?: boolean | null;
  verbosity?: VerbosityPreset | null;
  skip?: GndRole[] | null;
  contextualize?: GndRole[] | null;
  language?: LanguageMode | null;
  pauseDuration?: number | null;
  autoPause?: AutoPauseScope | null;
  rate?: number | null;
  pitch?: number | null;
  volume?: number | null;
}

export class SpeechDefaults {
  public readonly format: ExtractionFormat;
  public readonly inlineContextualization: boolean;
  public readonly verbosity: VerbosityPreset;
  public readonly skip: GndRole[];
  public readonly contextualize: GndRole[];
  public readonly language: LanguageMode;
  public readonly pauseDuration: number;
  public readonly autoPause: AutoPauseScope;
  public readonly rate: number;
  public readonly pitch: number;
  public readonly volume: number;

  constructor(defaults: ISpeechDefaults = {}) {
    this.format = ensureEnumValue(defaults.format, extractionFormats) ?? "plain";
    this.inlineContextualization = ensureBoolean(defaults.inlineContextualization) ?? false;
    this.verbosity = ensureEnumValue(defaults.verbosity, verbosityPresets) ?? "few";
    this.skip = ensureStringArray(defaults.skip) ?? [];
    this.contextualize = ensureStringArray(defaults.contextualize) ?? [];
    this.language = ensureEnumValue(defaults.language, languageModes) ?? "block-level";
    this.pauseDuration = ensureValueInRange(defaults.pauseDuration, pauseDurationRangeConfig.range) ?? 300;
    this.autoPause = ensureEnumValue(defaults.autoPause, autoPauseScopes) ?? "none";
    this.rate = ensureValueInRange(defaults.rate, rateRangeConfig.range) ?? 1.0;
    this.pitch = ensureValueInRange(defaults.pitch, pitchRangeConfig.range) ?? 1.0;
    this.volume = ensureValueInRange(defaults.volume, volumeRangeConfig.range) ?? 1.0;
  }
}
