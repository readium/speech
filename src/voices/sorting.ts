import { ReadiumSpeechVoice } from "./types";
import { getVoices } from "./languages";
import { extractLangRegionFromBCP47 } from "../utils/language";

/**
 * Create a map of language codes to their respective voice order maps
 * @param voices Array of voices to analyze
 * @returns Map where key is language code and value is a map of voice names to their original JSON indices
 */
export async function createJsonOrderMap(voices: ReadiumSpeechVoice[]): Promise<Map<string, Map<string, number>>> {
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
    jsonVoices.forEach((v: any, i: number) => {
      voiceLookup.set(v.name.toLowerCase(), i);
      v.altNames?.forEach((altName: any) => {
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