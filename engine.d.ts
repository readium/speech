import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from './navigator';
import { ReadiumSpeechUtterance } from './utterance';
import { ReadiumSpeechVoice } from './voices';
export interface ReadiumSpeechPlaybackEngine {
    loadUtterances(contents: ReadiumSpeechUtterance[]): void;
    setVoice(voice: ReadiumSpeechVoice | string): void;
    getCurrentVoice(): ReadiumSpeechVoice | null;
    getAvailableVoices(): Promise<ReadiumSpeechVoice[]>;
    speak(utteranceIndex?: number): void;
    pause(): void;
    resume(): void;
    stop(): void;
    setRate(rate: number): void;
    setPitch(pitch: number): void;
    setVolume(volume: number): void;
    getState(): ReadiumSpeechPlaybackState;
    getCurrentUtteranceIndex(): number;
    getUtteranceCount(): number;
    on(event: ReadiumSpeechPlaybackEvent["type"], callback: (event: ReadiumSpeechPlaybackEvent) => void): () => void;
    destroy(): Promise<void>;
}
