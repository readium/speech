import { LocatorOptions } from '../decorator/createLocator.js';
import { ReadiumSpeechUtterance, UtteranceOffset } from '../utterance.js';
import { Replacement } from './text.js';
type SubstitutionSource = {
    plain: string;
    replacements: Replacement[];
};
export declare function recordSubstitutionSource(utterance: ReadiumSpeechUtterance, source: SubstitutionSource): void;
export declare function markNonQuotable<T extends LocatorOptions>(locate: T): T;
export declare function recordAliasOffset(offset: UtteranceOffset, spokenLength: number): void;
export declare function resolveBoundaryLocate(utterance: ReadiumSpeechUtterance, charIndex: number, charLength: number): {
    locate: LocatorOptions;
    word: string;
} | undefined;
export {};
