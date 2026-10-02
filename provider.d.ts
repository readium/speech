import { ReadiumSpeechPlaybackEngine } from './engine.js';
import { ReadiumSpeechVoice } from './voices/types.js';
export interface ReadiumSpeechEngineProvider {
    readonly id: string;
    readonly name: string;
    getVoices(forceRefresh?: boolean): Promise<ReadiumSpeechVoice[]>;
    createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
    destroy(): Promise<void>;
}
