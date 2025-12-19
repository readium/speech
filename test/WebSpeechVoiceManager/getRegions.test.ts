import test, { type ExecutionContext } from "ava";
import { testWithContext, TestContext, originalNavigator, originalSpeechSynthesis, mockSpeechSynthesis } from "./setup.js";
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
