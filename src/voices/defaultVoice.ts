import { ReadiumSpeechVoice } from "./types.js";
import { filterOutNoveltyVoices, filterOutVeryLowQualityVoices } from "./filters.js";
import { filterByBoundarySupport, pickBestVoiceByRegion, sortVoicesByRegions } from "./sorting.js";
import { extractLangRegionFromBCP47 } from "../utils/language.js";

/**
 * Picks the voice content in `language` is spoken with: among its base language's voices, whatever the region,
 * without novelty or very low quality ones, preferring those whose boundary support is `needsBoundary`,
 * ranked by pickBestVoiceByRegion. `null` when the language has no voice.
 */
export const pickLanguageVoice = async (
  language: string,
  voices: ReadiumSpeechVoice[],
  needsBoundary: boolean = true
): Promise<ReadiumSpeechVoice | null> => {
  const [baseLanguage] = extractLangRegionFromBCP47(language);
  const matching = filterOutVeryLowQualityVoices(filterOutNoveltyVoices(voices))
    .filter(voice => extractLangRegionFromBCP47(voice.language)[0] === baseLanguage);
  if (matching.length === 0) return null;
  return pickBestVoiceByRegion(language, filterByBoundarySupport(matching, needsBoundary));
};

/**
 * Picks an engine's default voice: the pickLanguageVoice() of the first of `languages` with one,
 * else the best of all `voices` by `languages`.
 * Without `languages`, the user's preferred languages (navigator.languages) are used.
 */
export const pickDefaultVoice = async (
  languages: string[] | undefined,
  voices: ReadiumSpeechVoice[]
): Promise<ReadiumSpeechVoice | null> => {
  if (!languages?.length) {
    languages = typeof navigator !== "undefined" && navigator.languages?.length ? [...navigator.languages] : ["en"];
  }
  for (const language of languages) {
    const voice = await pickLanguageVoice(language, voices);
    if (voice) return voice;
  }
  return (await sortVoicesByRegions(languages, voices))[0] ?? null;
};
