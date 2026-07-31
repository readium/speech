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

// Roles that constitute their own block for pause purposes — a node
// carrying one of these starts a new "paragraph-like" unit whenever it
// isn't a continuation of the block already in progress. Reference-only
// roles (`backlink`, `biblioref`, `glossref`, `noteref`, `term`) are
// intentionally excluded: they're inline, not their own block.
export const blockLevelRoles: GndRole[] = [
  // Headings
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6",
  // Text blocks
  "paragraph",
  "blockquote",
  "preformatted",
  "pullquote",
  // Lists
  "list",
  "listItem",
  // Tables
  "table",
  "row",
  "cell",
  "columnheader",
  "rowheader",
  // Media
  "audio",
  "video",
  "figure",
  "image",
  "math",
  // Sectioning / landmark containers
  "abstract",
  "acknowledgments",
  "afterword",
  "appendix",
  "article",
  "aside",
  "bibliography",
  "chapter",
  "colophon",
  "conclusion",
  "dedication",
  "endnotes",
  "epigraph",
  "epilogue",
  "errata",
  "example",
  "footnote",
  "foreword",
  "glossary",
  "index",
  "introduction",
  "notice",
  "part",
  "preface",
  "prologue",
  "qna",
  "section",
  "summary",
  "tip",
];
