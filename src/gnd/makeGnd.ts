import type { GndDocument } from "./types.js";
import { parseMarkup } from "./converter.js";
import type { GndMediaType } from "./dom.js";
import type { GndGenerationOptions } from "./options.js";

export type { GndMediaType };

/**
 * Builds a Guided Navigation document from an HTML or XHTML fragment or
 * document, following https://github.com/readium/guided-navigation.
 */
export function makeGnd(
  input: string | Element,
  mediaType?: GndMediaType,
  options?: GndGenerationOptions,
): GndDocument {
  return { guided: parseMarkup(input, mediaType, options) };
}
