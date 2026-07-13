import type { GndDocument } from "./types.js";
import { parseMarkup } from "./converter.js";
import type { GndMediaType } from "./dom.js";

export type { GndMediaType };

/**
 * Builds a Guided Navigation document from an HTML or XHTML fragment or
 * document, following https://github.com/readium/guided-navigation.
 */
export function makeGnd(input: string, mediaType?: GndMediaType): GndDocument {
  return { guided: parseMarkup(input, mediaType) };
}
