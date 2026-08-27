import { ReadiumSpeechPlaybackEngine } from "./engine";
import { ReadiumSpeechVoice } from "./voices/types";

export interface ReadiumSpeechEngineProvider {
  readonly id: string;
  readonly name: string;
  
  // Voice Management
  // forceRefresh bypasses any cache a provider keeps, so callers that need a live reachability
  // check (e.g. FallbackSpeechEngine's health check) don't get a stale result.
  getVoices(forceRefresh?: boolean): Promise<ReadiumSpeechVoice[]>;
  
  // Engine Creation
  createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
  
  // Lifecycle
  destroy(): Promise<void>;
}