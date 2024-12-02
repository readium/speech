import { TGender, TQuality, IRecommended } from "./data.gen.js";
export interface IVoices {
    label: string;
    voiceURI: string;
    name: string;
    language: string;
    gender?: TGender | undefined;
    age?: string | undefined;
    offlineAvailability: boolean;
    quality?: TQuality | undefined;
    pitchControl: boolean;
    recommendedPitch?: number | undefined;
    recommendedRate?: number | undefined;
}
export declare function getSpeechSynthesisVoices(): Promise<SpeechSynthesisVoice[]>;
export declare function parseSpeechSynthesisVoices(speechSynthesisVoices: SpeechSynthesisVoice[]): IVoices[];
export declare function filterOnOfflineAvailability(voices: IVoices[], offline?: boolean): IVoices[];
export declare function filterOnGender(voices: IVoices[], gender: TGender): IVoices[];
export declare function filterOnLanguage(voices: IVoices[], language: string | string[]): IVoices[];
export declare function filterOnQuality(voices: IVoices[], quality: TQuality | TQuality[]): IVoices[];
export declare function filterOnNovelty(voices: IVoices[]): IVoices[];
export declare function filterOnVeryLowQuality(voices: IVoices[]): IVoices[];
export type TReturnFilterOnRecommended = [voicesRecommended: IVoices[], voicesLowerQuality: IVoices[]];
export declare function filterOnRecommended(voices: IVoices[], _recommended?: IRecommended[]): TReturnFilterOnRecommended;
export declare function sortByQuality(voices: IVoices[]): IVoices[];
export declare function sortByName(voices: IVoices[]): IVoices[];
export declare function sortByGender(voices: IVoices[], genderFirst: TGender): IVoices[];
export declare function sortByLanguage(voices: IVoices[], preferredLanguage?: string[] | string, localization?: string | undefined): IVoices[];
export declare function sortByRegion(voices: IVoices[], preferredRegions?: string[] | string, localization?: string | undefined): IVoices[];
export interface ILanguages {
    label: string;
    code: string;
    count: number;
}
export declare function listLanguages(voices: IVoices[], localization?: string | undefined): ILanguages[];
export declare function listRegions(voices: IVoices[], localization?: string | undefined): ILanguages[];
export type TGroupVoices = Map<string, IVoices[]>;
export declare function groupByLanguages(voices: IVoices[], preferredLanguage?: string[] | string, localization?: string | undefined): TGroupVoices;
export declare function groupByRegions(voices: IVoices[], preferredRegions?: string[] | string, localization?: string | undefined): TGroupVoices;
export declare function groupByKindOfVoices(allVoices: IVoices[]): TGroupVoices;
export declare function getLanguages(voices: IVoices[], preferredLanguage?: string[] | string, localization?: string | undefined): ILanguages[];
/**
 * Parse and extract SpeechSynthesisVoices,
 * @returns IVoices[]
 */
export declare function getVoices(preferredLanguage?: string[] | string, localization?: string): Promise<IVoices[]>;
