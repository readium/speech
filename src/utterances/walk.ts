import type { GndObject, GndRole } from "../gnd/types.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { stripLangTags } from "./language.js";
import {
  hasLangTag,
  hasPlaceholder,
  resolveNodeText,
  splitOnLangTags,
  splitOnPlaceholders,
  stripSsmlTags,
} from "./text.js";
import {
  contextualizationParamsFor,
  isDroppedByAnotherRole,
  isRoleContextualized,
  pushRoleContextualization,
  resolveEntryText,
  scopeToQuote,
} from "./contextualization.js";
import { applyFormat, mergeUtterances } from "./mergeUtterances.js";
import { formatPlain, push, pushPiecesOrMerged } from "./utteranceOutput.js";
import {
  blockLevelRoleSet,
  contentlessRoleSet,
  deferrablePlaceholderRoleSet,
  descriptionFoldingRoleSet,
  valueFoldingRoleSet,
  type SourceTrace,
  type WalkContext,
} from "./walkContext.js";

function isSkipped(roles: GndRole[], skip: ReadonlySet<GndRole>): boolean {
  return skip.size > 0 && roles.some((role) => skip.has(role));
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
  const merged = mergeUtterances([contextualization, ...own], [undefined, ...own.map(() => node)], ctx);
  if (!merged) return [contextualization, ...own];
  if (merged.plain !== undefined) merged.plain += ".";
  if (merged.ssml !== undefined) merged.ssml += ".";
  return [merged];
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
  const merged = pieces.length > 1 ? mergeUtterances(pieces, pieceSources, ctx) : undefined;
  pushPiecesOrMerged(out, sources, ctx, node, pieces, pieceSources, merged);
  return deferred;
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
    const utterance = formatPlain(node.description!, ctx);
    scopeToQuote(utterance, node.description!, node.description!, node, ctx);
    push(out, sources, node, [utterance]);
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
        const merged = hasEntry && pieces.length > 1 ? mergeUtterances(pieces, pieceSources, ctx) : undefined;
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
    const utterance = formatPlain(node.description, ctx);
    // Only figure/table can fold real DOM text into description; other roles' is ARIA attribute text with no DOM location.
    if (roles.includes("figure")) scopeToQuote(utterance, node.description, node.description, node, ctx);
    push(out, sources, node, [utterance]);
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
export function walk(nodes: GndObject[], out: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext, suppress: boolean): void {
  nodes.forEach((node, index) => walkNode(node, out, sources, ctx, index === 0 ? suppress : false));
}
