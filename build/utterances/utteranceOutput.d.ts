import { ReadiumSpeechUtterance } from '../utterance.js';
import { GndObject } from '../gnd/types.js';
import { SourceTrace, WalkContext } from './walkContext.js';
export declare function formatPlain(text: string, ctx: WalkContext): ReadiumSpeechUtterance;
export declare function push(out: ReadiumSpeechUtterance[], sources: SourceTrace, node: SourceTrace[number], items: ReadiumSpeechUtterance[]): void;
export declare function pushPiecesOrMerged(out: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext, node: GndObject, pieces: ReadiumSpeechUtterance[], pieceSources: SourceTrace, merged: ReadiumSpeechUtterance | undefined): void;
