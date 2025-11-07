import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechNavigator, ReadiumSpeechPlaybackEvent, ReadiumSpeechPlaybackState } from "../navigator";
import { ReadiumSpeechUtterance } from "../utterance";
import { ReadiumSpeechVoice } from "../voices";
import { WebSpeechEngine } from "./webSpeechEngine";

export class WebSpeechReadAloudNavigator implements ReadiumSpeechNavigator {
  private engine: ReadiumSpeechPlaybackEngine;
  private contentQueue: ReadiumSpeechUtterance[] = [];
  private eventListeners: Map<ReadiumSpeechPlaybackEvent["type"] | "contentchange", ((event: ReadiumSpeechPlaybackEvent) => void)[]> = new Map();

  // Navigator owns the state, not the engine
  private navigatorState: ReadiumSpeechPlaybackState = "idle";

  constructor(engine?: ReadiumSpeechPlaybackEngine) {
    this.engine = engine || new WebSpeechEngine();
    this.setupEngineListeners();
    this.initializeEngine();
  }

  private async initializeEngine(): Promise<void> {
    if (this.engine instanceof WebSpeechEngine) {
      try {
        await this.engine.initialize();
      } catch (error) {
        console.warn("Failed to initialize WebSpeechEngine:", error);
      }
    }
  }

  private setupEngineListeners(): void {
    // Bridge engine events to navigator state management
    this.engine.on("start", () => {
      this.setNavigatorState("playing");
      this.emitEvent({ type: "start" });
    });

    this.engine.on("end", () => {
      const currentIndex = this.engine.getCurrentUtteranceIndex();
      const totalCount = this.engine.getUtteranceCount();

      if (currentIndex < totalCount - 1) {
        // Navigator handles continuous playback
        this.engine.speak(currentIndex + 1);
      } else {
        // Reached end - set navigator to idle
        this.setNavigatorState("idle");
      }
      
      this.emitEvent({ type: "end" });
    });

    this.engine.on("pause", () => {
      this.setNavigatorState("paused");
      this.emitEvent({ type: "pause" });
    });

    this.engine.on("resume", () => {
      this.setNavigatorState("playing");
      this.emitEvent({ type: "resume" });
    });

    this.engine.on("stop", () => {
      this.setNavigatorState("idle");
      this.emitEvent({ type: "stop" });
    });

    this.engine.on("error", (event) => {
      this.setNavigatorState("idle");
      this.emitEvent(event);
    });

    this.engine.on("ready", () => {
      if (this.contentQueue.length > 0) {
        this.setNavigatorState("ready");
        this.emitEvent({ type: "ready" });
      }
    });

    this.engine.on("boundary", (event) => {
      this.emitEvent(event);
    });

    this.engine.on("mark", (event) => {
      this.emitEvent(event);
    });

    this.engine.on("voiceschanged", () => {
      this.emitEvent({ type: "voiceschanged" });
    });
  }

  private setNavigatorState(state: ReadiumSpeechPlaybackState): void {
    this.navigatorState = state;
  }

  // Voice Management
  async getVoices(): Promise<ReadiumSpeechVoice[]> {
    return this.engine.getAvailableVoices();
  }

  async setVoice(voice: ReadiumSpeechVoice | string): Promise<void> {
    this.engine.setVoice(voice);
  }

  getCurrentVoice(): ReadiumSpeechVoice | null {
    return this.engine.getCurrentVoice();
  }

  // Content Management
  loadContent(content: ReadiumSpeechUtterance | ReadiumSpeechUtterance[]): void {
    const contents = Array.isArray(content) ? content : [content];
    this.contentQueue = [...contents];

    // Load utterances first
    this.engine.loadUtterances(contents);

    // Then set navigator state to ready
    this.setNavigatorState("ready");
    this.emitContentChangeEvent({ content: contents });
  }

  getCurrentContent(): ReadiumSpeechUtterance | null {
    const index = this.getCurrentUtteranceIndex();
    return index < this.contentQueue.length ? this.contentQueue[index] : null;
  }

  getContentQueue(): ReadiumSpeechUtterance[] {
    return [...this.contentQueue];
  }

  private getCurrentUtteranceIndex(): number {
    return this.engine.getCurrentUtteranceIndex();
  }

  // Playback Control - Navigator coordinates engine operations
  async play(): Promise<void> {
    if (this.navigatorState === "paused") {
      // Resume from pause
      this.setNavigatorState("playing");
      this.engine.resume();
    } else if (this.navigatorState === "ready" || this.navigatorState === "idle") {
      // Start playing from beginning
      this.setNavigatorState("playing");
      this.engine.speak();
    } else if (this.navigatorState === "playing") {
      // Already playing, do nothing or restart
      return;
    }
  }

  pause(): void {
    if (this.navigatorState === "playing") {
      this.setNavigatorState("paused");
      this.engine.pause();
    }
  }

  stop(): void {
    this.setNavigatorState("idle");
    this.engine.stop();  // Reset engine index first
    this.emitEvent({ type: "stop" });  // Then emit event for UI update
  }

  async togglePlayPause(): Promise<void> {
    if (this.navigatorState === "playing") {
      this.pause();
    } else {
      await this.play();
    }
  }

  // Navigation - Navigator coordinates with proper state management
  async next(): Promise<boolean> {
    const currentIndex = this.getCurrentUtteranceIndex();
    const totalCount = this.engine.getUtteranceCount();

    if (currentIndex < totalCount - 1) {
      this.engine.speak(currentIndex + 1);
      return true;
    }
    return false;
  }

  async previous(): Promise<boolean> {
    const currentIndex = this.getCurrentUtteranceIndex();

    if (currentIndex > 0) {
      this.engine.speak(currentIndex - 1);
      return true;
    }
    return false;
  }

  jumpTo(utteranceIndex: number): void {
    if (utteranceIndex >= 0 && utteranceIndex < this.contentQueue.length) {
      this.engine.speak(utteranceIndex);
    }
  }

  // Playback Parameters
  setRate(rate: number): void {
    this.engine.setRate(rate);
  }

  setPitch(pitch: number): void {
    this.engine.setPitch(pitch);
  }

  setVolume(volume: number): void {
    this.engine.setVolume(volume);
  }

  // State - Navigator is the single source of truth
  getState(): ReadiumSpeechPlaybackState {
    return this.navigatorState;
  }

  // Events
  on(event: ReadiumSpeechPlaybackEvent["type"] | "contentchange", listener: (event: ReadiumSpeechPlaybackEvent) => void): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(listener);

    return () => {
      const listeners = this.eventListeners.get(event);
      if (listeners) {
        const index = listeners.indexOf(listener);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    };
  }

  private emitEvent(event: ReadiumSpeechPlaybackEvent): void {
    const listeners = this.eventListeners.get(event.type);
    if (listeners) {
      listeners.forEach(callback => callback(event));
    }
  }

  private emitContentChangeEvent(event: { content: ReadiumSpeechUtterance[] }): void {
    const listeners = this.eventListeners.get("contentchange");
    if (listeners) {
      listeners.forEach(callback => callback({ type: "contentchange", detail: event } as unknown as ReadiumSpeechPlaybackEvent));
    }
  }

  async destroy(): Promise<void> {
    this.eventListeners.clear();
    await this.engine.destroy();
  }
}