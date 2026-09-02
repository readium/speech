import i18next, { type i18n } from "i18next";
import type { GndObject, GndRole } from "../gnd/types.js";
import { ssmlTextEscape } from "../gnd/text.js";
import { decodeTextref } from "../gnd/textrefFragment.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { contextualizationsForLocale } from "./contextualizations.js";
import { stripLangTags } from "./language.js";
import {
  hasLangTag,
  hasPlaceholder,
  resolveNodeText,
  splitOnLangTags,
  splitOnPlaceholders,
  stripSsmlTags,
  type ResolvedNodeText,
} from "./text.js";
import type { Contextualizations, ExtractUtterancesOptions } from "./types.js";
import { blockLevelRoles } from "./roles.js";
import { startsWithBindingPunct } from "../utils/text.js";
import { computeTableStructure, plainTextOf } from "./tableStructure.js";

interface WalkContext {
  contextualizations: Contextualizations;
  // Backs only `resolvePluralPart()`'s `<role>.parts.<name>` lookups.
  i18n: i18n;
  skip: ReadonlySet<GndRole>;
  contextualize: ReadonlySet<GndRole>;
  // Per-role contextualization shape overrides for this call — see
  // `ExtractUtterancesOptions.contextualizationShapes`.
  contextualizationShapes: Partial<Record<GndRole, "inline" | "block">>;
  format: "plain" | "ssml";
  inlineContextualization: boolean;
  language?: "none" | "block-level" | "always";
  // Tracked by object identity rather than threaded as a parallel array,
  // since utterances get merged/reordered across several local `out` arrays
  // (pieces, inner, ...) before reaching the caller's own `out`.
  blockStarts: Set<ReadiumSpeechUtterance>;
  // Populated from a table node the moment it's reached, then read back as
  // its rows/cells are walked — same identity-keyed, single-call-scoped
  // pattern as `blockStarts`.
  tableRowNumbers: Map<GndObject, number>;
  tableCellHeaders: Map<GndObject, string>;
}

// Parallel to `out`: which node produced each utterance, `undefined` when none (e.g. a merged span).
type SourceTrace = (GndObject | undefined)[];

const blockLevelRoleSet: ReadonlySet<GndRole> = new Set(blockLevelRoles);

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
function formatPlain(text: string, format: "plain" | "ssml"): ReadiumSpeechUtterance {
  return format === "ssml" ? { ssml: ssmlTextEscape(text) } : { plain: text };
}

function push(out: ReadiumSpeechUtterance[], sources: SourceTrace, node: GndObject | undefined, items: ReadiumSpeechUtterance[]): void {
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

// roles.md defines rowheader/columnheader in terms of "cell" itself
// ("the header cell for a row/column") — they're specializations of
// cell, not siblings of it. Requesting `cell` contextualization must
// therefore also reach header cells; the reverse doesn't hold; requesting
// header contextualization specifically doesn't broaden to plain cells.
const cellGeneralizingRoles: ReadonlySet<string> = new Set(["rowheader", "columnheader"]);

function isRoleContextualized(role: string, ctx: WalkContext): boolean {
  if (ctx.contextualize.has(role)) return true;
  return cellGeneralizingRoles.has(role) && ctx.contextualize.has("cell");
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
    if (text) push(out, sources, node, [formatPlain(text, ctx.format)]);
    return;
  }
  if (phase === "before") {
    const text = resolveEntryText(ctx, `${role}.inline`, variantKey, params);
    if (text) push(out, sources, node, [formatPlain(text, ctx.format)]);
  }
}

function isSkipped(roles: GndRole[], skip: ReadonlySet<GndRole>): boolean {
  return skip.size > 0 && roles.some((role) => skip.has(role));
}

// Joins pieces read as one continuous occurrence into a single utterance.
// Bails out (returns `undefined`) if they don't all agree on one `language`.
function mergeUtterances(
  pieces: ReadiumSpeechUtterance[],
  format: "plain" | "ssml",
): ReadiumSpeechUtterance | undefined {
  let language: string | undefined;
  let sawLanguage = false;
  const parts: string[] = [];
  for (const piece of pieces) {
    const text = format === "ssml" ? piece.ssml : piece.plain;
    if (!text) continue;
    parts.push(text);
    if (piece.language !== undefined) {
      if (sawLanguage && piece.language !== language) return undefined;
      language = piece.language;
      sawLanguage = true;
    }
  }
  if (parts.length === 0) return undefined;
  let joined = "";
  for (const part of parts) {
    if (part.length === 1 && joined.endsWith(part)) continue; // redundant punctuation
    if (joined && !startsWithBindingPunct(part)) joined += " ";
    joined += part;
  }
  const merged: ReadiumSpeechUtterance = format === "ssml" ? { ssml: joined } : { plain: joined };
  if (language) merged.language = language;
  return merged;
}

// A pagebreak's label merges into its "Pagebreak." contextualization as one
// utterance, with a synthesized trailing period.
function buildPagebreakUtterance(node: GndObject, ctx: WalkContext): ReadiumSpeechUtterance[] {
  const resolved = resolveNodeText(node.text);
  const own = resolved ? applyFormat(resolved, ctx.format, ctx.language) : [];
  if (!ctx.contextualize.has("pagebreak")) return own;
  const base = ctx.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline";
  const text = resolveEntryText(ctx, base);
  if (text === undefined) return own;
  const contextualization = formatPlain(text, ctx.format);
  if (own.length === 0) return [contextualization];
  const merged = mergeUtterances([contextualization, ...own], ctx.format);
  if (!merged) return [contextualization, ...own];
  if (merged.plain !== undefined) merged.plain += ".";
  if (merged.ssml !== undefined) merged.ssml += ".";
  return [merged];
}

// Applies the required `format` option to an already-resolved node text,
// synthesizing whichever field is missing: escaping `plain` into `ssml`
// with no markup, or stripping `ssml`'s tags down to `plain`. Then applies
// `language` — which only ever affects *this one node's own* inline
// `<lang>` spans (never merges across sibling nodes, which each already
// have their own separate utterance and stay that way regardless):
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
  format: "plain" | "ssml",
  language: "none" | "block-level" | "always" | undefined,
): ReadiumSpeechUtterance[] {
  if (format === "plain" && language !== "block-level" && language !== "none" && resolved.ssml && hasLangTag(resolved.ssml)) {
    return splitOnLangTags(resolved.ssml, resolved.language).map((segment) => {
      const utterance: ReadiumSpeechUtterance = { plain: segment.plain };
      if (segment.language) utterance.language = segment.language;
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

// `inlineContextualization`: splits the sentence on its embedded placeholder,
// then merges the fragments and the referenced node's own utterance back
// into one continuous utterance.
function emitInterrupted(
  node: GndObject,
  rawSsml: string,
  out: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  ctx: WalkContext,
  suppress: boolean,
): void {
  const language = typeof node.text === "object" ? node.text.language : undefined;
  const childrenById = new Map((node.children ?? []).map((child) => [child.id, child] as const));
  const pieces: ReadiumSpeechUtterance[] = [];
  const pieceSources: SourceTrace = [];
  for (const segment of splitOnPlaceholders(rawSsml)) {
    if (segment.placeholderId !== undefined) {
      const child = childrenById.get(segment.placeholderId);
      if (child) walkNode(child, pieces, pieceSources, ctx, suppress);
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
  const merged = pieces.length > 1 ? mergeUtterances(pieces, ctx.format) : undefined;
  pushPiecesOrMerged(out, sources, ctx, node, pieces, pieceSources, merged);
}

// audio/video/image/math fold `node.description` into a labelled/unlabelled
// variant of their own announcement; figure and table fold it into their
// own template too (see the `figure` check in `walkNode()`'s
// contextualization loop for the no-description case). `cover` reuses the
// same labelled/unlabelled treatment as `image`.
const labelVariantRoles: ReadonlySet<string> = new Set(["audio", "video", "image", "math", "cover"]);
const descriptionFoldingRoles: ReadonlySet<string> = new Set(["audio", "video", "image", "figure", "math", "table", "cover"]);

// cell/rowheader's own contextualization template already embeds the
// cell's text (`{{ value }}`, with or without a `{{ header }}` prefix) —
// so once it fires, the node's own text must not also be spoken, or the
// value is heard twice.
const valueFoldingRoles: ReadonlySet<string> = new Set(["cell", "rowheader"]);

// Roles whose subtree carries no content worth speaking, whatever markup an
// author put inside it — only the role's own contextualization, if
// requested, is ever heard.
const contentlessRoles: ReadonlySet<string> = new Set(["separator"]);

// Falls back to the bare number when the catalog has no `parts` entry.
function resolvePluralPart(ctx: WalkContext, role: string, name: string, count: number): string {
  const key = `${role}.parts.${name}`;
  return ctx.i18n.exists(key, { count }) ? ctx.i18n.t(key, { count }) : String(count);
}

function contextualizationParamsFor(role: string, node: GndObject, ctx: WalkContext): { variantKey?: string; params?: Record<string, string> } {
  if (labelVariantRoles.has(role)) {
    return {
      variantKey: node.description !== undefined ? "labelled" : "unlabelled",
      params: { description: node.description ?? "" },
    };
  }
  if (role === "figure") {
    return { params: { description: node.description ?? "" } };
  }
  if (role === "table") {
    const structure = computeTableStructure(node.children ?? []);
    for (const [row, count] of structure.rowNumbers) ctx.tableRowNumbers.set(row, count);
    for (const [cell, header] of structure.cellHeaders) ctx.tableCellHeaders.set(cell, header);
    return {
      variantKey: node.description !== undefined ? "labelled" : "unlabelled",
      params: {
        description: node.description ?? "",
        lines: resolvePluralPart(ctx, "table", "lines", structure.lines),
        columns: resolvePluralPart(ctx, "table", "columns", structure.columns),
      },
    };
  }
  if (role === "row") {
    return { params: { count: String(ctx.tableRowNumbers.get(node) ?? "") } };
  }
  if (role === "cell" || role === "rowheader") {
    const header = ctx.tableCellHeaders.get(node);
    return {
      variantKey: header !== undefined ? "withHeader" : "withoutHeader",
      params: { header: header ?? "", value: plainTextOf(node) },
    };
  }
  return {};
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
  // `cover` takes priority over `image` when a node carries both.
  const isFootnoteNode = roles.includes("footnote");
  const hasCover = roles.includes("cover");
  const contextualizedRoles = roles.filter(
    (role) =>
      !(isFootnoteNode && (role === "footnote" || role === "aside")) &&
      role !== "pagebreak" &&
      !(hasCover && role === "image"),
  );

  // A description is supplementary/elaborating content (e.g. an extended
  // audio description) for most roles, spoken after the primary content —
  // but a table's description is its caption, which precedes the table in
  // the source and is announced before its rows to match. Either way this
  // is suppressed when a role that's actually firing already folded it
  // into its own announcement (e.g. "Table: Team roster. 3 lines...").
  const foldsDescription = roles.some((role) => descriptionFoldingRoles.has(role) && ctx.contextualize.has(role));
  const isTableCaption = roles.includes("table") && node.description !== undefined && !foldsDescription;
  if (isTableCaption) {
    push(out, sources, node, [formatPlain(node.description!, ctx.format)]);
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
  // never spoken. Its footnote target's contextualizations and content
  // merge into one utterance; any other kind of child is walked as-is.
  if (roles.includes("noteref")) {
    for (const child of node.children ?? []) {
      const childRoles = child.role ?? [];
      if (isSkipped(childRoles, ctx.skip)) continue;
      if (childRoles.includes("footnote")) {
        const inner: ReadiumSpeechUtterance[] = [];
        const innerSources: SourceTrace = [];
        walk([child], inner, innerSources, ctx, suppress);
        const footnoteContextualized = ctx.contextualize.has("footnote");
        const footnoteBlock = ctx.i18n.exists("footnote.block.start") || ctx.i18n.exists("footnote.block.end");
        const startText = footnoteContextualized ? resolveEntryText(ctx, footnoteBlock ? "footnote.block.start" : "footnote.inline") : undefined;
        const hasEntry = footnoteContextualized && (startText !== undefined || footnoteBlock);
        const pieces: ReadiumSpeechUtterance[] = [];
        const pieceSources: SourceTrace = [];
        if (startText !== undefined) {
          pieces.push(formatPlain(startText, ctx.format));
          pieceSources.push(child);
        }
        pieces.push(...inner);
        pieceSources.push(...innerSources);
        if (hasEntry && footnoteBlock) {
          const endText = resolveEntryText(ctx, "footnote.block.end");
          if (endText !== undefined) {
            pieces.push(formatPlain(endText, ctx.format));
            pieceSources.push(child);
          }
        }
        const merged = hasEntry && pieces.length > 1 ? mergeUtterances(pieces, ctx.format) : undefined;
        pushPiecesOrMerged(out, sources, ctx, child, pieces, pieceSources, merged);
      } else {
        walk([child], out, sources, ctx, suppress);
      }
    }
  } else if (roles.some((role) => contentlessRoles.has(role))) {
    // Ignored entirely — see `contentlessRoles`.
  } else {
    const rawSsml = typeof node.text === "object" ? node.text.ssml : undefined;
    if (ctx.inlineContextualization && rawSsml && hasPlaceholder(rawSsml)) {
      emitInterrupted(node, rawSsml, out, sources, ctx, suppress);
    } else if (roles.includes("pagebreak")) {
      push(out, sources, node, buildPagebreakUtterance(node, ctx));
      if (node.children) {
        const childSuppress = suppress || (isBlockRole && out.length > beforeLength);
        walk(node.children, out, sources, ctx, childSuppress);
      }
    } else {
      const foldsValue = roles.some((role) => valueFoldingRoles.has(role) && isRoleContextualized(role, ctx));
      const resolved = foldsValue ? undefined : resolveNodeText(node.text);
      if (resolved) {
        push(out, sources, node, applyFormat(resolved, ctx.format, ctx.language));
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
    push(out, sources, node, [formatPlain(node.description, ctx.format)]);
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

function makeWalkContext(options: ExtractUtterancesOptions): WalkContext {
  const locale = options.contextualizationLocale ?? "en";
  const contextualizations = { ...contextualizationsForLocale(locale), ...options.contextualizations };
  return {
    contextualizations,
    i18n: makeContextualizer(locale, contextualizations),
    skip: new Set(options.skip ?? []),
    contextualize: new Set(options.contextualize ?? []),
    contextualizationShapes: options.contextualizationShapes ?? {},
    format: options.format ?? "plain",
    inlineContextualization: options.inlineContextualization ?? false,
    language: options.language,
    blockStarts: new Set(),
    tableRowNumbers: new Map(),
    tableCellHeaders: new Map(),
  };
}

/**
 * Extracts an ordered list of read-aloud utterances from a Guided
 * Navigation node tree, following the patterns documented at
 * https://github.com/readium/guided-navigation/tree/main/examples/read-aloud.
 *
 * Accepts `GndObject[]` (as returned by `parseMarkup()`, or `GndDocument.guided`)
 * rather than a wrapped document.
 */
export function extractUtterances(
  nodes: GndObject[],
  options: ExtractUtterancesOptions,
): ReadiumSpeechUtterance[] {
  const out: ReadiumSpeechUtterance[] = [];
  const sources: SourceTrace = [];
  walk(nodes, out, sources, makeWalkContext(options), false);
  return attachLocate(out, sources, buildAncestorChains(nodes));
}

/**
 * Same as `extractUtterances()`, plus `sources[i]`: the node that produced `utterances[i]`,
 * and `blockStarts[i]`: whether `utterances[i]` begins a new block-level element.
 */
export function extractUtterancesWithSources(
  nodes: GndObject[],
  options: ExtractUtterancesOptions,
): { utterances: ReadiumSpeechUtterance[]; sources: (GndObject | undefined)[]; blockStarts: boolean[] } {
  const utterances: ReadiumSpeechUtterance[] = [];
  const sources: SourceTrace = [];
  const ctx = makeWalkContext(options);
  walk(nodes, utterances, sources, ctx, false);
  const blockStarts = utterances.map((utterance) => ctx.blockStarts.has(utterance));
  return { utterances: attachLocate(utterances, sources, buildAncestorChains(nodes)), sources, blockStarts };
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
function attachLocate(
  utterances: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  ancestorChains: Map<GndObject, GndObject[]>,
): ReadiumSpeechUtterance[] {
  return utterances.map((u, i) => {
    const node = sources[i];
    let ref = decodeTextref(node);
    if (!ref && node) {
      for (const ancestor of ancestorChains.get(node) ?? []) {
        ref = decodeTextref(ancestor);
        if (ref) break;
      }
    }
    return ref ? { ...u, locate: ref } : u;
  });
}
