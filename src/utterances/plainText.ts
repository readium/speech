import { startsWithBindingPunct } from "@readium/helpers";
import { joinsWithoutSpace } from "../utils/text.js";
import { commonAncestors, parseSsml, ssmlLeaves, type SsmlElement, type SsmlNode } from "./ssml.js";

// Whether a removed `<break/>` between `before` and `after` reads as a space: not before binding punctuation, at either end, or within unspaced text.
export function breakSpaced(before: string, after: string): boolean {
  return before.length > 0 && after.length > 0 && !/\s$/.test(before) && !/^\s/.test(after) && !startsWithBindingPunct(after) && !joinsWithoutSpace(before, after);
}

// SSML elements that delimit a sentence, paragraph, token, speaker or sound; other paired elements can fall within a word.
const WORD_SEPARATING_ELEMENTS = new Set(["speak", "p", "s", "voice", "audio", "desc", "token", "w"]);

// Whether `markup`, starting with a tag, leaves a word boundary where it's removed: a self-closing tag like `<break/>`, or a structural element.
export function separatesWords(markup: string): boolean {
  return /^<[^>]*\/>/.test(markup) || WORD_SEPARATING_ELEMENTS.has(/^<\/?([^\s/>]+)/.exec(markup)?.[1] ?? "");
}

// A piece of an SSML string's plain text, each with the elements enclosing it, outermost first:
// a text node at `start` with each char's source position, the space a word-separating tag reads as
// (enclosed by the elements common to both sides, at the source position of the text after it),
// or a childless element (e.g. `<break/>`).
export type PlainPiece =
  | { kind: "text"; text: string; start: number; positions: number[]; chain: SsmlElement[] }
  | { kind: "separator"; start: number; position: number; chain: SsmlElement[] }
  | { kind: "element"; node: SsmlNode; chain: SsmlElement[] };

// `ssml` read as plain text: tags stripped, entities decoded, a word-separating tag read as a space, other whitespace kept.
export function layoutSsml(ssml: string): { plain: string; pieces: PlainPiece[] } {
  let plain = "";
  let separated = false;
  let previousChain: SsmlElement[] = [];
  const pieces: PlainPiece[] = [];
  for (const { node, ancestors } of ssmlLeaves(parseSsml(ssml))) {
    const common = commonAncestors(previousChain, ancestors).length;
    if ([...previousChain.slice(common), ...ancestors.slice(common)].some((element) => separatesWords(element.openTag))) separated = true;
    previousChain = ancestors;
    if (node.kind === "element") {
      pieces.push({ kind: "element", node, chain: ancestors });
      if (separatesWords(node.openTag)) separated = true;
      continue;
    }
    if (separated && breakSpaced(plain, node.text)) {
      pieces.push({ kind: "separator", start: plain.length, position: node.positions![0], chain: ancestors.slice(0, common) });
      plain += " ";
    }
    pieces.push({ kind: "text", text: node.text, start: plain.length, positions: node.positions!, chain: ancestors });
    plain += node.text;
    separated = false;
  }
  return { plain, pieces };
}

// The text, without separator spaces, read from the source span `from`–`to` of the SSML `pieces` were laid out from.
export function textBetween(pieces: PlainPiece[], from: number, to: number): string {
  let text = "";
  for (const piece of pieces) {
    if (piece.kind !== "text") continue;
    piece.positions.forEach((position, i) => {
      if (position >= from && position < to) text += piece.text[i];
    });
  }
  return text;
}

// Strips tags and unescapes entities, a word-separating tag read as a space, without collapsing or trimming other whitespace.
export function stripSsmlTagsKeepSpacing(ssml: string): string {
  return layoutSsml(ssml).plain;
}

// Same as `stripSsmlTags`, but `map[i]` also gives the `ssml` position that produced `plain[i]`.
export function stripSsmlTagsWithMap(ssml: string): { plain: string; map: number[] } {
  let plain = "";
  const map: number[] = [];
  const push = (ch: string, position: number) => {
    if (ch === " " && plain.endsWith(" ")) return;
    plain += ch;
    map.push(position);
  };
  for (const piece of layoutSsml(ssml).pieces) {
    if (piece.kind === "separator") push(" ", piece.position);
    else if (piece.kind === "text") for (let i = 0; i < piece.text.length; i++) push(piece.text[i], piece.positions[i]);
  }
  let start = 0;
  while (start < plain.length && /\s/.test(plain[start])) start++;
  let end = plain.length;
  while (end > start && /\s/.test(plain[end - 1])) end--;
  return { plain: plain.slice(start, end), map: map.slice(start, end) };
}

// Strips every SSML tag (not just `<readium:...>` placeholders — `<lang>`,
// `<emphasis>`, `<break/>`...) and unescapes the entities `ssmlTextEscape`
// applies, for synthesizing a `plain` variant from a node that only
// naturally has `ssml` (e.g. an inline language shift with no embedded
// placeholder, so the GND converter never generated a `plain` variant for
// it — see `@readium/guided-navigation`'s `converter.ts` `flushText()`).
export function stripSsmlTags(ssml: string): string {
  return stripSsmlTagsWithMap(ssml).plain;
}

// Smallest plain index whose SSML source position is >= `ssmlIndex` — lands
// on the next real character when `ssmlIndex` fell inside a stripped tag.
export function ssmlIndexToPlainIndex(map: number[], ssmlIndex: number): number {
  let lo = 0;
  let hi = map.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (map[mid] < ssmlIndex) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
