import { ReadiumSpeechEngineProvider } from '../provider.js';
import { ReadiumSpeechPlaybackEngine } from '../engine.js';
import { ReadiumSpeechVoice } from '../voices/types.js';
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
