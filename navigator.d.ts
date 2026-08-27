import { GndObject } from './gnd/types';
import { Configurable } from './preferences/Configurable';
import { SpeechPreferences } from './preferences/SpeechPreferences';
import { SpeechSettings } from './preferences/SpeechSettings';
import { ReadiumSpeechVoice } from './voices/types';
import { ReadiumSpeechUtterance } from './utterance';
export type ReadiumSpeechPlaybackState = "playing" | "paused" | "idle" | "loading" | "ready";
export interface ReadiumSpeechPlaybackEvent {
    type: "start" | "pause" | "resume" | "end" | "stop" | "skip" | "error" | "boundary" | "mark" | "idle" | "loading" | "ready" | "voiceschanged" | "languagefallback" | "enginefallback" | "enginerecovered";
    detail?: any;
}
export interface ReadiumSpeechNavigatorContract extends Configurable<SpeechSettings, SpeechPreferences> {
    getVoices(): Promise<ReadiumSpeechVoice[]>;
    setVoice(voice: ReadiumSpeechVoice | string): void;
    getCurrentVoice(): ReadiumSpeechVoice | null;
    setSpeakInContentLanguage(enabled: boolean): void;
    getSpeakInContentLanguage(): boolean;
    loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[]): void;
    loadGndContent(nodes: GndObject[]): void;
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
