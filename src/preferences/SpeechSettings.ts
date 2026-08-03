import type { GndRole } from "../gnd/types.js";
import type { ConfigurableSettings } from "./Configurable.js";
import { SpeechDefaults } from "./SpeechDefaults.js";
import type { ExtractionFormat, LanguageMode, PauseScope, SpeechPreferences, VerbosityPreset } from "./SpeechPreferences.js";
import { contextualizedAtVerbosity, skippableAtVerbosity } from "./verbosityTables.js";

export class SpeechSettings implements ConfigurableSettings {
  [key: string]: unknown;

  public readonly format: ExtractionFormat;
  public readonly inlineContextualization: boolean;
  public readonly verbosity: VerbosityPreset;
  public readonly skip: GndRole[];
  public readonly contextualize: GndRole[];
  public readonly language: LanguageMode;
  public readonly pauseDuration: number;
  public readonly pauseScope: PauseScope;
  public readonly automaticPausesAtPageOrSpreadEnd: boolean;

  constructor(preferences: SpeechPreferences, defaults: SpeechDefaults) {
    this.format = preferences.format ?? defaults.format;
    this.inlineContextualization = preferences.inlineContextualization ?? defaults.inlineContextualization;
    this.verbosity = preferences.verbosity ?? defaults.verbosity;

    // `skip`/`contextualize` only apply under "custom" — every other preset
    // uses its own fixed table, ignoring whatever `skip`/`contextualize`
    // were set to.
    if (this.verbosity === "custom") {
      this.skip = preferences.skip ?? defaults.skip;
      this.contextualize = preferences.contextualize ?? defaults.contextualize;
    } else {
      this.skip = [...skippableAtVerbosity[this.verbosity]];
      this.contextualize = [...contextualizedAtVerbosity[this.verbosity]];
    }
    this.language = preferences.language ?? defaults.language;
    this.pauseDuration = preferences.pauseDuration ?? defaults.pauseDuration;
    this.pauseScope = preferences.pauseScope ?? defaults.pauseScope;
    this.automaticPausesAtPageOrSpreadEnd = preferences.automaticPausesAtPageOrSpreadEnd ?? defaults.automaticPausesAtPageOrSpreadEnd;
  }
}
