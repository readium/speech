import type { GuidedNavigationObject } from "@readium/shared";
import { isAriaSubstituted, type GndRole } from "@readium/guided-navigation";
import type { ReadiumSpeechUtterance, UtteranceOffset } from "../utterance.js";
import { entriesForLanguage } from "../utils/language.js";
import { languageFor, languageRuns, runLanguage, sameLanguage, sharedLanguage, ssmlInLanguage } from "./language.js";
import { nodeRoles } from "./nodeFields.js";
import { splitSsmlAtSentences } from "./splitSsmlAtSentences.js";
import { buildMergeOffsets, joinPieceTexts, plainOf, substitutedBareLocate } from "./mergeUtterances.js";
import { preciseLocateFor, resolveNodeLocate, spanLocate, subLocateFor } from "./locate.js";
import { segmentSentences, suppressionLanguage, type SentenceBoundary } from "./sentenceSegmenter.js";
import { blockLevelRoleSet, type SourceTrace, type WalkContext } from "./walkContext.js";

// The caller's suppressions for `language`, in English when the built-in segmenter falls back to it; a caller's segmenter gets its input language's.
function callerSuppressions(language: string, ctx: WalkContext): string[] | undefined {
  const lookup = ctx.segmenter === segmentSentences ? suppressionLanguage(language) : language;
  return entriesForLanguage(ctx.segmentationSuppressions, lookup);
}

// Resolves a non-synthetic utterance into per-sentence fragments (`undefined`
// if there's only one), falling back to English when it has no language.
// `start`/`end` are positions in the node's own source text (the plain
// projection, even for SSML), not in the fragment's own text.
async function sentenceFragmentsOf(
  utterance: ReadiumSpeechUtterance,
  ctx: WalkContext,
): Promise<{ text: string; start: number; end: number }[] | undefined> {
  const language = utterance.language ?? "en";
  const customSuppressions = callerSuppressions(language, ctx);
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

function rolesOf(source: GuidedNavigationObject | [GuidedNavigationObject, GuidedNavigationObject] | undefined): GndRole[] {
  if (!source) return [];
  return nodeRoles(Array.isArray(source) ? source[1] : source);
}

function edgeNode(source: GuidedNavigationObject | [GuidedNavigationObject, GuidedNavigationObject], edge: "leading" | "trailing"): GuidedNavigationObject {
  return Array.isArray(source) ? source[edge === "leading" ? 0 : 1] : source;
}

// Ancestors carrying a semantic role, at the given edge of a source; unroled and
// `presentation` wrappers (e.g. fixed-layout `<div>`s, layout tables) are not boundaries.
function roledAncestors(source: GuidedNavigationObject | [GuidedNavigationObject, GuidedNavigationObject], edge: "leading" | "trailing", ctx: WalkContext): GuidedNavigationObject[] {
  const node = edgeNode(source, edge);
  return (ctx.ancestorChains.get(node) ?? []).filter((ancestor) => nodeRoles(ancestor).some((role) => role !== "presentation"));
}

// The nearest block-level node holding a source's leading/trailing edge, itself included.
function blockOf(source: GuidedNavigationObject | [GuidedNavigationObject, GuidedNavigationObject], edge: "leading" | "trailing", ctx: WalkContext) {
  const node = edgeNode(source, edge);
  return [node, ...(ctx.ancestorChains.get(node) ?? [])].find((n) => nodeRoles(n).some((role) => blockLevelRoleSet.has(role)));
}

function sameRoledContainers(a: GuidedNavigationObject[], b: GuidedNavigationObject[]): boolean {
  return a.length === b.length && a.every((ancestor, i) => ancestor === b[i]);
}

// Whether `utterance`'s leading/trailing text is an aria substitution rather
// than real prose — such text must never join into a neighbor.
function isSubstitutedEdge(
  source: SourceTrace[number],
  utterance: ReadiumSpeechUtterance,
  edge: "leading" | "trailing",
  ctx: WalkContext,
): boolean {
  const locate = ctx.edgeSubstitutedLocate.get(utterance)?.[edge];
  if (locate && !ctx.aliasLocates.has(locate)) return true;
  return !!source && !Array.isArray(source) && isAriaSubstituted(source);
}

function isInserted(piece: ReadiumSpeechUtterance, ctx: WalkContext): boolean {
  return ctx.placeholderPieces.get(piece)?.placement === "inline";
}

function isAlias(piece: ReadiumSpeechUtterance, ctx: WalkContext): boolean {
  return ctx.placeholderPieces.get(piece)?.placement === "alias";
}

function isPlacedAfter(piece: ReadiumSpeechUtterance, ctx: WalkContext): boolean {
  return ctx.placeholderPieces.get(piece)?.placement === "after";
}

// Pieces placed after the sentence holding the end of the piece they follow, keyed by that piece's index.
type PlacedAfter = Map<number, { piece: ReadiumSpeechUtterance; source: SourceTrace[number] }[]>;

function pushPlacedAfter(placedAfter: PlacedAfter, index: number, newOut: ReadiumSpeechUtterance[], newSources: SourceTrace): void {
  for (const { piece, source } of placedAfter.get(index) ?? []) {
    newOut.push(piece);
    newSources.push(source);
  }
  placedAfter.delete(index);
}

// Pieces of one sentence around an inline footnote or pagebreak (see `placeholderPieces`).
function isSamePlaceholderSentence(prev: ReadiumSpeechUtterance, next: ReadiumSpeechUtterance, ctx: WalkContext): boolean {
  const prevNode = ctx.placeholderPieces.get(prev)?.node;
  return prevNode !== undefined && prevNode === ctx.placeholderPieces.get(next)?.node;
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
  const prevText = ctx.format === "ssml" ? prev.ssml : prev.plain;
  const nextText = ctx.format === "ssml" ? next.ssml : next.plain;
  if (!prevText || !nextText) return false;
  if (isSamePlaceholderSentence(prev, next, ctx)) return true;
  if (!sameLanguage(prev.language ?? "en", next.language ?? "en")) return false;
  if (ctx.synthetic.has(prev) || ctx.synthetic.has(next)) return false;
  if (!prevSource || !nextSource) return false;
  if (!ctx.segmentationReconstruct && blockOf(prevSource, "trailing", ctx) !== blockOf(nextSource, "leading", ctx)) return false;
  if (rolesOf(prevSource).some((role) => neverJoinRoles.has(role))) return false;
  if (rolesOf(nextSource).some((role) => neverJoinRoles.has(role))) return false;
  if (!sameRoledContainers(roledAncestors(prevSource, "trailing", ctx), roledAncestors(nextSource, "leading", ctx))) return false;
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
  const nodeOwnSubstitutedLocate = node && isAriaSubstituted(node) ? substitutedBareLocate(node, ctx) : undefined;
  const edges = ctx.edgeSubstitutedLocate.get(utterance);
  fragments.forEach(({ text: fragment, start, end }, k) => {
    const split: ReadiumSpeechUtterance = { ...utterance, [ctx.format]: fragment };
    const substitutedLocate =
      (k === 0 ? edges?.leading : undefined) ??
      (k === fragments.length - 1 ? edges?.trailing : undefined) ??
      nodeOwnSubstitutedLocate;
    if (substitutedLocate && nodeRef) {
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

// An inline footnote or pagebreak never ends a sentence: it continues the one it interrupts,
// closes the one ending right before it, or opens the next.
function joinInsertions(pieces: ReadiumSpeechUtterance[], joinedWithNext: boolean[], ctx: WalkContext): boolean[] {
  const joined = [...joinedWithNext];
  pieces.forEach((piece, k) => {
    if (!isInserted(piece, ctx)) return;
    const hasPrev = k > 0 && isSamePlaceholderSentence(pieces[k - 1], piece, ctx);
    const hasNext = k < pieces.length - 1 && isSamePlaceholderSentence(piece, pieces[k + 1], ctx);
    if (hasPrev && !joined[k - 1]) joined[k - 1] = true;
    else if (hasNext) joined[k] = true;
  });
  return joined;
}

// Drops the sentence boundaries next to or inside an inline footnote or pagebreak, which `joinInsertions()` grouped,
// and those inside an abbreviation alias.
function keepInsertionsWhole(
  text: string,
  boundaries: SentenceBoundary[],
  pieces: ReadiumSpeechUtterance[],
  ranges: { start: number; end: number }[],
  ctx: WalkContext,
): SentenceBoundary[] {
  const insertedAt = (pos: number) => isInserted(pieces[pieceIndexAt(ranges, pos)], ctx);
  const sameAliasAt = (a: number, b: number) => pieceIndexAt(ranges, a) === pieceIndexAt(ranges, b) && isAlias(pieces[pieceIndexAt(ranges, a)], ctx);
  const kept: SentenceBoundary[] = [];
  let first: SentenceBoundary | undefined;
  boundaries.forEach((boundary, k) => {
    first ??= boundary;
    const next = boundaries[k + 1];
    if (next && (insertedAt(boundary.contentEnd - 1) || insertedAt(next.start) || sameAliasAt(boundary.contentEnd - 1, next.start))) return;
    kept.push({ text: text.slice(first.start, boundary.contentEnd), start: first.start, end: boundary.end, contentEnd: boundary.contentEnd });
    first = undefined;
  });
  return kept;
}

// `start`/`end` are positions in each contributing node's own source text.
// Always quote-scoped, so a consumer can relocate a piece within spoken text by content.
function buildJoinedOffsets(
  pieces: ReadiumSpeechUtterance[],
  pieceSources: GuidedNavigationObject[],
  ranges: { start: number; end: number }[],
  boundary: { start: number; end: number; contentEnd: number },
  startIdx: number,
  endIdx: number,
  ctx: WalkContext,
): UtteranceOffset[] {
  const offsets: UtteranceOffset[] = [];
  for (let k = startIdx; k <= endIdx; k++) {
    // Never cut (see `keepInsertionsWhole()`), so its own offsets still hold.
    if (isInserted(pieces[k], ctx) || isAlias(pieces[k], ctx)) {
      offsets.push(...buildMergeOffsets([pieces[k]], [pieceSources[k]], ctx));
      continue;
    }
    const nodeRef = resolveNodeLocate(pieceSources[k], ctx.ancestorChains);
    if (!nodeRef) continue;
    const pieceRange = ranges[k];
    const substitutedLocate = isAriaSubstituted(pieceSources[k]) ? substitutedBareLocate(pieceSources[k], ctx) : undefined;
    const contribStart = Math.max(pieceRange.start, boundary.start);
    // Only the last piece a sentence touches can carry its trailing separator; trim there only.
    const contribEnd = Math.min(pieceRange.end, k === endIdx ? boundary.contentEnd : boundary.end);
    if (contribEnd <= contribStart) continue;
    const localStart = contribStart - pieceRange.start;
    const localEnd = contribEnd - pieceRange.start;
    const text = plainOf((ctx.format === "ssml" ? pieces[k].ssml : pieces[k].plain)!, ctx.format);
    const locate = substitutedLocate ?? subLocateFor(nodeRef.ref, text.slice(localStart, localEnd));
    if (!substitutedLocate && localStart > 0) locate.text = { ...locate.text, before: text.slice(0, localStart) };
    if (!substitutedLocate && localEnd < text.length) locate.text = { ...locate.text, after: text.slice(localEnd) };
    offsets.push({ start: localStart, end: localEnd, locate });
  }
  return offsets;
}

// The language a group is segmented in: its shared one, else its first own piece's.
function segmentationLanguage(pieces: ReadiumSpeechUtterance[], ctx: WalkContext): string {
  const shared = sharedLanguage(pieces, ctx);
  if (shared !== null) return shared ?? "en";
  return pieces.find((piece) => !isInserted(piece, ctx))?.language ?? pieces[0].language ?? "en";
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
  pieces: ReadiumSpeechUtterance[],
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
    const isolated = runs.length > 1 && first === last && isInserted(pieces[first], ctx);
    return { boundary, startIdx: first, endIdx: last, language, sentenceEnd: isLast ? sentence.end : undefined, isolated };
  });
}

// Resegments one merge group as its own self-contained text (so its final
// sentence has no trailing-separator artifact), mapping sentences back onto the piece(s) they span.
async function pushJoinedGroup(
  pieces: ReadiumSpeechUtterance[],
  pieceSources: GuidedNavigationObject[],
  ctx: WalkContext,
  newOut: ReadiumSpeechUtterance[],
  newSources: SourceTrace,
  placedAfter: PlacedAfter,
): Promise<void> {
  const language = segmentationLanguage(pieces, ctx);
  const suppressions = callerSuppressions(language, ctx);
  const plainParts = pieces.map((piece) => plainOf((ctx.format === "ssml" ? piece.ssml : piece.plain)!, ctx.format));
  const { joined: joinedPlain, ranges } = joinPieceTexts(plainParts);
  const boundaries = keepInsertionsWhole(joinedPlain, await ctx.segmenter(language, joinedPlain, suppressions), pieces, ranges, ctx);

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
    joinedSsml = joinPieceTexts(pieces.map((piece, k) => ssmlInLanguage(piece, partLanguages.get(k), ctx)), plainParts).joined;
    const partBoundaries = parts.map((part) => part.boundary);
    ssmlFragments =
      parts.length > 1 ? await splitSsmlAtSentences(joinedSsml, language, async () => partBoundaries, suppressions) : undefined;
  }

  // A block-start piece flags only the first sentence reaching it, the one holding its start.
  const unclaimedBlockStarts = new Set(pieces.filter((piece) => ctx.blockStarts.has(piece)));
  const pushPlacedAfterSentence = (sentenceEnd: number | undefined, k: number) => {
    if (sentenceEnd === undefined) return;
    for (let i = 0; i < pieces.length; i++) {
      if (ranges[i].end <= sentenceEnd || k === parts.length - 1) pushPlacedAfter(placedAfter, i, newOut, newSources);
    }
  };
  parts.forEach(({ boundary, startIdx, endIdx, language: partLanguage, sentenceEnd, isolated }, k) => {
    if (isolated) {
      newOut.push(pieces[startIdx]);
      newSources.push(pieceSources[startIdx]);
      pushPlacedAfterSentence(sentenceEnd, k);
      return;
    }
    const text = ctx.format === "ssml" ? (ssmlFragments ? ssmlFragments[k] : joinedSsml!) : boundary.text;
    const merged: ReadiumSpeechUtterance = { [ctx.format]: text };
    const mergedLanguage = ctx.language === "none" ? languageFor(undefined, ctx) : partLanguage ?? "en";
    if (mergedLanguage) merged.language = mergedLanguage;
    const claimed = pieces.slice(startIdx, endIdx + 1).filter((piece) => unclaimedBlockStarts.delete(piece));
    if (claimed.length > 0) ctx.blockStarts.add(merged);
    const offsets = buildJoinedOffsets(pieces, pieceSources, ranges, boundary, startIdx, endIdx, ctx);
    if (offsets.length > 0) merged.offsets = offsets;

    // Top-level `locate` is the whole first/last span, a convenience anchor
    // for consumers that don't need the per-element breakdown in `offsets`.
    // An inline footnote or pagebreak's own node is elsewhere, so it isn't an edge of that span.
    const ownIndices = [...Array(endIdx - startIdx + 1).keys()].map((i) => startIdx + i).filter((i) => !isInserted(pieces[i], ctx));
    const firstIdx = ownIndices[0] ?? startIdx;
    const lastIdx = ownIndices[ownIndices.length - 1] ?? endIdx;
    const firstRef = resolveNodeLocate(pieceSources[firstIdx], ctx.ancestorChains);
    const firstSource = pieceSources[firstIdx];
    const fallback =
      (isAriaSubstituted(firstSource) ? substitutedBareLocate(firstSource, ctx) : undefined) ?? preciseLocateFor(firstRef, text);
    const locate =
      firstIdx !== lastIdx ? spanLocate(firstRef, resolveNodeLocate(pieceSources[lastIdx], ctx.ancestorChains), fallback) : fallback;
    if (locate) merged.locate = locate;

    newOut.push(merged);
    newSources.push(firstIdx === lastIdx ? pieceSources[firstIdx] : [pieceSources[firstIdx], pieceSources[lastIdx]]);
    pushPlacedAfterSentence(sentenceEnd, k);
  });
}

// Expands a multi-sentence utterance into one per sentence, and with `reconstruct`,
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
    const pieces: ReadiumSpeechUtterance[] = [];
    const pieceSources: GuidedNavigationObject[] = [];
    const placedAfter: PlacedAfter = new Map();
    for (let k = i; k <= j; k++) {
      if (!isPlacedAfter(out[k], ctx)) {
        pieces.push(out[k]);
        pieceSources.push(sources[k] as GuidedNavigationObject);
      } else if (pieces.length === 0) {
        newOut.push(out[k]);
        newSources.push(sources[k]);
      } else {
        const index = pieces.length - 1;
        placedAfter.set(index, [...(placedAfter.get(index) ?? []), { piece: out[k], source: sources[k] }]);
      }
    }
    if (pieces.length === 0) {
      i = j + 1;
      continue;
    }
    const language = segmentationLanguage(pieces, ctx);
    const genuineJoins = await detectGenuineJoins(pieces, ctx, language, callerSuppressions(language, ctx));
    const joinedWithNext = joinInsertions(pieces, genuineJoins, ctx);
    let start = 0;
    for (let k = 0; k < pieces.length; k++) {
      if (k < pieces.length - 1 && joinedWithNext[k]) continue;
      if (start === k) {
        await pushSplitSingle(pieces[start], pieceSources[start], ctx, newOut, newSources);
        pushPlacedAfter(placedAfter, start, newOut, newSources);
      } else {
        const groupPlacedAfter: PlacedAfter = new Map();
        for (let g = start; g <= k; g++) if (placedAfter.has(g)) groupPlacedAfter.set(g - start, placedAfter.get(g)!);
        await pushJoinedGroup(pieces.slice(start, k + 1), pieceSources.slice(start, k + 1), ctx, newOut, newSources, groupPlacedAfter);
      }
      start = k + 1;
    }
    i = j + 1;
  }
  return { out: newOut, sources: newSources };
}
