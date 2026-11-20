import type { GuidedNavigationObject } from "@readium/shared";
import type { ReadiumSpeechUtterance, UtteranceOffset } from "../utterance.js";
import type { Replacement } from "./text.js";

// A spoken character's offset (-1: none, e.g. an announcement or a space), and its position in that offset's text (-1: read whole).
export interface PageChar {
  offset: number;
  at: number;
}

// `[start, end)` of a node's own text, spoken at `[spokenStart, spokenEnd)` of the measured text;
// `offPage` where something not on the page is read in place of an element's text, like a label.
export type PageRun =
  | { node: GuidedNavigationObject; ownText: string; start: number; end: number; spokenStart: number; spokenEnd: number }
  | { offPage: true };

// Where an extracted utterance's spoken text sits on the page.
export interface PageRecord {
  // The text spoken before substitutions, as plain text or `stripSsmlTags()` of the SSML.
  spoken: string;
  // One per character of `spoken`.
  chars: PageChar[];
  // Each offset's own text, as its locate quotes it.
  texts: string[];
  // The text spans were measured in: `spoken`, or the SSML's text with its spacing kept.
  measured: string;
  // In spoken order.
  runs: PageRun[];
  // Set by substitutions, from the spoken text back to `spoken`.
  replacements?: Replacement[];
  pageText?: string;
}

// Keyed by `offsets`, which spread copies of an utterance share and which only text on the page has.
const records = new WeakMap<UtteranceOffset[], PageRecord>();

export function recordPage(offsets: UtteranceOffset[], record: PageRecord): void {
  records.set(offsets, record);
}

export function pageRecordOf(utterance: ReadiumSpeechUtterance): PageRecord | undefined {
  return utterance.offsets && records.get(utterance.offsets);
}

const isSpace = (char: string) => /\s/.test(char);

// The text as printed: each element's own text, from the first to the last of its characters spoken
// (an alias's abbreviation included). Alias expansions, announcements, labels and descriptions aren't on the page.
export function pageTextOf(record: PageRecord): string {
  if (record.pageText !== undefined) return record.pageText;
  type Run = Exclude<PageRun, { offPage: true }>;
  const merged: Run[] = [];
  let interrupted = false;
  for (const run of record.runs) {
    if ("offPage" in run) {
      interrupted = true;
      continue;
    }
    const last = merged[merged.length - 1];
    if (last?.node === run.node && !interrupted) {
      last.start = Math.min(last.start, run.start);
      last.end = Math.max(last.end, run.end);
      last.spokenEnd = Math.max(last.spokenEnd, run.spokenEnd);
    } else merged.push({ ...run });
    interrupted = false;
  }
  let page = "";
  merged.forEach((run, k) => {
    const previous = merged[k - 1];
    // Around a dropped label, the element's own text before the next run tells the spacing; between elements, the spoken text.
    const before = !previous ? "" : previous.node === run.node ? run.ownText.slice(previous.end, run.start).slice(-1) : record.measured.slice(previous.spokenEnd, run.spokenStart);
    page += ([...before].find(isSpace) ?? "") + run.ownText.slice(run.start, run.end);
  });
  record.pageText = page;
  return page;
}
