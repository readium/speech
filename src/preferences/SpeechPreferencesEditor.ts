import type { GndRole } from "../gnd/types.js";
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
import type { IPreferencesEditor } from "./PreferencesEditor.js";
import { BooleanPreference, EnumPreference, RangePreference, StringArrayPreference } from "./Preference.js";
import { SpeechPreferences, VerbosityPreset, LanguageMode, ExtractionFormat, PauseScope } from "./SpeechPreferences.js";
import { SpeechSettings } from "./SpeechSettings.js";

export class SpeechPreferencesEditor implements IPreferencesEditor {
  preferences: SpeechPreferences;
  private settings: SpeechSettings;

  // Cloned rather than aliased: edits made through this editor's setters
  // are staged on this copy and only reach the navigator's own preferences
  // once explicitly passed to submitPreferences() — discarding the editor
  // without submitting must leave the navigator untouched.
  constructor(initialPreferences: SpeechPreferences, settings: SpeechSettings) {
    this.preferences = new SpeechPreferences({ ...initialPreferences });
    this.settings = settings;
  }

  // Explicit `null`s, not `undefined` — merging() skips `undefined` fields,
  // so only `null` actually clears them once submitted.
  clear(): void {
    this.preferences = new SpeechPreferences({
      format: null,
      inlineContextualization: null,
      verbosity: null,
      skip: null,
      contextualize: null,
      language: null,
      pauseDuration: null,
      pauseScope: null,
      automaticPausesAtPageOrSpreadEnd: null,
      rate: null,
      pitch: null,
      volume: null,
    });
  }

  private updatePreference<K extends keyof SpeechPreferences>(key: K, value: SpeechPreferences[K]) {
    this.preferences[key] = value;
  }

  get format(): EnumPreference<ExtractionFormat> {
    return new EnumPreference<ExtractionFormat>({
      initialValue: this.preferences.format,
      effectiveValue: this.settings.format,
      isEffective: this.preferences.format != null,
      onChange: (value) => this.updatePreference("format", value ?? null),
      supportedValues: extractionFormats,
    });
  }

  get inlineContextualization(): BooleanPreference {
    return new BooleanPreference({
      initialValue: this.preferences.inlineContextualization,
      effectiveValue: this.settings.inlineContextualization,
      isEffective: this.preferences.inlineContextualization != null,
      onChange: (value) => this.updatePreference("inlineContextualization", value ?? null),
    });
  }

  get verbosity(): EnumPreference<VerbosityPreset> {
    return new EnumPreference<VerbosityPreset>({
      initialValue: this.preferences.verbosity,
      effectiveValue: this.settings.verbosity,
      isEffective: this.preferences.verbosity != null,
      onChange: (value) => this.updatePreference("verbosity", value ?? null),
      supportedValues: verbosityPresets,
    });
  }

  get skip(): StringArrayPreference {
    return new StringArrayPreference({
      initialValue: this.preferences.skip,
      effectiveValue: this.settings.skip,
      isEffective: this.preferences.skip != null,
      onChange: (value) => this.updatePreference("skip", (value ?? null) as GndRole[] | null),
    });
  }

  get contextualize(): StringArrayPreference {
    return new StringArrayPreference({
      initialValue: this.preferences.contextualize,
      effectiveValue: this.settings.contextualize,
      isEffective: this.preferences.contextualize != null,
      onChange: (value) => this.updatePreference("contextualize", (value ?? null) as GndRole[] | null),
    });
  }

  get language(): EnumPreference<LanguageMode> {
    return new EnumPreference<LanguageMode>({
      initialValue: this.preferences.language,
      effectiveValue: this.settings.language,
      isEffective: this.preferences.language != null,
      onChange: (value) => this.updatePreference("language", value ?? null),
      supportedValues: languageModes,
    });
  }

  get pauseDuration(): RangePreference<number> {
    return new RangePreference<number>({
      initialValue: this.preferences.pauseDuration,
      effectiveValue: this.settings.pauseDuration,
      isEffective: this.preferences.pauseDuration != null,
      onChange: (value) => this.updatePreference("pauseDuration", value ?? null),
      supportedRange: pauseDurationRangeConfig.range,
      step: pauseDurationRangeConfig.step,
    });
  }

  get pauseScope(): EnumPreference<PauseScope> {
    return new EnumPreference<PauseScope>({
      initialValue: this.preferences.pauseScope,
      effectiveValue: this.settings.pauseScope,
      isEffective: this.preferences.pauseScope != null,
      onChange: (value) => this.updatePreference("pauseScope", value ?? null),
      supportedValues: pauseScopes,
    });
  }

  // No page/spread boundary signal exists in this library yet, so this
  // has no effect on playback.
  get automaticPausesAtPageOrSpreadEnd(): BooleanPreference {
    return new BooleanPreference({
      initialValue: this.preferences.automaticPausesAtPageOrSpreadEnd,
      effectiveValue: this.settings.automaticPausesAtPageOrSpreadEnd,
      isEffective: this.preferences.automaticPausesAtPageOrSpreadEnd != null,
      onChange: (value) => this.updatePreference("automaticPausesAtPageOrSpreadEnd", value ?? null),
    });
  }

  get rate(): RangePreference<number> {
    return new RangePreference<number>({
      initialValue: this.preferences.rate,
      effectiveValue: this.settings.rate,
      isEffective: this.preferences.rate != null,
      onChange: (value) => this.updatePreference("rate", value ?? null),
      supportedRange: rateRangeConfig.range,
      step: rateRangeConfig.step,
    });
  }

  get pitch(): RangePreference<number> {
    return new RangePreference<number>({
      initialValue: this.preferences.pitch,
      effectiveValue: this.settings.pitch,
      isEffective: this.preferences.pitch != null,
      onChange: (value) => this.updatePreference("pitch", value ?? null),
      supportedRange: pitchRangeConfig.range,
      step: pitchRangeConfig.step,
    });
  }

  get volume(): RangePreference<number> {
    return new RangePreference<number>({
      initialValue: this.preferences.volume,
      effectiveValue: this.settings.volume,
      isEffective: this.preferences.volume != null,
      onChange: (value) => this.updatePreference("volume", value ?? null),
      supportedRange: volumeRangeConfig.range,
      step: volumeRangeConfig.step,
    });
  }
}
