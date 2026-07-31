import type { GndRole } from "../gnd/types.js";
import type { ConfigurablePreferences } from "./Configurable.js";

export type VerbosityPreset = "none" | "few" | "some" | "most" | "custom";
export type LanguageMode = "none" | "block-level" | "always";

export type ExtractionFormat = "plain" | "ssml";

export interface ISpeechPreferences {
  // Extraction rendering — consumed by extractUtterances via the
  // Navigator's reextract(), or directly by a standalone
  // extractUtterances() caller.
  format?: ExtractionFormat | null; // default "plain"
  interruptSentence?: boolean | null; // default false

  // Verbosity group — same consumers as above.
  verbosity?: VerbosityPreset | null; // default "few"
  skip?: GndRole[] | null; // only consulted when verbosity === "custom"
  contextualize?: GndRole[] | null; // only consulted when verbosity === "custom"
  language?: LanguageMode | null;

  // Prosody group — consumed by ReadiumSpeechNavigator's playback sequencing.
  pauseDuration?: number | null; // ms between utterances
  automaticPausesBetweenUtterances?: boolean | null; // actionable
  automaticPausesAtPageOrSpreadEnd?: boolean | null; // typed, no-op today — see speechNavigator.ts
}

export class SpeechPreferences implements ISpeechPreferences, ConfigurablePreferences<SpeechPreferences> {
  public format: ExtractionFormat | null | undefined;
  public interruptSentence: boolean | null | undefined;
  public verbosity: VerbosityPreset | null | undefined;
  public skip: GndRole[] | null | undefined;
  public contextualize: GndRole[] | null | undefined;
  public language: LanguageMode | null | undefined;
  public pauseDuration: number | null | undefined;
  public automaticPausesBetweenUtterances: boolean | null | undefined;
  public automaticPausesAtPageOrSpreadEnd: boolean | null | undefined;

  constructor(preferences: ISpeechPreferences = {}) {
    this.format = preferences.format;
    this.interruptSentence = preferences.interruptSentence;
    this.verbosity = preferences.verbosity;
    this.skip = preferences.skip;
    this.contextualize = preferences.contextualize;
    this.language = preferences.language;
    this.pauseDuration = preferences.pauseDuration;
    this.automaticPausesBetweenUtterances = preferences.automaticPausesBetweenUtterances;
    this.automaticPausesAtPageOrSpreadEnd = preferences.automaticPausesAtPageOrSpreadEnd;
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
