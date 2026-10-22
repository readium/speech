import { ssmlAttrEscape } from "@readium/helpers";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { extractLangRegionFromBCP47, valueForLanguage } from "../utils/language.js";
import { unescapeSsmlEntities } from "./text.js";
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

// The language content declared in `declared` is spoken in: the content's when undeclared, or always with "none".
export function languageFor(declared: string | undefined, ctx: WalkContext): string | undefined {
  return overriddenLanguage(ctx.language === "none" ? ctx.contentLanguage : declared ?? ctx.contentLanguage, ctx.languageOverrides);
}

// The languages of a run of pieces: its content's, its catalog entries' (all in the catalog's), and its wordless ones'.
interface RunLanguages {
  content?: string;
  entry?: string;
  wordless?: string;
}

// BCP 47 tags are case-insensitive: "en-US" and "en-us" are the same language.
export function sameLanguage(a: string | undefined, b: string | undefined): boolean {
  return a === b || (a !== undefined && b !== undefined && a.toLowerCase() === b.toLowerCase());
}

function samePrimaryLanguage(a: string, b: string): boolean {
  return extractLangRegionFromBCP47(a)[0] === extractLangRegionFromBCP47(b)[0];
}

// Adds `piece` to `run`, `false` when its language disagrees. A catalog entry's language yields to
// content in the same primary language, e.g. "en" to "en-US"; `wrapsEntries` ignores it otherwise.
function joinsRun(run: RunLanguages, piece: ReadiumSpeechUtterance, ctx: WalkContext, wrapsEntries: boolean): boolean {
  const { language } = piece;
  if (language === undefined) return true;
  if (isCatalogEntry(piece, ctx)) {
    if (isWordless(piece)) {
      run.wordless = language;
      return true;
    }
    if (!wrapsEntries && run.content !== undefined && !samePrimaryLanguage(run.content, language)) return false;
    run.entry = language;
    return true;
  }
  if (run.content !== undefined && !sameLanguage(run.content, language)) return false;
  if (!wrapsEntries && run.entry !== undefined && !samePrimaryLanguage(language, run.entry)) return false;
  run.content = language;
  return true;
}

function commonLanguage(pieces: ReadiumSpeechUtterance[], ctx: WalkContext, wrapsEntries: boolean): string | undefined | null {
  const run: RunLanguages = {};
  for (const piece of pieces) {
    if (!joinsRun(run, piece, ctx, wrapsEntries)) return null;
  }
  return run.content ?? run.entry ?? run.wordless;
}

// The language `pieces` are spoken in together, `null` if they disagree.
export function sharedLanguage(pieces: ReadiumSpeechUtterance[], ctx: WalkContext): string | undefined | null {
  return commonLanguage(pieces, ctx, false);
}

function isCatalogEntry(piece: ReadiumSpeechUtterance, ctx: WalkContext): boolean {
  return ctx.synthetic.has(piece) && sameLanguage(piece.language, ctx.contextualizationLanguage);
}

// A catalog entry with no words (e.g. a template's ": ") takes the language of the content around it.
function isWordless(piece: ReadiumSpeechUtterance): boolean {
  return !/[\p{L}\p{N}]/u.test(piece.plain ?? unescapeSsmlEntities(piece.ssml ?? ""));
}

// The language a run of pieces is spoken in, `null` if they disagree. In SSML, catalog entries
// in another language don't count, being wrapped in a `<lang>` (see `ssmlInLanguage()`).
export function runLanguage(pieces: ReadiumSpeechUtterance[], ctx: WalkContext): string | undefined | null {
  return commonLanguage(pieces, ctx, ctx.format === "ssml");
}

// A piece's SSML, a catalog entry in another primary language than `language` wrapped in a `<lang>`.
export function ssmlInLanguage(piece: ReadiumSpeechUtterance, language: string | undefined, ctx: WalkContext): string {
  const ssml = piece.ssml ?? "";
  if (!language || !piece.language || !isCatalogEntry(piece, ctx) || isWordless(piece)) return ssml;
  if (samePrimaryLanguage(piece.language, language)) return ssml;
  return `<lang xml:lang="${ssmlAttrEscape(piece.language)}">${ssml}</lang>`;
}

// Splits `pieces` into consecutive `[start, end)` runs that each have a `runLanguage()`.
export function languageRuns(pieces: ReadiumSpeechUtterance[], ctx: WalkContext): [number, number][] {
  const wrapsEntries = ctx.format === "ssml";
  const runs: [number, number][] = [];
  let start = 0;
  let run: RunLanguages = {};
  pieces.forEach((piece, i) => {
    if (joinsRun(run, piece, ctx, wrapsEntries)) return;
    runs.push([start, i]);
    start = i;
    run = {};
    joinsRun(run, piece, ctx, wrapsEntries);
  });
  if (pieces.length > 0) runs.push([start, pieces.length]);
  return runs;
}

export function overrideLangTags(ssml: string, languageOverrides: Record<string, string>): string {
  return ssml.replace(/<lang xml:lang="([^"]*)">/g, (tag, language: string) => {
    const overridden = overriddenLanguage(language, languageOverrides);
    return overridden === language ? tag : `<lang xml:lang="${overridden}">`;
  });
}
