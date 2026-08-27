import { ReadiumSpeechPlaybackEngine } from './engine';
import { ReadiumSpeechVoice } from './voices/types';
export interface ReadiumSpeechEngineProvider {
    readonly id: string;
    readonly name: string;
    getVoices(forceRefresh?: boolean): Promise<ReadiumSpeechVoice[]>;
    createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
    destroy(): Promise<void>;
}
