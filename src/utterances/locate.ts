import type { GuidedNavigationObject } from "@readium/shared";
import { combineDomRangeTextrefs, decodeTextref, isAriaSubstituted, type DecodedTextref } from "@readium/guided-navigation";
import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import type { WalkContext } from "./walkContext.js";
import { toUtterance, type Piece } from "./piece.js";
import { plainOf, substitutedBareLocate } from "./mergeUtterances.js";
import { buildOffsets } from "./sourceSpans.js";
import { contextAfter, contextBefore } from "./locateContext.js";

// Anchors just `quoteText` within the node via a text-quote, since a
// character-offset domRange would need its internal text-node layout.
export function subLocateFor(nodeRef: DecodedTextref, quoteText: string): LocatorOptions {
  const cssSelector = nodeRef.cssSelector ?? nodeRef.domRange?.start.cssSelector;
  if (!cssSelector) return { ...nodeRef, text: { highlight: quoteText } };
  const locate: LocatorOptions = { cssSelector, text: { highlight: quoteText } };
  if (nodeRef.href !== undefined) locate.href = nodeRef.href;
  return locate;
}

// Decodes each utterance's source node textref (if any) into `locate`, for
// a consumer to spread straight into createLocator()/decorate() to drive DOM
// highlighting — see @readium/guided-navigation's textrefFragment.ts. Falls
// back through enclosing ancestors (nearest first) when the source node itself
// has no locator of its own.
// Resolves one node's own locator, falling back through its ancestors
// (nearest first) when it has no textref of its own — `own: false` then,
// since the result describes that ancestor's whole extent, not just this node.
export function resolveNodeLocate(node: GuidedNavigationObject, ctx: WalkContext): { own: boolean; ref: DecodedTextref } | undefined {
  const ref = decodeNodeTextref(node, ctx.contextLength);
  if (ref) return { own: true, ref };
  for (const ancestor of ctx.ancestorChains.get(node) ?? []) {
    const ancestorRef = decodeNodeTextref(ancestor, ctx.contextLength);
    if (ancestorRef) return { own: false, ref: ancestorRef };
  }
  return undefined;
}

// A text-fragment textref's prefix and suffix decode to `text.before`/`after`, capped like the context speech quotes.
function decodeNodeTextref(node: GuidedNavigationObject, contextLength: number): DecodedTextref | undefined {
  const ref = decodeTextref(node);
  if (!ref?.text) return ref;
  const { before, after, ...rest } = ref.text;
  const text: NonNullable<DecodedTextref["text"]> = rest;
  const cappedBefore = before && contextBefore(before, before.length, contextLength);
  const cappedAfter = after && contextAfter(after, 0, contextLength);
  if (cappedBefore) text.before = cappedBefore;
  if (cappedAfter) text.after = cappedAfter;
  return { ...ref, text };
}

// A resolved locate is only safe to use bare when it's the node's own
// textref; an ancestor fallback describes a much larger extent, so it must
// be narrowed to `text` via a text-quote first (see subLocateFor).
export function preciseLocateFor(resolved: { own: boolean; ref: DecodedTextref } | undefined, text: string): LocatorOptions | undefined {
  if (!resolved) return undefined;
  return resolved.own ? resolved.ref : subLocateFor(resolved.ref, text);
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
  return pieces.map((u) => {
    const offsets = buildOffsets(u, ctx);
    const result = toUtterance(u);
    if (offsets.length > 0) result.offsets = offsets;
    if (u.locate) return result;
    const { source } = u;
    const text = u.plain ?? plainOf(u.ssml ?? "", "ssml");
    if (Array.isArray(source)) {
      const [first, last] = source;
      const firstRef = resolveNodeLocate(first, ctx);
      const lastRef = resolveNodeLocate(last, ctx);
      const ref = spanLocate(firstRef, lastRef, preciseLocateFor(firstRef, text));
      return ref ? { ...result, locate: ref } : result;
    }
    const resolved = source ? resolveNodeLocate(source, ctx) : undefined;
    if (!resolved) return result;
    if (u.synthetic) return { ...result, locate: resolved.ref };
    if (offsets.length === 1) return { ...result, locate: offsets[0].locate };
    const substituted = source && isAriaSubstituted(source) ? substitutedBareLocate(source, ctx) : undefined;
    const quoted = offsets.length > 0 ? subLocateFor(resolved.ref, text) : preciseLocateFor(resolved, text);
    return { ...result, locate: substituted ?? quoted };
  });
}
