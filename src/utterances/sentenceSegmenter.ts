import { entriesForLanguage, extractLangRegionFromBCP47 } from "../utils/language.js";
import { builtInSuppressions } from "./builtInSuppressions.js";
import { refineSentenceBoundaries } from "./sentenceBoundaryMerge.js";

export interface SentenceBoundary {
  text: string;
  start: number;
  // Raw end from the segmenter, which reaches through the separating
  // whitespace up to the next sentence — kept only so callers that need to
  // walk the source contiguously (e.g. splitting SSML at the same points)
  // can still do so.
  end: number;
  // End of `text` itself: start + text.length, with no trailing separator.
  // Offsets should use this, not `end`.
  contentEnd: number;
}

export type SentenceSegmenter = (
  language: string,
  text: string,
  customSuppressions?: string[]
) => Promise<SentenceBoundary[]>;

// Each with the language its suppressions are looked up in: the given one, or English when it falls back.
const segmenters = new Map<string, { segmenter: Intl.Segmenter; language: string }>();

function segmenterFor(language: string): { segmenter: Intl.Segmenter; language: string } {
  let entry = segmenters.get(language);
  if (!entry) {
    // Not normalizeLanguageCode(): it maps Chinese to voice codes, and its module needs Vite's import.meta.glob.
    // Intl.Segmenter throws on a malformed tag (e.g. "en_US"): normalized, else English like content without a language.
    try {
      const [base, region] = extractLangRegionFromBCP47(language);
      const tag = region ? `${base}-${region}` : base;
      entry = { segmenter: new Intl.Segmenter(tag, { granularity: "sentence" }), language };
    } catch {
      entry = { segmenter: new Intl.Segmenter("en", { granularity: "sentence" }), language: "en" };
    }
    segmenters.set(language, entry);
  }
  return entry;
}

// The language suppressions for `language` are looked up in, built-in or the caller's.
export function suppressionLanguage(language: string): string {
  return segmenterFor(language).language;
}

export async function segmentSentences(
  language: string,
  text: string,
  customSuppressions?: string[]
): Promise<SentenceBoundary[]> {
  if (text === "") return [];
  const { segmenter, language: segmenterLanguage } = segmenterFor(language);
  const segments = [...segmenter.segment(text)];
  const raw = segments.map((segment) => ({ start: segment.index, end: segment.index + segment.segment.length }));
  // Intl.Segmenter has no abbreviation-suppression concept of its own, so
  // the built-in list (not just a caller's extras) has to be applied here.
  const builtIn = entriesForLanguage(builtInSuppressions, segmenterLanguage) ?? [];
  const suppressions = customSuppressions ? [...builtIn, ...customSuppressions] : builtIn;
  return refineSentenceBoundaries(text, raw, suppressions);
}
