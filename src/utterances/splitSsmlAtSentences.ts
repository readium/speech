import { ssmlTextEscape } from "@readium/helpers";
import type { SentenceSegmenter } from "./sentenceSegmenter.js";
import { breakSpaced, separatesWords, tokenizeSsmlTextAtoms, type SsmlTextAtom as Atom } from "./text.js";

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
  const textOf = (atom: Atom) => (atom.kind === "text" ? atom.text! : atom.kind === "paired" ? atom.innerText! : "");
  const nextText = (i: number) => {
    let j = i + 1;
    while (j < atoms.length && !textOf(atoms[j])) j++;
    return j < atoms.length ? textOf(atoms[j]) : "";
  };
  atoms.forEach((atom, i) => {
    const separating = atom.kind !== "text" && separatesWords(atom.raw);
    if (atom.kind === "paired" && separating && breakSpaced(plain, textOf(atom))) plain += " ";
    plainStarts.push(plain.length);
    if (atom.kind !== "selfClosing") plain += textOf(atom);
    if (separating && breakSpaced(plain, nextText(i))) plain += " ";
  });
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
      if (slice) buffer += wrap ? wrap(ssmlTextEscape(slice)) : ssmlTextEscape(slice);
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
