import type { GuidedNavigationObject } from "@readium/shared";
import { isAriaSubstituted, type GndRole } from "@readium/guided-navigation";
import { languageFor, languageRuns, runLanguage, sameLanguage, sharedLanguage, ssmlInLanguage } from "./language.js";
import { nodeRoles } from "./nodeFields.js";
import { keepUnrepeatableWhole, splitSsmlAtSentences } from "./splitSsmlAtSentences.js";
import {
  isAlias,
  mapAliasBoundaries,
  punctuateLoneAlias,
  punctuateSentenceEndingAliases,
  segmentAliasText,
  segmentAroundAliases,
} from "./abbreviationAlias.js";
import { pieceIndexAt, pieceText, plainOf, substitutedBareLocate } from "./mergeUtterances.js";
import { joinedSpans, setSpans, sliceSpans, spansOf, type SourceSpan } from "./sourceSpans.js";
import { preciseLocateFor, resolveNodeLocate, spanLocate } from "./locate.js";
import { callerSuppressions, segmentSentences, type SentenceBoundary } from "./sentenceSegmenter.js";
import { mergeBoundaries } from "./sentenceBoundaryMerge.js";
import { blockOf, edgeNode } from "./blocks.js";
import type { WalkContext } from "./walkContext.js";
import { encloseOwnTags, joinPieceSsml, joinPieceTexts, type Piece } from "./piece.js";

// Resolves a non-synthetic utterance into per-sentence fragments (`undefined`
// if there's only one), falling back to English when it has no language.
// `start`/`end` are positions in the node's own source text (the plain
// projection, even for SSML), not in the fragment's own text.
async function sentenceFragmentsOf(
  utterance: Piece,
  ctx: WalkContext,
): Promise<{ text: string; start: number; end: number }[] | undefined> {
  const language = utterance.language ?? "en";
  const customSuppressions = callerSuppressions(language, ctx);
  const sourceText = ctx.format === "ssml" ? utterance.ssml : utterance.plain;
  if (!sourceText) return undefined;
  const boundaries = await ctx.segmenter(language, plainOf(sourceText, ctx.format), customSuppressions);
  if (boundaries.length <= 1) return undefined;
  if (ctx.format !== "ssml") return boundaries.map((b) => ({ text: b.text, start: b.start, end: b.contentEnd }));
  const whole = keepUnrepeatableWhole(sourceText, boundaries);
  const ssmlFragments = whole.length > 1 ? await splitSsmlAtSentences(sourceText, language, async () => whole) : undefined;
  if (!ssmlFragments) return undefined;
  return whole.map((b, i) => ({ text: ssmlFragments[i], start: b.start, end: b.contentEnd }));
}

// A node with one of these roles never joins a reconstruction run — tabular/
// list/heading content is routinely punctuation-less without being prose.
// A bare, unroled node (e.g. a fixed-layout fragment) is deliberately NOT excluded.
const neverJoinRoles: ReadonlySet<GndRole> = new Set([
  "cell",
  "rowheader",
  "columnheader",
  "row",
  "table",
  "list",
  "listItem",
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6",
]);

function rolesOf(source: GuidedNavigationObject | [GuidedNavigationObject, GuidedNavigationObject] | undefined): GndRole[] {
  if (!source) return [];
  return nodeRoles(Array.isArray(source) ? source[1] : source);
}

// Ancestors carrying a semantic role, at the given edge of a source; unroled and
// `presentation` wrappers (e.g. fixed-layout `<div>`s, layout tables) are not boundaries.
function roledAncestors(source: GuidedNavigationObject | [GuidedNavigationObject, GuidedNavigationObject], edge: "leading" | "trailing", ctx: WalkContext): GuidedNavigationObject[] {
  const node = edgeNode(source, edge);
  return (ctx.ancestorChains.get(node) ?? []).filter((ancestor) => nodeRoles(ancestor).some((role) => role !== "presentation"));
}

function sameRoledContainers(a: GuidedNavigationObject[], b: GuidedNavigationObject[]): boolean {
  return a.length === b.length && a.every((ancestor, i) => ancestor === b[i]);
}

// Whether `utterance`'s leading/trailing text is an aria substitution rather
// than real prose — such text must never join into a neighbor.
function isSubstitutedEdge(utterance: Piece, edge: "leading" | "trailing", ctx: WalkContext): boolean {
  const locate = utterance.edgeLocates?.[edge];
  if (locate && !ctx.aliasLocates.has(locate)) return true;
  const { source } = utterance;
  return !!source && !Array.isArray(source) && isAriaSubstituted(source);
}

function isInserted(piece: Piece): boolean {
  return piece.placement?.kind === "inline";
}

function isPlacedAfter(piece: Piece): boolean {
  return piece.placement?.kind === "after";
}

// Pieces placed after the sentence holding the end of the piece they follow, keyed by that piece's index.
type PlacedAfter = Map<number, Piece[]>;

function pushPlacedAfter(placedAfter: PlacedAfter, index: number, newOut: Piece[]): void {
  newOut.push(...(placedAfter.get(index) ?? []));
  placedAfter.delete(index);
}

// Pieces of one sentence around an inline footnote or pagebreak (see `Placement`).
function isSamePlaceholderSentence(prev: Piece, next: Piece): boolean {
  const prevNode = prev.placement?.node;
  return prevNode !== undefined && prevNode === next.placement?.node;
}

// Whether `next` may join `prev`'s run for sentence-boundary detection —
// structural eligibility only; the segmenter itself (run against the whole
// run's joined text) decides where sentences actually fall.
function canExtendRun(prev: Piece, next: Piece, ctx: WalkContext): boolean {
  const prevText = ctx.format === "ssml" ? prev.ssml : prev.plain;
  const nextText = ctx.format === "ssml" ? next.ssml : next.plain;
  if (!prevText || !nextText) return false;
  if (isSamePlaceholderSentence(prev, next)) return true;
  if (!sameLanguage(prev.language ?? "en", next.language ?? "en")) return false;
  if (prev.synthetic || next.synthetic) return false;
  const prevSource = prev.source;
  const nextSource = next.source;
  if (!prevSource || !nextSource) return false;
  if (!ctx.segmentationReconstruct && blockOf(prevSource, "trailing", ctx) !== blockOf(nextSource, "leading", ctx)) return false;
  if (rolesOf(prevSource).some((role) => neverJoinRoles.has(role))) return false;
  if (rolesOf(nextSource).some((role) => neverJoinRoles.has(role))) return false;
  if (!sameRoledContainers(roledAncestors(prevSource, "trailing", ctx), roledAncestors(nextSource, "leading", ctx))) return false;
  if (isSubstitutedEdge(prev, "trailing", ctx)) return false;
  if (isSubstitutedEdge(next, "leading", ctx)) return false;
  return true;
}

// Splits one utterance on its own sentence boundaries, independent of any
// neighboring piece.
async function pushSplitSingle(utterance: Piece, ctx: WalkContext, newOut: Piece[]): Promise<void> {
  encloseOwnTags(utterance);
  const fragments = utterance.synthetic || isAlias(utterance) ? undefined : await sentenceFragmentsOf(utterance, ctx);
  if (!fragments) {
    if (isAlias(utterance)) punctuateLoneAlias(utterance, ctx);
    newOut.push(utterance);
    return;
  }
  const { source } = utterance;
  const node = Array.isArray(source) ? undefined : source;
  const nodeRef = node ? resolveNodeLocate(node, ctx) : undefined;
  const nodeOwnSubstitutedLocate = node && isAriaSubstituted(node) ? substitutedBareLocate(node, ctx) : undefined;
  const edges = utterance.edgeLocates;
  const spans = spansOf(utterance, ctx);
  fragments.forEach(({ text: fragment, start, end }, k) => {
    const split: Piece = { [ctx.format]: fragment, source };
    if (utterance.language !== undefined) split.language = utterance.language;
    if (utterance.locate && !nodeRef) split.locate = utterance.locate;
    setSpans(split, sliceSpans(spans, start, end));
    const substitutedLocate =
      (k === 0 ? edges?.leading : undefined) ??
      (k === fragments.length - 1 ? edges?.trailing : undefined) ??
      nodeOwnSubstitutedLocate;
    if (substitutedLocate && nodeRef) split.locate = substitutedLocate;
    if (utterance.blockStart && k === 0) split.blockStart = true;
    newOut.push(split);
  });
}

async function segmentPieces(
  pieces: Piece[],
  plainParts: string[],
  joined: string,
  ranges: { start: number; end: number }[],
  language: string,
  suppressions: string[] | undefined,
  ctx: WalkContext,
): Promise<SentenceBoundary[]> {
  if (!pieces.some(isAlias)) return ctx.segmenter(language, joined, suppressions);
  return segmentAroundAliases(pieces, plainParts, joined, ranges, language, suppressions, ctx);
}

// For each gap between consecutive pieces, whether a sentence boundary
// genuinely reaches into the next piece's own text, vs. merely absorbing the
// separator — which would otherwise make an unrelated final sentence look joined.
async function detectGenuineJoins(
  pieces: Piece[],
  ctx: WalkContext,
  language: string,
  suppressions: string[] | undefined,
): Promise<boolean[]> {
  const plainParts = pieces.map((piece) => pieceText(piece, ctx));
  const { joined, ranges } = joinPieceTexts(plainParts, pieces.map((piece) => piece.spacing));
  const boundaries = await segmentPieces(pieces, plainParts, joined, ranges, language, suppressions, ctx);
  const joinedWithNext = new Array<boolean>(pieces.length - 1).fill(false);
  for (const boundary of boundaries) {
    const startIdx = pieceIndexAt(ranges, boundary.start);
    // Last real character, not the exclusive end — a trailing separator alone shouldn't count.
    const endIdx = boundary.end > boundary.start ? pieceIndexAt(ranges, boundary.end - 1) : startIdx;
    for (let k = startIdx; k < endIdx; k++) joinedWithNext[k] = true;
  }
  return joinedWithNext;
}

// An inline footnote or pagebreak never ends a sentence: it continues the one it interrupts,
// closes the one ending right before it, or opens the next.
function joinInsertions(pieces: Piece[], joinedWithNext: boolean[]): boolean[] {
  const joined = [...joinedWithNext];
  pieces.forEach((piece, k) => {
    if (!isInserted(piece)) return;
    const hasPrev = k > 0 && isSamePlaceholderSentence(pieces[k - 1], piece);
    const hasNext = k < pieces.length - 1 && isSamePlaceholderSentence(piece, pieces[k + 1]);
    if (hasPrev && !joined[k - 1]) joined[k - 1] = true;
    else if (hasNext) joined[k] = true;
  });
  return joined;
}

// Drops the sentence boundaries next to or inside an inline footnote or pagebreak, which `joinInsertions()` grouped.
function keepInsertionsWhole(
  text: string,
  boundaries: SentenceBoundary[],
  pieces: Piece[],
  ranges: { start: number; end: number }[],
): SentenceBoundary[] {
  const insertedAt = (pos: number) => isInserted(pieces[pieceIndexAt(ranges, pos)]);
  return mergeBoundaries(text, boundaries, (boundary, next) => insertedAt(boundary.contentEnd - 1) || insertedAt(next.start));
}

// The spans of the pieces `startIdx`..`endIdx` a sentence part reads, positioned in its own text.
function partSpans(
  pieces: Piece[],
  ranges: { start: number; end: number }[],
  boundary: { start: number; contentEnd: number },
  startIdx: number,
  endIdx: number,
  ctx: WalkContext,
): SourceSpan[] {
  const spans = joinedSpans(pieces.slice(startIdx, endIdx + 1), ranges.slice(startIdx, endIdx + 1), ctx);
  return sliceSpans(spans, boundary.start, boundary.contentEnd);
}

// The language a group is segmented in: its shared one, else its first own piece's.
function segmentationLanguage(pieces: Piece[], ctx: WalkContext): string {
  const shared = sharedLanguage(pieces, ctx);
  if (shared !== null) return shared ?? "en";
  return pieces.find((piece) => !isInserted(piece))?.language ?? pieces[0].language ?? "en";
}

type SentencePart = {
  boundary: SentenceBoundary;
  startIdx: number;
  endIdx: number;
  language: string | undefined;
  // Set on a sentence's last part only.
  sentenceEnd?: number;
  // An inline announcement split off its sentence, spoken as is.
  isolated: boolean;
};

// Splits a sentence into one part per run of pieces in a single language, e.g. around an inline announcement.
function languageParts(
  sentence: SentenceBoundary,
  pieces: Piece[],
  ranges: { start: number; end: number }[],
  joined: string,
  ctx: WalkContext,
): SentencePart[] {
  const startIdx = pieceIndexAt(ranges, sentence.start);
  const endIdx = sentence.end > sentence.start ? pieceIndexAt(ranges, sentence.end - 1) : startIdx;
  const runs = languageRuns(pieces.slice(startIdx, endIdx + 1), ctx);
  return runs.map(([runStart, runEnd], r) => {
    const first = startIdx + runStart;
    const last = startIdx + runEnd - 1;
    const isLast = r === runs.length - 1;
    const start = r === 0 ? sentence.start : ranges[first].start;
    const contentEnd = isLast ? sentence.contentEnd : ranges[last].end;
    const end = isLast ? sentence.end : ranges[last + 1].start;
    const language = runLanguage(pieces.slice(first, last + 1), ctx) ?? undefined;
    const boundary = { text: joined.slice(start, contentEnd), start, end, contentEnd };
    const isolated = runs.length > 1 && first === last && isInserted(pieces[first]);
    return { boundary, startIdx: first, endIdx: last, language, sentenceEnd: isLast ? sentence.end : undefined, isolated };
  });
}

// Resegments one merge group as its own self-contained text (so its final
// sentence has no trailing-separator artifact), mapping sentences back onto the piece(s) they span.
async function pushJoinedGroup(pieces: Piece[], ctx: WalkContext, newOut: Piece[], placedAfter: PlacedAfter): Promise<void> {
  const pieceSources = pieces.map((piece) => piece.source as GuidedNavigationObject);
  const spacing = pieces.map((piece) => piece.spacing);
  const language = segmentationLanguage(pieces, ctx);
  const suppressions = callerSuppressions(language, ctx);
  const join = () => {
    const plainParts = pieces.map((piece) => pieceText(piece, ctx));
    return { plainParts, ...joinPieceTexts(plainParts, spacing) };
  };
  let { plainParts, joined: joinedPlain, ranges } = join();
  let segmented: SentenceBoundary[];
  if (!pieces.some(isAlias)) segmented = await ctx.segmenter(language, joinedPlain, suppressions);
  else {
    const aliasSegmentation = await segmentAliasText(pieces, plainParts, language, suppressions, ctx);
    segmented = mapAliasBoundaries(aliasSegmentation, pieces, joinedPlain, ranges, ctx);
    if (punctuateSentenceEndingAliases(pieces, joinedPlain, ranges, segmented, ctx)) {
      ({ plainParts, joined: joinedPlain, ranges } = join());
      segmented = mapAliasBoundaries(aliasSegmentation, pieces, joinedPlain, ranges, ctx);
    }
  }
  const insertionsWhole = keepInsertionsWhole(joinedPlain, segmented, pieces, ranges);
  const boundaries =
    ctx.format === "ssml"
      ? keepUnrepeatableWhole(joinPieceSsml(pieces, pieces.map((piece) => piece.ssml ?? ""), plainParts, ranges), insertionsWhole)
      : insertionsWhole;

  const effectiveBoundaries =
    boundaries.length > 0
      ? boundaries
      : [{ text: joinedPlain, start: 0, end: joinedPlain.length, contentEnd: joinedPlain.length }];
  const parts = effectiveBoundaries.flatMap((boundary) => languageParts(boundary, pieces, ranges, joinedPlain, ctx));

  let ssmlFragments: string[] | undefined;
  let joinedSsml: string | undefined;
  if (ctx.format === "ssml") {
    const partLanguages = new Map<number, string | undefined>();
    for (const part of parts) for (let k = part.startIdx; k <= part.endIdx; k++) partLanguages.set(k, part.language);
    joinedSsml = joinPieceSsml(pieces, pieces.map((piece, k) => ssmlInLanguage(piece, partLanguages.get(k), ctx)), plainParts, ranges);
    const partBoundaries = parts.map((part) => part.boundary);
    ssmlFragments =
      parts.length > 1 ? await splitSsmlAtSentences(joinedSsml, language, async () => partBoundaries, suppressions) : undefined;
  }

  // A block-start piece flags only the first sentence reaching it, the one holding its start.
  const unclaimedBlockStarts = new Set(pieces.filter((piece) => piece.blockStart));
  const pushPlacedAfterSentence = (sentenceEnd: number | undefined, k: number) => {
    if (sentenceEnd === undefined) return;
    for (let i = 0; i < pieces.length; i++) {
      if (ranges[i].end <= sentenceEnd || k === parts.length - 1) pushPlacedAfter(placedAfter, i, newOut);
    }
  };
  parts.forEach(({ boundary, startIdx, endIdx, language: partLanguage, sentenceEnd, isolated }, k) => {
    if (isolated) {
      encloseOwnTags(pieces[startIdx]);
      newOut.push(pieces[startIdx]);
      pushPlacedAfterSentence(sentenceEnd, k);
      return;
    }
    const text = ctx.format === "ssml" ? (ssmlFragments ? ssmlFragments[k] : joinedSsml!) : boundary.text;
    const merged: Piece = { [ctx.format]: text };
    const mergedLanguage = ctx.language === "none" ? languageFor(undefined, ctx) : partLanguage ?? "en";
    if (mergedLanguage) merged.language = mergedLanguage;
    const claimed = pieces.slice(startIdx, endIdx + 1).filter((piece) => unclaimedBlockStarts.delete(piece));
    if (claimed.length > 0) merged.blockStart = true;
    setSpans(merged, partSpans(pieces, ranges, boundary, startIdx, endIdx, ctx));

    // Top-level `locate` is the whole first/last span, a convenience anchor
    // for consumers that don't need the per-element breakdown in `offsets`.
    // An inline footnote or pagebreak's own node is elsewhere, so it isn't an edge of that span.
    const ownIndices = [...Array(endIdx - startIdx + 1).keys()].map((i) => startIdx + i).filter((i) => !isInserted(pieces[i]));
    const firstIdx = ownIndices[0] ?? startIdx;
    const lastIdx = ownIndices[ownIndices.length - 1] ?? endIdx;
    const firstRef = resolveNodeLocate(pieceSources[firstIdx], ctx);
    const firstSource = pieceSources[firstIdx];
    const fallback =
      (isAriaSubstituted(firstSource) ? substitutedBareLocate(firstSource, ctx) : undefined) ?? preciseLocateFor(firstRef, plainOf(text, ctx.format));
    const locate =
      firstIdx !== lastIdx ? spanLocate(firstRef, resolveNodeLocate(pieceSources[lastIdx], ctx), fallback) : fallback;
    if (locate) merged.locate = locate;

    merged.source = firstIdx === lastIdx ? pieceSources[firstIdx] : [pieceSources[firstIdx], pieceSources[lastIdx]];
    newOut.push(merged);
    pushPlacedAfterSentence(sentenceEnd, k);
  });
}

// Expands a multi-sentence utterance into one per sentence, and with `reconstruct`,
// a sentence split across sibling GND nodes — only the piece boundaries a
// sentence genuinely reaches past get grouped and jointly resegmented.
export async function splitIntoSentenceUtterances(out: Piece[], ctx: WalkContext): Promise<Piece[]> {
  if (ctx.segmentation !== "sentence") return out;
  const newOut: Piece[] = [];
  let i = 0;
  while (i < out.length) {
    let j = i;
    while (j + 1 < out.length && canExtendRun(out[j], out[j + 1], ctx)) j++;
    if (j === i) {
      await pushSplitSingle(out[i], ctx, newOut);
      i = j + 1;
      continue;
    }
    const pieces: Piece[] = [];
    const placedAfter: PlacedAfter = new Map();
    for (let k = i; k <= j; k++) {
      if (!isPlacedAfter(out[k])) {
        pieces.push(out[k]);
      } else if (pieces.length === 0) {
        newOut.push(out[k]);
      } else {
        const index = pieces.length - 1;
        placedAfter.set(index, [...(placedAfter.get(index) ?? []), out[k]]);
      }
    }
    if (pieces.length === 0) {
      i = j + 1;
      continue;
    }
    const language = segmentationLanguage(pieces, ctx);
    const genuineJoins = await detectGenuineJoins(pieces, ctx, language, callerSuppressions(language, ctx));
    const joinedWithNext = joinInsertions(pieces, genuineJoins);
    let start = 0;
    for (let k = 0; k < pieces.length; k++) {
      if (k < pieces.length - 1 && joinedWithNext[k]) continue;
      if (start === k) {
        await pushSplitSingle(pieces[start], ctx, newOut);
        pushPlacedAfter(placedAfter, start, newOut);
      } else {
        const groupPlacedAfter: PlacedAfter = new Map();
        for (let g = start; g <= k; g++) if (placedAfter.has(g)) groupPlacedAfter.set(g - start, placedAfter.get(g)!);
        await pushJoinedGroup(pieces.slice(start, k + 1), ctx, newOut, groupPlacedAfter);
      }
      start = k + 1;
    }
    i = j + 1;
  }
  return newOut;
}
