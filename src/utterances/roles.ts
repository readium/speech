import type { GndRole } from "../gnd/types.js";

// https://github.com/readium/guided-navigation/blob/main/roles.md#list-of-skippable-roles
// Roles a reader may choose to skip past during playback — ancillary
// content (asides, footnotes...) and navigational aids (tables of
// contents, page lists...) that aren't part of the primary reading flow.
// Nothing is skipped by default: pass a subset of this list (or all of
// it) via `ExtractUtterancesOptions.skip` to opt in.
export const skippableRoles: GndRole[] = [
  "aside",
  "audio",
  "bibliography",
  "cell",
  "columnheader",
  "details",
  "endnotes",
  "figure",
  "footnote",
  "image",
  "landmarks",
  "loa",
  "loi",
  "lot",
  "lov",
  "noteref",
  "pagebreak",
  "pullquote",
  "row",
  "rowheader",
  "table",
  "toc",
  "video"
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

// role -> role(s) it drops from the loop when both are on one node —
// `unconditional` drops them regardless of reachability, else only once reachable.
export const roleDropOverrides: Partial<Record<GndRole, { drops: GndRole[]; unconditional?: boolean }>> = {
  footnote: { drops: ["aside"], unconditional: true },
  cover: { drops: ["image"] },
  pullquote: { drops: ["blockquote", "aside"] },
  epigraph: { drops: ["blockquote"] },
};

// noteref/pagebreak text is a label, deferrable by `inlineContextualization`;
// every other placeholder role carries real sentence content and stays inline.
export const deferrablePlaceholderRoles: GndRole[] = ["noteref", "pagebreak"];

// audio/video/image/math fold `node.description` into a labelled/unlabelled
// variant of their own announcement; figure and table fold it into their
// own template too (see the `figure` check in `walkNode()`'s
// contextualization loop for the no-description case). `cover` reuses the
// same labelled/unlabelled treatment as `image`.
export const labelVariantRoles: GndRole[] = ["audio", "video", "image", "math", "cover"];
export const descriptionFoldingRoles: GndRole[] = ["audio", "video", "image", "figure", "math", "table", "cover"];

// cell/rowheader's own contextualization template already embeds the
// cell's text (`{{ value }}`, with or without a `{{ header }}` prefix) —
// so once it fires, the node's own text must not also be spoken, or the
// value is heard twice.
export const valueFoldingRoles: GndRole[] = ["cell", "rowheader"];

// Roles whose subtree carries no content worth speaking, whatever markup an
// author put inside it — only the role's own contextualization, if
// requested, is ever heard.
export const contentlessRoles: GndRole[] = ["separator"];
