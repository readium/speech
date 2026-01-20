import type { ReadiumSpeechVoice } from "./types";
import { TQuality } from "./types";
import noveltyFilterData from "@json/filters/novelty.json";
import veryLowQualityFilterData from "@json/filters/veryLowQuality.json";

interface FilterVoice {
  name: string;
  nativeID?: string[];
  altNames?: string[];
}

const noveltyFilter = noveltyFilterData as { voices: FilterVoice[] };
const veryLowQualityFilter = veryLowQualityFilterData as { voices: FilterVoice[] };

export const isNoveltyVoice = (voiceName: string, voiceId?: string): boolean => {
  return noveltyFilter.voices.some(filter => 
    voiceName.includes(filter.name) || 
    (voiceId && filter.nativeID?.some(id => voiceId.includes(id))) ||
    (filter.altNames?.some(name => voiceName.includes(name)))
  );
}

export const isVeryLowQualityVoice = (voiceName: string, quality?: TQuality): boolean => {
  return veryLowQualityFilter.voices.some(filter => 
    voiceName.includes(filter.name)
  ) || quality === "veryLow";
}

export const filterOutNoveltyVoices = (voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] => {
  if (!voices?.length) return [];
  return voices.filter(voice => !(voice.isNovelty || isNoveltyVoice(voice.name, voice.voiceURI)));
}

export const filterOutVeryLowQualityVoices = (voices: ReadiumSpeechVoice[]): ReadiumSpeechVoice[] => {
  if (!voices?.length) return [];
  return voices.filter(voice => !isVeryLowQualityVoice(voice.name, voice.quality));
}