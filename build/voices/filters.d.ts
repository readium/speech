import { ReadiumSpeechVoice, TQuality } from './types';
export declare const isNoveltyVoice: (voiceName: string, voiceId?: string) => boolean;
export declare const isVeryLowQualityVoice: (voiceName: string, quality?: TQuality) => boolean;
export declare const filterOutNoveltyVoices: (voices: ReadiumSpeechVoice[]) => ReadiumSpeechVoice[];
export declare const filterOutVeryLowQualityVoices: (voices: ReadiumSpeechVoice[]) => ReadiumSpeechVoice[];
