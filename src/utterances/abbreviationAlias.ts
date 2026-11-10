import type { ReadiumSpeechUtterance } from "../utterance.js";
import { joinPieceTexts, pieceIndexAt } from "./mergeUtterances.js";
import type { SentenceBoundary } from "./sentenceSegmenter.js";
import type { WalkContext } from "./walkContext.js";

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
  const included: number[] = [];
  const parts: string[] = [];
  plainParts.forEach((part, k) => {
    const text = isAlias(pieces[k], ctx) ? ctx.placeholderPieces.get(pieces[k])!.abbreviation : part;
    if (!text) return;
    included.push(k);
    parts.push(text);
  });
  const touching = included.map((k) => ctx.touchingPieces.has(pieces[k]));
  const { joined: text, ranges: textRanges } = joinPieceTexts(parts, parts, touching);
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
  for (const boundary of await ctx.segmenter(language, text, suppressions)) {
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
    if (!boundaries.some((boundary) => boundary.start < end && boundary.contentEnd >= end && !joined.slice(end, boundary.contentEnd).trim())) return;
    if (sentenceTerminal.test(joined.slice(start, end))) return;
    if (piece.plain !== undefined) piece.plain += terminal;
    if (piece.ssml !== undefined) piece.ssml += terminal;
    punctuated = true;
  });
  return punctuated;
}
