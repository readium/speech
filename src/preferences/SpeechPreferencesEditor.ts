import type { GndRole } from "../gnd/types.js";
import type { IPreferencesEditor } from "./PreferencesEditor.js";
import { EnumPreference, Preference, RangePreference } from "./Preference.js";
import { SpeechPreferences, VerbosityPreset, LanguageMode, ExtractionFormat, PauseScope } from "./SpeechPreferences.js";
import { SpeechSettings } from "./SpeechSettings.js";

const verbosityPresets: VerbosityPreset[] = ["none", "few", "some", "most", "custom"];
const languageModes: LanguageMode[] = ["none", "block-level", "always"];
const extractionFormats: ExtractionFormat[] = ["plain", "ssml"];
const pauseScopes: PauseScope[] = ["utterance", "block"];
const pauseDurationRange: [number, number] = [0, 5000];
const pauseDurationStep = 100;
const rateRange: [number, number] = [0.1, 10];
const rateStep = 0.1;
const pitchRange: [number, number] = [0, 2];
const pitchStep = 0.1;
const volumeRange: [number, number] = [0, 1];
const volumeStep = 0.05;

export class SpeechPreferencesEditor implements IPreferencesEditor {
  preferences: SpeechPreferences;
  private settings: SpeechSettings;

  constructor(initialPreferences: SpeechPreferences, settings: SpeechSettings) {
    this.preferences = initialPreferences;
    this.settings = settings;
  }

  clear(): void {
    this.preferences = new SpeechPreferences();
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

  get inlineContextualization(): Preference<boolean> {
    return new Preference<boolean>({
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

  get skip(): Preference<GndRole[]> {
    return new Preference<GndRole[]>({
      initialValue: this.preferences.skip,
      effectiveValue: this.settings.skip,
      isEffective: this.preferences.skip != null,
      onChange: (value) => this.updatePreference("skip", value ?? null),
    });
  }

  get contextualize(): Preference<GndRole[]> {
    return new Preference<GndRole[]>({
      initialValue: this.preferences.contextualize,
      effectiveValue: this.settings.contextualize,
      isEffective: this.preferences.contextualize != null,
      onChange: (value) => this.updatePreference("contextualize", value ?? null),
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
      supportedRange: pauseDurationRange,
      step: pauseDurationStep,
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
  get automaticPausesAtPageOrSpreadEnd(): Preference<boolean> {
    return new Preference<boolean>({
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
      supportedRange: rateRange,
      step: rateStep,
    });
  }

  get pitch(): RangePreference<number> {
    return new RangePreference<number>({
      initialValue: this.preferences.pitch,
      effectiveValue: this.settings.pitch,
      isEffective: this.preferences.pitch != null,
      onChange: (value) => this.updatePreference("pitch", value ?? null),
      supportedRange: pitchRange,
      step: pitchStep,
    });
  }

  get volume(): RangePreference<number> {
    return new RangePreference<number>({
      initialValue: this.preferences.volume,
      effectiveValue: this.settings.volume,
      isEffective: this.preferences.volume != null,
      onChange: (value) => this.updatePreference("volume", value ?? null),
      supportedRange: volumeRange,
      step: volumeStep,
    });
  }
}
