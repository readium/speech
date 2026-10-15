import { GuidedNavigationObject } from '@readium/shared';
import { LocatorOptions } from '../decorator/createLocator.js';
import { ReadiumSpeechUtterance, UtteranceOffset } from '../utterance.js';
import { ResolvedNodeText } from './text.js';
import { ExtractionFormat, LanguageMode } from './types.js';
import { SourceTrace, WalkContext } from './walkContext.js';
export declare function joinPieceTexts(parts: string[], plainParts?: string[]): {
    joined: string;
    ranges: {
        start: number;
        end: number;
    }[];
};
export declare function substitutedBareLocate(node: GuidedNavigationObject, ctx: WalkContext): LocatorOptions | undefined;
export declare function buildMergeOffsets(pieces: ReadiumSpeechUtterance[], pieceSources: SourceTrace, ctx: WalkContext): UtteranceOffset[];
export declare function mergeUtterances(pieces: ReadiumSpeechUtterance[], pieceSources: SourceTrace, ctx: WalkContext): ReadiumSpeechUtterance | undefined;
export declare function applyFormat(resolved: ResolvedNodeText, format: ExtractionFormat, language: LanguageMode | undefined, ctx: WalkContext): ReadiumSpeechUtterance[];
export declare function plainOf(text: string, format: ExtractionFormat): string;
