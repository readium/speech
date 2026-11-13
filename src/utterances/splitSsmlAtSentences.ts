import type { SentenceBoundary, SentenceSegmenter } from "./sentenceSegmenter.js";
import { mergeBoundaries } from "./sentenceBoundaryMerge.js";
import { isUnrepeatable, SsmlWriter, type SsmlElement } from "./ssml.js";
import { layoutSsml, type PlainPiece } from "./plainText.js";

// Splits `ssml` into one fragment per real sentence boundary, closing the
// elements open at a boundary and reopening them in the next fragment so each
// fragment stays well-formed on its own. Returns `undefined` for a single
// sentence (or no text at all), so the caller keeps the utterance unsplit.
export async function splitSsmlAtSentences(
  ssml: string,
  language: string,
  segmenter: SentenceSegmenter,
  customSuppressions?: string[]
): Promise<string[] | undefined> {
  const { plain, pieces } = layoutSsml(ssml);
  if (!plain) return undefined;
  const boundaries = unrepeatableWhole(plain, pieces, await segmenter(language, plain, customSuppressions));
  if (boundaries.length <= 1) return undefined;

  const results: string[] = [];
  const writer = new SsmlWriter();
  let boundaryIndex = 0;

  for (const piece of pieces) {
    if (piece.kind === "separator") continue;
    if (piece.kind === "element") {
      writer.node(piece.chain, piece.node);
      continue;
    }
    let pos = piece.start;
    const end = piece.start + piece.text.length;
    while (pos < end) {
      const boundary = boundaries[boundaryIndex];
      const sliceEnd = Math.min(end, boundary.end);
      const isBoundaryEnd = sliceEnd >= boundary.end && boundaryIndex < boundaries.length - 1;
      // The boundary range includes trailing separator whitespace (kept in
      // offsets); strip it here, at the source slice, so it's gone even when
      // it sits right before a tag closes rather than at the fragment's end.
      let slice = piece.text.slice(pos - piece.start, sliceEnd - piece.start);
      if (isBoundaryEnd) slice = slice.replace(/[ \t\r\n]+$/, "");
      writer.text(piece.chain, slice);
      pos = sliceEnd;
      if (isBoundaryEnd) {
        results.push(writer.flush());
        boundaryIndex++;
      }
    }
  }
  const last = writer.flush().replace(/[ \t\r\n]+$/, "");
  if (last) results.push(last);
  return results;
}

function unrepeatableWhole(plain: string, pieces: PlainPiece[], boundaries: SentenceBoundary[]): SentenceBoundary[] {
  // Each outermost element read once, from its first text to its last.
  const ranges = new Map<SsmlElement, { start: number; end: number }>();
  for (const piece of pieces) {
    if (piece.kind !== "text") continue;
    const element = piece.chain.find(isUnrepeatable);
    if (!element) continue;
    const end = piece.start + piece.text.length;
    const range = ranges.get(element);
    if (range) range.end = end;
    else ranges.set(element, { start: piece.start, end });
  }
  if (!ranges.size) return boundaries;
  return mergeBoundaries(plain, boundaries, (boundary, next) => [...ranges.values()].some((range) => range.start < boundary.contentEnd && range.end > next.start));
}

// Drops the sentence boundaries of `ssml`'s plain text that fall inside an element read once (e.g. `<audio>`), so no fragment repeats it.
export function keepUnrepeatableWhole(ssml: string, boundaries: SentenceBoundary[]): SentenceBoundary[] {
  const { plain, pieces } = layoutSsml(ssml);
  return unrepeatableWhole(plain, pieces, boundaries);
}
