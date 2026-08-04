import { GndRole } from '../gnd/types.js';
import { ConfigurableSettings } from './Configurable.js';
import { SpeechDefaults } from './SpeechDefaults.js';
import { AutoPauseScope, ExtractionFormat, LanguageMode, SpeechPreferences, VerbosityPreset } from './SpeechPreferences.js';
export declare class SpeechSettings implements ConfigurableSettings {
    [key: string]: unknown;
    readonly format: ExtractionFormat;
    readonly inlineContextualization: boolean;
    readonly verbosity: VerbosityPreset;
    readonly skip: GndRole[];
    readonly contextualize: GndRole[];
    readonly language: LanguageMode;
    readonly pauseDuration: number;
    readonly autoPause: AutoPauseScope;
    readonly rate: number;
    readonly pitch: number;
    readonly volume: number;
    constructor(preferences: SpeechPreferences, defaults: SpeechDefaults);
}
