import type { ReadiumSpeechVoice } from "./types.js";

// What `ReadiumSpeechUtterance.voice` and the `voice` preference take for a voice
export const getVoiceId = (voice: ReadiumSpeechVoice): string => voice.voiceURI ?? voice.identifier ?? voice.name;
