import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { pageRecordOf, type PageRecord } from "./pageRecord.js";
import { toSourcePosition } from "./text.js";

// Engine positions, possibly past the text (Web Speech over-reports word lengths), as a range of `spoken`.
function spokenRange({ chars, replacements }: PageRecord, charIndex: number, charLength: number): [number, number] {
  const toSpoken = (position: number, edge: "start" | "end") =>
    replacements ? toSourcePosition(replacements, position, edge) : position;
  const start = toSpoken(charIndex, "start");
  const end = charLength > 0 ? toSpoken(charIndex + charLength, "end") : start;
  const clamp = (position: number) => Math.min(Math.max(position, 0), chars.length);
  return [clamp(start), clamp(end)];
}

// charIndex is the engine's runtime position in the spoken text (plain, or `stripSsmlTags()` of the SSML),
// mapped back through substitutions to the characters extraction placed on the page.
export function resolveBoundaryLocate(
  utterance: ReadiumSpeechUtterance,
  charIndex: number,
  charLength: number,
): { locate: LocatorOptions; word: string } | undefined {
  const record = pageRecordOf(utterance);
  if (!record) return undefined;
  const { spoken, chars, texts } = record;
  const [start, end] = spokenRange(record, charIndex, charLength);
  // A zero-length boundary names the character it starts on; text inserted by a substitution maps to no characters.
  const reach = charLength > 0 ? end : Math.min(start + 1, chars.length);
  let first = start;
  while (first < reach && chars[first].offset === -1) first++;
  if (first === reach) return undefined;
  const { offset: k, at } = chars[first];
  // The word stays within the offset it starts in.
  let last = first;
  for (let i = first; i < end && (chars[i].offset === k || chars[i].offset === -1); i++) {
    if (chars[i].offset === k) last = i + 1;
  }
  const offset = utterance.offsets![k];
  // An alias's or a label's words aren't on the page, so they highlight its whole abbreviation or element.
  if (at === -1) return { locate: offset.locate, word: spoken.slice(first, last) };

  const from = at;
  let to = at;
  for (let i = first; i < last; i++) {
    if (chars[i].at >= 0) to = Math.max(to, chars[i].at + 1);
  }
  const text = texts[k];
  const word = text.slice(from, to);
  const around = offset.locate.text;
  // domRange anchors the offset's whole extent, which a consumer trying it first would highlight instead of the word.
  const locate: LocatorOptions = {
    ...offset.locate,
    domRange: undefined,
    text: { highlight: word, before: (around?.before ?? "") + text.slice(0, from), after: text.slice(to) + (around?.after ?? "") },
  };
  return { locate, word };
}
