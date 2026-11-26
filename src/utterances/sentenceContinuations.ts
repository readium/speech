import { sameLanguage } from "./language.js";
import { pieceText } from "./mergeUtterances.js";
import type { Piece } from "./piece.js";
import { callerSuppressions } from "./sentenceSegmenter.js";
import type { WalkContext } from "./walkContext.js";

// Whether each piece continues the sentence of the one before it: cut from it at a change of language
// within a block, where the segmenter finds no sentence boundary.
export async function sentenceContinuations(pieces: Piece[], ctx: WalkContext): Promise<boolean[]> {
  return Promise.all(
    pieces.map(async (piece, i) => {
      const prev = pieces[i - 1];
      if (!prev || piece.blockStart || sameLanguage(prev.language, piece.language)) return false;
      const prevText = pieceText(prev, ctx).trimEnd();
      const text = pieceText(piece, ctx).trimStart();
      if (!prevText || !text) return false;
      const language = prev.language ?? "en";
      const boundaries = await ctx.segmenter(language, `${prevText} ${text}`, callerSuppressions(language, ctx));
      return !boundaries.some((boundary) => boundary.start > 0 && boundary.start <= prevText.length + 1);
    }),
  );
}
