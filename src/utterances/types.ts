import type { GndRole } from "../gnd/types.js";

// Announcements are synthesized, navigational text the extractor adds to
// contextualize an utterance (e.g. entering/leaving a footnote, a pagebreak
// marker) — as opposed to content utterances, which speak text found in the
// document itself. The catalog of announcement keys is expected to grow
// substantially as more roles gain contextualizing announcements, so it's
// kept as a plain string rather than a closed union — same rationale as
// `GndRole` in `../gnd/types.js`.
export type AnnouncementKey = string;

export type Announcement = string | ((params?: Record<string, string>) => string);

export type Announcements = Record<AnnouncementKey, Announcement>;

export interface ExtractUtterancesOptions {
  // A plain string index signature (not `Partial<Announcements>`): callers
  // can supply any subset of keys, known or new, without needing an
  // `| undefined` on every value.
  announcements?: Announcements;

  // Roles to omit entirely (the node and its whole subtree) from the
  // output, e.g. so a reader can skip past footnotes or navigational aids
  // during playback. See `skippableRoles` for the roles.md-documented set.
  // Nothing is skipped by default (`[]`).
  skip?: GndRole[];
}
