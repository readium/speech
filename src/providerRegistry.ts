import { ReadiumSpeechEngineProvider } from "./provider";
import { ReadiumSpeechPlaybackEngine } from "./engine";
import { ReadiumSpeechVoice } from "./voices/types";

export interface ReadiumSpeechProviderVoices {
  providerId: string;
  voices: ReadiumSpeechVoice[];
}

// A voice's own `provider` field already means something else per source
// (e.g. speech-server's backend id, "pocket", not the registry id "speech-server";
// unset for WebSpeech). So voices are never flattened across providers here —
// callers that want one merged list do that themselves, keeping track of which
// group (providerId) a picked voice came from.
export class ReadiumSpeechProviderRegistry {
  private providers: Map<string, ReadiumSpeechEngineProvider> = new Map();

  register(provider: ReadiumSpeechEngineProvider): void {
    if (this.providers.has(provider.id)) {
      throw new Error(`A provider is already registered under id "${provider.id}"`);
    }
    this.providers.set(provider.id, provider);
  }

  unregister(providerId: string): void {
    this.providers.delete(providerId);
  }

  get(providerId: string): ReadiumSpeechEngineProvider | undefined {
    return this.providers.get(providerId);
  }

  list(): ReadiumSpeechEngineProvider[] {
    return [...this.providers.values()];
  }

  async getVoices(providerId: string): Promise<ReadiumSpeechVoice[]> {
    return this.require(providerId).getVoices();
  }

  async getAllVoices(): Promise<ReadiumSpeechProviderVoices[]> {
    return Promise.all(
      this.list().map(async (provider) => ({
        providerId: provider.id,
        voices: await provider.getVoices()
      }))
    );
  }

  async createEngine(providerId: string, voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine> {
    return this.require(providerId).createEngine(voice);
  }

  async destroy(): Promise<void> {
    await Promise.all(this.list().map((provider) => provider.destroy()));
    this.providers.clear();
  }

  private require(providerId: string): ReadiumSpeechEngineProvider {
    const provider = this.providers.get(providerId);
    if (!provider) {
      throw new Error(`No provider registered under id "${providerId}"`);
    }
    return provider;
  }
}
