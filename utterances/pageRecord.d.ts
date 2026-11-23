import { GuidedNavigationObject } from '@readium/shared';
import { ReadiumSpeechUtterance, UtteranceOffset } from '../utterance.js';
import { Replacement } from './text.js';
export interface PageChar {
    offset: number;
    at: number;
}
export type PageRun = {
    block: GuidedNavigationObject;
    blockText: string;
    start: number;
    end: number;
    spokenStart: number;
    spokenEnd: number;
} | {
    offPage: true;
    spokenEnd: number;
    block?: GuidedNavigationObject;
    start?: number;
    end?: number;
};
export interface PageRecord {
    spoken: string;
    chars: PageChar[];
    texts: string[];
    measured: string;
    runs: PageRun[];
    replacements?: Replacement[];
    pageText?: string;
}
export declare function recordPage(offsets: UtteranceOffset[], record: PageRecord): void;
export declare function pageRecordOf(utterance: ReadiumSpeechUtterance): PageRecord | undefined;
export declare function pageTextOf(record: PageRecord): string;
