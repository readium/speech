import type { TQuality, TLocalizedName } from "./types";

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

export const getInferredQuality = (
  voiceName: string, 
  language: string,
  platform?: TLocalizedName | TLocalizedName[]
): TQuality | undefined => {
  if (!voiceName) return undefined;

  // Convert single platform to array for consistent handling
  const platforms = Array.isArray(platform) ? platform : platform ? [platform] : [];

  for (const p of platforms) {
    if (p && platformQualities[p]) {
      const qualities = platformQualities[p];
      const langCode = language.split("-")[0];
      const qualityIndicators = qualities[language] || qualities[langCode];

      if (qualityIndicators) {
        const lowerName = voiceName.toLowerCase();
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