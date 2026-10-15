import { ReadiumSpeechVoice } from './types.js';
export declare const voiceMatchesLanguage: (voice: ReadiumSpeechVoice, language: string) => boolean;
export declare const keepsSelectedVoice: (voice: ReadiumSpeechVoice | null, language: string) => boolean;
