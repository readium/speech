import { extractLangRegionFromBCP47 } from "../utils/language";
import type { ReadiumSpeechVoice, VoiceData, TGender, TQuality, TLocalizedName } from "./types";

// Import all language JSON files statically
import ar from "@json/ar.json";
import bg from "@json/bg.json";
import bho from "@json/bho.json";
import bn from "@json/bn.json";
import ca from "@json/ca.json";
import cmn from "@json/cmn.json";
import cs from "@json/cs.json";
import da from "@json/da.json";
import de from "@json/de.json";
import el from "@json/el.json";
import en from "@json/en.json";
import es from "@json/es.json";
import eu from "@json/eu.json";
import fa from "@json/fa.json";
import fi from "@json/fi.json";
import fr from "@json/fr.json";
import gl from "@json/gl.json";
import he from "@json/he.json";
import hi from "@json/hi.json";
import hr from "@json/hr.json";
import hu from "@json/hu.json";
import id from "@json/id.json";
import it from "@json/it.json";
import ja from "@json/ja.json";
import kn from "@json/kn.json";
import ko from "@json/ko.json";
import mr from "@json/mr.json";
import ms from "@json/ms.json";
import nb from "@json/nb.json";
import nl from "@json/nl.json";
import pl from "@json/pl.json";
import pt from "@json/pt.json";
import ro from "@json/ro.json";
import ru from "@json/ru.json";
import sk from "@json/sk.json";
import sl from "@json/sl.json";
import sv from "@json/sv.json";
import ta from "@json/ta.json";
import te from "@json/te.json";
import th from "@json/th.json";
import tr from "@json/tr.json";
import uk from "@json/uk.json";
import vi from "@json/vi.json";
import wuu from "@json/wuu.json";
import yue from "@json/yue.json";

// Helper function to cast voice data to the correct type
function castVoice(voice: any): ReadiumSpeechVoice {
  return {
    ...voice,
    gender: voice.gender as TGender | undefined,
    quality: voice.quality ? (Array.isArray(voice.quality) 
      ? voice.quality.filter((q: any) => 
          ["veryLow", "low", "normal", "high", "veryHigh"].includes(q)
        ) as TQuality[] 
      : [voice.quality].filter((q: any) => 
          ["veryLow", "low", "normal", "high", "veryHigh"].includes(q)
        ) as TQuality[]
    ) : undefined,
    localizedName: voice.localizedName && ["android", "apple"].includes(voice.localizedName) 
      ? voice.localizedName as TLocalizedName 
      : undefined
  };
}

// Map of language codes to their respective voice data with proper casting
const voiceDataMap: Record<string, VoiceData> = Object.fromEntries(
  Object.entries({
    ar, bg, bho, bn, ca, cmn, cs, da, de, el, en, es, eu, fa, fi, fr, gl, he, hi,
    hr, hu, id, it, ja, kn, ko, mr, ms, nb, nl, pl, pt, ro, ru, sk, sl, sv, ta,
    te, th, tr, uk, vi, wuu, yue
  }).map(([lang, data]) => [
    lang,
    {
      ...data,
      voices: data.voices.map(castVoice)
    }
  ])
);

// Helper function to get voice data synchronously
function getVoiceData(lang: string): VoiceData | undefined {
  return voiceDataMap[lang];
}

// Chinese variant mapping for special handling
export const chineseVariantMap: {[key: string]: string} = {
  "cmn": "cmn", 
  "cmn-cn": "cmn", 
  "cmn-tw": "cmn", 
  "zh": "cmn", 
  "zh-cn": "cmn", 
  "zh-tw": "cmn",
  "yue": "yue", 
  "yue-hk": "yue", 
  "zh-hk": "yue",
  "wuu": "wuu", 
  "wuu-cn": "wuu"
};

/**
 * Normalizes language code with special handling for Chinese variants
 * @param lang - Input language code
 * @returns Normalized language code
 */
function normalizeLanguageCode(lang: string): string {
  if (!lang) return "";
  
  const normalized = lang.toLowerCase().replace(/_/g, "-");
  return chineseVariantMap[normalized] || normalized;
}

/**
 * Get all voices for a specific language
 * @param {string} lang - Language code (e.g., "en", "fr", "zh-CN")
 * @returns {ReadiumSpeechVoice[]} Array of voices for the specified language
 */
export function getVoices(lang: string): ReadiumSpeechVoice[] {
  if (!lang) return [];
  
  try {
    // Normalize the language code first
    const normalizedLang = normalizeLanguageCode(lang);
    
    // Try with the normalized language code
    let voiceData = getVoiceData(normalizedLang);
    
    // If no voices found and it's a Chinese variant, try with the base Chinese code
    if ((!voiceData || !voiceData.voices?.length) && normalizedLang in chineseVariantMap) {
      voiceData = getVoiceData("zh");
    }
    
    // If still no voices, try with the base language code
    if (!voiceData || !voiceData.voices?.length) {
      const [baseLang] = extractLangRegionFromBCP47(normalizedLang);
      if (baseLang !== normalizedLang) {
        voiceData = getVoiceData(baseLang);
      }
    }
    
    return voiceData?.voices || [];
  } catch (error) {
    console.error(`Failed to load voices for ${lang}:`, error);
    return [];
  }
}

/**
 * Get all available language codes
 * @returns {string[]} Array of available language codes
 */
export function getAvailableLanguages(): string[] {
  return Object.keys(voiceDataMap);
}

/**
 * Get the test utterance for a language
 * @param {string} lang - Language code (e.g., "en", "fr", "zh-CN")
 * @returns {string} The test utterance or empty string if not found
 */
export function getTestUtterance(lang: string): string {
  if (!lang) return "";
  
  try {
    // Normalize the language code first
    const normalizedLang = normalizeLanguageCode(lang);
    
    // Try with the normalized language code
    let voiceData = getVoiceData(normalizedLang);
    
    // If no test utterance found and it's a Chinese variant, try with the mapped variant code
    if ((!voiceData?.testUtterance) && normalizedLang in chineseVariantMap) {
      const variantCode = chineseVariantMap[normalizedLang];
      if (variantCode) {
        const variantData = getVoiceData(variantCode);
        if (variantData?.testUtterance) {
          return variantData.testUtterance;
        }
      }
    }
    
    // If still no test utterance, try with the base language code
    if (!voiceData?.testUtterance) {
      const [baseLang] = extractLangRegionFromBCP47(normalizedLang);
      if (baseLang !== normalizedLang) {
        const baseLangData = getVoiceData(baseLang);
        if (baseLangData?.testUtterance) {
          return baseLangData.testUtterance;
        }
      }
    }
    
    return voiceData?.testUtterance ?? "";
  } catch (error) {
    console.error(`Failed to get test utterance for ${lang}:`, error);
    return "";
  }
}

// Re-export types for backward compatibility
export * from "./types";
