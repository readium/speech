// Backward-binding: closing brackets/quotes (Pe/Pf) plus terminal marks (.,;:!? and CJK/Arabic equivalents).
export const BINDING_PUNCT_CLASS = "\\p{Pe}\\p{Pf}.,;:!?，。、；：！？،؛؟";

// Forward-binding: opening brackets/quotes (Ps/Pi) plus Spanish/Asturian/Galician ¿¡.
export const OPENING_PUNCT_CLASS = "\\p{Ps}\\p{Pi}¿¡";

const BINDING_PUNCT_RE = new RegExp(`^[${BINDING_PUNCT_CLASS}]`, "u");
const OPENING_PUNCT_RE = new RegExp(`^[${OPENING_PUNCT_CLASS}]`, "u");
const SINGLE_PUNCT_RE = /^\p{P}$/u;

export function startsWithBindingPunct(s: string): boolean {
  return BINDING_PUNCT_RE.test(s);
}

export function startsWithOpeningPunct(s: string): boolean {
  return OPENING_PUNCT_RE.test(s);
}

// Whether `s` is exactly one punctuation character (any Unicode category,
// not just the binding/opening classes above) — e.g. for deduplicating a
// repeated citation mark, as opposed to a genuine one-letter/digit piece.
export function isSinglePunctuationChar(s: string): boolean {
  return SINGLE_PUNCT_RE.test(s);
}

// Some TTS engines sniff plain text for markup and choke on it — a same-length,
// never-vocalized swap avoids that without shifting any reported charIndex.
export function neutralizeAngleBrackets(text: string): string {
  return text.replace(/[<>]/g, "\u200B");
}
