import { BINDING_PUNCT_CLASS } from "../utils/text";

export interface TextChunk {
  text: string;
  offset: number;
}

interface Atom {
  text: string;
  offset: number;
  // Atomic atoms (SSML tag spans) are never split, even if they exceed maxLength alone.
  atomic: boolean;
}

// Greedily packs atoms into chunks up to maxLength; an atom exceeding maxLength alone is
// still emitted as its own oversized chunk rather than dropped or corrupted.
function packAtoms(atoms: Atom[], maxLength: number): TextChunk[] {
  const chunks: TextChunk[] = [];
  let bufferStart = -1;
  let bufferEnd = -1;

  const flush = (): void => {
    if (bufferStart !== -1) {
      chunks.push({ text: sliceAtoms(atoms, bufferStart, bufferEnd), offset: atoms[bufferStart].offset });
      bufferStart = -1;
      bufferEnd = -1;
    }
  };

  for (let i = 0; i < atoms.length; i++) {
    const atom = atoms[i];

    if (atom.text.length > maxLength) {
      flush();
      chunks.push({ text: atom.text, offset: atom.offset });
      continue;
    }

    const atomEnd = atom.offset + atom.text.length;
    const wouldBeLength = bufferStart === -1 ? atom.text.length : atomEnd - atoms[bufferStart].offset;
    if (bufferStart !== -1 && wouldBeLength > maxLength) {
      flush();
    }

    if (bufferStart === -1) {
      bufferStart = i;
    }
    bufferEnd = i;
  }
  flush();

  return chunks;
}

function sliceAtoms(atoms: Atom[], start: number, end: number): string {
  const first = atoms[start];
  const last = atoms[end];
  return first === last ? first.text : atoms.slice(start, end + 1).map(a => a.text).join("");
}

// Splits on the same Unicode-aware binding-punctuation class used elsewhere in this codebase
// (src/utils/text.ts) — CJK/Arabic terminators included, not just ASCII .!?. Trailing
// whitespace is absorbed when present but not required, since CJK sentences run together.
const SENTENCE_RE = new RegExp(
  `[^${BINDING_PUNCT_CLASS}]*[${BINDING_PUNCT_CLASS}]+\\s*|[^${BINDING_PUNCT_CLASS}]+$`,
  "gu"
);

// Splits on whitespace runs, keeping trailing whitespace attached to the preceding word so
// offsets/reconstruction stay exact.
const WORD_RE = /\S+\s*|\s+/g;

function tokenize(text: string, offset: number, regex: RegExp): Atom[] {
  const atoms: Atom[] = [];
  for (const match of text.matchAll(regex)) {
    if (match[0].length === 0) continue;
    atoms.push({ text: match[0], offset: offset + match.index, atomic: false });
  }
  return atoms;
}

// Re-splits an over-long atom one level down (sentence -> word -> hard character split).
function expandOverLongAtom(atom: Atom, maxLength: number): Atom[] {
  if (atom.text.length <= maxLength || atom.atomic) {
    return [atom];
  }
  const words = tokenize(atom.text, atom.offset, WORD_RE);
  if (words.length > 1) {
    return words.flatMap(word => expandOverLongAtom(word, maxLength));
  }
  // No whitespace to split on — hard split as a last resort, walking whole code points (not
  // raw UTF-16 indices) so a surrogate pair (e.g. an emoji) is never torn in half.
  const hardSplit: Atom[] = [];
  let sliceOffset = atom.offset;
  let sliceText = "";
  for (const char of atom.text) {
    if (sliceText.length > 0 && sliceText.length + char.length > maxLength) {
      hardSplit.push({ text: sliceText, offset: sliceOffset, atomic: false });
      sliceOffset += sliceText.length;
      sliceText = "";
    }
    sliceText += char;
  }
  if (sliceText.length > 0) {
    hardSplit.push({ text: sliceText, offset: sliceOffset, atomic: false });
  }
  return hardSplit;
}

export function chunkPlainText(text: string, maxLength: number): TextChunk[] {
  if (text.length <= maxLength) {
    return [{ text, offset: 0 }];
  }
  const sentences = tokenize(text, 0, SENTENCE_RE);
  const atoms = sentences.flatMap(sentence => expandOverLongAtom(sentence, maxLength));
  return packAtoms(atoms, maxLength);
}

// Matches a complete `<tag>...</tag>` span (SSML fragments here are always flat, never
// nested) or a self-closing `<tag/>` as one atomic unit; everything else is plain text.
const SSML_TOKEN_RE = /<([a-zA-Z][\w-]*)\b[^>]*>[\s\S]*?<\/\1>|<[a-zA-Z][\w-]*\b[^>]*\/>|[^<]+/g;

export function chunkSsmlText(text: string, maxLength: number): TextChunk[] {
  if (text.length <= maxLength) {
    return [{ text, offset: 0 }];
  }

  const atoms: Atom[] = [];
  for (const match of text.matchAll(SSML_TOKEN_RE)) {
    const isTag = match[0][0] === "<";
    if (isTag) {
      atoms.push({ text: match[0], offset: match.index, atomic: true });
    } else {
      atoms.push(...tokenize(match[0], match.index, SENTENCE_RE));
    }
  }

  const expanded = atoms.flatMap(atom => expandOverLongAtom(atom, maxLength));
  return packAtoms(expanded, maxLength);
}
