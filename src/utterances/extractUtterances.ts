import type { GndNode, GndRole } from "../gnd/types.js";
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

interface WalkContext {
  announcements: Announcements;
  skip: ReadonlySet<GndRole>;
  format: "plain" | "ssml";
  contextualize: boolean;
  interruptSentence: boolean;
  language?: "never" | "block" | "inline";
}

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

// Looks up `role`'s entry in the catalog and speaks the appropriate half
// of it for this `phase`: a plain entry only has anything to say at
// "before" (a single, self-contained announcement); a `{start, end}` pair
// says its `start` at "before" and its `end` at "after". No-ops when the
// role has no entry, or the shape doesn't have anything for this phase
// (a plain entry at "after", or `contextualize: false`).
function pushRoleAnnouncement(
  out: ReadiumSpeechUtterance[],
  ctx: WalkContext,
  role: string,
  phase: "before" | "after",
  params?: Record<string, string>,
): void {
  if (!ctx.contextualize) return;
  const entry = ctx.announcements[role];
  if (entry === undefined) return;
  if (isAnnouncementPair(entry)) {
    const announcement = phase === "before" ? entry.start : entry.end;
    out.push(formatPlain(resolveAnnouncement(announcement, params), ctx.format));
    return;
  }
  if (phase === "before") {
    out.push(formatPlain(resolveAnnouncement(entry, params), ctx.format));
  }
}

function isSkipped(roles: GndRole[], skip: ReadonlySet<GndRole>): boolean {
  return skip.size > 0 && roles.some((role) => skip.has(role));
}

// Joins a run of utterances — an announcement plus the content it
// contextualizes, e.g. "Pagebreak." + its label, or a footnote's start/end
// pair around its own content — into a single utterance, since together
// they're read as one indivisible occurrence rather than separate utterance
// boundaries. Bails out (returning `undefined`, leaving the pieces as they
// were) if the pieces don't all agree on one `language`: a single utterance
// can only carry one `language` field, so forcing a merge across genuinely
// different languages would silently drop that information.
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
  const merged: ReadiumSpeechUtterance = format === "ssml" ? { ssml: parts.join(" ") } : { plain: parts.join(" ") };
  if (language) merged.language = language;
  return merged;
}

// A pagebreak's own text is a bare locator label (a page number), not
// content in its own right — read together with its "Pagebreak." announcement
// as one utterance, with a synthesized trailing period since the label alone
// isn't a full sentence. Falls through to the announcement-less label alone
// when `contextualize` is off or the catalog has no `pagebreak` entry.
function buildPagebreakUtterance(node: GndNode, ctx: WalkContext): ReadiumSpeechUtterance[] {
  const resolved = resolveNodeText(node.text);
  const own = resolved ? applyFormat(resolved, ctx.format, ctx.language) : [];
  if (!ctx.contextualize) return own;
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
//  - "inline" or omitted: honored as declared — `ssml` keeps spans tagged
//    in one string; `plain` has no such markup, so it's split into one
//    utterance per language run instead (see `splitOnLangTags`).
//  - "block": ignore this node's own inline spans — unwrap any `<lang>`
//    tags in its `ssml`, merging their text into the surrounding flow
//    with no language of its own. Keeps this node's own `language`.
//  - "never": same unwrapping as "block", and additionally drops this
//    node's own `language` — the document is being treated as one
//    language throughout, so nothing gets tagged at all.
function applyFormat(
  resolved: ResolvedNodeText,
  format: "plain" | "ssml",
  language: "never" | "block" | "inline" | undefined,
): ReadiumSpeechUtterance[] {
  if (format === "plain" && language !== "block" && language !== "never" && resolved.ssml && hasLangTag(resolved.ssml)) {
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
  if (language === "block" || language === "never") {
    if (utterance.ssml) utterance.ssml = stripLangTags(utterance.ssml);
    if (language === "never") delete utterance.language;
  }
  return [utterance];
}

// `interruptSentence`: a node whose raw `ssml` embeds a placeholder always
// got that placeholder because the converter decided `needSSML` (see
// `flushText()` in `../gnd/converter.ts`), so the split point always comes
// from the placeholder's position in `ssml` — regardless of the requested
// `format`, which is only applied to each resulting fragment afterward.
function emitInterrupted(
  node: GndNode,
  rawSsml: string,
  out: ReadiumSpeechUtterance[],
  ctx: WalkContext,
): void {
  const language = typeof node.text === "object" ? node.text.language : undefined;
  const childrenById = new Map((node.children ?? []).map((child) => [child.id, child] as const));
  for (const segment of splitOnPlaceholders(rawSsml)) {
    if (segment.placeholderId !== undefined) {
      const child = childrenById.get(segment.placeholderId);
      if (child) walkNode(child, out, ctx);
      continue;
    }
    if (!segment.ssml) continue;
    if (
      ctx.format === "plain" &&
      ctx.language !== "block" &&
      ctx.language !== "never" &&
      hasLangTag(segment.ssml)
    ) {
      for (const langSegment of splitOnLangTags(segment.ssml, language)) {
        const utterance: ReadiumSpeechUtterance = { plain: langSegment.plain };
        if (langSegment.language) utterance.language = langSegment.language;
        out.push(utterance);
      }
      continue;
    }
    const utterance: ReadiumSpeechUtterance = {};
    if (language) utterance.language = language;
    if (ctx.format === "ssml") utterance.ssml = segment.ssml;
    else utterance.plain = stripSsmlTags(segment.ssml);
    if (ctx.language === "block" || ctx.language === "never") {
      if (utterance.ssml) utterance.ssml = stripLangTags(utterance.ssml);
      if (ctx.language === "never") delete utterance.language;
    }
    out.push(utterance);
  }
}

function walkNode(node: GndNode, out: ReadiumSpeechUtterance[], ctx: WalkContext): void {
  const roles = node.role ?? [];
  if (isSkipped(roles, ctx.skip)) return;

  // A footnote node is always reached as a noteref's child (see the
  // noteref branch below), which speaks its announcement explicitly around
  // walking it — excluded here so the generic loop doesn't speak it a
  // second time. It's also commonly marked "aside" (DPUB-ARIA models it as
  // a kind of aside), which would otherwise double-announce the same
  // region redundantly, so that's excluded too. A pagebreak is likewise
  // handled specially below (its announcement merges with its own label
  // into one utterance), so it's excluded from the generic loop as well.
  const isFootnoteNode = roles.includes("footnote");
  const announcedRoles = roles.filter(
    (role) => !(isFootnoteNode && (role === "footnote" || role === "aside")) && role !== "pagebreak",
  );

  // Every role this node carries gets looked up in the announcement
  // catalog and its "before" half spoken now, whatever shape that entry
  // is (see `pushRoleAnnouncement` and `announcements.ts`) — a no-op for
  // the vast majority of roles, which have no entry at all.
  for (const role of announcedRoles) {
    pushRoleAnnouncement(out, ctx, role, "before");
  }

  // A noteref's own visible text (e.g. "[1]") is a visual marker only,
  // never spoken. Its footnote target's start/end announcements and its
  // own content are read as a single indivisible occurrence
  // (`mergeUtterances`), the same principle as a pagebreak's announcement
  // merging with its label; any other kind of child is walked as-is.
  if (roles.includes("noteref")) {
    for (const child of node.children ?? []) {
      const childRoles = child.role ?? [];
      if (isSkipped(childRoles, ctx.skip)) continue;
      if (childRoles.includes("footnote")) {
        const inner: ReadiumSpeechUtterance[] = [];
        walk([child], inner, ctx);
        const entry = ctx.contextualize ? ctx.announcements.footnote : undefined;
        const pieces: ReadiumSpeechUtterance[] = [];
        if (entry !== undefined) {
          const startText = isAnnouncementPair(entry) ? entry.start : entry;
          pieces.push(formatPlain(resolveAnnouncement(startText), ctx.format));
        }
        pieces.push(...inner);
        if (entry !== undefined && isAnnouncementPair(entry)) {
          pieces.push(formatPlain(resolveAnnouncement(entry.end), ctx.format));
        }
        const merged = entry !== undefined && pieces.length > 1 ? mergeUtterances(pieces, ctx.format) : undefined;
        out.push(...(merged ? [merged] : pieces));
      } else {
        walk([child], out, ctx);
      }
    }
  } else {
    const rawSsml = typeof node.text === "object" ? node.text.ssml : undefined;
    if (ctx.interruptSentence && rawSsml && hasPlaceholder(rawSsml)) {
      emitInterrupted(node, rawSsml, out, ctx);
    } else if (roles.includes("pagebreak")) {
      out.push(...buildPagebreakUtterance(node, ctx));
      if (node.children) walk(node.children, out, ctx);
    } else {
      const resolved = resolveNodeText(node.text);
      if (resolved) {
        out.push(...applyFormat(resolved, ctx.format, ctx.language));
      }
      if (node.children) walk(node.children, out, ctx);
    }
  }

  for (const role of announcedRoles) {
    pushRoleAnnouncement(out, ctx, role, "after");
  }

  // A description is supplementary/elaborating content (e.g. an extended
  // audio description), spoken after the primary content it describes.
  if (node.description !== undefined) {
    out.push(formatPlain(node.description, ctx.format));
  }
}

function walk(nodes: GndNode[], out: ReadiumSpeechUtterance[], ctx: WalkContext): void {
  for (const node of nodes) walkNode(node, out, ctx);
}

/**
 * Extracts an ordered list of read-aloud utterances from a Guided
 * Navigation node tree, following the patterns documented at
 * https://github.com/readium/guided-navigation/tree/main/examples/read-aloud.
 *
 * Accepts `GndNode[]` (as returned by `parseMarkup()`, or `GndDocument.guided`)
 * rather than a wrapped document.
 */
export function extractUtterances(
  nodes: GndNode[],
  options: ExtractUtterancesOptions,
): ReadiumSpeechUtterance[] {
  const ctx: WalkContext = {
    announcements: { ...defaultAnnouncements, ...options.announcements },
    skip: new Set(options.skip ?? []),
    format: options.format,
    contextualize: options.contextualize ?? true,
    interruptSentence: options.interruptSentence ?? false,
    language: options.language,
  };
  const out: ReadiumSpeechUtterance[] = [];
  walk(nodes, out, ctx);
  return out;
}
