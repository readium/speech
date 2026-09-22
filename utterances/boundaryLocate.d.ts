import { LocatorOptions } from '../decorator/createLocator.js';
import { ReadiumSpeechUtterance } from '../utterance.js';
export declare function recordSubstitutionSource(utterance: ReadiumSpeechUtterance, source: {
    plain: string;
    map: number[];
}): void;
export declare function markNonQuotable<T extends LocatorOptions>(locate: T): T;
export declare function resolveBoundaryLocate(utterance: ReadiumSpeechUtterance, charIndex: number, charLength: number): {
    locate: LocatorOptions;
    word: string;
} | undefined;
