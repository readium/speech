import { GndRole } from '../gnd/types.js';
import { ConfigurablePreferences } from './Configurable.js';
export type VerbosityPreset = "none" | "few" | "some" | "most" | "custom";
export type LanguageMode = "none" | "block-level" | "always";
export type ExtractionFormat = "plain" | "ssml";
export type AutoPauseScope = "none" | "utterance" | "block";
export interface ISpeechPreferences {
    format?: ExtractionFormat | null;
    inlineContextualization?: boolean | null;
    verbosity?: VerbosityPreset | null;
    skip?: GndRole[] | null;
    contextualize?: GndRole[] | null;
    language?: LanguageMode | null;
    pauseDuration?: number | null;
    autoPause?: AutoPauseScope | null;
    rate?: number | null;
    pitch?: number | null;
    volume?: number | null;
}
export declare class SpeechPreferences implements ISpeechPreferences, ConfigurablePreferences<SpeechPreferences> {
    format: ExtractionFormat | null | undefined;
    inlineContextualization: boolean | null | undefined;
    verbosity: VerbosityPreset | null | undefined;
    skip: GndRole[] | null | undefined;
    contextualize: GndRole[] | null | undefined;
    language: LanguageMode | null | undefined;
    pauseDuration: number | null | undefined;
    autoPause: AutoPauseScope | null | undefined;
    rate: number | null | undefined;
    pitch: number | null | undefined;
    volume: number | null | undefined;
    constructor(preferences?: ISpeechPreferences);
    merging(other: SpeechPreferences): SpeechPreferences;
}
