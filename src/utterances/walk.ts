import type { GuidedNavigationObject } from "@readium/shared";
import type { GndRole } from "@readium/guided-navigation";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { languageFor, languageRuns, overrideLangTags, stripLangTags } from "./language.js";
import { descriptionOf, nodeRoles, spokenText } from "./nodeFields.js";
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
import { isPageNumber } from "./pageNumber.js";
import { formatDescription, formatEntryText, push, pushPiecesOrMerged } from "./utteranceOutput.js";
import {
  blockLevelRoleSet,
  contentlessRoleSet,
  descriptionFoldingRoleSet,
  inlineContextualizationRoleSet,
  valueFoldingRoleSet,
  type SourceTrace,
  type WalkContext,
} from "./walkContext.js";

// A role another one on the node drops (e.g. a footnote's `aside`) doesn't skip it.
function isSkipped(roles: GndRole[], ctx: WalkContext): boolean {
  return ctx.skip.size > 0 && roles.some((role) => ctx.skip.has(role) && !isDroppedByAnotherRole(role, roles, ctx));
}

// A bare page-number label is always spoken as "Page N", contextualized or not.
function buildPagebreakLabel(node: GuidedNavigationObject, ctx: WalkContext): ReadiumSpeechUtterance[] {
  const resolved = resolveNodeText(node.text);
  if (!resolved) return [];
  const label = resolved.plain ?? stripSsmlTags(resolved.ssml ?? "");
  if (isPageNumber(label)) {
    const text = resolveEntryText(ctx, "pagebreak.number", undefined, { number: label.trim() });
    if (text !== undefined) return [formatEntryText(text, ctx)];
  }
  return applyFormat(resolved, ctx.format, ctx.language, ctx);
}

function appendPeriod(utterance: ReadiumSpeechUtterance): void {
  if (utterance.plain !== undefined) utterance.plain += ".";
  if (utterance.ssml !== undefined) utterance.ssml += ".";
}

// A pagebreak's label merges into its "Pagebreak." contextualization as one
// utterance, with a synthesized trailing period, kept when the label can't merge (e.g. in another language).
function buildPagebreakUtterance(node: GuidedNavigationObject, ctx: WalkContext): ReadiumSpeechUtterance[] {
  const own = buildPagebreakLabel(node, ctx);
  if (!ctx.contextualize.has("pagebreak")) return own;
  const base = ctx.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline";
  const text = resolveEntryText(ctx, base);
  if (text === undefined) return own;
  const contextualization = formatEntryText(text, ctx);
  if (own.length === 0) return [contextualization];
  const merged = mergeUtterances([contextualization, ...own], [undefined, ...own.map(() => node)], ctx);
  if (!merged) {
    appendPeriod(own[own.length - 1]);
    return [contextualization, ...own];
  }
  appendPeriod(merged);
  return [merged];
}

function isDeferred(child: GuidedNavigationObject, ctx: WalkContext): boolean {
  return nodeRoles(child).some((role) => inlineContextualizationRoleSet.has(role) && !ctx.inlineContextualization.has(role));
}

// Splits the sentence on its placeholders, merging inline ones back into one
// utterance; deferred ones are returned for the caller to walk separately.
function emitWithPlaceholders(
  node: GuidedNavigationObject,
  rawSsml: string,
  out: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  ctx: WalkContext,
  suppress: boolean,
  isBlockRole: boolean,
): GuidedNavigationObject[] {
  const declaredLanguage = node.text?.language;
  const language = languageFor(declaredLanguage, ctx);
  const childrenById = new Map((node.children ?? []).map((child) => [child.id, child] as const));
  const pieces: ReadiumSpeechUtterance[] = [];
  const pieceSources: SourceTrace = [];
  const deferred: GuidedNavigationObject[] = [];
  const inserted = new Set<ReadiumSpeechUtterance>();
  const placedAfter = new Set<ReadiumSpeechUtterance>();
  const isSentence = ctx.segmentation === "sentence";
  for (const segment of splitOnPlaceholders(rawSsml)) {
    if (segment.placeholderId !== undefined) {
      const child = childrenById.get(segment.placeholderId);
      if (!child) continue;
      if (!isDeferred(child, ctx)) {
        const before = pieces.length;
        walkNode(child, pieces, pieceSources, ctx, suppress);
        if (nodeRoles(child).some((role) => inlineContextualizationRoleSet.has(role))) {
          pieces.slice(before).forEach((piece) => inserted.add(piece));
        }
      } else {
        deferred.push(child);
        // Walked in place for sentence segmentation to move after its sentence, same suppress as walk(deferred)
        if (isSentence) {
          const before = pieces.length;
          walkNode(child, pieces, pieceSources, ctx, deferred.length === 1 && (suppress || isBlockRole));
          pieces.slice(before).forEach((piece) => placedAfter.add(piece));
        }
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
      for (const langSegment of splitOnLangTags(segment.ssml, declaredLanguage)) {
        const utterance: ReadiumSpeechUtterance = { plain: langSegment.plain };
        const segmentLanguage = languageFor(langSegment.language, ctx);
        if (segmentLanguage) utterance.language = segmentLanguage;
        pieces.push(utterance);
        pieceSources.push(node);
      }
      continue;
    }
    const utterance: ReadiumSpeechUtterance = {};
    if (language) utterance.language = language;
    if (ctx.format === "ssml") utterance.ssml = overrideLangTags(segment.ssml, ctx.languageOverrides);
    else utterance.plain = stripSsmlTags(segment.ssml);
    if ((ctx.language === "block-level" || ctx.language === "none") && utterance.ssml) {
      utterance.ssml = stripLangTags(utterance.ssml);
    }
    pieces.push(utterance);
    pieceSources.push(node);
  }
  if (isSentence && deferred.length + inserted.size > 0) {
    pieces.forEach((piece) => {
      const placement = inserted.has(piece) ? "inline" : placedAfter.has(piece) ? "after" : undefined;
      ctx.placeholderPieces.set(piece, { node, placement });
    });
    pushPiecesOrMerged(out, sources, ctx, node, pieces, pieceSources, undefined);
    return [];
  }
  for (const [start, end] of languageRuns(pieces, ctx)) {
    const run = pieces.slice(start, end);
    const runSources = pieceSources.slice(start, end);
    const merged = run.length > 1 ? mergeUtterances(run, runSources, ctx) : undefined;
    pushPiecesOrMerged(out, sources, ctx, node, run, runSources, merged);
  }
  return deferred;
}

function walkNode(node: GuidedNavigationObject, out: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext, suppress: boolean): void {
  const roles = nodeRoles(node);
  const description = descriptionOf(node);
  if (isSkipped(roles, ctx)) return;

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
  const isTableCaption = roles.includes("table") && description !== undefined && !foldsDescription;
  if (isTableCaption) {
    const utterance = formatDescription(description!, node, ctx);
    scopeToQuote(utterance, description!, description!, node, ctx);
    push(out, sources, node, [utterance]);
  }

  // Every role this node carries gets looked up in the contextualization
  // catalog and its "before" half spoken now, whatever shape that entry
  // is (see `pushRoleContextualization` and `contextualizations.ts`) — a
  // no-op for the vast majority of roles, which have no entry at all.
  for (const role of contextualizedRoles) {
    // An unlabelled figure has nothing to say and doesn't announce at all
    // (its content still speaks normally) — the only role with this rule.
    if (role === "figure" && description === undefined) continue;
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
      const childRoles = nodeRoles(child);
      if (isSkipped(childRoles, ctx)) continue;
      if (childRoles.includes("footnote")) {
        const footnoteContextualized = ctx.contextualize.has("footnote");
        const footnoteBlock = ctx.i18n.exists("footnote.block.start") || ctx.i18n.exists("footnote.block.end");
        const childEligible =
          childRoles.some((role) => blockLevelRoleSet.has(role)) && !suppress && !ctx.inlineContextualization.has("noteref");
        const startText = footnoteContextualized ? resolveEntryText(ctx, footnoteBlock ? "footnote.block.start" : "footnote.inline") : undefined;
        const hasEntry = footnoteContextualized && (startText !== undefined || footnoteBlock);
        const pieces: ReadiumSpeechUtterance[] = [];
        const pieceSources: SourceTrace = [];
        if (startText !== undefined) {
          pieces.push(formatEntryText(startText, ctx));
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
            pieces.push(formatEntryText(endText, ctx));
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
    const rawSsml = spokenText(node)?.ssml;
    if (rawSsml && hasPlaceholder(rawSsml)) {
      const deferred = emitWithPlaceholders(node, rawSsml, out, sources, ctx, suppress, isBlockRole);
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
      const resolved = foldsValue ? undefined : resolveNodeText(spokenText(node));
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

  if (description !== undefined && !foldsDescription && !isTableCaption) {
    const utterance = formatDescription(description, node, ctx);
    // Only figure/table can fold real DOM text into description; other roles' is ARIA attribute text with no DOM location.
    if (roles.includes("figure")) scopeToQuote(utterance, description, description, node, ctx);
    push(out, sources, node, [utterance]);
  }

  for (const role of contextualizedRoles) {
    if (role === "figure" && description === undefined) continue;
    const { variantKey, params } = contextualizationParamsFor(role, node, ctx);
    pushRoleContextualization(out, sources, node, ctx, role, "after", variantKey, params);
  }
}

// `suppress` only carries forward to the first node — once we move on to a
// sibling, whatever a prior sibling's subtree spoke has already broken any
// "nothing in between" chain, so each subsequent sibling is free to open
// its own boundary.
export function walk(nodes: GuidedNavigationObject[], out: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext, suppress: boolean): void {
  nodes.forEach((node, index) => walkNode(node, out, sources, ctx, index === 0 ? suppress : false));
}
