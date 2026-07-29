import { ReadiumSpeechEngineProvider } from "../provider";
import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechVoice } from "../voices/types";
import { SpeechServerEngine } from "./speechServerEngine";
import { mapServerVoice } from "./speechServerVoiceMapping";
import { toSpeechServerError } from "./errors";
import { SpeechServerVoice } from "./types";

export interface SpeechServerEngineProviderOptions {
  baseUrl: string;
  fetch?: typeof fetch;
  prefetchWindow?: number;
}

export class SpeechServerEngineProvider implements ReadiumSpeechEngineProvider {
  readonly id: string = "speech-server";
  readonly name: string = "Readium Speech Server";

  private baseUrl: string;
  private fetchImpl: typeof fetch;
  private prefetchWindow: number | undefined;
  private voices: ReadiumSpeechVoice[] = [];

  constructor(options: SpeechServerEngineProviderOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.fetchImpl = options.fetch ?? fetch.bind(globalThis);
    this.prefetchWindow = options.prefetchWindow;
  }

  async getVoices(): Promise<ReadiumSpeechVoice[]> {
    if (this.voices.length > 0) {
      return this.voices;
    }

    const response = await this.fetchImpl(`${this.baseUrl}/voices`);
    if (!response.ok) {
      throw await toSpeechServerError(response);
    }
    const serverVoices: SpeechServerVoice[] = await response.json();
    this.voices = serverVoices.map(mapServerVoice);
    return this.voices;
  }

  async createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine> {
    const engine = new SpeechServerEngine({ baseUrl: this.baseUrl, fetch: this.fetchImpl, prefetchWindow: this.prefetchWindow });
    if (this.voices.length > 0) {
      engine.setAvailableVoices(this.voices);
    }
    if (voice) {
      engine.setVoice(voice);
    }
    return engine;
  }

  async destroy(): Promise<void> {
    this.voices = [];
  }
}
