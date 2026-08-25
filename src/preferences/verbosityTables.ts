import type { GndRole } from "../gnd/types.js";
import type { VerbosityPreset } from "./SpeechPreferences.js";

// Per-role skip/contextualize behavior at each verbosity preset. Both
// tables are monotonic, but each level's set is listed explicitly rather
// than derived from a threshold, for direct auditability.

const few: readonly GndRole[] = ["audio", "figure", "image", "math", "table", "video"];

const some: readonly GndRole[] = [
  ...few,
  "blockquote",
  "chapter",
  "cover",
  "details",
  "notice",
  "part",
  "preformatted",
  "qna",
  "row",
  "rowheader",
  "subtitle",
  "tip",
];

const most: readonly GndRole[] = [
  ...some,
  "abstract",
  "acknowledgments",
  "afterword",
  "appendix",
  "aside",
  "backlink",
  "bibliography",
  "biblioref",
  "caption",
  "colophon",
  "complementary",
  "conclusion",
  "credit",
  "credits",
  "dedication",
  "definition",
  "endnotes",
  "epigraph",
  "epilogue",
  "errata",
  "example",
  "footnote",
  "foreword",
  "glossary",
  "glossref",
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "heading5",
  "heading6",
  "index",
  "introduction",
  "list",
  "listItem",
  "noteref",
  "pagebreak",
  "pagelist",
  "preface",
  "prologue",
  "pullquote",
  "separator",
  "summary",
  "term",
];

// Roles a reader may choose to skip, at each verbosity level — a few
// (`toc`, `landmarks`, ...) stay skipped even at "most".
export const skippableAtVerbosity: Readonly<Record<Exclude<VerbosityPreset, "custom">, ReadonlySet<GndRole>>> = {
  none: new Set([
    "aside", "bibliography", "endnotes", "footnote", "noteref", "pullquote", "pagebreak",
    "details", "columnheader", "rowheader", "row", "cell",
    "audio", "image", "figure", "video", "table",
    "landmarks", "loa", "loi", "lot", "lov", "toc",
  ]),
  few: new Set([
    "aside", "bibliography", "endnotes", "footnote", "noteref", "pullquote", "pagebreak",
    "details", "columnheader", "rowheader", "row", "cell",
    "landmarks", "loa", "loi", "lot", "lov", "toc",
  ]),
  some: new Set([
    "aside", "bibliography", "columnheader", "endnotes", "footnote", "noteref", "pullquote", "pagebreak",
    "landmarks", "loa", "loi", "lot", "lov", "toc",
  ]),
  most: new Set(["columnheader", "landmarks", "loa", "loi", "lot", "lov", "toc"]),
};

// Roles contextualized (their announcement fires) at each verbosity level.
export const contextualizedAtVerbosity: Readonly<Record<Exclude<VerbosityPreset, "custom">, ReadonlySet<GndRole>>> = {
  none: new Set(),
  few: new Set(few),
  some: new Set(some),
  most: new Set(most),
};
