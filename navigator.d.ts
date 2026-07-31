import { ReadiumSpeechVoice } from './voices/types';
import { ReadiumSpeechUtterance } from './utterance';
export type ReadiumSpeechPlaybackState = "playing" | "paused" | "idle" | "loading" | "ready";
export interface ReadiumSpeechPlaybackEvent {
    type: "start" | "pause" | "resume" | "end" | "stop" | "skip" | "error" | "boundary" | "mark" | "idle" | "loading" | "ready" | "voiceschanged" | "languagefallback";
    detail?: any;
}
export interface ReadiumSpeechNavigatorContract {
    getVoices(): Promise<ReadiumSpeechVoice[]>;
    setVoice(voice: ReadiumSpeechVoice | string): void;
    getCurrentVoice(): ReadiumSpeechVoice | null;
    setSpeakInContentLanguage(enabled: boolean): void;
    getSpeakInContentLanguage(): boolean;
    loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[]): void;
    getCurrentContent(): ReadiumSpeechUtterance | null;
    getContentQueue(): ReadiumSpeechUtterance[];
    play(): void;
    pause(): void;
    stop(): void;
    next(): boolean;
    previous(): boolean;
    jumpTo(utteranceIndex: number): void;
    setRate(rate: number): void;
    getRate(): number;
    setPitch(pitch: number): void;
    getPitch(): number;
    setVolume(volume: number): void;
    getVolume(): number;
    getState(): ReadiumSpeechPlaybackState;
    on(event: ReadiumSpeechPlaybackEvent["type"] | "contentchange", listener: (event: ReadiumSpeechPlaybackEvent) => void): () => void;
    destroy(): Promise<void>;
}
