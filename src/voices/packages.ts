import { TQuality } from "./types";

type PackageQuality = {
  [key: string]: {
    values: string[];
    quality: TQuality;
  };
};

const packageQualities: PackageQuality = {
  low: {
    values: ["super-compact", "compact"],
    quality: "low"
  },
  normal: {
    values: ["enhanced"],
    quality: "normal"
  },
  high: {
    values: ["premium"],
    quality: "high"
  }
};

export const getInferredQualityFromPackageName = (voiceName: string): TQuality | undefined => {
  if (!voiceName) return undefined;
  
  const lowerName = voiceName.toLowerCase();
  // Split the name into segments using common separators
  const segments = lowerName.split(/[._-]/);
  
  // Check each quality level
  for (const quality of Object.values(packageQualities)) {
    // Check if any of the quality values exist as a complete segment
    if (quality.values.some(value => segments.includes(value))) {
      return quality.quality;
    }
  }
  
  return undefined;
}