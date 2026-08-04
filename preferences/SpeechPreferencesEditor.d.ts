import { IPreferencesEditor } from './PreferencesEditor.js';
import { BooleanPreference, EnumPreference, RangePreference, StringArrayPreference } from './Preference.js';
import { SpeechPreferences, VerbosityPreset, LanguageMode, ExtractionFormat, PauseScope } from './SpeechPreferences.js';
import { SpeechSettings } from './SpeechSettings.js';
export declare class SpeechPreferencesEditor implements IPreferencesEditor {
    preferences: SpeechPreferences;
    private settings;
    constructor(initialPreferences: SpeechPreferences, settings: SpeechSettings);
    clear(): void;
    private updatePreference;
    get format(): EnumPreference<ExtractionFormat>;
    get inlineContextualization(): BooleanPreference;
    get verbosity(): EnumPreference<VerbosityPreset>;
    get skip(): StringArrayPreference;
    get contextualize(): StringArrayPreference;
    get language(): EnumPreference<LanguageMode>;
    get pauseDuration(): RangePreference<number>;
    get pauseScope(): EnumPreference<PauseScope>;
    get automaticPausesAtPageOrSpreadEnd(): BooleanPreference;
    get rate(): RangePreference<number>;
    get pitch(): RangePreference<number>;
    get volume(): RangePreference<number>;
}
