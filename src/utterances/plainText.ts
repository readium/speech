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

// Reads the text, without separator spaces, of a source span `from`–`to` of the SSML `pieces` were laid out from.
export function textReader(pieces: PlainPiece[]): (from: number, to: number) => string {
  let text = "";
  const positions: number[] = [];
  for (const piece of pieces) {
    if (piece.kind !== "text") continue;
    text += piece.text;
    for (const position of piece.positions) positions.push(position);
  }
  return (from, to) => text.slice(ssmlIndexToPlainIndex(positions, from), ssmlIndexToPlainIndex(positions, to));
}

// Strips tags and unescapes entities, a word-separating tag read as a space, without collapsing or trimming other whitespace.
export function stripSsmlTagsKeepSpacing(ssml: string): string {
  return layoutSsml(ssml).plain;
}

// `layoutSsml()` text as `stripSsmlTags()` gives it: a space right after a kept space dropped, then trimmed.
// `kept[i]` is the position in `text` of the result's char i; `at()` is where a position of `text` lands in the result.
export function collapseSpaces(text: string): { text: string; kept: number[]; at: (position: number) => number } {
  let collapsed = "";
  const kept: number[] = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " " && collapsed.endsWith(" ")) continue;
    collapsed += text[i];
    kept.push(i);
  }
  let start = 0;
  while (start < collapsed.length && /\s/.test(collapsed[start])) start++;
  let end = collapsed.length;
  while (end > start && /\s/.test(collapsed[end - 1])) end--;
  const trimmedKept = kept.slice(start, end);
  return { text: collapsed.slice(start, end), kept: trimmedKept, at: (position) => ssmlIndexToPlainIndex(trimmedKept, position) };
}

// Same as `stripSsmlTags`, but `map[i]` also gives the `ssml` position that produced `plain[i]`.
export function stripSsmlTagsWithMap(ssml: string): { plain: string; map: number[] } {
  const layout = layoutSsml(ssml);
  const positions: number[] = [];
  for (const piece of layout.pieces) {
    if (piece.kind === "separator") positions.push(piece.position);
    else if (piece.kind === "text") for (let i = 0; i < piece.text.length; i++) positions.push(piece.positions[i]);
  }
  const { text, kept } = collapseSpaces(layout.plain);
  return { plain: text, map: kept.map((i) => positions[i]) };
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
