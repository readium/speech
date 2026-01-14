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
// groupVoices Tests
// =============================================

testWithContext("groupVoices: groups by language", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different languages
  const testVoices = [
    { voiceURI: "voice1", name: "Voice 1", language: "en-US" },
    { voiceURI: "voice2", name: "Voice 2", language: "fr-FR" },
    { voiceURI: "voice3", name: "Voice 3", language: "en-US" }
  ];
  
  const groups = (manager as any).groupVoices("languages", testVoices);
  
  // Check that groups were created for each language
  t.truthy(groups["en"]);
  t.truthy(groups["fr"]);
  
  // Check the number of voices in each group
  t.is(groups["en"].length, 2);
  t.is(groups["fr"].length, 1);
});

testWithContext("groupVoices: groups by gender", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different genders
  const testVoices = [
    createTestVoice({ name: "Male Voice 1", language: "en-US", gender: "male" }),
    createTestVoice({ name: "Female Voice 1", language: "en-US", gender: "female" }),
    createTestVoice({ name: "Male Voice 2", language: "fr-FR", gender: "male" }),
    createTestVoice({ name: "Unknown Voice", language: "es-ES" })
  ];
  
  const groups = manager.groupVoices("gender", testVoices);
  t.true(groups.hasOwnProperty("male"));
  t.true(groups.hasOwnProperty("female"));
  t.true(groups.hasOwnProperty("unknown"));
  t.is(groups.male.length, 2);
  t.is(groups.female.length, 1);
  t.is(groups.unknown.length, 1);
});

testWithContext("groupVoices: groups by quality", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different qualities
  const testVoices = [
    createTestVoice({ name: "High Quality 1", language: "en-US", quality: "high" }),
    createTestVoice({ name: "Low Quality Voice", language: "en-US", quality: "low" }),
    createTestVoice({ name: "High Quality 2", language: "fr-FR", quality: "high" })
  ];
  
  const groups = manager.groupVoices("quality", testVoices);
  t.is(Object.keys(groups).length, 2);
  t.is(groups.high.length, 2);
  t.is(groups.low.length, 1);
});

testWithContext("groupVoices: groups by region", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different regions
  const testVoices = [
    createTestVoice({ name: "US Voice", language: "en-US" }),
    createTestVoice({ name: "UK Voice", language: "en-GB" }),
    createTestVoice({ name: "Canada Voice", language: "en-CA" }),
    createTestVoice({ name: "Australia Voice", language: "en-AU" })
  ];
  
  const groups = manager.groupVoices("region", testVoices);
  t.is(Object.keys(groups).length, 4);
  t.is(groups.US.length, 1);
  t.is(groups.GB.length, 1);
  t.is(groups.CA.length, 1);
  t.is(groups.AU.length, 1);
});

testWithContext("groupVoices: handles empty voices array", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  const groups = manager.groupVoices("languages", []);
  t.deepEqual(groups, {});
});

testWithContext("groupVoices: handles voices with missing properties", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  const testVoices = [
    createTestVoice({ name: "Voice 1", language: "en-US", gender: "female" }),
    createTestVoice({ name: "Voice 2", language: undefined as any }),
    createTestVoice({ name: "Voice 3", language: "fr-FR", gender: undefined as any }),
    createTestVoice({ name: "Voice 4", language: "es-ES", quality: "high" })
  ];
  
  // Should handle missing properties gracefully
  const groupsByLanguage = manager.groupVoices("languages", testVoices);
  t.true(groupsByLanguage.hasOwnProperty("en"));
  t.true(groupsByLanguage.hasOwnProperty("fr"));
  t.true(groupsByLanguage.hasOwnProperty("es"));
  
  const groupsByGender = manager.groupVoices("gender", testVoices);
  // Should have an "unknown" group for voices without gender
  t.true(groupsByGender.hasOwnProperty("unknown"));
  t.is(groupsByGender.unknown.length, 3); // Voice 2, Voice 3, Voice 4 have no gender
  
  const groupsByQuality = manager.groupVoices("quality", testVoices);
  // Should have an "unknown" group for voices without quality
  t.true(groupsByQuality.hasOwnProperty("unknown"));
  t.is(groupsByQuality.unknown.length, 3); // Voice 2, Voice 3, Voice 4 have no quality
});