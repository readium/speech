import { GuidedNavigationObject } from '@readium/shared';
import { LocatorOptions } from '../decorator/createLocator.js';
import { ResolvedNodeText } from './text.js';
import { ExtractionFormat, LanguageMode } from './types.js';
import { WalkContext } from './walkContext.js';
import { Piece } from './piece.js';
export declare function pieceIndexAt(ranges: {
    start: number;
    end: number;
}[], pos: number): number;
export declare function substitutedBareLocate(node: GuidedNavigationObject, ctx: WalkContext): LocatorOptions | undefined;
export declare function mergeUtterances(pieces: Piece[], ctx: WalkContext): Piece | undefined;
export declare function applyFormat(node: GuidedNavigationObject, resolved: ResolvedNodeText, format: ExtractionFormat, language: LanguageMode | undefined, ctx: WalkContext): Piece[];
export declare function plainOf(text: string, format: ExtractionFormat): string;
export declare function pieceText(piece: Piece, ctx: WalkContext): string;
