import { ReadiumSpeechVoice } from './types';
import { LanguageWithRegions } from './languages';
/**
 * Create a map of language codes to their respective voice order maps
 * @param voices Array of voices to analyze
 * @returns Map where key is language code and value is a map of voice names to their original JSON indices
 */
export declare const createJsonOrderMap: (voices: ReadiumSpeechVoice[]) => Promise<Map<string, Map<string, number>>>;
export declare const getQualityValue: (quality: string | null | undefined) => number;
/**
 * Compares two voices by quality, using JSON name order as a tiebreaker for same-quality
 * JSON-sourced voices, then falling back to alphabetical.
 */
export declare const sortByQuality: (a: ReadiumSpeechVoice, b: ReadiumSpeechVoice, jsonOrderMaps?: Map<string, Map<string, number>>, baseLang?: string) => number;
/**
 * Splits voices into those whose base language matches one of the processed preferred
 * languages (grouped by base language) and everything else.
 */
export declare const groupVoicesByLanguage: (voices: ReadiumSpeechVoice[], processedLangs: LanguageWithRegions[]) => {
    voicesByLang: Map<string, ReadiumSpeechVoice[]>;
    otherLangVoices: ReadiumSpeechVoice[];
};
/**
 * Compares two voices by region match against a preferred language: regions matching the
 * preferred language's region list first (in preference order), then the default region, then
 * everything else alphabetically by region — quality breaks ties at every level.
 */
export declare const compareByPreferredRegion: (a: ReadiumSpeechVoice, b: ReadiumSpeechVoice, processedLang: LanguageWithRegions, jsonOrderMaps: Map<string, Map<string, number>>) => number;
/**
 * Sorts voices in place: regions matching the preferred language's region list first (in
 * preference order), then the default region, then everything else alphabetically by region —
 * quality breaks ties at every level.
 */
export declare const sortByPreferredRegion: (voices: ReadiumSpeechVoice[], processedLang: LanguageWithRegions, jsonOrderMaps?: Map<string, Map<string, number>>) => Promise<void>;
/**
 * Compares two voices by language display name, then default region, then region
 * alphabetically, then quality — used for voices outside the preferred-language groups.
 */
export declare const compareAlphabetically: (a: ReadiumSpeechVoice, b: ReadiumSpeechVoice, jsonOrderMaps: Map<string, Map<string, number>>) => number;
/**
 * Sorts voices in place by language display name, then default region, then region
 * alphabetically, then quality — used for voices outside the preferred-language groups.
 */
export declare const sortAlphabetically: (voices: ReadiumSpeechVoice[], jsonOrderMaps?: Map<string, Map<string, number>>) => Promise<void>;
/**
 * Sorts voices by region preference within each preferred language (default region, then
 * quality), with unmatched-language voices appended afterward, sorted alphabetically.
 */
export declare const sortVoicesByRegions: (preferredLanguages: string[], voices: ReadiumSpeechVoice[]) => Promise<ReadiumSpeechVoice[]>;
/**
 * Picks the single best-ranked voice for one language, without sorting the full candidate list.
 * Mirrors sortVoicesByRegions' fallback tier for a single preferred language: prefers a voice
 * whose base language matches, ranked by region/quality; if none match, falls back to the same
 * ranking sortAlphabetically would produce over the rest.
 */
export declare const pickBestVoiceByRegion: (language: string, voices: ReadiumSpeechVoice[]) => Promise<ReadiumSpeechVoice | null>;
