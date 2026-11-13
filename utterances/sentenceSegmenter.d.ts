import { WalkContext } from './walkContext.js';
export interface SentenceBoundary {
    text: string;
    start: number;
    end: number;
    contentEnd: number;
}
export type SentenceSegmenter = (language: string, text: string, customSuppressions?: string[]) => Promise<SentenceBoundary[]>;
export declare function suppressionLanguage(language: string): string;
export declare function callerSuppressions(language: string, ctx: WalkContext): string[] | undefined;
export declare function segmentSentences(language: string, text: string, customSuppressions?: string[]): Promise<SentenceBoundary[]>;
