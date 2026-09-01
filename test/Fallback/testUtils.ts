import type { ReadiumSpeechVoice } from "../../src/voices/types.js";

// A controllable ReadiumSpeechPlaybackEngine and ReadiumSpeechEngineProvider, so swap behavior
// can be driven and inspected without a real engine's network/browser plumbing.

export interface FakeEngineOptions {
  // When true, loadUtterances()/speak() emit "ready"/"start" synchronously, like real
  // WebSpeechEngine does. Default false: speak() defers "start" via setTimeout, like a real
  // network/audio engine would — this is what most tests want, since it exercises the
  // "engine told to speak but not yet playing" window. Tests specifically probing event
  // ordering against a synchronous engine (matching real WebSpeechEngine) should opt in.
  synchronous?: boolean;
}

export class FakeEngine {
  loadUtterancesCalls: any[][] = [];
  loadUtterancesStartIndexCalls: (number | undefined)[] = [];
  speakCalls: (number | undefined)[] = [];
  destroyCalls = 0;

  private readonly synchronous: boolean;
  private listeners = new Map<string, ((event: any) => void)[]>();
  private currentVoice: any = null;
  private currentUtteranceIndex = 0;
  private rate = 1;
  private pitch = 1;
  private volume = 1;
  private speakInContentLanguage = false;
  private state = "idle";

  constructor(options: FakeEngineOptions = {}) {
    this.synchronous = options.synchronous ?? false;
  }

  setCurrentVoiceForTest(voice: any): void {
    this.currentVoice = voice;
  }

  setCurrentUtteranceIndexForTest(index: number): void {
    this.currentUtteranceIndex = index;
  }

  setStateForTest(state: string): void {
    this.state = state;
  }

  async initialize(): Promise<unknown> {
    return undefined;
  }

  loadUtterances(contents: any[], startIndex?: number): void {
    this.loadUtterancesCalls.push(contents);
    this.loadUtterancesStartIndexCalls.push(startIndex);
    this.currentUtteranceIndex = startIndex ?? 0;
    if (this.synchronous) {
      this.state = "ready";
      this.emit("ready"); // mirrors WebSpeechEngine.loadUtterances()'s synchronous "ready" emit
    }
  }

  setVoice(_voice: any): void {}

  getCurrentVoice(): any {
    return this.currentVoice;
  }

  async getAvailableVoices(): Promise<any[]> {
    return [];
  }

  setSpeakInContentLanguage(enabled: boolean): void {
    this.speakInContentLanguage = enabled;
  }

  getSpeakInContentLanguage(): boolean {
    return this.speakInContentLanguage;
  }

  speak(index?: number): void {
    this.speakCalls.push(index);
    this.currentUtteranceIndex = index ?? 0;
    if (this.synchronous) {
      this.state = "playing";
      this.emit("start"); // mirrors WebSpeechEngine.speak()'s synchronous "start" emit
      return;
    }
    this.state = "loading";
    // Playback starts asynchronously, like a real engine — pause() right after speak() is a no-op.
    setTimeout(() => {
      this.state = "playing";
      this.emit("start");
    }, 0);
  }

  pause(): void {
    if (this.state !== "playing") return;
    this.state = "paused";
    this.emit("pause");
  }

  resume(): void {
    if (this.state !== "paused") return;
    this.state = "playing";
    this.emit("resume");
  }

  stop(): void {
    this.state = "idle";
    this.currentUtteranceIndex = 0;
    this.emit("stop");
  }

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

  getState(): string {
    return this.state;
  }

  getCurrentUtteranceIndex(): number {
    return this.currentUtteranceIndex;
  }

  setCurrentUtteranceIndex(index: number, onComplete?: (success: boolean) => void): void {
    this.currentUtteranceIndex = index;
    onComplete?.(true);
  }

  getUtteranceCount(): number {
    return 0;
  }

  on(event: string, callback: (event: any) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
    return () => {
      const listeners = this.listeners.get(event);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
      }
    };
  }

  emit(type: string, detail?: any): void {
    (this.listeners.get(type) ?? []).forEach(callback => callback({ type, detail }));
  }

  async destroy(): Promise<void> {
    this.destroyCalls++;
  }
}

export class FakeFallbackProvider {
  readonly id = "fake-fallback";
  readonly name = "Fake Fallback";

  receivedVoice: any;
  engine: FakeEngine | null = null;
  shouldFail = false;
  engineOptions: FakeEngineOptions = {};
  // Lets a test pause createEngine() mid-flight to interleave other wrapper calls with it.
  createEngineGate: Promise<void> | null = null;
  // Seeded by default so pickBestFallbackVoice()'s language/gender matching has something
  // deterministic to pick from; override per-test to exercise other matches.
  voices: ReadiumSpeechVoice[] = [
    makeReadiumVoice({ name: "French Female", language: "fr-FR", gender: "female", offlineAvailability: true }),
    makeReadiumVoice({ name: "French Male", language: "fr-FR", gender: "male", offlineAvailability: true }),
    makeReadiumVoice({ name: "English Female", language: "en-US", gender: "female", offlineAvailability: true })
  ];

  async getVoices(): Promise<ReadiumSpeechVoice[]> {
    return this.voices;
  }

  async createEngine(voice?: any): Promise<FakeEngine> {
    if (this.createEngineGate) await this.createEngineGate;
    this.receivedVoice = voice;
    if (this.shouldFail) {
      throw new Error("fallback provider unavailable");
    }
    this.engine = new FakeEngine(this.engineOptions);
    return this.engine;
  }

  async destroy(): Promise<void> {}
}

// Simulates the primary provider FallbackSpeechEngine reconnects to on recovery. getVoices()
// re-hits "the network" (never caches) so it doubles as a controllable reachability probe.
export class FakePrimaryProvider {
  readonly id = "fake-primary";
  readonly name = "Fake Primary";

  reachable = true;
  getVoicesCalls = 0;
  receivedVoice: any;
  engine: FakeEngine | null = null;
  shouldFailCreateEngine = false;
  engineOptions: FakeEngineOptions = {};
  // Lets a test pause createEngine() mid-flight to interleave stop()/destroy() with it.
  createEngineGate: Promise<void> | null = null;

  async getVoices(): Promise<any[]> {
    this.getVoicesCalls++;
    if (!this.reachable) {
      throw new Error("primary unreachable");
    }
    return [];
  }

  async createEngine(voice?: any): Promise<FakeEngine> {
    if (this.createEngineGate) await this.createEngineGate;
    this.receivedVoice = voice;
    if (this.shouldFailCreateEngine) {
      throw new Error("primary still unreachable");
    }
    this.engine = new FakeEngine(this.engineOptions);
    return this.engine;
  }

  async destroy(): Promise<void> {}
}

export function makeReadiumVoice(overrides: Partial<ReadiumSpeechVoice> = {}): ReadiumSpeechVoice {
  return {
    source: "browser",
    label: overrides.name ?? "Voice",
    name: overrides.name ?? "Voice",
    originalName: overrides.name ?? "Voice",
    language: overrides.language ?? "en-US",
    ...overrides
  };
}

export async function tick(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 0));
  await new Promise(resolve => setTimeout(resolve, 0));
}

export async function wait(ms: number): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, ms));
}

export function deferred(): { promise: Promise<void>; resolve: () => void } {
  let resolve!: () => void;
  const promise = new Promise<void>(r => { resolve = r; });
  return { promise, resolve };
}

// Stubs navigator.onLine for the duration of one test; returns a restore function.
export function stubOnLine(value: boolean): () => void {
  const original = navigator.onLine;
  Object.defineProperty(navigator, "onLine", { value, configurable: true });
  return () => Object.defineProperty(navigator, "onLine", { value: original, configurable: true });
}
