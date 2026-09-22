import { SentenceSegmenter } from './sentenceSegmenter.js';
export declare function splitSsmlAtSentences(ssml: string, language: string, segmenter: SentenceSegmenter, customSuppressions?: string[]): Promise<string[] | undefined>;
