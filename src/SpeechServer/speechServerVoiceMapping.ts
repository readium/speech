import { ReadiumSpeechVoice, TServerVoiceControls } from "../voices/types";
import { SpeechServerVoice } from "./types";

// `controls` isn't sent per voice — it's a provider-wide default from `GET /service`,
// merged in here so each voice still reports what it actually honors.
export function mapServerVoice(voice: SpeechServerVoice, providerControls?: TServerVoiceControls): ReadiumSpeechVoice {
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
    controls: providerControls
  };
}
