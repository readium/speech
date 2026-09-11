import { GndDocument } from './types.js';
import { GndMediaType } from './dom.js';
import { GndGenerationOptions } from './options.js';
export type { GndMediaType };
/**
 * Builds a Guided Navigation document from an HTML or XHTML fragment or
 * document, following https://github.com/readium/guided-navigation.
 */
export declare function makeGnd(input: string | Element, mediaType?: GndMediaType, options?: GndGenerationOptions): GndDocument;
