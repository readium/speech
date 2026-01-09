import { type ExecutionContext } from "ava";
import { testWithContext, TestContext, createTestVoice } from "./setup.js";
import { WebSpeechVoiceManager } from "../../build/index.js";
import { getDefaultRegion } from "../testUtils.js";

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
  const sortedAsc = manager.sortVoices(testVoices, { by: "languages", order: "asc" });
  t.is(sortedAsc[0].language, "de-DE");
  t.is(sortedAsc[1].language, "en-US");
  t.is(sortedAsc[2].language, "es-ES");
  t.is(sortedAsc[3].language, "fr-FR");
  
  // Test descending order
  const sortedDesc = manager.sortVoices(testVoices, { by: "languages", order: "desc" });
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

testWithContext("sortVoices: sorts by preferred languages with region inference", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different languages and regions
  const testVoices = [
    createTestVoice({ name: "French Voice", language: "fr-FR" }),  // Default region
    createTestVoice({ name: "French Canadian Voice", language: "fr-CA" }),  // CA region
    createTestVoice({ name: "French Belgian Voice", language: "fr-BE" }),  // BE region
    createTestVoice({ name: "US English Voice", language: "en-US" }),
    createTestVoice({ name: "UK English Voice", language: "en-GB" }),
    createTestVoice({ name: "Canadian English Voice", language: "en-CA" }),
    createTestVoice({ name: "German Voice", language: "de-DE" }),
    createTestVoice({ name: "Spanish Voice", language: "es-ES" }),  // Default region
    createTestVoice({ name: "Mexican Spanish Voice", language: "es-MX" })  // MX region
  ];

  // Test 1: Basic language code should use default region
  const defaultRegionTest = manager.sortVoices(testVoices, {
    by: "languages",
    preferredLanguages: ["fr"]  // Should use default region (fr-FR)
  });

  // French voices should come first, with fr-FR (default) first
  t.is(defaultRegionTest[0].language, getDefaultRegion("fr"), "Default region should come first");
  t.is(defaultRegionTest[1].language, "fr-BE", "Other French regions should follow alphabetically");
  t.is(defaultRegionTest[2].language, "fr-CA", "Other French regions should follow alphabetically");

  // Test 2: Region inference from other languages
  const inferredRegionTest = manager.sortVoices(testVoices, {
    by: "languages",
    preferredLanguages: ["fr", "en-CA"]  // Should infer fr-CA as preferred French
  });

  // fr-CA should come first because en-CA provides the CA region hint
  t.is(inferredRegionTest[0].language, "fr-CA", "Should infer fr-CA from en-CA");
  t.is(inferredRegionTest[1].language, "fr-BE", "Other French regions should follow alphabetically");
  t.is(inferredRegionTest[2].language, "fr-FR", "Default region should come after inferred region");

  // Test 3: Multiple regional preferences
  const multipleRegionsTest = manager.sortVoices(testVoices, {
    by: "languages",
    preferredLanguages: ["fr-BE", "fr-CA", "es"]  // Explicit regional preferences
  });

  // Should respect the order of regional preferences
  t.is(multipleRegionsTest[0].language, "fr-BE", "First regional preference should come first");
  t.is(multipleRegionsTest[1].language, "fr-CA", "Second regional preference should come second");
  t.is(multipleRegionsTest[2].language, "fr-FR", "Default region should come last");
  t.is(multipleRegionsTest[3].language, getDefaultRegion("es"), "Spanish default region should come first");
  t.is(multipleRegionsTest[4].language, "es-MX", "Other Spanish regions should follow");

  // Test 4: Keeping prioritization of regions
  const prioritizedRegionsTest = manager.sortVoices(testVoices, {
    by: "languages",
    preferredLanguages: ["en-CA", "fr-BE", "fr-FR"] // Inferred region should come first
  });

  // Should respect the exact order of regional preferences
  t.is(prioritizedRegionsTest[0].language, "en-CA", "First explicit preference should be en-CA");
  t.is(prioritizedRegionsTest[1].language, "en-GB", "UK English should come second");
  t.is(prioritizedRegionsTest[2].language, "en-US", "US English should come third");
  t.is(prioritizedRegionsTest[3].language, "fr-CA", "Inferred French Canadian should come fourth");
  t.is(prioritizedRegionsTest[4].language, "fr-BE", "French Belgian should come fifth");
  t.is(prioritizedRegionsTest[5].language, "fr-FR", "French French should come sixth");

  // Test 5: Empty/undefined preferred languages (should sort alphabetically)
  const emptyPreferred = manager.sortVoices(testVoices, { 
    by: "languages",
    preferredLanguages: [] 
  });
  t.is(emptyPreferred[0].language, "de-DE");
  t.is(emptyPreferred[1].language, "en-CA");
  t.is(emptyPreferred[2].language, "en-GB");
  t.is(emptyPreferred[3].language, "en-US");
  t.is(emptyPreferred[4].language, "es-ES");
  t.is(emptyPreferred[5].language, "es-MX");
  t.is(emptyPreferred[6].language, "fr-BE");
  t.is(emptyPreferred[7].language, "fr-CA");
  t.is(emptyPreferred[8].language, "fr-FR");
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
    preferredLanguages: ["en-CA", "fr-CA", "fr-FR"] // Prefer Canadian English, then Canadian French, then French French, then all other languages
  });
  
  // Verify order:
  // 1. en-CA (exact match for first preferred)
  // 2. fr-CA (exact match for second preferred)
  // 3. fr-FR (language match for third preferred)
  // 4. en-AU (alphabetical order)
  // 5. en-GB (alphabetical order)
  // 6. en-US (alphabetical order)
  t.is(sorted[0].language, "en-CA", "en-CA should be first (exact match)");
  t.is(sorted[1].language, "fr-CA", "fr-CA should be second (exact match)");
  t.is(sorted[2].language, "fr-FR", "fr-FR should be third (language match)");
  
  // The remaining English variants should be in their natural order
  const remainingEnglish = sorted.slice(3, 6).map(v => v.language);
  t.true(
    ["en-AU", "en-GB", "en-US"].every(lang => remainingEnglish.includes(lang)),
    "Should include all English variants after exact matches"
  );
    
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