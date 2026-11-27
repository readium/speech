import { sameLanguage } from "./language.js";
import { pieceText } from "./mergeUtterances.js";
import type { Piece } from "./piece.js";
import { detectGenuineJoins } from "./sentenceReconstruction.js";
import type { WalkContext } from "./walkContext.js";

// Whether each piece continues the sentence of the one before it: cut from it at a change of language
// within a block, where a sentence of their joined text runs past the cut.
export async function sentenceContinuations(pieces: Piece[], ctx: WalkContext): Promise<boolean[]> {
  const continuations = pieces.map(() => false);
  const isLanguageCut = (i: number): boolean => {
    const prev = pieces[i - 1];
    const piece = pieces[i];
    return !piece.blockStart && !sameLanguage(prev.language, piece.language) && !!pieceText(prev, ctx).trim() && !!pieceText(piece, ctx).trim();
  };
  for (let start = 0; start < pieces.length; ) {
    let end = start + 1;
    while (end < pieces.length && isLanguageCut(end)) end++;
    if (end - start > 1) {
      const joins = await detectGenuineJoins(pieces.slice(start, end), ctx);
      joins.forEach((joined, k) => (continuations[start + k + 1] = joined));
    }
    start = end;
  }
  return continuations;
}
