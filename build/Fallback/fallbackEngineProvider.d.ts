import { ReadiumSpeechEngineProvider } from '../provider';
import { ReadiumSpeechPlaybackEngine } from '../engine';
import { ReadiumSpeechVoice } from '../voices/types';
export interface FallbackEngineProviderOptions {
    primary: ReadiumSpeechEngineProvider;
    fallback: ReadiumSpeechEngineProvider;
    onFailure?: "fallback" | "error" | "fallbackAndRecover";
    healthCheckIntervalMs?: number;
}
export declare class FallbackEngineProvider implements ReadiumSpeechEngineProvider {
    readonly id: string;
    readonly name: string;
    private readonly primary;
    private readonly fallback;
    private readonly onFailure;
    private readonly healthCheckIntervalMs?;
    constructor(options: FallbackEngineProviderOptions);
    getVoices(forceRefresh?: boolean): Promise<ReadiumSpeechVoice[]>;
    createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
    destroy(): Promise<void>;
}
