import { ReadiumSpeechEngineProvider } from "../provider.js";
import { ReadiumSpeechPlaybackEngine } from "../engine.js";
import { ReadiumSpeechVoice } from "../voices/types.js";
import { getVoiceId } from "../voices/voiceId.js";
import { findVoice, uniqueVoices } from "../voices/voiceLookup.js";
import { settleAll } from "../utils/settleAll.js";
import { RoutingSpeechEngine } from "./routingSpeechEngine.js";

export interface RoutingEngineProviderOptions {
  // In priority order: a voice listed by several providers is spoken by the first.
  providers: ReadiumSpeechEngineProvider[];
}

// Several providers as one, whose engine speaks each utterance with the provider of its voice. See docs/RoutingEngine.md.
export class RoutingEngineProvider implements ReadiumSpeechEngineProvider {
  readonly id: string = "routing";
  readonly name: string = "Routing";

  private readonly providers: ReadiumSpeechEngineProvider[];

  constructor(options: RoutingEngineProviderOptions) {
    if (options.providers.length === 0) throw new Error("RoutingEngineProvider needs at least one provider");
    this.providers = options.providers;
  }

  async getVoices(forceRefresh?: boolean): Promise<ReadiumSpeechVoice[]> {
    const listings = await settleAll(this.providers.map(provider => provider.getVoices(forceRefresh)));
    return uniqueVoices(listings.map(voices => voices ?? []));
  }

  async isAvailable(): Promise<boolean> {
    const available = await Promise.all(this.providers.map(provider => provider.isAvailable?.().catch(() => false)));
    return available.some(Boolean);
  }

  // One engine per provider, a provider whose engine fails left out; `voice` goes to the first provider listing it.
  async createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine> {
    const owner = voice ? await this.ownerOf(voice) : 0;
    const engines = await settleAll(this.providers.map((provider, index) => provider.createEngine(index === owner ? voice : undefined)));
    const created = engines.flatMap((engine, index) => engine ? [{ engine, index }] : []);
    return new RoutingSpeechEngine({
      engines: created.map(({ engine }) => engine),
      currentEngine: Math.max(0, created.findIndex(({ index }) => index === owner))
    });
  }

  async destroy(): Promise<void> {
    await Promise.allSettled(this.providers.map(provider => provider.destroy()));
  }

  // The first provider listing the voice, else the first provider.
  private async ownerOf(voice: ReadiumSpeechVoice | string): Promise<number> {
    const listings = await Promise.all(this.providers.map(provider => provider.getVoices().catch((): ReadiumSpeechVoice[] => [])));
    const listed = findVoice(listings.flat(), typeof voice === "string" ? voice : getVoiceId(voice));
    return Math.max(0, listings.findIndex(voices => listed !== undefined && voices.includes(listed)));
  }
}
