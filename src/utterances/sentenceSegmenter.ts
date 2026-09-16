import { segmentText } from "@echogarden/text-segmentation";

export interface SentenceBoundary {
  text: string;
  start: number;
  // Raw end from the library, which reaches through the separating
  // whitespace up to the next sentence — kept only so callers that need to
  // walk the source contiguously (e.g. splitting SSML at the same points)
  // can still do so.
  end: number;
  // End of `text` itself: start + text.length, with no trailing separator.
  // Offsets should use this, not `end`.
  contentEnd: number;
}

export async function segmentSentences(
  language: string,
  text: string,
  customSuppressions?: string[]
): Promise<SentenceBoundary[]> {
  if (text === "") return [];
  // East Asian postprocessing needs the optional (27 MB) ICU wasm peer
  // package we don't install — sentence splitting doesn't need it anyway.
  const result = await segmentText(text, { language, enableEastAsianPostprocessing: false, customSuppressions });
  return result.sentences.map((sentence) => {
    const trimmed = sentence.text.trimEnd();
    return {
      text: trimmed,
      start: sentence.charRange.start,
      end: sentence.charRange.end,
      contentEnd: sentence.charRange.start + trimmed.length,
    };
  });
}
