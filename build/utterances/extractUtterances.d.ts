import { GndObject } from '../gnd/types.js';
import { ReadiumSpeechUtterance } from '../utterance.js';
import { ExtractUtterancesOptions } from './types.js';
/**
 * Extracts an ordered list of read-aloud utterances from a Guided
 * Navigation node tree, following the patterns documented at
 * https://github.com/readium/guided-navigation/tree/main/examples/read-aloud.
 *
 * Accepts `GndObject[]` (as returned by `parseMarkup()`, or `GndDocument.guided`)
 * rather than a wrapped document.
 */
export declare function extractUtterances(nodes: GndObject[], options: ExtractUtterancesOptions): ReadiumSpeechUtterance[];
/**
 * Same as `extractUtterances()`, plus `sources[i]`: the node that produced `utterances[i]`.
 */
export declare function extractUtterancesWithSources(nodes: GndObject[], options: ExtractUtterancesOptions): {
    utterances: ReadiumSpeechUtterance[];
    sources: (GndObject | undefined)[];
};
