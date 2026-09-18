import type { GndObject } from "../gnd/types.js";
import { combineDomRangeTextrefs, decodeTextref, type DecodedTextref } from "../gnd/textrefFragment.js";
import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import type { SourceTrace, WalkContext } from "./walkContext.js";

// Anchors just `quoteText` within the node via a text-quote, since a
// character-offset domRange would need its internal text-node layout.
export function subLocateFor(nodeRef: DecodedTextref, quoteText: string): LocatorOptions {
  const cssSelector = nodeRef.cssSelector ?? nodeRef.domRange?.start.cssSelector;
  return cssSelector ? { cssSelector, text: { highlight: quoteText } } : { ...nodeRef, text: { highlight: quoteText } };
}

// Decodes each utterance's source node textref (if any) into `locate`, for
// a consumer to spread straight into createLocator()/decorate() to drive DOM
// highlighting — see textrefFragment.ts. Falls back through enclosing
// ancestors (nearest first) when the source node itself has no locator of
// its own.
// Resolves one node's own locator, falling back through its ancestors
// (nearest first) when it has no textref of its own — `own: false` then,
// since the result describes that ancestor's whole extent, not just this node.
export function resolveNodeLocate(node: GndObject, ancestorChains: Map<GndObject, GndObject[]>): { own: boolean; ref: DecodedTextref } | undefined {
  const ref = decodeTextref(node);
  if (ref) return { own: true, ref };
  for (const ancestor of ancestorChains.get(node) ?? []) {
    const ancestorRef = decodeTextref(ancestor);
    if (ancestorRef) return { own: false, ref: ancestorRef };
  }
  return undefined;
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

// Skips utterances already given `locate`/`offsets` by sentence splitting;
// resolves the rest, adding a trivial whole-text `offsets` for real content.
export function attachLocate(
  utterances: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  ctx: WalkContext,
): ReadiumSpeechUtterance[] {
  const { ancestorChains } = ctx;
  // Several utterances can share one node (e.g. a language-split fragment)
  // — bare-reusing its locate for any of them would anchor the whole node.
  const nodeUseCount = new Map<GndObject, number>();
  for (const source of sources) {
    if (source && !Array.isArray(source)) nodeUseCount.set(source, (nodeUseCount.get(source) ?? 0) + 1);
  }
  return utterances.map((u, i) => {
    if (u.offsets) return u;
    const source = sources[i];
    const text = u.plain ?? u.ssml ?? "";
    if (Array.isArray(source)) {
      const [first, last] = source;
      const firstRef = resolveNodeLocate(first, ancestorChains);
      const lastRef = resolveNodeLocate(last, ancestorChains);
      const ref = spanLocate(firstRef, lastRef, preciseLocateFor(firstRef, text));
      return ref ? { ...u, locate: ref } : u;
    }
    const node = source;
    const resolved = node ? resolveNodeLocate(node, ancestorChains) : undefined;
    if (!resolved) return u;
    const result: ReadiumSpeechUtterance = { ...u, locate: resolved.ref };
    if (!ctx.synthetic.has(u)) {
      const range = ctx.pendingRange.get(u);
      const shared = range !== undefined || (node && (nodeUseCount.get(node) ?? 0) > 1);
      result.locate = resolved.own && !shared ? resolved.ref : subLocateFor(resolved.ref, text);
      result.offsets = [{ start: range?.start ?? 0, end: range?.end ?? text.length, locate: result.locate }];
    }
    return result;
  });
}
