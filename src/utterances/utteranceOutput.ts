import { ssmlTextEscape } from "../gnd/text.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import type { GndObject } from "../gnd/types.js";
import type { SourceTrace, WalkContext } from "./walkContext.js";

// Contextualization/label text is always plain (no markup) — formats it
// per the requested `format`, same as any other utterance.
export function formatPlain(text: string, ctx: WalkContext): ReadiumSpeechUtterance {
  const utterance: ReadiumSpeechUtterance = ctx.format === "ssml" ? { ssml: ssmlTextEscape(text) } : { plain: text };
  ctx.synthetic.add(utterance);
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
  node: GndObject,
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
