import type { GuidedNavigationObject } from "@readium/shared";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import type { ExtractUtterancesOptions } from "./types.js";
import { makeWalkContext, type SourceTrace } from "./walkContext.js";
import { walk } from "./walk.js";
import { splitIntoSentenceUtterances } from "./sentenceReconstruction.js";
import { mergeAliasPieces } from "./abbreviationAlias.js";
import { attachLocate } from "./locate.js";
import { applySubstitutions } from "./applySubstitutions.js";
import type { Piece } from "./piece.js";

export type { SourceTrace } from "./walkContext.js";

/**
 * Extracts an ordered list of read-aloud utterances from a Guided
 * Navigation node tree, following the patterns documented at
 * https://github.com/readium/guided-navigation/tree/main/examples/read-aloud.
 *
 * Accepts `GuidedNavigationObject[]` (as returned by `parseMarkup()`, or `GuidedNavigationDocument.guided`)
 * rather than a wrapped document.
 */
export async function extractUtterances(
  nodes: GuidedNavigationObject[],
  options: ExtractUtterancesOptions = {},
): Promise<ReadiumSpeechUtterance[]> {
  return (await extractUtterancesWithSources(nodes, options)).utterances;
}

/**
 * Same as `extractUtterances()`, plus `sources[i]`: the node that produced `utterances[i]`,
 * and `blockStarts[i]`: whether `utterances[i]` begins a new block-level element.
 */
export async function extractUtterancesWithSources(
  nodes: GuidedNavigationObject[],
  options: ExtractUtterancesOptions = {},
): Promise<{ utterances: ReadiumSpeechUtterance[]; sources: SourceTrace; blockStarts: boolean[] }> {
  const pieces: Piece[] = [];
  const ctx = await makeWalkContext(nodes, options);
  walk(nodes, pieces, ctx, false);
  const walked = ctx.segmentation === "sentence" ? pieces : await mergeAliasPieces(pieces, ctx);
  const split = await splitIntoSentenceUtterances(walked, ctx);
  return {
    utterances: applySubstitutions(attachLocate(split, ctx), ctx),
    sources: split.map((piece) => piece.source),
    blockStarts: split.map((piece) => !!piece.blockStart),
  };
}
