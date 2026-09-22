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

const segmenters = new Map<string, Intl.Segmenter>();

function segmenterFor(language: string): Intl.Segmenter {
  let segmenter = segmenters.get(language);
  if (!segmenter) {
    segmenter = new Intl.Segmenter(language, { granularity: "sentence" });
    segmenters.set(language, segmenter);
  }
  return segmenter;
}

export async function segmentSentences(
  language: string,
  text: string,
  customSuppressions?: string[]
): Promise<SentenceBoundary[]> {
  if (text === "") return [];
  const segments = [...segmenterFor(language).segment(text)];
  const raw = segments.map((segment) => ({ start: segment.index, end: segment.index + segment.segment.length }));
  // Intl.Segmenter has no abbreviation-suppression concept of its own, so
  // the built-in list (not just a caller's extras) has to be applied here.
  const suppressions = customSuppressions
    ? [...(builtInSuppressions[language] ?? []), ...customSuppressions]
    : (builtInSuppressions[language] ?? []);
  return refineSentenceBoundaries(text, raw, suppressions);
}
