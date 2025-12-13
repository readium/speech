import { ReadiumSpeechPlaybackEngine } from './engine';
import { ReadiumSpeechVoice } from './voices/types';
export interface ReadiumSpeechEngineProvider {
    readonly id: string;
    readonly name: string;
    getVoices(): Promise<ReadiumSpeechVoice[]>;
    createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
    destroy(): Promise<void>;
}
