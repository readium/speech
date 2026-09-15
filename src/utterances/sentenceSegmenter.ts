export interface SentenceBoundary {
  text: string;
  start: number;
  end: number;
}

interface RawSentenceBoundary {
  text: string;
  // Despite the .d.ts calling these byte indices, they're actually UTF-16
  // code unit indices, usable directly as JS string offsets.
  start_index: number;
  end_index: number;
}

// Dynamic import so bundlers code-split the wasm binary out of the core
// library, instead of shipping it to consumers who never use sentence mode.
let ready: Promise<typeof import("sentencex-wasm")> | undefined;

function ensureReady(): Promise<typeof import("sentencex-wasm")> {
  if (!ready) {
    ready = import("sentencex-wasm").then(async (mod) => {
      await mod.default();
      return mod;
    });
  }
  return ready;
}

export async function segmentSentences(
  language: string,
  text: string
): Promise<SentenceBoundary[]> {
  if (text === "") return [];
  const { get_sentence_boundaries } = await ensureReady();
  const boundaries = get_sentence_boundaries(language, text) as RawSentenceBoundary[];
  return boundaries.map((boundary) => ({
    text: boundary.text,
    start: boundary.start_index,
    end: boundary.end_index,
  }));
}
