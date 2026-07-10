import type { GndNode, GndRole } from "../gnd/types.js";
import type { ReadiumSpeechUtterance } from "../utterance.js";
import { defaultAnnouncements } from "./announcements.js";
import { resolveNodeText } from "./text.js";
import type { Announcement, Announcements, ExtractUtterancesOptions } from "./types.js";

function resolveAnnouncement(announcement: Announcement, params?: Record<string, string>): string {
  return typeof announcement === "function" ? announcement(params) : announcement;
}

function pushAnnouncement(
  out: ReadiumSpeechUtterance[],
  announcements: Announcements,
  key: string,
  params?: Record<string, string>,
): void {
  const announcement = announcements[key];
  if (announcement === undefined) return;
  out.push({ plain: resolveAnnouncement(announcement, params) });
}

function isSkipped(roles: GndRole[], skip: ReadonlySet<GndRole>): boolean {
  return skip.size > 0 && roles.some((role) => skip.has(role));
}

function walk(
  nodes: GndNode[],
  out: ReadiumSpeechUtterance[],
  announcements: Announcements,
  skip: ReadonlySet<GndRole>,
): void {
  for (const node of nodes) {
    const roles = node.role ?? [];
    if (isSkipped(roles, skip)) continue;

    // A noteref's own visible text (e.g. "[1]") is a visual marker only,
    // never spoken. Its footnote target is announced with a start/end pair
    // around its normal extraction; any other kind of child is walked as-is.
    if (roles.includes("noteref")) {
      for (const child of node.children ?? []) {
        const childRoles = child.role ?? [];
        if (isSkipped(childRoles, skip)) continue;
        if (childRoles.includes("footnote")) {
          pushAnnouncement(out, announcements, "footnoteStart");
          walk([child], out, announcements, skip);
          pushAnnouncement(out, announcements, "footnoteEnd");
        } else {
          walk([child], out, announcements, skip);
        }
      }
      continue;
    }

    const resolved = resolveNodeText(node.text);
    if (resolved) {
      // Only the "pagebreak" announcement itself is templated. The
      // pagebreak's own label (from its `title`) is arbitrary author-supplied
      // text — it might already read as "Page 5" or a roman numeral — so it's
      // spoken as-is, not wrapped in a template that risks saying "page"
      // twice or otherwise mangling it.
      if (roles.includes("pagebreak")) {
        pushAnnouncement(out, announcements, "pagebreak");
      }
      const utterance: ReadiumSpeechUtterance = {};
      if (resolved.plain) utterance.plain = resolved.plain;
      if (resolved.ssml) utterance.ssml = resolved.ssml;
      if (resolved.language) utterance.language = resolved.language;
      out.push(utterance);
    }

    if (node.children) walk(node.children, out, announcements, skip);

    // A description is supplementary/elaborating content (e.g. an extended
    // audio description), spoken after the primary content it describes.
    if (node.description !== undefined) {
      out.push({ plain: node.description });
    }
  }
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
  options?: ExtractUtterancesOptions,
): ReadiumSpeechUtterance[] {
  const announcements: Announcements = { ...defaultAnnouncements, ...options?.announcements };
  const skip = new Set(options?.skip ?? []);
  const out: ReadiumSpeechUtterance[] = [];
  walk(nodes, out, announcements, skip);
  return out;
}
