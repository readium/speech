import { Piece } from './piece.js';
import { SentenceBoundary } from './sentenceSegmenter.js';
import { WalkContext } from './walkContext.js';
export declare function isAlias(piece: Piece): boolean;
export declare function segmentAroundAliases(pieces: Piece[], plainParts: string[], joined: string, ranges: {
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
export declare function segmentAliasText(pieces: Piece[], plainParts: string[], language: string, suppressions: string[] | undefined, ctx: WalkContext): Promise<AliasSegmentation>;
export declare function mapAliasBoundaries({ boundaries: textBoundaries, textRanges, included }: AliasSegmentation, pieces: Piece[], joined: string, ranges: {
    start: number;
    end: number;
}[], ctx: WalkContext): SentenceBoundary[];
export declare function endsWithSentenceTerminator(text: string): boolean;
export declare function punctuateSentenceEndingAliases(pieces: Piece[], joined: string, ranges: {
    start: number;
    end: number;
}[], boundaries: SentenceBoundary[], ctx: WalkContext): boolean;
export declare function punctuateLoneAlias(piece: Piece, ctx: WalkContext): void;
export declare function mergeAliasPieces(out: Piece[], ctx: WalkContext): Promise<Piece[]>;
