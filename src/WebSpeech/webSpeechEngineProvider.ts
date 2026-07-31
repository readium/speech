import { ReadiumSpeechEngineProvider } from "../provider";
import { ReadiumSpeechPlaybackEngine } from "../engine";
import { ReadiumSpeechVoice } from "../voices/types";
import { WebSpeechEngine } from "./webSpeechEngine";

export class WebSpeechEngineProvider implements ReadiumSpeechEngineProvider {
  readonly id: string = "webspeech";
  readonly name: string = "Web Speech API";

  private voiceEngine: WebSpeechEngine | null = null;

  async getVoices(): Promise<ReadiumSpeechVoice[]> {
    if (!this.voiceEngine) {
      this.voiceEngine = new WebSpeechEngine();
      await this.voiceEngine.initialize();
    }
    return this.voiceEngine.getAvailableVoices();
  }

  async createEngine(voice?: ReadiumSpeechVoice | string): Promise<ReadiumSpeechPlaybackEngine> {
    const engine = new WebSpeechEngine();
    await engine.initialize();
    if (voice) {
      await engine.setVoice(voice);
    }
    return engine;
  }

  async destroy(): Promise<void> {
    if (this.voiceEngine) {
      await this.voiceEngine.destroy();
      this.voiceEngine = null;
    }
  }
}
