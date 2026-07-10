import type { GndRole } from "../gnd/types.js";

// https://github.com/readium/guided-navigation/blob/main/roles.md#list-of-skippable-roles
// Roles a reader may choose to skip past during playback — ancillary
// content (asides, footnotes...) and navigational aids (tables of
// contents, page lists...) that aren't part of the primary reading flow.
// Nothing is skipped by default: pass a subset of this list (or all of
// it) via `ExtractUtterancesOptions.skip` to opt in.
export const skippableRoles: GndRole[] = [
  // Ancillary content
  "aside",
  "bibliography",
  "details",
  "endnotes",
  "footnote",
  "noteref",
  "pullquote",
  // Navigation
  "landmarks",
  "loa",
  "loi",
  "lot",
  "lov",
  "pagebreak",
  "toc",
];
