import test, { type ExecutionContext } from "ava";
import { testWithContext, TestContext, originalNavigator, originalSpeechSynthesis, mockSpeechSynthesis, createTestVoice } from "./setup.js";
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
// getRegions Tests
// =============================================

testWithContext("getRegions: returns available regions with counts", async (t: ExecutionContext<TestContext>) => {
  const regions = await t.context.manager.getRegions();
  t.true(Array.isArray(regions));
  
  // Check that we have at least one region
  t.true(regions.length > 0);
  
  // Check structure of region entries
  for (const region of regions) {
    t.truthy(region.code);
    t.truthy(region.label);
    t.true(typeof region.count === "number");
  }
});

testWithContext("getRegions: handles empty voices array", async (t: ExecutionContext<TestContext>) => {
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
    
    const regions = await manager.getRegions();
    t.true(Array.isArray(regions));
    t.is(regions.length, 0);
    
  } finally {
    // Restore original getVoices
    mockSpeechSynthesis.getVoices = originalGetVoices;
  }
});

testWithContext("getRegions: works with provided voices array", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create custom voices with different regions using the helper
  const customVoices = [
    createTestVoice({
      name: "Custom Voice 1",
      language: "en-US",
      voiceURI: "custom-voice-1"
    }),
    createTestVoice({
      name: "Custom Voice 2",
      language: "en-GB", 
      voiceURI: "custom-voice-2"
    }),
    createTestVoice({
      name: "Custom Voice 3",
      language: "fr-FR",
      voiceURI: "custom-voice-3"
    })
  ];
  
  // Test with provided voices
  const regions = manager.getRegions(undefined, undefined, customVoices);
  
  t.is(regions.length, 3, "Should return 3 regions");
  
  const usRegion = regions.find((r: any) => r.code === "US");
  const gbRegion = regions.find((r: any) => r.code === "GB");
  const frRegion = regions.find((r: any) => r.code === "FR");
  
  t.is(usRegion?.count, 1, "Should have 1 US voice");
  t.is(gbRegion?.count, 1, "Should have 1 GB voice");
  t.is(frRegion?.count, 1, "Should have 1 FR voice");
  t.truthy(usRegion?.label, "Should have US label");
  t.truthy(gbRegion?.label, "Should have GB label");
  t.truthy(frRegion?.label, "Should have FR label");
});

testWithContext("getRegions: handles voices without regions", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create custom voices without regions (just language codes) using the helper
  const customVoices = [
    createTestVoice({
      name: "Custom Voice 1",
      language: "en",
      voiceURI: "custom-voice-1"
    }),
    createTestVoice({
      name: "Custom Voice 2",
      language: "fr",
      voiceURI: "custom-voice-2"
    })
  ];
  
  // Test with provided voices (no regions should be extracted)
  const regions = manager.getRegions(undefined, undefined, customVoices);
  
  t.is(regions.length, 0, "Should return 0 regions when no region codes present");
});
