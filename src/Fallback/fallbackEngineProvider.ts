import { ReadiumSpeechEngineProvider } from "../provider";
import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechVoice } from "../voices/types";
import { FallbackSpeechEngine } from "./fallbackSpeechEngine";

export interface FallbackEngineProviderOptions {
  primary: ReadiumSpeechEngineProvider;
  fallback: ReadiumSpeechEngineProvider;
  onFailure?: "fallback" | "error"; // default "fallback"
}

// Pairs a primary provider with a fallback one. getVoices()/createEngine() fall back immediately
// if the primary is unreachable; createEngine() otherwise returns a FallbackSpeechEngine so a
// later, in-flight failure can still swap. See docs/FallbackEngine.md.
export class FallbackEngineProvider implements ReadiumSpeechEngineProvider {
  readonly id: string = "fallback";
  readonly name: string = "Fallback";

  private readonly primary: ReadiumSpeechEngineProvider;
  private readonly fallback: ReadiumSpeechEngineProvider;
  private readonly onFailure: "fallback" | "error";

  constructor(options: FallbackEngineProviderOptions) {
    this.primary = options.primary;
    this.fallback = options.fallback;
    this.onFailure = options.onFailure ?? "fallback";
  }

  async getVoices(): Promise<ReadiumSpeechVoice[]> {
    try {
      return await this.primary.getVoices();
    } catch (error) {
      if (this.onFailure === "error") {
        throw error;
      }
      return this.fallback.getVoices();
    }
  }

  async createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine> {
    let primaryEngine: ReadiumSpeechPlaybackEngine;
    try {
      primaryEngine = await this.primary.createEngine(voice);
    } catch (error) {
      if (this.onFailure === "error") {
        throw error;
      }
      return this.fallback.createEngine(voice);
    }

    return new FallbackSpeechEngine({ primaryEngine, fallbackProvider: this.fallback, onFailure: this.onFailure });
  }

  async destroy(): Promise<void> {
    await Promise.all([this.primary.destroy(), this.fallback.destroy()]);
  }
}
