import { ReadiumSpeechPlaybackEvent } from '../navigator.js';
export interface ErrorEventDetail {
    message: string;
    recoverable: boolean;
    error?: string;
    status?: number;
    type?: string;
    title?: string;
    instance?: string;
}
export declare function isRecoverableFailure(event: ReadiumSpeechPlaybackEvent<"error">): boolean;
