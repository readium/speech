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
// systemLocale Tests
// =============================================

testWithContext("systemLocale: initializes with first navigator.language", async (t) => {
  // Store original state
  const originalNavigator = globalThis.navigator;
  const originalInstance = (WebSpeechVoiceManager as any).instance;
  const originalInitPromise = (WebSpeechVoiceManager as any).initializationPromise;
  
  try {
    // Ensure speechSynthesis mock is available on globalThis
    if (!globalThis.speechSynthesis) {
      Object.defineProperty(globalThis, 'speechSynthesis', {
        value: mockSpeechSynthesis,
        configurable: true,
        writable: true
      });
    }
    
    // Create a new navigator object with test languages
    const testNavigator = {
      ...originalNavigator,
      languages: ["fr-FR", "en-US"]
    };
    
    // Override the global navigator
    Object.defineProperty(globalThis, 'navigator', {
      value: testNavigator,
      configurable: true,
      writable: true
    });
    
    // Reset singleton to test fresh initialization
    (WebSpeechVoiceManager as any).instance = undefined;
    (WebSpeechVoiceManager as any).initializationPromise = null;
    
    // Test initialization with the modified navigator.languages
    const manager = await WebSpeechVoiceManager.initialize(1000, 10);
    
    // Verify systemLocale is set to the first language code from navigator.languages
    t.is((manager as any).systemLocale, "fr");
    
  } finally {
    // Restore original state
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      configurable: true,
      writable: true
    });
    
    (WebSpeechVoiceManager as any).instance = originalInstance;
    (WebSpeechVoiceManager as any).initializationPromise = originalInitPromise;
  }
});

testWithContext("systemLocale: updates with quality indicators from voices", async (t) => {
  const manager = t.context.manager;
  
  // Create test voices with actual quality indicators for English
  const testVoices = [
    { 
      voiceURI: "test-voice-1", 
      name: "Test Voice (Enhanced)",  // Matches English normal quality indicator
      lang: "en-US" 
    },
    { 
      voiceURI: "test-voice-2", 
      name: "Test Voice (Premium)",   // Matches English high quality indicator
      lang: "en-US" 
    },
  ];
  
  // Call updateSystemLocale with test voices
  await (manager as any).updateSystemLocale(testVoices);
  
  // System locale should be updated to 'en' since we have English quality indicators
  t.is((manager as any).systemLocale, "en",
       "System locale should update when quality indicators are found in voice names");
});

testWithContext("systemLocale: falls back to navigator.language when no quality indicators found", async (t) => {
  const manager = t.context.manager;
  const originalLocale = (manager as any).systemLocale;
  
  // Create test voices without any quality indicators
  const testVoices = [
    { 
      voiceURI: "test-voice-1", 
      name: "Random Voice 1",  // No quality indicators
      lang: "en-US" 
    },
    { 
      voiceURI: "test-voice-2", 
      name: "Random Voice 2",  // No quality indicators
      lang: "en-US" 
    },
  ];
  
  // Call updateSystemLocale with test voices
  await (manager as any).updateSystemLocale(testVoices);
  
  // System locale should remain unchanged
  t.is((manager as any).systemLocale, originalLocale,
       "System locale should not change when no quality indicators are found");
});