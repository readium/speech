// A controllable ReadiumSpeechPlaybackEngine and ReadiumSpeechEngineProvider, so swap behavior
// can be driven and inspected without a real engine's network/browser plumbing.

export class FakeEngine {
  loadUtterancesCalls: any[][] = [];
  speakCalls: (number | undefined)[] = [];
  destroyCalls = 0;

  private listeners = new Map<string, ((event: any) => void)[]>();
  private currentVoice: any = null;
  private currentUtteranceIndex = 0;
  private rate = 1;
  private pitch = 1;
  private volume = 1;
  private speakInContentLanguage = false;

  setCurrentVoiceForTest(voice: any): void {
    this.currentVoice = voice;
  }

  setCurrentUtteranceIndexForTest(index: number): void {
    this.currentUtteranceIndex = index;
  }

  async initialize(): Promise<unknown> {
    return undefined;
  }

  loadUtterances(contents: any[]): void {
    this.loadUtterancesCalls.push(contents);
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
  }

  pause(): void {}
  resume(): void {}
  stop(): void {}

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
    return "idle";
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

  async getVoices(): Promise<any[]> {
    return [];
  }

  async createEngine(voice?: any): Promise<FakeEngine> {
    this.receivedVoice = voice;
    if (this.shouldFail) {
      throw new Error("fallback provider unavailable");
    }
    this.engine = new FakeEngine();
    return this.engine;
  }

  async destroy(): Promise<void> {}
}

export function makeReadiumVoice(overrides: Record<string, any> = {}) {
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
