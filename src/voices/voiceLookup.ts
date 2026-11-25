import type { ReadiumSpeechVoice } from "./types.js";
import { getVoiceId } from "./voiceId.js";

// Matched by id, else by name, as engines match an utterance's voice.
export const findVoice = (voices: Iterable<ReadiumSpeechVoice>, id: string): ReadiumSpeechVoice | undefined => {
  const all = [...voices];
  return all.find(voice => getVoiceId(voice) === id) ?? all.find(voice => voice.name === id);
};

// The listings' voices, a voice listed by several once, as the first lists it.
export const uniqueVoices = (listings: ReadiumSpeechVoice[][]): ReadiumSpeechVoice[] => {
  const voices = new Map<string, ReadiumSpeechVoice>();
  listings.flat().forEach(voice => {
    const id = getVoiceId(voice);
    if (!voices.has(id)) voices.set(id, voice);
  });
  return [...voices.values()];
};
