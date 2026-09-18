import { ssmlTextEscape } from "../gnd/text.js";
import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance, UtteranceOffset } from "../utterance.js";
import { stripLangTags } from "./language.js";
import { hasLangTag, splitOnLangTags, stripSsmlTags, type ResolvedNodeText } from "./text.js";
import type { ExtractionFormat, LanguageMode } from "./types.js";
import { isSinglePunctuationChar, startsWithBindingPunct } from "../utils/text.js";
import { preciseLocateFor, resolveNodeLocate, spanLocate, subLocateFor } from "./locate.js";
import type { SourceTrace, WalkContext } from "./walkContext.js";

// Concatenates `parts`, skipping redundant lone punctuation and spacing
// pieces apart. `ranges[i]` is where `parts[i]` landed in `joined`.
export function joinPieceTexts(parts: string[]): { joined: string; ranges: { start: number; end: number }[] } {
  let joined = "";
  const ranges: { start: number; end: number }[] = [];
  for (const part of parts) {
    if (part.length === 1 && isSinglePunctuationChar(part) && joined.endsWith(part)) {
      ranges.push({ start: joined.length, end: joined.length }); // redundant punctuation
      continue;
    }
    // Only synthesizes a joining space when the join would otherwise have
    // none at all — never adds a second one next to whitespace the pieces already carry.
    if (joined && !startsWithBindingPunct(part) && !/\s$/.test(joined) && !/^\s/.test(part)) joined += " ";
    const start = joined.length;
    joined += part;
    ranges.push({ start, end: joined.length });
  }
  return { joined, ranges };
}

// One `offsets` entry per piece backed by real source text; an inner
// merge's own `offsets` are reused as-is since each entry is already
// anchored to its own source node's text. Synthesized pieces contribute nothing.
function buildMergeOffsets(pieces: ReadiumSpeechUtterance[], pieceSources: SourceTrace, ctx: WalkContext): UtteranceOffset[] {
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
    const text = ctx.format === "ssml" ? piece.ssml : piece.plain;
    if (!text) return;
    const range = ctx.pendingRange.get(piece);
    offsets.push({ start: range?.start ?? 0, end: range?.end ?? text.length, locate: subLocateFor(nodeRef.ref, text) });
  });
  return offsets;
}

// Top-level `locate` anchor for a merge: the span from its first to last contributing piece.
function buildMergeLocate(pieces: ReadiumSpeechUtterance[], pieceSources: SourceTrace, ctx: WalkContext): LocatorOptions | undefined {
  const locates: (LocatorOptions | undefined)[] = pieces.map((piece, i) => {
    if (piece.locate) return piece.locate;
    if (ctx.synthetic.has(piece)) return undefined;
    const source = pieceSources[i];
    if (!source || Array.isArray(source)) return undefined;
    const text = ctx.format === "ssml" ? piece.ssml : piece.plain;
    return text ? preciseLocateFor(resolveNodeLocate(source, ctx.ancestorChains), text) : undefined;
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
// Bails (`undefined`) on disagreeing `language`; still marked synthesized if
// any piece was, but real sourced pieces still get their own offsets/locate.
export function mergeUtterances(
  pieces: ReadiumSpeechUtterance[],
  pieceSources: SourceTrace,
  ctx: WalkContext,
): ReadiumSpeechUtterance | undefined {
  let language: string | undefined;
  let sawLanguage = false;
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
    if (piece.language !== undefined) {
      if (sawLanguage && piece.language !== language) return undefined;
      language = piece.language;
      sawLanguage = true;
    }
  }
  if (parts.length === 0) return undefined;
  const { joined } = joinPieceTexts(parts);
  const merged: ReadiumSpeechUtterance = ctx.format === "ssml" ? { ssml: joined } : { plain: joined };
  if (language) merged.language = language;
  if (pieces.some((piece) => ctx.synthetic.has(piece))) ctx.synthetic.add(merged);
  const offsets = buildMergeOffsets(usedPieces, usedSources, ctx);
  if (offsets.length > 0) merged.offsets = offsets;
  const locate = buildMergeLocate(usedPieces, usedSources, ctx);
  if (locate) merged.locate = locate;
  return merged;
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
//  - "none": same unwrapping as "block-level", and additionally drops this
//    node's own `language` — the document is being treated as one
//    language throughout, so nothing gets tagged at all.
export function applyFormat(
  resolved: ResolvedNodeText,
  format: ExtractionFormat,
  language: LanguageMode | undefined,
  ctx: WalkContext,
): ReadiumSpeechUtterance[] {
  if (format === "plain" && language !== "block-level" && language !== "none" && resolved.ssml && hasLangTag(resolved.ssml)) {
    return splitOnLangTags(resolved.ssml, resolved.language).map((segment) => {
      const utterance: ReadiumSpeechUtterance = { plain: segment.plain };
      if (segment.language) utterance.language = segment.language;
      ctx.pendingRange.set(utterance, { start: segment.start, end: segment.end });
      return utterance;
    });
  }

  const utterance: ReadiumSpeechUtterance = {};
  if (resolved.language) utterance.language = resolved.language;
  if (format === "ssml") {
    utterance.ssml = resolved.ssml ?? ssmlTextEscape(resolved.plain ?? "");
  } else {
    utterance.plain = resolved.plain ?? stripSsmlTags(resolved.ssml ?? "");
  }
  if (language === "block-level" || language === "none") {
    if (utterance.ssml) utterance.ssml = stripLangTags(utterance.ssml);
    if (language === "none") delete utterance.language;
  }
  return [utterance];
}

// Strips SSML down to plain text the same way `splitSsmlAtSentences()` does
// internally — unlike `stripSsmlTags()`, must NOT collapse/trim whitespace, or offsets drift.
export function plainOf(text: string, format: ExtractionFormat): string {
  if (format !== "ssml") return text;
  return text.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
