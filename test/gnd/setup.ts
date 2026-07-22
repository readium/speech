import { DOMParser as LinkedomDOMParser } from "linkedom";

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
