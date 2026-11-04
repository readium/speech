import { normalizeLanguageCode } from "./languageCode.js";

// The base language of a voice language: Chinese variants stay apart, e.g. yue for zh-HK, cmn for zh-TW.
export const voiceBaseLanguage = (language: string): string => normalizeLanguageCode(language).split("-")[0];

/**
 * Looks up the voice of a language-keyed voice record for content in `language`: the exact tag's,
 * else its base language's, tags matched as voice languages are, e.g. a `zh-HK` key for `yue-HK` content.
 */
export const voiceForLanguage = (voices: Record<string, string>, language: string): string | undefined => {
  const entries = Object.entries(voices).map(([key, id]) => [normalizeLanguageCode(key), id] as const);
  for (const tag of [normalizeLanguageCode(language), voiceBaseLanguage(language)]) {
    const entry = entries.find(([key]) => key === tag);
    if (entry) return entry[1];
  }
  return undefined;
};
