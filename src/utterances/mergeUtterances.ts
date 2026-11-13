import { ssmlTextEscape, startsWithBindingPunct } from "@readium/helpers";
import type { GuidedNavigationObject } from "@readium/shared";
import { isAriaSubstituted, substitutedOwnSelector } from "@readium/guided-navigation";
import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance, UtteranceOffset } from "../utterance.js";
import { languageFor, overrideLangTags, runLanguage, ssmlInLanguage, stripLangTags } from "./language.js";
import { hasLangTag, splitOnLangTags, stripSsmlTags, stripSsmlTagsKeepSpacing, type ResolvedNodeText } from "./text.js";
import type { ExtractionFormat, LanguageMode } from "./types.js";
import { endsWithOpeningPunct, isSinglePunctuationChar, joinsWithoutSpace } from "../utils/text.js";
import { preciseLocateFor, resolveNodeLocate, spanLocate, subLocateFor } from "./locate.js";
import { markNonQuotable } from "./boundaryLocate.js";
import type { SourceTrace, WalkContext } from "./walkContext.js";

// Concatenates `parts`, skipping redundant lone punctuation and spacing pieces apart, as decided
// on `plainParts` (their plain text, for SSML `parts`), unless `spacing[i]` says how part i meets the previous one. `ranges[i]` is where `parts[i]` landed in `joined`.
export function joinPieceTexts(
  parts: string[],
  plainParts: string[] = parts,
  spacing: PieceSpacing[] = [],
): { joined: string; ranges: { start: number; end: number }[] } {
  let joined = "";
  let plain = "";
  const ranges: { start: number; end: number }[] = [];
  parts.forEach((part, i) => {
    const plainPart = plainParts[i];
    if (plainPart.length === 1 && isSinglePunctuationChar(plainPart) && plain.endsWith(plainPart)) {
      ranges.push({ start: joined.length, end: joined.length }); // redundant punctuation
      return;
    }
    // Only synthesizes a joining space when the join would otherwise have
    // none at all — never adds a second one next to whitespace the pieces already carry.
    const spaced =
      spacing[i] === "spaced" ||
      (spacing[i] === undefined && !startsWithBindingPunct(plainPart) && !endsWithOpeningPunct(plain) && !joinsWithoutSpace(plain.replace(/(?:<[^>]*>)+$/, ""), plainPart.replace(/^(?:<[^>]*>)+/, "")));
    if (plain && spaced && !/\s(?:<[^>]*>)*$/.test(plain) && !/^(?:<[^>]*>)*\s/.test(plainPart)) {
      joined += " ";
      plain += " ";
    }
    const start = joined.length;
    joined += part;
    plain += plainPart;
    ranges.push({ start, end: joined.length });
  });
  return { joined, ranges };
}

export type PieceSpacing = "touching" | "spaced" | undefined;

export function pieceSpacing(pieces: ReadiumSpeechUtterance[], ctx: WalkContext): PieceSpacing[] {
  return pieces.map((piece) => (ctx.touchingPieces.has(piece) ? "touching" : ctx.spacedPieces.has(piece) ? "spaced" : undefined));
}

// Which piece index a position in a joined string falls in — a position
// exactly on a piece boundary (the separator) attributes to the earlier piece.
export function pieceIndexAt(ranges: { start: number; end: number }[], pos: number): number {
  let idx = 0;
  while (idx < ranges.length - 1 && ranges[idx + 1].start <= pos) idx++;
  return idx;
}

// A substituted node's own box when computed (precise), else its nearest
// ancestor's — never a quote search, since the substituted text isn't on the page.
export function substitutedBareLocate(node: GuidedNavigationObject, ctx: WalkContext): LocatorOptions | undefined {
  const ownSelector = substitutedOwnSelector(node);
  const ref = resolveNodeLocate(node, ctx.ancestorChains)?.ref;
  if (ownSelector) {
    const locate: LocatorOptions = { cssSelector: ownSelector };
    if (ref?.href !== undefined) locate.href = ref.href;
    return markNonQuotable(locate);
  }
  return ref && markNonQuotable(ref);
}

// One `offsets` entry per piece backed by real source text; an inner
// merge's own `offsets` are reused as-is since each entry is already
// anchored to its own source node's text. Synthesized pieces contribute nothing.
export function buildMergeOffsets(pieces: ReadiumSpeechUtterance[], pieceSources: SourceTrace, ctx: WalkContext): UtteranceOffset[] {
  const offsets: UtteranceOffset[] = [];
  pieces.forEach((piece, i) => {
    if (piece.offsets) {
      offsets.push(...piece.offsets);
      return;
    }
    if (ctx.synthetic.has(piece)) return;
    const source = pieceSources[i];
    if (!source || Array.isArray(source)) return;
    const nodeRef = resolveNodeLocate(source, ctx.ancestorChains);
    if (!nodeRef) return;
    const text = plainOf((ctx.format === "ssml" ? piece.ssml : piece.plain) ?? "", ctx.format);
    if (!text) return;
    const range = ctx.pendingRange.get(piece);
    const locate = isAriaSubstituted(source) ? (substitutedBareLocate(source, ctx) ?? nodeRef.ref) : subLocateFor(nodeRef.ref, text);
    offsets.push({ start: range?.start ?? 0, end: range?.end ?? text.length, locate });
  });
  return offsets;
}

// Recurses through a piece that's itself a prior merge, since its edge locate
// was already recorded when it was built — undefined means real, quotable text.
function substitutedLocateAt(
  piece: ReadiumSpeechUtterance,
  source: SourceTrace[number],
  edge: "leading" | "trailing",
  ctx: WalkContext,
): LocatorOptions | undefined {
  const recorded = ctx.edgeSubstitutedLocate.get(piece);
  if (recorded) return recorded[edge];
  if (!source || Array.isArray(source) || !isAriaSubstituted(source)) return undefined;
  return substitutedBareLocate(source, ctx);
}

// Top-level `locate` anchor for a merge: the span from its first to last contributing piece.
function buildMergeLocate(pieces: ReadiumSpeechUtterance[], pieceSources: SourceTrace, ctx: WalkContext): LocatorOptions | undefined {
  const locates: (LocatorOptions | undefined)[] = pieces.map((piece, i) => {
    if (piece.locate) return piece.locate;
    if (ctx.synthetic.has(piece)) return undefined;
    const source = pieceSources[i];
    if (!source || Array.isArray(source)) return undefined;
    const text = plainOf((ctx.format === "ssml" ? piece.ssml : piece.plain) ?? "", ctx.format);
    if (!text) return undefined;
    if (isAriaSubstituted(source)) return resolveNodeLocate(source, ctx.ancestorChains) && substitutedBareLocate(source, ctx);
    return preciseLocateFor(resolveNodeLocate(source, ctx.ancestorChains), text);
  });
  const firstIndex = locates.findIndex((locate) => locate !== undefined);
  if (firstIndex === -1) return undefined;
  let lastIndex = locates.length - 1;
  while (locates[lastIndex] === undefined) lastIndex--;
  if (firstIndex === lastIndex) return locates[firstIndex];
  const firstSource = pieceSources[firstIndex];
  const lastSource = pieceSources[lastIndex];
  if (firstSource && lastSource && !Array.isArray(firstSource) && !Array.isArray(lastSource)) {
    const firstRef = resolveNodeLocate(firstSource, ctx.ancestorChains);
    const lastRef = resolveNodeLocate(lastSource, ctx.ancestorChains);
    return spanLocate(firstRef, lastRef, locates[firstIndex]);
  }
  return locates[firstIndex];
}

// Joins pieces read as one continuous occurrence into a single utterance.
// Bails (`undefined`) on disagreeing `language` (see `runLanguage()`); still marked synthesized if
// any piece was, but real sourced pieces still get their own offsets/locate.
export function mergeUtterances(
  pieces: ReadiumSpeechUtterance[],
  pieceSources: SourceTrace,
  ctx: WalkContext,
): ReadiumSpeechUtterance | undefined {
  const parts: string[] = [];
  const usedPieces: ReadiumSpeechUtterance[] = [];
  const usedSources: SourceTrace = [];
  for (let i = 0; i < pieces.length; i++) {
    const piece = pieces[i];
    const text = ctx.format === "ssml" ? piece.ssml : piece.plain;
    if (!text) continue;
    parts.push(text);
    usedPieces.push(piece);
    usedSources.push(pieceSources[i]);
  }
  if (parts.length === 0) return undefined;
  const language = runLanguage(usedPieces, ctx);
  if (language === null) return undefined;
  const texts = ctx.format === "ssml" ? usedPieces.map((piece) => ssmlInLanguage(piece, language, ctx)) : parts;
  const { joined } = joinPieceTexts(texts, texts, pieceSpacing(usedPieces, ctx));
  const merged: ReadiumSpeechUtterance = ctx.format === "ssml" ? { ssml: joined } : { plain: joined };
  if (language) merged.language = language;
  if (pieces.some((piece) => ctx.synthetic.has(piece))) ctx.synthetic.add(merged);
  const offsets = buildMergeOffsets(usedPieces, usedSources, ctx);
  if (offsets.length > 0) merged.offsets = offsets;
  const locate = buildMergeLocate(usedPieces, usedSources, ctx);
  if (locate) merged.locate = locate;
  const leading = substitutedLocateAt(usedPieces[0], usedSources[0], "leading", ctx);
  const trailing = substitutedLocateAt(usedPieces[usedPieces.length - 1], usedSources[usedPieces.length - 1], "trailing", ctx);
  if (leading || trailing) ctx.edgeSubstitutedLocate.set(merged, { leading, trailing });
  return merged;
}

// A node's own text, as `applyFormat()` speaks it whole: what offsets' `start`/`end` are positions in.
export function nodeOwnText(resolved: ResolvedNodeText | undefined, format: ExtractionFormat): string {
  if (format === "ssml" && resolved?.ssml) return plainOf(resolved.ssml, "ssml");
  return resolved?.plain ?? stripSsmlTags(resolved?.ssml ?? "");
}

// Applies the required `format` option to an already-resolved node text,
// synthesizing whichever field is missing: escaping `plain` into `ssml`
// with no markup, or stripping `ssml`'s tags down to `plain`. Then applies
// `language`, which only ever affects *this one node's own* inline `<lang>` spans:
//  - "always" or omitted: honored as declared — `ssml` keeps spans tagged
//    in one string; `plain` has no such markup, so it's split into one
//    utterance per language run instead (see `splitOnLangTags`).
//  - "block-level": ignore this node's own inline spans — unwrap any
//    `<lang>` tags in its `ssml`, merging their text into the surrounding
//    flow with no language of its own. Keeps this node's own `language`.
//  - "none": same unwrapping as "block-level", and this node's own
//    `language` gives way to the content's (`contentLanguage`), if any —
//    the document is being treated as one language throughout.
export function applyFormat(
  resolved: ResolvedNodeText,
  format: ExtractionFormat,
  language: LanguageMode | undefined,
  ctx: WalkContext,
): ReadiumSpeechUtterance[] {
  if (format === "plain" && language !== "block-level" && language !== "none" && resolved.ssml && hasLangTag(resolved.ssml)) {
    const ownText = nodeOwnText(resolved, format);
    let cursor = 0;
    return splitOnLangTags(resolved.ssml, resolved.language).map((segment) => {
      const utterance: ReadiumSpeechUtterance = { plain: segment.plain };
      const segmentLanguage = languageFor(segment.language, ctx);
      if (segmentLanguage) utterance.language = segmentLanguage;
      const start = ownText.indexOf(segment.plain, cursor);
      if (start !== -1) {
        cursor = start + segment.plain.length;
        ctx.pendingRange.set(utterance, { start, end: cursor });
      }
      return utterance;
    });
  }

  const utterance: ReadiumSpeechUtterance = {};
  const resolvedLanguage = languageFor(resolved.language, ctx);
  if (resolvedLanguage) utterance.language = resolvedLanguage;
  if (format === "ssml") {
    utterance.ssml = resolved.ssml ? overrideLangTags(resolved.ssml, ctx.languageOverrides) : ssmlTextEscape(resolved.plain ?? "");
  } else {
    utterance.plain = resolved.plain ?? stripSsmlTags(resolved.ssml ?? "");
  }
  if ((language === "block-level" || language === "none") && utterance.ssml) {
    utterance.ssml = stripLangTags(utterance.ssml);
  }
  return [utterance];
}

// Strips SSML down to plain text the same way `splitSsmlAtSentences()` does
// internally — unlike `stripSsmlTags()`, must NOT collapse/trim whitespace, or offsets drift.
export function plainOf(text: string, format: ExtractionFormat): string {
  return format === "ssml" ? stripSsmlTagsKeepSpacing(text) : text;
}
