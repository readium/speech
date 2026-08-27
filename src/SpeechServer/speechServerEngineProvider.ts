import { ReadiumSpeechEngineProvider } from "../provider";
import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechVoice } from "../voices/types";
import { SpeechServerEngine, SpeechServerEngineOptions } from "./speechServerEngine";
import { mapServerVoice } from "./speechServerVoiceMapping";
import { toSpeechServerError } from "./errors";
import { SpeechServerServiceInfo, SpeechServerVoice } from "./types";

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

  async getVoices(forceRefresh?: boolean): Promise<ReadiumSpeechVoice[]> {
    if (this.voices.length > 0 && !forceRefresh) {
      return this.voices;
    }

    const [response, serviceResponse] = await Promise.all([
      this.fetchImpl(this.options.endpoints.voices),
      this.fetchImpl(this.options.endpoints.service)
    ]);
    if (!response.ok) {
      throw await toSpeechServerError(response);
    }
    if (!serviceResponse.ok) {
      throw await toSpeechServerError(serviceResponse);
    }
    const serverVoices: SpeechServerVoice[] = await response.json();
    const serviceInfo: SpeechServerServiceInfo = await serviceResponse.json();
    const providerControls = new Map(serviceInfo.providers.map(p => [p.id, p.controls]));
    this.voices = serverVoices.map(voice => mapServerVoice(voice, providerControls.get(voice.provider)));
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
