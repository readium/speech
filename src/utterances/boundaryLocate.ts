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
  if (start === chars.length) return undefined;

  let first = -1;
  for (let i = start; i < Math.max(end, start + 1); i++) {
    if (chars[i].offset !== -1) {
      first = i;
      break;
    }
  }
  if (first === -1) return undefined;
  const { offset: k, at } = chars[first];
  const offset = utterance.offsets![k];
  // An alias's or a label's words aren't on the page, so they highlight its whole abbreviation or element.
  if (at === -1) return { locate: offset.locate, word: spoken.slice(start, end) };

  const from = at;
  let to = charLength > 0 ? at + 1 : at;
  for (let i = first; i < end; i++) {
    if (chars[i].offset === k && chars[i].at >= 0) to = Math.max(to, chars[i].at + 1);
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
