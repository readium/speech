import { SentenceBoundary } from './sentenceSegmenter.js';
interface RawBoundary {
    start: number;
    end: number;
}
export declare function refineSentenceBoundaries(text: string, raw: RawBoundary[], suppressions: string[]): SentenceBoundary[];
export declare function mergeBoundaries(text: string, boundaries: SentenceBoundary[], joinsNext: (boundary: SentenceBoundary, next: SentenceBoundary) => boolean): SentenceBoundary[];
export {};
