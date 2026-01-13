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

testWithContext("sortVoices: sorts by quality", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different quality levels
  const testVoices = [
    createTestVoice({ name: "High Quality Voice", language: "en-US", quality: "high" }),
    createTestVoice({ name: "Low Quality Voice", language: "en-US", quality: "low" }),
    createTestVoice({ name: "Normal Quality Voice", language: "en-US", quality: "normal" }),
    createTestVoice({ name: "Very High Quality Voice", language: "en-US", quality: "veryHigh" }),
    createTestVoice({ name: "Very Low Quality Voice", language: "en-US", quality: "veryLow" }),
    createTestVoice({ name: "Unknown Quality Voice", language: "en-US", quality: null })
  ];
  
  const sortedAsc = manager.sortQuality(testVoices);
  t.is(sortedAsc[0].quality, "veryHigh");
  t.is(sortedAsc[1].quality, "high");
  t.is(sortedAsc[2].quality, "normal");
  t.is(sortedAsc[3].quality, "low");
  t.is(sortedAsc[4].quality, "veryLow");
  t.is(sortedAsc[5].quality, null);
});

testWithContext("sortVoices: sorts by quality across languages", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different languages and quality levels
  const testVoices = [
    createTestVoice({ name: "French Low Quality", language: "fr-FR", quality: "low" }),
    createTestVoice({ name: "English High Quality", language: "en-US", quality: "high" }),
    createTestVoice({ name: "Spanish Normal Quality", language: "es-ES", quality: "normal" }),
    createTestVoice({ name: "German Very High Quality", language: "de-DE", quality: "veryHigh" }),
    createTestVoice({ name: "Italian Very Low Quality", language: "it-IT", quality: "veryLow" }),
    createTestVoice({ name: "Portuguese Unknown Quality", language: "pt-BR", quality: null })
  ];
  
  const sortedAsc = manager.sortQuality(testVoices);
  
  // Check both quality and language to ensure correct sorting
  t.is(sortedAsc[0].quality, "veryHigh");
  t.is(sortedAsc[0].language, "de-DE");
  
  t.is(sortedAsc[1].quality, "high");
  t.is(sortedAsc[1].language, "en-US");
  
  t.is(sortedAsc[2].quality, "normal");
  t.is(sortedAsc[2].language, "es-ES");
  
  t.is(sortedAsc[3].quality, "low");
  t.is(sortedAsc[3].language, "fr-FR");
  
  t.is(sortedAsc[4].quality, "veryLow");
  t.is(sortedAsc[4].language, "it-IT");
  
  t.is(sortedAsc[5].quality, null);
  t.is(sortedAsc[5].language, "pt-BR");
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
  
  const sortedAsc = manager.sortLanguages(testVoices, []);
  t.is(sortedAsc[0].language, "de-DE");
  t.is(sortedAsc[1].language, "en-US");
  t.is(sortedAsc[2].language, "es-ES");
  t.is(sortedAsc[3].language, "fr-FR");
});

testWithContext("sortVoices: sorts languages by preferred", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different languages and regions
  const testVoices = [
    createTestVoice({ name: "French Voice", language: "fr-FR" }),
    createTestVoice({ name: "French Canadian Voice", language: "fr-CA" }),
    createTestVoice({ name: "English Voice", language: "en-US" }),
    createTestVoice({ name: "UK English Voice", language: "en-GB" }),
    createTestVoice({ name: "Spanish Voice", language: "es-ES" }),
    createTestVoice({ name: "Mexican Spanish Voice", language: "es-MX" }),
    createTestVoice({ name: "German Voice", language: "de-DE" })
  ];
  
  // Test with preferred languages
  const sortedPreferred = manager.sortLanguages(testVoices, ["fr", "en"]);
  
  // French voices should come first (preferred language)
  t.is(sortedPreferred[0].language, "fr-FR");
  t.is(sortedPreferred[1].language, "fr-CA");
  
  // English voices should come second (preferred language)
  t.is(sortedPreferred[2].language, "en-US");
  t.is(sortedPreferred[3].language, "en-GB");
  
  // Other languages should come after preferred ones
  t.is(sortedPreferred[4].language, "de-DE");
  t.is(sortedPreferred[5].language, "es-ES");
  t.is(sortedPreferred[6].language, "es-MX");
});

testWithContext("sortVoices: sorts by JSON order", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices using actual names from JSON files in their exact JSON order
  const testVoices = [
    // French voices from fr.json - first 5 fr-FR voices in exact order
    createTestVoice({ name: "Microsoft VivienneMultilingual Online (Natural) - French (France)", language: "fr-FR" }),
    createTestVoice({ name: "Microsoft Denise Online (Natural) - French (France)", language: "fr-FR" }),
    createTestVoice({ name: "Microsoft Eloise Online (Natural) - French (France)", language: "fr-FR" }),
    createTestVoice({ name: "Microsoft RemyMultilingual Online (Natural) - French (France)", language: "fr-FR" }),
    createTestVoice({ name: "Microsoft Henri Online (Natural) - French (France)", language: "fr-FR" })
  ];
  
  // Test with preferred language
  const sorted = manager.sortLanguages(testVoices, ["fr"]);
  
  // Should be in exact JSON order
  t.is(sorted[0].name, "Microsoft VivienneMultilingual Online (Natural) - French (France)");
  t.is(sorted[1].name, "Microsoft Denise Online (Natural) - French (France)");
  t.is(sorted[2].name, "Microsoft Eloise Online (Natural) - French (France)");
  t.is(sorted[3].name, "Microsoft RemyMultilingual Online (Natural) - French (France)");
  t.is(sorted[4].name, "Microsoft Henri Online (Natural) - French (France)");
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
  
  const sortedAsc = manager.sortRegions(testVoices, []);
  t.is(sortedAsc[0].language, "en-US");
  t.is(sortedAsc[1].language, "en-AU");
  t.is(sortedAsc[2].language, "en-CA");
  t.is(sortedAsc[3].language, "en-GB");
});



testWithContext("sortVoices: sorts regions by preferred", (t: ExecutionContext<TestContext>) => {
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
  const defaultRegionTest = manager.sortRegions(testVoices, ["fr"]);

  // French voices should come first, with fr-FR (default) first
  t.is(defaultRegionTest[0].language, getDefaultRegion("fr"), "Default region should come first");
  t.is(defaultRegionTest[1].language, "fr-BE", "Other French regions should follow alphabetically");
  t.is(defaultRegionTest[2].language, "fr-CA", "Other French regions should follow alphabetically");

  // Test 2: Region inference from other languages
  const inferredRegionTest = manager.sortRegions(testVoices, ["fr", "en-CA"]);

  // fr-CA should come first because en-CA provides the CA region hint
  t.is(inferredRegionTest[0].language, "fr-CA", "Should infer fr-CA from en-CA");
  t.is(inferredRegionTest[1].language, "fr-FR", "Default region should come after inferred region");
  t.is(inferredRegionTest[2].language, "fr-BE", "Other French regions should follow alphabetically");

  // Test 3: Multiple regional preferences
  const multipleRegionsTest = manager.sortRegions(testVoices, ["fr-BE", "fr-CA", "es"]);

  // Should respect the order of regional preferences
  t.is(multipleRegionsTest[0].language, "fr-BE", "First regional preference should come first");
  t.is(multipleRegionsTest[1].language, "fr-CA", "Second regional preference should come second");
  t.is(multipleRegionsTest[2].language, "fr-FR", "Default region should come last");
  t.is(multipleRegionsTest[3].language, getDefaultRegion("es"), "Spanish default region should come first");
  t.is(multipleRegionsTest[4].language, "es-MX", "Other Spanish regions should follow");

  // Test 4: Keeping prioritization of regions
  const prioritizedRegionsTest = manager.sortRegions(testVoices, ["en-CA", "fr-BE", "fr-FR"]);

  // Should respect the exact order of regional preferences
  t.is(prioritizedRegionsTest[0].language, "en-CA", "First explicit preference should be en-CA");
  t.is(prioritizedRegionsTest[1].language, "en-US", "Default US English should come second");
  t.is(prioritizedRegionsTest[2].language, "en-GB", "UK English should come third");
  t.is(prioritizedRegionsTest[3].language, "fr-CA", "Inferred French Canadian should come fourth");
  t.is(prioritizedRegionsTest[4].language, "fr-BE", "French Belgian should come fifth");
  t.is(prioritizedRegionsTest[5].language, "fr-FR", "French French should come sixth");

  // Test 5: Empty/undefined preferred languages (should sort default then alphabetically)
  const emptyPreferred = manager.sortRegions(testVoices, []);
  t.is(emptyPreferred[0].language, "de-DE");
  t.is(emptyPreferred[1].language, "en-US");
  t.is(emptyPreferred[2].language, "en-CA");
  t.is(emptyPreferred[3].language, "en-GB");
  t.is(emptyPreferred[4].language, "es-ES");
  t.is(emptyPreferred[5].language, "es-MX");
  t.is(emptyPreferred[6].language, "fr-FR");
  t.is(emptyPreferred[7].language, "fr-BE");
  t.is(emptyPreferred[8].language, "fr-CA");
});

testWithContext("sortVoices: sorts regions by JSON order", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices using actual names from JSON files in their exact JSON order
  const testVoices = [
    // French voices from fr.json - first 5 fr-FR voices in exact order
    createTestVoice({ name: "Microsoft VivienneMultilingual Online (Natural) - French (France)", language: "fr-FR" }),
    createTestVoice({ name: "Microsoft Denise Online (Natural) - French (France)", language: "fr-FR" }),
    createTestVoice({ name: "Microsoft Eloise Online (Natural) - French (France)", language: "fr-FR" }),
    createTestVoice({ name: "Microsoft RemyMultilingual Online (Natural) - French (France)", language: "fr-FR" }),
    createTestVoice({ name: "Microsoft Henri Online (Natural) - French (France)", language: "fr-FR" })
  ];
  
  // Test with preferred language
  const sorted = manager.sortRegions(testVoices, ["fr-FR"]);
  
  // Should be in exact JSON order
  t.is(sorted[0].name, "Microsoft VivienneMultilingual Online (Natural) - French (France)");
  t.is(sorted[1].name, "Microsoft Denise Online (Natural) - French (France)");
  t.is(sorted[2].name, "Microsoft Eloise Online (Natural) - French (France)");
  t.is(sorted[3].name, "Microsoft RemyMultilingual Online (Natural) - French (France)");
  t.is(sorted[4].name, "Microsoft Henri Online (Natural) - French (France)");
});