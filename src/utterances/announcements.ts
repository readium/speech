import type { Announcements } from "./types.js";

// Default English announcement catalog, one entry per GND role (see
// `roles.md`: https://github.com/readium/guided-navigation/blob/main/roles.md).
// See `Announcements` in `./types.js` for what a role's entry shape
// (absent / a plain string / a `{start, end}` pair) means, and the rule
// deciding which shape a given role gets, derived from that role's own
// roles.md definition.
//
// `footnote` gets a `{start, end}` pair like any other collection/section
// role — even though, unlike the others, it's read out of narrative order
// (reached from a `noteref` elsewhere in the text, handled specially in
// `extractUtterances.ts`), the announcement catalog itself doesn't need to
// know that; it just says what to speak entering/leaving it.
//
// `glossref`, `biblioref`, `backlink`, and `noteref` itself have no entry:
// they're references *to* a location, not a location of their own, and
// (like `noteref`) their own visible text is a visual marker only.
//
// Callers can override or extend any subset of these keys via
// `ExtractUtterancesOptions.announcements`, e.g. once localized catalogs
// (Weblate-sourced) become available.
export const defaultAnnouncements: Announcements = {
  // Collections / sections with their own substructure — start/end pairs.
  footnote: { start: "Start of the footnote.", end: "End of the footnote." },
  part: { start: "Start of the part.", end: "End of the part." },
  chapter: { start: "Start of the chapter.", end: "End of the chapter." },
  prologue: { start: "Start of the prologue.", end: "End of the prologue." },
  preface: { start: "Start of the preface.", end: "End of the preface." },
  introduction: { start: "Start of the introduction.", end: "End of the introduction." },
  conclusion: { start: "Start of the conclusion.", end: "End of the conclusion." },
  epilogue: { start: "Start of the epilogue.", end: "End of the epilogue." },
  afterword: { start: "Start of the afterword.", end: "End of the afterword." },
  appendix: { start: "Start of the appendix.", end: "End of the appendix." },
  acknowledgments: { start: "Start of the acknowledgments.", end: "End of the acknowledgments." },
  endnotes: { start: "Start of the endnotes.", end: "End of the endnotes." },
  glossary: { start: "Start of the glossary.", end: "End of the glossary." },
  bibliography: { start: "Start of the bibliography.", end: "End of the bibliography." },
  index: { start: "Start of the index.", end: "End of the index." },
  toc: { start: "Start of the table of contents.", end: "End of the table of contents." },
  pagelist: { start: "Start of the page list.", end: "End of the page list." },
  landmarks: { start: "Start of the landmarks.", end: "End of the landmarks." },
  loa: { start: "Start of the list of audio clips.", end: "End of the list of audio clips." },
  loi: { start: "Start of the list of illustrations.", end: "End of the list of illustrations." },
  lot: { start: "Start of the list of tables.", end: "End of the list of tables." },
  lov: { start: "Start of the list of video clips.", end: "End of the list of video clips." },
  qna: { start: "Start of the questions and answers.", end: "End of the questions and answers." },
  table: { start: "Start of the table.", end: "End of the table." },
  figure: { start: "Start of the figure.", end: "End of the figure." },
  aside: { start: "Start of the aside.", end: "End of the aside." },
  details: { start: "Start of the details.", end: "End of the details." },
  credits: { start: "Start of the credits.", end: "End of the credits." },

  // Single, self-contained pieces of content — one announcement each.
  pagebreak: "Pagebreak.",
  heading1: "Heading level 1.",
  heading2: "Heading level 2.",
  heading3: "Heading level 3.",
  heading4: "Heading level 4.",
  heading5: "Heading level 5.",
  heading6: "Heading level 6.",
  subtitle: "Subtitle.",
  epigraph: "Epigraph.",
  abstract: "Abstract.",
  colophon: "Colophon.",
  dedication: "Dedication.",
  cover: "Cover.",
  errata: "Errata.",
  notice: "Notice.",
  example: "Example.",
  tip: "Tip.",
  pullquote: "Pull quote.",
  credit: "Credit.",
  image: "Image.",
  audio: "Audio.",
  video: "Video.",
};
