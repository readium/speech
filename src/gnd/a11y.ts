import type { GndText } from "./types.js";
import { normalizeWhitespace } from "./text.js";

function nodeIsHidden(el: Element): boolean {
  if (el.getAttribute("aria-hidden") === "true") return true;
  if (el.hasAttribute("hidden")) return true;
  return false;
}

function nodeText(el: Node): string {
  let text = "";
  const walk = (n: Node) => {
    if (n.nodeType === 3 /* TEXT_NODE */) {
      text += n.nodeValue ?? "";
    }
    for (let c = n.firstChild; c; c = c.nextSibling) walk(c);
  };
  walk(el);
  return text;
}

/** Normalized (whitespace-coalesced and trimmed) text content of a node's subtree. */
export function normalizedNodeText(el: Node): string {
  return normalizeWhitespace(nodeText(el), true).trim();
}

/**
 * Computes the text that becomes a node's `GndObject.description`, and
 * whether the node is visible in the first place. Follows the AccName
 * precedence order (https://www.w3.org/TR/accname/#terminology, 2.A-2.D)
 * for its accessible-name sources, with a non-AccName `aria-describedby`
 * fallback spliced in between 2.C and 2.D — see that branch below.
 */
export function extractNodeAria(el: Element): [GndText | null, boolean] {
  // 2.A
  if (nodeIsHidden(el)) {
    return [null, false];
  }

  // 2.B
  const labelledBy = (el.getAttribute("aria-labelledby") ?? "").trim();
  if (labelledBy) {
    const ids = [...new Set(labelledBy.split(/\s+/).filter(Boolean))];
    const doc = el.ownerDocument;
    const labelNodes = ids
      .map((id) => doc.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);

    if (labelNodes.length > 0) {
      let text = "";
      labelNodes.forEach((n, i) => {
        if (nodeIsHidden(n)) return;
        const label = n.getAttribute("aria-label");
        text += label ? label : nodeText(n);
        if (i < labelNodes.length - 1) text += " ";
      });
      const normalized = normalizeWhitespace(text, true).trim();
      if (normalized !== "") {
        return [{ language: "", plain: normalized }, true];
      }
    }
  }

  // 2.C
  const label = (el.getAttribute("aria-label") ?? "").trim();
  if (label) {
    return [{ language: "", plain: label }, true];
  }

  // Not part of the AccName algorithm proper (which computes a name, not a
  // description) — used here as a fallback source for the Guided Navigation
  // `description` field specifically, e.g. a <figure aria-describedby="...">
  // pointing to a longer, possibly hidden, description elsewhere in the document.
  const describedBy = (el.getAttribute("aria-describedby") ?? "").trim();
  if (describedBy) {
    const ids = [...new Set(describedBy.split(/\s+/).filter(Boolean))];
    const nodes = ids
      .map((id) => el.ownerDocument.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length > 0) {
      const text = nodes.map((n) => nodeText(n)).join(" ");
      const normalized = normalizeWhitespace(text, true).trim();
      if (normalized !== "") {
        return [{ language: "", plain: normalized }, true];
      }
    }
  }

  // 2.D (partial support)
  const tagName = el.tagName.toLowerCase();
  if (tagName === "img") {
    const alt = (el.getAttribute("alt") ?? "").trim();
    if (alt) return [{ language: "", plain: alt }, true];
    // 2.I fallback for images: the title attribute
    const title = (el.getAttribute("title") ?? "").trim();
    if (title) return [{ language: "", plain: title }, true];
  } else if (tagName === "svg") {
    // The accessible name of an SVG comes from its <title> child
    const title = el.querySelector(":scope > title");
    if (title) {
      const text = normalizedNodeText(title);
      if (text) return [{ language: "", plain: text }, true];
    }
  } else if (tagName === "math") {
    // MathML Core's spoken-form fallback (not part of the ARIA AccName algorithm)
    const alttext = (el.getAttribute("alttext") ?? "").trim();
    if (alttext) return [{ language: "", plain: alttext }, true];
  }

  return [null, true];
}

const ssmlTags: Record<string, [string, Record<string, string>?]> = {
  em: ["emphasis"],
  b: ["emphasis"],
  i: ["emphasis", { level: "reduced" }],
  strong: ["emphasis", { level: "strong" }],
  br: ["break"],
};

/**
 * Maps an HTML element to the SSML tag its text should be wrapped in.
 * https://www.w3.org/TR/speech-synthesis11/#S3.2.2
 */
export function convertElementToSSMLTag(
  tagName: string,
): [string, Record<string, string>?] {
  return ssmlTags[tagName] ?? ["", undefined];
}

/** Elements whose entire subtree carries no user-facing content. */
export const skippedElements = new Set([
  "script",
  "style",
  "template",
  "noscript",
  "textarea",
  "select",
  "datalist",
  "iframe",
  // Ruby annotations would duplicate the base text when read aloud
  "rt",
  "rp",
  "rtc",
]);
