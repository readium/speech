import { valueForLanguage } from "../utils/language.js";

// Removes `<lang xml:lang="...">...</lang>` wrapping from an SSML string,
// keeping the inner text merged into the surrounding flow — for the
// `language: "block-level"`/`"none"` extraction options, which ignore a
// node's own inline language spans (only `"always"`, or the default, honors them).
const LANG_TAG_RE = /<lang xml:lang="[^"]*">([\s\S]*?)<\/lang>/g;

export function stripLangTags(ssml: string): string {
  return ssml.replace(LANG_TAG_RE, "$1");
}

// The language content declared in `language` is spoken in, per `languageOverrides`.
export function overriddenLanguage(language: string | undefined, languageOverrides: Record<string, string>): string | undefined {
  return language === undefined ? undefined : (valueForLanguage(languageOverrides, language) ?? language);
}

export function overrideLangTags(ssml: string, languageOverrides: Record<string, string>): string {
  return ssml.replace(/<lang xml:lang="([^"]*)">/g, (tag, language: string) => {
    const overridden = overriddenLanguage(language, languageOverrides);
    return overridden === language ? tag : `<lang xml:lang="${overridden}">`;
  });
}
