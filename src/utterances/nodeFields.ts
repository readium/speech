import { GuidedNavigationText, type GuidedNavigationObject } from "@readium/shared";
import type { GndRole } from "@readium/guided-navigation";
import { parseSsml } from "./ssml.js";
import { stripSsmlTags } from "./text.js";

export function nodeRoles(node: GuidedNavigationObject): GndRole[] {
  return node.role ? [...node.role] : [];
}

const unwrappedTexts = new WeakMap<GuidedNavigationText, GuidedNavigationText>();

// `text` with a root `<speak>` unwrapped, as its SSML is spliced into utterances where a `<speak>` can't nest;
// the `<speak>`'s `xml:lang` stands for the text's language when it declares none.
export function nodeText(text: GuidedNavigationText | undefined): GuidedNavigationText | undefined {
  if (!text?.ssml) return text;
  let unwrapped = unwrappedTexts.get(text);
  if (!unwrapped) {
    const roots = parseSsml(text.ssml).filter((node) => node.kind === "element" || node.text.trim() !== "");
    const speak = roots.length === 1 && roots[0].kind === "element" && roots[0].name === "speak" ? roots[0] : undefined;
    unwrapped = speak
      ? new GuidedNavigationText({
          plain: text.plain,
          ssml: speak.selfClosing ? "" : text.ssml.slice(speak.start + speak.openTag.length, speak.closeStart),
          language: text.language ?? speak.attrs.get("xml:lang"),
        })
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
