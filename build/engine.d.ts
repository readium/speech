import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from './navigator';
import { ReadiumSpeechUtterance } from './utterance';
import { ReadiumSpeechVoice } from './voices/types';
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
    getRate(): number;
    setPitch(pitch: number): void;
    getPitch(): number;
    setVolume(volume: number): void;
    getVolume(): number;
    getState(): ReadiumSpeechPlaybackState;
    getCurrentUtteranceIndex(): number;
    setCurrentUtteranceIndex(index: number, onComplete?: (success: boolean) => void): void;
    getUtteranceCount(): number;
    on(event: ReadiumSpeechPlaybackEvent["type"], callback: (event: ReadiumSpeechPlaybackEvent) => void): () => void;
    destroy(): Promise<void>;
}
