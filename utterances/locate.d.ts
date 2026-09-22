import { GndObject } from '../gnd/types.js';
import { DecodedTextref } from '../gnd/textrefFragment.js';
import { LocatorOptions } from '../decorator/createLocator.js';
import { ReadiumSpeechUtterance } from '../utterance.js';
import { SourceTrace, WalkContext } from './walkContext.js';
export declare function subLocateFor(nodeRef: DecodedTextref, quoteText: string): LocatorOptions;
export declare function resolveNodeLocate(node: GndObject, ancestorChains: Map<GndObject, GndObject[]>): {
    own: boolean;
    ref: DecodedTextref;
} | undefined;
export declare function preciseLocateFor(resolved: {
    own: boolean;
    ref: DecodedTextref;
} | undefined, text: string): LocatorOptions | undefined;
export declare function spanLocate(firstRef: {
    own: boolean;
    ref: DecodedTextref;
} | undefined, lastRef: {
    own: boolean;
    ref: DecodedTextref;
} | undefined, fallback: LocatorOptions | undefined): LocatorOptions | undefined;
export declare function attachLocate(utterances: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext): ReadiumSpeechUtterance[];
