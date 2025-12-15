export enum PackageQuality {
  VeryLow = "super-compact",
  Low = "compact"
}

import { TQuality } from "./types";

export const getInferredQualityFromPackageName = (voiceName: string): TQuality | undefined => {
  if (!voiceName) return undefined;
  
  const lowerName = voiceName.toLowerCase();
  if (lowerName.includes(`.${PackageQuality.VeryLow}.`)) return "veryLow";
  if (lowerName.includes(`.${PackageQuality.Low}.`)) return "low";
  
  return undefined;
}