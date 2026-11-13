import type { GuidedNavigationObject } from "@readium/shared";
import type { GndRole } from "@readium/guided-navigation";
import { nodeRoles } from "./nodeFields.js";
import { blockLevelRoles } from "./roles.js";
import type { SourceTrace, WalkContext } from "./walkContext.js";

const blockLevelRoleSet: ReadonlySet<GndRole> = new Set(blockLevelRoles);

export function isBlockNode(node: GuidedNavigationObject, ctx: WalkContext): boolean {
  return ctx.blockTerms.has(node) || nodeRoles(node).some((role) => blockLevelRoleSet.has(role));
}

export function edgeNode(source: NonNullable<SourceTrace[number]>, edge: "leading" | "trailing"): GuidedNavigationObject {
  return Array.isArray(source) ? source[edge === "leading" ? 0 : 1] : source;
}

// The nearest block-level node holding a source's leading/trailing edge, itself included.
export function blockOf(source: SourceTrace[number], edge: "leading" | "trailing", ctx: WalkContext): GuidedNavigationObject | undefined {
  if (!source) return undefined;
  const node = edgeNode(source, edge);
  return [node, ...(ctx.ancestorChains.get(node) ?? [])].find((n) => isBlockNode(n, ctx));
}
