import type { GndNode, GndRole, GndTextAlternative } from "./types.js";
import { extractNodeRoles } from "./roles.js";
import {
  extractNodeAria,
  normalizedNodeText,
  convertElementToSSMLTag,
  skippedElements,
} from "./a11y.js";
import {
  type TextBuilder,
  type SSMLContext,
  textIsEmpty,
  ctxEqual,
  ssmlTextEscape,
  ssmlAttrEscape,
  startsWithBindingPunct,
  normalizeWhitespace,
} from "./text.js";
import { type ObjBuilder, NavObject, isEmptyObj, finalizeToGndNode, gndNodeToObjBuilder } from "./object.js";
import { type GndMediaType, nodeLanguage, hasElementChild, isAncestorOf, sniffMediaType } from "./dom.js";

const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

// From jsoup, everything except "device":
// https://github.com/jhy/jsoup/blob/0b10d516ed8f907f8fb4acb9a0806137a8988d45/src/main/java/org/jsoup/parser/Tag.java#L243
const inlineTags = new Set([
  "object", "base", "font", "tt", "i", "b", "u", "big", "small", "em", "strong",
  "dfn", "code", "samp", "kbd", "var", "cite", "abbr", "time", "acronym",
  "mark", "ruby", "rt", "rp", "rtc", "a", "img", "br", "wbr", "map", "q",
  "sub", "sup", "bdo", "iframe", "embed", "span", "input", "select",
  "textarea", "label", "button", "optgroup", "option", "legend", "datalist",
  "keygen", "output", "progress", "meter", "area", "param", "source",
  "track", "summary", "command", "basefont", "bgsound", "menuitem", "data",
  "bdi", "s", "strike", "nobr", "rb",
]);

// These elements are normally treated as inline (text flows through them
// without opening their own object), but when they carry a role of their own
// that role shouldn't be silently discarded — they become block elements instead.
const roleOverridesInline = new Set(["summary", "dfn", "span"]);

function isBlockNode(tagName: string, roles: GndRole[]): boolean {
  if (roleOverridesInline.has(tagName) && roles.length > 0) return true;
  return !inlineTags.has(tagName);
}

type SegmentKind = "text" | "break" | "placeholder";

interface Segment {
  kind: SegmentKind;
  text?: string;
  ctx?: SSMLContext;
  tag?: string;
  child?: NavObject;
  candidateID?: string;
}

/** Walks a DOM subtree, building the Guided Navigation object tree. */
export class Converter {
  xmlParsed: boolean;
  ids = new Map<string, Element>();
  suppressed = new Set<Element>();
  idAlloc = { claimed: new Set<string>(), counters: new Map<string, number>() };
  noterefDepth = 0;
  allowNode: Element | null = null;

  private root = new NavObject();
  private current = this.root;

  private segments: Segment[] = [];
  private textAcc = "";
  private currentCtx: SSMLContext = { lang: "", tag: "" };
  private flowEndsWithSpace = true;
  private pendingChildren: NavObject[] = [];

  constructor(xmlParsed: boolean) {
    this.xmlParsed = xmlParsed;
  }

  private allocateId(prefix: string): string {
    for (;;) {
      const n = (this.idAlloc.counters.get(prefix) ?? 0) + 1;
      this.idAlloc.counters.set(prefix, n);
      const id = `${prefix}${n}`;
      if (this.ids.has(id) || this.idAlloc.claimed.has(id)) continue;
      this.idAlloc.claimed.add(id);
      return id;
    }
  }

  private claimId(id: string): boolean {
    if (this.idAlloc.claimed.has(id)) return false;
    this.idAlloc.claimed.add(id);
    return true;
  }

  prescan(root: Element) {
    const noterefTargets: { id: string; ref: Element }[] = [];
    const walk = (n: Element, hidden: boolean) => {
      const id = n.getAttribute("id");
      if (id && !this.ids.has(id)) this.ids.set(id, n);
      hidden = hidden || n.getAttribute("aria-hidden") === "true" || n.hasAttribute("hidden");
      if (!hidden && n.tagName.toLowerCase() === "a") {
        const roles = extractNodeRoles(n);
        if (roles.includes("noteref")) {
          const href = n.getAttribute("href") ?? "";
          if (href.startsWith("#")) {
            noterefTargets.push({ id: href.slice(1), ref: n });
          }
        }
      }
      for (let c = n.firstElementChild; c; c = c.nextElementSibling) walk(c, hidden);
    };
    walk(root, false);

    for (const target of noterefTargets) {
      const n = this.ids.get(target.id);
      if (!n) continue;
      if (isAncestorOf(n, target.ref)) continue;
      this.suppressed.add(n);
    }
  }

  // Converts root itself — used when root is meaningful content in its own
  // right (e.g. a footnote element referenced by a noteref), not just a
  // structural container.
  convert(root: Element) {
    this.prescan(root);
    this.walk(root);
  }

  // Converts root's children — used at the top level, where root is always
  // just the document's <body> (or a fragment's implicit wrapper), never
  // content of its own.
  convertChildren(root: Element) {
    this.prescan(root);
    for (let c = root.firstChild; c; c = c.nextSibling) this.walk(c);
    this.flushText();
  }

  result(): GndNode[] {
    const res = this.root.finalize();
    if (!res.children || res.children.length === 0) {
      if (isEmptyObj(res)) return [];
      return [finalizeToGndNode(res)];
    }
    return res.children.map(finalizeToGndNode);
  }

  private descend(el: Element) {
    const node = new NavObject();
    node.el = el;
    node.noText = this.current.noText;
    this.current.children.push(node);
    this.current = node;
  }

  private appendChild(child: NavObject) {
    child.noText = this.current.noText;
    this.current.children.push(child);
  }

  private walk(node: Node) {
    if (node.nodeType === TEXT_NODE) {
      this.text(node);
      return;
    }
    if (node.nodeType !== ELEMENT_NODE) return;
    const el = node as Element;

    const parent = this.current;
    const wasSkip = this.head(el);
    if (!wasSkip) {
      for (let c = el.firstChild; c; c = c.nextSibling) this.walk(c);
    }
    this.tail(el, wasSkip, parent);
  }

  // Returns true if children should not be traversed (already handled
  // wholesale, invisible, or explicitly skipped).
  private head(el: Element): boolean {
    const tagName = el.tagName.toLowerCase();

    if (skippedElements.has(tagName)) return true;
    if (this.suppressed.has(el) && el !== this.allowNode) return true;

    const [aria, visible] = extractNodeAria(el);
    if (!visible && el !== this.allowNode) return true;

    const roles = extractNodeRoles(el);

    if (
      (tagName === "img" || tagName === "svg") &&
      (roles.includes("presentation") ||
        (aria === null && el.hasAttribute("alt") && el.getAttribute("alt")!.trim() === ""))
    ) {
      return true;
    }

    if (tagName === "br") {
      if (!this.current.noText) {
        this.closeSegment();
        this.segments.push({ kind: "break" });
        this.flowEndsWithSpace = true;
      }
      return true;
    }

    if (roles.includes("pagebreak")) {
      return !this.pagebreak(el, aria, roles);
    }
    if (tagName === "a" && roles.includes("noteref") && el.getAttribute("href")) {
      this.noteref(el, roles);
      return true;
    }
    if (tagName === "a" && el.getAttribute("href")) {
      // Any other link — backlink/biblioref/glossref, or a plain navigational
      // link with no specific role (e.g. a TOC entry) — carries its href as
      // textref. When it's the sole content of its enclosing block (the usual
      // case for list items), the hoist rule promotes it onto that block;
      // otherwise it becomes an inline SSML placeholder like any other
      // embedded object.
      this.link(el, roles);
      return true;
    }
    if (tagName === "img") {
      const obj: ObjBuilder = { role: roles };
      const src = el.getAttribute("src");
      if (src) obj.imgref = src;
      if (aria) obj.description = aria.plain;
      this.placeholder(el, "image", obj);
      return true;
    }
    if (tagName === "audio" || tagName === "video") {
      const obj: ObjBuilder = { role: roles };
      let src = el.getAttribute("src");
      if (!src) {
        const source = el.querySelector(":scope > source[src]");
        if (source) src = source.getAttribute("src");
      }
      if (tagName === "audio") {
        if (src) obj.audioref = src;
      } else if (src) {
        obj.videoref = src;
      }
      if (aria) obj.description = aria.plain;
      this.placeholder(el, tagName, obj);
      return true;
    }
    if (roles.includes("image") || roles.includes("math")) {
      // Elements acting as images/math without being one, e.g. <span role="img">
      // or <span role="math" aria-label="...">: their content is replaced by
      // their accessible name.
      const obj: ObjBuilder = { role: roles };
      if (aria) obj.description = aria.plain;
      this.placeholder(el, roles.includes("math") ? "math" : "image", obj);
      return true;
    }

    if (!isBlockNode(tagName, roles)) {
      return false;
    }

    this.flushText();
    this.descend(el);

    const cur = this.current.object;
    if (roles.length > 0) cur.role = roles;
    if (aria) {
      cur.description = aria.plain;
      if (roles.includes("figure")) {
        this.current.noText = true;
      }
    }
    const id = el.getAttribute("id");
    if (id) cur.id = id;

    return false;
  }

  private tail(el: Element, wasSkip: boolean, parent: NavObject) {
    if (wasSkip) return;
    const tagName = el.tagName.toLowerCase();
    const roles = extractNodeRoles(el);
    if (isBlockNode(tagName, roles)) {
      this.flushText();
      this.current = parent;
    }
  }

  private text(node: Node) {
    if (this.current.noText) return;
    const data = node.nodeValue ?? "";
    if (/^\s*$/.test(data)) {
      if (this.textAcc.length > 0 || this.segments.length > 0) {
        this.textAcc += normalizeWhitespace(data, this.flowEndsWithSpace);
        this.updateFlowSpace();
      }
      return;
    }
    const ctx = this.textContext(node);
    if (!ctxEqual(ctx, this.currentCtx)) {
      this.closeSegment();
      this.currentCtx = ctx;
    }
    this.textAcc += normalizeWhitespace(data, this.flowEndsWithSpace);
    this.updateFlowSpace();
  }

  private textContext(node: Node): SSMLContext {
    const ctx: SSMLContext = { lang: nodeLanguage(node.parentElement), tag: "" };
    for (let p = node.parentElement; p && p !== this.current.el; p = p.parentElement) {
      const [tag, attrs] = convertElementToSSMLTag(p.tagName.toLowerCase());
      if (tag && tag !== "break") {
        ctx.tag = tag;
        ctx.attrs = attrs;
        break;
      }
    }
    return ctx;
  }

  private updateFlowSpace() {
    if (this.textAcc.length > 0) {
      this.flowEndsWithSpace = this.textAcc.endsWith(" ");
    }
  }

  private closeSegment() {
    if (this.textAcc.length === 0) return;
    this.segments.push({ kind: "text", text: this.textAcc, ctx: this.currentCtx });
    this.textAcc = "";
  }

  private resetFlow() {
    this.segments = [];
    this.textAcc = "";
    this.currentCtx = { lang: "", tag: "" };
    this.flowEndsWithSpace = true;
    this.pendingChildren = [];
  }

  private placeholder(el: Element, tag: string, object: ObjBuilder, candidateID?: string) {
    if (isEmptyObj(object)) return;
    const child = new NavObject();
    child.el = el;
    child.object = object;
    if (this.current.noText) {
      this.appendChild(child);
      return;
    }
    this.closeSegment();
    this.pendingChildren.push(child);
    this.segments.push({
      kind: "placeholder",
      tag,
      child,
      candidateID: candidateID ?? el.getAttribute("id") ?? undefined,
    });
    this.flowEndsWithSpace = false;
  }

  private pagebreak(el: Element, aria: GndTextAlternative | null, roles: GndRole[]): boolean {
    const obj: ObjBuilder = { role: roles };
    const title = (el.getAttribute("title") ?? "").trim();
    if (title) {
      obj.text = { plain: title, ssml: "", language: "" };
    } else if (aria) {
      obj.text = { plain: aria.plain ?? "", ssml: aria.ssml ?? "", language: aria.language };
    }
    const labelled = !!(obj.text && !textIsEmpty(obj.text));
    const descend = !this.xmlParsed && (hasElementChild(el) || (labelled && el.firstChild !== null));
    if (!labelled && !descend) {
      const text = normalizedNodeText(el);
      if (text) obj.text = { plain: text, ssml: "", language: "" };
    }
    const id = el.getAttribute("id");
    if (id) obj.textref = `#${id}`;
    this.placeholder(el, "pagebreak", obj);
    return descend;
  }

  private noteref(el: Element, roles: GndRole[]) {
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
      const target = this.ids.get(fragment);
      if (target && !isAncestorOf(target, el) && this.noterefDepth < 3) {
        const sub = new Converter(this.xmlParsed);
        sub.ids = this.ids;
        sub.suppressed = this.suppressed;
        sub.idAlloc = this.idAlloc;
        sub.noterefDepth = this.noterefDepth + 1;
        sub.allowNode = target;
        sub.convert(target);
        const children = sub.result();
        if (children.length > 0) {
          // The target's own id already carries its meaning via this
          // noteref's own id — repeating it on the embedded content would
          // be redundant.
          obj.children = children.map((c) => {
            const o = gndNodeToObjBuilder(c);
            delete o.id;
            return o;
          });
        }
      }
    }
    if (!obj.children && href) {
      obj.children = [{ textref: href }];
    }

    this.placeholder(el, "noteref", obj, candidateID || undefined);
  }

  private link(el: Element, roles: GndRole[]) {
    const obj: ObjBuilder = {};
    if (roles.length > 0) obj.role = roles;
    const text = normalizedNodeText(el);
    if (text) obj.text = { plain: text, ssml: "", language: "" };
    const href = el.getAttribute("href");
    if (href) obj.textref = href;
    this.placeholder(el, roles[0] ?? "link", obj);
  }

  private flushText() {
    this.closeSegment();
    let segments = this.segments;
    const pending = this.pendingChildren;
    this.resetFlow();

    if (segments.length === 0) return;

    // Trim the edges of the flow.
    while (segments.length > 0) {
      const seg = segments[0];
      if (seg.kind === "break") {
        segments = segments.slice(1);
        continue;
      }
      if (seg.kind === "text") {
        const trimmed = seg.text!.replace(/^\s+/, "");
        if (trimmed === "") {
          segments = segments.slice(1);
          continue;
        }
        segments = [{ ...seg, text: trimmed }, ...segments.slice(1)];
      }
      break;
    }
    while (segments.length > 0) {
      const seg = segments[segments.length - 1];
      if (seg.kind === "break") {
        segments = segments.slice(0, -1);
        continue;
      }
      if (seg.kind === "text") {
        const trimmed = seg.text!.replace(/\s+$/, "");
        if (trimmed === "") {
          segments = segments.slice(0, -1);
          continue;
        }
        segments = [...segments.slice(0, -1), { ...seg, text: trimmed }];
      }
      break;
    }

    const hasText = segments.some((s) => s.kind === "text" && s.text!.trim() !== "");
    if (!hasText) {
      for (const child of pending) this.appendChild(child);
      return;
    }

    const textLangs: string[] = [];
    for (const seg of segments) {
      if (seg.kind === "text" && seg.text!.trim() !== "") {
        const lang = seg.ctx!.lang;
        if (!textLangs.includes(lang)) textLangs.push(lang);
      }
    }
    let baseLang = nodeLanguage(this.current.el ?? null);
    if (textLangs.length === 1 && textLangs[0] !== "") {
      baseLang = textLangs[0];
    }

    let needSSML = false;
    for (const seg of segments) {
      if (seg.kind !== "text" || seg.ctx!.tag !== "" || seg.ctx!.lang !== baseLang) {
        needSSML = true;
        break;
      }
    }

    // Default to English when an SSML representation is required (mixed
    // formatting, embedded objects, or a language shift) but no explicit
    // language was declared anywhere in the document.
    if (needSSML && baseLang === "") {
      baseLang = "en";
    }

    if (needSSML) {
      for (const seg of segments) {
        if (seg.kind !== "placeholder") continue;
        let id = seg.candidateID;
        if (!id || !this.claimId(id)) {
          id = this.allocateId(seg.tag!);
        }
        seg.child!.object.id = id;
      }
    }

    let plainB = "";
    let prevTrail = false;
    let sawBreak = false;
    let sawPlaceholder = false;
    let midSpace = false;
    for (const seg of segments) {
      if (seg.kind === "text") {
        const lead = seg.text!.startsWith(" ");
        const t = seg.text!.replace(/^ +| +$/g, "");
        if (t === "") {
          midSpace = true;
          continue;
        }
        let join = false;
        if (plainB.length > 0) {
          const spaced = prevTrail || midSpace || lead;
          if (sawBreak) join = true;
          else if (sawPlaceholder) join = spaced && !startsWithBindingPunct(t);
          else join = spaced;
        }
        if (join) plainB += " ";
        plainB += t;
        prevTrail = seg.text!.endsWith(" ");
        sawBreak = false;
        sawPlaceholder = false;
        midSpace = false;
      } else if (seg.kind === "break") {
        sawBreak = true;
      } else if (seg.kind === "placeholder") {
        sawPlaceholder = true;
      }
    }

    // Plain text is only worth keeping alongside SSML when it diverges from
    // what stripping tags from the SSML would produce — i.e. when a
    // placeholder (an embedded reference) was dropped from it. A pure
    // formatting/language shift with no embedded objects makes plain text a
    // redundant, mechanical derivative of the SSML, so it's left out.
    const hasPlaceholder = segments.some((s) => s.kind === "placeholder");
    const text: TextBuilder = {
      plain: needSSML && !hasPlaceholder ? "" : plainB.trim(),
      ssml: "",
      language: baseLang,
    };

    if (needSSML) {
      let sb = "";
      for (const seg of segments) {
        if (seg.kind === "text") {
          let tag = seg.ctx!.tag;
          let attrs = seg.ctx!.attrs;
          if (seg.ctx!.lang !== baseLang && seg.ctx!.lang !== "") {
            // A language shift takes priority over whatever SSML tag the
            // shifting element would otherwise map to.
            tag = "lang";
            attrs = undefined;
          }
          if (tag) {
            sb += `<${tag}`;
            for (const [k, v] of Object.entries(attrs ?? {})) {
              sb += ` ${k}="${ssmlAttrEscape(v)}"`;
            }
            if (seg.ctx!.lang !== baseLang && seg.ctx!.lang !== "") {
              sb += ` xml:lang="${ssmlAttrEscape(seg.ctx!.lang)}"`;
            }
            sb += `>${ssmlTextEscape(seg.text!)}</${tag}>`;
          } else {
            sb += ssmlTextEscape(seg.text!);
          }
        } else if (seg.kind === "break") {
          sb += "<break/>";
        } else if (seg.kind === "placeholder") {
          sb += `<readium:${seg.tag} id="${ssmlAttrEscape(seg.child!.object.id!)}" />`;
        }
      }
      text.ssml = sb;
    }

    const textObj = new NavObject();
    textObj.object = { text };
    for (const child of pending) {
      textObj.children.push(child);
    }
    this.appendChild(textObj);
  }
}

/**
 * Converts the children of an HTML or XHTML fragment or document's <body>
 * into Guided Navigation objects.
 */
export function parseMarkup(input: string, mediaType?: GndMediaType): GndNode[] {
  const mt = mediaType ?? sniffMediaType(input);
  const doc = new DOMParser().parseFromString(input, mt);
  const body = doc.querySelector("body");
  const root = body ?? doc.documentElement;

  const converter = new Converter(mt === "application/xhtml+xml");
  converter.convertChildren(root);
  return converter.result();
}
