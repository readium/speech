// Handlers for element kinds that build one placeholder ObjBuilder each
// (pagebreak/noteref/link), calling back into the converter for
// placeholder() and, for noteref's footnote embedding, convert()/result()
// on a sub-Converter of its own.
import type { GndRole, GndText } from "./types.js";
import { normalizedNodeText } from "./a11y.js";
import { textIsEmpty } from "./text.js";
import { type ObjBuilder, gndObjectToObjBuilder } from "./object.js";
import { hasElementChild, isAncestorOf } from "./dom.js";
import { Converter } from "./converter.js";

// Returns true if el's children should still be descended into (a
// pagebreak with element children of its own, in HTML parsing).
export function pagebreak(converter: Converter, el: Element, aria: GndText | null, roles: GndRole[]): boolean {
  const obj: ObjBuilder = { role: roles };
  const title = (el.getAttribute("title") ?? "").trim();
  if (title) {
    obj.text = { plain: title, ssml: "", language: "" };
  } else if (aria) {
    obj.text = { plain: aria.plain ?? "", ssml: aria.ssml ?? "", language: aria.language };
  }
  const labelled = !!(obj.text && !textIsEmpty(obj.text));
  const descend = !converter.xmlParsed && (hasElementChild(el) || (labelled && el.firstChild !== null));
  if (!labelled && !descend) {
    const text = normalizedNodeText(el);
    if (text) obj.text = { plain: text, ssml: "", language: "" };
  }
  const id = el.getAttribute("id");
  if (id) obj.textref = `#${id}`;
  converter.placeholder(el, "pagebreak", obj);
  return descend;
}

export function noteref(converter: Converter, el: Element, roles: GndRole[]): void {
  const obj: ObjBuilder = { role: roles };
  const text = normalizedNodeText(el);
  if (text) obj.text = { plain: text, ssml: "", language: "" };

  const href = el.getAttribute("href") ?? "";
  let candidateID = el.getAttribute("id") ?? "";
  if (!candidateID && href.startsWith("#")) {
    candidateID = href.slice(1);
  }

  if (href.startsWith("#")) {
    const fragment = href.slice(1);
    const target = converter.ids.get(fragment);
    if (target && !isAncestorOf(target, el) && converter.noterefDepth < 3) {
      const sub = new Converter(converter.xmlParsed);
      sub.ids = converter.ids;
      sub.suppressed = converter.suppressed;
      sub.idAlloc = converter.idAlloc;
      sub.noterefDepth = converter.noterefDepth + 1;
      sub.allowNode = target;
      sub.docRoot = converter.docRoot;
      sub.selectorPredicate = converter.selectorPredicate;
      sub.domRangeEnabled = converter.domRangeEnabled;
      sub.textFragmentEnabled = converter.textFragmentEnabled;
      sub.textFragmentGenerator = converter.getTextFragmentGenerator();
      sub.convert(target);
      const children = sub.result();
      if (children.length > 0) {
        // The target's own id already carries its meaning via this
        // noteref's own id — repeating it on the embedded content would
        // be redundant.
        obj.children = children.map((c) => {
          const o = gndObjectToObjBuilder(c);
          delete o.id;
          return o;
        });
      }
    }
  }
  if (!obj.children && href) {
    obj.children = [{ textref: href }];
  }

  converter.placeholder(el, "noteref", obj, candidateID || undefined);
}

export function link(converter: Converter, el: Element, roles: GndRole[]): void {
  const obj: ObjBuilder = {};
  if (roles.length > 0) obj.role = roles;
  const text = normalizedNodeText(el);
  if (text) obj.text = { plain: text, ssml: "", language: "" };
  const href = el.getAttribute("href");
  if (href) obj.textref = href;
  converter.placeholder(el, roles[0] ?? "link", obj);
}
