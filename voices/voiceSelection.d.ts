import { ReadiumSpeechPlaybackEngine } from '../engine.js';
import { VoicePreference } from '../preferences/SpeechPreferences.js';
import { ReadiumSpeechVoice } from './types.js';
export declare class VoiceSelection {
    private engine;
    private preference;
    private mainLanguages;
    voices: ReadiumSpeechVoice[];
    private contentLanguages;
    private voiceIds;
    private picked;
    private picking;
    private listing;
    constructor(engine: ReadiumSpeechPlaybackEngine, preference: () => VoicePreference | null, mainLanguages: () => string[]);
    /**
     * The voice content in `language` is read with: the preferred one for its tag; for `en-US`, the one preferred for
     * `en` if it's an `en-US` voice; for `en` that isn't a main language, that of the content's first `en-*`;
     * else the picked one for its tag, then the preferred and picked ones for its base language.
     */
    voiceFor(language: string | undefined, picked?: Record<string, string>): string | undefined;
    pickedRecord(): Record<string, string> | null;
    private picks;
    availablePreference(): VoicePreference | null;
    setContentLanguages(languages: string[]): void;
    unpicked(): string[];
    pick(): Promise<void>;
    private regionalOf;
    private needsBoundary;
    private pickKey;
    private pickedVoice;
    private pickVoice;
    private preferredVoiceIds;
    private listedVoiceId;
    private pickedVoiceKey;
}
