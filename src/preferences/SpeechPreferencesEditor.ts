import type { GndRole } from "@readium/guided-navigation";
import {
  autoPauseScopes,
  extractionFormats,
  languageModes,
  pauseDurationRangeConfig,
  pitchRangeConfig,
  rateRangeConfig,
  segmentationModes,
  verbosityPresets,
  volumeRangeConfig,
} from "./constraints.js";
import type { IPreferencesEditor } from "./PreferencesEditor.js";
import { BooleanPreference, EnumPreference, Preference, RangePreference, StringArrayPreference } from "./Preference.js";
import { SpeechPreferences, VerbosityPreset, AutoPauseScope, VoicePreference } from "./SpeechPreferences.js";
import { SpeechSettings } from "./SpeechSettings.js";
import type { ExtractionFormat, Interruption, LanguageMode, Segmentation } from "../utterances/types.js";

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
      interruptions: null,
      verbosity: null,
      skip: null,
      contextualize: null,
      language: null,
      languageOverrides: null,
      segmentation: null,
      reconstruct: null,
      voice: null,
      pauseDuration: null,
      autoPause: null,
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

  get interruptions(): Preference<Partial<Record<GndRole, Interruption>>> {
    return new Preference<Partial<Record<GndRole, Interruption>>>({
      initialValue: this.preferences.interruptions,
      effectiveValue: this.settings.interruptions,
      isEffective: this.preferences.interruptions != null,
      onChange: (value) => this.updatePreference("interruptions", value ?? null),
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

  get languageOverrides(): Preference<Record<string, string>> {
    return new Preference<Record<string, string>>({
      initialValue: this.preferences.languageOverrides,
      effectiveValue: this.settings.languageOverrides,
      isEffective: this.preferences.languageOverrides != null,
      onChange: (value) => this.updatePreference("languageOverrides", value ?? null),
    });
  }

  get segmentation(): EnumPreference<Segmentation> {
    return new EnumPreference<Segmentation>({
      initialValue: this.preferences.segmentation,
      effectiveValue: this.settings.segmentation,
      isEffective: this.preferences.segmentation != null,
      onChange: (value) => this.updatePreference("segmentation", value ?? null),
      supportedValues: segmentationModes,
    });
  }

  get reconstruct(): BooleanPreference {
    return new BooleanPreference({
      initialValue: this.preferences.reconstruct,
      effectiveValue: this.settings.reconstruct,
      isEffective: this.settings.segmentation === "sentence" && this.preferences.reconstruct != null,
      onChange: (value) => this.updatePreference("reconstruct", value ?? null),
    });
  }

  get voice(): Preference<VoicePreference> {
    return new Preference<VoicePreference>({
      initialValue: this.preferences.voice,
      effectiveValue: this.settings.voice,
      isEffective: this.preferences.voice != null,
      onChange: (value) => this.updatePreference("voice", value ?? null),
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

  get autoPause(): EnumPreference<AutoPauseScope> {
    return new EnumPreference<AutoPauseScope>({
      initialValue: this.preferences.autoPause,
      effectiveValue: this.settings.autoPause,
      isEffective: this.preferences.autoPause != null,
      onChange: (value) => this.updatePreference("autoPause", value ?? null),
      supportedValues: autoPauseScopes,
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
