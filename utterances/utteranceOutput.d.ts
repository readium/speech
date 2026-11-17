import { GuidedNavigationObject } from '@readium/shared';
import { SourceTrace, WalkContext } from './walkContext.js';
import { Piece } from './piece.js';
export declare function formatPlain(text: string, ctx: WalkContext): Piece;
export declare function formatEntryText(text: string, ctx: WalkContext): Piece;
export declare function formatDescription(text: string, node: GuidedNavigationObject, ctx: WalkContext): Piece;
export declare function push(out: Piece[], node: SourceTrace[number], items: Piece[]): void;
export declare function pushPiecesOrMerged(out: Piece[], node: GuidedNavigationObject, pieces: Piece[], merged: Piece | undefined): void;
export declare function pushMergedRuns(out: Piece[], ctx: WalkContext, node: GuidedNavigationObject, pieces: Piece[]): void;
