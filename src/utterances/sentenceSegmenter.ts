import { segmentText } from "@echogarden/text-segmentation";

export interface SentenceBoundary {
  text: string;
  start: number;
  end: number;
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
  return result.sentences.map((sentence) => ({
    text: sentence.text,
    start: sentence.charRange.start,
    end: sentence.charRange.end,
  }));
}
