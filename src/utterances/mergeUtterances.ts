import { ssmlTextEscape } from "@readium/helpers";
import type { GuidedNavigationObject } from "@readium/shared";
import { isAriaSubstituted, substitutedOwnSelector } from "@readium/guided-navigation";
import type { LocatorOptions } from "../decorator/createLocator.js";
import { languageFor, overrideLangTags, runLanguage, ssmlInLanguage, stripLangTags } from "./language.js";
import { hasLangTag, splitOnLangTags, type ResolvedNodeText } from "./text.js";
import { stripSsmlTags, stripSsmlTagsKeepSpacing } from "./plainText.js";
import type { ExtractionFormat, LanguageMode } from "./types.js";
import { preciseLocateFor, resolveNodeLocate, spanLocate } from "./locate.js";
import { joinedSpans, placeInOwnText, setSpans } from "./sourceSpans.js";
import type { WalkContext } from "./walkContext.js";
import { balancedSsml, joinPieceSsml, joinPieceTexts, type Piece } from "./piece.js";

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
  const ref = resolveNodeLocate(node, ctx)?.ref;
  if (ownSelector) {
    const locate: LocatorOptions = { cssSelector: ownSelector };
    if (ref?.href !== undefined) locate.href = ref.href;
    return locate;
  }
  return ref;
}

// Recurses through a piece that's itself a prior merge, since its edge locate
// was already recorded when it was built — undefined means real, quotable text.
function substitutedLocateAt(piece: Piece, edge: "leading" | "trailing", ctx: WalkContext): LocatorOptions | undefined {
  if (piece.edgeLocates) return piece.edgeLocates[edge];
  const { source } = piece;
  if (!source || Array.isArray(source) || !isAriaSubstituted(source)) return undefined;
  return substitutedBareLocate(source, ctx);
}

// Top-level `locate` anchor for a merge: the span from its first to last contributing piece.
function buildMergeLocate(pieces: Piece[], ctx: WalkContext): LocatorOptions | undefined {
  const locates: (LocatorOptions | undefined)[] = pieces.map((piece) => {
    if (piece.locate) return piece.locate;
    if (piece.synthetic) return undefined;
    const { source } = piece;
    if (!source || Array.isArray(source)) return undefined;
    const text = pieceText(piece, ctx);
    if (!text) return undefined;
    if (isAriaSubstituted(source)) return resolveNodeLocate(source, ctx) && substitutedBareLocate(source, ctx);
    return preciseLocateFor(resolveNodeLocate(source, ctx), text);
  });
  const firstIndex = locates.findIndex((locate) => locate !== undefined);
  if (firstIndex === -1) return undefined;
  let lastIndex = locates.length - 1;
  while (locates[lastIndex] === undefined) lastIndex--;
  if (firstIndex === lastIndex) return locates[firstIndex];
  const firstSource = pieces[firstIndex].source;
  const lastSource = pieces[lastIndex].source;
  if (firstSource && lastSource && !Array.isArray(firstSource) && !Array.isArray(lastSource)) {
    const firstRef = resolveNodeLocate(firstSource, ctx);
    const lastRef = resolveNodeLocate(lastSource, ctx);
    return spanLocate(firstRef, lastRef, locates[firstIndex]);
  }
  return locates[firstIndex];
}

// Joins pieces read as one continuous occurrence into a single utterance.
// Bails (`undefined`) on disagreeing `language` (see `runLanguage()`); still marked synthesized if
// any piece was, but real sourced pieces still get their own offsets/locate.
export function mergeUtterances(pieces: Piece[], ctx: WalkContext): Piece | undefined {
  const used = pieces.filter((piece) => (ctx.format === "ssml" ? piece.ssml : piece.plain));
  if (used.length === 0) return undefined;
  const language = runLanguage(used, ctx);
  if (language === null) return undefined;
  const plainParts = used.map((piece) => pieceText(piece, ctx));
  const { joined: plain, ranges } = joinPieceTexts(plainParts, used.map((piece) => piece.spacing));
  const joined = ctx.format === "ssml" ? joinPieceSsml(used, used.map((piece) => ssmlInLanguage(piece, language, ctx)), plainParts, ranges) : plain;
  const merged: Piece = ctx.format === "ssml" ? { ssml: joined } : { plain: joined };
  if (language) merged.language = language;
  if (pieces.some((piece) => piece.synthetic)) merged.synthetic = true;
  setSpans(merged, joinedSpans(used, ranges, ctx));
  const locate = buildMergeLocate(used, ctx);
  if (locate) merged.locate = locate;
  const leading = substitutedLocateAt(used[0], "leading", ctx);
  const trailing = substitutedLocateAt(used[used.length - 1], "trailing", ctx);
  if (leading || trailing) merged.edgeLocates = { leading, trailing };
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
//  - "none": same unwrapping as "block-level", and this node's own
//    `language` gives way to the content's (`contentLanguage`), if any —
//    the document is being treated as one language throughout.
export function applyFormat(
  node: GuidedNavigationObject,
  resolved: ResolvedNodeText,
  format: ExtractionFormat,
  language: LanguageMode | undefined,
  ctx: WalkContext,
): Piece[] {
  if (format === "plain" && language !== "block-level" && language !== "none" && resolved.ssml && hasLangTag(resolved.ssml)) {
    const segments = splitOnLangTags(resolved.ssml, resolved.language).map((segment) => {
      const utterance: Piece = { plain: segment.plain };
      const segmentLanguage = languageFor(segment.language, ctx);
      if (segmentLanguage) utterance.language = segmentLanguage;
      return utterance;
    });
    placeInOwnText(segments, node, ctx);
    return segments;
  }

  const utterance: Piece = {};
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
  placeInOwnText([utterance], node, ctx);
  return [utterance];
}

// The plain text offsets and sentence boundaries are measured in — unlike `stripSsmlTags()`,
// must NOT collapse/trim whitespace, or offsets drift.
export function plainOf(text: string, format: ExtractionFormat): string {
  return format === "ssml" ? stripSsmlTagsKeepSpacing(text) : text;
}

// A piece's text as offsets measure it, an SSML slice read with the tags it leaves open around it.
export function pieceText(piece: Piece, ctx: WalkContext): string {
  return plainOf(ctx.format === "ssml" ? balancedSsml(piece) : (piece.plain ?? ""), ctx.format);
}
