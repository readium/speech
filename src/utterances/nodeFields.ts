import type { GuidedNavigationObject, GuidedNavigationText } from "@readium/shared";
import type { GndRole } from "@readium/guided-navigation";

export function nodeRoles(node: GuidedNavigationObject): GndRole[] {
  return node.role ? [...node.role] : [];
}

// Math markup (MathML or not) can't be voiced reliably, so math is only spoken through its description.
export function spokenText(node: GuidedNavigationObject): GuidedNavigationText | undefined {
  return node.role?.has("math") ? undefined : node.text;
}

// Only a description's text is spoken; its refs, if any, are ignored.
export function descriptionOf(node: GuidedNavigationObject): string | undefined {
  return node.description?.text?.plain;
}
