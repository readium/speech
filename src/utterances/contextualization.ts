import { ssmlAttrEscape, ssmlTextEscape } from "@readium/helpers";
import type { GuidedNavigationObject } from "@readium/shared";
import type { GndRole } from "@readium/guided-navigation";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { extractLangRegionFromBCP47 } from "../utils/language.js";
import { languageFor } from "./language.js";
import { resolveNodeLocate, subLocateFor } from "./locate.js";
import { descriptionLanguageOf, descriptionOf } from "./nodeFields.js";
import { roleDropOverrides } from "./roles.js";
import { splitOnLangTags } from "./text.js";
import { computeTableStructure, plainTextOf } from "./tableStructure.js";
import { formatDescription, formatEntryText, push } from "./utteranceOutput.js";
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

// Narrows utterance's offsets/locate to quoteText's own span within text.
// Leaves ctx.synthetic alone — that also gates sentence-splitting/merging.
export function scopeToQuote(utterance: ReadiumSpeechUtterance, text: string, quoteText: string, node: GuidedNavigationObject, ctx: WalkContext): void {
  const start = text.lastIndexOf(quoteText);
  if (start === -1) return;
  const resolved = resolveNodeLocate(node, ctx.ancestorChains);
  if (!resolved) return;
  const quoteLocate = subLocateFor(resolved.ref, quoteText);
  utterance.offsets = [{ start, end: start + quoteText.length, locate: quoteLocate }];
  utterance.locate = resolved.own ? resolved.ref : quoteLocate;
}

// `value` is always real DOM text. `description` is real DOM text only for figure/table (an implicit <figcaption>/<caption> fold); for every other describable role it's ARIA attribute text with no DOM location — GuidedNavigationObject carries no tag to tell the two apart otherwise.
function scopeToOwnValue(utterance: ReadiumSpeechUtterance, text: string, node: GuidedNavigationObject, ctx: WalkContext, role: string, params?: Record<string, string>): void {
  const value = params?.value;
  if (value !== undefined && value === plainTextOf(node)) {
    // Language reflects the node's own real text regardless of whether a
    // locate can be computed — a node with no textref still lost its language otherwise.
    const language = languageFor(node.text?.language, ctx);
    if (language) utterance.language = language;
    ctx.synthetic.delete(utterance);
    scopeToQuote(utterance, text, value, node, ctx);
    return;
  }
  const description = params?.description;
  if (description !== undefined && description === descriptionOf(node) && (role === "figure" || role === "table")) {
    scopeToQuote(utterance, text, description, node, ctx);
  }
}

// Speaks `role`'s catalog entry for this `phase`: `inline` only has
// something to say "before"; `block` says `start`/`end` at "before"/"after"
// — unless `ctx.contextualizationShapes` overrides this role to "inline"
// here, in which case it reads the same `inline` entry any inline-only
// role uses, not `block.start`.
export function pushRoleContextualization(
  out: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  node: GuidedNavigationObject,
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
    push(out, sources, node, entryUtterances(base, variantKey, params, node, role, ctx));
    return;
  }
  if (phase === "before") {
    push(out, sources, node, entryUtterances(`${role}.inline`, variantKey, params, node, role, ctx));
  }
}

const descriptionMarker = "\u0000";

// An entry holding the node's description in another primary language than the catalog's wraps it in a `<lang>`
// in SSML, and is split around it in plain text; in the same one, it's a single utterance in the description's tag.
function entryUtterances(
  base: string,
  variantKey: string | undefined,
  params: Record<string, string> | undefined,
  node: GuidedNavigationObject,
  role: string,
  ctx: WalkContext,
): ReadiumSpeechUtterance[] {
  const text = resolveEntryText(ctx, base, variantKey, params);
  if (!text) return [];
  const description = params?.description;
  const language =
    ctx.language !== "none" && description !== undefined && description === descriptionOf(node)
      ? languageFor(descriptionLanguageOf(node), ctx)
      : undefined;
  const parts = language ? resolveEntryText(ctx, base, variantKey, { ...params, description: descriptionMarker })?.split(descriptionMarker) : undefined;
  if (!language || !parts || parts.length < 2) {
    const utterance = formatEntryText(text, ctx);
    scopeToOwnValue(utterance, text, node, ctx, role, params);
    return [utterance];
  }
  if (extractLangRegionFromBCP47(language)[0] === extractLangRegionFromBCP47(ctx.contextualizationLanguage)[0]) {
    const utterance = formatEntryText(text, ctx);
    utterance.language = language;
    scopeToOwnValue(utterance, text, node, ctx, role, params);
    return [utterance];
  }
  const wrapped = `<lang xml:lang="${ssmlAttrEscape(language)}">${ssmlTextEscape(description!)}</lang>`;
  const ssml = parts.map((part) => ssmlTextEscape(part)).join(wrapped);
  if (ctx.format === "ssml") {
    const utterance = formatEntryText(text, ctx);
    utterance.ssml = ssml;
    scopeToOwnValue(utterance, text, node, ctx, role, params);
    return [utterance];
  }
  // Split like inline `<lang>` spans in content, punctuation closing the description staying with it.
  return splitOnLangTags(ssml, ctx.contextualizationLanguage).map((segment) => {
    if (segment.language !== language) return formatEntryText(segment.plain, ctx);
    const own = formatDescription(segment.plain, node, ctx);
    if (role === "figure" || role === "table") scopeToQuote(own, segment.plain, description!, node, ctx);
    return own;
  });
}

// Falls back to the bare number when the catalog has no `parts` entry.
export function resolvePluralPart(ctx: WalkContext, role: string, name: string, count: number): string {
  const key = `${role}.parts.${name}`;
  return ctx.i18n.exists(key, { count }) ? ctx.i18n.t(key, { count }) : String(count);
}

type ContextualizationParams = { variantKey?: string; params?: Record<string, string> };
type ContextualizationParamsProvider = (node: GuidedNavigationObject, ctx: WalkContext) => ContextualizationParams;

// Any node with a `description` gets `{{ description }}` interpolated,
// whatever its role, plus a labelled/unlabelled variant a catalog entry can opt into.
function genericDescriptionParams(node: GuidedNavigationObject): ContextualizationParams {
  const description = descriptionOf(node);
  if (description === undefined) return { variantKey: "unlabelled" };
  return { variantKey: "labelled", params: { description } };
}

function cellOrRowheaderParams(node: GuidedNavigationObject, ctx: WalkContext): ContextualizationParams {
  const header = ctx.tableCellHeaders.get(node);
  return {
    variantKey: header !== undefined ? "withHeader" : "withoutHeader",
    params: { header: header ?? "", value: plainTextOf(node) },
  };
}

// Structural data only computable by walking the table, for the roles that need it.
const builtInContextualizationParamProviders: Partial<Record<GndRole, ContextualizationParamsProvider>> = {
  table: (node, ctx) => {
    const rows = (node.children ?? []).filter((child) => child.role?.has("row"));
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
export function contextualizationParamsFor(role: string, node: GuidedNavigationObject, ctx: WalkContext): ContextualizationParams {
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
