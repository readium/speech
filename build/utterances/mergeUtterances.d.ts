import { GndObject } from '../gnd/types.js';
import { LocatorOptions } from '../decorator/createLocator.js';
import { ReadiumSpeechUtterance } from '../utterance.js';
import { ResolvedNodeText } from './text.js';
import { ExtractionFormat, LanguageMode } from './types.js';
import { SourceTrace, WalkContext } from './walkContext.js';
export declare function joinPieceTexts(parts: string[]): {
    joined: string;
    ranges: {
        start: number;
        end: number;
    }[];
};
export declare function substitutedBareLocate(node: GndObject, ctx: WalkContext): LocatorOptions | undefined;
export declare function mergeUtterances(pieces: ReadiumSpeechUtterance[], pieceSources: SourceTrace, ctx: WalkContext): ReadiumSpeechUtterance | undefined;
export declare function applyFormat(resolved: ResolvedNodeText, format: ExtractionFormat, language: LanguageMode | undefined, ctx: WalkContext): ReadiumSpeechUtterance[];
export declare function plainOf(text: string, format: ExtractionFormat): string;
