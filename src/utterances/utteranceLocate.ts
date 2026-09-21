import type { LocatorOptions } from "../decorator/createLocator.js";
import type { Segmentation } from "./types.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";

// Gated on `segmentation` itself, not offsets-presence: structure-mode utterances
// can carry multi-entry `offsets` too (e.g. footnote/placeholder merges), which
// are source-node pieces, not sentences, and must not be decorated as such.
export function resolveUtteranceLocate(utterance: ReadiumSpeechUtterance, segmentation: Segmentation): LocatorOptions[] {
  if (segmentation === "sentence" && utterance.offsets?.length) {
    return utterance.offsets.map((offset) => offset.locate);
  }
  return utterance.locate ? [utterance.locate] : [];
}
