import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { pageRecordOf } from "./pageRecord.js";
import { toSourcePosition } from "./text.js";

// charIndex is the engine's runtime position in the spoken text (plain, or `stripSsmlTags()` of the SSML),
// mapped back through substitutions to the characters extraction placed on the page.
export function resolveBoundaryLocate(
  utterance: ReadiumSpeechUtterance,
  charIndex: number,
  charLength: number,
): { locate: LocatorOptions; word: string } | undefined {
  const record = pageRecordOf(utterance);
  if (!record) return undefined;
  const { spoken, chars, texts, replacements } = record;
  let start = charIndex;
  let end = charIndex + Math.max(0, charLength);
  if (replacements) {
    start = toSourcePosition(replacements, charIndex, "start");
    end = charLength > 0 ? toSourcePosition(replacements, charIndex + charLength, "end") : start;
  }

  let first = -1;
  for (let i = start; i < Math.max(end, start + 1) && i < chars.length; i++) {
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
  // domRange anchors the offset's whole extent, which a consumer trying it first would highlight instead of the word.
  const locate: LocatorOptions = {
    ...offset.locate,
    domRange: undefined,
    text: { highlight: word, before: text.slice(0, from), after: text.slice(to) },
  };
  return { locate, word };
}
