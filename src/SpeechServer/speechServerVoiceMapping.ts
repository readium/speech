import { ReadiumSpeechVoice } from "../voices/types";
import { SpeechServerVoice } from "./types";

export function mapServerVoice(voice: SpeechServerVoice): ReadiumSpeechVoice {
  return {
    source: "server",
    label: voice.name,
    name: voice.name,
    originalName: voice.originalName,
    language: voice.language,
    otherLanguages: voice.otherLanguages,
    gender: voice.gender ?? undefined,
    quality: voice.quality,
    provider: voice.provider,
    identifier: voice.identifier,
    controls: voice.controls
  };
}
