import type { ReadiumSpeechVoice } from "./types.js";

// A voice has boundary events unless its controls say it has none.
export const hasBoundaryEvents = (voice: ReadiumSpeechVoice): boolean => voice.controls?.boundary !== false;

// The voices passing `test`, else all of them, rather than no candidates at all.
export const preferMatching = (voices: ReadiumSpeechVoice[], test: (voice: ReadiumSpeechVoice) => boolean): ReadiumSpeechVoice[] => {
  const matches = voices.filter(test);
  return matches.length > 0 ? matches : voices;
};
