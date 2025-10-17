import { ReadiumSpeechVoice } from './voices';
import { ReadiumSpeechUtterance } from './utterance';
export type ReadiumSpeechPlaybackState = "playing" | "paused" | "idle" | "loading" | "ready";
export interface ReadiumSpeechPlaybackEvent {
    type: "start" | "pause" | "resume" | "end" | "stop" | "error" | "boundary" | "mark" | "idle" | "loading" | "ready" | "voiceschanged";
    detail?: any;
}
export interface ReadiumSpeechNavigator {
    getVoices(): Promise<ReadiumSpeechVoice[]>;
    setVoice(voice: ReadiumSpeechVoice | string): Promise<void>;
    getCurrentVoice(): ReadiumSpeechVoice | null;
    loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[]): void;
    getCurrentContent(): ReadiumSpeechUtterance | null;
    getContentQueue(): ReadiumSpeechUtterance[];
    play(): Promise<void>;
    pause(): void;
    stop(): void;
    togglePlayPause(): Promise<void>;
    next(): Promise<boolean>;
    previous(): Promise<boolean>;
    jumpTo(utteranceIndex: number): void;
    setRate(rate: number): void;
    setPitch(pitch: number): void;
    setVolume(volume: number): void;
    getState(): ReadiumSpeechPlaybackState;
    on(event: ReadiumSpeechPlaybackEvent["type"] | "contentchange", listener: (event: ReadiumSpeechPlaybackEvent) => void): () => void;
    destroy(): Promise<void>;
}
