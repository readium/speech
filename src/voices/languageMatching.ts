import type { ReadiumSpeechVoice } from "./types.js";
import { extractLangRegionFromBCP47 } from "../utils/language.js";

// No cross-region fallback: fr-FR content must not match an fr-CA voice.
export const voiceMatchesLanguage = (voice: ReadiumSpeechVoice, language: string): boolean => {
  const [lang, region] = extractLangRegionFromBCP47(language);
  const [voiceLang, voiceRegion] = extractLangRegionFromBCP47(voice.language);
  return voiceLang === lang && (!region || voiceRegion === region);
};

// The selected voice keeps content in its own language, whatever the region.
export const keepsSelectedVoice = (voice: ReadiumSpeechVoice | null, language: string): boolean => {
  return !!voice && extractLangRegionFromBCP47(voice.language)[0] === extractLangRegionFromBCP47(language)[0];
};
