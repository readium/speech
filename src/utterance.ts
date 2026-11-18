import type { LocatorOptions } from "./decorator/createLocator.js";

// A stretch of an utterance's spoken text sourced from one GND node — start/end
// are positions in *that node's own* text (the source of truth), not the utterance's.
export interface UtteranceOffset {
  start: number;
  end: number;
  locate: LocatorOptions;
}

export interface ReadiumSpeechUtterance {
  id?: string;       // Unique identifier for this content
  plain?: string;    // Plain-text rendering, when available
  ssml?: string;     // SSML rendering, when available
  language?: string; // Language of this content (BCP 47)
  // Voice to speak this content with: a voice's `voiceURI`, or `identifier` for a server voice.
  // An engine without such a voice speaks it with its own choice, as when absent.
  voice?: string;
  // Decoded from the source node's textref — cssSelector/domRange from
  // #css(...)/#domrange(...), a ":~:text=..." WICG Text Fragment directive
  // as text.highlight/before/after (exact-quote form) or fragment (a
  // textStart...textEnd range, which highlight can't express). Spread
  // directly into createLocator()/decorate() for DOM highlighting.
  locate?: LocatorOptions;
  // Ranges backed by source text that can be located. Absent (or gaps within) for text not on the page, e.g. a
  // synthesized label, and for content without a textref; it doesn't tell an announcement from content.
  offsets?: UtteranceOffset[];
}