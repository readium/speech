import { ReadiumSpeechVoice, TQuality } from './types.js';
export declare const isNoveltyVoice: (voiceName: string, voiceId?: string) => boolean;
export declare const isVeryLowQualityVoice: (voiceName: string, quality?: TQuality) => boolean;
export declare const filterOutNoveltyVoices: (voices: ReadiumSpeechVoice[]) => ReadiumSpeechVoice[];
export declare const filterOutVeryLowQualityVoices: (voices: ReadiumSpeechVoice[]) => ReadiumSpeechVoice[];
/**
 * Keeps voices whose language or alternative language matches one of `languages`,
 * either exactly or by base language (e.g. "en" or "en-US" keep "en-GB").
 */
export declare const filterByLanguages: (voices: ReadiumSpeechVoice[], languages: string | string[]) => ReadiumSpeechVoice[];
