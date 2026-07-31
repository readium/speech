import { ReadiumSpeechEngineProvider } from '../provider';
import { ReadiumSpeechPlaybackEngine } from '../engine';
import { ReadiumSpeechVoice } from '../voices/types';
import { SpeechServerEngineOptions } from './speechServerEngine';
export type SpeechServerEngineProviderOptions = SpeechServerEngineOptions;
export declare class SpeechServerEngineProvider implements ReadiumSpeechEngineProvider {
    readonly id: string;
    readonly name: string;
    private options;
    private fetchImpl;
    private voices;
    constructor(options: SpeechServerEngineProviderOptions);
    getVoices(): Promise<ReadiumSpeechVoice[]>;
    createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
    destroy(): Promise<void>;
}
