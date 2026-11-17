import { GuidedNavigationObject } from '@readium/shared';
import { GndRole } from '@readium/guided-navigation';
import { WalkContext } from './walkContext.js';
import { Piece } from './piece.js';
export declare function resolveEntryText(ctx: WalkContext, base: string, variantKey?: string, params?: Record<string, string>): string | undefined;
export declare function isRoleContextualized(role: string, ctx: WalkContext): boolean;
export declare function isDroppedByAnotherRole(role: GndRole, roles: GndRole[], ctx: WalkContext): boolean;
export declare function scopeToQuote(utterance: Piece, at: number | undefined, quoteText: string, node: GuidedNavigationObject, ctx: WalkContext): void;
export declare function pushRoleContextualization(out: Piece[], node: GuidedNavigationObject, ctx: WalkContext, role: string, phase: "before" | "after", variantKey?: string, params?: Record<string, string>): void;
export declare function resolvePluralPart(ctx: WalkContext, role: string, name: string, count: number): string;
type ContextualizationParams = {
    variantKey?: string;
    params?: Record<string, string>;
};
export declare function contextualizationParamsFor(role: string, node: GuidedNavigationObject, ctx: WalkContext): ContextualizationParams;
export {};
