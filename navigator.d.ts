import { GuidedNavigationObject } from '@readium/shared';
import { Configurable } from './preferences/Configurable.js';
import { SpeechPreferences } from './preferences/SpeechPreferences.js';
import { SpeechSettings } from './preferences/SpeechSettings.js';
import { ReadiumSpeechVoice } from './voices/types.js';
import { ReadiumSpeechUtterance } from './utterance.js';
import { LocatorOptions } from './decorator/createLocator.js';
import { ErrorEventDetail } from './Fallback/recoverableFailure.js';
export type ReadiumSpeechPlaybackState = "playing" | "paused" | "idle" | "loading" | "ready";
export interface ReadiumSpeechBoundaryDetail {
    name: string;
    charIndex: number;
    charLength: number;
    elapsedTime?: number;
    locate?: LocatorOptions | LocatorOptions[];
    word?: string;
}
export interface ReadiumSpeechPlaybackEventDetails {
    start: {
        voice: ReadiumSpeechVoice | null;
    };
    pause: undefined;
    resume: undefined;
    end: undefined;
    stop: undefined;
    skip: {
        position: number;
    };
    error: ErrorEventDetail;
    boundary: ReadiumSpeechBoundaryDetail;
    mark: {
        name: string;
    };
    idle: undefined;
    loading: undefined;
    ready: undefined;
    voiceschanged: undefined;
    languagefallback: {
        language: string;
        reason: "no-matching-voice";
    };
    enginefallback: {
        reason: ErrorEventDetail;
        voice: ReadiumSpeechVoice | null;
    };
    enginerecovered: {
        voice: ReadiumSpeechVoice | null;
    };
}
export interface ReadiumSpeechNavigatorEventDetails extends ReadiumSpeechPlaybackEventDetails {
    contentchange: {
        content: ReadiumSpeechUtterance[];
    };
}
type EventOf<Details, T extends keyof Details> = {
    [K in T]: Details[K] extends undefined ? {
        type: K;
        detail?: undefined;
    } : {
        type: K;
        detail: Details[K];
    };
}[T];
export type ReadiumSpeechPlaybackEvent<T extends keyof ReadiumSpeechPlaybackEventDetails = keyof ReadiumSpeechPlaybackEventDetails> = EventOf<ReadiumSpeechPlaybackEventDetails, T>;
export type ReadiumSpeechNavigatorEvent<T extends keyof ReadiumSpeechNavigatorEventDetails = keyof ReadiumSpeechNavigatorEventDetails> = EventOf<ReadiumSpeechNavigatorEventDetails, T>;
export interface ReadiumSpeechContentOptions {
    language?: string;
}
export interface ReadiumSpeechNavigatorContract extends Configurable<SpeechSettings, SpeechPreferences> {
    getVoices(): Promise<ReadiumSpeechVoice[]>;
    loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[], options?: ReadiumSpeechContentOptions): void;
    loadGndContent(nodes: GuidedNavigationObject[], options?: ReadiumSpeechContentOptions): Promise<void>;
    getCurrentContent(): ReadiumSpeechUtterance | null;
    getContentQueue(): ReadiumSpeechUtterance[];
    play(): void;
    pause(): void;
    stop(): void;
    next(): boolean;
    previous(): boolean;
    jumpTo(utteranceIndex: number): void;
    getState(): ReadiumSpeechPlaybackState;
    on<T extends keyof ReadiumSpeechNavigatorEventDetails>(event: T, listener: (event: ReadiumSpeechNavigatorEvent<T>) => void): () => void;
    destroy(): Promise<void>;
}
export {};
