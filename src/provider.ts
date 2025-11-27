import { ReadiumSpeechPlaybackEngine } from "./engine";
import { ReadiumSpeechVoice } from "./voices/data/types";

export interface ReadiumSpeechEngineProvider {
  readonly id: string;
  readonly name: string;
  
  // Voice Management
  getVoices(): Promise<ReadiumSpeechVoice[]>;
  
  // Engine Creation
  createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine>;
  
  // Lifecycle
  destroy(): Promise<void>;
}