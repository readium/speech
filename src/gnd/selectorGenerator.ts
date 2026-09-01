// The id-or-generated-CSS-selector heuristic every other textref option
// (domRange, textFragment) builds its own reference on top of.
import { getCssSelector } from "css-selector-generator";
import { encodeCssSelectorFragment } from "./textrefFragment.js";

// An element's own "#id" when it has one, else a raw (unencoded) selector
// from css-selector-generator scoped to docRoot — for embedding inside
// another structure (e.g. domRangeGenerator.ts's DomRangeJSON), not as a
// textref by itself.
export function selectorForElement(el: Element, docRoot: Document | null): string | undefined {
  const id = el.getAttribute("id");
  if (id) return `#${id}`;
  return getCssSelector(el, { root: docRoot ?? undefined }) ?? undefined;
}

// The base textref every generated node gets: a bare "#id" fragment when
// the element has one, a "#css(<selector>)" fragment otherwise.
export function generateSelectorTextref(el: Element, docRoot: Document | null): string | undefined {
  const id = el.getAttribute("id");
  if (id) return `#${id}`;
  const selector = getCssSelector(el, { root: docRoot ?? undefined });
  return selector ? encodeCssSelectorFragment(selector) : undefined;
}
