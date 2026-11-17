import { ssmlAttrEscape } from "@readium/helpers";
import { extractLangRegionFromBCP47, valueForLanguage } from "../utils/language.js";
import {
  bindNamespacesInward,
  declaredLanguage,
  decodeSsmlEntities,
  parseSsml,
  serializeSsml,
  setSsmlAttribute,
  ssmlElements,
  unwrapSsmlElements,
  type SsmlElement,
} from "./ssml.js";
import type { WalkContext } from "./walkContext.js";
import type { Piece } from "./piece.js";

// Removes `<lang xml:lang="...">...</lang>` wrapping from an SSML string,
// keeping the inner text merged into the surrounding flow, and the `xml:lang` of
// any other element (keeping the element) — for the
// `language: "block-level"` (the default) and `"none"` extraction options, which
// ignore a node's own inline language spans (only `"always"` honors them).
export function stripLangTags(ssml: string): string {
  const nodes = parseSsml(bindNamespacesInward(ssml, (element) => element.name === "lang" && declaredLanguage(element) !== undefined));
  const declaring = [...ssmlElements(nodes)].filter((element) => declaredLanguage(element) !== undefined);
  if (declaring.length === 0) return ssml;
  const isLang = (element: SsmlElement) => declaring.includes(element) && element.name === "lang";
  for (const element of declaring) if (!isLang(element)) setSsmlAttribute(element, "xml:lang", undefined);
  return serializeSsml(unwrapSsmlElements(nodes, isLang));
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
function joinsRun(run: RunLanguages, piece: Piece, ctx: WalkContext, wrapsEntries: boolean): boolean {
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

function commonLanguage(pieces: Piece[], ctx: WalkContext, wrapsEntries: boolean): string | undefined | null {
  const run: RunLanguages = {};
  for (const piece of pieces) {
    if (!joinsRun(run, piece, ctx, wrapsEntries)) return null;
  }
  return run.content ?? run.entry ?? run.wordless;
}

// The language `pieces` are spoken in together, `null` if they disagree.
export function sharedLanguage(pieces: Piece[], ctx: WalkContext): string | undefined | null {
  return commonLanguage(pieces, ctx, false);
}

function isCatalogEntry(piece: Piece, ctx: WalkContext): boolean {
  return !!piece.synthetic && sameLanguage(piece.language, ctx.contextualizationLanguage);
}

// A catalog entry with no words (e.g. a template's ": ") takes the language of the content around it.
function isWordless(piece: Piece): boolean {
  return !/[\p{L}\p{N}]/u.test(piece.plain ?? decodeSsmlEntities(piece.ssml ?? ""));
}

// The language a run of pieces is spoken in, `null` if they disagree. In SSML, catalog entries
// in another language don't count, being wrapped in a `<lang>` (see `ssmlInLanguage()`).
export function runLanguage(pieces: Piece[], ctx: WalkContext): string | undefined | null {
  return commonLanguage(pieces, ctx, ctx.format === "ssml");
}

// A piece's SSML, a catalog entry in another primary language than `language` (or the span it's inserted in) wrapped in a `<lang>`.
export function ssmlInLanguage(piece: Piece, runLanguage: string | undefined, ctx: WalkContext): string {
  const ssml = piece.ssml ?? "";
  const language = piece.enclosingLanguage ?? runLanguage;
  if (!language || !piece.language || !isCatalogEntry(piece, ctx) || isWordless(piece)) return ssml;
  if (samePrimaryLanguage(piece.language, language)) return ssml;
  return `<lang xml:lang="${ssmlAttrEscape(piece.language)}">${ssml}</lang>`;
}

// Splits `pieces` into consecutive `[start, end)` runs that each have a `runLanguage()`.
export function languageRuns(pieces: Piece[], ctx: WalkContext): [number, number][] {
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

// An announcement in the catalog's language takes the tag of the nearest content in the same primary language,
// after it else before it, e.g. "en-US" for an "en" catalog, so both are spoken with the same voice.
export function alignEntryLanguages(utterances: Piece[], ctx: WalkContext): void {
  if (ctx.language === "none") return;
  const isEntry = (piece: Piece) => !!piece.synthetic && sameLanguage(piece.language, ctx.contextualizationLanguage);
  const matches = (piece: Piece) => !isEntry(piece) && piece.language !== undefined && samePrimaryLanguage(piece.language, ctx.contextualizationLanguage);
  const content = utterances.map((piece) => (matches(piece) ? piece.language : undefined));
  utterances.forEach((piece, i) => {
    if (!isEntry(piece)) return;
    const language = content.slice(i + 1).find(Boolean) ?? content.slice(0, i).reverse().find(Boolean);
    if (language) piece.language = language;
  });
}

export function overrideLangTags(ssml: string, languageOverrides: Record<string, string>): string {
  const nodes = parseSsml(ssml);
  let changed = false;
  for (const element of ssmlElements(nodes)) {
    const language = declaredLanguage(element);
    const overridden = overriddenLanguage(language, languageOverrides);
    if (overridden === undefined || overridden === language) continue;
    setSsmlAttribute(element, "xml:lang", overridden);
    changed = true;
  }
  return changed ? serializeSsml(nodes) : ssml;
}
