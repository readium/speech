import { GndRole } from '@readium/guided-navigation';
import { ExtractionFormat, Interruption, LanguageMode, Segmentation } from '../utterances/types.js';
import { ConfigurablePreferences } from './Configurable.js';
export type VerbosityPreset = "none" | "few" | "some" | "most" | "custom";
export type AutoPauseScope = "none" | "utterance" | "block";
export type VoicePreference = string | Record<string, string>;
export interface ISpeechPreferences {
    format?: ExtractionFormat | null;
    interruptions?: Partial<Record<GndRole, Interruption>> | null;
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
export declare class SpeechPreferences implements ISpeechPreferences, ConfigurablePreferences<SpeechPreferences> {
    format: ExtractionFormat | null | undefined;
    interruptions: Partial<Record<GndRole, Interruption>> | null | undefined;
    verbosity: VerbosityPreset | null | undefined;
    skip: GndRole[] | null | undefined;
    contextualize: GndRole[] | null | undefined;
    language: LanguageMode | null | undefined;
    languageOverrides: Record<string, string> | null | undefined;
    segmentation: Segmentation | null | undefined;
    voice: VoicePreference | null | undefined;
    pauseDuration: number | null | undefined;
    autoPause: AutoPauseScope | null | undefined;
    rate: number | null | undefined;
    pitch: number | null | undefined;
    volume: number | null | undefined;
    constructor(preferences?: ISpeechPreferences);
    merging(other: SpeechPreferences): SpeechPreferences;
}
