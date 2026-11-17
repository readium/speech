import { SentenceBoundary, SentenceSegmenter } from './sentenceSegmenter.js';
export declare function splitSsmlAtSentences(ssml: string, language: string, segmenter: SentenceSegmenter, customSuppressions?: string[]): Promise<string[] | undefined>;
export declare function keepUnrepeatableWhole(ssml: string, boundaries: SentenceBoundary[]): SentenceBoundary[];
