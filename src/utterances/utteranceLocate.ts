import type { LocatorOptions } from "../decorator/createLocator.js";
import type { Segmentation } from "./types.js";
import type { ReadiumSpeechUtterance, UtteranceOffset } from "../utterance.js";

// Keyed by `offsets`, which the voice-stamped copies of an utterance share.
const pageTexts = new WeakMap<UtteranceOffset[], string>();

export function recordPageText(offsets: UtteranceOffset[], text: string): void {
  pageTexts.set(offsets, text);
}

// The text an extracted utterance reads as printed on the page: before substitutions, without alias expansions or announcements.
export function resolveUtteranceSourceText(utterance: ReadiumSpeechUtterance): string | undefined {
  return (utterance.offsets && pageTexts.get(utterance.offsets)) || undefined;
}

// Gated on `segmentation` itself, not offsets-presence: structure-mode utterances
// can carry multi-entry `offsets` too (e.g. footnote/placeholder merges), which
// are source-node pieces, not sentences, and must not be decorated as such.
export function resolveUtteranceLocate(utterance: ReadiumSpeechUtterance, segmentation: Segmentation): LocatorOptions[] {
  if (segmentation === "sentence" && utterance.offsets?.length) {
    return utterance.offsets.map((offset) => offset.locate);
  }
  return utterance.locate ? [utterance.locate] : [];
}
