import { GuidedNavigationObject } from '@readium/shared';
import { LocatorOptions } from '../decorator/createLocator.js';
import { ReadiumSpeechUtterance, UtteranceOffset } from '../utterance.js';
import { ResolvedNodeText } from './text.js';
import { ExtractionFormat, LanguageMode } from './types.js';
import { SourceTrace, WalkContext } from './walkContext.js';
export declare function joinPieceTexts(parts: string[], plainParts?: string[], spacing?: PieceSpacing[]): {
    joined: string;
    ranges: {
        start: number;
        end: number;
    }[];
};
export type PieceSpacing = "touching" | "spaced" | undefined;
export declare function pieceSpacing(pieces: ReadiumSpeechUtterance[], ctx: WalkContext): PieceSpacing[];
export declare function pieceIndexAt(ranges: {
    start: number;
    end: number;
}[], pos: number): number;
export declare function substitutedBareLocate(node: GuidedNavigationObject, ctx: WalkContext): LocatorOptions | undefined;
export declare function buildMergeOffsets(pieces: ReadiumSpeechUtterance[], pieceSources: SourceTrace, ctx: WalkContext): UtteranceOffset[];
export declare function mergeUtterances(pieces: ReadiumSpeechUtterance[], pieceSources: SourceTrace, ctx: WalkContext): ReadiumSpeechUtterance | undefined;
export declare function nodeOwnText(resolved: ResolvedNodeText | undefined, format: ExtractionFormat): string;
export declare function applyFormat(resolved: ResolvedNodeText, format: ExtractionFormat, language: LanguageMode | undefined, ctx: WalkContext): ReadiumSpeechUtterance[];
export declare function plainOf(text: string, format: ExtractionFormat): string;
