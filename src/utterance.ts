import type { LocatorOptions } from "./decorator/createLocator.js";

export interface ReadiumSpeechUtterance {
  id?: string;       // Unique identifier for this content
  plain?: string;    // Plain-text rendering, when available
  ssml?: string;     // SSML rendering, when available
  language?: string; // Language of this content (BCP 47)
  // Decoded from the source node's textref — cssSelector/domRange from
  // #css(...)/#domrange(...), a ":~:text=..." WICG Text Fragment directive
  // as text.highlight/before/after (exact-quote form) or fragment (a
  // textStart...textEnd range, which highlight can't express). Spread
  // directly into createLocator()/decorate() for DOM highlighting.
  locate?: LocatorOptions;
  // True when `plain`/`ssml` is a synthesized label/announcement (a
  // contextualization catalog entry, an alt/caption description, a
  // pagebreak label) rather than text copied verbatim from the source.
  // `locate` is still safe for element-scoped highlighting, but a
  // word-level substring/text-quote search against the DOM should be
  // skipped — the text isn't actually there.
  synthetic?: boolean;
}