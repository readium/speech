import { ReadiumSpeechEngineProvider } from '../provider';
import { ReadiumSpeechPlaybackEngine } from '../engine';
import { ReadiumSpeechVoice } from '../voices';
export declare class WebSpeechEngineProvider implements ReadiumSpeechEngineProvider {
    readonly id: string;
    readonly name: string;
    private engine;
    getVoices(): Promise<ReadiumSpeechVoice[]>;
    createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
    destroy(): Promise<void>;
}
