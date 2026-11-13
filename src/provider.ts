import { ReadiumSpeechPlaybackEngine } from "./engine.js";
import { ReadiumSpeechVoice } from "./voices/types.js";

export interface ReadiumSpeechEngineProvider {
  readonly id: string;
  readonly name: string;
  
  // Voice Management
  // forceRefresh bypasses any cache a provider keeps.
  getVoices(forceRefresh?: boolean): Promise<ReadiumSpeechVoice[]>;

  // Whether it can speak again after a recoverable failure; FallbackSpeechEngine only recovers to a primary implementing it.
  isAvailable?(): Promise<boolean>;
  
  // Engine Creation
  createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
  
  // Lifecycle
  destroy(): Promise<void>;
}