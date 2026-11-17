import { ssmlTextEscape } from "@readium/helpers";
import type { GuidedNavigationObject } from "@readium/shared";
import type { SourceTrace, WalkContext } from "./walkContext.js";
import { languageFor, languageRuns } from "./language.js";
import { mergeUtterances } from "./mergeUtterances.js";
import { descriptionLanguageOf } from "./nodeFields.js";
import { encloseOwnTags, type Piece } from "./piece.js";

// Contextualization/label text is always plain (no markup) — formats it
// per the requested `format`, same as any other utterance.
export function formatPlain(text: string, ctx: WalkContext): Piece {
  const piece: Piece = ctx.format === "ssml" ? { ssml: ssmlTextEscape(text) } : { plain: text };
  piece.synthetic = true;
  return piece;
}

// A catalog entry's text, in the catalog's language.
export function formatEntryText(text: string, ctx: WalkContext): Piece {
  const piece = formatPlain(text, ctx);
  const language = ctx.language === "none" ? languageFor(undefined, ctx) : ctx.contextualizationLanguage;
  if (language) piece.language = language;
  return piece;
}

// A node's description, in the language it's declared in.
export function formatDescription(text: string, node: GuidedNavigationObject, ctx: WalkContext): Piece {
  const piece = formatPlain(text, ctx);
  const language = languageFor(descriptionLanguageOf(node), ctx);
  if (language) piece.language = language;
  return piece;
}

// Pushes `items` to `out`, produced by `node`.
export function push(out: Piece[], node: SourceTrace[number], items: Piece[]): void {
  for (const item of items) item.source = node;
  out.push(...items);
}

// Pushes `pieces`, or their `merged` replacement carrying a block start over from any of them.
export function pushPiecesOrMerged(out: Piece[], node: GuidedNavigationObject, pieces: Piece[], merged: Piece | undefined): void {
  if (merged) {
    if (pieces.some((piece) => piece.blockStart)) merged.blockStart = true;
    push(out, pieces[0]?.source ?? node, [merged]);
  } else {
    out.push(...pieces);
  }
}

// Merges `pieces` into one utterance per language run.
export function pushMergedRuns(out: Piece[], ctx: WalkContext, node: GuidedNavigationObject, pieces: Piece[]): void {
  for (const [start, end] of languageRuns(pieces, ctx)) {
    const run = pieces.slice(start, end);
    const merged = run.length > 1 ? mergeUtterances(run, ctx) : undefined;
    if (!merged) run.forEach(encloseOwnTags);
    pushPiecesOrMerged(out, node, run, merged);
  }
}
