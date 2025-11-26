import { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "./navigator";
import { ReadiumSpeechUtterance } from "./utterance";
import { ReadiumSpeechVoice } from "./voices";

export interface ReadiumSpeechPlaybackEngine {
  // Queue Management
  loadUtterances(contents: ReadiumSpeechUtterance[]): void;
  
  // Voice Configuration
  setVoice(voice: ReadiumSpeechVoice | string): void;
  getCurrentVoice(): ReadiumSpeechVoice | null;
  getAvailableVoices(): Promise<ReadiumSpeechVoice[]>;
  
  // Playback Control
  speak(utteranceIndex?: number): void;
  pause(): void;
  resume(): void;
  stop(): void;
  
  // Playback Parameters
  setRate(rate: number): void;
  getRate(): number;
  setPitch(pitch: number): void;
  getPitch(): number;
  setVolume(volume: number): void;
  getVolume(): number;
  
  // State
  getState(): ReadiumSpeechPlaybackState;
  getCurrentUtteranceIndex(): number;
  setCurrentUtteranceIndex(index: number, onComplete?: (success: boolean) => void): void;
  getUtteranceCount(): number;
  
  // Events
  on(
    event: ReadiumSpeechPlaybackEvent["type"],
    callback: (event: ReadiumSpeechPlaybackEvent) => void
  ): () => void;
  
  // Cleanup
  destroy(): Promise<void>;
}