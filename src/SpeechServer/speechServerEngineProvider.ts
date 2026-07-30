import { ReadiumSpeechEngineProvider } from "../provider";
import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechVoice } from "../voices/types";
import { SpeechServerEngine, SpeechServerEngineOptions } from "./speechServerEngine";
import { mapServerVoice } from "./speechServerVoiceMapping";
import { toSpeechServerError } from "./errors";
import { SpeechServerVoice } from "./types";

// Reuses SpeechServerEngineOptions wholesale (not a hand-picked subset) so every option the
// engine accepts is also available through the provider, with nothing to keep in sync.
export type SpeechServerEngineProviderOptions = SpeechServerEngineOptions;

export class SpeechServerEngineProvider implements ReadiumSpeechEngineProvider {
  readonly id: string = "speech-server";
  readonly name: string = "Readium Speech Server";

  private options: SpeechServerEngineProviderOptions;
  private fetchImpl: typeof fetch;
  private voices: ReadiumSpeechVoice[] = [];

  constructor(options: SpeechServerEngineProviderOptions) {
    this.options = options;
    this.fetchImpl = options.fetch ?? fetch.bind(globalThis);
  }

  async getVoices(): Promise<ReadiumSpeechVoice[]> {
    if (this.voices.length > 0) {
      return this.voices;
    }

    const response = await this.fetchImpl(this.options.endpoints.voices);
    if (!response.ok) {
      throw await toSpeechServerError(response);
    }
    const serverVoices: SpeechServerVoice[] = await response.json();
    this.voices = serverVoices.map(mapServerVoice);
    return this.voices;
  }

  async createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine> {
    const engine = new SpeechServerEngine(this.options);
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
