import type { GndRole } from "@readium/guided-navigation";
import type { ConfigurableSettings } from "./Configurable.js";
import { SpeechDefaults } from "./SpeechDefaults.js";
import type { AutoPauseScope, SpeechPreferences, VerbosityPreset, VoicePreference } from "./SpeechPreferences.js";
import { contextualizedAtVerbosity, skippedAtVerbosity } from "./verbosityTables.js";
import type { ExtractionFormat, Interruption, LanguageMode, Segmentation } from "../utterances/types.js";
import type { ReadiumSpeechVoice } from "../voices/types.js";
import { getVoiceId } from "../voices/voiceId.js";
import { extractLangRegionFromBCP47, valueForLanguage } from "../utils/language.js";

// Content without a voice of its own is spoken with the engine's, for its language only:
// a bare id would mean that voice for all content once submitted back.
const withEngineVoice = (voice: VoicePreference | null, engineVoice?: ReadiumSpeechVoice | null): VoicePreference | null => {
  if (!engineVoice || typeof voice === "string") return voice;
  const [language] = extractLangRegionFromBCP47(engineVoice.language);
  if (!language || (voice && valueForLanguage(voice, language) !== undefined)) return voice;
  return { ...voice, [language]: getVoiceId(engineVoice) };
};

export class SpeechSettings implements ConfigurableSettings {
  [key: string]: unknown;

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

  /**
   * @param engineVoice The engine's voice, which `voice` falls back to: when unset, or for its language in a record without it.
   */
  constructor(preferences: SpeechPreferences, defaults: SpeechDefaults, engineVoice?: ReadiumSpeechVoice | null) {
    this.format = preferences.format ?? defaults.format;
    this.interruptions = preferences.interruptions ?? defaults.interruptions;
    this.verbosity = preferences.verbosity ?? defaults.verbosity;

    // `skip`/`contextualize` only apply under "custom" — every other preset
    // uses its own fixed table, ignoring whatever `skip`/`contextualize`
    // were set to.
    if (this.verbosity === "custom") {
      this.skip = preferences.skip ?? defaults.skip;
      this.contextualize = preferences.contextualize ?? defaults.contextualize;
    } else {
      this.skip = [...skippedAtVerbosity[this.verbosity]];
      this.contextualize = [...contextualizedAtVerbosity[this.verbosity]];
    }
    this.language = preferences.language ?? defaults.language;
    this.languageOverrides = preferences.languageOverrides ?? defaults.languageOverrides;
    this.segmentation = preferences.segmentation ?? defaults.segmentation;
    this.voice = withEngineVoice(preferences.voice ?? defaults.voice, engineVoice);
    this.pauseDuration = preferences.pauseDuration ?? defaults.pauseDuration;
    this.autoPause = preferences.autoPause ?? defaults.autoPause;
    this.rate = preferences.rate ?? defaults.rate;
    this.pitch = preferences.pitch ?? defaults.pitch;
    this.volume = preferences.volume ?? defaults.volume;
  }
}
