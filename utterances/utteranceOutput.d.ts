import { ReadiumSpeechUtterance } from '../utterance.js';
import { GuidedNavigationObject } from '@readium/shared';
import { SourceTrace, WalkContext } from './walkContext.js';
export declare function formatPlain(text: string, ctx: WalkContext): ReadiumSpeechUtterance;
export declare function push(out: ReadiumSpeechUtterance[], sources: SourceTrace, node: SourceTrace[number], items: ReadiumSpeechUtterance[]): void;
export declare function pushPiecesOrMerged(out: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext, node: GuidedNavigationObject, pieces: ReadiumSpeechUtterance[], pieceSources: SourceTrace, merged: ReadiumSpeechUtterance | undefined): void;
