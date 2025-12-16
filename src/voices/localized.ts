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