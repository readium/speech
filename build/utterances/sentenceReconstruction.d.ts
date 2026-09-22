import { ReadiumSpeechUtterance } from '../utterance.js';
import { SourceTrace, WalkContext } from './walkContext.js';
export declare function splitIntoSentenceUtterances(out: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext): Promise<{
    out: ReadiumSpeechUtterance[];
    sources: SourceTrace;
}>;
