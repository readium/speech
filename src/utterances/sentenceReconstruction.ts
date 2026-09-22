import type { GndObject, GndRole } from "../gnd/types.js";
import { ariaSubstitutedNodes } from "../gnd/object.js";
import type { ReadiumSpeechUtterance, UtteranceOffset } from "../utterance.js";
import { splitSsmlAtSentences } from "./splitSsmlAtSentences.js";
import { joinPieceTexts, plainOf, substitutedBareLocate } from "./mergeUtterances.js";
import { preciseLocateFor, resolveNodeLocate, spanLocate, subLocateFor } from "./locate.js";
import type { SourceTrace, WalkContext } from "./walkContext.js";

// Resolves a non-synthetic utterance into per-sentence fragments (`undefined`
// if there's only one), falling back to English when it has no language.
// `start`/`end` are positions in the node's own source text (the plain
// projection, even for SSML), not in the fragment's own text.
async function sentenceFragmentsOf(
  utterance: ReadiumSpeechUtterance,
  ctx: WalkContext,
): Promise<{ text: string; start: number; end: number }[] | undefined> {
  const language = utterance.language ?? "en";
  const customSuppressions = ctx.segmentationSuppressions[language];
  const sourceText = ctx.format === "ssml" ? utterance.ssml : utterance.plain;
  if (!sourceText) return undefined;
  const boundaries = await ctx.segmenter(language, plainOf(sourceText, ctx.format), customSuppressions);
  if (boundaries.length <= 1) return undefined;
  if (ctx.format !== "ssml") return boundaries.map((b) => ({ text: b.text, start: b.start, end: b.contentEnd }));
  const ssmlFragments = await splitSsmlAtSentences(sourceText, language, ctx.segmenter, customSuppressions);
  if (!ssmlFragments) return undefined;
  return boundaries.map((b, i) => ({ text: ssmlFragments[i], start: b.start, end: b.contentEnd }));
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

function rolesOf(source: GndObject | [GndObject, GndObject] | undefined): GndRole[] {
  if (!source) return [];
  return (Array.isArray(source) ? source[1] : source).role ?? [];
}

// Whether `utterance`'s leading/trailing text is an aria substitution rather
// than real prose — such text must never join into a neighbor.
function isSubstitutedEdge(
  source: SourceTrace[number],
  utterance: ReadiumSpeechUtterance,
  edge: "leading" | "trailing",
  ctx: WalkContext,
): boolean {
  if (ctx.edgeSubstitutedLocate.get(utterance)?.[edge]) return true;
  return !!source && !Array.isArray(source) && ariaSubstitutedNodes.has(source);
}

// Whether `next` may join `prev`'s run for sentence-boundary detection —
// structural eligibility only; the segmenter itself (run against the whole
// run's joined text) decides where sentences actually fall.
function canExtendRun(
  prev: ReadiumSpeechUtterance,
  prevSource: SourceTrace[number],
  next: ReadiumSpeechUtterance,
  nextSource: SourceTrace[number],
  ctx: WalkContext,
): boolean {
  if (ctx.synthetic.has(prev) || ctx.synthetic.has(next)) return false;
  if (!prevSource || !nextSource) return false;
  const prevText = ctx.format === "ssml" ? prev.ssml : prev.plain;
  const nextText = ctx.format === "ssml" ? next.ssml : next.plain;
  if (!prevText || !nextText) return false;
  if ((prev.language ?? "en") !== (next.language ?? "en")) return false;
  if (rolesOf(prevSource).some((role) => neverJoinRoles.has(role))) return false;
  if (rolesOf(nextSource).some((role) => neverJoinRoles.has(role))) return false;
  if (isSubstitutedEdge(prevSource, prev, "trailing", ctx)) return false;
  if (isSubstitutedEdge(nextSource, next, "leading", ctx)) return false;
  return true;
}

// Splits one utterance on its own sentence boundaries, independent of any
// neighboring piece.
async function pushSplitSingle(
  utterance: ReadiumSpeechUtterance,
  source: SourceTrace[number],
  ctx: WalkContext,
  newOut: ReadiumSpeechUtterance[],
  newSources: SourceTrace,
): Promise<void> {
  const fragments = ctx.synthetic.has(utterance) ? undefined : await sentenceFragmentsOf(utterance, ctx);
  if (!fragments) {
    newOut.push(utterance);
    newSources.push(source);
    return;
  }
  const wasBlockStart = ctx.blockStarts.has(utterance);
  if (wasBlockStart) ctx.blockStarts.delete(utterance);
  const node = Array.isArray(source) ? undefined : source;
  const nodeRef = node ? resolveNodeLocate(node, ctx.ancestorChains) : undefined;
  const nodeOwnSubstitutedLocate = node && ariaSubstitutedNodes.has(node) ? substitutedBareLocate(node, ctx) : undefined;
  const edges = ctx.edgeSubstitutedLocate.get(utterance);
  fragments.forEach(({ text: fragment, start, end }, k) => {
    const split: ReadiumSpeechUtterance = { ...utterance, [ctx.format]: fragment };
    const substitutedLocate =
      (k === 0 ? edges?.leading : undefined) ??
      (k === fragments.length - 1 ? edges?.trailing : undefined) ??
      nodeOwnSubstitutedLocate;
    if (substitutedLocate) {
      split.locate = substitutedLocate;
      split.offsets = [{ start, end, locate: substitutedLocate }];
    } else if (nodeRef) {
      const quoteText = ctx.format === "ssml" ? plainOf(fragment, ctx.format) : fragment;
      const locate = subLocateFor(nodeRef.ref, quoteText);
      split.locate = locate;
      split.offsets = [{ start, end, locate }];
    }
    if (wasBlockStart && k === 0) ctx.blockStarts.add(split);
    newOut.push(split);
    newSources.push(source);
  });
}

// Which piece index a position in a joined string falls in — a position
// exactly on a piece boundary (the separator) attributes to the earlier piece.
function pieceIndexAt(ranges: { start: number; end: number }[], pos: number): number {
  let idx = 0;
  while (idx < ranges.length - 1 && ranges[idx + 1].start <= pos) idx++;
  return idx;
}

// For each gap between consecutive pieces, whether a sentence boundary
// genuinely reaches into the next piece's own text, vs. merely absorbing the
// separator — which would otherwise make an unrelated final sentence look joined.
async function detectGenuineJoins(
  pieces: ReadiumSpeechUtterance[],
  ctx: WalkContext,
  language: string,
  suppressions: string[] | undefined,
): Promise<boolean[]> {
  const plainParts = pieces.map((piece) => plainOf((ctx.format === "ssml" ? piece.ssml : piece.plain)!, ctx.format));
  const { joined, ranges } = joinPieceTexts(plainParts);
  const boundaries = await ctx.segmenter(language, joined, suppressions);
  const joinedWithNext = new Array<boolean>(pieces.length - 1).fill(false);
  for (const boundary of boundaries) {
    const startIdx = pieceIndexAt(ranges, boundary.start);
    // Last real character, not the exclusive end — a trailing separator alone shouldn't count.
    const endIdx = boundary.end > boundary.start ? pieceIndexAt(ranges, boundary.end - 1) : startIdx;
    for (let k = startIdx; k < endIdx; k++) joinedWithNext[k] = true;
  }
  return joinedWithNext;
}

// `start`/`end` are positions in each contributing node's own source text.
// Always quote-scoped, so a consumer can relocate a piece within spoken text by content.
function buildJoinedOffsets(
  pieces: ReadiumSpeechUtterance[],
  pieceSources: GndObject[],
  ranges: { start: number; end: number }[],
  boundary: { start: number; end: number; contentEnd: number },
  startIdx: number,
  endIdx: number,
  ctx: WalkContext,
): UtteranceOffset[] {
  const offsets: UtteranceOffset[] = [];
  for (let k = startIdx; k <= endIdx; k++) {
    const nodeRef = resolveNodeLocate(pieceSources[k], ctx.ancestorChains);
    if (!nodeRef) continue;
    const pieceRange = ranges[k];
    const contribStart = Math.max(pieceRange.start, boundary.start);
    // Only the last piece a sentence touches can carry its trailing separator; trim there only.
    const contribEnd = Math.min(pieceRange.end, k === endIdx ? boundary.contentEnd : boundary.end);
    if (contribEnd <= contribStart) continue;
    const localStart = contribStart - pieceRange.start;
    const localEnd = contribEnd - pieceRange.start;
    const text = plainOf((ctx.format === "ssml" ? pieces[k].ssml : pieces[k].plain)!, ctx.format);
    const locate = subLocateFor(nodeRef.ref, text.slice(localStart, localEnd));
    offsets.push({ start: localStart, end: localEnd, locate });
  }
  return offsets;
}

// Resegments one merge group as its own self-contained text (so its final
// sentence has no trailing-separator artifact), mapping sentences back onto the piece(s) they span.
async function pushJoinedGroup(
  pieces: ReadiumSpeechUtterance[],
  pieceSources: GndObject[],
  ctx: WalkContext,
  newOut: ReadiumSpeechUtterance[],
  newSources: SourceTrace,
): Promise<void> {
  const language = pieces[0].language ?? "en";
  const suppressions = ctx.segmentationSuppressions[language];
  const plainParts = pieces.map((piece) => plainOf((ctx.format === "ssml" ? piece.ssml : piece.plain)!, ctx.format));
  const { joined: joinedPlain, ranges } = joinPieceTexts(plainParts);
  const boundaries = await ctx.segmenter(language, joinedPlain, suppressions);

  let ssmlFragments: string[] | undefined;
  let joinedSsml: string | undefined;
  if (ctx.format === "ssml") {
    joinedSsml = joinPieceTexts(pieces.map((piece) => piece.ssml!)).joined;
    ssmlFragments =
      boundaries.length > 1 ? await splitSsmlAtSentences(joinedSsml, language, ctx.segmenter, suppressions) : undefined;
  }

  const effectiveBoundaries =
    boundaries.length > 0
      ? boundaries
      : [{ text: joinedPlain, start: 0, end: joinedPlain.length, contentEnd: joinedPlain.length }];

  effectiveBoundaries.forEach((boundary, k) => {
    const startIdx = pieceIndexAt(ranges, boundary.start);
    const endIdx = boundary.end > boundary.start ? pieceIndexAt(ranges, boundary.end - 1) : startIdx;
    const text = ctx.format === "ssml" ? (ssmlFragments ? ssmlFragments[k] : joinedSsml!) : boundary.text;
    const merged: ReadiumSpeechUtterance = { [ctx.format]: text };
    if (language) merged.language = language;
    const wasBlockStart = pieces.slice(startIdx, endIdx + 1).some((piece) => ctx.blockStarts.has(piece));
    if (wasBlockStart) ctx.blockStarts.add(merged);
    const offsets = buildJoinedOffsets(pieces, pieceSources, ranges, boundary, startIdx, endIdx, ctx);
    if (offsets.length > 0) merged.offsets = offsets;

    // Top-level `locate` is the whole first/last span, a convenience anchor
    // for consumers that don't need the per-element breakdown in `offsets`.
    const firstRef = resolveNodeLocate(pieceSources[startIdx], ctx.ancestorChains);
    const fallback = preciseLocateFor(firstRef, text);
    const locate =
      startIdx !== endIdx ? spanLocate(firstRef, resolveNodeLocate(pieceSources[endIdx], ctx.ancestorChains), fallback) : fallback;
    if (locate) merged.locate = locate;

    newOut.push(merged);
    newSources.push(startIdx === endIdx ? pieceSources[startIdx] : [pieceSources[startIdx], pieceSources[endIdx]]);
  });
}

// Expands a multi-sentence utterance into one per sentence, and reconstructs
// a sentence split across sibling GND nodes — only the piece boundaries a
// sentence genuinely reaches past get grouped and jointly resegmented.
export async function splitIntoSentenceUtterances(
  out: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  ctx: WalkContext,
): Promise<{ out: ReadiumSpeechUtterance[]; sources: SourceTrace }> {
  if (ctx.segmentation !== "sentence") return { out, sources };
  const newOut: ReadiumSpeechUtterance[] = [];
  const newSources: SourceTrace = [];
  let i = 0;
  while (i < out.length) {
    let j = i;
    while (j + 1 < out.length && canExtendRun(out[j], sources[j], out[j + 1], sources[j + 1], ctx)) j++;
    if (j === i) {
      await pushSplitSingle(out[i], sources[i], ctx, newOut, newSources);
      i = j + 1;
      continue;
    }
    const pieces = out.slice(i, j + 1);
    const pieceSources = sources.slice(i, j + 1) as GndObject[];
    const language = pieces[0].language ?? "en";
    const joinedWithNext = await detectGenuineJoins(pieces, ctx, language, ctx.segmentationSuppressions[language]);
    let start = 0;
    for (let k = 0; k < pieces.length; k++) {
      if (k < pieces.length - 1 && joinedWithNext[k]) continue;
      if (start === k) {
        await pushSplitSingle(pieces[start], pieceSources[start], ctx, newOut, newSources);
      } else {
        await pushJoinedGroup(pieces.slice(start, k + 1), pieceSources.slice(start, k + 1), ctx, newOut, newSources);
      }
      start = k + 1;
    }
    i = j + 1;
  }
  return { out: newOut, sources: newSources };
}
