import type { ReadiumSpeechVoice } from "./types.js";
import { TQuality } from "./types.js";
import noveltyFilterData from "@json/filters/novelty.json" with { type: "json" };
import veryLowQualityFilterData from "@json/filters/veryLowQuality.json" with { type: "json" };

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

/**
 * Keeps voices whose language or alternative language matches one of `languages`,
 * either exactly or by base language (e.g. "en" or "en-US" keep "en-GB").
 */
export const filterByLanguages = (voices: ReadiumSpeechVoice[], languages: string | string[]): ReadiumSpeechVoice[] => {
  const langs = Array.isArray(languages) ? languages : [languages];

  return voices.filter(voice => {
    return langs.some(requestedLang => {
      const reqLang = requestedLang.toLowerCase();
      const voiceLang = voice.language?.toLowerCase();
      const voiceAltLang = voice.altLanguage?.toLowerCase();

      // Check direct matches first
      if (voiceLang === reqLang || voiceAltLang === reqLang) {
        return true;
      }

      // Then check base language matches
      const [reqBase] = reqLang.split("-");
      return (voiceLang && voiceLang.startsWith(reqBase)) ||
             (voiceAltLang && voiceAltLang.startsWith(reqBase));
    });
  });
}