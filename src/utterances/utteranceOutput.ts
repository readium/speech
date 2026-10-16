import { ssmlTextEscape } from "@readium/helpers";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import type { GuidedNavigationObject } from "@readium/shared";
import type { SourceTrace, WalkContext } from "./walkContext.js";
import { languageFor } from "./language.js";
import { descriptionLanguageOf } from "./nodeFields.js";

// Contextualization/label text is always plain (no markup) — formats it
// per the requested `format`, same as any other utterance.
export function formatPlain(text: string, ctx: WalkContext): ReadiumSpeechUtterance {
  const utterance: ReadiumSpeechUtterance = ctx.format === "ssml" ? { ssml: ssmlTextEscape(text) } : { plain: text };
  ctx.synthetic.add(utterance);
  return utterance;
}

// A catalog entry's text, in the catalog's language.
export function formatEntryText(text: string, ctx: WalkContext): ReadiumSpeechUtterance {
  const utterance = formatPlain(text, ctx);
  const language = ctx.language === "none" ? languageFor(undefined, ctx) : ctx.contextualizationLanguage;
  if (language) utterance.language = language;
  return utterance;
}

// A node's description, in the language it's declared in.
export function formatDescription(text: string, node: GuidedNavigationObject, ctx: WalkContext): ReadiumSpeechUtterance {
  const utterance = formatPlain(text, ctx);
  const language = languageFor(descriptionLanguageOf(node), ctx);
  if (language) utterance.language = language;
  return utterance;
}

export function push(out: ReadiumSpeechUtterance[], sources: SourceTrace, node: SourceTrace[number], items: ReadiumSpeechUtterance[]): void {
  out.push(...items);
  for (let i = 0; i < items.length; i++) sources.push(node);
}

// Pushes `pieces` (or their `merged` replacement, if provided) to `out`.
// `mergeUtterances()` returns a new object rather than one of `pieces` —
// this carries a block-start marker over from any input piece that had
// one, so merging never silently drops it.
export function pushPiecesOrMerged(
  out: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  ctx: WalkContext,
  node: GuidedNavigationObject,
  pieces: ReadiumSpeechUtterance[],
  pieceSources: SourceTrace,
  merged: ReadiumSpeechUtterance | undefined,
): void {
  if (merged) {
    if (pieces.some((piece) => ctx.blockStarts.has(piece))) ctx.blockStarts.add(merged);
    push(out, sources, pieceSources[0] ?? node, [merged]);
  } else {
    out.push(...pieces);
    sources.push(...pieceSources);
  }
}
