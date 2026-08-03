import type { GndRole } from "../gnd/types.js";
import type { ExtractionFormat, LanguageMode, PauseScope, VerbosityPreset } from "./SpeechPreferences.js";

export class SpeechDefaults {
  public readonly format: ExtractionFormat = "plain";
  public readonly inlineContextualization: boolean = false;
  public readonly verbosity: VerbosityPreset = "few";
  public readonly skip: GndRole[] = [];
  public readonly contextualize: GndRole[] = [];
  public readonly language: LanguageMode = "always";
  public readonly pauseDuration: number = 300;
  public readonly pauseScope: PauseScope = "utterance";
  public readonly automaticPausesAtPageOrSpreadEnd: boolean = false;
}
