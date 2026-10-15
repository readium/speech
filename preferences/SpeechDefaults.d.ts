import { GndRole } from '@readium/guided-navigation';
import { AutoPauseScope, VerbosityPreset, VoicePreference } from './SpeechPreferences.js';
import { ExtractionFormat, LanguageMode, Segmentation } from '../utterances/types.js';
export interface ISpeechDefaults {
    format?: ExtractionFormat | null;
    inlineContextualization?: GndRole[] | null;
    verbosity?: VerbosityPreset | null;
    skip?: GndRole[] | null;
    contextualize?: GndRole[] | null;
    language?: LanguageMode | null;
    languageOverrides?: Record<string, string> | null;
    segmentation?: Segmentation | null;
    voice?: VoicePreference | null;
    pauseDuration?: number | null;
    autoPause?: AutoPauseScope | null;
    rate?: number | null;
    pitch?: number | null;
    volume?: number | null;
}
export declare class SpeechDefaults {
    readonly format: ExtractionFormat;
    readonly inlineContextualization: GndRole[];
    readonly verbosity: VerbosityPreset;
    readonly skip: GndRole[];
    readonly contextualize: GndRole[];
    readonly language: LanguageMode;
    readonly languageOverrides: Record<string, string>;
    readonly segmentation: Segmentation;
    readonly voice: VoicePreference | null;
    readonly pauseDuration: number;
    readonly autoPause: AutoPauseScope;
    readonly rate: number;
    readonly pitch: number;
    readonly volume: number;
    constructor(defaults?: ISpeechDefaults);
}
