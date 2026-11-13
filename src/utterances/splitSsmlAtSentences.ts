import type { SentenceBoundary, SentenceSegmenter } from "./sentenceSegmenter.js";
import { commonAncestors, isUnrepeatable, parseSsml, SsmlWriter, ssmlLeaves, type SsmlElement, type SsmlNode } from "./ssml.js";
import { breakSpaced, separatesWords } from "./text.js";

// A text node at `start` in the plain text, or a childless element (e.g. `<break/>`).
type Piece = { text: string; start: number; chain: SsmlElement[] } | { node: SsmlNode; chain: SsmlElement[] };

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
  const { plain, pieces } = layout(ssml);
  if (!plain) return undefined;
  const boundaries = unrepeatableWhole(plain, pieces, await segmenter(language, plain, customSuppressions));
  if (boundaries.length <= 1) return undefined;

  const results: string[] = [];
  const writer = new SsmlWriter();
  let boundaryIndex = 0;

  for (const piece of pieces) {
    if ("node" in piece) {
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

// Lays out the same plain text as stripSsmlTagsKeepSpacing(), which callers measure boundaries in.
function layout(ssml: string): { plain: string; pieces: Piece[] } {
  let plain = "";
  let separated = false;
  let previousChain: SsmlElement[] = [];
  const pieces: Piece[] = [];
  for (const { node, ancestors } of ssmlLeaves(parseSsml(ssml))) {
    const common = commonAncestors(previousChain, ancestors).length;
    if ([...previousChain.slice(common), ...ancestors.slice(common)].some((element) => separatesWords(element.openTag))) separated = true;
    previousChain = ancestors;
    if (node.kind === "element") {
      pieces.push({ node, chain: ancestors });
      if (separatesWords(node.openTag)) separated = true;
      continue;
    }
    if (separated && breakSpaced(plain, node.text)) plain += " ";
    pieces.push({ text: node.text, start: plain.length, chain: ancestors });
    plain += node.text;
    separated = false;
  }
  return { plain, pieces };
}

function unrepeatableWhole(plain: string, pieces: Piece[], boundaries: SentenceBoundary[]): SentenceBoundary[] {
  const ranges = pieces.flatMap((piece) => ("text" in piece && piece.chain.some(isUnrepeatable) ? [{ start: piece.start, end: piece.start + piece.text.length }] : []));
  if (!ranges.length) return boundaries;
  const kept: SentenceBoundary[] = [];
  let first: SentenceBoundary | undefined;
  boundaries.forEach((boundary, k) => {
    first ??= boundary;
    const next = boundaries[k + 1];
    if (next && ranges.some((range) => range.start < boundary.contentEnd && range.end > next.start)) return;
    kept.push({ text: plain.slice(first.start, boundary.contentEnd), start: first.start, end: boundary.end, contentEnd: boundary.contentEnd });
    first = undefined;
  });
  return kept;
}

// Drops the sentence boundaries of `ssml`'s plain text that fall inside an element read once (e.g. `<audio>`), so no fragment repeats it.
export function keepUnrepeatableWhole(ssml: string, boundaries: SentenceBoundary[]): SentenceBoundary[] {
  const { plain, pieces } = layout(ssml);
  return unrepeatableWhole(plain, pieces, boundaries);
}
