import { type ExecutionContext } from "ava";
import { testWithContext, TestContext } from "./setup.js";
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
// getTestUtterance Tests
// =============================================

testWithContext("getTestUtterance: returns test utterance for supported language", (t) => {
  const manager = t.context.manager;
  
  // Test with a base language
  const utterance1 = manager.getTestUtterance("en");
  t.is(typeof utterance1, "string");
  t.true(utterance1 && utterance1.length > 0);
  
  // Test with a locale variant (should fall back to base language)
  const utterance2 = manager.getTestUtterance("en-US");
  t.is(typeof utterance2, "string");
  t.true(utterance2 && utterance2.length > 0);
  t.is(utterance1, utterance2); // Should be the same
});

testWithContext("getTestUtterance: returns empty string for unsupported language", (t) => {
  const manager = t.context.manager;
  
  // Test with an unsupported language
  const utterance = manager.getTestUtterance("xx-XX");
  t.is(utterance, "");
});