import type { ReadiumSpeechUtterance, UtteranceOffset } from "../utterance.js";
import type { Replacement } from "./text.js";

// A spoken character's offset (-1: none, e.g. an announcement or a space), and its position in that offset's text (-1: read whole).
export interface PageChar {
  offset: number;
  at: number;
}

// Where an extracted utterance's spoken text sits on the page.
export interface PageRecord {
  // The text spoken before substitutions, as plain text or `stripSsmlTags()` of the SSML.
  spoken: string;
  // The text as printed: before substitutions, without alias expansions or announcements.
  pageText: string;
  // One per character of `spoken`.
  chars: PageChar[];
  // Each offset's own text, as its locate quotes it.
  texts: string[];
  // Set by substitutions, from the spoken text back to `spoken`.
  replacements?: Replacement[];
}

// Keyed by `offsets`, which spread copies of an utterance share and which only text on the page has.
const records = new WeakMap<UtteranceOffset[], PageRecord>();

export function recordPage(offsets: UtteranceOffset[], record: PageRecord): void {
  records.set(offsets, record);
}

export function pageRecordOf(utterance: ReadiumSpeechUtterance): PageRecord | undefined {
  return utterance.offsets && records.get(utterance.offsets);
}
