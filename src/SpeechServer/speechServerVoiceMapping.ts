import { ReadiumSpeechVoice, TServerVoiceControls } from "../voices/types.js";
import { SpeechServerServiceInfo, SpeechServerVoice } from "./types.js";

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

// The server's voices, only those of `voiceProviders` when given.
export function mapServerVoices(voices: SpeechServerVoice[], serviceInfo: SpeechServerServiceInfo, voiceProviders?: string[]): ReadiumSpeechVoice[] {
  const providerControls = new Map(serviceInfo.providers.map(p => [p.id, p.controls]));
  return withVoiceProviders(voices.map(voice => mapServerVoice(voice, providerControls.get(voice.provider))), voiceProviders);
}

export function withVoiceProviders(voices: ReadiumSpeechVoice[], voiceProviders?: string[]): ReadiumSpeechVoice[] {
  return voiceProviders ? voices.filter(voice => isOfVoiceProviders(voice, voiceProviders)) : voices;
}

export function isOfVoiceProviders(voice: ReadiumSpeechVoice, voiceProviders?: string[]): boolean {
  return !voiceProviders || (voice.provider !== undefined && voiceProviders.includes(voice.provider));
}
