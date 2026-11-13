import { GuidedNavigationObject } from '@readium/shared';
import { SourceTrace, WalkContext } from './walkContext.js';
export declare function isBlockNode(node: GuidedNavigationObject, ctx: WalkContext): boolean;
export declare function edgeNode(source: NonNullable<SourceTrace[number]>, edge: "leading" | "trailing"): GuidedNavigationObject;
export declare function blockOf(source: SourceTrace[number], edge: "leading" | "trailing", ctx: WalkContext): GuidedNavigationObject | undefined;
