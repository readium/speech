import { SentenceBoundary } from './sentenceSegmenter.js';
interface RawBoundary {
    start: number;
    end: number;
}
export declare function refineSentenceBoundaries(text: string, raw: RawBoundary[], suppressions: string[]): SentenceBoundary[];
export {};
