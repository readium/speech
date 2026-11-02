import { WebSpeechVoiceManager } from "../../build/index.js";

// =============================================
// Mock Web Speech API
// =============================================
// WebSpeechEngine needs a fuller speechSynthesis mock than the
// WebSpeechVoiceManager test suite's (speak/cancel/pause/resume, plus a
// SpeechSynthesisUtterance constructor) since it actually drives playback.

export class MockUtterance {
  text: string;
  voice: any = null;
  lang = "";
  rate = 1;
  pitch = 1;
  volume = 1;
  onstart: (() => void) | null = null;
  onend: (() => void) | null = null;
  onerror: ((e: any) => void) | null = null;
  onpause: (() => void) | null = null;
  onresume: (() => void) | null = null;
  onboundary: ((e: any) => void) | null = null;
  onmark: ((e: any) => void) | null = null;

  constructor(text: string) {
    this.text = text;
  }
}

export function createMockSpeechSynthesis(mockVoices: any[]) {
  const spoken: MockUtterance[] = [];
  const synth = {
    speaking: false,
    paused: false,
    onvoiceschanged: null as (() => void) | null,
    getVoices: () => mockVoices,
    speak: (utterance: MockUtterance) => {
      spoken.push(utterance);
      synth.speaking = true;
      // Simulate the utterance completing asynchronously, like a real engine would.
      queueMicrotask(() => {
        utterance.onstart?.();
        queueMicrotask(() => {
          synth.speaking = false;
          utterance.onend?.();
        });
      });
    },
    cancel: () => {
      synth.speaking = false;
    },
    pause: () => {
      synth.paused = true;
    },
    resume: () => {
      synth.paused = false;
    },
    addEventListener: () => {},
    removeEventListener: () => {}
  };
  return { synth, spoken };
}

export function setGlobals(mockVoices: any[]) {
  if (typeof (globalThis as any).window === "undefined") {
    (globalThis as any).window = globalThis;
  }
  (globalThis as any).window.SpeechSynthesisUtterance = MockUtterance;
  const { synth, spoken } = createMockSpeechSynthesis(mockVoices);
  (globalThis as any).window.speechSynthesis = synth;
  return { synth, spoken };
}

export function makeVoice(lang: string, name: string) {
  return { voiceURI: `${name}-${lang}`, name, lang, localService: true, default: false };
}

export const mockVoices = [
  makeVoice("en-US", "English Voice"),
  makeVoice("fr-FR", "French Voice"),
  makeVoice("fr-CA", "French Canadian Voice")
];

export function resetVoiceManager() {
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;
}
