import type { GuidedNavigationObject } from "@readium/shared";
import { combineDomRangeTextrefs, decodeTextref, isAriaSubstituted, type DecodedTextref } from "@readium/guided-navigation";
import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import type { WalkContext } from "./walkContext.js";
import { toUtterance, type Piece } from "./piece.js";
import { plainOf, substitutedBareLocate } from "./mergeUtterances.js";
import { buildOffsets } from "./sourceSpans.js";

type Quote = { highlight: string; before?: string; after?: string };
type ResolvedLocate = { own: boolean; ref: DecodedTextref; owner: GuidedNavigationObject };

// Anchors just `quote` via a text-quote in `ref`'s selector element, else in the page, since a character-offset
// domRange would need the node's text-node layout. Never beside `ref`'s range or domRange, which a consumer
// tries first and which anchors the textref's whole extent.
export function subLocateFor(ref: DecodedTextref, quote: Quote): LocatorOptions {
  const cssSelector = ref.cssSelector ?? ref.domRange?.start.cssSelector;
  const locate: LocatorOptions = cssSelector === undefined ? { text: quote } : { cssSelector, text: quote };
  if (ref.href !== undefined) locate.href = ref.href;
  return locate;
}

// The text a node's text is quoted in: `node`'s (the node itself or its block), the node's starting at `at`, with the
// stretches that aren't the page's.
export type QuotePlace = { node: GuidedNavigationObject; text: string; at: number; offPage: { start: number; end: number }[] };

// Text fragments match regardless of case and whitespace.
const sameText = (a: string, b: string) => a.replace(/\s+/g, " ").trim().toLowerCase() === b.replace(/\s+/g, " ").trim().toLowerCase();

// `[start, end)` of the place's text, quoted with the text around it up to where it isn't the page's. Where that reaches
// an edge of the text, the textref's own quote of it gives the context beyond.
export function quoteLocate(ref: DecodedTextref, place: QuotePlace, start: number, end: number): LocatorOptions {
  const { text, offPage } = place;
  const stopsBefore = offPage.filter((stop) => stop.end <= start);
  const stopsAfter = offPage.filter((stop) => stop.start >= end);
  const from = Math.max(0, ...stopsBefore.map((stop) => stop.end));
  const to = Math.min(text.length, ...stopsAfter.map((stop) => stop.start));
  const around = ref.text?.highlight !== undefined && sameText(ref.text.highlight, text) ? ref.text : undefined;
  const before = (stopsBefore.length === 0 ? (around?.before ?? "") : "") + text.slice(from, start);
  const after = text.slice(end, to) + (stopsAfter.length === 0 ? (around?.after ?? "") : "");
  return subLocateFor(ref, { highlight: text.slice(start, end), ...(before && { before }), ...(after && { after }) });
}

// Decodes each utterance's source node textref (if any) into `locate`, for
// a consumer to spread straight into createLocator()/decorate() to drive DOM
// highlighting — see @readium/guided-navigation's textrefFragment.ts. Falls
// back through enclosing ancestors (nearest first) when the source node itself
// has no locator of its own.
// Resolves one node's own locator, falling back through its ancestors
// (nearest first) when it has no textref of its own — `own: false` then,
// since the result describes that ancestor's whole extent, not just this node.
export function resolveNodeLocate(node: GuidedNavigationObject, ancestorChains: Map<GuidedNavigationObject, GuidedNavigationObject[]>): ResolvedLocate | undefined {
  const ref = decodeTextref(node);
  if (ref) return { own: true, ref, owner: node };
  for (const ancestor of ancestorChains.get(node) ?? []) {
    const ancestorRef = decodeTextref(ancestor);
    if (ancestorRef) return { own: false, ref: ancestorRef, owner: ancestor };
  }
  return undefined;
}

// A resolved locate is only safe to use bare when it's the node's own
// textref; an ancestor fallback describes a much larger extent, so it must
// be narrowed to `text` via a text-quote first (see subLocateFor).
export function preciseLocateFor(resolved: ResolvedLocate | undefined, text: string): LocatorOptions | undefined {
  if (!resolved) return undefined;
  return resolved.own ? resolved.ref : subLocateFor(resolved.ref, { highlight: text });
}

// Spans `firstRef` to `lastRef` into one continuous DOM range when both
// resolve; drops back to `fallback` (the caller's own single-node locate)
// when they can't be combined this way.
export function spanLocate(
  firstRef: { own: boolean; ref: DecodedTextref } | undefined,
  lastRef: { own: boolean; ref: DecodedTextref } | undefined,
  fallback: LocatorOptions | undefined,
): LocatorOptions | undefined {
  const spanned = firstRef && lastRef ? combineDomRangeTextrefs(firstRef.ref, lastRef.ref) : undefined;
  return spanned ?? fallback;
}

// Builds each utterance's `offsets` from its spans, and resolves `locate` for those not given one:
// a single offset's own, else the source node's, quoted to the utterance's text when it covers only part of it.
export function attachLocate(pieces: Piece[], ctx: WalkContext): ReadiumSpeechUtterance[] {
  const { ancestorChains } = ctx;
  return pieces.map((u) => {
    const { offsets, spanned } = buildOffsets(u, ctx);
    const result = toUtterance(u);
    if (offsets.length > 0) result.offsets = offsets;
    // A quote given while walking, before the spans were placed in their block, gives way to the page's text the utterance reads.
    if (u.locate) return u.locate.text && spanned ? { ...result, locate: spanned } : result;
    const { source } = u;
    const text = u.plain ?? plainOf(u.ssml ?? "", "ssml");
    if (Array.isArray(source)) {
      const [first, last] = source;
      const firstRef = resolveNodeLocate(first, ancestorChains);
      const lastRef = resolveNodeLocate(last, ancestorChains);
      const ref = spanLocate(firstRef, lastRef, preciseLocateFor(firstRef, text));
      return ref ? { ...result, locate: ref } : result;
    }
    const resolved = source ? resolveNodeLocate(source, ancestorChains) : undefined;
    if (!resolved) return result;
    if (u.synthetic) return { ...result, locate: resolved.ref };
    if (offsets.length === 1) return { ...result, locate: offsets[0].locate };
    const substituted = source && isAriaSubstituted(source) ? substitutedBareLocate(source, ctx) : undefined;
    const quoted = offsets.length > 0 ? (spanned ?? subLocateFor(resolved.ref, { highlight: text })) : preciseLocateFor(resolved, text);
    return { ...result, locate: substituted ?? quoted };
  });
}
