import { GuidedNavigationObject } from '@readium/shared';
import { ReadiumSpeechUtterance } from '../utterance.js';
import { SourceTrace, WalkContext } from './walkContext.js';
export declare function walk(nodes: GuidedNavigationObject[], out: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext, suppress: boolean): void;
