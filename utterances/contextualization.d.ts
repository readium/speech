import { GuidedNavigationObject } from '@readium/shared';
import { GndRole } from '@readium/guided-navigation';
import { ReadiumSpeechUtterance } from '../utterance.js';
import { SourceTrace, WalkContext } from './walkContext.js';
export declare function resolveEntryText(ctx: WalkContext, base: string, variantKey?: string, params?: Record<string, string>): string | undefined;
export declare function isRoleContextualized(role: string, ctx: WalkContext): boolean;
export declare function isDroppedByAnotherRole(role: GndRole, roles: GndRole[], ctx: WalkContext): boolean;
export declare function scopeToQuote(utterance: ReadiumSpeechUtterance, text: string, quoteText: string, node: GuidedNavigationObject, ctx: WalkContext): void;
export declare function pushRoleContextualization(out: ReadiumSpeechUtterance[], sources: SourceTrace, node: GuidedNavigationObject, ctx: WalkContext, role: string, phase: "before" | "after", variantKey?: string, params?: Record<string, string>): void;
export declare function resolvePluralPart(ctx: WalkContext, role: string, name: string, count: number): string;
type ContextualizationParams = {
    variantKey?: string;
    params?: Record<string, string>;
};
export declare function contextualizationParamsFor(role: string, node: GuidedNavigationObject, ctx: WalkContext): ContextualizationParams;
export {};
