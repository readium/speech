import type { LocatorOptions } from "./decorator/createLocator.js";

export interface ReadiumSpeechUtterance {
  id?: string;       // Unique identifier for this content
  plain?: string;    // Plain-text rendering, when available
  ssml?: string;     // SSML rendering, when available
  language?: string; // Language of this content (BCP 47)
  // Decoded from the source node's textref — cssSelector/domRange from
  // #css(...)/#domrange(...), highlight/before/after from a ":~:text=..."
  // WICG Text Fragment directive. Spread directly into createLocator()/
  // decorate() for DOM highlighting.
  locate?: Omit<LocatorOptions, "fragment">;
}