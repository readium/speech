import test, { type ExecutionContext } from "ava";
import { testWithContext, TestContext, createTestVoice, mockVoices, originalNavigator, originalSpeechSynthesis, mockSpeechSynthesis } from "./setup.js";
import { ReadiumSpeechVoice, WebSpeechVoiceManager } from "../../build/index.js";

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
// getVoices Tests
// =============================================

testWithContext("getVoices: returns all voices when no filters are provided", (t) => {
  const voices = t.context.manager.getVoices();
  t.is(voices.length, mockVoices.length);
});

testWithContext("getVoices: throws if not initialized", (t) => {
  // Create a new instance without initializing
  const manager = new (WebSpeechVoiceManager as any)();
  t.throws(() => manager.getVoices(), { 
    message: "WebSpeechVoiceManager not initialized. Call initialize() first." 
  });
});

testWithContext("getVoices: combines all filters", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  (manager as any).voices = [
    createTestVoice({ name: "Male High Quality English", language: "en-US", gender: "male", quality: "high", provider: "Google", offlineAvailability: true }),
    createTestVoice({ name: "English Female Normal", language: "en-US", gender: "female", quality: "normal", provider: "Microsoft", offlineAvailability: false }),
    createTestVoice({ name: "French Male Low", language: "fr-FR", gender: "male", quality: "low", provider: "Google", offlineAvailability: true }),
    createTestVoice({ name: "French Female High", language: "fr-FR", gender: "female", quality: "high", provider: "Amazon", offlineAvailability: false }),
    createTestVoice({ name: "Spanish Male Normal", language: "es-ES", gender: "male", quality: "normal", provider: "Microsoft", offlineAvailability: true })
  ];
  
  // Test with all filters combined
  const filtered = await manager.getVoices({ 
    languages: ["en", "fr"],
    gender: "male",
    quality: ["high", "normal"],
    provider: "Google",
    offlineOnly: true,
    excludeNovelty: true,
    excludeVeryLowQuality: true
  });
  
  t.is(filtered.length, 1);
  t.true(filtered.every(v => 
    (v.language.startsWith("en") || v.language.startsWith("fr")) &&
    v.gender === "male" &&
    (v.quality?.includes("high") || v.quality?.includes("normal")) &&
    v.provider === "Google" &&
    v.offlineAvailability === true
  ));
});

testWithContext("getVoices: handles empty navigator.languages", async (t) => {
  const manager = t.context.manager;
  
  // Create test voices
  const testVoices = [
    { voiceURI: "voice1", name: "Voice 1", language: "en-US" },
    { voiceURI: "voice2", name: "Voice 2", language: "fr-FR" }
  ];
  
  // Replace the voices in the manager
  (manager as any).voices = testVoices;
  
  // Mock empty navigator.languages
  const originalLanguages = [...(globalThis.navigator as any).languages];
  (globalThis.navigator as any).languages = [];
  
  try {
    const voices = await manager.getVoices();
    
    // Should still return all voices even with empty languages
    t.is(voices.length, 2);
  } finally {
    // Restore original languages
    (globalThis.navigator as any).languages = originalLanguages;
  }
});

testWithContext("getVoices: handles undefined navigator.languages", async (t) => {
  const manager = t.context.manager;
  
  // Create test voices
  const testVoices = [
    { voiceURI: "voice1", name: "Voice 1", language: "en-US" },
    { voiceURI: "voice2", name: "Voice 2", language: "fr-FR" }
  ];
  
  // Replace the voices in the manager
  (manager as any).voices = testVoices;
  
  // Mock undefined navigator.languages
  const originalLanguages = (globalThis.navigator as any).languages;
  delete (globalThis.navigator as any).languages;
  
  try {
    const voices = await manager.getVoices();
    
    // Should still return all voices even with undefined languages
    t.is(voices.length, 2);
  } finally {
    // Restore original languages
    (globalThis.navigator as any).languages = originalLanguages;
  }
});


testWithContext("getVoices: returns empty array when no voices are available", async (t) => {
  // Save the original getVoices implementation
  const originalGetVoices = mockSpeechSynthesis.getVoices;
  
  try {
    // Override getVoices to return empty array
    mockSpeechSynthesis.getVoices = () => [];
    
    // Create a fresh instance to avoid interference from other tests
    (WebSpeechVoiceManager as any).instance = undefined;
    const manager = await WebSpeechVoiceManager.initialize();
    
    // Reset initialization to force re-initialization with empty voices
    (manager as any).initializationPromise = null;
    (manager as any).voices = [];
    (manager as any).browserVoices = [];
    
    // Should return empty array when no voices are available
    const voices = manager.getVoices();
    t.deepEqual(voices, []);
  } finally {
    // Restore original getVoices implementation
    mockSpeechSynthesis.getVoices = originalGetVoices;
  }
});

testWithContext("getVoices: filters by language", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Single language
  let voices = await manager.getVoices({ languages: "en" });
  t.true(voices.length > 0);
  t.true(voices.every((v: ReadiumSpeechVoice) => v.language.startsWith("en")));
  
  // Multiple languages
  voices = await manager.getVoices({ languages: ["en", "fr"] });
  t.true(voices.length > 1);
  t.true(voices.some((v: ReadiumSpeechVoice) => v.language.startsWith("en")));
  t.true(voices.some((v: ReadiumSpeechVoice) => v.language.startsWith("fr")));
});

testWithContext("getVoices: filters by quality", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Mock quality property on voices
  const voices = await manager.getVoices();
  const voicesWithQuality = voices.map((v: ReadiumSpeechVoice, i: number) => ({
    ...v,
    quality: i % 2 === 0 ? "high" : "low"
  }));
  
  // Replace the voices in the manager
  (manager as any).voices = voicesWithQuality;
  
  const highQualityVoices = await manager.getVoices({ quality: "high" });
  t.true(highQualityVoices.length > 0);
  t.true(highQualityVoices.every((v: ReadiumSpeechVoice) => v.quality === "high"));
});

testWithContext("getVoices: returns empty array when speechSynthesis is not available", async (t) => {
  // Save original
  const originalSpeechSynthesis = globalThis.speechSynthesis;
  
  try {
    // Mock speechSynthesis to be undefined
    Object.defineProperty(globalThis, "speechSynthesis", {
      value: undefined,
      configurable: true,
      writable: true
    });
    
    // Create a new instance
    (WebSpeechVoiceManager as any).instance = undefined;
    const manager = await WebSpeechVoiceManager.initialize();
    
    // Should return empty array when speechSynthesis is not available
    const voices = manager.getVoices();
    t.deepEqual(voices, []);
  } finally {
    // Restore
    Object.defineProperty(globalThis, "speechSynthesis", {
      value: originalSpeechSynthesis,
      configurable: true,
      writable: true
    });
  }
});