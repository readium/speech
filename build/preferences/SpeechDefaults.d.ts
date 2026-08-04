import { GndRole } from '../gnd/types.js';
import { AutoPauseScope, ExtractionFormat, LanguageMode, VerbosityPreset } from './SpeechPreferences.js';
export interface ISpeechDefaults {
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
export declare class SpeechDefaults {
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
    constructor(defaults?: ISpeechDefaults);
}
