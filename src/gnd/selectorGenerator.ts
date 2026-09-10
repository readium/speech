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
  if (id) return `#${CSS.escape(id)}`;
  // documentElement, not docRoot: Document.querySelector() resolves ":scope"
  // to the root element, not the Document node, so a Document root here would never resolve.
  return getCssSelector(el, { root: docRoot?.documentElement ?? undefined }) ?? undefined;
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
