import { GndRole } from '@readium/guided-navigation';
import { IPreferencesEditor } from './PreferencesEditor.js';
import { EnumPreference, Preference, RangePreference, StringArrayPreference } from './Preference.js';
import { SpeechPreferences, VerbosityPreset, AutoPauseScope, VoicePreference } from './SpeechPreferences.js';
import { SpeechSettings } from './SpeechSettings.js';
import { ExtractionFormat, Interruption, LanguageMode, Segmentation } from '../utterances/types.js';
export declare class SpeechPreferencesEditor implements IPreferencesEditor {
    preferences: SpeechPreferences;
    private settings;
    constructor(initialPreferences: SpeechPreferences, settings: SpeechSettings);
    clear(): void;
    private updatePreference;
    get format(): EnumPreference<ExtractionFormat>;
    get interruptions(): Preference<Partial<Record<GndRole, Interruption>>>;
    get verbosity(): EnumPreference<VerbosityPreset>;
    get skip(): StringArrayPreference;
    get contextualize(): StringArrayPreference;
    get language(): EnumPreference<LanguageMode>;
    get languageOverrides(): Preference<Record<string, string>>;
    get segmentation(): EnumPreference<Segmentation>;
    get voice(): Preference<VoicePreference>;
    get pauseDuration(): RangePreference<number>;
    get autoPause(): EnumPreference<AutoPauseScope>;
    get rate(): RangePreference<number>;
    get pitch(): RangePreference<number>;
    get volume(): RangePreference<number>;
}
