import { GuidedNavigationObject } from '@readium/shared';
import { Configurable } from './preferences/Configurable.js';
import { SpeechPreferences } from './preferences/SpeechPreferences.js';
import { SpeechSettings } from './preferences/SpeechSettings.js';
import { ReadiumSpeechVoice } from './voices/types.js';
import { ReadiumSpeechUtterance } from './utterance.js';
export type ReadiumSpeechPlaybackState = "playing" | "paused" | "idle" | "loading" | "ready";
export interface ReadiumSpeechPlaybackEvent {
    type: "start" | "pause" | "resume" | "end" | "stop" | "skip" | "error" | "boundary" | "mark" | "idle" | "loading" | "ready" | "voiceschanged" | "languagefallback" | "enginefallback" | "enginerecovered";
    detail?: any;
}
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
    on(event: ReadiumSpeechPlaybackEvent["type"] | "contentchange", listener: (event: ReadiumSpeechPlaybackEvent) => void): () => void;
    destroy(): Promise<void>;
}
