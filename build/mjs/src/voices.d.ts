import { TGender, TQuality, IRecommended } from "./data.js";
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
export declare function sortByLanguage(voices: IVoices[], preferredLanguage?: string[] | string): IVoices[];
export interface ILanguages {
    label: string;
    language: string;
    count: number;
}
export declare function ListRegions(voices: IVoices[], localization?: string): ILanguages[];
export type TGroupVoices = Map<string, IVoices[]>;
export declare function groupByLanguage(voices: IVoices[], preferredLanguage?: string[] | string, localization?: string): TGroupVoices;
export declare function groupByRegions(voices: IVoices[], language: string, preferredRegions?: string[] | string, localization?: string): TGroupVoices;
export declare function groupByKindOfVoices(allVoices: IVoices[]): TGroupVoices;
/**
 * get the languages list
 * @param allVoices IVoices list
 * @param localization BCP47 localization string
 * @returns
 */
export declare function getLanguages(allVoices?: IVoices[], localization?: string): Promise<ILanguages[]>;
/**
 * same as async getLanguages
 * @param voices IVoices list
 * @param localization BPC47 localisation string
 * @returns ILanguages[]
 */
export declare function listLanguages(voices: IVoices[], localization?: string): ILanguages[];
/**
 * Parse and extract SpeechSynthesisVoices,
 * @returns IVoices[]
 */
export declare function getVoices(): Promise<IVoices[]>;
