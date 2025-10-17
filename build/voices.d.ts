import { TGender, TQuality, IRecommended } from './data.gen.js';
export interface ReadiumSpeechVoice {
    label: string;
    voiceURI: string;
    name: string;
    __lang?: string | undefined;
    language: string;
    gender?: TGender | undefined;
    age?: string | undefined;
    offlineAvailability: boolean;
    quality?: TQuality | undefined;
    pitchControl: boolean;
    recommendedPitch?: number | undefined;
    recommendedRate?: number | undefined;
}
export declare function getSpeechSynthesisVoices(maxTimeout?: number, interval?: number): Promise<SpeechSynthesisVoice[]>;
export declare function parseSpeechSynthesisVoices(speechSynthesisVoices: SpeechSynthesisVoice[]): ReadiumSpeechVoice[];
export declare function convertToSpeechSynthesisVoices(voices: ReadiumSpeechVoice[]): SpeechSynthesisVoice[];
export declare function filterOnOfflineAvailability(voices: ReadiumSpeechVoice[], offline?: boolean): ReadiumSpeechVoice[];
export declare function filterOnGender(voices: ReadiumSpeechVoice[], gender: TGender): ReadiumSpeechVoice[];
export declare function filterOnLanguage(voices: ReadiumSpeechVoice[], language?: string | string[]): ReadiumSpeechVoice[];
export declare function filterOnQuality(voices: ReadiumSpeechVoice[], quality: TQuality | TQuality[]): ReadiumSpeechVoice[];
export declare function filterOnNovelty(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[];
export declare function filterOnVeryLowQuality(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[];
export type TReturnFilterOnRecommended = [voicesRecommended: ReadiumSpeechVoice[], voicesLowerQuality: ReadiumSpeechVoice[]];
export declare function filterOnRecommended(voices: ReadiumSpeechVoice[], _recommended?: IRecommended[]): TReturnFilterOnRecommended;
export declare function sortByQuality(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[];
export declare function sortByName(voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[];
export declare function sortByGender(voices: ReadiumSpeechVoice[], genderFirst: TGender): ReadiumSpeechVoice[];
export declare function sortByLanguage(voices: ReadiumSpeechVoice[], preferredLanguage?: string[] | string, localization?: string | undefined): ReadiumSpeechVoice[];
export declare function sortByRegion(voices: ReadiumSpeechVoice[], preferredRegions?: string[] | string, localization?: string | undefined): ReadiumSpeechVoice[];
export interface ILanguages {
    label: string;
    code: string;
    count: number;
}
export declare function listLanguages(voices: ReadiumSpeechVoice[], localization?: string | undefined): ILanguages[];
export declare function listRegions(voices: ReadiumSpeechVoice[], localization?: string | undefined): ILanguages[];
export type TGroupVoices = Map<string, ReadiumSpeechVoice[]>;
export declare function groupByLanguages(voices: ReadiumSpeechVoice[], preferredLanguage?: string[] | string, localization?: string | undefined): TGroupVoices;
export declare function groupByRegions(voices: ReadiumSpeechVoice[], preferredRegions?: string[] | string, localization?: string | undefined): TGroupVoices;
export declare function groupByKindOfVoices(allVoices: ReadiumSpeechVoice[]): TGroupVoices;
export declare function getLanguages(voices: ReadiumSpeechVoice[], preferredLanguage?: string[] | string, localization?: string | undefined): ILanguages[];
/**
 * Parse and extract SpeechSynthesisVoices,
 * @returns ReadiumSpeechVoice[]
 */
export declare function getVoices(preferredLanguage?: string[] | string, localization?: string): Promise<ReadiumSpeechVoice[]>;
