import type { ReadiumSpeechUtterance } from "../utterance.js";
import { sharedLanguage } from "./language.js";
import { joinPieceTexts, pieceIndexAt, pieceSpacing, pieceText } from "./mergeUtterances.js";
import { callerSuppressions, type SentenceBoundary } from "./sentenceSegmenter.js";
import { pushMergedRuns } from "./utteranceOutput.js";
import { blockOf } from "./blocks.js";
import { aliasSpokenLength, recordAliasOffset } from "./boundaryLocate.js";
import type { SourceTrace, WalkContext } from "./walkContext.js";

export function isAlias(piece: ReadiumSpeechUtterance, ctx: WalkContext): boolean {
  return ctx.placeholderPieces.get(piece)?.placement === "alias";
}

// Segments the pieces' `joined` text as if each alias were its abbreviation (left out after it,
// replaced inline), mapping boundaries back so an alias stays in its abbreviation's sentence.
export async function segmentAroundAliases(
  pieces: ReadiumSpeechUtterance[],
  plainParts: string[],
  joined: string,
  ranges: { start: number; end: number }[],
  language: string,
  suppressions: string[] | undefined,
  ctx: WalkContext,
): Promise<SentenceBoundary[]> {
  return mapAliasBoundaries(await segmentAliasText(pieces, plainParts, language, suppressions, ctx), pieces, joined, ranges, ctx);
}

export type AliasSegmentation = { boundaries: SentenceBoundary[]; textRanges: { start: number; end: number }[]; included: number[] };

// Alias texts don't take part, so the result stays valid for the pieces once their aliases are punctuated.
export async function segmentAliasText(
  pieces: ReadiumSpeechUtterance[],
  plainParts: string[],
  language: string,
  suppressions: string[] | undefined,
  ctx: WalkContext,
): Promise<AliasSegmentation> {
  const included: number[] = [];
  const parts: string[] = [];
  plainParts.forEach((part, k) => {
    const text = isAlias(pieces[k], ctx) ? ctx.placeholderPieces.get(pieces[k])!.abbreviation : part;
    if (!text) return;
    included.push(k);
    parts.push(text);
  });
  const { joined: text, ranges: textRanges } = joinPieceTexts(parts, parts, pieceSpacing(included.map((k) => pieces[k]), ctx));
  return { boundaries: await ctx.segmenter(language, text, suppressions), textRanges, included };
}

export function mapAliasBoundaries(
  { boundaries: textBoundaries, textRanges, included }: AliasSegmentation,
  pieces: ReadiumSpeechUtterance[],
  joined: string,
  ranges: { start: number; end: number }[],
  ctx: WalkContext,
): SentenceBoundary[] {
  // A content end at or inside an alias's abbreviation is moved past the aliases following it.
  const toJoined = (pos: number, isContentEnd: boolean): number => {
    let i = pieceIndexAt(textRanges, pos);
    if (isContentEnd && i > 0 && pos === textRanges[i].start) i--;
    const k = included[i];
    const local = pos - textRanges[i].start;
    const length = textRanges[i].end - textRanges[i].start;
    if (local === 0 || (local < length && !isAlias(pieces[k], ctx))) return ranges[k].start + local;
    if (local > length && !isContentEnd) return i + 1 < included.length ? ranges[included[i + 1]].start : joined.length;
    let last = k;
    while (last + 1 < pieces.length && !included.includes(last + 1)) last++;
    return ranges[last].end;
  };
  const isInsideAlias = (pos: number): boolean => {
    const i = pieceIndexAt(textRanges, pos);
    const local = pos - textRanges[i].start;
    return isAlias(pieces[included[i]], ctx) && local > 0 && local < textRanges[i].end - textRanges[i].start;
  };
  const boundaries: SentenceBoundary[] = [];
  for (const boundary of textBoundaries) {
    const start = toJoined(boundary.start, false);
    const contentEnd = Math.max(start, toJoined(boundary.contentEnd, true));
    const end = Math.max(contentEnd, toJoined(boundary.end, false));
    const previous = boundaries[boundaries.length - 1];
    // An alias is never cut, so a sentence starting inside one continues the sentence holding the alias.
    if (previous && isInsideAlias(boundary.start)) {
      previous.contentEnd = Math.max(previous.contentEnd, contentEnd);
      previous.end = Math.max(previous.end, end);
      previous.text = joined.slice(previous.start, previous.contentEnd);
    } else boundaries.push({ text: joined.slice(start, contentEnd), start, end, contentEnd });
  }
  return boundaries;
}

const sentenceTerminal = /\p{Sentence_Terminal}$/u;
// What may follow a sentence's last word before its end: a quote mark there can only close, whichever way the language writes it.
const sentenceClosing = /^[\s\p{Pe}\p{Pf}\p{Pi}"']*$/u;

export function endsWithSentenceTerminator(text: string): boolean {
  return sentenceTerminal.test(text);
}

// An inline alias ending a sentence keeps its abbreviation's final sentence terminator (e.g. "W.H.O."), which also ended the sentence.
export function punctuateSentenceEndingAliases(
  pieces: ReadiumSpeechUtterance[],
  joined: string,
  ranges: { start: number; end: number }[],
  boundaries: SentenceBoundary[],
  ctx: WalkContext,
): boolean {
  let punctuated = false;
  pieces.forEach((piece, k) => {
    if (!isAlias(piece, ctx)) return;
    const terminal = ctx.placeholderPieces.get(piece)!.abbreviation?.match(sentenceTerminal)?.[0];
    if (!terminal) return;
    const { start, end } = ranges[k];
    if (!boundaries.some((boundary) => boundary.start < end && boundary.contentEnd >= end && sentenceClosing.test(joined.slice(end, boundary.contentEnd)))) return;
    if (sentenceTerminal.test(joined.slice(start, end))) return;
    if (piece.plain !== undefined) piece.plain += terminal;
    if (piece.ssml !== undefined) piece.ssml += terminal;
    for (const offset of piece.offsets ?? []) {
      const spokenLength = aliasSpokenLength(offset);
      if (spokenLength !== undefined) recordAliasOffset(offset, spokenLength + terminal.length);
    }
    punctuated = true;
  });
  return punctuated;
}

// An inline alias read as its own sentence ends it with its abbreviation's final terminator.
export function punctuateLoneAlias(piece: ReadiumSpeechUtterance, ctx: WalkContext): void {
  const text = pieceText(piece, ctx);
  const range = { start: 0, end: text.length };
  punctuateSentenceEndingAliases([piece], text, [range], [{ text, ...range, contentEnd: text.length }], ctx);
}

// Without sentence segmentation, merges each node's pieces the walk left unmerged, once its inline aliases are punctuated.
export async function mergeAliasPieces(
  out: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  ctx: WalkContext,
): Promise<{ out: ReadiumSpeechUtterance[]; sources: SourceTrace }> {
  const newOut: ReadiumSpeechUtterance[] = [];
  const newSources: SourceTrace = [];
  let i = 0;
  while (i < out.length) {
    const node = ctx.placeholderPieces.get(out[i])?.node;
    if (!node) {
      newOut.push(out[i]);
      newSources.push(sources[i]);
      i++;
      continue;
    }
    let j = i;
    while (j + 1 < out.length && ctx.placeholderPieces.get(out[j + 1])?.node === node) j++;
    const pieces = out.slice(i, j + 1);
    const pieceSources = sources.slice(i, j + 1);
    const shared = sharedLanguage(pieces, ctx);
    const language = (shared === null ? pieces[0].language : shared) ?? "en";
    // The text following the node in its block tells whether a sentence ending the node's own text goes on past it.
    const block = blockOf(node, "trailing", ctx);
    const segmented = j + 1 < out.length && block && blockOf(sources[j + 1], "leading", ctx) === block ? [...pieces, out[j + 1]] : pieces;
    const plainParts = segmented.map((piece) => pieceText(piece, ctx));
    const { joined, ranges } = joinPieceTexts(plainParts, plainParts, pieceSpacing(segmented, ctx));
    const boundaries = await segmentAroundAliases(segmented, plainParts, joined, ranges, language, callerSuppressions(language, ctx), ctx);
    punctuateSentenceEndingAliases(pieces, joined, ranges, boundaries, ctx);
    pushMergedRuns(newOut, newSources, ctx, node, pieces, pieceSources);
    i = j + 1;
  }
  return { out: newOut, sources: newSources };
}
