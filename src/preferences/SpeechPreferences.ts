import type { GndRole } from "../gnd/types.js";
import type { ConfigurablePreferences } from "./Configurable.js";

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
  automaticPausesAtPageOrSpreadEnd?: boolean | null; // typed, no-op today — see speechNavigator.ts
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
  public automaticPausesAtPageOrSpreadEnd: boolean | null | undefined;
  public rate: number | null | undefined;
  public pitch: number | null | undefined;
  public volume: number | null | undefined;

  constructor(preferences: ISpeechPreferences = {}) {
    this.format = preferences.format;
    this.inlineContextualization = preferences.inlineContextualization;
    this.verbosity = preferences.verbosity;
    this.skip = preferences.skip;
    this.contextualize = preferences.contextualize;
    this.language = preferences.language;
    this.pauseDuration = preferences.pauseDuration;
    this.pauseScope = preferences.pauseScope;
    this.automaticPausesAtPageOrSpreadEnd = preferences.automaticPausesAtPageOrSpreadEnd;
    this.rate = preferences.rate;
    this.pitch = preferences.pitch;
    this.volume = preferences.volume;
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
