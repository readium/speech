import type { GndObject, GndRole } from "../gnd/types.js";
import { ssmlTextEscape } from "../gnd/text.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { defaultAnnouncements } from "./announcements.js";
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
import { isAnnouncementPair, type Announcement, type Announcements, type ExtractUtterancesOptions } from "./types.js";
import { blockLevelRoles } from "./roles.js";
import { startsWithBindingPunct } from "../utils/text.js";

interface WalkContext {
  announcements: Announcements;
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

function resolveAnnouncement(announcement: Announcement, params?: Record<string, string>): string {
  return typeof announcement === "function" ? announcement(params) : announcement;
}

// Every announcement/label utterance is sourced as plain text (the
// announcement catalog, and a pagebreak/noteref's own visible label, never
// carry markup of their own) — this formats that plain text per the
// requested `format`, the same as any other utterance.
function formatPlain(text: string, format: "plain" | "ssml"): ReadiumSpeechUtterance {
  return format === "ssml" ? { ssml: ssmlTextEscape(text) } : { plain: text };
}

function push(out: ReadiumSpeechUtterance[], sources: SourceTrace, node: GndObject | undefined, items: ReadiumSpeechUtterance[]): void {
  out.push(...items);
  for (let i = 0; i < items.length; i++) sources.push(node);
}

// Looks up `role`'s entry in the catalog and speaks the appropriate half
// of it for this `phase`: a plain entry only has anything to say at
// "before" (a single, self-contained announcement); a `{start, end}` pair
// says its `start` at "before" and its `end` at "after". No-ops when the
// role has no entry, or the shape doesn't have anything for this phase
// (a plain entry at "after"), or `contextualize` doesn't include this role.
function pushRoleAnnouncement(
  out: ReadiumSpeechUtterance[],
  sources: SourceTrace,
  node: GndObject,
  ctx: WalkContext,
  role: string,
  phase: "before" | "after",
  params?: Record<string, string>,
): void {
  if (!ctx.contextualize.has(role)) return;
  const entry = ctx.announcements[role];
  if (entry === undefined) return;
  if (isAnnouncementPair(entry)) {
    const announcement = phase === "before" ? entry.start : entry.end;
    push(out, sources, node, [formatPlain(resolveAnnouncement(announcement, params), ctx.format)]);
    return;
  }
  if (phase === "before") {
    push(out, sources, node, [formatPlain(resolveAnnouncement(entry, params), ctx.format)]);
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

// A pagebreak's label merges into its "Pagebreak." announcement as one
// utterance, with a synthesized trailing period.
function buildPagebreakUtterance(node: GndObject, ctx: WalkContext): ReadiumSpeechUtterance[] {
  const resolved = resolveNodeText(node.text);
  const own = resolved ? applyFormat(resolved, ctx.format, ctx.language) : [];
  if (!ctx.contextualize.has("pagebreak")) return own;
  const entry = ctx.announcements.pagebreak;
  if (entry === undefined) return own;
  const announcement = formatPlain(resolveAnnouncement(isAnnouncementPair(entry) ? entry.start : entry), ctx.format);
  if (own.length === 0) return [announcement];
  const merged = mergeUtterances([announcement, ...own], ctx.format);
  if (!merged) return [announcement, ...own];
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
  if (merged) {
    push(out, sources, pieceSources[0] ?? node, [merged]);
  } else {
    out.push(...pieces);
    sources.push(...pieceSources);
  }
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
  // speak something of its own (e.g. a contextualized announcement)
  // claims the boundary itself and suppresses every nested block reached
  // through it, so entering deeply nested markup never stacks pauses.
  const isBlockRole = roles.some((role) => blockLevelRoleSet.has(role));
  const eligible = isBlockRole && !suppress;
  const beforeLength = out.length;

  // Footnote and pagebreak are handled specially below (merged with their
  // own content/label), so they're excluded from the generic loop here.
  const isFootnoteNode = roles.includes("footnote");
  const announcedRoles = roles.filter(
    (role) => !(isFootnoteNode && (role === "footnote" || role === "aside")) && role !== "pagebreak",
  );

  // Every role this node carries gets looked up in the announcement
  // catalog and its "before" half spoken now, whatever shape that entry
  // is (see `pushRoleAnnouncement` and `announcements.ts`) — a no-op for
  // the vast majority of roles, which have no entry at all.
  for (const role of announcedRoles) {
    pushRoleAnnouncement(out, sources, node, ctx, role, "before");
  }

  // A noteref's own visible text (e.g. "[1]") is a visual marker only,
  // never spoken. Its footnote target's announcements and content merge
  // into one utterance; any other kind of child is walked as-is.
  if (roles.includes("noteref")) {
    for (const child of node.children ?? []) {
      const childRoles = child.role ?? [];
      if (isSkipped(childRoles, ctx.skip)) continue;
      if (childRoles.includes("footnote")) {
        const inner: ReadiumSpeechUtterance[] = [];
        const innerSources: SourceTrace = [];
        walk([child], inner, innerSources, ctx, suppress);
        const entry = ctx.contextualize.has("footnote") ? ctx.announcements.footnote : undefined;
        const pieces: ReadiumSpeechUtterance[] = [];
        const pieceSources: SourceTrace = [];
        if (entry !== undefined) {
          const startText = isAnnouncementPair(entry) ? entry.start : entry;
          pieces.push(formatPlain(resolveAnnouncement(startText), ctx.format));
          pieceSources.push(child);
        }
        pieces.push(...inner);
        pieceSources.push(...innerSources);
        if (entry !== undefined && isAnnouncementPair(entry)) {
          pieces.push(formatPlain(resolveAnnouncement(entry.end), ctx.format));
          pieceSources.push(child);
        }
        const merged = entry !== undefined && pieces.length > 1 ? mergeUtterances(pieces, ctx.format) : undefined;
        if (merged) {
          push(out, sources, pieceSources[0] ?? child, [merged]);
        } else {
          out.push(...pieces);
          sources.push(...pieceSources);
        }
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
  // the node's own start/end announcement boundary.
  if (node.description !== undefined) {
    push(out, sources, node, [formatPlain(node.description, ctx.format)]);
  }

  for (const role of announcedRoles) {
    pushRoleAnnouncement(out, sources, node, ctx, role, "after");
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
    announcements: { ...defaultAnnouncements, ...options.announcements },
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
