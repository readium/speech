import type { SentenceBoundary } from "./sentenceSegmenter.js";

interface RawBoundary {
  start: number;
  end: number;
}

function trimmedEnd(text: string, start: number, end: number): number {
  let i = end;
  while (i > start && /\s/.test(text[i - 1])) i--;
  return i;
}

// A char that can precede a suppressed token without being part of a longer
// word — whitespace, or an opening bracket/quote (e.g. "(d." in "(d. 1921)").
const tokenBoundaryRegExp = /[\s([{"'“‘]/;

// A suppression matches only at a token boundary, so e.g. a suppression
// "rd." can't false-match inside "Word.".
function endsWithSuppression(text: string, suppressions: string[]): boolean {
  for (const suppression of suppressions) {
    if (text.length < suppression.length || !text.endsWith(suppression)) continue;
    const before = text.length - suppression.length - 1;
    if (before < 0 || tokenBoundaryRegExp.test(text[before])) return true;
  }
  return false;
}

// A candidate sentence with fewer than 2 letters (e.g. a bare footnote
// marker like "1.") can't end a sentence on its own — Intl.Segmenter has no
// such floor, so a numeral/single-letter marker gets split off regardless.
function hasEnoughLetters(text: string): boolean {
  let count = 0;
  for (const char of text) {
    if (/\p{L}/u.test(char)) count++;
    if (count >= 2) return true;
  }
  return false;
}

// A real ellipsis ("…") never ends a sentence under Intl.Segmenter, but
// three literal periods ("...") do, when followed by a capitalized word —
// the two spellings of the same mark should read the same way, so this
// keeps "..." a continuation too, consistent with "…".
function endsWithLiteralEllipsis(text: string): boolean {
  return /\.{3,}$/.test(text);
}

// Intl.Segmenter has no abbreviation-suppression concept: it splits "Mr."
// from what follows unconditionally. `“`, by contrast, can never legitimately
// close a sentence, but a straight `"` is ambiguous open/close — only an odd
// count within the boundary's own text marks the trailing one as unbalanced
// (i.e. actually opening a new, still-unclosed quotation).
function isMisplacedClosingQuote(text: string, start: number, contentEnd: number, lastChar: string): boolean {
  if (lastChar === "“") return true;
  if (lastChar !== '"') return false;
  let count = 0;
  for (let i = start; i < contentEnd; i++) if (text[i] === '"') count++;
  return count % 2 === 1;
}

// An em dash right after terminal punctuation, before a capitalized word,
// is an attribution line ("A quote. — Author") that reads as its own
// sentence — Intl.Segmenter doesn't split there on its own. Deliberately
// narrow (requires the preceding punctuation) so an ordinary parenthetical
// em dash mid-sentence (no punctuation before it) is left alone.
const emDashAttributionRegExp = /[.!?][”"'’)\]]*\s+—\s+(?=\p{Lu})/gu;

function splitAtEmDashAttribution(text: string, raw: RawBoundary[]): RawBoundary[] {
  const splitPoints = [...text.matchAll(emDashAttributionRegExp)].map((match) => match.index + match[0].length);
  if (splitPoints.length === 0) return raw;
  const result: RawBoundary[] = [];
  for (const boundary of raw) {
    let segStart = boundary.start;
    for (const point of splitPoints) {
      if (point > segStart && point < boundary.end) {
        result.push({ start: segStart, end: point });
        segStart = point;
      }
    }
    result.push({ start: segStart, end: boundary.end });
  }
  return result;
}

// Reconciles Intl.Segmenter's raw sentence boundaries against this repo's
// abbreviation suppression lists (which Intl.Segmenter has no equivalent
// for) and a narrow fix for it swallowing an unspaced opening quote into the
// previous sentence (only reproduces with zero whitespace between two
// adjacent quoted sentences — e.g. `”"Next…` glued with no separator).
export function refineSentenceBoundaries(text: string, raw: RawBoundary[], suppressions: string[]): SentenceBoundary[] {
  const fixed = splitAtEmDashAttribution(text, raw).map((b) => ({ ...b }));
  for (let i = 0; i < fixed.length - 1; i++) {
    const contentEnd = trimmedEnd(text, fixed[i].start, fixed[i].end);
    // Only a glued (no trailing separator) boundary can have swallowed a
    // character that belongs to the next sentence.
    if (contentEnd !== fixed[i].end || contentEnd <= fixed[i].start) continue;
    const lastChar = text[contentEnd - 1];
    if (!isMisplacedClosingQuote(text, fixed[i].start, contentEnd, lastChar)) continue;
    fixed[i].end -= 1;
    fixed[i + 1].start -= 1;
  }

  const merged: RawBoundary[] = [];
  for (const boundary of fixed) {
    let current = boundary;
    while (merged.length > 0) {
      const prev = merged[merged.length - 1];
      const prevContentEnd = trimmedEnd(text, prev.start, prev.end);
      const prevText = text.slice(prev.start, prevContentEnd);
      if (!endsWithSuppression(prevText, suppressions) && hasEnoughLetters(prevText) && !endsWithLiteralEllipsis(prevText)) break;
      merged.pop();
      current = { start: prev.start, end: current.end };
    }
    merged.push(current);
  }

  return merged.map((b) => {
    const contentEnd = trimmedEnd(text, b.start, b.end);
    return { text: text.slice(b.start, contentEnd), start: b.start, end: b.end, contentEnd };
  });
}
