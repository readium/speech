import type { GndDocument } from "./types.js";
import { convert } from "./converter.js";
import type { GndMediaType } from "./dom.js";

export type { GndMediaType };

/**
 * Parses an HTML or XHTML fragment or document into a Guided Navigation
 * document, following https://github.com/readium/guided-navigation.
 */
export function parseGnd(input: string, mediaType?: GndMediaType): GndDocument {
  const children = convert(input, mediaType);
  const body: GndDocument["guided"][number] = { role: ["body"] };
  if (children.length > 0) body.children = children;
  return { guided: [body] };
}
