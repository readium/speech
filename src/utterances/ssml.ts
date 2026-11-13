import { ssmlTextEscape } from "@readium/helpers";

export interface SsmlElement {
  kind: "element";
  name: string;
  attrs: Map<string, string>;
  children: SsmlNode[];
  selfClosing: boolean;
  // The opening tag as written in the source, so unchanged elements serialize byte-identically.
  openTag: string;
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

const NAMED_ENTITIES: Record<string, string> = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'" };

export function decodeSsmlEntities(text: string): string {
  return text.replace(/&(?:#x([0-9a-fA-F]+)|#([0-9]+)|(lt|gt|amp|quot|apos));/g, (match, hex, dec, named) => {
    if (named) return NAMED_ENTITIES[named];
    const code = hex ? parseInt(hex, 16) : parseInt(dec, 10);
    return code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
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
    } else if (rest.startsWith("<?") || rest.startsWith("<!")) {
      const end = ssml.indexOf(">", lt);
      if (end === -1) throw new Error("unclosed declaration");
      i = end + 1;
    } else if (rest.startsWith("</")) {
      const match = CLOSE_TAG_RE.exec(rest);
      if (!match || stack.pop()?.name !== match[1]) throw new Error("mismatched closing tag");
      i = lt + match[0].length;
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

// Every text node and childless element of `nodes`, in document order.
export function ssmlLeaves(nodes: SsmlNode[], ancestors: SsmlElement[] = []): SsmlLeaf[] {
  const leaves: SsmlLeaf[] = [];
  for (const node of nodes) {
    if (node.kind === "element" && node.children.length > 0) leaves.push(...ssmlLeaves(node.children, [...ancestors, node]));
    else leaves.push({ node, ancestors });
  }
  return leaves;
}
