// The id-or-generated-CSS-selector heuristic every other textref option
// (domRange, textFragment) builds its own reference on top of.
import { getCssSelector } from "css-selector-generator";
import { encodeCssSelectorFragment } from "./textrefFragment.js";

// Prefixed onto every selector generated relative to selectorRoot, so a
// plain global querySelector() can't stray outside it — css-selector-generator's own uniqueness check only tests within the given root.
export function rootAnchorSelector(selectorRoot: Element | null): string | null {
  if (!selectorRoot) return null;
  const id = selectorRoot.getAttribute("id");
  if (id) return `#${CSS.escape(id)}`;
  return getCssSelector(selectorRoot, { selectors: ["id", "class", "tag", "nthchild"] }) ?? null;
}

// An element's own "#id" when it has one, else a raw (unencoded) selector
// from css-selector-generator, unique within selectorRoot and anchored to
// it via rootAnchor — for embedding inside another structure (e.g.
// domRangeGenerator.ts's DomRangeJSON), not as a textref by itself.
export function selectorForElement(
  el: Element,
  selectorRoot: Element | null,
  rootAnchor: string | null,
): string | undefined {
  const id = el.getAttribute("id");
  if (id) return `#${CSS.escape(id)}`;
  // querySelectorAll never returns the root it's called on, so el === selectorRoot can't be found "within" itself — rootAnchor alone already identifies it.
  if (el === selectorRoot) return rootAnchor ?? undefined;
  // No "attribute": an attribute selector can latch onto something
  // JS-mutated (e.g. an inline `style` set by a layout script), which
  // silently stops matching the moment that attribute changes. "nthchild"
  // is the fallback instead — structural position, not presentation state.
  const relative = getCssSelector(el, { root: selectorRoot ?? undefined, selectors: ["id", "class", "tag", "nthchild"] });
  if (!relative) return undefined;
  return rootAnchor ? `${rootAnchor} ${relative}` : relative;
}

// The base textref every generated node gets: a bare "#id" fragment when
// the element has one, a "#css(<selector>)" fragment otherwise. Wraps
// selectorForElement's raw value so callers that already hold that value
// (e.g. domRangeGenerator.ts, reusing it for the same element) can skip
// recomputing it.
export function textrefForSelector(selector: string | undefined): string | undefined {
  if (!selector) return undefined;
  return selector.startsWith("#") ? selector : encodeCssSelectorFragment(selector);
}
