import { ReadiumSpeechVoice } from './types.js';
/**
 * Picks the voice content in `language` is spoken with: among its base language's voices, whatever the region,
 * without novelty or very low quality ones, preferring those whose boundary support is `needsBoundary`,
 * ranked by pickBestVoiceByRegion. `null` when the language has no voice.
 */
export declare const pickLanguageVoice: (language: string, voices: ReadiumSpeechVoice[], needsBoundary?: boolean) => Promise<ReadiumSpeechVoice | null>;
/**
 * Picks an engine's default voice: the pickLanguageVoice() of the first of `languages` with one,
 * else the best of all `voices` by `languages`.
 * Without `languages`, the user's preferred languages (navigator.languages) are used.
 */
export declare const pickDefaultVoice: (languages: string[] | undefined, voices: ReadiumSpeechVoice[]) => Promise<ReadiumSpeechVoice | null>;
