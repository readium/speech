import { LocatorOptions } from '../decorator/createLocator.js';
import { Segmentation } from './types.js';
import { ReadiumSpeechUtterance, UtteranceOffset } from '../utterance.js';
export declare function recordPageText(offsets: UtteranceOffset[], text: string): void;
export declare function resolveUtteranceSourceText(utterance: ReadiumSpeechUtterance): string | undefined;
export declare function resolveUtteranceLocate(utterance: ReadiumSpeechUtterance, segmentation: Segmentation): LocatorOptions[];
