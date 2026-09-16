import i18next, { type i18n } from "i18next";
import type { GndObject, GndRole } from "../gnd/types.js";
import { ssmlTextEscape } from "../gnd/text.js";
import { combineDomRangeTextrefs, decodeTextref, type DecodedTextref } from "../gnd/textrefFragment.js";
import type { LocatorOptions } from "../decorator/createLocator.js";
import type { ReadiumSpeechUtterance, UtteranceOffset } from "../utterance.js";
import { contextualizationsForLocale } from "./contextualizations.js";
import { stripLangTags } from "./language.js";
import { segmentSentences } from "./sentenceSegmenter.js";
import { splitSsmlAtSentences } from "./splitSsmlAtSentences.js";
import {
  hasLangTag,
  hasPlaceholder,
  resolveNodeText,
  splitOnLangTags,
  splitOnPlaceholders,
  stripSsmlTags,
  type ResolvedNodeText,
} from "./text.js";
import type {
  ContextualizationEntry,
  Contextualizations,
  ExtractionFormat,
  ExtractUtterancesOptions,
  LanguageMode,
  Segmentation,
} from "./types.js";
import {
  blockLevelRoles,
  roleDropOverrides,
  deferrablePlaceholderRoles,
  descriptionFoldingRoles,
  valueFoldingRoles,
  contentlessRoles,
} from "./roles.js";
import { isSinglePunctuationChar, startsWithBindingPunct } from "../utils/text.js";
import { computeTableStructure, plainTextOf } from "./tableStructure.js";

interface WalkContext {
  contextualizations: Contextualizations;
  // Backs only `resolvePluralPart()`'s `<role>.parts.<name>` lookups.
  i18n: i18n;
  skip: ReadonlySet<GndRole>;
  contextualize: ReadonlySet<GndRole>;
  // Per-role contextualization shape overrides for this call — see
  // `ExtractUtterancesOptions.contextualization.shapes`.
  contextualizationShapes: Partial<Record<GndRole, "inline" | "block">>;
  // See `ExtractUtterancesOptions.contextualization.params`.
  contextualizationParams?: (role: GndRole, node: GndObject) => Record<string, string> | undefined;
  format: ExtractionFormat;
  inlineContextualization: boolean;
  language?: LanguageMode;
  segmentation: Segmentation;
  segmentationSuppressions: Record<string, string[]>;
  // Tracked by object identity rather than threaded as a parallel array,
  // since utterances get merged/reordered across several local `out` arrays
  // (pieces, inner, ...) before reaching the caller's own `out`.
  blockStarts: Set<ReadiumSpeechUtterance>;
  // Populated from a table node the moment it's reached, then read back as
  // its rows/cells are walked — same identity-keyed, single-call-scoped
  // pattern as `blockStarts`.
  tableRowNumbers: Map<GndObject, number>;
  tableCellHeaders: Map<GndObject, string>;
  // Identity-keyed synthesized-label tracking, same reason as `blockStarts`.
  synthetic: Set<ReadiumSpeechUtterance>;
  // Every node's own ancestors (nearest first) — see `resolveNodeLocate()`.
  ancestorChains: Map<GndObject, GndObject[]>;
  // A language-split utterance's position in its source node's own text
  // (see `applyFormat`) — read back by `attachLocate()`, same identity-keyed pattern.
  pendingRange: Map<ReadiumSpeechUtterance, { start: number; end: number }>;
}

// Parallel to `out`: which node produced each utterance. A sentence
// reconstructed across sibling nodes carries a `[first, last]` tuple instead.
export type SourceTrace = (GndObject | [GndObject, GndObject] | undefined)[];

const blockLevelRoleSet: ReadonlySet<GndRole> = new Set(blockLevelRoles);
const deferrablePlaceholderRoleSet: ReadonlySet<GndRole> = new Set(deferrablePlaceholderRoles);
const descriptionFoldingRoleSet: ReadonlySet<GndRole> = new Set(descriptionFoldingRoles);
const valueFoldingRoleSet: ReadonlySet<GndRole> = new Set(valueFoldingRoles);
const contentlessRoleSet: ReadonlySet<GndRole> = new Set(contentlessRoles);

// `variantKey`, when given, picks a nested named-variant leaf (e.g.
// `audio.inline.labelled`); falls back to `base` itself when that specific
// variant isn't defined there (a plain-string entry like `table.block.end`
// ignores variantKey entirely, same as before).
function resolveEntryText(ctx: WalkContext, base: string, variantKey?: string, params?: Record<string, string>): string | undefined {
  const variantPath = variantKey ? `${base}.${variantKey}` : undefined;
  if (variantPath && ctx.i18n.exists(variantPath)) return ctx.i18n.t(variantPath, params);
  if (ctx.i18n.exists(base)) return ctx.i18n.t(base, params);
  return undefined;
}

// Contextualization/label text is always plain (no markup) — formats it
// per the requested `format`, same as any other utterance.
function formatPlain(text: string, ctx: WalkContext): ReadiumSpeechUtterance {
  const utterance: ReadiumSpeechUtterance = ctx.format === "ssml" ? { ssml: ssmlTextEscape(text) } : { plain: text };
  ctx.synthetic.add(utterance);
  return utterance;
}

function push(out: ReadiumSpeechUtterance[], sources: SourceTrace, node: SourceTrace[number], items: ReadiumSpeechUtterance[]): void {
  out.push(...items);
  for (let i = 0; i < items.length; i++) sources.push(node);
}

// Pushes `pieces` (or their `merged` replacement, if provided) to `out`.
// `mergeUtterances()` returns a new object rather than one of `pieces` —
// this carries a block-start marker over from any input piece that had
// one, so merging never silently drops it.
function pushPiecesOrMerged(
  out: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  ctx: WalkContext,
  node: GndObject,
  pieces: ReadiumSpeechUtterance[],
  pieceSources: SourceTrace,
  merged: ReadiumSpeechUtterance | undefined,
): void {
  if (merged) {
    if (pieces.some((piece) => ctx.blockStarts.has(piece))) ctx.blockStarts.add(merged);
    push(out, sources, pieceSources[0] ?? node, [merged]);
  } else {
    out.push(...pieces);
    sources.push(...pieceSources);
  }
}

function isRoleContextualized(role: string, ctx: WalkContext): boolean {
  // A data cell's header is structural table content, not a discretionary
  // narration a reader opts into — it always reuses the applicable header.
  if (valueFoldingRoleSet.has(role)) return true;
  return ctx.contextualize.has(role);
}

function isDroppedByAnotherRole(role: GndRole, roles: GndRole[], ctx: WalkContext): boolean {
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
function pushRoleContextualization(
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

function isSkipped(roles: GndRole[], skip: ReadonlySet<GndRole>): boolean {
  return skip.size > 0 && roles.some((role) => skip.has(role));
}

// Concatenates `parts`, skipping redundant lone punctuation and spacing
// pieces apart. `ranges[i]` is where `parts[i]` landed in `joined`.
function joinPieceTexts(parts: string[]): { joined: string; ranges: { start: number; end: number }[] } {
  let joined = "";
  const ranges: { start: number; end: number }[] = [];
  for (const part of parts) {
    if (part.length === 1 && isSinglePunctuationChar(part) && joined.endsWith(part)) {
      ranges.push({ start: joined.length, end: joined.length }); // redundant punctuation
      continue;
    }
    // Only synthesizes a joining space when the join would otherwise have
    // none at all — never adds a second one next to whitespace the pieces already carry.
    if (joined && !startsWithBindingPunct(part) && !/\s$/.test(joined) && !/^\s/.test(part)) joined += " ";
    const start = joined.length;
    joined += part;
    ranges.push({ start, end: joined.length });
  }
  return { joined, ranges };
}

// Joins pieces read as one continuous occurrence into a single utterance.
// Bails (`undefined`) on disagreeing `language`; synthesized if any piece was.
function mergeUtterances(
  pieces: ReadiumSpeechUtterance[],
  ctx: WalkContext,
): ReadiumSpeechUtterance | undefined {
  let language: string | undefined;
  let sawLanguage = false;
  const parts: string[] = [];
  for (const piece of pieces) {
    const text = ctx.format === "ssml" ? piece.ssml : piece.plain;
    if (!text) continue;
    parts.push(text);
    if (piece.language !== undefined) {
      if (sawLanguage && piece.language !== language) return undefined;
      language = piece.language;
      sawLanguage = true;
    }
  }
  if (parts.length === 0) return undefined;
  const { joined } = joinPieceTexts(parts);
  const merged: ReadiumSpeechUtterance = ctx.format === "ssml" ? { ssml: joined } : { plain: joined };
  if (language) merged.language = language;
  if (pieces.some((piece) => ctx.synthetic.has(piece))) ctx.synthetic.add(merged);
  return merged;
}

// A pagebreak's label merges into its "Pagebreak." contextualization as one
// utterance, with a synthesized trailing period.
function buildPagebreakUtterance(node: GndObject, ctx: WalkContext): ReadiumSpeechUtterance[] {
  const resolved = resolveNodeText(node.text);
  const own = resolved ? applyFormat(resolved, ctx.format, ctx.language, ctx) : [];
  if (!ctx.contextualize.has("pagebreak")) return own;
  const base = ctx.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline";
  const text = resolveEntryText(ctx, base);
  if (text === undefined) return own;
  const contextualization = formatPlain(text, ctx);
  if (own.length === 0) return [contextualization];
  const merged = mergeUtterances([contextualization, ...own], ctx);
  if (!merged) return [contextualization, ...own];
  if (merged.plain !== undefined) merged.plain += ".";
  if (merged.ssml !== undefined) merged.ssml += ".";
  return [merged];
}

// Applies the required `format` option to an already-resolved node text,
// synthesizing whichever field is missing: escaping `plain` into `ssml`
// with no markup, or stripping `ssml`'s tags down to `plain`. Then applies
// `language`, which only ever affects *this one node's own* inline `<lang>` spans:
//  - "always" or omitted: honored as declared — `ssml` keeps spans tagged
//    in one string; `plain` has no such markup, so it's split into one
//    utterance per language run instead (see `splitOnLangTags`).
//  - "block-level": ignore this node's own inline spans — unwrap any
//    `<lang>` tags in its `ssml`, merging their text into the surrounding
//    flow with no language of its own. Keeps this node's own `language`.
//  - "none": same unwrapping as "block-level", and additionally drops this
//    node's own `language` — the document is being treated as one
//    language throughout, so nothing gets tagged at all.
function applyFormat(
  resolved: ResolvedNodeText,
  format: ExtractionFormat,
  language: LanguageMode | undefined,
  ctx: WalkContext,
): ReadiumSpeechUtterance[] {
  if (format === "plain" && language !== "block-level" && language !== "none" && resolved.ssml && hasLangTag(resolved.ssml)) {
    return splitOnLangTags(resolved.ssml, resolved.language).map((segment) => {
      const utterance: ReadiumSpeechUtterance = { plain: segment.plain };
      if (segment.language) utterance.language = segment.language;
      ctx.pendingRange.set(utterance, { start: segment.start, end: segment.end });
      return utterance;
    });
  }

  const utterance: ReadiumSpeechUtterance = {};
  if (resolved.language) utterance.language = resolved.language;
  if (format === "ssml") {
    utterance.ssml = resolved.ssml ?? ssmlTextEscape(resolved.plain ?? "");
  } else {
    utterance.plain = resolved.plain ?? stripSsmlTags(resolved.ssml ?? "");
  }
  if (language === "block-level" || language === "none") {
    if (utterance.ssml) utterance.ssml = stripLangTags(utterance.ssml);
    if (language === "none") delete utterance.language;
  }
  return [utterance];
}

function isDeferrable(child: GndObject): boolean {
  return (child.role ?? []).some((role) => deferrablePlaceholderRoleSet.has(role));
}

// Splits the sentence on its placeholders, merging inline ones back into one
// utterance; deferred ones are returned for the caller to walk separately.
function emitWithPlaceholders(
  node: GndObject,
  rawSsml: string,
  out: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  ctx: WalkContext,
  suppress: boolean,
): GndObject[] {
  const language = typeof node.text === "object" ? node.text.language : undefined;
  const childrenById = new Map((node.children ?? []).map((child) => [child.id, child] as const));
  const pieces: ReadiumSpeechUtterance[] = [];
  const pieceSources: SourceTrace = [];
  const deferred: GndObject[] = [];
  for (const segment of splitOnPlaceholders(rawSsml)) {
    if (segment.placeholderId !== undefined) {
      const child = childrenById.get(segment.placeholderId);
      if (!child) continue;
      if (ctx.inlineContextualization || !isDeferrable(child)) {
        walkNode(child, pieces, pieceSources, ctx, suppress);
      } else {
        deferred.push(child);
      }
      continue;
    }
    if (!segment.ssml) continue;
    if (
      ctx.format === "plain" &&
      ctx.language !== "block-level" &&
      ctx.language !== "none" &&
      hasLangTag(segment.ssml)
    ) {
      for (const langSegment of splitOnLangTags(segment.ssml, language)) {
        const utterance: ReadiumSpeechUtterance = { plain: langSegment.plain };
        if (langSegment.language) utterance.language = langSegment.language;
        pieces.push(utterance);
        pieceSources.push(node);
      }
      continue;
    }
    const utterance: ReadiumSpeechUtterance = {};
    if (language) utterance.language = language;
    if (ctx.format === "ssml") utterance.ssml = segment.ssml;
    else utterance.plain = stripSsmlTags(segment.ssml);
    if (ctx.language === "block-level" || ctx.language === "none") {
      if (utterance.ssml) utterance.ssml = stripLangTags(utterance.ssml);
      if (ctx.language === "none") delete utterance.language;
    }
    pieces.push(utterance);
    pieceSources.push(node);
  }
  const merged = pieces.length > 1 ? mergeUtterances(pieces, ctx) : undefined;
  pushPiecesOrMerged(out, sources, ctx, node, pieces, pieceSources, merged);
  return deferred;
}

// Falls back to the bare number when the catalog has no `parts` entry.
function resolvePluralPart(ctx: WalkContext, role: string, name: string, count: number): string {
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
function contextualizationParamsFor(role: string, node: GndObject, ctx: WalkContext): ContextualizationParams {
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

function walkNode(node: GndObject, out: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext, suppress: boolean): void {
  const roles = node.role ?? [];
  if (isSkipped(roles, ctx.skip)) return;

  // A node carrying a block-level role opens a new block — unless
  // `suppress` says an ancestor already claimed this same boundary. That
  // happens when the ancestor is itself a block-level node reached with
  // nothing in between: nested containers with no content of their own
  // (e.g. a bare <blockquote> around a <p>) collapse onto whichever
  // descendant utterance turns out to be first; a container that *did*
  // speak something of its own (e.g. a contextualization)
  // claims the boundary itself and suppresses every nested block reached
  // through it, so entering deeply nested markup never stacks pauses.
  const isBlockRole = roles.some((role) => blockLevelRoleSet.has(role));
  const eligible = isBlockRole && !suppress;
  const beforeLength = out.length;

  // Footnote and pagebreak are handled specially below (merged with their
  // own content/label), so they're excluded from the generic loop here.
  const contextualizedRoles = roles.filter(
    (role) => role !== "footnote" && role !== "pagebreak" && !isDroppedByAnotherRole(role, roles, ctx),
  );

  // A description is supplementary/elaborating content (e.g. an extended
  // audio description) for most roles, spoken after the primary content —
  // but a table's description is its caption, which precedes the table in
  // the source and is announced before its rows to match. Either way this
  // is suppressed when a role that's actually firing already folded it
  // into its own announcement (e.g. "Table: Team roster. 3 lines...").
  const foldsDescription = roles.some((role) => descriptionFoldingRoleSet.has(role) && ctx.contextualize.has(role));
  const isTableCaption = roles.includes("table") && node.description !== undefined && !foldsDescription;
  if (isTableCaption) {
    push(out, sources, node, [formatPlain(node.description!, ctx)]);
  }

  // Every role this node carries gets looked up in the contextualization
  // catalog and its "before" half spoken now, whatever shape that entry
  // is (see `pushRoleContextualization` and `contextualizations.ts`) — a
  // no-op for the vast majority of roles, which have no entry at all.
  for (const role of contextualizedRoles) {
    // An unlabelled figure has nothing to say and doesn't announce at all
    // (its content still speaks normally) — the only role with this rule.
    if (role === "figure" && node.description === undefined) continue;
    const { variantKey, params } = contextualizationParamsFor(role, node, ctx);
    pushRoleContextualization(out, sources, node, ctx, role, "before", variantKey, params);
  }

  // A noteref's own visible text (e.g. "[1]") is a visual marker only,
  // never spoken. Its footnote target's contextualization and content are
  // pushed as separate utterances, same as any other block role, so the
  // note's real content stays its own (non-synthetic) utterance; any other
  // kind of child is walked as-is.
  if (roles.includes("noteref")) {
    for (const child of node.children ?? []) {
      const childRoles = child.role ?? [];
      if (isSkipped(childRoles, ctx.skip)) continue;
      if (childRoles.includes("footnote")) {
        const footnoteContextualized = ctx.contextualize.has("footnote");
        const footnoteBlock = ctx.i18n.exists("footnote.block.start") || ctx.i18n.exists("footnote.block.end");
        const childEligible =
          childRoles.some((role) => blockLevelRoleSet.has(role)) && !suppress && !ctx.inlineContextualization;
        const startText = footnoteContextualized ? resolveEntryText(ctx, footnoteBlock ? "footnote.block.start" : "footnote.inline") : undefined;
        const hasEntry = footnoteContextualized && (startText !== undefined || footnoteBlock);
        const pieces: ReadiumSpeechUtterance[] = [];
        const pieceSources: SourceTrace = [];
        if (startText !== undefined) {
          pieces.push(formatPlain(startText, ctx));
          pieceSources.push(child);
        }
        const inner: ReadiumSpeechUtterance[] = [];
        const innerSources: SourceTrace = [];
        // The child's own walk() would otherwise claim this same boundary on its first
        // content utterance instead of the start text pushed above.
        walk([child], inner, innerSources, ctx, suppress || childEligible);
        if (childEligible && inner.length > 0) ctx.blockStarts.add(inner[0]);
        pieces.push(...inner);
        pieceSources.push(...innerSources);
        if (hasEntry && footnoteBlock) {
          const endText = resolveEntryText(ctx, "footnote.block.end");
          if (endText !== undefined) {
            pieces.push(formatPlain(endText, ctx));
            pieceSources.push(child);
          }
        }
        const merged = hasEntry && pieces.length > 1 ? mergeUtterances(pieces, ctx) : undefined;
        pushPiecesOrMerged(out, sources, ctx, child, pieces, pieceSources, merged);
      } else {
        walk([child], out, sources, ctx, suppress);
      }
    }
  } else if (roles.some((role) => contentlessRoleSet.has(role))) {
    // Ignored entirely — see `contentlessRoles`.
  } else {
    const rawSsml = typeof node.text === "object" ? node.text.ssml : undefined;
    if (rawSsml && hasPlaceholder(rawSsml)) {
      const deferred = emitWithPlaceholders(node, rawSsml, out, sources, ctx, suppress);
      if (deferred.length > 0) {
        const childSuppress = suppress || (isBlockRole && out.length > beforeLength);
        walk(deferred, out, sources, ctx, childSuppress);
      }
    } else if (roles.includes("pagebreak")) {
      push(out, sources, node, buildPagebreakUtterance(node, ctx));
      if (node.children) {
        const childSuppress = suppress || (isBlockRole && out.length > beforeLength);
        walk(node.children, out, sources, ctx, childSuppress);
      }
    } else {
      const foldsValue = roles.some((role) => valueFoldingRoleSet.has(role) && isRoleContextualized(role, ctx));
      const resolved = foldsValue ? undefined : resolveNodeText(node.text);
      if (resolved) {
        push(out, sources, node, applyFormat(resolved, ctx.format, ctx.language, ctx));
      }
      if (node.children) {
        const childSuppress = suppress || (isBlockRole && out.length > beforeLength);
        walk(node.children, out, sources, ctx, childSuppress);
      }
    }
  }

  if (eligible && out.length > beforeLength) {
    ctx.blockStarts.add(out[beforeLength]);
  }

  if (node.description !== undefined && !foldsDescription && !isTableCaption) {
    push(out, sources, node, [formatPlain(node.description, ctx)]);
  }

  for (const role of contextualizedRoles) {
    if (role === "figure" && node.description === undefined) continue;
    const { variantKey, params } = contextualizationParamsFor(role, node, ctx);
    pushRoleContextualization(out, sources, node, ctx, role, "after", variantKey, params);
  }
}

// `suppress` only carries forward to the first node — once we move on to a
// sibling, whatever a prior sibling's subtree spoke has already broken any
// "nothing in between" chain, so each subsequent sibling is free to open
// its own boundary.
function walk(nodes: GndObject[], out: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext, suppress: boolean): void {
  nodes.forEach((node, index) => walkNode(node, out, sources, ctx, index === 0 ? suppress : false));
}

// Synchronous: resources are supplied inline, no backend plugin involved.
function makeContextualizer(locale: string, contextualizations: Contextualizations): i18n {
  const instance = i18next.createInstance();
  instance.init({
    lng: locale,
    resources: { [locale]: { translation: contextualizations } },
    interpolation: { escapeValue: false },
  });
  return instance;
}

// A caller's override can target any depth (e.g. just `table.block.start`),
// so entries merge key-by-key rather than replacing a role's whole catalog
// entry wholesale.
function mergeContextualizationEntry(base: ContextualizationEntry | undefined, override: ContextualizationEntry): ContextualizationEntry {
  if (typeof override === "string" || typeof base !== "object") return override;
  const merged: { [key: string]: ContextualizationEntry } = { ...base };
  for (const key of Object.keys(override)) {
    merged[key] = mergeContextualizationEntry(base[key], override[key]);
  }
  return merged;
}

function mergeContextualizations(base: Contextualizations, override: Contextualizations | undefined): Contextualizations {
  if (!override) return base;
  const merged = { ...base };
  for (const role of Object.keys(override) as GndRole[]) {
    merged[role] = mergeContextualizationEntry(base[role], override[role]);
  }
  return merged;
}

async function makeWalkContext(nodes: GndObject[], options: ExtractUtterancesOptions): Promise<WalkContext> {
  const locale = options.contextualizationLocale ?? "en";
  const contextualizations = mergeContextualizations(
    await contextualizationsForLocale(locale),
    options.contextualization?.contextualizations,
  );
  return {
    contextualizations,
    i18n: makeContextualizer(locale, contextualizations),
    skip: new Set(options.skip ?? []),
    contextualize: new Set(options.contextualize ?? []),
    contextualizationShapes: options.contextualization?.shapes ?? {},
    contextualizationParams: options.contextualization?.params,
    format: options.format ?? "plain",
    inlineContextualization: options.inlineContextualization ?? false,
    language: options.language ?? "block-level",
    segmentation: options.segmentation?.mode ?? "structure",
    segmentationSuppressions: options.segmentation?.suppressions ?? {},
    blockStarts: new Set(),
    tableRowNumbers: new Map(),
    tableCellHeaders: new Map(),
    synthetic: new Set(),
    ancestorChains: buildAncestorChains(nodes),
    pendingRange: new Map(),
  };
}

// Resolves a non-synthetic utterance into per-sentence fragments (`undefined`
// if there's only one), falling back to English when it has no language.
// `start`/`end` are positions in the node's own source text (the plain
// projection, even for SSML), not in the fragment's own text.
async function sentenceFragmentsOf(
  utterance: ReadiumSpeechUtterance,
  ctx: WalkContext,
): Promise<{ text: string; start: number; end: number }[] | undefined> {
  const language = utterance.language ?? "en";
  const customSuppressions = ctx.segmentationSuppressions[language];
  const sourceText = ctx.format === "ssml" ? utterance.ssml : utterance.plain;
  if (!sourceText) return undefined;
  const boundaries = await segmentSentences(language, plainOf(sourceText, ctx.format), customSuppressions);
  if (boundaries.length <= 1) return undefined;
  if (ctx.format !== "ssml") return boundaries;
  const ssmlFragments = await splitSsmlAtSentences(sourceText, language, customSuppressions);
  if (!ssmlFragments) return undefined;
  return boundaries.map((b, i) => ({ text: ssmlFragments[i], start: b.start, end: b.end }));
}

// A node with one of these roles never joins a reconstruction run — tabular/
// list/heading content is routinely punctuation-less without being prose.
// A bare, unroled node (e.g. a fixed-layout fragment) is deliberately NOT excluded.
const neverJoinRoles: ReadonlySet<GndRole> = new Set([
  "cell",
  "rowheader",
  "row",
  "table",
  "list",
  "listItem",
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6",
]);

function rolesOf(source: GndObject | [GndObject, GndObject] | undefined): GndRole[] {
  if (!source) return [];
  return (Array.isArray(source) ? source[1] : source).role ?? [];
}

// Whether `next` may join `prev`'s run for sentence-boundary detection —
// structural eligibility only; the segmenter itself (run against the whole
// run's joined text) decides where sentences actually fall.
function canExtendRun(
  prev: ReadiumSpeechUtterance,
  prevSource: SourceTrace[number],
  next: ReadiumSpeechUtterance,
  nextSource: SourceTrace[number],
  ctx: WalkContext,
): boolean {
  if (ctx.synthetic.has(prev) || ctx.synthetic.has(next)) return false;
  if (!prevSource || !nextSource) return false;
  const prevText = ctx.format === "ssml" ? prev.ssml : prev.plain;
  const nextText = ctx.format === "ssml" ? next.ssml : next.plain;
  if (!prevText || !nextText) return false;
  if ((prev.language ?? "en") !== (next.language ?? "en")) return false;
  if (rolesOf(prevSource).some((role) => neverJoinRoles.has(role))) return false;
  if (rolesOf(nextSource).some((role) => neverJoinRoles.has(role))) return false;
  return true;
}

// Strips SSML down to plain text the same way `splitSsmlAtSentences()` does
// internally — unlike `stripSsmlTags()`, must NOT collapse/trim whitespace, or offsets drift.
function plainOf(text: string, format: ExtractionFormat): string {
  if (format !== "ssml") return text;
  return text.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

// Anchors just `quoteText` within the node via a text-quote, since a
// character-offset domRange would need its internal text-node layout.
function subLocateFor(nodeRef: DecodedTextref, quoteText: string): LocatorOptions {
  const cssSelector = nodeRef.cssSelector ?? nodeRef.domRange?.start.cssSelector;
  return cssSelector ? { cssSelector, text: { highlight: quoteText } } : { ...nodeRef, text: { highlight: quoteText } };
}

// Splits one utterance on its own sentence boundaries — the original
// per-node behavior, reused for any piece that doesn't genuinely join its neighbor.
async function pushSplitSingle(
  utterance: ReadiumSpeechUtterance,
  source: SourceTrace[number],
  ctx: WalkContext,
  newOut: ReadiumSpeechUtterance[],
  newSources: SourceTrace,
): Promise<void> {
  const fragments = ctx.synthetic.has(utterance) ? undefined : await sentenceFragmentsOf(utterance, ctx);
  if (!fragments) {
    newOut.push(utterance);
    newSources.push(source);
    return;
  }
  const wasBlockStart = ctx.blockStarts.has(utterance);
  if (wasBlockStart) ctx.blockStarts.delete(utterance);
  const node = Array.isArray(source) ? undefined : source;
  const nodeRef = node ? resolveNodeLocate(node, ctx.ancestorChains) : undefined;
  fragments.forEach(({ text: fragment, start, end }, k) => {
    const split: ReadiumSpeechUtterance = { ...utterance, [ctx.format]: fragment };
    if (nodeRef) {
      const quoteText = ctx.format === "ssml" ? plainOf(fragment, ctx.format) : fragment;
      const locate = subLocateFor(nodeRef.ref, quoteText);
      split.locate = locate;
      split.offsets = [{ start, end, locate }];
    }
    if (wasBlockStart && k === 0) ctx.blockStarts.add(split);
    newOut.push(split);
    newSources.push(source);
  });
}

// Which piece index a position in a joined string falls in — a position
// exactly on a piece boundary (the separator) attributes to the earlier piece.
function pieceIndexAt(ranges: { start: number; end: number }[], pos: number): number {
  let idx = 0;
  while (idx < ranges.length - 1 && ranges[idx + 1].start <= pos) idx++;
  return idx;
}

// For each gap between consecutive pieces, whether a sentence boundary
// genuinely reaches into the next piece's own text, vs. merely absorbing the
// separator — which would otherwise make an unrelated final sentence look joined.
async function detectGenuineJoins(
  pieces: ReadiumSpeechUtterance[],
  ctx: WalkContext,
  language: string,
  suppressions: string[] | undefined,
): Promise<boolean[]> {
  const plainParts = pieces.map((piece) => plainOf((ctx.format === "ssml" ? piece.ssml : piece.plain)!, ctx.format));
  const { joined, ranges } = joinPieceTexts(plainParts);
  const boundaries = await segmentSentences(language, joined, suppressions);
  const joinedWithNext = new Array<boolean>(pieces.length - 1).fill(false);
  for (const boundary of boundaries) {
    const startIdx = pieceIndexAt(ranges, boundary.start);
    // Last real character, not the exclusive end — a trailing separator alone shouldn't count.
    const endIdx = boundary.end > boundary.start ? pieceIndexAt(ranges, boundary.end - 1) : startIdx;
    for (let k = startIdx; k < endIdx; k++) joinedWithNext[k] = true;
  }
  return joinedWithNext;
}

// `start`/`end` are positions in each contributing node's own source text.
// Always quote-scoped, so a consumer can relocate a piece within spoken text by content.
function buildJoinedOffsets(
  pieces: ReadiumSpeechUtterance[],
  pieceSources: GndObject[],
  ranges: { start: number; end: number }[],
  boundary: { start: number; end: number },
  startIdx: number,
  endIdx: number,
  ctx: WalkContext,
): UtteranceOffset[] {
  const offsets: UtteranceOffset[] = [];
  for (let k = startIdx; k <= endIdx; k++) {
    const nodeRef = resolveNodeLocate(pieceSources[k], ctx.ancestorChains);
    if (!nodeRef) continue;
    const pieceRange = ranges[k];
    const contribStart = Math.max(pieceRange.start, boundary.start);
    const contribEnd = Math.min(pieceRange.end, boundary.end);
    if (contribEnd <= contribStart) continue;
    const localStart = contribStart - pieceRange.start;
    const localEnd = contribEnd - pieceRange.start;
    const text = plainOf((ctx.format === "ssml" ? pieces[k].ssml : pieces[k].plain)!, ctx.format);
    const locate = subLocateFor(nodeRef.ref, text.slice(localStart, localEnd));
    offsets.push({ start: localStart, end: localEnd, locate });
  }
  return offsets;
}

// Resegments one merge group as its own self-contained text (so its final
// sentence has no trailing-separator artifact), mapping sentences back onto the piece(s) they span.
async function pushJoinedGroup(
  pieces: ReadiumSpeechUtterance[],
  pieceSources: GndObject[],
  ctx: WalkContext,
  newOut: ReadiumSpeechUtterance[],
  newSources: SourceTrace,
): Promise<void> {
  const language = pieces[0].language ?? "en";
  const suppressions = ctx.segmentationSuppressions[language];
  const plainParts = pieces.map((piece) => plainOf((ctx.format === "ssml" ? piece.ssml : piece.plain)!, ctx.format));
  const { joined: joinedPlain, ranges } = joinPieceTexts(plainParts);
  const boundaries = await segmentSentences(language, joinedPlain, suppressions);

  let ssmlFragments: string[] | undefined;
  let joinedSsml: string | undefined;
  if (ctx.format === "ssml") {
    joinedSsml = joinPieceTexts(pieces.map((piece) => piece.ssml!)).joined;
    ssmlFragments = boundaries.length > 1 ? await splitSsmlAtSentences(joinedSsml, language, suppressions) : undefined;
  }

  const effectiveBoundaries = boundaries.length > 0 ? boundaries : [{ text: joinedPlain, start: 0, end: joinedPlain.length }];

  effectiveBoundaries.forEach((boundary, k) => {
    const startIdx = pieceIndexAt(ranges, boundary.start);
    const endIdx = boundary.end > boundary.start ? pieceIndexAt(ranges, boundary.end - 1) : startIdx;
    const text = ctx.format === "ssml" ? (ssmlFragments ? ssmlFragments[k] : joinedSsml!) : boundary.text;
    const merged: ReadiumSpeechUtterance = { [ctx.format]: text };
    if (language) merged.language = language;
    const wasBlockStart = pieces.slice(startIdx, endIdx + 1).some((piece) => ctx.blockStarts.has(piece));
    if (wasBlockStart) ctx.blockStarts.add(merged);
    const offsets = buildJoinedOffsets(pieces, pieceSources, ranges, boundary, startIdx, endIdx, ctx);
    if (offsets.length > 0) merged.offsets = offsets;

    // Top-level `locate` is the whole first/last span, a convenience anchor
    // for consumers that don't need the per-element breakdown in `offsets`.
    const firstRef = resolveNodeLocate(pieceSources[startIdx], ctx.ancestorChains);
    let locate: LocatorOptions | undefined;
    if (startIdx !== endIdx) {
      const lastRef = resolveNodeLocate(pieceSources[endIdx], ctx.ancestorChains);
      locate = (firstRef && lastRef ? combineDomRangeTextrefs(firstRef.ref, lastRef.ref) : undefined) ?? preciseLocateFor(firstRef, text);
    } else {
      locate = preciseLocateFor(firstRef, text);
    }
    if (locate) merged.locate = locate;

    newOut.push(merged);
    newSources.push(startIdx === endIdx ? pieceSources[startIdx] : [pieceSources[startIdx], pieceSources[endIdx]]);
  });
}

// Expands a multi-sentence utterance into one per sentence, and reconstructs
// a sentence split across sibling GND nodes — only the piece boundaries a
// sentence genuinely reaches past get grouped and jointly resegmented.
async function splitIntoSentenceUtterances(
  out: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  ctx: WalkContext,
): Promise<{ out: ReadiumSpeechUtterance[]; sources: SourceTrace }> {
  if (ctx.segmentation !== "sentence") return { out, sources };
  const newOut: ReadiumSpeechUtterance[] = [];
  const newSources: SourceTrace = [];
  let i = 0;
  while (i < out.length) {
    let j = i;
    while (j + 1 < out.length && canExtendRun(out[j], sources[j], out[j + 1], sources[j + 1], ctx)) j++;
    if (j === i) {
      await pushSplitSingle(out[i], sources[i], ctx, newOut, newSources);
      i = j + 1;
      continue;
    }
    const pieces = out.slice(i, j + 1);
    const pieceSources = sources.slice(i, j + 1) as GndObject[];
    const language = pieces[0].language ?? "en";
    const joinedWithNext = await detectGenuineJoins(pieces, ctx, language, ctx.segmentationSuppressions[language]);
    let start = 0;
    for (let k = 0; k < pieces.length; k++) {
      if (k < pieces.length - 1 && joinedWithNext[k]) continue;
      if (start === k) {
        await pushSplitSingle(pieces[start], pieceSources[start], ctx, newOut, newSources);
      } else {
        await pushJoinedGroup(pieces.slice(start, k + 1), pieceSources.slice(start, k + 1), ctx, newOut, newSources);
      }
      start = k + 1;
    }
    i = j + 1;
  }
  return { out: newOut, sources: newSources };
}

/**
 * Extracts an ordered list of read-aloud utterances from a Guided
 * Navigation node tree, following the patterns documented at
 * https://github.com/readium/guided-navigation/tree/main/examples/read-aloud.
 *
 * Accepts `GndObject[]` (as returned by `parseMarkup()`, or `GndDocument.guided`)
 * rather than a wrapped document.
 */
export async function extractUtterances(
  nodes: GndObject[],
  options: ExtractUtterancesOptions,
): Promise<ReadiumSpeechUtterance[]> {
  const out: ReadiumSpeechUtterance[] = [];
  const sources: SourceTrace = [];
  const ctx = await makeWalkContext(nodes, options);
  walk(nodes, out, sources, ctx, false);
  const split = await splitIntoSentenceUtterances(out, sources, ctx);
  return attachLocate(split.out, split.sources, ctx);
}

/**
 * Same as `extractUtterances()`, plus `sources[i]`: the node that produced `utterances[i]`,
 * and `blockStarts[i]`: whether `utterances[i]` begins a new block-level element.
 */
export async function extractUtterancesWithSources(
  nodes: GndObject[],
  options: ExtractUtterancesOptions,
): Promise<{ utterances: ReadiumSpeechUtterance[]; sources: SourceTrace; blockStarts: boolean[] }> {
  const utterances: ReadiumSpeechUtterance[] = [];
  const sources: SourceTrace = [];
  const ctx = await makeWalkContext(nodes, options);
  walk(nodes, utterances, sources, ctx, false);
  const split = await splitIntoSentenceUtterances(utterances, sources, ctx);
  const blockStarts = split.out.map((utterance) => ctx.blockStarts.has(utterance));
  return { utterances: attachLocate(split.out, split.sources, ctx), sources: split.sources, blockStarts };
}

// Every node's own ancestors (nearest first), keyed by object identity —
// used by attachLocate() to fall back to an enclosing node's textref
// when the utterance's own source has none of its own (e.g. its text lives
// on an unroled child wrapping a link, whose own textref is that link's
// href, not a DOM locator — see textrefFragment.ts's decodeTextref()).
function buildAncestorChains(nodes: GndObject[], chain: GndObject[] = [], out = new Map<GndObject, GndObject[]>()): Map<GndObject, GndObject[]> {
  for (const node of nodes) {
    out.set(node, chain);
    if (node.children) buildAncestorChains(node.children, [node, ...chain], out);
  }
  return out;
}

// Decodes each utterance's source node textref (if any) into `locate`, for
// a consumer to spread straight into createLocator()/decorate() to drive DOM
// highlighting — see textrefFragment.ts. Falls back through enclosing
// ancestors (nearest first) when the source node itself has no locator of
// its own.
// Resolves one node's own locator, falling back through its ancestors
// (nearest first) when it has no textref of its own — `own: false` then,
// since the result describes that ancestor's whole extent, not just this node.
function resolveNodeLocate(node: GndObject, ancestorChains: Map<GndObject, GndObject[]>): { own: boolean; ref: DecodedTextref } | undefined {
  const ref = decodeTextref(node);
  if (ref) return { own: true, ref };
  for (const ancestor of ancestorChains.get(node) ?? []) {
    const ancestorRef = decodeTextref(ancestor);
    if (ancestorRef) return { own: false, ref: ancestorRef };
  }
  return undefined;
}

// A resolved locate is only safe to use bare when it's the node's own
// textref; an ancestor fallback describes a much larger extent, so it must
// be narrowed to `text` via a text-quote first (see subLocateFor).
function preciseLocateFor(resolved: { own: boolean; ref: DecodedTextref } | undefined, text: string): LocatorOptions | undefined {
  if (!resolved) return undefined;
  return resolved.own ? resolved.ref : subLocateFor(resolved.ref, text);
}

// Skips utterances already given `locate`/`offsets` by sentence splitting;
// resolves the rest, adding a trivial whole-text `offsets` for real content.
function attachLocate(
  utterances: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  ctx: WalkContext,
): ReadiumSpeechUtterance[] {
  const { ancestorChains } = ctx;
  // Several utterances can share one node (e.g. a language-split fragment)
  // — bare-reusing its locate for any of them would anchor the whole node.
  const nodeUseCount = new Map<GndObject, number>();
  for (const source of sources) {
    if (source && !Array.isArray(source)) nodeUseCount.set(source, (nodeUseCount.get(source) ?? 0) + 1);
  }
  return utterances.map((u, i) => {
    if (u.offsets) return u;
    const source = sources[i];
    const text = u.plain ?? u.ssml ?? "";
    if (Array.isArray(source)) {
      const [first, last] = source;
      const firstRef = resolveNodeLocate(first, ancestorChains);
      const lastRef = resolveNodeLocate(last, ancestorChains);
      const spanned = firstRef && lastRef ? combineDomRangeTextrefs(firstRef.ref, lastRef.ref) : undefined;
      const ref = spanned ?? preciseLocateFor(firstRef, text);
      return ref ? { ...u, locate: ref } : u;
    }
    const node = source;
    const resolved = node ? resolveNodeLocate(node, ancestorChains) : undefined;
    if (!resolved) return u;
    const result: ReadiumSpeechUtterance = { ...u, locate: resolved.ref };
    if (!ctx.synthetic.has(u)) {
      const range = ctx.pendingRange.get(u);
      const shared = range !== undefined || (node && (nodeUseCount.get(node) ?? 0) > 1);
      result.locate = resolved.own && !shared ? resolved.ref : subLocateFor(resolved.ref, text);
      result.offsets = [{ start: range?.start ?? 0, end: range?.end ?? text.length, locate: result.locate }];
    }
    return result;
  });
}
