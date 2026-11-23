import { LocatorOptions } from '../decorator/createLocator.js';
import { ReadiumSpeechUtterance } from '../utterance.js';
export declare function resolveBoundaryLocate(utterance: ReadiumSpeechUtterance, charIndex: number, charLength: number): {
    locate: LocatorOptions;
    word: string;
} | undefined;
