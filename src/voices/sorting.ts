import { ReadiumSpeechVoice } from "./types";
import { getVoices } from "./languages";
import { extractLangRegionFromBCP47 } from "../utils/language";

/**
 * Create a map of language codes to their respective voice order maps
 * @param voices Array of voices to analyze
 * @returns Map where key is language code and value is a map of voice names to their original JSON indices
 */
export function createJsonOrderMap(voices: ReadiumSpeechVoice[]): Map<string, Map<string, number>> {
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
    const jsonVoices = getVoices(baseLang);
    
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
}

/**
 * Get the numeric value for a quality level
 * @param quality Quality level
 * @returns Numeric value (higher = better quality, 0 for undefined/null)
 */
export function getQualityValue(quality: string | null | undefined): number {
  const qualityOrder: Record<string, number> = {
    "veryLow": 1,
    "low": 2,
    "normal": 3,
    "high": 4,
    "veryHigh": 5
  };
  
  // Return 0 for null/undefined, otherwise the quality value or 0 if not found
  return quality ? (qualityOrder[quality] ?? 0) : 0;
}

/**
 * Sort two voices by quality, using JSON order as fallback for undefined/null quality
 * @param a First voice
 * @param b Second voice
 * @param jsonOrderMaps Optional map of language codes to voice order maps
 * @param baseLang Base language code to use for looking up the order map
 * @returns Comparison result (-1, 0, or 1)
 */
export function sortByQuality(
  a: ReadiumSpeechVoice, 
  b: ReadiumSpeechVoice, 
  jsonOrderMaps?: Map<string, Map<string, number>>,
  baseLang?: string
): number {
  const aQuality = getQualityValue(a.quality);
  const bQuality = getQualityValue(b.quality);
  
  // If both have defined quality, sort by quality (highest first)
  if (aQuality > 0 && bQuality > 0) {
    return bQuality - aQuality;
  }
  
  // If one has quality and the other doesn't, the one with quality comes first
  if (aQuality > 0 && bQuality === 0) return -1;
  if (aQuality === 0 && bQuality > 0) return 1;
  
  // Both have undefined/null quality - use JSON order if possible
  if (aQuality === 0 && bQuality === 0 && jsonOrderMaps && baseLang) {
    if (a.source === "json" && b.source === "json") {
      // Get the language-specific order map
      const langOrderMap = jsonOrderMaps.get(baseLang);
      if (langOrderMap) {
        const aOrder = langOrderMap.get(a.name) ?? Number.MAX_SAFE_INTEGER;
        const bOrder = langOrderMap.get(b.name) ?? Number.MAX_SAFE_INTEGER;
        
        if (aOrder !== Number.MAX_SAFE_INTEGER && bOrder !== Number.MAX_SAFE_INTEGER) {
          return aOrder - bOrder;
        }
      }
    }
  }
  
  // Fallback to alphabetical by name
  return a.name.localeCompare(b.name);
}
