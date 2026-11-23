import type { GuidedNavigationObject } from "@readium/shared";
import type { GndRole } from "@readium/guided-navigation";
import type { Interruption } from "./types.js";
import { languageFor, overrideLangTags, stripLangTags } from "./language.js";
import { nodeRoles, nodeText, spokenText } from "./nodeFields.js";
import {
  enclosedPlaceholders,
  hasLangTag,
  hasPlaceholder,
  keepsSpaceBefore,
  removeEmptiedPairs,
  resolveNodeText,
  splitOnLangTags,
  splitOnPlaceholders,
  type SsmlSegment,
} from "./text.js";
import { stripSsmlTags } from "./plainText.js";
import { closeTags, openTags } from "./ssml.js";
import {
  contextualizationParamsFor,
  isDroppedByAnotherRole,
  isRoleContextualized,
  pushRoleContextualization,
  resolveEntryText,
  scopeToQuote,
} from "./contextualization.js";
import { applyFormat, mergeUtterances, pieceText } from "./mergeUtterances.js";
import { holdsMarker, ownRange, ownTextAligner, placeInBlock, setAliasSpan, setSpans, type Embedding } from "./sourceSpans.js";
import { resolveNodeLocate, subLocateFor } from "./locate.js";
import { isPageNumber } from "./pageNumber.js";
import { plainTextOf, redundantCaptionOf, spokenDescriptionOf } from "./tableStructure.js";
import { formatDescription, formatEntryText, push, pushMergedRuns, pushPiecesOrMerged } from "./utteranceOutput.js";
import { endsWithSentenceTerminator } from "./abbreviationAlias.js";
import { nestTags, type Piece } from "./piece.js";
import { isBlockNode } from "./blocks.js";
import {
  contentlessRoleSet,
  descriptionFoldingRoleSet,
  interruptionRoleSet,
  textReferenceRoleSet,
  valueFoldingRoleSet,
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
function buildPagebreakLabel(node: GuidedNavigationObject, ctx: WalkContext): Piece[] {
  const resolved = resolveNodeText(nodeText(node.text));
  if (!resolved) return [];
  const label = resolved.plain ?? stripSsmlTags(resolved.ssml ?? "");
  if (isPageNumber(label)) {
    const text = resolveEntryText(ctx, "pagebreak.number", undefined, { number: label.trim() });
    if (text !== undefined) return [formatEntryText(text, ctx)];
  }
  return applyFormat(node, resolved, ctx.format, ctx.language, ctx);
}

function appendPeriod(utterance: Piece): void {
  if (utterance.plain !== undefined) utterance.plain += ".";
  if (utterance.ssml !== undefined) utterance.ssml += ".";
}

// A pagebreak's label merges into its "Pagebreak." contextualization as one
// utterance, with a synthesized trailing period, kept when the label can't merge (e.g. in another language).
function buildPagebreakUtterance(node: GuidedNavigationObject, ctx: WalkContext): Piece[] {
  const own = buildPagebreakLabel(node, ctx);
  if (!ctx.contextualize.has("pagebreak")) return own;
  const base = ctx.i18n.exists("pagebreak.block.start") ? "pagebreak.block.start" : "pagebreak.inline";
  const text = resolveEntryText(ctx, base);
  if (text === undefined) return own;
  const contextualization = formatEntryText(text, ctx);
  if (own.length === 0) return [contextualization];
  for (const piece of own) piece.source = node;
  const merged = mergeUtterances([contextualization, ...own], ctx);
  if (!merged) {
    appendPeriod(own[own.length - 1]);
    return [contextualization, ...own];
  }
  appendPeriod(merged);
  return [merged];
}

// A reference's own text, as read in place in its sentence.
function textReferenceText(ref: GuidedNavigationObject, ctx: WalkContext): Piece[] {
  const resolved = resolveNodeText(spokenText(ref));
  return resolved ? applyFormat(ref, resolved, ctx.format, ctx.language, ctx) : [];
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
  out: Piece[],
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
  const walked = deferred ? targets : values;
  if (contextualization === undefined && !template) {
    walk(walked, out, ctx, suppress);
    return;
  }
  const eligible = isBlockNode(walked[0], ctx) && !suppress;
  const pieces: Piece[] = [];
  if (contextualization !== undefined) push(pieces, ref, [formatEntryText(contextualization, ctx)]);
  // Their own walk would otherwise claim the block boundary instead of this utterance's start.
  const walkSuppress = suppress || eligible;
  const announced = [...walked, ...(term ? termPath(term) : [])];
  announced.forEach((node) => announcedTargets.add(node));
  for (const part of (template ?? valueMarker).split(new RegExp(`(${termMarker}|${valueMarker})`))) {
    if (part === termMarker) walk([term!], pieces, ctx, walkSuppress);
    else if (part === valueMarker) walk(values, pieces, ctx, walkSuppress);
    else if (part) push(pieces, ref, [formatEntryText(part, ctx)]);
  }
  announced.forEach((node) => announcedTargets.delete(node));
  if (eligible && pieces.length > 0) pieces[0].blockStart = true;
  pushMergedRuns(out, ctx, ref, pieces);
}

// A deferred interruption: a node, or a text reference's targets.
type Deferred = { node: GuidedNavigationObject } | { ref: GuidedNavigationObject; targets: GuidedNavigationObject[] };

// Walks deferred interruptions like `walk()` walks siblings.
function walkDeferred(deferred: Deferred[], out: Piece[], ctx: WalkContext, suppress: boolean): void {
  deferred.forEach((entry, index) => {
    const own = index === 0 ? suppress : false;
    if ("ref" in entry) pushTextReferenceTargets(entry.ref, entry.targets, out, ctx, own, true);
    else walkNode(entry.node, out, ctx, own);
  });
}

function isDeferred(child: GuidedNavigationObject, ctx: WalkContext): boolean {
  const interruption = interruptionOf(nodeRoles(child), ctx);
  return interruption !== undefined && interruption !== "inline";
}

// An alias isn't on the page, so it's located on its abbreviation instead, at `range` in the node's own text.
function locateOnAbbreviation(
  aliasPieces: Piece[],
  abbreviation: string,
  range: { start: number; end: number },
  node: GuidedNavigationObject,
  ctx: WalkContext,
): void {
  const nodeRef = resolveNodeLocate(node, ctx.ancestorChains);
  if (!nodeRef) return;
  const locate = subLocateFor(nodeRef.ref, abbreviation);
  ctx.aliasLocates.add(locate);
  for (const piece of aliasPieces) {
    piece.locate = locate;
    setAliasSpan(piece, node, range, locate);
    piece.edgeLocates = { leading: locate, trailing: locate };
  }
}

// Splits the sentence on its placeholders, merging inline ones back into one
// utterance; deferred ones are returned for the caller to walk separately.
function emitWithPlaceholders(
  node: GuidedNavigationObject,
  rawSsml: string,
  out: Piece[],
  ctx: WalkContext,
  suppress: boolean,
  isBlockRole: boolean,
): Deferred[] {
  const declaredLanguage = nodeText(node.text)?.language;
  const language = languageFor(declaredLanguage, ctx);
  const childrenById = new Map((node.children ?? []).map((child) => [child.id, child] as const));
  const pieces: Piece[] = [];
  const deferred: Deferred[] = [];
  const inserted = new Set<Piece>();
  const placedAfter = new Set<Piece>();
  const aliases = new Map<Piece, string | undefined>();
  const nested = new Set<Piece>();
  const isSentence = ctx.segmentation === "sentence";
  const abbreviationSkipped = ctx.interruptions.abbreviation === "never";
  const abbreviationInline = ctx.interruptions.abbreviation === "inline";
  const aligner = ownTextAligner(node);
  // Each inline child occurrence's pieces, placed in this node's text once the aligner has placed it.
  const embeddedPieces: { embedding: Embedding; pieces: Piece[] }[] = [];
  // Where the last abbreviation read as its own text was placed, for its alias read after it.
  let abbreviationRange: { start: number; end: number } | undefined;
  const placeInOwnText = (segment: SsmlSegment, before: number) => {
    if (segment.abbreviation === "alias") return;
    const spans = pieces.slice(before).map((piece) => {
      const span = aligner.place(pieceText(piece, ctx));
      if (span) setSpans(piece, [span]);
      return span;
    });
    if (segment.abbreviation === "text") abbreviationRange = ownRange(spans);
  };
  // An alias's pieces, pushed since `before`, stay whole in their sentence.
  const placeAlias = (segment: SsmlSegment, before: number) => {
    if (segment.abbreviation !== "alias") return;
    const aliasPieces = pieces.slice(before);
    const abbreviationText = stripSsmlTags(segment.abbreviationText!);
    const range = abbreviationInline ? ownRange([aligner.place(abbreviationText)]) : abbreviationRange;
    if (range) locateOnAbbreviation(aliasPieces, abbreviationText, range, node, ctx);
    const abbreviation = abbreviationInline ? abbreviationText : undefined;
    aliasPieces.forEach((piece, k) => aliases.set(piece, k === 0 ? abbreviation : undefined));
  };
  // Words and opening brackets touching an abbreviation don't touch the parenthesized expansion read after it; other punctuation does.
  const markTouching = (segment: SsmlSegment, before: number) => {
    const followsExpansion = !abbreviationInline && aliases.has(pieces[before - 1]) && !/^(?!\p{Ps})\p{P}/u.test(stripSsmlTags(segment.ssml ?? ""));
    if (segment.touchesPrevious && before > 0 && pieces.length > before && !followsExpansion) pieces[before].spacing = "touching";
  };
  // Spacing the source puts before a piece never overrides a touching join already set on it.
  const markSpaced = (piece: Piece) => {
    if (piece.spacing !== "touching") piece.spacing = "spaced";
  };
  // Inline interruptions, walked up front for `isDropped` to know which read nothing in place.
  const insertedById = new Map<string, Piece[]>();
  for (const { placeholderId } of splitOnPlaceholders(rawSsml)) {
    const child = placeholderId === undefined ? undefined : childrenById.get(placeholderId);
    if (!child || isDeferred(child, ctx) || !nodeRoles(child).some((role) => interruptionRoleSet.has(role))) continue;
    const walked: Piece[] = [];
    walkNode(child, walked, ctx, suppress);
    insertedById.set(placeholderId!, walked);
  }
  // A placeholder read neither in place nor as its own words leaves no brackets or quotes around nothing.
  const isDropped = (id: string) => {
    const child = childrenById.get(id);
    if (insertedById.get(id)?.length === 0) return true;
    return child !== undefined && isDeferred(child, ctx) && !nodeRoles(child).some((role) => textReferenceRoleSet.has(role));
  };
  // How the next text meets what precedes it across placeholders: spaced where the source spaces a dropped one, else touching if set.
  let pending: { spaceAcross?: boolean; touching?: boolean } | undefined;
  const meetPending = (before: number) => {
    const piece = pieces[before];
    if (!pending || !piece) return;
    if (pending.spaceAcross) markSpaced(piece);
    else if (pending.touching) piece.spacing = "touching";
    pending = undefined;
  };
  const removed = removeEmptiedPairs(rawSsml, isDropped, declaredLanguage);
  const { spaced } = removed;
  let ssml = removed.ssml;
  // On the whole text, since segments are slices of it whose tags may open or close in another segment.
  if (ctx.format === "ssml") {
    ssml = overrideLangTags(ssml, ctx.languageOverrides);
    if (ctx.language === "block-level" || ctx.language === "none") ssml = stripLangTags(ssml);
  }
  const enclosedIds = enclosedPlaceholders(ssml, declaredLanguage);
  for (let segment of splitOnPlaceholders(ssml)) {
    if (segment.abbreviation && (segment.abbreviation === "text" ? abbreviationInline : abbreviationSkipped)) continue;
    if (segment.abbreviation === "alias" && !abbreviationInline) segment = { ...segment, ssml: segment.parenthesizedSsml, touchesPrevious: false };
    if (segment.placeholderId !== undefined) {
      const child = childrenById.get(segment.placeholderId);
      if (!child) continue;
      const embeddedFrom = pieces.length;
      const embedding = holdsMarker(child) ? undefined : aligner.embed(child);
      if (isDropped(segment.placeholderId)) {
        pending = { spaceAcross: spaced.has(segment.placeholderId) };
      } else {
        pending = undefined;
      }
      if (!isDeferred(child, ctx)) {
        const before = pieces.length;
        if (nodeRoles(child).some((role) => interruptionRoleSet.has(role))) {
          // Copied, since a placeholder may recur and each occurrence nests the pieces in its own elements.
          pieces.push(...insertedById.get(segment.placeholderId)!.map((piece) => ({ ...piece, tags: piece.tags && { ...piece.tags } })));
          pieces.slice(before).forEach((piece) => inserted.add(piece));
          if (segment.language) pieces.slice(before).forEach((piece) => (piece.enclosingLanguage = segment.language));
          nestTags(pieces.slice(before), segment.open!);
          // Inserted text keeps the source's spacing inside a pair enclosing just it; a quote closing a word before it is spaced from it.
          if (pieces.length > before) {
            const enclosed = enclosedIds.has(segment.placeholderId);
            if (/\s$/.test(segment.textBefore!) || (!enclosed && /\S\p{Pi}$/u.test(segment.textBefore!))) markSpaced(pieces[before]);
            else if (enclosed) pieces[before].spacing = "touching";
            const spaceAfter = /^\s/.test(segment.textAfter!) && keepsSpaceBefore(segment.textAfter!.trimStart(), declaredLanguage);
            pending = { spaceAcross: spaceAfter, touching: enclosed };
          }
        } else {
          // Interruptions inside an inline child (e.g. a link) are placed relative to this sentence.
          walkNode(child, pieces, ctx, suppress, deferred);
          nestTags(pieces.slice(before), segment.open!);
          pieces.slice(before).forEach((piece) => piece.placement && nested.add(piece));
          // Its text keeps the source's spacing, which joining wouldn't add in text written without spaces.
          if (pieces.length > before) {
            if (/\s$/.test(segment.textBefore!)) markSpaced(pieces[before]);
            pending = { spaceAcross: /^\s/.test(segment.textAfter!) };
          }
        }
      } else {
        const childRoles = nodeRoles(child);
        const isTextReference = childRoles.some((role) => textReferenceRoleSet.has(role));
        if (isTextReference) {
          push(pieces, child, textReferenceText(child, ctx));
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
            walkDeferred([entry], pieces, ctx, deferred.length === 1 && (suppress || isBlockRole));
            pieces.slice(before).forEach((piece) => placedAfter.add(piece));
          }
        }
      }
      if (embedding) embeddedPieces.push({ embedding, pieces: pieces.slice(embeddedFrom) });
      continue;
    }
    if (!segment.ssml) continue;
    const before = pieces.length;
    const readable = openTags(segment.open ?? []) + segment.ssml + closeTags(segment.close ?? []);
    if (
      ctx.format === "plain" &&
      ctx.language !== "block-level" &&
      ctx.language !== "none" &&
      hasLangTag(readable)
    ) {
      for (const langSegment of splitOnLangTags(readable, declaredLanguage)) {
        const piece: Piece = { plain: langSegment.plain };
        const segmentLanguage = languageFor(langSegment.language, ctx);
        if (segmentLanguage) piece.language = segmentLanguage;
        push(pieces, node, [piece]);
      }
      placeInOwnText(segment, before);
      meetPending(before);
      placeAlias(segment, before);
      markTouching(segment, before);
      continue;
    }
    const piece: Piece = {};
    if (language) piece.language = language;
    if (ctx.format === "ssml") {
      piece.ssml = segment.ssml;
      if (segment.open?.length || segment.close?.length) piece.tags = { open: segment.open!, close: segment.close!, around: [] };
    } else piece.plain = stripSsmlTags(readable);
    push(pieces, node, [piece]);
    placeInOwnText(segment, before);
    meetPending(before);
    placeAlias(segment, before);
    markTouching(segment, before);
  }
  aligner.finish();
  for (const { embedding: { child, range }, pieces: childPieces } of embeddedPieces) {
    if (range) childPieces.forEach((piece) => placeInBlock(piece, child, node, range.start));
  }
  // Without sentence segmentation, a node whose inline alias may end a sentence is merged once segmented (see `mergeAliasPieces()`).
  const awaitsSegmentation = !isSentence && (nested.size > 0 || pieces.some((piece) => endsWithSentenceTerminator(aliases.get(piece) ?? "")));
  if ((isSentence && deferred.length + inserted.size + aliases.size + nested.size > 0) || awaitsSegmentation) {
    pieces.forEach((piece) => {
      const own = inserted.has(piece)
        ? { kind: "inline" as const }
        : placedAfter.has(piece)
          ? { kind: "after" as const }
          : aliases.has(piece)
            ? { kind: "alias" as const, abbreviation: aliases.get(piece) }
            : nested.has(piece)
              ? piece.placement
              : undefined;
      piece.placement = { ...own, node };
    });
    pushPiecesOrMerged(out, node, pieces, undefined);
    return isSentence ? [] : deferred;
  }
  pushMergedRuns(out, ctx, node, pieces);
  return deferred;
}

// With `hoisted`, deferred interruptions in the node's own text are handed to the caller instead of walked.
// With `ownTextInValue`, its own text was already spoken in an ancestor's folded value: only what it embeds is.
function walkNode(
  node: GuidedNavigationObject,
  out: Piece[],
  ctx: WalkContext,
  suppress: boolean,
  hoisted?: Deferred[],
  ownTextInValue = false,
): void {
  const roles = nodeRoles(node);
  const description = spokenDescriptionOf(node);
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
  const isBlockRole = isBlockNode(node, ctx);
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
  // but a table's is its label, spoken before its rows. Either way this
  // is suppressed when a role that's actually firing already folded it
  // into its own announcement (e.g. "Table: Team roster. 3 lines...").
  const foldsDescription = roles.some((role) => descriptionFoldingRoleSet.has(role) && ctx.contextualize.has(role));
  const isTableCaption = roles.includes("table") && description !== undefined && !foldsDescription;
  if (isTableCaption) {
    const utterance = formatDescription(description!, node, ctx);
    scopeToQuote(utterance, 0, description!, node, ctx);
    push(out, node, [utterance]);
  }

  // Every role this node carries gets looked up in the contextualization
  // catalog and its "before" half spoken now, whatever shape that entry
  // is (see `pushRoleContextualization` and `contextualizations.ts`) — a
  // no-op for the vast majority of roles, which have no entry at all.
  for (const role of contextualizedRoles) {
    const { variantKey, params } = contextualizationParamsFor(role, node, ctx);
    pushRoleContextualization(out, node, ctx, role, "before", variantKey, params);
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
          isBlockNode(child, ctx) && !suppress && ctx.interruptions.noteref !== "inline";
        const startText = footnoteContextualized ? resolveEntryText(ctx, footnoteBlock ? "footnote.block.start" : "footnote.inline") : undefined;
        const hasEntry = footnoteContextualized && (startText !== undefined || footnoteBlock);
        const pieces: Piece[] = [];
        if (startText !== undefined) push(pieces, child, [formatEntryText(startText, ctx)]);
        const inner: Piece[] = [];
        // The child's own walk() would otherwise claim this same boundary on its first
        // content utterance instead of the start text pushed above.
        walk([child], inner, ctx, suppress || childEligible);
        if (childEligible && inner.length > 0) inner[0].blockStart = true;
        pieces.push(...inner);
        if (hasEntry && footnoteBlock) {
          const endText = resolveEntryText(ctx, "footnote.block.end");
          if (endText !== undefined) push(pieces, child, [formatEntryText(endText, ctx)]);
        }
        const merged = hasEntry && pieces.length > 1 ? mergeUtterances(pieces, ctx) : undefined;
        pushPiecesOrMerged(out, child, pieces, merged);
      } else {
        walk([child], out, ctx, suppress);
      }
    }
  } else if (roles.some((role) => contentlessRoleSet.has(role))) {
    // Ignored entirely — see `contentlessRoles`.
  } else {
    const rawSsml = spokenText(node)?.ssml;
    const foldsValue = ownTextInValue || roles.some((role) => valueFoldingRoleSet.has(role) && isRoleContextualized(role, ctx));
    if (rawSsml && hasPlaceholder(rawSsml) && !foldsValue) {
      const deferred = emitWithPlaceholders(node, rawSsml, out, ctx, suppress, isBlockRole);
      if (hoisted) {
        hoisted.push(...deferred);
      } else if (deferred.length > 0) {
        const childSuppress = suppress || (isBlockRole && out.length > beforeLength);
        walkDeferred(deferred, out, ctx, childSuppress);
      }
    } else if (roles.includes("pagebreak")) {
      push(out, node, buildPagebreakUtterance(node, ctx));
      if (node.children) {
        const childSuppress = suppress || (isBlockRole && out.length > beforeLength);
        walk(node.children, out, ctx, childSuppress);
      }
    } else {
      const resolved = foldsValue ? undefined : resolveNodeText(spokenText(node));
      if (resolved) {
        push(out, node, applyFormat(node, resolved, ctx.format, ctx.language, ctx));
      }
      if (node.children && !skipsTarget) {
        const childSuppress = suppress || (isBlockRole && out.length > beforeLength);
        if (roles.some((role) => textReferenceRoleSet.has(role))) {
          pushTextReferenceTargets(node, node.children, out, ctx, childSuppress, isDeferred(node, ctx));
        } else if (foldsValue && rawSsml && hasPlaceholder(rawSsml)) {
          // A value's plain text holds the words of the links and text references its placeholders embed.
          const embedded = new Set(splitOnPlaceholders(rawSsml).flatMap((segment) => segment.placeholderId ?? []));
          node.children.forEach((child, index) => {
            const childRoles = nodeRoles(child);
            const inValue =
              child.id !== undefined &&
              embedded.has(child.id) &&
              (childRoles.length === 0 || childRoles.some((role) => textReferenceRoleSet.has(role)));
            walkNode(child, out, ctx, index === 0 ? childSuppress : false, undefined, inValue);
          });
        } else {
          const caption = redundantCaptionOf(node);
          walk(caption ? node.children.filter((child) => child !== caption) : node.children, out, ctx, childSuppress);
        }
      }
    }
  }

  if (eligible && out.length > beforeLength) {
    out[beforeLength].blockStart = true;
  }

  if (description !== undefined && !foldsDescription && !isTableCaption) {
    const utterance = formatDescription(description, node, ctx);
    // Only a figure's description is located, as a quote within the figure.
    if (roles.includes("figure")) scopeToQuote(utterance, 0, description, node, ctx);
    push(out, node, [utterance]);
  }

  for (const role of contextualizedRoles) {
    const { variantKey, params } = contextualizationParamsFor(role, node, ctx);
    pushRoleContextualization(out, node, ctx, role, "after", variantKey, params);
  }
}

// `suppress` only carries forward to the first node — once we move on to a
// sibling, whatever a prior sibling's subtree spoke has already broken any
// "nothing in between" chain, so each subsequent sibling is free to open
// its own boundary.
export function walk(nodes: GuidedNavigationObject[], out: Piece[], ctx: WalkContext, suppress: boolean): void {
  nodes.forEach((node, index) => walkNode(node, out, ctx, index === 0 ? suppress : false));
}
