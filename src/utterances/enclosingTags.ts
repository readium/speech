import type { ReadiumSpeechUtterance } from "../utterance.js";

// A piece cut from a node's SSML: the tags open around it there, and its place among that text's slices.
interface EnclosingTags {
  open: string;
  close: string;
  source: object;
  index: number;
}

const enclosingTags = new WeakMap<ReadiumSpeechUtterance, EnclosingTags>();

export function setEnclosingTags(piece: ReadiumSpeechUtterance, tags: EnclosingTags): void {
  if (tags.open || tags.close) enclosingTags.set(piece, tags);
}

// `texts` (one per piece) with each slice's tags reopened before it and closed after it, except between consecutive slices of one text.
export function withEnclosingTags(texts: string[], pieces: ReadiumSpeechUtterance[]): string[] {
  const result = [...texts];
  let previous: { k: number; tags: EnclosingTags } | undefined;
  pieces.forEach((piece, k) => {
    const tags = enclosingTags.get(piece);
    if (!tags) return;
    const follows = previous?.tags.source === tags.source && previous.tags.index + 1 === tags.index;
    if (!follows) {
      if (previous) result[previous.k] += previous.tags.close;
      result[k] = tags.open + result[k];
    }
    previous = { k, tags };
  });
  if (previous) result[previous.k] += previous.tags.close;
  return result;
}

// Makes `piece`'s own SSML well-formed on its own, for a piece output without the slices around it.
export function encloseOwnTags(piece: ReadiumSpeechUtterance): void {
  const tags = enclosingTags.get(piece);
  if (!tags || piece.ssml === undefined) return;
  piece.ssml = tags.open + piece.ssml + tags.close;
  enclosingTags.delete(piece);
}
