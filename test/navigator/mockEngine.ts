import type { ReadiumSpeechPlaybackEngine } from "../../src/engine.js";
import type { ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../../src/navigator.js";
import type { ReadiumSpeechUtterance } from "../../src/utterance.js";
import type { ReadiumSpeechVoice } from "../../src/voices/types.js";

// Minimal in-memory ReadiumSpeechPlaybackEngine — enough for
// ReadiumSpeechNavigator's own logic (content loading, preferences,
// end-of-utterance sequencing) without a real speech backend.
export class MockEngine implements ReadiumSpeechPlaybackEngine {
  loadedUtterances: ReadiumSpeechUtterance[] = [];
  speakCalls: number[] = [];
  private index = 0;
  private listeners = new Map<ReadiumSpeechPlaybackEvent["type"], ((event: ReadiumSpeechPlaybackEvent) => void)[]>();

  loadUtterances(contents: ReadiumSpeechUtterance[]): void {
    this.loadedUtterances = contents;
    this.index = 0;
  }

  setVoice(): void {}
  getCurrentVoice(): ReadiumSpeechVoice | null {
    return null;
  }
  async getAvailableVoices(): Promise<ReadiumSpeechVoice[]> {
    return [];
  }
  setSpeakInContentLanguage(): void {}
  getSpeakInContentLanguage(): boolean {
    return false;
  }

  speak(utteranceIndex?: number): void {
    if (utteranceIndex !== undefined) this.index = utteranceIndex;
    this.speakCalls.push(Date.now());
  }
  pause(): void {}
  resume(): void {}
  stop(): void {}

  rate = 1;
  pitch = 1;
  volume = 1;

  setRate(rate: number): void {
    this.rate = rate;
  }
  getRate(): number {
    return this.rate;
  }
  setPitch(pitch: number): void {
    this.pitch = pitch;
  }
  getPitch(): number {
    return this.pitch;
  }
  setVolume(volume: number): void {
    this.volume = volume;
  }
  getVolume(): number {
    return this.volume;
  }

  getState(): ReadiumSpeechPlaybackState {
    return "idle";
  }
  getCurrentUtteranceIndex(): number {
    return this.index;
  }
  setCurrentUtteranceIndex(index: number, onComplete?: (success: boolean) => void): void {
    this.index = index;
    onComplete?.(true);
  }
  getUtteranceCount(): number {
    return this.loadedUtterances.length;
  }

  on(event: ReadiumSpeechPlaybackEvent["type"], callback: (event: ReadiumSpeechPlaybackEvent) => void): () => void {
    const list = this.listeners.get(event) ?? [];
    list.push(callback);
    this.listeners.set(event, list);
    return () => {
      this.listeners.set(event, (this.listeners.get(event) ?? []).filter((cb) => cb !== callback));
    };
  }

  emit(event: ReadiumSpeechPlaybackEvent): void {
    for (const cb of this.listeners.get(event.type) ?? []) cb(event);
  }

  async destroy(): Promise<void> {}
}
