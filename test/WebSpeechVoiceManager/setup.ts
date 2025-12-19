import test, { type ExecutionContext } from "ava";
import { WebSpeechVoiceManager, ReadiumSpeechVoice } from "../../build/index.js";

// =============================================
// Mock Data and Helpers
// =============================================

// Mock DisplayNames for testing
class MockDisplayNames {
  options: any;
  constructor(_: any, options: any) {
    this.options = options;
  }
  
  of(code: string): string {
    if (this.options.type === "language") {
      return `${code.toUpperCase()}_LANG`;
    }
    if (this.options.type === "region") {
      return `${code.toUpperCase()}_REGION`;
    }
    return code;
  }
  
  static supportedLocalesOf(locales: string[]): string[] {
    return locales;
  }
}

// Mock Intl.DisplayNames
if (typeof (globalThis as any).Intl === "undefined") {
  (globalThis as any).Intl = {};
}
(globalThis as any).Intl.DisplayNames = MockDisplayNames as any;

// =============================================
// Test Context Type
// =============================================

export interface TestContext {
  manager: WebSpeechVoiceManager;
}

// =============================================
// Test Setup Types
// =============================================

export type TestFn = (t: ExecutionContext<TestContext>) => void | Promise<void>;
export const testWithContext = test as unknown as {
  (name: string, fn: TestFn): void;
  afterEach: {
    always: (fn: (t: ExecutionContext<TestContext>) => void | Promise<void>) => void;
  };
  beforeEach: (fn: (t: ExecutionContext<TestContext>) => void | Promise<void>) => void;
};

// =============================================
// Helper Functions
// =============================================

// Helper function to create test voice objects that match ReadiumSpeechVoice interface
export function createTestVoice(overrides: Partial<ReadiumSpeechVoice> = {}): ReadiumSpeechVoice {
  return {
    source: "json",
    label: overrides.name || "Test Voice",
    name: overrides.name || "Test Voice",
    originalName: overrides.originalName || "Test Voice",
    voiceURI: `voice-${overrides.name || "test"}`,
    language: "en-US",
    ...overrides
  };
}

// =============================================
// Mock Data
// =============================================

// Default mock voices for testing
export const mockVoices = [
  {
    voiceURI: "voice1",
    name: "Voice 1",
    lang: "en-US",
    localService: true,
    default: true
  },
  {
    voiceURI: "voice2",
    name: "Voice 2",
    lang: "fr-FR",
    localService: true,
    default: false
  },
  {
    voiceURI: "voice3",
    name: "Voice 3",
    lang: "es-ES",
    localService: true,
    default: false
  },
  {
    voiceURI: "voice4",
    name: "Voice 4",
    lang: "de-DE",
    localService: true,
    default: false
  },
  {
    voiceURI: "voice5",
    name: "Voice 5",
    lang: "it-IT",
    localService: true,
    default: false
  }
];

// =============================================
// Global Mock Setup
// =============================================

// Store original globals
export const originalNavigator = globalThis.navigator;
export const originalSpeechSynthesis = globalThis.speechSynthesis;

// Set up global mocks before any tests run
if (typeof globalThis.window === "undefined") {
  (globalThis as any).window = globalThis;
}

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
export const mockSpeechSynthesis = {
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
// Test Hooks
// =============================================

export const testHooks = {
  beforeEach: async (t: ExecutionContext<TestContext>) => {
    // Reset singleton instance
    (WebSpeechVoiceManager as any).instance = undefined;
    (WebSpeechVoiceManager as any).initializationPromise = null;
    
    // Initialize and store the manager
    t.context.manager = await WebSpeechVoiceManager.initialize();
  },
  
  afterEach: (t: ExecutionContext<TestContext>) => {
    // Clean up singleton instance
    (WebSpeechVoiceManager as any).instance = undefined;
    (WebSpeechVoiceManager as any).initializationPromise = null;
  }
};
