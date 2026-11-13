import type { ReadiumSpeechUtterance } from "../utterance.js";

// One node's text cut into slices; `outer` places it after slice `gap` of the text it's embedded in.
export interface SliceScope {
  outer?: { scope: SliceScope; gap: number };
}

// A piece cut from a node's SSML: the tags open around it there, and its place among that text's slices.
interface EnclosingTags {
  open: string;
  close: string;
  scope: SliceScope;
  index: number;
}

const enclosingTags = new WeakMap<ReadiumSpeechUtterance, EnclosingTags>();

export function setEnclosingTags(piece: ReadiumSpeechUtterance, tags: EnclosingTags): void {
  if (tags.open || tags.close) enclosingTags.set(piece, tags);
}

// Places the slices of `pieces`, walked from a placeholder, after slice `gap` of `scope`.
export function nestEnclosingTags(pieces: ReadiumSpeechUtterance[], scope: SliceScope, gap: number): void {
  for (const piece of pieces) {
    let inner = enclosingTags.get(piece)?.scope;
    while (inner?.outer) inner = inner.outer.scope;
    if (inner && inner !== scope) inner.outer = { scope, gap };
  }
}

// The scopes from the outermost down to `tags`', each with the slice it's at (or after, for an enclosing one).
function pathOf(tags: EnclosingTags): { scope: SliceScope; index: number }[] {
  const path = [{ scope: tags.scope, index: tags.index }];
  for (let outer = tags.scope.outer; outer; outer = outer.scope.outer) path.unshift({ scope: outer.scope, index: outer.gap });
  return path;
}

// `texts` (one per piece) with each slice's tags reopened before it and closed after it,
// except between consecutive slices of one text, and around the text embedded between them.
export function withEnclosingTags(texts: string[], pieces: ReadiumSpeechUtterance[]): string[] {
  const result = [...texts];
  const stack: { tags: EnclosingTags; lastK: number }[] = [];
  const pop = () => {
    const frame = stack.pop()!;
    result[frame.lastK] += frame.tags.close;
  };
  pieces.forEach((piece, k) => {
    const tags = enclosingTags.get(piece);
    if (!tags) return;
    const path = pathOf(tags);
    const offset = stack.length ? path.findIndex((step) => step.scope === stack[0].tags.scope) : -1;
    let kept = 0;
    if (offset !== -1) {
      while (kept < stack.length && offset + kept < path.length) {
        const step = path[offset + kept];
        const frame = stack[kept].tags;
        const own = offset + kept === path.length - 1;
        if (frame.scope !== step.scope || (own ? frame.index + 1 : frame.index) !== step.index) break;
        kept++;
      }
    }
    while (stack.length > kept) pop();
    const top = stack[stack.length - 1];
    if (top?.tags.scope === tags.scope) top.tags = tags;
    else {
      result[k] = tags.open + result[k];
      stack.push({ tags, lastK: k });
    }
    for (const frame of stack) frame.lastK = k;
  });
  while (stack.length) pop();
  return result;
}

// Makes `piece`'s own SSML well-formed on its own, for a piece output without the slices around it.
export function encloseOwnTags(piece: ReadiumSpeechUtterance): void {
  const tags = enclosingTags.get(piece);
  if (!tags || piece.ssml === undefined) return;
  piece.ssml = tags.open + piece.ssml + tags.close;
  enclosingTags.delete(piece);
}
