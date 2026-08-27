const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

// A leading text sibling only merges into an element's own extracted text
// when that element reads its content via the normal running-text flow. A
// link, or any role-bearing wrapper (e.g. an epub:type="credit" <span>),
// extracts its text independently of surrounding siblings — a number
// inserted next to it would be stranded as its own node instead of becoming
// part of that element's text. Descending through a chain of "this element's
// entire content is one other element" finds the element whose own text
// really is this <li>'s effective content, so the number merges wherever the
// pre-existing (non-numbered) conversion already collapsed that content to.
function textHost(el: Element): Element {
  let host = el;
  for (;;) {
    const children = [...host.childNodes].filter(
      (n) => n.nodeType !== TEXT_NODE || (n.nodeValue ?? "").trim() !== "",
    );
    if (children.length !== 1 || children[0].nodeType !== ELEMENT_NODE) return host;
    host = children[0] as Element;
  }
}

// HTML's li ordinal-value algorithm (start/reversed/value), plus aria-posinset
// as a per-item display override that doesn't perturb the chain for siblings —
// https://html.spec.whatwg.org/multipage/grouping-content.html#the-li-element,
// https://www.w3.org/TR/wai-aria-1.2/#aria-posinset
//
// Inserts the computed number as a leading text node, rather than returning
// it, so the rest of the conversion pipeline (text accumulation, hoisting,
// SSML composition) treats it as ordinary source text with no dedicated code
// path of its own.
export function insertListItemNumbers(ol: Element): void {
  const items = [...ol.children].filter((c) => c.tagName.toLowerCase() === "li");
  const reversed = ol.hasAttribute("reversed");
  const startAttr = parseInt(ol.getAttribute("start") ?? "", 10);
  const start = Number.isFinite(startAttr) ? startAttr : undefined;
  let next = start ?? (reversed ? items.length : 1);
  const step = reversed ? -1 : 1;

  for (const li of items) {
    const valueAttr = parseInt(li.getAttribute("value") ?? "", 10);
    const ordinal = Number.isFinite(valueAttr) ? valueAttr : next;
    next = ordinal + step;

    const posinsetAttr = parseInt(li.getAttribute("aria-posinset") ?? "", 10);
    const posinset = Number.isFinite(posinsetAttr) && posinsetAttr >= 1 ? posinsetAttr : undefined;
    const n = posinset ?? ordinal;

    const host = textHost(li);
    host.insertBefore(host.ownerDocument.createTextNode(`${n}. `), host.firstChild);
  }
}
