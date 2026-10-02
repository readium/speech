import { ReadiumSpeechPlaybackEngine } from './engine.js';
import { GuidedNavigationObject } from '@readium/shared';
import { ReadiumSpeechNavigatorContract, ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from './navigator.js';
import { ISpeechDefaults } from './preferences/SpeechDefaults.js';
import { ISpeechPreferences, SpeechPreferences } from './preferences/SpeechPreferences.js';
import { SpeechPreferencesEditor } from './preferences/SpeechPreferencesEditor.js';
import { SpeechSettings } from './preferences/SpeechSettings.js';
import { ContextualizationShapeOverrides } from './preferences/verbosityTables.js';
import { ReadiumSpeechUtterance } from './utterance.js';
import { Contextualizations } from './utterances/types.js';
import { SentenceSegmenter } from './utterances/sentenceSegmenter.js';
import { ReadiumSpeechVoice } from './voices/types.js';
export interface ContextualizationOverrides {
    contextualizations?: Contextualizations;
    shapes?: ContextualizationShapeOverrides;
    params?: (role: string, node: GuidedNavigationObject) => Record<string, string> | undefined;
}
export interface SegmentationOverrides {
    suppressions?: Record<string, string[]>;
    segmenter?: SentenceSegmenter;
}
export interface ReadiumSpeechNavigatorConfiguration {
    preferences?: ISpeechPreferences;
    defaults?: ISpeechDefaults;
    contextualizationOverrides?: ContextualizationOverrides;
    segmentationOverrides?: SegmentationOverrides;
}
export declare class ReadiumSpeechNavigator implements ReadiumSpeechNavigatorContract {
    private engine;
    private contentQueue;
    private readonly events;
    private navigatorState;
    private pendingAdvanceTimeout;
    private _defaults;
    private _preferences;
    private _settings;
    private _preferencesEditor;
    private readonly contextualizationOverrides?;
    private readonly segmentationOverrides?;
    private source;
    private contentSources;
    private contentBlockStarts;
    private pendingResumeIndex;
    private pendingResumeState;
    private pendingAutoPauseIndex;
    constructor(engine: ReadiumSpeechPlaybackEngine, configuration?: ReadiumSpeechNavigatorConfiguration);
    private applyEngineParameters;
    private initializeEngine;
    private setupEngineListeners;
    private setNavigatorState;
    getVoices(): Promise<ReadiumSpeechVoice[]>;
    setVoice(voice: ReadiumSpeechVoice | string): void;
    getCurrentVoice(): ReadiumSpeechVoice | null;
    setSpeakInContentLanguage(enabled: boolean): void;
    getSpeakInContentLanguage(): boolean;
    loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[]): void;
    loadGndContent(nodes: GuidedNavigationObject[]): Promise<void>;
    private setContentQueue;
    private reextract;
    private resolveResumeIndex;
    getCurrentContent(): ReadiumSpeechUtterance | null;
    getContentQueue(): ReadiumSpeechUtterance[];
    private getCurrentUtteranceIndex;
    play(): void;
    pause(): void;
    stop(): void;
    private clearPendingAdvance;
    private skipToPosition;
    next(forcePlay?: boolean): boolean;
    previous(forcePlay?: boolean): boolean;
    jumpTo(utteranceIndex: number, forcePlay?: boolean): boolean;
    getState(): ReadiumSpeechPlaybackState;
    on(event: ReadiumSpeechPlaybackEvent["type"] | "contentchange", listener: (event: ReadiumSpeechPlaybackEvent) => void): () => void;
    private emitEvent;
    private emitUtteranceBoundary;
    private emitContentChangeEvent;
    get settings(): SpeechSettings;
    get preferencesEditor(): SpeechPreferencesEditor;
    submitPreferences(preferences: SpeechPreferences): Promise<void>;
    private applyPreferences;
    private sameSettingValue;
    destroy(): Promise<void>;
}
