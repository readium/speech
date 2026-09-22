import { LocatorOptions } from './decorator/createLocator.js';
export interface UtteranceOffset {
    start: number;
    end: number;
    locate: LocatorOptions;
}
export interface ReadiumSpeechUtterance {
    id?: string;
    plain?: string;
    ssml?: string;
    language?: string;
    locate?: LocatorOptions;
    offsets?: UtteranceOffset[];
}
