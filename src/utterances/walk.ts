import type { GuidedNavigationObject } from "@readium/shared";
import type { GndRole } from "@readium/guided-navigation";
import type { Interruption } from "./types.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { languageFor, languageRuns, overrideLangTags, stripLangTags } from "./language.js";
import { descriptionOf, nodeRoles, spokenText } from "./nodeFields.js";
import {
  hasLangTag,
  hasPlaceholder,
  resolveNodeText,
  splitOnLangTags,
  splitOnPlaceholders,
  type SsmlSegment,
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
import { resolveNodeLocate, subLocateFor } from "./locate.js";
import { markNonQuotable } from "./boundaryLocate.js";
import { isPageNumber } from "./pageNumber.js";
import { formatDescription, formatEntryText, push, pushPiecesOrMerged } from "./utteranceOutput.js";
import {
  blockLevelRoleSet,
  contentlessRoleSet,
  descriptionFoldingRoleSet,
  interruptionRoleSet,
  textReferenceRoleSet,
  valueFoldingRoleSet,
  type SourceTrace,
  type WalkContext,
} from "./walkContext.js";

// A role another one on the node drops (e.g. a footnote's `aside`) doesn't skip it,
// nor does a role `interruptions` controls instead.
function isSkipped(roles: GndRole[], ctx: WalkContext): boolean {
  return (
    ctx.skip.size > 0 &&
    roles.some((role) => ctx.skip.has(role) && !interruptionRoleSet.has(role) && !isDroppedByAnotherRole(role, roles, ctx))
  );
}

// The `interruptions` setting of a node's interruption role, undefined when it has none.
function interruptionOf(roles: GndRole[], ctx: WalkContext): Interruption | undefined {
  const role = roles.find((r) => interruptionRoleSet.has(r));
  return role === undefined ? undefined : (ctx.interruptions[role] ?? "after");
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

// A reference's own text, as read in place in its sentence.
function textReferenceText(ref: GuidedNavigationObject, ctx: WalkContext): ReadiumSpeechUtterance[] {
  const resolved = resolveNodeText(spokenText(ref));
  return resolved ? applyFormat(resolved, ctx.format, ctx.language, ctx) : [];
}

const termMarker = "\u0001";
const valueMarker = "\u0002";

function holdsTerm(node: GuidedNavigationObject): boolean {
  return nodeRoles(node).includes("term") || (node.children ?? []).some(holdsTerm);
}

// Targets whose own contextualization a text reference's announcement or template already says.
const announcedTargets = new Set<GuidedNavigationObject>();

function termPath(node: GuidedNavigationObject): GuidedNavigationObject[] {
  if (!holdsTerm(node)) return [];
  return [node, ...(node.children ?? []).flatMap(termPath)];
}

// A text reference's targets, as one utterance: its `<role>.inline` contextualization, then the targets,
// a glossary term among them worded once deferred through `<role>.term` (e.g. "{{ term }}: {{ value }}").
// Read in place, the term is skipped, the reference's own text just read being it.
function pushTextReferenceTargets(
  ref: GuidedNavigationObject,
  targets: GuidedNavigationObject[],
  out: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  ctx: WalkContext,
  suppress: boolean,
  deferred: boolean,
): void {
  if (targets.length === 0) return;
  const role = nodeRoles(ref).find((r) => textReferenceRoleSet.has(r));
  const term = targets.length > 1 ? targets.find(holdsTerm) : undefined;
  const values = targets.filter((target) => target !== term);
  const contextualization = role && ctx.contextualize.has(role) ? resolveEntryText(ctx, `${role}.inline`) : undefined;
  const template =
    role && deferred && term ? resolveEntryText(ctx, `${role}.term`, undefined, { term: termMarker, value: valueMarker }) : undefined;
  const walked = template ? targets : values;
  if (contextualization === undefined && !template) {
    walk(walked, out, sources, ctx, suppress);
    return;
  }
  const eligible = nodeRoles(walked[0]).some((r) => blockLevelRoleSet.has(r)) && !suppress;
  const pieces: ReadiumSpeechUtterance[] = [];
  const pieceSources: SourceTrace = [];
  if (contextualization !== undefined) {
    pieces.push(formatEntryText(contextualization, ctx));
    pieceSources.push(ref);
  }
  // Their own walk would otherwise claim the block boundary instead of this utterance's start.
  const walkSuppress = suppress || eligible;
  const announced = [...walked, ...(term ? termPath(term) : [])];
  announced.forEach((node) => announcedTargets.add(node));
  for (const part of (template ?? valueMarker).split(new RegExp(`(${termMarker}|${valueMarker})`))) {
    if (part === termMarker) walk([term!], pieces, pieceSources, ctx, walkSuppress);
    else if (part === valueMarker) walk(values, pieces, pieceSources, ctx, walkSuppress);
    else if (part) {
      pieces.push(formatEntryText(part, ctx));
      pieceSources.push(ref);
    }
  }
  announced.forEach((node) => announcedTargets.delete(node));
  if (eligible && pieces.length > 0) ctx.blockStarts.add(pieces[0]);
  const merged = pieces.length > 1 ? mergeUtterances(pieces, pieceSources, ctx) : undefined;
  pushPiecesOrMerged(out, sources, ctx, ref, pieces, pieceSources, merged);
}

// A deferred interruption: a node, or a text reference's targets.
type Deferred = { node: GuidedNavigationObject } | { ref: GuidedNavigationObject; targets: GuidedNavigationObject[] };

// Walks deferred interruptions like `walk()` walks siblings.
function walkDeferred(deferred: Deferred[], out: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext, suppress: boolean): void {
  deferred.forEach((entry, index) => {
    const own = index === 0 ? suppress : false;
    if ("ref" in entry) pushTextReferenceTargets(entry.ref, entry.targets, out, sources, ctx, own, true);
    else walkNode(entry.node, out, sources, ctx, own);
  });
}

function isDeferred(child: GuidedNavigationObject, ctx: WalkContext): boolean {
  const interruption = interruptionOf(nodeRoles(child), ctx);
  return interruption !== undefined && interruption !== "inline";
}

// An alias isn't on the page, so it's located on its abbreviation instead.
function locateOnAbbreviation(aliasPieces: ReadiumSpeechUtterance[], abbreviationSsml: string, node: GuidedNavigationObject, ctx: WalkContext): void {
  const nodeRef = resolveNodeLocate(node, ctx.ancestorChains);
  if (!nodeRef) return;
  const locate = markNonQuotable(subLocateFor(nodeRef.ref, stripSsmlTags(abbreviationSsml)));
  for (const piece of aliasPieces) {
    const text = ctx.format === "ssml" ? piece.ssml : piece.plain;
    piece.locate = locate;
    piece.offsets = [{ start: 0, end: text?.length ?? 0, locate }];
    ctx.edgeSubstitutedLocate.set(piece, { leading: locate, trailing: locate });
  }
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
): Deferred[] {
  const declaredLanguage = node.text?.language;
  const language = languageFor(declaredLanguage, ctx);
  const childrenById = new Map((node.children ?? []).map((child) => [child.id, child] as const));
  const pieces: ReadiumSpeechUtterance[] = [];
  const pieceSources: SourceTrace = [];
  const deferred: Deferred[] = [];
  const inserted = new Set<ReadiumSpeechUtterance>();
  const placedAfter = new Set<ReadiumSpeechUtterance>();
  const isSentence = ctx.segmentation === "sentence";
  const abbreviationSkipped = ctx.interruptions.abbreviation === "never";
  const abbreviationInline = ctx.interruptions.abbreviation === "inline";
  // An alias's pieces, pushed since `before`, stay in their sentence like an inline placeholder.
  const placeAlias = (segment: SsmlSegment, before: number) => {
    if (segment.abbreviation !== "alias") return;
    const aliasPieces = pieces.slice(before);
    locateOnAbbreviation(aliasPieces, segment.abbreviationText!, node, ctx);
    aliasPieces.forEach((piece) => inserted.add(piece));
  };
  for (let segment of splitOnPlaceholders(rawSsml)) {
    if (segment.abbreviation && (segment.abbreviation === "text" ? abbreviationInline : abbreviationSkipped)) continue;
    if (segment.abbreviation === "alias" && !abbreviationInline) segment = { ...segment, ssml: segment.parenthesizedSsml };
    if (segment.placeholderId !== undefined) {
      const child = childrenById.get(segment.placeholderId);
      if (!child) continue;
      if (!isDeferred(child, ctx)) {
        const before = pieces.length;
        walkNode(child, pieces, pieceSources, ctx, suppress);
        if (nodeRoles(child).some((role) => interruptionRoleSet.has(role))) {
          pieces.slice(before).forEach((piece) => inserted.add(piece));
        }
      } else {
        const childRoles = nodeRoles(child);
        const isTextReference = childRoles.some((role) => textReferenceRoleSet.has(role));
        if (isTextReference) {
          for (const piece of textReferenceText(child, ctx)) {
            pieces.push(piece);
            pieceSources.push(child);
          }
        }
        const targets: Deferred[] = !isTextReference
          ? [{ node: child }]
          : interruptionOf(childRoles, ctx) === "never" || !child.children?.length
            ? []
            : [{ ref: child, targets: child.children }];
        for (const entry of targets) {
          deferred.push(entry);
          // Walked in place for sentence segmentation to move after its sentence, same suppress as walkDeferred()
          if (isSentence) {
            const before = pieces.length;
            walkDeferred([entry], pieces, pieceSources, ctx, deferred.length === 1 && (suppress || isBlockRole));
            pieces.slice(before).forEach((piece) => placedAfter.add(piece));
          }
        }
      }
      continue;
    }
    if (!segment.ssml) continue;
    const before = pieces.length;
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
      placeAlias(segment, before);
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
    placeAlias(segment, before);
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
  // A text reference read "never" keeps its own text, without its embedded target.
  const never = interruptionOf(roles, ctx) === "never";
  const skipsTarget = never && roles.some((role) => textReferenceRoleSet.has(role));
  if (isSkipped(roles, ctx) || (never && !skipsTarget)) return;

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
  // own content/label), text references with their deferred target, so they're excluded from the generic loop here.
  const contextualizedRoles = announcedTargets.has(node)
    ? []
    : roles.filter(
        (role) =>
          role !== "footnote" && role !== "pagebreak" && !textReferenceRoleSet.has(role) && !isDroppedByAnotherRole(role, roles, ctx),
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
          childRoles.some((role) => blockLevelRoleSet.has(role)) && !suppress && ctx.interruptions.noteref !== "inline";
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
        walkDeferred(deferred, out, sources, ctx, childSuppress);
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
      if (node.children && !skipsTarget) {
        const childSuppress = suppress || (isBlockRole && out.length > beforeLength);
        if (roles.some((role) => textReferenceRoleSet.has(role))) {
          pushTextReferenceTargets(node, node.children, out, sources, ctx, childSuppress, false);
        } else {
          walk(node.children, out, sources, ctx, childSuppress);
        }
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
