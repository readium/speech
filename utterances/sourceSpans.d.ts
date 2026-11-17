import { GuidedNavigationObject } from '@readium/shared';
import { LocatorOptions } from '../decorator/createLocator.js';
import { UtteranceOffset } from '../utterance.js';
import { Piece } from './piece.js';
import { WalkContext } from './walkContext.js';
export type SourceSpan = TextSpan | AliasSpan;
interface TextSpan {
    node: GuidedNavigationObject;
    ownText: string;
    at: number;
    map: number[];
    quotedOnly?: boolean;
}
interface AliasSpan {
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
export declare function sliceSpans(spans: SourceSpan[], from: number, to: number): SourceSpan[];
export declare function joinedSpans(pieces: Piece[], ranges: {
    start: number;
    end: number;
}[], ctx: WalkContext): SourceSpan[];
export interface OwnTextAligner {
    place(text: string): TextSpan | undefined;
    embed(childText: string): void;
}
export declare function ownTextAligner(node: GuidedNavigationObject): OwnTextAligner;
export declare function ownRange(spans: (SourceSpan | undefined)[]): {
    start: number;
    end: number;
} | undefined;
export declare function placeInOwnText(pieces: Piece[], node: GuidedNavigationObject, ctx: WalkContext): void;
export declare function buildOffsets(utterance: Piece, ctx: WalkContext): UtteranceOffset[];
export {};
