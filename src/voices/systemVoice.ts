import type { ReadiumSpeechVoice } from "./types.js";
import { getVoiceId } from "./voiceId.js";

export const SYSTEM_VOICE_ID = "readium:system-voice";

/**
 * Speaks with the system's Spoken Content voice, Siri voices included, which Safari uses only
 * when an utterance has no voice. Its language can't be known, so it's never picked by language.
 */
export const systemVoice = (): ReadiumSpeechVoice => ({
  source: "browser",
  label: "System voice",
  name: SYSTEM_VOICE_ID,
  originalName: SYSTEM_VOICE_ID,
  voiceURI: SYSTEM_VOICE_ID,
  language: "und",
  browser: ["Safari"],
  os: ["iOS", "iPadOS", "macOS"]
});

export const isSystemVoice = (voice: ReadiumSpeechVoice | string): boolean =>
  (typeof voice === "string" ? voice : getVoiceId(voice)) === SYSTEM_VOICE_ID;
