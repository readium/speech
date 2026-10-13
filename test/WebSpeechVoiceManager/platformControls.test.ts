import { type ExecutionContext } from "ava";
import { testWithContext, TestContext, mockSpeechSynthesis } from "./setup.js";
import { WebSpeechVoiceManager } from "../../build/index.js";

// =============================================
// Test Hooks
// =============================================

testWithContext.beforeEach(async (t) => {
  // Reset singleton instance
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;

  // Initialize and store the manager
  t.context.manager = await WebSpeechVoiceManager.initialize();
});

testWithContext.afterEach.always((t: ExecutionContext<TestContext>) => {
  // Clean up singleton instance
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;
});

// =============================================
// Platform Controls Tests
// =============================================

testWithContext("platform controls: voices report no boundary events on Android", async (t) => {
  // Store original state
  const originalNavigator = globalThis.navigator;
  const originalInstance = (WebSpeechVoiceManager as any).instance;
  const originalInitPromise = (WebSpeechVoiceManager as any).initializationPromise;

  try {
    // Ensure speechSynthesis mock is available on globalThis
    if (!globalThis.speechSynthesis) {
      Object.defineProperty(globalThis, "speechSynthesis", {
        value: mockSpeechSynthesis,
        configurable: true,
        writable: true
      });
    }

    // Create a new navigator object with an Android user agent
    const testNavigator = {
      ...originalNavigator,
      languages: originalNavigator.languages,
      userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36"
    };

    // Override the global navigator
    Object.defineProperty(globalThis, "navigator", {
      value: testNavigator,
      configurable: true,
      writable: true
    });

    // Reset singleton to test fresh initialization
    (WebSpeechVoiceManager as any).instance = undefined;
    (WebSpeechVoiceManager as any).initializationPromise = null;

    const manager = await WebSpeechVoiceManager.initialize({
      maxTimeout: 1000,
      interval: 10
    });
    const voices = manager.getVoices();

    // Verify every voice reports no boundary events
    t.true(voices.length > 0);
    t.true(voices.every(voice => voice.controls?.boundary === false));

  } finally {
    // Restore original state
    Object.defineProperty(globalThis, "navigator", {
      value: originalNavigator,
      configurable: true,
      writable: true
    });

    (WebSpeechVoiceManager as any).instance = originalInstance;
    (WebSpeechVoiceManager as any).initializationPromise = originalInitPromise;
  }
});

testWithContext("platform controls: unmatched voices report no controls elsewhere", (t) => {
  const voices = t.context.manager.getVoices().filter(voice => voice.source === "browser");

  // Verify voices missing from the JSON keep the default controls
  t.true(voices.length > 0);
  t.true(voices.every(voice => voice.controls === undefined));
});
