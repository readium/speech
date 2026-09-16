import type { GndObject, GndRole } from "../gnd/types.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { roleDropOverrides } from "./roles.js";
import { computeTableStructure, plainTextOf } from "./tableStructure.js";
import { formatPlain, push } from "./utteranceOutput.js";
import { valueFoldingRoleSet, type SourceTrace, type WalkContext } from "./walkContext.js";

// `variantKey`, when given, picks a nested named-variant leaf (e.g.
// `audio.inline.labelled`); falls back to `base` itself when that specific
// variant isn't defined there (a plain-string entry like `table.block.end`
// ignores variantKey entirely).
export function resolveEntryText(ctx: WalkContext, base: string, variantKey?: string, params?: Record<string, string>): string | undefined {
  const variantPath = variantKey ? `${base}.${variantKey}` : undefined;
  if (variantPath && ctx.i18n.exists(variantPath)) return ctx.i18n.t(variantPath, params);
  if (ctx.i18n.exists(base)) return ctx.i18n.t(base, params);
  return undefined;
}

export function isRoleContextualized(role: string, ctx: WalkContext): boolean {
  // A data cell's header is structural table content, not a discretionary
  // narration a reader opts into — it always reuses the applicable header.
  if (valueFoldingRoleSet.has(role)) return true;
  return ctx.contextualize.has(role);
}

export function isDroppedByAnotherRole(role: GndRole, roles: GndRole[], ctx: WalkContext): boolean {
  return roles.some((other) => {
    const entry = roleDropOverrides[other];
    if (!entry?.drops.includes(role)) return false;
    return entry.unconditional || isRoleContextualized(other, ctx);
  });
}

// Speaks `role`'s catalog entry for this `phase`: `inline` only has
// something to say "before"; `block` says `start`/`end` at "before"/"after"
// — unless `ctx.contextualizationShapes` overrides this role to "inline"
// here, in which case it reads the same `inline` entry any inline-only
// role uses, not `block.start`.
export function pushRoleContextualization(
  out: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  node: GndObject,
  ctx: WalkContext,
  role: string,
  phase: "before" | "after",
  variantKey?: string,
  params?: Record<string, string>,
): void {
  if (!isRoleContextualized(role, ctx)) return;
  const isBlock = ctx.i18n.exists(`${role}.block.start`) || ctx.i18n.exists(`${role}.block.end`);
  if (isBlock && ctx.contextualizationShapes[role] !== "inline") {
    const base = phase === "before" ? `${role}.block.start` : `${role}.block.end`;
    const text = resolveEntryText(ctx, base, variantKey, params);
    if (text) push(out, sources, node, [formatPlain(text, ctx)]);
    return;
  }
  if (phase === "before") {
    const text = resolveEntryText(ctx, `${role}.inline`, variantKey, params);
    if (text) {
      const utterance = formatPlain(text, ctx);
      // cell/rowheader's template embeds the node's own text (`{{ value }}`) —
      // it must keep that node's language, same as speaking the text directly
      // would, and isn't a synthesized label the way other roles' catalog
      // entries are: it's the node's real text, just optionally header-prefixed.
      if (valueFoldingRoleSet.has(role)) {
        ctx.synthetic.delete(utterance);
        if (ctx.language !== "none") {
          const language = typeof node.text === "object" ? node.text.language : undefined;
          if (language) utterance.language = language;
        }
      }
      push(out, sources, node, [utterance]);
    }
  }
}

// Falls back to the bare number when the catalog has no `parts` entry.
export function resolvePluralPart(ctx: WalkContext, role: string, name: string, count: number): string {
  const key = `${role}.parts.${name}`;
  return ctx.i18n.exists(key, { count }) ? ctx.i18n.t(key, { count }) : String(count);
}

type ContextualizationParams = { variantKey?: string; params?: Record<string, string> };
type ContextualizationParamsProvider = (node: GndObject, ctx: WalkContext) => ContextualizationParams;

// Any node with a `description` gets `{{ description }}` interpolated,
// whatever its role, plus a labelled/unlabelled variant a catalog entry can opt into.
function genericDescriptionParams(node: GndObject): ContextualizationParams {
  if (node.description === undefined) return { variantKey: "unlabelled" };
  return { variantKey: "labelled", params: { description: node.description } };
}

function cellOrRowheaderParams(node: GndObject, ctx: WalkContext): ContextualizationParams {
  const header = ctx.tableCellHeaders.get(node);
  return {
    variantKey: header !== undefined ? "withHeader" : "withoutHeader",
    params: { header: header ?? "", value: plainTextOf(node) },
  };
}

// Structural data only computable by walking the table, for the roles that need it.
const builtInContextualizationParamProviders: Partial<Record<GndRole, ContextualizationParamsProvider>> = {
  table: (node, ctx) => {
    const rows = (node.children ?? []).filter((child) => child.role?.includes("row"));
    const structure = computeTableStructure(rows);
    for (const [row, count] of structure.rowNumbers) ctx.tableRowNumbers.set(row, count);
    for (const [cell, header] of structure.cellHeaders) ctx.tableCellHeaders.set(cell, header);
    return {
      params: {
        lines: resolvePluralPart(ctx, "table", "lines", structure.lines),
        columns: resolvePluralPart(ctx, "table", "columns", structure.columns),
      },
    };
  },
  row: (node, ctx) => ({ params: { count: String(ctx.tableRowNumbers.get(node) ?? "") } }),
  cell: cellOrRowheaderParams,
  rowheader: cellOrRowheaderParams,
};

// Layers generic description params, then structural params, then the caller's own — later wins per key.
export function contextualizationParamsFor(role: string, node: GndObject, ctx: WalkContext): ContextualizationParams {
  const generic = genericDescriptionParams(node);
  let variantKey = generic.variantKey;
  let params = generic.params;
  const structural = builtInContextualizationParamProviders[role]?.(node, ctx);
  if (structural) {
    if (structural.variantKey) variantKey = structural.variantKey;
    params = { ...params, ...structural.params };
  }
  const custom = ctx.contextualizationParams?.(role, node);
  if (custom) params = { ...params, ...custom };
  return { variantKey, params };
}
