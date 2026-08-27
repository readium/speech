import { DOMParser as LinkedomDOMParser, NodeList as LinkedomNodeList, Node as LinkedomNode } from "linkedom";

// ava runs tests under Node, which has no native DOMParser — polyfill it here
// for tests only. src/gnd/* must never import linkedom directly; it targets
// the browser's native DOMParser.
//
// Unlike a real browser, linkedom doesn't perform full HTML5 tree
// construction for a bare fragment with no <body> tag at all (documentElement
// ends up being the fragment's own top-level element instead of a proper
// <html><body>...</body></html>). Real browsers always construct the full
// document regardless of how partial the input is. This wraps the input in
// <body> first so linkedom sees a real body tag to build around, matching
// what a real DOMParser would produce.
class TestDOMParser {
  private inner = new LinkedomDOMParser();

  parseFromString(input: string, mimeType: DOMParserSupportedType) {
    if (mimeType === "text/html" && !/<body[\s>]/i.test(input)) {
      input = `<body>${input}</body>`;
    }
    return (this.inner.parseFromString as (i: string, m: string) => Document)(input, mimeType);
  }
}

if (typeof globalThis.DOMParser === "undefined") {
  (globalThis as any).DOMParser = TestDOMParser;
}

// css-selector-generator checks `instanceof NodeList`/`HTMLCollection` — real
// browsers always have both globals; linkedom doesn't distinguish the two
// (both are its one NodeList class) and doesn't expose either as a global.
if (typeof globalThis.NodeList === "undefined") {
  (globalThis as any).NodeList = LinkedomNodeList;
}
if (typeof globalThis.HTMLCollection === "undefined") {
  (globalThis as any).HTMLCollection = LinkedomNodeList;
}
if (typeof globalThis.Node === "undefined") {
  (globalThis as any).Node = LinkedomNode;
}

// css-selector-generator calls the real browser CSS.escape() to sanitize
// selector parts. Node has no `CSS` global at all — this is the reference
// polyfill algorithm from the CSSOM spec (https://drafts.csswg.org/cssom/#the-css.escape()-method),
// matching https://github.com/mathiasbynens/CSS.escape, which the library's
// own fallback path already links to.
function cssEscape(value: string): string {
  const str = String(value);
  const len = str.length;
  let result = "";
  let index = -1;
  let codeUnit: number;
  const firstCodeUnit = str.charCodeAt(0);
  while (++index < len) {
    codeUnit = str.charCodeAt(index);
    if (codeUnit === 0x0000) {
      result += "�";
      continue;
    }
    if (
      (codeUnit >= 0x0001 && codeUnit <= 0x001f) ||
      codeUnit === 0x007f ||
      (index === 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
      (index === 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit === 0x002d)
    ) {
      result += `\\${codeUnit.toString(16)} `;
      continue;
    }
    if (
      index === 0 &&
      len === 1 &&
      codeUnit === 0x002d
    ) {
      result += `\\${str.charAt(index)}`;
      continue;
    }
    if (
      codeUnit >= 0x0080 ||
      codeUnit === 0x002d ||
      codeUnit === 0x005f ||
      (codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
      (codeUnit >= 0x0041 && codeUnit <= 0x005a) ||
      (codeUnit >= 0x0061 && codeUnit <= 0x007a)
    ) {
      result += str.charAt(index);
      continue;
    }
    result += `\\${str.charAt(index)}`;
  }
  return result;
}

if (typeof globalThis.CSS === "undefined") {
  (globalThis as any).CSS = { escape: cssEscape };
}
