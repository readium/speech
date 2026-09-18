import type { GndObject } from "../gnd/types.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import type { ExtractUtterancesOptions } from "./types.js";
import { makeWalkContext, type SourceTrace } from "./walkContext.js";
import { walk } from "./walk.js";
import { splitIntoSentenceUtterances } from "./sentenceReconstruction.js";
import { attachLocate } from "./locate.js";
import { applySubstitutions } from "./applySubstitutions.js";

export type { SourceTrace } from "./walkContext.js";

/**
 * Extracts an ordered list of read-aloud utterances from a Guided
 * Navigation node tree, following the patterns documented at
 * https://github.com/readium/guided-navigation/tree/main/examples/read-aloud.
 *
 * Accepts `GndObject[]` (as returned by `parseMarkup()`, or `GndDocument.guided`)
 * rather than a wrapped document.
 */
export async function extractUtterances(
  nodes: GndObject[],
  options: ExtractUtterancesOptions,
): Promise<ReadiumSpeechUtterance[]> {
  const out: ReadiumSpeechUtterance[] = [];
  const sources: SourceTrace = [];
  const ctx = await makeWalkContext(nodes, options);
  walk(nodes, out, sources, ctx, false);
  const split = await splitIntoSentenceUtterances(out, sources, ctx);
  return applySubstitutions(attachLocate(split.out, split.sources, ctx), ctx);
}

/**
 * Same as `extractUtterances()`, plus `sources[i]`: the node that produced `utterances[i]`,
 * and `blockStarts[i]`: whether `utterances[i]` begins a new block-level element.
 */
export async function extractUtterancesWithSources(
  nodes: GndObject[],
  options: ExtractUtterancesOptions,
): Promise<{ utterances: ReadiumSpeechUtterance[]; sources: SourceTrace; blockStarts: boolean[] }> {
  const utterances: ReadiumSpeechUtterance[] = [];
  const sources: SourceTrace = [];
  const ctx = await makeWalkContext(nodes, options);
  walk(nodes, utterances, sources, ctx, false);
  const split = await splitIntoSentenceUtterances(utterances, sources, ctx);
  const blockStarts = split.out.map((utterance) => ctx.blockStarts.has(utterance));
  const located = attachLocate(split.out, split.sources, ctx);
  return { utterances: applySubstitutions(located, ctx), sources: split.sources, blockStarts };
}
