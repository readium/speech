import type { GndRole } from "../gnd/types.js";

// Announcements are synthesized, navigational text the extractor adds to
// contextualize an utterance (e.g. entering/leaving a footnote, a pagebreak
// marker) — as opposed to content utterances, which speak text found in the
// document itself. The catalog is keyed by `GndRole` (kept as a plain
// string rather than a closed union — same rationale as `GndRole` itself
// in `../gnd/types.js` — since new roles gain an entry over time), and each
// entry's own shape says what kind of announcement that role gets:
//
//  - absent (no key, or `undefined`): this role has nothing to announce.
//  - a plain `Announcement`: a single, self-contained piece of content
//    (a heading, a pagebreak label, a credit line...) gets spoken once,
//    before its content.
//  - `{ start, end }`: a collection or section with its own substructure
//    (a chapter, a table, a table of contents...) gets a pair spoken
//    before and after its content — a listener needs to be told when
//    they've left a region like this, the same reason a footnote (read
//    out of narrative order via a `noteref`) needs one.
//
// This is one translatable unit per role — plain strings or a nested
// `{start, end}` object are both ordinary JSON a tool like Weblate
// round-trips natively; there's no pair of unrelated flat keys for a
// translator to know are connected.
export type AnnouncementKey = string;

export type Announcement = string | ((params?: Record<string, string>) => string);

export interface AnnouncementPair {
  start: Announcement;
  end: Announcement;
}

export type RoleAnnouncement = Announcement | AnnouncementPair;

export function isAnnouncementPair(a: RoleAnnouncement): a is AnnouncementPair {
  return typeof a === "object";
}

export type Announcements = Record<AnnouncementKey, RoleAnnouncement>;

export interface ExtractUtterancesOptions {
  // Every extraction is fully plain or fully SSML, never a per-node
  // passthrough of "whatever the node happens to have". Forces exactly
  // one field on every utterance, synthesizing it when a node only
  // naturally has the other (escape plain into ssml with no markup;
  // strip tags/placeholders from ssml into plain). Default "plain".
  format?: "plain" | "ssml";

  // A plain string index signature (not `Partial<Announcements>`): callers
  // can supply any subset of keys, known or new, without needing an
  // `| undefined` on every value.
  announcements?: Announcements;

  // Roles to omit entirely (the node and its whole subtree) from the
  // output, e.g. so a reader can skip past footnotes or navigational aids
  // during playback. See `skippableRoles` for the roles.md-documented set.
  // Nothing is skipped by default (`[]`).
  skip?: GndRole[];

  // Which roles' announcements are spoken (still needs a catalog entry to
  // say anything). Nothing announces by default, same as `skip` defaulting
  // to nothing skipped — unlike `skip`, the underlying content still plays.
  contextualize?: GndRole[];

  // Which language declarations in the *input* the extraction respects.
  // This never merges separate sibling nodes into one utterance — each
  // already has its own utterance and keeps it regardless — it only
  // changes how *a single node's own* inline language spans (e.g.
  // `<em lang="fr">`, embedded as SSML `<lang>` tags by the GND converter)
  // are treated:
  //  - "always" or omitted: honor them as declared — `ssml` keeps spans
  //    tagged in one string; `plain` splits into one utterance per
  //    language run instead.
  //  - "block-level": ignore a node's own inline spans — merge their text
  //    into the surrounding utterance untagged, keeping only that node's
  //    own (block-level) `language`.
  //  - "none": same merging as "block-level", and every utterance's
  //    `language` is dropped entirely — the whole document is being
  //    treated as one language, so nothing gets tagged at all.
  language?: "none" | "block-level" | "always";

  // Whether a pagebreak/footnote placeholder that falls mid-sentence
  // splits the enclosing utterance at that exact point (announcement/
  // content spoken *during* the sentence) instead of after the whole
  // sentence finishes (default, `false` — today's only behavior, for
  // either `format`).
  inlineContextualization?: boolean;
}
