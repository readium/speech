import test from "ava";
import { WebSpeechVoiceManager } from "../build/index.js";

// Set up global mocks before any tests run
if (typeof globalThis.window === "undefined") {
  (globalThis as any).window = globalThis;
}

// Mock the global objects
const originalNavigator = globalThis.navigator;

// Mock the global objects
Object.defineProperty(globalThis, "navigator", {
  value: {
    ...originalNavigator,
    languages: ["en-US", "fr-FR"]
  },
  configurable: true,
  writable: true
});

// Create a mock speechSynthesis object that matches the browser's API
const mockVoices = [
  {
    voiceURI: "singleton-voice-1",
    name: "Singleton Test Voice 1",
    lang: "en-US",
    localService: true,
    default: true
  },
  {
    voiceURI: "singleton-voice-2",
    name: "Singleton Test Voice 2",
    lang: "fr-FR",
    localService: true,
    default: false
  }
];

const mockSpeechSynthesis = {
  getVoices: () => mockVoices,
  onvoiceschanged: null as (() => void) | null,
  addEventListener: function(event: string, callback: () => void) {
    if (event === "voiceschanged") {
      this.onvoiceschanged = callback;
    }
  },
  removeEventListener: function(event: string) {
  },
  _triggerVoicesChanged: function() {
    if (this.onvoiceschanged) {
      this.onvoiceschanged();
    }
  }
};

// Mock the window.speechSynthesis to return our mock voices
Object.defineProperty(globalThis.window, "speechSynthesis", {
  value: mockSpeechSynthesis,
  configurable: true,
  writable: true
});

// =============================================
// Singleton Tests
// =============================================

test("initialize: returns singleton instance", async (t) => {
  const instance1 = await WebSpeechVoiceManager.initialize();
  const instance2 = await WebSpeechVoiceManager.initialize();
  t.is(instance1, instance2);
});
