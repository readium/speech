import type { GndRole } from "@readium/guided-navigation";
import type { ExtractionFormat, Interruption, LanguageMode, Segmentation } from "../utterances/types.js";
import type { ConfigurablePreferences } from "./Configurable.js";
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

export type VerbosityPreset = "none" | "few" | "some" | "most" | "custom";

export type AutoPauseScope = "none" | "utterance" | "block";

// A voice id (a voice's `voiceURI`, or `identifier` for a server voice) for all content, or one per language.
export type VoicePreference = string | Record<string, string>;

export interface ISpeechPreferences {
  // Extraction rendering — consumed by extractUtterances via the
  // Navigator's reextract(), or directly by a standalone
  // extractUtterances() caller.
  format?: ExtractionFormat | null; // default "plain"
  interruptions?: Partial<Record<GndRole, Interruption>> | null; // default {} (each "after"), see interruptionRoles, applies under every verbosity

  // Verbosity group — same consumers as above.
  verbosity?: VerbosityPreset | null; // default "few"
  skip?: GndRole[] | null; // only consulted when verbosity === "custom"
  contextualize?: GndRole[] | null; // only consulted when verbosity === "custom"
  language?: LanguageMode | null;
  languageOverrides?: Record<string, string> | null; // default {}, declared language -> spoken language
  segmentation?: Segmentation | null; // default "structure"

  // Voice of every utterance without its own `voice`, by its language when a record — applied by ReadiumSpeechNavigator.
  voice?: VoicePreference | null;

  // Prosody group — consumed by ReadiumSpeechNavigator's playback sequencing.
  pauseDuration?: number | null; // ms, default 300, delays every automatic continuation to the next utterance
  autoPause?: AutoPauseScope | null; // "none" (default) | "utterance" | "block" — fully pauses playback instead of continuing automatically, until play() is called
  rate?: number | null; // default 1.0, engine range [0.1, 10]
  pitch?: number | null; // default 1.0, engine range [0, 2]
  volume?: number | null; // default 1.0, engine range [0, 1]
}

export class SpeechPreferences implements ISpeechPreferences, ConfigurablePreferences<SpeechPreferences> {
  public format: ExtractionFormat | null | undefined;
  public interruptions: Partial<Record<GndRole, Interruption>> | null | undefined;
  public verbosity: VerbosityPreset | null | undefined;
  public skip: GndRole[] | null | undefined;
  public contextualize: GndRole[] | null | undefined;
  public language: LanguageMode | null | undefined;
  public languageOverrides: Record<string, string> | null | undefined;
  public segmentation: Segmentation | null | undefined;
  public voice: VoicePreference | null | undefined;
  public pauseDuration: number | null | undefined;
  public autoPause: AutoPauseScope | null | undefined;
  public rate: number | null | undefined;
  public pitch: number | null | undefined;
  public volume: number | null | undefined;

  constructor(preferences: ISpeechPreferences = {}) {
    this.format = ensureEnumValue(preferences.format, extractionFormats);
    this.interruptions = ensureEnumRecord(preferences.interruptions, interruptionValues);
    this.verbosity = ensureEnumValue(preferences.verbosity, verbosityPresets);
    this.skip = ensureStringArray(preferences.skip);
    this.contextualize = ensureStringArray(preferences.contextualize);
    this.language = ensureEnumValue(preferences.language, languageModes);
    this.languageOverrides = ensureStringRecord(preferences.languageOverrides);
    this.segmentation = ensureEnumValue(preferences.segmentation, segmentationModes);
    this.voice = ensureStringOrStringRecord(preferences.voice);
    this.pauseDuration = ensureValueInRange(preferences.pauseDuration, pauseDurationRangeConfig.range);
    this.autoPause = ensureEnumValue(preferences.autoPause, autoPauseScopes);
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
