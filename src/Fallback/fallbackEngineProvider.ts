import { ReadiumSpeechEngineProvider } from "../provider";
import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechVoice } from "../voices/types";
import { FallbackSpeechEngine } from "./fallbackSpeechEngine";

export interface FallbackEngineProviderOptions {
  primary: ReadiumSpeechEngineProvider;
  fallback: ReadiumSpeechEngineProvider;
  onFailure?: "fallback" | "error" | "fallbackAndRecover"; // default "fallback"
  // Only used when onFailure is "fallbackAndRecover". Default 30000.
  healthCheckIntervalMs?: number;
}

// Pairs a primary provider with a fallback one. getVoices()/createEngine() fall back immediately
// if the primary is unreachable; createEngine() otherwise returns a FallbackSpeechEngine so a
// later, in-flight failure can still swap. See docs/FallbackEngine.md.
export class FallbackEngineProvider implements ReadiumSpeechEngineProvider {
  readonly id: string = "fallback";
  readonly name: string = "Fallback";

  private readonly primary: ReadiumSpeechEngineProvider;
  private readonly fallback: ReadiumSpeechEngineProvider;
  private readonly onFailure: "fallback" | "error" | "fallbackAndRecover";
  private readonly healthCheckIntervalMs?: number;

  constructor(options: FallbackEngineProviderOptions) {
    this.primary = options.primary;
    this.fallback = options.fallback;
    this.onFailure = options.onFailure ?? "fallback";
    this.healthCheckIntervalMs = options.healthCheckIntervalMs;
  }

  async getVoices(forceRefresh?: boolean): Promise<ReadiumSpeechVoice[]> {
    try {
      return await this.primary.getVoices(forceRefresh);
    } catch (error) {
      if (this.onFailure === "error") {
        throw error;
      }
      return this.fallback.getVoices(forceRefresh);
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

    return new FallbackSpeechEngine({
      primaryEngine,
      primaryProvider: this.primary,
      fallbackProvider: this.fallback,
      onFailure: this.onFailure,
      healthCheckIntervalMs: this.healthCheckIntervalMs
    });
  }

  async destroy(): Promise<void> {
    await Promise.all([this.primary.destroy(), this.fallback.destroy()]);
  }
}
