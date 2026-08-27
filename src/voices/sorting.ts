import { ReadiumSpeechVoice } from "./types";
import { getVoices, processLanguages, getDefaultRegion, getLanguageDisplayName, LanguageWithRegions } from "./languages";
import { extractLangRegionFromBCP47 } from "../utils/language";

/**
 * Create a map of language codes to their respective voice order maps
 * @param voices Array of voices to analyze
 * @returns Map where key is language code and value is a map of voice names to their original JSON indices
 */
export const createJsonOrderMap = async (voices: ReadiumSpeechVoice[]): Promise<Map<string, Map<string, number>>> => {
  // First, group voices by language
  const voicesByLanguage = new Map<string, ReadiumSpeechVoice[]>();
  
  for (const voice of voices) {
    if (voice.source !== "json") continue;
    
    const [baseLang] = extractLangRegionFromBCP47(voice.language);
    if (!voicesByLanguage.has(baseLang)) {
      voicesByLanguage.set(baseLang, []);
    }
    voicesByLanguage.get(baseLang)!.push(voice);
  }
  
  // Then create order maps for each language
  const orderMaps = new Map<string, Map<string, number>>();
  
  for (const [baseLang, langVoices] of voicesByLanguage.entries()) {
    const langOrderMap = new Map<string, number>();
    const jsonVoices = await getVoices(baseLang);
    
    // Create a lookup map for faster searching
    const voiceLookup = new Map<string, number>();
    jsonVoices.forEach((v, i) => {
      voiceLookup.set(v.name.toLowerCase(), i);
      v.altNames?.forEach(altName => {
        voiceLookup.set(altName.toLowerCase(), i);
      });
    });
    
    // Map the voices to their original order
    for (const voice of langVoices) {
      const voiceKey = voice.name.toLowerCase();
      const jsonIndex = voiceLookup.get(voiceKey);
      
      if (jsonIndex !== undefined) {
        langOrderMap.set(voice.name, jsonIndex);
      }
    }
    
    if (langOrderMap.size > 0) {
      orderMaps.set(baseLang, langOrderMap);
    }
  }

  return orderMaps;
};

const QUALITY_ORDER: Record<string, number> = {
  veryLow: 1,
  low: 2,
  normal: 3,
  high: 4,
  veryHigh: 5
};

export const getQualityValue = (quality: string | null | undefined): number => {
  return quality ? (QUALITY_ORDER[quality] ?? 0) : 0;
};

/**
 * Compares two voices by quality, using JSON name order as a tiebreaker for same-quality
 * JSON-sourced voices, then falling back to alphabetical.
 */
export const sortByQuality = (
  a: ReadiumSpeechVoice,
  b: ReadiumSpeechVoice,
  jsonOrderMaps?: Map<string, Map<string, number>>,
  baseLang?: string
): number => {
  const aQuality = getQualityValue(a.quality);
  const bQuality = getQualityValue(b.quality);

  if (jsonOrderMaps && baseLang && a.source === "json" && b.source === "json") {
    const langOrderMap = jsonOrderMaps.get(baseLang);
    if (langOrderMap) {
      const aOrder = langOrderMap.get(a.name);
      const bOrder = langOrderMap.get(b.name);
      if (aOrder !== undefined && bOrder !== undefined) {
        return aOrder - bOrder;
      }
    }
  }

  if (bQuality !== aQuality) return bQuality - aQuality;
  return a.name.localeCompare(b.name);
};

/**
 * Splits voices into those whose base language matches one of the processed preferred
 * languages (grouped by base language) and everything else.
 */
export const groupVoicesByLanguage = (
  voices: ReadiumSpeechVoice[],
  processedLangs: LanguageWithRegions[]
): { voicesByLang: Map<string, ReadiumSpeechVoice[]>; otherLangVoices: ReadiumSpeechVoice[] } => {
  const langInfo = new Map(processedLangs.map(info => [info.baseLang, info]));
  const voicesByLang = new Map<string, ReadiumSpeechVoice[]>();
  const otherLangVoices: ReadiumSpeechVoice[] = [];

  for (const voice of voices) {
    const [lang] = extractLangRegionFromBCP47(voice.language);
    const langInfoForVoice = langInfo.get(lang);

    if (langInfoForVoice) {
      if (!voicesByLang.has(lang)) {
        voicesByLang.set(lang, []);
      }
      voicesByLang.get(lang)!.push(voice);
    } else {
      otherLangVoices.push(voice);
    }
  }

  return { voicesByLang, otherLangVoices };
};

/**
 * Sorts voices in place: regions matching the preferred language's region list first (in
 * preference order), then the default region, then everything else alphabetically by region —
 * quality breaks ties at every level.
 */
export const sortByPreferredRegion = async (voices: ReadiumSpeechVoice[], processedLang: LanguageWithRegions): Promise<void> => {
  const jsonOrderMaps = await createJsonOrderMap(voices);

  voices.sort((a, b) => {
    const [, aRegion] = extractLangRegionFromBCP47(a.language);
    const [, bRegion] = extractLangRegionFromBCP47(b.language);

    const aHasMatch = aRegion && processedLang.regions.includes(aRegion);
    const bHasMatch = bRegion && processedLang.regions.includes(bRegion);

    if (aHasMatch && bHasMatch) {
      const aIndex = processedLang.regions.indexOf(aRegion!);
      const bIndex = processedLang.regions.indexOf(bRegion!);
      if (aIndex === bIndex) {
        return sortByQuality(a, b, jsonOrderMaps, processedLang.baseLang);
      }
      return aIndex - bIndex;
    }

    if (aHasMatch) return -1;
    if (bHasMatch) return 1;

    const defaultRegion = getDefaultRegion(processedLang.baseLang);
    const [, defaultRegionCode] = extractLangRegionFromBCP47(defaultRegion);

    const aIsDefault = aRegion === defaultRegionCode;
    const bIsDefault = bRegion === defaultRegionCode;

    if (aIsDefault && !bIsDefault) return -1;
    if (!aIsDefault && bIsDefault) return 1;

    if (aRegion && bRegion) {
      const regionCompare = aRegion.localeCompare(bRegion);
      if (regionCompare !== 0) {
        return regionCompare;
      }
      return sortByQuality(a, b, jsonOrderMaps, processedLang.baseLang);
    }
    if (aRegion) return -1;
    if (bRegion) return 1;

    return sortByQuality(a, b, jsonOrderMaps, processedLang.baseLang);
  });
};

/**
 * Sorts voices in place by language display name, then default region, then region
 * alphabetically, then quality — used for voices outside the preferred-language groups.
 */
export const sortAlphabetically = async (voices: ReadiumSpeechVoice[]): Promise<void> => {
  const jsonOrderMaps = await createJsonOrderMap(voices);

  voices.sort((a, b) => {
    const [aLang] = extractLangRegionFromBCP47(a.language);
    const [bLang] = extractLangRegionFromBCP47(b.language);
    const aDisplayName = getLanguageDisplayName(aLang).toLowerCase();
    const bDisplayName = getLanguageDisplayName(bLang).toLowerCase();

    const langCompare = aDisplayName.localeCompare(bDisplayName);
    if (langCompare !== 0) {
      return langCompare;
    }

    if (aLang === bLang) {
      const defaultRegion = getDefaultRegion(aLang);
      const [, aRegion] = extractLangRegionFromBCP47(a.language);
      const [, bRegion] = extractLangRegionFromBCP47(b.language);

      const aIsDefault = defaultRegion && aRegion === defaultRegion.split("-")[1];
      const bIsDefault = defaultRegion && bRegion === defaultRegion.split("-")[1];

      if (aIsDefault && !bIsDefault) return -1;
      if (!aIsDefault && bIsDefault) return 1;

      if (aRegion && bRegion) {
        const regionCompare = aRegion.localeCompare(bRegion);
        if (regionCompare !== 0) {
          return regionCompare;
        }
      }
      if (aRegion && !bRegion) return -1;
      if (!aRegion && bRegion) return 1;

      return sortByQuality(a, b, jsonOrderMaps, aLang);
    }

    return sortByQuality(a, b, jsonOrderMaps, aLang);
  });
};

/**
 * Sorts voices by region preference within each preferred language (default region, then
 * quality), with unmatched-language voices appended afterward, sorted alphabetically.
 */
export const sortVoicesByRegions = async (preferredLanguages: string[], voices: ReadiumSpeechVoice[]): Promise<ReadiumSpeechVoice[]> => {
  if (!voices?.length) return [];

  const processedLangs = processLanguages(preferredLanguages || []);
  const { voicesByLang, otherLangVoices } = groupVoicesByLanguage(voices, processedLangs);

  const result: ReadiumSpeechVoice[] = [];
  for (const processedLang of processedLangs) {
    const langVoices = voicesByLang.get(processedLang.baseLang);
    if (langVoices) {
      await sortByPreferredRegion(langVoices, processedLang);
      result.push(...langVoices);
    }
  }

  await sortAlphabetically(otherLangVoices);
  result.push(...otherLangVoices);
  return result;
};