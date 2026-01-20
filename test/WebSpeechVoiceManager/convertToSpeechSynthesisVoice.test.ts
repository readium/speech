import { type ExecutionContext } from "ava";
import { testWithContext, TestContext, createTestVoice } from "./setup.js";
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
// convertToSpeechSynthesisVoice Tests
// =============================================

testWithContext("convertToSpeechSynthesisVoice: converts ReadiumSpeechVoice to SpeechSynthesisVoice", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  const voices = await manager.getVoices();
  t.plan(3);
  
  if (voices.length > 0) {
    const speechVoice = manager.convertToSpeechSynthesisVoice(voices[0]);
    t.truthy(speechVoice);
    t.is(speechVoice?.name, voices[0].name);
    t.is(speechVoice?.voiceURI, voices[0].voiceURI);
  } else {
    t.pass("No voices available to test");
  }
});

testWithContext("convertToSpeechSynthesisVoice: handles undefined voiceURI", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  const voices = await manager.getVoices();
  
  if (voices.length > 0) {
    // Create a test voice with undefined voiceURI but with name and originalName
    const testVoice = {
      ...voices[0],
      voiceURI: undefined,
      name: "Test Voice",
      originalName: "Test Voice (Original)"
    };
    
    // Mock browserVoices to include a matching voice by name
    const mockBrowserVoice = {
      voiceURI: "mock-voice-uri",
      name: "Test Voice (Original)",
      lang: "en-US",
      localService: true,
      default: false
    };
    
    // Save original browserVoices and replace with our mock
    const originalBrowserVoices = (manager as any).browserVoices;
    (manager as any).browserVoices = [mockBrowserVoice];
    
    try {
      const result = manager.convertToSpeechSynthesisVoice(testVoice);
      t.truthy(result, "Should return a voice when matching by original name");
      t.is(result?.name, "Test Voice (Original)", "Should match by original name when voiceURI is undefined");
    } finally {
      // Restore original browserVoices
      (manager as any).browserVoices = originalBrowserVoices;
    }
  } else {
    t.pass("No voices available to test");
  }
});

testWithContext("convertToSpeechSynthesisVoice: handles undefined voiceURI and originalName", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  const voices = await manager.getVoices();
  
  if (voices.length > 0) {
    // Create a test voice with undefined voiceURI  and originalName
    const testVoice = {
      ...voices[0],
      voiceURI: undefined,
      name: "Test Voice",
      originalName: undefined
    };
    
    // Mock browserVoices to include a matching voice by name
    const mockBrowserVoice = {
      voiceURI: "mock-voice-uri",
      name: "Test Voice (Original)",
      lang: "en-US",
      localService: true,
      default: false
    };
    
    // Save original browserVoices and replace with our mock
    const originalBrowserVoices = (manager as any).browserVoices;
    (manager as any).browserVoices = [mockBrowserVoice];
    
    try {
      const result = manager.convertToSpeechSynthesisVoice(testVoice as any);
      t.truthy(result, "Should return a voice when matching by original name");
      t.is(result?.name, "Test Voice (Original)", "Should match by name when voiceURI and Original name are undefined");
    } finally {
      // Restore original browserVoices
      (manager as any).browserVoices = originalBrowserVoices;
    }
  } else {
    t.pass("No voices available to test");
  }
});

testWithContext("convertToSpeechSynthesisVoice: handles invalid voice", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Test with undefined voice
  const result1 = manager.convertToSpeechSynthesisVoice(undefined as any);
  t.is(result1, undefined);
  
  // Test with voice that doesn't match any browser voice
  const invalidVoice = createTestVoice({ name: "Non-existent Voice", language: "xx-XX" });
  const result2 = manager.convertToSpeechSynthesisVoice(invalidVoice);
  t.is(result2, undefined);
});