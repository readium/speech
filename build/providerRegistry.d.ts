import { ReadiumSpeechEngineProvider } from './provider';
import { ReadiumSpeechPlaybackEngine } from './engine';
import { ReadiumSpeechVoice } from './voices/types';
export interface ReadiumSpeechProviderVoices {
    providerId: string;
    voices: ReadiumSpeechVoice[];
}
export declare class ReadiumSpeechProviderRegistry {
    private providers;
    register(provider: ReadiumSpeechEngineProvider): void;
    unregister(providerId: string): void;
    get(providerId: string): ReadiumSpeechEngineProvider | undefined;
    list(): ReadiumSpeechEngineProvider[];
    getVoices(providerId: string): Promise<ReadiumSpeechVoice[]>;
    getAllVoices(): Promise<ReadiumSpeechProviderVoices[]>;
    createEngine(providerId: string, voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
    destroy(): Promise<void>;
    private require;
}
