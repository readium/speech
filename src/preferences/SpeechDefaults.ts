import type { GndRole } from "@readium/guided-navigation";
import {
  autoPauseScopes,
  extractionFormats,
  interruptionValues,
  languageModes,
  pauseDurationRangeConfig,
  pitchRangeConfig,
  rateRangeConfig,
  segmentationModes,
  verbosityPresets,
  volumeRangeConfig,
} from "./constraints.js";
import { ensureEnumRecord, ensureEnumValue, ensureStringArray, ensureStringOrStringRecord, ensureStringRecord, ensureValueInRange } from "./guards.js";
import type { AutoPauseScope, VerbosityPreset, VoicePreference } from "./SpeechPreferences.js";
import type { ExtractionFormat, Interruption, LanguageMode, Segmentation } from "../utterances/types.js";

// Guarded like ISpeechPreferences — an invalid value here falls back to the literal default below.
export interface ISpeechDefaults {
  format?: ExtractionFormat | null;
  interruptions?: Partial<Record<GndRole, Interruption>> | null;
  verbosity?: VerbosityPreset | null;
  skip?: GndRole[] | null;
  contextualize?: GndRole[] | null;
  language?: LanguageMode | null;
  languageOverrides?: Record<string, string> | null;
  segmentation?: Segmentation | null;
  voice?: VoicePreference | null;
  pauseDuration?: number | null;
  autoPause?: AutoPauseScope | null;
  rate?: number | null;
  pitch?: number | null;
  volume?: number | null;
}

export class SpeechDefaults {
  public readonly format: ExtractionFormat;
  public readonly interruptions: Partial<Record<GndRole, Interruption>>;
  public readonly verbosity: VerbosityPreset;
  public readonly skip: GndRole[];
  public readonly contextualize: GndRole[];
  public readonly language: LanguageMode;
  public readonly languageOverrides: Record<string, string>;
  public readonly segmentation: Segmentation;
  public readonly voice: VoicePreference | null;
  public readonly pauseDuration: number;
  public readonly autoPause: AutoPauseScope;
  public readonly rate: number;
  public readonly pitch: number;
  public readonly volume: number;

  constructor(defaults: ISpeechDefaults = {}) {
    this.format = ensureEnumValue(defaults.format, extractionFormats) ?? "plain";
    this.interruptions = ensureEnumRecord(defaults.interruptions, interruptionValues) ?? {};
    this.verbosity = ensureEnumValue(defaults.verbosity, verbosityPresets) ?? "few";
    this.skip = ensureStringArray(defaults.skip) ?? [];
    this.contextualize = ensureStringArray(defaults.contextualize) ?? [];
    this.language = ensureEnumValue(defaults.language, languageModes) ?? "block-level";
    this.languageOverrides = ensureStringRecord(defaults.languageOverrides) ?? {};
    this.segmentation = ensureEnumValue(defaults.segmentation, segmentationModes) ?? "structure";
    this.voice = ensureStringOrStringRecord(defaults.voice) ?? null;
    this.pauseDuration = ensureValueInRange(defaults.pauseDuration, pauseDurationRangeConfig.range) ?? 300;
    this.autoPause = ensureEnumValue(defaults.autoPause, autoPauseScopes) ?? "none";
    this.rate = ensureValueInRange(defaults.rate, rateRangeConfig.range) ?? 1.0;
    this.pitch = ensureValueInRange(defaults.pitch, pitchRangeConfig.range) ?? 1.0;
    this.volume = ensureValueInRange(defaults.volume, volumeRangeConfig.range) ?? 1.0;
  }
}
