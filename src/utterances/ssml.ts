import { ssmlAttrEscape, ssmlTextEscape } from "@readium/helpers";

export interface SsmlElement {
  kind: "element";
  name: string;
  attrs: Map<string, string>;
  children: SsmlNode[];
  selfClosing: boolean;
  // The opening tag as written in the source, so unchanged elements serialize byte-identically.
  openTag: string;
  // Source offsets: where the element starts, where its closing tag starts, and where it ends.
  start: number;
  closeStart: number;
  end: number;
}

export interface SsmlText {
  kind: "text";
  text: string; // decoded
}

export type SsmlNode = SsmlElement | SsmlText;

// A text node, or a childless element (e.g. `<break/>`), with the elements enclosing it, outermost first.
export interface SsmlLeaf {
  node: SsmlText | SsmlElement;
  ancestors: SsmlElement[];
}

const NAME = "[A-Za-z_][\\w.:-]*";
const ATTR_RE = new RegExp(`(${NAME})\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "g");
const OPEN_TAG_RE = new RegExp(`^<(${NAME})((?:\\s+${NAME}\\s*=\\s*(?:"[^"]*"|'[^']*'))*)\\s*(/?)>`);
const CLOSE_TAG_RE = new RegExp(`^</(${NAME})\\s*>`);

// `nbsp` isn't an XML entity, but HTML-minded producers write it; left undecoded it would be read aloud.
const NAMED_ENTITIES: Record<string, string> = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'", nbsp: " " };

export const SSML_ENTITY_RE = /&(?:#x([0-9a-fA-F]+)|#([0-9]+)|(lt|gt|amp|quot|apos|nbsp));/g;

function decodeEntity(match: string, hex?: string, dec?: string, named?: string): string {
  if (named) return NAMED_ENTITIES[named];
  const code = hex ? parseInt(hex, 16) : parseInt(dec!, 10);
  return code <= 0x10ffff ? String.fromCodePoint(code) : match;
}

export function decodeSsmlEntities(text: string): string {
  return text.replace(SSML_ENTITY_RE, decodeEntity);
}

// The entity starting at `index` in `text` and what it decodes to, if there's one there.
export function ssmlEntityAt(text: string, index: number): { length: number; decoded: string } | undefined {
  const re = new RegExp(SSML_ENTITY_RE.source, "y");
  re.lastIndex = index;
  const match = re.exec(text);
  return match ? { length: match[0].length, decoded: decodeEntity(match[0], match[1], match[2], match[3]) } : undefined;
}

function parseAttrs(source: string): Map<string, string> {
  const attrs = new Map<string, string>();
  for (const match of source.matchAll(ATTR_RE)) attrs.set(match[1], decodeSsmlEntities(match[2] ?? match[3]));
  return attrs;
}

function parseOrThrow(ssml: string): SsmlNode[] {
  const root: SsmlNode[] = [];
  const stack: SsmlElement[] = [];
  const children = () => (stack.length ? stack[stack.length - 1].children : root);
  const pushText = (text: string) => {
    if (!text) return;
    const siblings = children();
    const last = siblings[siblings.length - 1];
    if (last?.kind === "text") last.text += text;
    else siblings.push({ kind: "text", text });
  };

  let i = 0;
  while (i < ssml.length) {
    const lt = ssml.indexOf("<", i);
    if (lt === -1) {
      pushText(decodeSsmlEntities(ssml.slice(i)));
      break;
    }
    pushText(decodeSsmlEntities(ssml.slice(i, lt)));
    const rest = ssml.slice(lt);
    if (rest.startsWith("<!--")) {
      const end = ssml.indexOf("-->", lt + 4);
      if (end === -1) throw new Error("unclosed comment");
      i = end + 3;
    } else if (rest.startsWith("<![CDATA[")) {
      const end = ssml.indexOf("]]>", lt + 9);
      if (end === -1) throw new Error("unclosed CDATA");
      pushText(ssml.slice(lt + 9, end));
      i = end + 3;
    } else if (rest.startsWith("<?")) {
      const end = ssml.indexOf("?>", lt + 2);
      if (end === -1) throw new Error("unclosed processing instruction");
      i = end + 2;
    } else if (rest.startsWith("<!")) {
      const end = ssml.indexOf(">", lt);
      if (end === -1) throw new Error("unclosed declaration");
      i = end + 1;
    } else if (rest.startsWith("</")) {
      const match = CLOSE_TAG_RE.exec(rest);
      const element = stack.pop();
      if (!match || element?.name !== match[1]) throw new Error("mismatched closing tag");
      i = lt + match[0].length;
      element.closeStart = lt;
      element.end = i;
    } else {
      const match = OPEN_TAG_RE.exec(rest);
      if (!match) throw new Error("malformed tag");
      const element: SsmlElement = {
        kind: "element",
        name: match[1],
        attrs: parseAttrs(match[2]),
        children: [],
        selfClosing: match[3] === "/",
        openTag: match[0],
        start: lt,
        closeStart: lt + match[0].length,
        end: lt + match[0].length,
      };
      children().push(element);
      if (!element.selfClosing) stack.push(element);
      i = lt + match[0].length;
    }
  }
  if (stack.length) throw new Error("unclosed element");
  return root;
}

// Parses an SSML fragment (any number of top-level nodes); input that isn't well-formed is read as one text node.
export function parseSsml(ssml: string): SsmlNode[] {
  try {
    return parseOrThrow(ssml);
  } catch {
    return ssml ? [{ kind: "text", text: ssml }] : [];
  }
}

export function closeTag(element: SsmlElement): string {
  return element.selfClosing ? "" : `</${element.name}>`;
}

export function serializeSsml(nodes: SsmlNode[]): string {
  let out = "";
  for (const node of nodes) {
    if (node.kind === "text") out += ssmlTextEscape(node.text);
    else out += node.openTag + (node.selfClosing ? "" : serializeSsml(node.children) + closeTag(node));
  }
  return out;
}

export function commonAncestors(a: SsmlElement[], b: SsmlElement[]): SsmlElement[] {
  let common = 0;
  while (common < a.length && common < b.length && a[common] === b[common]) common++;
  return a.slice(0, common);
}

// Builds SSML from pieces each placed under a chain of elements, closing and reopening elements as the chain changes.
export class SsmlWriter {
  private out = "";
  private open: SsmlElement[] = [];

  private moveTo(chain: SsmlElement[]): void {
    const common = commonAncestors(this.open, chain).length;
    while (this.open.length > common) this.out += closeTag(this.open.pop()!);
    for (const element of chain.slice(common)) {
      this.out += element.openTag;
      this.open.push(element);
    }
  }

  text(chain: SsmlElement[], text: string): void {
    if (!text) return;
    this.moveTo(chain);
    this.out += ssmlTextEscape(text);
  }

  node(chain: SsmlElement[], node: SsmlNode): void {
    this.moveTo(chain);
    this.out += serializeSsml([node]);
  }

  // The SSML written so far, with every open element closed; the writer starts over empty.
  flush(): string {
    this.moveTo([]);
    const out = this.out;
    this.out = "";
    return out;
  }
}

const STRUCTURE_ELEMENTS = new Set(["speak", "p", "s"]);

// Whether `element` is a `<speak>`, `<p>` or `<s>`, which a split must never repeat around each piece.
export function isStructureElement(element: SsmlElement): boolean {
  return STRUCTURE_ELEMENTS.has(element.name);
}

const LANGUAGE_ELEMENTS = new Set(["lang", "p", "s", "voice", "token", "w"]);

// The language an element declares with `xml:lang`, `undefined` for an element that can't declare one.
export function declaredLanguage(element: SsmlElement): string | undefined {
  return LANGUAGE_ELEMENTS.has(element.name) ? element.attrs.get("xml:lang") : undefined;
}

// Every element of `nodes`, in document order.
export function* ssmlElements(nodes: SsmlNode[]): Generator<SsmlElement> {
  for (const node of nodes) {
    if (node.kind !== "element") continue;
    yield node;
    yield* ssmlElements(node.children);
  }
}

// Sets, or with `undefined` removes, an attribute, rebuilding the opening tag.
export function setSsmlAttribute(element: SsmlElement, name: string, value: string | undefined): void {
  if (value === undefined) element.attrs.delete(name);
  else element.attrs.set(name, value);
  const attrs = [...element.attrs].map(([key, attrValue]) => ` ${key}="${ssmlAttrEscape(attrValue)}"`).join("");
  element.openTag = `<${element.name}${attrs}${element.selfClosing ? "/" : ""}>`;
}

// `nodes` with each element matching `unwrap` replaced by its children.
export function unwrapSsmlElements(nodes: SsmlNode[], unwrap: (element: SsmlElement) => boolean): SsmlNode[] {
  return nodes.flatMap((node) => {
    if (node.kind === "text") return [node];
    const children = unwrapSsmlElements(node.children, unwrap);
    return unwrap(node) ? children : [{ ...node, children }];
  });
}

// Every text node and childless element of `nodes`, in document order; an element matching `whole` counts as one leaf.
export function ssmlLeaves(nodes: SsmlNode[], whole?: (element: SsmlElement) => boolean, ancestors: SsmlElement[] = []): SsmlLeaf[] {
  const leaves: SsmlLeaf[] = [];
  for (const node of nodes) {
    if (node.kind === "element" && node.children.length > 0 && !whole?.(node)) {
      leaves.push(...ssmlLeaves(node.children, whole, [...ancestors, node]));
    } else leaves.push({ node, ancestors });
  }
  return leaves;
}
