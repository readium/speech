import { startsWithBindingPunct } from "@readium/helpers";
import type { GuidedNavigationObject } from "@readium/shared";
import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { endsWithOpeningPunct, isSinglePunctuationChar, joinsWithoutSpace } from "../utils/text.js";
import { closeTags, commonAncestors, openTags, ssmlMarkup, type SsmlElement } from "./ssml.js";
import type { SourceSpan } from "./sourceSpans.js";
import type { SourceTrace } from "./walkContext.js";

// How a piece meets the previous one: touching it with no space, or spaced from it, whatever punctuation meets there.
export type PieceSpacing = "touching" | "spaced" | undefined;

// A piece of a sentence around its footnotes, pagebreaks or abbreviation aliases, left unmerged for sentence segmentation:
// `inline` inside the sentence holding it, `after` right after it, `alias` where it falls, never cut.
export interface Placement {
  node: GuidedNavigationObject;
  kind?: "inline" | "after" | "alias";
  // On an inline alias: the plain text it replaces, segmented in its place.
  abbreviation?: string;
}

// The elements of its node's SSML open around a piece cut from it: at its start and end,
// and around the placeholder of the text it's embedded in, outermost first.
export interface PieceTags {
  open: SsmlElement[];
  close: SsmlElement[];
  around: SsmlElement[];
}

// An utterance being built, with what extraction knows about it beyond its output.
export interface Piece {
  plain?: string;
  ssml?: string;
  language?: string;
  locate?: LocatorOptions;
  // The node that produced it, or the first and last of a sentence reconstructed across nodes.
  source?: SourceTrace[number];
  // Where its plain text comes from in its nodes' own text (see sourceSpans.ts).
  spans?: SourceSpan[];
  // Synthesized text, e.g. a contextualization, rather than the content's own.
  synthetic?: boolean;
  blockStart?: boolean;
  placement?: Placement;
  spacing?: PieceSpacing;
  // Set on an `ssml` slice whose elements open or close outside it.
  tags?: PieceTags;
  // The language declared around the placeholder it's inserted at.
  enclosingLanguage?: string;
  // The aria-substituted or alias locate of its leading/trailing text, never quote-searchable.
  edgeLocates?: { leading?: LocatorOptions; trailing?: LocatorOptions };
}

export function toUtterance(piece: Piece): ReadiumSpeechUtterance {
  const utterance: ReadiumSpeechUtterance = {};
  if (piece.plain !== undefined) utterance.plain = piece.plain;
  if (piece.ssml !== undefined) utterance.ssml = piece.ssml;
  if (piece.language !== undefined) utterance.language = piece.language;
  if (piece.locate !== undefined) utterance.locate = piece.locate;
  return utterance;
}

// Places the slices of `pieces`, walked from a placeholder, within `around`, the elements open there.
export function nestTags(pieces: Piece[], around: SsmlElement[]): void {
  for (const piece of pieces) if (piece.tags) piece.tags.around = [...around, ...piece.tags.around];
}

// `piece`'s SSML with the elements its slice leaves open around it, well-formed on its own.
export function balancedSsml(piece: Piece): string {
  const { tags } = piece;
  return (tags ? openTags(tags.open) : "") + (piece.ssml ?? "") + (tags ? closeTags(tags.close) : "");
}

// Makes `piece`'s own SSML well-formed on its own, for a piece output without the slices around it.
export function encloseOwnTags(piece: Piece): void {
  if (!piece.tags || piece.ssml === undefined) return;
  piece.ssml = balancedSsml(piece);
  delete piece.tags;
}

// Lone punctuation repeating the end of the text before it, which a join drops.
function isRedundant(plain: string, plainPart: string): boolean {
  return plainPart.length === 1 && isSinglePunctuationChar(plainPart) && plain.endsWith(plainPart);
}

// Only synthesizes a joining space when the join would otherwise have
// none at all — never adds a second one next to whitespace the pieces already carry.
function joinsSpaced(plain: string, plainPart: string, spacing: PieceSpacing): boolean {
  const spaced =
    spacing === "spaced" ||
    (spacing === undefined && !startsWithBindingPunct(plainPart) && !endsWithOpeningPunct(plain) && !joinsWithoutSpace(plain, plainPart));
  return !!plain && spaced && !/\s$/.test(plain) && !/^\s/.test(plainPart);
}

// Concatenates `parts`, skipping redundant lone punctuation and spacing parts apart,
// unless `spacing[i]` says how part i meets the previous one. `ranges[i]` is where `parts[i]` landed in `joined`.
export function joinPieceTexts(parts: string[], spacing: PieceSpacing[] = []): { joined: string; ranges: { start: number; end: number }[] } {
  let joined = "";
  const ranges: { start: number; end: number }[] = [];
  parts.forEach((part, i) => {
    // A part touching the previous one is set against it on the page, so it never repeats it.
    if (spacing[i] !== "touching" && isRedundant(joined, part)) {
      ranges.push({ start: joined.length, end: joined.length });
      return;
    }
    if (joinsSpaced(joined, part, spacing[i])) joined += " ";
    const start = joined.length;
    joined += part;
    ranges.push({ start, end: joined.length });
  });
  return { joined, ranges };
}

// The elements to have open for a slice: those of the text it's embedded in still open around it, then its own.
function chainFor(open: SsmlElement[], tags: PieceTags, own: SsmlElement[]): SsmlElement[] {
  const offset = open.length ? tags.around.indexOf(open[0]) : -1;
  let kept = 0;
  if (offset !== -1) while (kept < open.length && offset + kept < tags.around.length && open[kept] === tags.around[offset + kept]) kept++;
  return [...open.slice(0, kept), ...own];
}

// `texts` (each piece's SSML) joined as `joinPieceTexts()` joined `plainParts` into `ranges`, each slice within the elements
// open around it, kept open across the next slice of the same text and the text embedded between them.
export function joinPieceSsml(pieces: Piece[], texts: string[], plainParts: string[], ranges: { start: number; end: number }[]): string {
  let out = "";
  // What follows the last slice: separators and texts without tags, after the elements that slice closes.
  let pending = "";
  let open: SsmlElement[] = [];
  pieces.forEach((piece, i) => {
    const range = ranges[i];
    if (range.start > (ranges[i - 1]?.end ?? 0)) pending += " ";
    const text = (plainParts[i] && range.start === range.end ? ssmlMarkup(texts[i]) : undefined) ?? texts[i];
    const { tags } = piece;
    if (!tags) {
      pending += text;
      return;
    }
    const start = chainFor(open, tags, tags.open);
    const common = commonAncestors(open, start).length;
    out += closeTags(open.slice(common)) + pending + openTags(start.slice(common)) + text;
    pending = "";
    open = [...start.slice(0, start.length - tags.open.length), ...tags.close];
  });
  return out + closeTags(open) + pending;
}
