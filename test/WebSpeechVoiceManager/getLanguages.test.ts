import { type ExecutionContext } from "ava";
import { testWithContext, TestContext, mockSpeechSynthesis, createTestVoice } from "./setup.js";
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
// getLanguages Tests
// =============================================

testWithContext("getLanguages: returns available languages with counts", async (t: ExecutionContext<TestContext>) => {
  const languages = await t.context.manager.getLanguages();
  t.true(Array.isArray(languages));
  
  // Check that we have at least one language
  t.true(languages.length > 0);
  
  // Check structure of language entries
  for (const lang of languages) {
    t.truthy(lang.code);
    t.truthy(lang.label);
    t.true(typeof lang.count === "number");
  }
});

testWithContext("getLanguages: handles empty voices array", async (t: ExecutionContext<TestContext>) => {
  // Save the original getVoices implementation
  const originalGetVoices = mockSpeechSynthesis.getVoices;
  
  try {
    // Override getVoices to return empty array
    mockSpeechSynthesis.getVoices = () => [];
    
    // Create a fresh instance to avoid interference
    (WebSpeechVoiceManager as any).instance = undefined;
    const manager = await WebSpeechVoiceManager.initialize();
    
    // Reset initialization to force re-initialization with empty voices
    (manager as any).initializationPromise = null;
    (manager as any).voices = [];
    (manager as any).browserVoices = [];
    
    const languages = manager.getLanguages();
    t.deepEqual(languages, []);
  } finally {
    // Restore original getVoices implementation
    mockSpeechSynthesis.getVoices = originalGetVoices;
  }
});

testWithContext("getLanguages: works with provided voices array", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create custom voices using the helper
  const customVoices = [
    createTestVoice({
      name: "Custom Voice 1",
      language: "en-US",
      voiceURI: "custom-voice-1"
    }),
    createTestVoice({
      name: "Custom Voice 2", 
      language: "fr-FR",
      voiceURI: "custom-voice-2"
    })
  ];
  
  // Test with provided voices
  const languages = manager.getLanguages(undefined, undefined, customVoices);
  
  t.is(languages.length, 2, "Should return 2 languages");
  
  const englishLang = languages.find((l: any) => l.code === "en");
  const frenchLang = languages.find((l: any) => l.code === "fr");
  
  t.is(englishLang?.count, 1, "Should have 1 English voice");
  t.is(frenchLang?.count, 1, "Should have 1 French voice");
  t.truthy(englishLang?.label, "Should have English label");
  t.truthy(frenchLang?.label, "Should have French label");
});

testWithContext("getLanguages: works with provided voices and filters", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create custom voices with different qualities
  const customVoices = [
    createTestVoice({
      name: "Custom Voice 1",
      language: "en-US",
      voiceURI: "custom-voice-1",
      quality: "normal"
    }),
    createTestVoice({
      name: "Custom Voice 2",
      language: "en-US", 
      voiceURI: "custom-voice-2",
      quality: "low"
    })
  ];
  
  // Test with provided voices and quality filter
  const languages = manager.getLanguages(undefined, { quality: ["normal", "high"] }, customVoices);
  
  t.is(languages.length, 1, "Should return 1 language after filtering");
  t.is(languages[0].count, 1, "Should have 1 voice after filtering");
  t.is(languages[0].code, "en", "Should be English language");
});