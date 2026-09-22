import { ssmlTextEscape } from "../gnd/text.js";
import type { SentenceSegmenter } from "./sentenceSegmenter.js";
import { tokenizeSsmlTextAtoms, type SsmlTextAtom as Atom } from "./text.js";

const tokenize = tokenizeSsmlTextAtoms;

// Splits `ssml` into one fragment per real sentence boundary, re-wrapping a
// paired tag whose inner text spans a boundary so each fragment stays
// well-formed on its own. Returns `undefined` for a single sentence (or no
// text at all), so the caller keeps the utterance unsplit.
export async function splitSsmlAtSentences(
  ssml: string,
  language: string,
  segmenter: SentenceSegmenter,
  customSuppressions?: string[]
): Promise<string[] | undefined> {
  const atoms = tokenize(ssml);
  let plain = "";
  const plainStarts: number[] = [];
  for (const atom of atoms) {
    plainStarts.push(plain.length);
    if (atom.kind === "text") plain += atom.text;
    else if (atom.kind === "paired") plain += atom.innerText;
  }
  if (!plain) return undefined;
  const boundaries = await segmenter(language, plain, customSuppressions);
  if (boundaries.length <= 1) return undefined;

  const results: string[] = [];
  let buffer = "";
  let boundaryIndex = 0;

  function appendSlice(unescapedText: string, atomStart: number, wrap?: (escaped: string) => string): void {
    let pos = atomStart;
    const end = atomStart + unescapedText.length;
    while (pos < end) {
      const boundary = boundaries[boundaryIndex];
      const sliceEnd = Math.min(end, boundary.end);
      const isBoundaryEnd = sliceEnd >= boundary.end && boundaryIndex < boundaries.length - 1;
      // The boundary range includes trailing separator whitespace (kept in
      // offsets); strip it here, at the source slice, so it's gone even when
      // it sits right before a tag closes rather than at the buffer's end.
      let slice = unescapedText.slice(pos - atomStart, sliceEnd - atomStart);
      if (isBoundaryEnd) slice = slice.replace(/[ \t\r\n]+$/, "");
      const escaped = ssmlTextEscape(slice);
      buffer += wrap ? wrap(escaped) : escaped;
      pos = sliceEnd;
      if (isBoundaryEnd) {
        results.push(buffer);
        buffer = "";
        boundaryIndex++;
      }
    }
  }

  atoms.forEach((atom, i) => {
    if (atom.kind === "selfClosing") {
      buffer += atom.raw;
    } else if (atom.kind === "text") {
      appendSlice(atom.text!, plainStarts[i]);
    } else {
      const openTag = `<${atom.tag}${atom.attrs}>`;
      const closeTag = `</${atom.tag}>`;
      if (!atom.innerText) buffer += openTag + closeTag;
      else appendSlice(atom.innerText, plainStarts[i], (escaped) => `${openTag}${escaped}${closeTag}`);
    }
  });
  if (buffer) results.push(buffer.replace(/[ \t\r\n]+$/, ""));
  return results;
}
