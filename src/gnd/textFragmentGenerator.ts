// Generates a WICG Text Fragment directive for TextrefOptions.textFragment —
// see Converter.applyTextref in converter.ts.
import { normalizeWhitespace } from "./text.js";
import { isInlineTag } from "./dom.js";
import type { TextFragmentDirective } from "./textrefFragment.js";

const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

function allIndicesOf(haystack: string, needle: string): number[] {
  if (!needle) return [];
  const indices: number[] = [];
  for (let idx = haystack.indexOf(needle); idx !== -1; idx = haystack.indexOf(needle, idx + 1)) {
    indices.push(idx);
  }
  return indices;
}

function wordsBefore(text: string, index: number, count: number): string {
  const words = text.slice(0, index).trim().split(/\s+/).filter(Boolean);
  return words.slice(-count).join(" ");
}

function wordsAfter(text: string, index: number, count: number): string {
  const words = text.slice(index).trim().split(/\s+/).filter(Boolean);
  return words.slice(0, count).join(" ");
}

// Among every occurrence of text in docText, checks that exactly one has
// this same prefix/suffix word context — i.e. that context disambiguates it.
function isUniqueWithContext(docText: string, text: string, prefix: string | undefined, suffix: string | undefined): boolean {
  const prefixWordCount = prefix ? prefix.split(/\s+/).length : 0;
  const suffixWordCount = suffix ? suffix.split(/\s+/).length : 0;
  let matches = 0;
  for (const idx of allIndicesOf(docText, text)) {
    const actualPrefix = wordsBefore(docText, idx, prefixWordCount);
    const actualSuffix = wordsAfter(docText, idx + text.length, suffixWordCount);
    if ((prefix === undefined || actualPrefix === prefix) && (suffix === undefined || actualSuffix === suffix)) {
      matches++;
    }
  }
  return matches === 1;
}

// Splits long candidate text into a textStart/textEnd pair (first/last few
// words) per the WICG spec's guidance for long ranges, rather than quoting
// the whole thing verbatim.
function splitIfLong(text: string): TextFragmentDirective {
  const words = text.split(/\s+/).filter(Boolean);
  const LONG_THRESHOLD = 10;
  const EDGE_WORDS = 4;
  if (words.length <= LONG_THRESHOLD) return { textStart: text };
  return { textStart: words.slice(0, EDGE_WORDS).join(" "), textEnd: words.slice(-EDGE_WORDS).join(" ") };
}

// Walks node's text in document order, inserting a joining space at
// block-element boundaries (same "block" as isInlineTag()) so words from
// adjacent blocks (e.g. sibling <p>s, with no whitespace between their
// closing/opening tags) don't fuse into one token. Stops early — mid-way
// through a Text node, if needed — once stopAt/stopOffset is reached;
// returns whether it did. A DOM Range would express "up to this point"
// more directly, but Range's cross-boundary methods aren't reliably
// implemented everywhere (e.g. linkedom, used in this package's own
// tests) — firstChild/nextSibling/nodeValue are universal.
function collectText(node: Node, out: string[], stopAt?: Text, stopOffset?: number): boolean {
  if (node === stopAt) {
    out.push((node.nodeValue ?? "").slice(0, stopOffset ?? 0));
    return true;
  }
  if (node.nodeType === TEXT_NODE) {
    out.push(node.nodeValue ?? "");
    return false;
  }
  if (node.nodeType !== ELEMENT_NODE) return false;
  const isBlock = !isInlineTag((node as Element).tagName.toLowerCase());
  if (isBlock) out.push(" ");
  for (let c = node.firstChild; c; c = c.nextSibling) {
    if (collectText(c, out, stopAt, stopOffset)) return true;
  }
  if (isBlock) out.push(" ");
  return false;
}

/**
 * Finds a WICG text-fragment directive uniquely locating text within a
 * whole document's worth of content, one document (`root`) at a time: the
 * exact text as-is when it occurs once; widened with a bounded amount of
 * surrounding-word context when it recurs; undefined past that. Not the
 * WICG spec's full generation algorithm (no incremental word-by-word
 * expansion, no exhaustive search) — an exact-match-first, bounded-context
 * fallback.
 */
export class TextFragmentGenerator {
  private docText: string | null = null;

  constructor(private root: Element) {}

  private wholeDocumentText(): string {
    if (this.docText === null) {
      const out: string[] = [];
      collectText(this.root, out);
      this.docText = normalizeWhitespace(out.join(""), true);
    }
    return this.docText;
  }

  // Approximates a boundary's character offset within wholeDocumentText() —
  // used only to pick the nearest occurrence among several, never to
  // address text directly, so approximate is fine.
  private approximateOffset(boundary: { node: Text; offset: number }): number {
    const out: string[] = [];
    collectText(this.root, out, boundary.node, boundary.offset);
    return normalizeWhitespace(out.join(""), true).length;
  }

  // `boundary` locates candidate's own start within root's document order,
  // for picking the nearest occurrence among several when it recurs; pass
  // undefined to just pick the first occurrence found.
  directiveFor(candidate: string, boundary: { node: Text; offset: number } | undefined): TextFragmentDirective | undefined {
    const text = candidate.trim();
    if (!text) return undefined;
    const docText = this.wholeDocumentText();
    const occurrences = allIndicesOf(docText, text);
    if (occurrences.length === 0) return undefined;
    if (occurrences.length === 1) return splitIfLong(text);

    const approxOffset = boundary ? this.approximateOffset(boundary) : -1;
    let bestIndex = occurrences[0];
    let bestDiff = Infinity;
    for (const idx of occurrences) {
      const diff = Math.abs(idx - approxOffset);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestIndex = idx;
      }
    }

    const CONTEXT_WORDS = 3;
    for (const [withPrefix, withSuffix] of [
      [true, false],
      [false, true],
      [true, true],
    ] as const) {
      const prefix = withPrefix ? wordsBefore(docText, bestIndex, CONTEXT_WORDS) : undefined;
      const suffix = withSuffix ? wordsAfter(docText, bestIndex + text.length, CONTEXT_WORDS) : undefined;
      if ((withPrefix && !prefix) || (withSuffix && !suffix)) continue;
      if (isUniqueWithContext(docText, text, prefix, suffix)) {
        return { ...splitIfLong(text), prefix, suffix };
      }
    }
    return undefined;
  }
}
