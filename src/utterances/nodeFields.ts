import { GuidedNavigationText, type GuidedNavigationObject } from "@readium/shared";
import type { GndRole } from "@readium/guided-navigation";
import { ssmlAttrEscape } from "@readium/helpers";
import { parseSsml, ssmlElements, type SsmlElement } from "./ssml.js";
import { breakSpaced, stripSsmlTags, stripSsmlTagsKeepSpacing } from "./text.js";

export function nodeRoles(node: GuidedNavigationObject): GndRole[] {
  return node.role ? [...node.role] : [];
}

const unwrappedTexts = new WeakMap<GuidedNavigationText, GuidedNavigationText>();

// `speak`'s content, its `xmlns:*` declarations moved onto each top-level element so prefixes stay bound.
function speakContent(ssml: string, speak: SsmlElement): string {
  if (speak.selfClosing) return "";
  const declarations = [...speak.attrs].filter(([name]) => name.startsWith("xmlns:"));
  let content = "";
  let at = speak.start + speak.openTag.length;
  for (const child of speak.children) {
    if (child.kind !== "element") continue;
    const missing = declarations.filter(([name]) => !child.attrs.has(name));
    if (!missing.length) continue;
    const tagEnd = child.start + child.openTag.search(/\s*\/?>$/);
    content += ssml.slice(at, tagEnd) + missing.map(([name, value]) => ` ${name}="${ssmlAttrEscape(value)}"`).join("");
    at = tagEnd;
  }
  return content + ssml.slice(at, speak.closeStart);
}

interface Edit {
  start: number;
  end: number;
  text: string;
  opens: boolean;
}

// `ssml` with every `<p>`/`<s>` unwrapped, one declaring `xml:lang` kept as a `<lang>`, and a space where one separated words.
function withoutParagraphsAndSentences(ssml: string): string {
  const edits: Edit[] = [];
  for (const element of ssmlElements(parseSsml(ssml))) {
    if (element.name !== "p" && element.name !== "s") continue;
    const language = element.attrs.get("xml:lang");
    const lang = language === undefined ? undefined : `<lang xml:lang="${ssmlAttrEscape(language)}">`;
    if (element.selfClosing) {
      edits.push({ start: element.start, end: element.end, text: "", opens: false });
      continue;
    }
    edits.push({ start: element.start, end: element.start + element.openTag.length, text: lang ?? "", opens: true });
    edits.push({ start: element.closeStart, end: element.end, text: lang ? "</lang>" : "", opens: false });
  }
  if (!edits.length) return ssml;
  edits.sort((a, b) => a.start - b.start);
  let out = "";
  let cursor = 0;
  for (let i = 0; i < edits.length; ) {
    let j = i + 1;
    while (j < edits.length && edits[j].start === edits[j - 1].end) j++;
    const group = edits.slice(i, j);
    out += ssml.slice(cursor, group[0].start);
    const firstOpen = group.findIndex((edit) => edit.opens);
    const [closing, opening] = firstOpen === -1 ? [group, []] : [group.slice(0, firstOpen), group.slice(firstOpen)];
    cursor = group[group.length - 1].end;
    out += closing.map((edit) => edit.text).join("");
    if (breakSpaced(stripSsmlTagsKeepSpacing(out), stripSsmlTagsKeepSpacing(ssml.slice(cursor)))) out += " ";
    out += opening.map((edit) => edit.text).join("");
    i = j;
  }
  return out + ssml.slice(cursor);
}

// `text` as spliced into utterances: a root `<speak>` unwrapped, as a `<speak>` can't nest, its `xml:lang` standing for
// the text's language when it declares none; `<p>`/`<s>` unwrapped, as paragraphs are roles and sentences are segmented.
export function nodeText(text: GuidedNavigationText | undefined): GuidedNavigationText | undefined {
  if (!text?.ssml) return text;
  let unwrapped = unwrappedTexts.get(text);
  if (!unwrapped) {
    const flattened = withoutParagraphsAndSentences(text.ssml);
    const roots = parseSsml(flattened).filter((node) => node.kind === "element" || node.text.trim() !== "");
    const speak = roots.length === 1 && roots[0].kind === "element" && roots[0].name === "speak" ? roots[0] : undefined;
    const ssml = speak ? speakContent(flattened, speak) : flattened;
    unwrapped =
      ssml !== text.ssml
        ? new GuidedNavigationText({ plain: text.plain, ssml, language: text.language ?? speak?.attrs.get("xml:lang") })
        : text;
    unwrappedTexts.set(text, unwrapped);
  }
  return unwrapped;
}

// Math markup (MathML or not) can't be voiced reliably, so math is only spoken through its description.
export function spokenText(node: GuidedNavigationObject): GuidedNavigationText | undefined {
  return node.role?.has("math") ? undefined : nodeText(node.text);
}

// Only a description's text is spoken; its refs, if any, are ignored.
export function descriptionOf(node: GuidedNavigationObject): string | undefined {
  const text = nodeText(node.description?.text);
  if (!text) return undefined;
  return text.plain ?? (text.ssml !== undefined ? stripSsmlTags(text.ssml) : undefined);
}

export function descriptionLanguageOf(node: GuidedNavigationObject): string | undefined {
  return nodeText(node.description?.text)?.language;
}
