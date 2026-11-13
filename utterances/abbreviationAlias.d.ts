import { ReadiumSpeechUtterance } from '../utterance.js';
import { SentenceBoundary } from './sentenceSegmenter.js';
import { SourceTrace, WalkContext } from './walkContext.js';
export declare function isAlias(piece: ReadiumSpeechUtterance, ctx: WalkContext): boolean;
export declare function segmentAroundAliases(pieces: ReadiumSpeechUtterance[], plainParts: string[], joined: string, ranges: {
    start: number;
    end: number;
}[], language: string, suppressions: string[] | undefined, ctx: WalkContext): Promise<SentenceBoundary[]>;
export type AliasSegmentation = {
    boundaries: SentenceBoundary[];
    textRanges: {
        start: number;
        end: number;
    }[];
    included: number[];
};
export declare function segmentAliasText(pieces: ReadiumSpeechUtterance[], plainParts: string[], language: string, suppressions: string[] | undefined, ctx: WalkContext): Promise<AliasSegmentation>;
export declare function mapAliasBoundaries({ boundaries: textBoundaries, textRanges, included }: AliasSegmentation, pieces: ReadiumSpeechUtterance[], joined: string, ranges: {
    start: number;
    end: number;
}[], ctx: WalkContext): SentenceBoundary[];
export declare function endsWithSentenceTerminator(text: string): boolean;
export declare function punctuateSentenceEndingAliases(pieces: ReadiumSpeechUtterance[], joined: string, ranges: {
    start: number;
    end: number;
}[], boundaries: SentenceBoundary[], ctx: WalkContext): boolean;
export declare function punctuateLoneAlias(piece: ReadiumSpeechUtterance, ctx: WalkContext): void;
export declare function mergeAliasPieces(out: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext): Promise<{
    out: ReadiumSpeechUtterance[];
    sources: SourceTrace;
}>;
