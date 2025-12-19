import type { TQuality, TLocalizedName } from "./types";
import { extractLangRegionFromBCP47 } from "../utils/language";

// Import platform-specific configurations
import appleQualities from "@json/localizedNames/apple.json";

interface LocalizedQuality {
  normal: string;
  high: string;
}

interface PlatformQualities {
  [platform: string]: {
    [lang: string]: LocalizedQuality;
  };
}

const platformQualities: PlatformQualities = {
  apple: appleQualities.quality,
  // android: androidQualities.quality
};

export const getInferredQualityFromPlatform = (
  voiceURI: string, 
  language: string,
  platform?: TLocalizedName | TLocalizedName[]
): TQuality | undefined => {
  if (!voiceURI) return undefined;

  // Convert single platform to array for consistent handling
  const platforms = Array.isArray(platform) ? platform : platform ? [platform] : [];

  for (const p of platforms) {
    if (p && platformQualities[p]) {
      const qualities = platformQualities[p];
      const langCode = extractLangRegionFromBCP47(language)[0];
      const qualityIndicators = qualities[language] || qualities[langCode];

      if (qualityIndicators) {
        const lowerName = voiceURI.toLowerCase();
        const { normal, high } = qualityIndicators;

        if (high && lowerName.includes(high.toLowerCase())) {
          return "high";
        } else if (normal && lowerName.includes(normal.toLowerCase())) {
          return "normal";
        }
      }
    }
  }

  return undefined;
}

/**
 * Finds a locale where both high and normal quality indicators are present in the voice names
 * @param voiceNames Array of voice names to check against quality indicators
 * @param platform The platform to check quality indicators for (e.g., "apple")
 * @returns The first matching locale code or undefined if none found or platform not found
 */
export const findLocaleWithQualityIndicators = (
  voiceNames: string[], 
  platform: keyof typeof platformQualities
): string | undefined => {
  const qualityMap = platformQualities[platform];
  if (!qualityMap) return undefined;
  
  for (const [lang, { high, normal }] of Object.entries(qualityMap)) {
    const hasHigh = high && voiceNames.some(name => name.includes(high));
    const hasNormal = normal && voiceNames.some(name => name.includes(normal));
    
    if (hasHigh && hasNormal) {
      return lang;
    }
  }
  
  return undefined;
};