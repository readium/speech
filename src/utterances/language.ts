import type { ReadiumSpeechUtterance } from "../utterance.js";
import { extractLangRegionFromBCP47, valueForLanguage } from "../utils/language.js";
import type { WalkContext } from "./walkContext.js";

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

// The language `pieces` are spoken in together, `null` if they disagree. A catalog entry's
// language yields to content in the same primary language, e.g. "en" to "en-US".
export function sharedLanguage(pieces: ReadiumSpeechUtterance[], ctx: WalkContext): string | undefined | null {
  let content: string | undefined;
  let entry: string | undefined;
  for (const piece of pieces) {
    const { language } = piece;
    if (language === undefined) continue;
    if (ctx.synthetic.has(piece) && language === ctx.contextualizationLanguage) {
      entry = language;
    } else {
      if (content !== undefined && content !== language) return null;
      content = language;
    }
  }
  if (content === undefined || entry === undefined) return content ?? entry;
  return extractLangRegionFromBCP47(content)[0] === extractLangRegionFromBCP47(entry)[0] ? content : null;
}

// Splits `pieces` into consecutive `[start, end)` runs that each have a `sharedLanguage()`.
export function languageRuns(pieces: ReadiumSpeechUtterance[], ctx: WalkContext): [number, number][] {
  const runs: [number, number][] = [];
  let start = 0;
  for (let i = 1; i <= pieces.length; i++) {
    if (i < pieces.length && sharedLanguage(pieces.slice(start, i + 1), ctx) !== null) continue;
    runs.push([start, i]);
    start = i;
  }
  return pieces.length > 0 ? runs : [];
}

export function overrideLangTags(ssml: string, languageOverrides: Record<string, string>): string {
  return ssml.replace(/<lang xml:lang="([^"]*)">/g, (tag, language: string) => {
    const overridden = overriddenLanguage(language, languageOverrides);
    return overridden === language ? tag : `<lang xml:lang="${overridden}">`;
  });
}
