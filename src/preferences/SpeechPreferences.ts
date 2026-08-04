import type { GndRole } from "../gnd/types.js";
import type { ConfigurablePreferences } from "./Configurable.js";
import {
  extractionFormats,
  languageModes,
  pauseDurationRangeConfig,
  pauseScopes,
  pitchRangeConfig,
  rateRangeConfig,
  verbosityPresets,
  volumeRangeConfig,
} from "./constraints.js";
import { ensureBoolean, ensureEnumValue, ensureStringArray, ensureValueInRange } from "./guards.js";

export type VerbosityPreset = "none" | "few" | "some" | "most" | "custom";
export type LanguageMode = "none" | "block-level" | "always";

export type ExtractionFormat = "plain" | "ssml";

export type PauseScope = "utterance" | "block";

export interface ISpeechPreferences {
  // Extraction rendering — consumed by extractUtterances via the
  // Navigator's reextract(), or directly by a standalone
  // extractUtterances() caller.
  format?: ExtractionFormat | null; // default "plain"
  inlineContextualization?: boolean | null; // default false

  // Verbosity group — same consumers as above.
  verbosity?: VerbosityPreset | null; // default "few"
  skip?: GndRole[] | null; // only consulted when verbosity === "custom"
  contextualize?: GndRole[] | null; // only consulted when verbosity === "custom"
  language?: LanguageMode | null;

  // Prosody group — consumed by ReadiumSpeechNavigator's playback sequencing.
  pauseDuration?: number | null; // ms, default 300
  pauseScope?: PauseScope | null; // "utterance" (default, pause between every utterance) | "block" (pause only at block boundaries)
  rate?: number | null; // default 1.0, engine range [0.1, 10]
  pitch?: number | null; // default 1.0, engine range [0, 2]
  volume?: number | null; // default 1.0, engine range [0, 1]
}

export class SpeechPreferences implements ISpeechPreferences, ConfigurablePreferences<SpeechPreferences> {
  public format: ExtractionFormat | null | undefined;
  public inlineContextualization: boolean | null | undefined;
  public verbosity: VerbosityPreset | null | undefined;
  public skip: GndRole[] | null | undefined;
  public contextualize: GndRole[] | null | undefined;
  public language: LanguageMode | null | undefined;
  public pauseDuration: number | null | undefined;
  public pauseScope: PauseScope | null | undefined;
  public rate: number | null | undefined;
  public pitch: number | null | undefined;
  public volume: number | null | undefined;

  constructor(preferences: ISpeechPreferences = {}) {
    this.format = ensureEnumValue(preferences.format, extractionFormats);
    this.inlineContextualization = ensureBoolean(preferences.inlineContextualization);
    this.verbosity = ensureEnumValue(preferences.verbosity, verbosityPresets);
    this.skip = ensureStringArray(preferences.skip);
    this.contextualize = ensureStringArray(preferences.contextualize);
    this.language = ensureEnumValue(preferences.language, languageModes);
    this.pauseDuration = ensureValueInRange(preferences.pauseDuration, pauseDurationRangeConfig.range);
    this.pauseScope = ensureEnumValue(preferences.pauseScope, pauseScopes);
    this.rate = ensureValueInRange(preferences.rate, rateRangeConfig.range);
    this.pitch = ensureValueInRange(preferences.pitch, pitchRangeConfig.range);
    this.volume = ensureValueInRange(preferences.volume, volumeRangeConfig.range);
  }

  merging(other: SpeechPreferences): SpeechPreferences {
    const merged: ISpeechPreferences = { ...this };
    for (const key of Object.keys(other) as (keyof ISpeechPreferences)[]) {
      if (other[key] !== undefined) {
        (merged as Record<string, unknown>)[key] = other[key];
      }
    }
    return new SpeechPreferences(merged);
  }
}
