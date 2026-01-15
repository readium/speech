import { extractLangRegionFromBCP47 } from "../utils/language";
import type { ReadiumSpeechVoice, VoiceData, TGender, TQuality, TLocalizedName } from "./types";
import { LANGUAGE_METADATA } from '../generated/language-metadata';

export interface LanguageWithRegions {
  baseLang: string;              // Base language code (e.g., "en", "fr")
  regions: string[];             // Regions to use for this language (explicit, inferred, or default)
}

// Cache for loaded language data
const voiceDataCache = new Map<string, Promise<VoiceData>>();

// Use import.meta.glob to dynamically import JSON files
const jsonLoaders = import.meta.glob<{ default: VoiceData }>('../../json/*.json');

/**
 * Dynamically imports and caches language data
 */
async function loadVoiceData(lang: string): Promise<VoiceData> {
  try {
    // Extract the language subtag (first part of BCP-47)
    const langSubtag = lang.split("-")[0];
    const loader = jsonLoaders[`../../json/${langSubtag}.json`];
    if (!loader) {
      throw new Error(`No voice data found for language: ${lang}`);
    }
    const module = await loader();
    const voiceData = module.default;
    return {
      ...voiceData,
      voices: voiceData.voices.map(castVoice)
    };
  } catch (error) {
    console.error(`Failed to load voice data for ${lang}:`, error);
    throw error;
  }
}

/**
 * Gets voice data for a language, loading it if necessary
 */
function getVoiceData(lang: string): Promise<VoiceData> {
  if (!voiceDataCache.has(lang)) {
    voiceDataCache.set(lang, loadVoiceData(lang));
  }
  return voiceDataCache.get(lang)!;
}

// Helper function to cast voice data to the correct type
const castVoice = (voice: any): ReadiumSpeechVoice => ({
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
});

// Chinese variant mapping for special handling
export const chineseVariantMap: {[key: string]: string} = {
  "cmn": "cmn", 
  "cmn-CN": "cmn-CN", 
  "cmn-TW": "cmn-TW", 
  "zh": "cmn", 
  "zh-CN": "cmn-CN", 
  "zh-TW": "cmn-TW",
  "yue": "yue", 
  "yue-HK": "yue-HK", 
  "zh-HK": "yue-HK",
  "wuu": "wuu", 
  "wuu-CN": "wuu-CN"
};

/**
 * Normalizes language code with special handling for Chinese variants
 * @param lang - Input language code
 * @returns Normalized language code
 */
export const normalizeLanguageCode = (lang: string): string => {
  if (!lang) return "";
  
  // First normalize to lowercase and replace underscores with hyphens
  let normalized = lang.toLowerCase().replace(/_/g, "-");
  
  // Handle BCP47 formatting (e.g., "en-US" -> "en-US", "en-us" -> "en-US")
  if (/\w{2,3}-\w{2,3}/.test(normalized)) {
    const [language, region] = normalized.split("-");
    normalized = `${language.toLowerCase()}-${region.toUpperCase()}`;
  }
  
  // Then check for Chinese variants
  return chineseVariantMap[normalized] || normalized;
};

/**
 * Get all voices for a specific language
 * @param {string} lang - Language code (e.g., "en", "fr", "zh-CN")
 * @returns {Promise<ReadiumSpeechVoice[]>} Promise resolving to array of voices for the specified language
 */
export const getVoices = async (lang: string): Promise<ReadiumSpeechVoice[]> => {
  if (!lang) return [];
  
  try {
    // Normalize the language code first
    const normalizedLang = normalizeLanguageCode(lang);
    
    // Try with the normalized language code
    try {
      const voiceData = await getVoiceData(normalizedLang);
      if (voiceData?.voices?.length) {
        return voiceData.voices;
      }
    } catch (error) {
      console.warn(`Failed to load voices for ${normalizedLang}:`, error);
    }
    
    // If still no voices, try with the base language code
    const [baseLang] = extractLangRegionFromBCP47(normalizedLang);
    if (baseLang !== normalizedLang) {
      try {
        const baseLangData = await getVoiceData(baseLang);
        if (baseLangData?.voices?.length) {
          return baseLangData.voices;
        }
      } catch (error) {
        console.warn(`Failed to load voices for base language ${baseLang}:`, error);
      }
    }
    
    return [];
  } catch (error) {
    console.error(`Error in getVoices for ${lang}:`, error);
    return [];
  }
};

/**
 * Get all available language codes
 * @returns {string[]} Array of available language codes
 */
export const getAvailableLanguages = (): string[] => Object.keys(LANGUAGE_METADATA);

/**
 * Get the test utterance for a language
 * @param {string} lang - Language code (e.g., "en", "fr", "zh-CN")
 * @returns {string} The test utterance or empty string if not found
 */
export const getTestUtterance = (lang: string): string => {
  if (!lang) return "";
  
  try {
    const normalizedLang = normalizeLanguageCode(lang);
    
    // Try with the normalized language code
    const metadata = LANGUAGE_METADATA[normalizedLang];
    if (metadata?.testUtterance) {
      return metadata.testUtterance;
    }
    
    // Handle Chinese variants
    if (normalizedLang in chineseVariantMap) {
      const variantCode = chineseVariantMap[normalizedLang];
      if (variantCode && LANGUAGE_METADATA[variantCode]?.testUtterance) {
        return LANGUAGE_METADATA[variantCode].testUtterance;
      }
    }
    
    // Try with base language
    const [baseLang] = extractLangRegionFromBCP47(normalizedLang);
    if (baseLang !== normalizedLang && LANGUAGE_METADATA[baseLang]?.testUtterance) {
      return LANGUAGE_METADATA[baseLang].testUtterance;
    }
    
    return "";
  } catch (error) {
    console.error(`Error in getTestUtterance for ${lang}:`, error);
    return "";
  }
};

/**
 * Get the default region for a language
 * @param {string} lang - Language code (e.g., "en", "fr", "zh-CN")
 * @returns {string} The default region code or empty string if not found
 */
export const getDefaultRegion = (lang: string): string => {
  if (!lang) return "";
  
  try {
    // Normalize the language code first
    const normalizedLang = normalizeLanguageCode(lang);
    
    // Use metadata for fast lookup
    const metadata = LANGUAGE_METADATA[normalizedLang];
    if (metadata?.defaultRegion) {
      return `${normalizedLang}-${metadata.defaultRegion}`;
    }
    
    // If no default region found and it's a Chinese variant, try with the mapped variant code
    if (normalizedLang in chineseVariantMap) {
      const variantCode = chineseVariantMap[normalizedLang];
      if (variantCode) {
        const variantMetadata = LANGUAGE_METADATA[variantCode];
        if (variantMetadata?.defaultRegion) {
          return `${variantCode}-${variantMetadata.defaultRegion}`;
        }
      }
    }
    
    // If still no default region, try with the base language code
    const [baseLang] = extractLangRegionFromBCP47(normalizedLang);
    if (baseLang !== normalizedLang) {
      const baseLangMetadata = LANGUAGE_METADATA[baseLang];
      if (baseLangMetadata?.defaultRegion) {
        return `${baseLang}-${baseLangMetadata.defaultRegion}`;
      }
    }
    
    return "";
  } catch (error) {
    console.error(`Failed to get default region for ${lang}:`, error);
    return "";
  }
};

/**
 * Process languages with region inference
 * @param languages - Array of language codes (e.g., ["fr", "en-CA"])
 * @returns Array of LanguageWithRegions objects with language and region information
 */
export const processLanguages = (languages: string[]): LanguageWithRegions[] => {
  if (!languages?.length) return [];
  
  const allRegions = new Set<string>();
  const langMap = new Map<string, Set<string>>();
  const regionPriority = new Map<string, number>();
  
  // Single pass: collect regions, language mappings, and region priorities
  for (const [index, lang] of languages.entries()) {
    if (!lang) continue;
    
    const normalizedLang = normalizeLanguageCode(lang);
    const [baseLang, region] = extractLangRegionFromBCP47(normalizedLang);
    
    // Track the region in allRegions and its priority if it exists
    if (region) {
      allRegions.add(region);
      // Only set the priority if it hasn't been set yet (first occurrence has highest priority)
      if (!regionPriority.has(region)) {
        regionPriority.set(region, index);
      }
    }
    
    // Track the language and its explicit regions
    if (!langMap.has(baseLang)) {
      langMap.set(baseLang, new Set());
    }
    
    if (region) {
      langMap.get(baseLang)!.add(region);
    }
  }

  // Convert to the output format
  return Array.from(langMap.entries()).map(([baseLang, explicitRegionsSet]) => {
    // Get all available regions for this language from metadata
    const validRegionsForLang = new Set(
      LANGUAGE_METADATA[baseLang]?.availableRegions || []
    );

    // Get explicit regions with their original priority
    const explicitRegions = Array.from(explicitRegionsSet);
    
    // Add inferred regions (from allRegions) that are valid for this language
    const inferredRegions = Array.from(allRegions).filter(region => 
      validRegionsForLang.has(region) && !explicitRegions.includes(region)
    );
    
    // Combine and sort regions based on their original priority
    const regions = Array.from(new Set([...explicitRegions, ...inferredRegions]))
      .sort((a, b) => {
        const aPriority = regionPriority.get(a) ?? Number.MAX_SAFE_INTEGER;
        const bPriority = regionPriority.get(b) ?? Number.MAX_SAFE_INTEGER;
        return aPriority - bPriority;
      });
    
    // If still no regions, add the default region
    if (regions.length === 0) {
      const defaultRegion = getDefaultRegion(baseLang);
      const [, defaultRegionCode] = extractLangRegionFromBCP47(defaultRegion);
      if (defaultRegionCode) {
        regions.push(defaultRegionCode);
      }
    }
    
    return {
      baseLang,
      regions
    };
  });
};

// Re-export types for backward compatibility
export * from "./types";
