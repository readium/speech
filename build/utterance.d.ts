import { LocatorOptions } from './decorator/createLocator.js';
export interface ReadiumSpeechUtterance {
    id?: string;
    plain?: string;
    ssml?: string;
    language?: string;
    locate?: LocatorOptions;
    synthetic?: boolean;
}
