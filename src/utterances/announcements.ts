import type { Announcements } from "./types.js";

// Default English announcement catalog. Expect this to grow considerably as
// more roles gain contextualizing announcements (see `AnnouncementKey`);
// callers can override or extend any subset of these keys via
// `ExtractUtterancesOptions.announcements`, e.g. once localized catalogs
// (Weblate-sourced) become available.
export const defaultAnnouncements: Announcements = {
  footnoteStart: "Start of the footnote.",
  footnoteEnd: "End of the footnote.",
  pagebreak: "Pagebreak.",
};
