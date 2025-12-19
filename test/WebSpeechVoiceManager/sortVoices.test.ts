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
// sortVoices Tests
// =============================================

testWithContext("sortVoices: sorts by name", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices
  const testVoices = [
    createTestVoice({ name: "Zeta Voice", language: "en-US" }),
    createTestVoice({ name: "Alpha Voice", language: "en-US" }),
    createTestVoice({ name: "Beta Voice", language: "en-US" })
  ];
  
  // Test ascending order
  const sortedAsc = manager.sortVoices(testVoices, { by: "name", order: "asc" });
  t.is(sortedAsc[0].name, "Alpha Voice");
  t.is(sortedAsc[1].name, "Beta Voice");
  t.is(sortedAsc[2].name, "Zeta Voice");
  
  // Test descending order
  const sortedDesc = manager.sortVoices(testVoices, { by: "name", order: "desc" });
  t.is(sortedDesc[0].name, "Zeta Voice");
  t.is(sortedDesc[1].name, "Beta Voice");
  t.is(sortedDesc[2].name, "Alpha Voice");
});

testWithContext("sortVoices: sorts by quality with proper direction", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different quality levels
  const testVoices = [
    createTestVoice({ name: "High Quality Voice", language: "en-US", quality: "high" }),
    createTestVoice({ name: "Low Quality Voice", language: "en-US", quality: "low" }),
    createTestVoice({ name: "Normal Quality Voice", language: "en-US", quality: "normal" }),
    createTestVoice({ name: "Very High Quality Voice", language: "en-US", quality: "veryHigh" }),
    createTestVoice({ name: "Very Low Quality Voice", language: "en-US", quality: "veryLow" })
  ];
  
  // Test ascending order (low to high quality)
  const sortedAsc = manager.sortVoices(testVoices, { by: "quality", order: "asc" });
  t.is(sortedAsc[0].quality, "veryLow");
  t.is(sortedAsc[1].quality, "low");
  t.is(sortedAsc[2].quality, "normal");
  t.is(sortedAsc[3].quality, "high");
  t.is(sortedAsc[4].quality, "veryHigh");
  
  // Test descending order (high to low quality)
  const sortedDesc = manager.sortVoices(testVoices, { by: "quality", order: "desc" });
  t.is(sortedDesc[0].quality, "veryHigh");
  t.is(sortedDesc[1].quality, "high");
  t.is(sortedDesc[2].quality, "normal");
  t.is(sortedDesc[3].quality, "low");
  t.is(sortedDesc[4].quality, "veryLow");
});

testWithContext("sortVoices: sorts by language", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different languages
  const testVoices = [
    createTestVoice({ name: "French Voice", language: "fr-FR" }),
    createTestVoice({ name: "English Voice", language: "en-US" }),
    createTestVoice({ name: "Spanish Voice", language: "es-ES" }),
    createTestVoice({ name: "German Voice", language: "de-DE" })
  ];
  
  // Test ascending order
  const sortedAsc = manager.sortVoices(testVoices, { by: "language", order: "asc" });
  t.is(sortedAsc[0].language, "de-DE");
  t.is(sortedAsc[1].language, "en-US");
  t.is(sortedAsc[2].language, "es-ES");
  t.is(sortedAsc[3].language, "fr-FR");
  
  // Test descending order
  const sortedDesc = manager.sortVoices(testVoices, { by: "language", order: "desc" });
  t.is(sortedDesc[0].language, "fr-FR");
  t.is(sortedDesc[1].language, "es-ES");
  t.is(sortedDesc[2].language, "en-US");
  t.is(sortedDesc[3].language, "de-DE");
});

testWithContext("sortVoices: sorts by gender", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different genders
  const testVoices = [
    createTestVoice({ name: "Female Voice 1", language: "en-US", gender: "female" }),
    createTestVoice({ name: "Male Voice 1", language: "en-US", gender: "male" }),
    createTestVoice({ name: "Unknown Voice", language: "en-US" }),
    createTestVoice({ name: "Female Voice 2", language: "en-US", gender: "female" })
  ];
  
  // Test ascending order (undefined should come first, then female, then male)
  const sortedAsc = manager.sortVoices(testVoices, { by: "gender", order: "asc" });
  t.is(sortedAsc[0].gender, undefined);
  t.is(sortedAsc[1].gender, "female");
  t.is(sortedAsc[2].gender, "female");
  t.is(sortedAsc[3].gender, "male");
  
  // Test descending order (male should come first, then female, then undefined)
  const sortedDesc = manager.sortVoices(testVoices, { by: "gender", order: "desc" });
  t.is(sortedDesc[0].gender, "male");
  t.is(sortedDesc[1].gender, "female");
  t.is(sortedDesc[2].gender, "female");
  t.is(sortedDesc[3].gender, undefined);
});

testWithContext("sortVoices: sorts by region", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different regions
  const testVoices = [
    createTestVoice({ name: "US Voice", language: "en-US" }),
    createTestVoice({ name: "UK Voice", language: "en-GB" }),
    createTestVoice({ name: "Canada Voice", language: "en-CA" }),
    createTestVoice({ name: "Australia Voice", language: "en-AU" })
  ];
  
  // Test ascending order
  const sortedAsc = manager.sortVoices(testVoices, { by: "region", order: "asc" });
  t.is(sortedAsc[0].language, "en-AU");
  t.is(sortedAsc[1].language, "en-CA");
  t.is(sortedAsc[2].language, "en-GB");
  t.is(sortedAsc[3].language, "en-US");
  
  // Test descending order
  const sortedDesc = manager.sortVoices(testVoices, { by: "region", order: "desc" });
  t.is(sortedDesc[0].language, "en-US");
  t.is(sortedDesc[1].language, "en-GB");
  t.is(sortedDesc[2].language, "en-CA");
  t.is(sortedDesc[3].language, "en-AU");
});

testWithContext("sortVoices: sorts by preferred languages", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different languages and regions
  const testVoices = [
    createTestVoice({ name: "French Voice", language: "fr-FR" }),
    createTestVoice({ name: "US English Voice", language: "en-US" }),
    createTestVoice({ name: "UK English Voice", language: "en-GB" }),
    createTestVoice({ name: "German Voice", language: "de-DE" }),
    createTestVoice({ name: "Spanish Voice", language: "es-ES" }),
    createTestVoice({ name: "French Canadian Voice", language: "fr-CA" })
  ];
  
  // Test with preferred languages (exact matches first, then partial matches)
  const preferredLangs = ["en-US", "fr", "es-ES"];
  const sorted = manager.sortVoices(testVoices, { 
    by: "language", 
    preferredLanguages: preferredLangs 
  });
  
  // Exact matches should come first in the order of preferredLanguages
  t.is(sorted[0].language, "en-US");  // Exact match
  t.is(sorted[1].language, "fr-CA");  // Partial match for "fr" - sorts by region code
  t.is(sorted[2].language, "fr-FR");  // Also partial match for "fr" - sorts by region code
  t.is(sorted[3].language, "es-ES");  // Exact match
  
  // Non-preferred languages should come after, sorted alphabetically
  t.is(sorted[4].language, "de-DE");
  t.is(sorted[5].language, "en-GB");
  
  // Test with region-specific preferences
  const regionSpecific = manager.sortVoices(testVoices, { 
    by: "language", 
    preferredLanguages: ["fr-CA", "en-GB"] 
  });
  
  t.is(regionSpecific[0].language, "fr-CA");  // Exact match
  t.is(regionSpecific[1].language, "en-GB");  // Exact match
  // Others should be sorted alphabetically
  t.is(regionSpecific[2].language, "de-DE");
  t.is(regionSpecific[3].language, "en-US");
  t.is(regionSpecific[4].language, "es-ES");
  t.is(regionSpecific[5].language, "fr-FR");
  
  // Test with empty preferred languages (should sort alphabetically)
  const emptyPreferred = manager.sortVoices(testVoices, { 
    by: "language", 
    preferredLanguages: [] 
  });
  t.is(emptyPreferred[0].language, "de-DE");
  t.is(emptyPreferred[1].language, "en-GB");
  t.is(emptyPreferred[2].language, "en-US");
  t.is(emptyPreferred[3].language, "es-ES");
  t.is(emptyPreferred[4].language, "fr-CA");
  t.is(emptyPreferred[5].language, "fr-FR");
  
  // Test with undefined preferred languages (should sort alphabetically)
  const undefinedPreferred = manager.sortVoices(testVoices, { 
    by: "language" 
  });
  t.is(undefinedPreferred[0].language, "de-DE");
  t.is(undefinedPreferred[1].language, "en-GB");
  t.is(undefinedPreferred[2].language, "en-US");
  t.is(undefinedPreferred[3].language, "es-ES");
  t.is(undefinedPreferred[4].language, "fr-CA");
  t.is(undefinedPreferred[5].language, "fr-FR");
  
  // Test with case-insensitive matching
  const caseInsensitive = manager.sortVoices(testVoices, {
    by: "language",
    preferredLanguages: ["EN-us", "FR"]  // Mixed case and partial
  });
  t.is(caseInsensitive[0].language, "en-US");  // Matches despite case difference
  t.is(caseInsensitive[1].language, "fr-CA");  // Partial match, sorted by region
  t.is(caseInsensitive[2].language, "fr-FR");  // Also partial match
});

testWithContext("sortVoices: sorts by region with preferred languages", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different regions
  const testVoices = [
    createTestVoice({ name: "US English", language: "en-US" }),
    createTestVoice({ name: "UK English", language: "en-GB" }),
    createTestVoice({ name: "Australian English", language: "en-AU" }),
    createTestVoice({ name: "Canadian French", language: "fr-CA" }),
    createTestVoice({ name: "French", language: "fr-FR" }),
    createTestVoice({ name: "Canadian English", language: "en-CA" })
  ];
  
  // Test with preferred languages that include regions
  const sorted = manager.sortVoices(testVoices, { 
    by: "region",
    preferredLanguages: ["en-CA", "fr-CA", "en"] // Prefer Canadian English, then Canadian French, then any English
  });
  
  // Verify order:
  // 1. en-CA (exact match for first preferred)
  // 2. fr-CA (exact match for second preferred)
  // 3. en-US (language match for third preferred)
  // 4. en-GB (language match for third preferred)
  // 5. en-AU (language match for third preferred)
  // 6. fr-FR (no match, should come last)
  t.is(sorted[0].language, "en-CA", "en-CA should be first (exact match)");
  t.is(sorted[1].language, "fr-CA", "fr-CA should be second (exact match)");
  
  // The remaining English variants should be in their natural order
  const remainingEnglish = sorted.slice(2, 5).map(v => v.language);
  t.true(
    ["en-US", "en-GB", "en-AU"].every(lang => remainingEnglish.includes(lang)),
    "Should include all English variants after exact matches"
  );
  
  t.is(sorted[5].language, "fr-FR", "fr-FR should be last (no match)");
  
  // Test with preferred languages that don't match any regions
  const noMatches = manager.sortVoices(testVoices, {
    by: "region",
    preferredLanguages: ["es-ES", "de-DE"] // No matches in test data
  });
  
  // Should sort alphabetically by region
  const regions = noMatches.map(v => v.language.split("-")[1]);
  const sortedRegions = [...regions].sort();
  t.deepEqual(regions, sortedRegions, "Should sort alphabetically by region when no preferred matches");
});