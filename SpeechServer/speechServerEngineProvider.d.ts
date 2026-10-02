import { ReadiumSpeechEngineProvider } from '../provider.js';
import { ReadiumSpeechPlaybackEngine } from '../engine.js';
import { ReadiumSpeechVoice } from '../voices/types.js';
import { SpeechServerEngineOptions } from './speechServerEngine.js';
export type SpeechServerEngineProviderOptions = SpeechServerEngineOptions;
export declare class SpeechServerEngineProvider implements ReadiumSpeechEngineProvider {
    readonly id: string;
    readonly name: string;
    private options;
    private fetchImpl;
    private voices;
    constructor(options: SpeechServerEngineProviderOptions);
    getVoices(forceRefresh?: boolean): Promise<ReadiumSpeechVoice[]>;
    createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
    destroy(): Promise<void>;
}
