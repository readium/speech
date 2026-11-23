import { GuidedNavigationObject } from '@readium/shared';
import { LocatorOptions } from '../decorator/createLocator.js';
import { UtteranceOffset } from '../utterance.js';
import { Piece } from './piece.js';
import { WalkContext } from './walkContext.js';
export type SourceSpan = TextSpan | AliasSpan;
type InBlock = {
    block?: {
        node: GuidedNavigationObject;
        at: number;
    };
};
interface TextSpan extends InBlock {
    node: GuidedNavigationObject;
    ownText: string;
    at: number;
    map: number[];
    quotedOnly?: boolean;
    offPage?: Range[];
}
interface AliasSpan extends InBlock {
    node: GuidedNavigationObject;
    at: number;
    start: number;
    end: number;
    alias: LocatorOptions;
    length?: number;
}
export declare function spansOf(utterance: Piece, ctx: WalkContext): SourceSpan[];
export declare function setSpans(utterance: Piece, spans: SourceSpan[]): void;
export declare function setAliasSpan(piece: Piece, node: GuidedNavigationObject, range: {
    start: number;
    end: number;
}, alias: LocatorOptions): void;
export declare function setQuotedSpan(utterance: Piece, node: GuidedNavigationObject, ownText: string, at: number): void;
type Range = {
    start: number;
    end: number;
};
export declare function holdsMarker(child: GuidedNavigationObject): boolean;
export declare function sliceSpans(spans: SourceSpan[], from: number, to: number): SourceSpan[];
export declare function joinedSpans(pieces: Piece[], ranges: {
    start: number;
    end: number;
}[], ctx: WalkContext): SourceSpan[];
export interface OwnTextAligner {
    place(text: string): TextSpan | undefined;
    embed(child: GuidedNavigationObject): Embedding;
    finish(): void;
}
export interface Embedding {
    child: GuidedNavigationObject;
    range?: Range;
}
export declare function ownTextAligner(node: GuidedNavigationObject): OwnTextAligner;
export declare function placeInBlock(piece: Piece, child: GuidedNavigationObject, block: GuidedNavigationObject, at: number): void;
export declare function markOffPage(pieces: Piece[], node: GuidedNavigationObject, embedded: Embedding[]): void;
export declare function ownRange(spans: (SourceSpan | undefined)[]): {
    start: number;
    end: number;
} | undefined;
export declare function placeInOwnText(pieces: Piece[], node: GuidedNavigationObject, ctx: WalkContext): void;
export declare function buildOffsets(utterance: Piece, ctx: WalkContext): UtteranceOffset[];
export {};
