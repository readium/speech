import { IPreferencesEditor } from './PreferencesEditor.js';
import { BooleanPreference, EnumPreference, RangePreference, StringArrayPreference } from './Preference.js';
import { SpeechPreferences, VerbosityPreset, AutoPauseScope } from './SpeechPreferences.js';
import { SpeechSettings } from './SpeechSettings.js';
import { ExtractionFormat, LanguageMode, Segmentation } from '../utterances/types.js';
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
    get segmentation(): EnumPreference<Segmentation>;
    get pauseDuration(): RangePreference<number>;
    get autoPause(): EnumPreference<AutoPauseScope>;
    get rate(): RangePreference<number>;
    get pitch(): RangePreference<number>;
    get volume(): RangePreference<number>;
}
