import type { GuidedNavigationObject } from "@readium/shared";
import type { ReadiumSpeechUtterance, UtteranceOffset } from "../utterance.js";
import type { LocatorOptions } from "../decorator/createLocator.js";
import type { Replacement } from "./text.js";

// A spoken character's offset (-1: none, e.g. an announcement or a space), and its position in that offset's text (-1: read whole).
export interface PageChar {
  offset: number;
  at: number;
}

// `[start, end)` of a block's own text, the outermost element whose text holds it, spoken at `[spokenStart, spokenEnd)`
// of the measured text. Off the page: read in place of its text, like a label (then cut out of it), or printed elsewhere.
export type PageRun =
  | { block: GuidedNavigationObject; blockText: string; start: number; end: number; spokenStart: number; spokenEnd: number }
  | { offPage: true; spokenEnd: number; block?: GuidedNavigationObject; start?: number; end?: number };

// Where an extracted utterance's spoken text sits on the page.
export interface PageRecord {
  // The text spoken before substitutions, as plain text or `stripSsmlTags()` of the SSML.
  spoken: string;
  // One per character of `spoken`.
  chars: PageChar[];
  // Each offset as a quote of its own text, which its words narrow.
  quotes: LocatorOptions[];
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

type OnPage = Exclude<PageRun, { offPage: true }>;

// The text as printed: each block's own text, from the first to the last of its characters spoken (an alias's abbreviation
// included), without the labels read in place of some of it. Alias expansions, announcements and descriptions aren't on the page.
export function pageTextOf(record: PageRecord): string {
  if (record.pageText !== undefined) return record.pageText;
  // `resumedAt`: where the text read off the page before it ends.
  const blocks: (OnPage & { resumedAt?: number })[] = [];
  const cuts: { block?: GuidedNavigationObject; start?: number; end?: number }[] = [];
  let resumedAt: number | undefined;
  for (const run of record.runs) {
    if ("offPage" in run) {
      resumedAt = run.spokenEnd;
      cuts.push(run);
      continue;
    }
    const last = blocks[blocks.length - 1];
    if (last?.block === run.block) {
      last.start = Math.min(last.start, run.start);
      last.end = Math.max(last.end, run.end);
      last.spokenEnd = Math.max(last.spokenEnd, run.spokenEnd);
    } else blocks.push({ ...run, resumedAt });
    resumedAt = undefined;
  }
  let page = "";
  blocks.forEach((run, k) => {
    const previous = blocks[k - 1];
    // Between blocks, the spoken text after any read off the page tells the spacing.
    const between = previous ? record.measured.slice(Math.max(previous.spokenEnd, run.resumedAt ?? 0), run.spokenStart) : "";
    const own = cuts.filter((cut) => cut.block === run.block && cut.start! >= run.start && cut.end! <= run.end);
    page += ([...between].find(isSpace) ?? "") + withoutCuts(run, own as { start: number; end: number }[]);
  });
  record.pageText = page;
  return page;
}

// `run`'s stretch of its block's text without `cuts`, spaced as the text resuming after one is.
function withoutCuts(run: OnPage, cuts: { start: number; end: number }[]): string {
  if (cuts.length === 0) return run.blockText.slice(run.start, run.end);
  const pieces: string[] = [];
  let from = run.start;
  for (const cut of [...cuts].sort((a, b) => a.start - b.start)) {
    pieces.push(run.blockText.slice(from, cut.start));
    from = Math.max(from, cut.end);
  }
  pieces.push(run.blockText.slice(from, run.end));
  let text = "";
  for (const piece of pieces) {
    const content = piece.trim();
    if (!content) continue;
    const leading = piece.slice(0, piece.length - piece.trimStart().length);
    text += (text ? leading.slice(-1) : "") + content;
  }
  return text;
}
