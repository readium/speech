import { GndRole } from '@readium/guided-navigation';
import { ConfigurableSettings } from './Configurable.js';
import { SpeechDefaults } from './SpeechDefaults.js';
import { AutoPauseScope, SpeechPreferences, VerbosityPreset, VoicePreference } from './SpeechPreferences.js';
import { ExtractionFormat, Interruption, LanguageMode, Segmentation } from '../utterances/types.js';
import { ReadiumSpeechVoice } from '../voices/types.js';
export declare class SpeechSettings implements ConfigurableSettings {
    [key: string]: unknown;
    readonly format: ExtractionFormat;
    readonly interruptions: Partial<Record<GndRole, Interruption>>;
    readonly verbosity: VerbosityPreset;
    readonly skip: GndRole[];
    readonly contextualize: GndRole[];
    readonly language: LanguageMode;
    readonly languageOverrides: Record<string, string>;
    readonly segmentation: Segmentation;
    readonly reconstruct: boolean;
    readonly voice: VoicePreference | null;
    readonly pauseDuration: number;
    readonly autoPause: AutoPauseScope;
    readonly rate: number;
    readonly pitch: number;
    readonly volume: number;
    /**
     * @param engineVoice The engine's voice, which `voice` falls back to: when unset, or for its language in a record without it.
     */
    constructor(preferences: SpeechPreferences, defaults: SpeechDefaults, engineVoice?: ReadiumSpeechVoice | null);
}
