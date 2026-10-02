import { ReadiumSpeechEngineProvider } from '../provider.js';
import { ReadiumSpeechPlaybackEngine } from '../engine.js';
import { ReadiumSpeechVoice } from '../voices/types.js';
export declare class WebSpeechEngineProvider implements ReadiumSpeechEngineProvider {
    readonly id: string;
    readonly name: string;
    private voiceEngine;
    getVoices(): Promise<ReadiumSpeechVoice[]>;
    createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
    destroy(): Promise<void>;
}
