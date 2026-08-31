import type { DomRangeJSON } from "./gnd/textrefFragment.js";

export interface ReadiumSpeechUtterance {
  id?: string;       // Unique identifier for this content
  plain?: string;    // Plain-text rendering, when available
  ssml?: string;     // SSML rendering, when available
  language?: string; // Language of this content (BCP 47)
  selector?: string; // Decoded CSS selector for DOM highlighting, from the source node's textref
  domRange?: DomRangeJSON; // Decoded DomRange, when the source was converted with domRange enabled — see LocatorOptions.domRange
}