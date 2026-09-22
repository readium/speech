import { LocatorOptions } from '../decorator/createLocator.js';
import { Segmentation } from './types.js';
import { ReadiumSpeechUtterance } from '../utterance.js';
export declare function resolveUtteranceLocate(utterance: ReadiumSpeechUtterance, segmentation: Segmentation): LocatorOptions[];
