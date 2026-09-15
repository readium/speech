import { ssmlTextEscape } from "../gnd/text.js";
import { segmentSentences } from "./sentenceSegmenter.js";

function unescapeSsmlText(text: string): string {
  return text.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

// One paired tag+inner-text span (`<tag attrs>...</tag>`, always flat and
// self-contained per the GND converter's `flushText()`), one self-closing
// tag, or a run of plain text.
const TOKEN_RE = /<([a-zA-Z][\w-]*)([^>]*)>([\s\S]*?)<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;

interface Atom {
  kind: "paired" | "selfClosing" | "text";
  raw: string;
  tag?: string;
  attrs?: string;
  innerText?: string; // unescaped, "paired" only
  text?: string; // unescaped, "text" only
}

function tokenize(ssml: string): Atom[] {
  const atoms: Atom[] = [];
  for (const match of ssml.matchAll(TOKEN_RE)) {
    if (match[1] !== undefined) {
      atoms.push({ kind: "paired", raw: match[0], tag: match[1], attrs: match[2], innerText: unescapeSsmlText(match[3]) });
    } else if (match[0][0] === "<") {
      atoms.push({ kind: "selfClosing", raw: match[0] });
    } else {
      atoms.push({ kind: "text", raw: match[0], text: unescapeSsmlText(match[0]) });
    }
  }
  return atoms;
}

// Splits `ssml` into one fragment per real sentence boundary, re-wrapping a
// paired tag whose inner text spans a boundary so each fragment stays
// well-formed on its own. Returns `undefined` for a single sentence (or no
// text at all), so the caller keeps the utterance unsplit.
export async function splitSsmlAtSentences(
  ssml: string,
  language: string,
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
  const boundaries = await segmentSentences(language, plain, customSuppressions);
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
      const escaped = ssmlTextEscape(unescapedText.slice(pos - atomStart, sliceEnd - atomStart));
      buffer += wrap ? wrap(escaped) : escaped;
      pos = sliceEnd;
      if (pos >= boundary.end && boundaryIndex < boundaries.length - 1) {
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
  if (buffer) results.push(buffer);
  return results;
}
