// Builds a Locator DomRange for TextrefOptions.domRange — see
// Converter.applyTextref in converter.ts.
import type { DomRangeJSON } from "./textrefFragment.js";
import { selectorForElement } from "./selectorGenerator.js";

const TEXT_NODE = 3;

// A DomRangePoint's textNodeIndex counts only among container's Text-node
// children, per the Locator HTML extension spec.
function textNodeIndexAmongChildren(container: Element, target: Text): number {
  let idx = 0;
  for (const child of Array.from(container.childNodes)) {
    if (child === target) return idx;
    if (child.nodeType === TEXT_NODE) idx++;
  }
  return idx;
}

function domRangePoint(node: Text, offset: number, docRoot: Document | null): DomRangeJSON["start"] | undefined {
  const container = node.parentElement;
  if (!container) return undefined;
  const cssSelector = selectorForElement(container, docRoot);
  if (!cssSelector) return undefined;
  return { cssSelector, textNodeIndex: textNodeIndexAmongChildren(container, node), charOffset: offset };
}

// Builds a Locator DomRange pinpointing range's exact start/end text nodes
// and character offsets, not just the containing element — only meaningful
// against a live, already-rendered document (see TextrefOptions.domRange).
export function generateDomRange(
  range: { first: [Text, number]; last: [Text, number] },
  docRoot: Document | null,
): DomRangeJSON | undefined {
  const start = domRangePoint(...range.first, docRoot);
  if (!start) return undefined;
  const end = domRangePoint(...range.last, docRoot);
  return end ? { start, end } : { start };
}
