import type { ReadiumSpeechVoice } from "./types.js";

// Unknown connectivity (unimplemented navigator.onLine) counts as offline, not as online.
export function isVoiceReachable(voice: ReadiumSpeechVoice): boolean {
  return voice.offlineAvailability === true || (typeof navigator !== "undefined" && navigator.onLine === true);
}
