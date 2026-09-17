import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { stripSsmlTags } from "./text.js";

// charIndex is the engine's own runtime position, unknowable when `offsets`
// was built — resolved by scanning pieces in order from where the last ended.
// charIndex is always plain-text space (see ssmlIndexToPlainIndex), so SSML
// utterances are matched against their tag-stripped text, not the raw markup.
export function resolveBoundaryLocate(
  utterance: ReadiumSpeechUtterance,
  charIndex: number,
  charLength: number,
): { locate: LocatorOptions; word: string } | undefined {
  const offsets = utterance.offsets;
  const isSsml = !utterance.plain && !!utterance.ssml;
  const outputText = utterance.plain ?? (utterance.ssml ? stripSsmlTags(utterance.ssml) : "");
  if (!offsets?.length || !outputText) return undefined;

  let cursor = 0;
  for (const offset of offsets) {
    // No quote means this piece owns its whole node — its text is whatever remains unconsumed.
    const rawPieceText = offset.locate.text?.highlight;
    const pieceText = rawPieceText ? (isSsml ? stripSsmlTags(rawPieceText) : rawPieceText) : outputText.slice(cursor);
    if (!pieceText) continue;
    const start = outputText.indexOf(pieceText, cursor);
    if (start === -1) continue;
    const end = start + pieceText.length;
    if (charIndex >= start && charIndex < end) {
      const localIndex = charIndex - start;
      const word = pieceText.substring(localIndex, Math.min(localIndex + charLength, pieceText.length));
      const locate: LocatorOptions = {
        ...offset.locate,
        text: {
          highlight: word,
          before: pieceText.substring(0, localIndex),
          after: pieceText.substring(localIndex + word.length),
        },
      };
      return { locate, word };
    }
    cursor = end;
  }
  return undefined;
}
