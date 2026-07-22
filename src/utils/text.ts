// Backward-binding: closing brackets/quotes (Pe/Pf) plus terminal marks (.,;:!? and CJK/Arabic equivalents).
export const BINDING_PUNCT_CLASS = "\\p{Pe}\\p{Pf}.,;:!?，。、；：！？،؛؟";

// Forward-binding: opening brackets/quotes (Ps/Pi) plus Spanish/Asturian/Galician ¿¡.
export const OPENING_PUNCT_CLASS = "\\p{Ps}\\p{Pi}¿¡";

const BINDING_PUNCT_RE = new RegExp(`^[${BINDING_PUNCT_CLASS}]`, "u");
const OPENING_PUNCT_RE = new RegExp(`^[${OPENING_PUNCT_CLASS}]`, "u");

export function startsWithBindingPunct(s: string): boolean {
  return BINDING_PUNCT_RE.test(s);
}

export function startsWithOpeningPunct(s: string): boolean {
  return OPENING_PUNCT_RE.test(s);
}
