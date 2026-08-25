import type { GndObject, GndRole } from "../gnd/types.js";
import { ssmlTextEscape } from "../gnd/text.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { defaultContextualizations } from "./contextualizations.js";
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
import {
  isBlockContextualization,
  type Contextualization,
  type Contextualizations,
  type ExtractUtterancesOptions,
} from "./types.js";
import { blockLevelRoles } from "./roles.js";
import { startsWithBindingPunct } from "../utils/text.js";

interface WalkContext {
  contextualizations: Contextualizations;
  skip: ReadonlySet<GndRole>;
  contextualize: ReadonlySet<GndRole>;
  format: "plain" | "ssml";
  inlineContextualization: boolean;
  language?: "none" | "block-level" | "always";
  // Tracked by object identity rather than threaded as a parallel array,
  // since utterances get merged/reordered across several local `out` arrays
  // (pieces, inner, ...) before reaching the caller's own `out`.
  blockStarts: Set<ReadiumSpeechUtterance>;
}

// Parallel to `out`: which node produced each utterance, `undefined` when none (e.g. a merged span).
type SourceTrace = (GndObject | undefined)[];

const blockLevelRoleSet: ReadonlySet<GndRole> = new Set(blockLevelRoles);

// `{{ name }}` tokens (i18next-style) are substituted from `params`; a token
// with no matching param is left as-is rather than silently dropped.
function substituteTokens(template: string, params?: Record<string, string>): string {
  if (!params) return template;
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name: string) => (name in params ? params[name] : match));
}

// `variantKey` picks a named-variants template (ignored for a plain string
// entry); no match resolves to "".
function resolveContextualization(
  contextualization: Contextualization,
  variantKey?: string,
  params?: Record<string, string>,
): string {
  const template = typeof contextualization === "string" ? contextualization : contextualization[variantKey ?? ""];
  return template !== undefined ? substituteTokens(template, params) : "";
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

// Speaks `role`'s catalog entry for this `phase`: `inline` only has
// something to say "before"; `block` says `start`/`end` at "before"/"after".
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
  if (!ctx.contextualize.has(role)) return;
  const entry = ctx.contextualizations[role];
  if (entry === undefined) return;
  if (isBlockContextualization(entry)) {
    const contextualization = phase === "before" ? entry.block.start : entry.block.end;
    push(out, sources, node, [formatPlain(resolveContextualization(contextualization, variantKey, params), ctx.format)]);
    return;
  }
  if (phase === "before") {
    push(out, sources, node, [formatPlain(resolveContextualization(entry.inline, variantKey, params), ctx.format)]);
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
  const entry = ctx.contextualizations.pagebreak;
  if (entry === undefined) return own;
  const contextualization = formatPlain(
    resolveContextualization(isBlockContextualization(entry) ? entry.block.start : entry.inline, undefined),
    ctx.format,
  );
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
  const isFootnoteNode = roles.includes("footnote");
  const contextualizedRoles = roles.filter(
    (role) => !(isFootnoteNode && (role === "footnote" || role === "aside")) && role !== "pagebreak",
  );

  // Every role this node carries gets looked up in the contextualization
  // catalog and its "before" half spoken now, whatever shape that entry
  // is (see `pushRoleContextualization` and `contextualizations.ts`) — a
  // no-op for the vast majority of roles, which have no entry at all.
  for (const role of contextualizedRoles) {
    pushRoleContextualization(out, sources, node, ctx, role, "before");
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
        const entry = ctx.contextualize.has("footnote") ? ctx.contextualizations.footnote : undefined;
        const pieces: ReadiumSpeechUtterance[] = [];
        const pieceSources: SourceTrace = [];
        if (entry !== undefined) {
          const startText = isBlockContextualization(entry) ? entry.block.start : entry.inline;
          pieces.push(formatPlain(resolveContextualization(startText, undefined), ctx.format));
          pieceSources.push(child);
        }
        pieces.push(...inner);
        pieceSources.push(...innerSources);
        if (entry !== undefined && isBlockContextualization(entry)) {
          pieces.push(formatPlain(resolveContextualization(entry.block.end, undefined), ctx.format));
          pieceSources.push(child);
        }
        const merged = entry !== undefined && pieces.length > 1 ? mergeUtterances(pieces, ctx.format) : undefined;
        pushPiecesOrMerged(out, sources, ctx, child, pieces, pieceSources, merged);
      } else {
        walk([child], out, sources, ctx, suppress);
      }
    }
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
      const resolved = resolveNodeText(node.text);
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

  // A description is supplementary/elaborating content (e.g. an extended
  // audio description), spoken after the primary content but still within
  // the node's own start/end contextualization boundary.
  if (node.description !== undefined) {
    push(out, sources, node, [formatPlain(node.description, ctx.format)]);
  }

  for (const role of contextualizedRoles) {
    pushRoleContextualization(out, sources, node, ctx, role, "after");
  }
}

// `suppress` only carries forward to the first node — once we move on to a
// sibling, whatever a prior sibling's subtree spoke has already broken any
// "nothing in between" chain, so each subsequent sibling is free to open
// its own boundary.
function walk(nodes: GndObject[], out: ReadiumSpeechUtterance[], sources: SourceTrace, ctx: WalkContext, suppress: boolean): void {
  nodes.forEach((node, index) => walkNode(node, out, sources, ctx, index === 0 ? suppress : false));
}

function makeWalkContext(options: ExtractUtterancesOptions): WalkContext {
  return {
    contextualizations: { ...defaultContextualizations, ...options.contextualizations },
    skip: new Set(options.skip ?? []),
    contextualize: new Set(options.contextualize ?? []),
    format: options.format ?? "plain",
    inlineContextualization: options.inlineContextualization ?? false,
    language: options.language,
    blockStarts: new Set(),
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
  walk(nodes, out, [], makeWalkContext(options), false);
  return out;
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
  return { utterances, sources, blockStarts };
}
