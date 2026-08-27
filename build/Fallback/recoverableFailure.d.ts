import { ReadiumSpeechPlaybackEvent } from '../navigator';
export interface ErrorEventDetail {
    message: string;
    recoverable: boolean;
    status?: number;
    type?: string;
    title?: string;
    instance?: string;
}
export declare function isRecoverableFailure(event: ReadiumSpeechPlaybackEvent): boolean;
