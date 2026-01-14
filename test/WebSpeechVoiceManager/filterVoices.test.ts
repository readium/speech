import test, { type ExecutionContext } from "ava";
import { testWithContext, TestContext, createTestVoice } from "./setup.js";
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
// filterVoices Tests
// =============================================

testWithContext("filterVoices: filters by language", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices
  const testVoices = [
    createTestVoice({ name: "English Voice 1", language: "en-US" }),
    createTestVoice({ name: "English Voice 2", language: "en-GB" }),
    createTestVoice({ name: "French Voice", language: "fr-FR" }),
    createTestVoice({ name: "Spanish Voice", language: "es-ES" })
  ];
  
  const englishVoices = manager.filterVoices({ languages: "en" }, testVoices);
  t.is(englishVoices.length, 2);
  t.true(englishVoices.every(v => v.language.startsWith("en")));
  
  const multiLangVoices = manager.filterVoices({ languages: ["en", "fr"] }, testVoices);
  t.is(multiLangVoices.length, 3);
  t.true(multiLangVoices.every(v => v.language.startsWith("en") || v.language.startsWith("fr")));
});

testWithContext("filterVoices: filters by source", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different sources
  const testVoices = [
    createTestVoice({ name: "JSON Voice 1", source: "json" }),
    createTestVoice({ name: "JSON Voice 2", source: "json" }),
    createTestVoice({ name: "Browser Voice 1", source: "browser" }),
  ];
  
  const jsonVoices = manager.filterVoices({ source: "json" }, testVoices);
  t.is(jsonVoices.length, 2);
  t.true(jsonVoices.every(v => v.source === "json"));

  const browserVoices = manager.filterVoices({ source: "browser" }, testVoices);
  t.is(browserVoices.length, 1);
  t.true(browserVoices.every(v => v.source === "browser"));
});

testWithContext("filterVoices: filters by gender", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different genders
  const testVoices = [
    createTestVoice({ name: "Male Voice 1", language: "en-US", gender: "male" }),
    createTestVoice({ name: "Female Voice 1", language: "en-US", gender: "female" }),
    createTestVoice({ name: "Male Voice 2", language: "en-US", gender: "male" }),
    createTestVoice({ name: "Unknown Gender Voice", language: "en-US" })
  ];
  
  const maleVoices = manager.filterVoices({ gender: "male" }, testVoices);
  t.is(maleVoices.length, 2);
  t.true(maleVoices.every(v => v.gender === "male"));
  
  const femaleVoices = manager.filterVoices({ gender: "female" }, testVoices);
  t.is(femaleVoices.length, 1);
  t.is(femaleVoices[0].gender, "female");
});

testWithContext("filterVoices: filters by quality array", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different quality levels
  const testVoices = [
    createTestVoice({ name: "High Quality Voice", language: "en-US", quality: "high" }),
    createTestVoice({ name: "Low Quality Voice", language: "en-US", quality: "low" }),
    createTestVoice({ name: "Normal Quality Voice", language: "en-US", quality: "normal" }),
    createTestVoice({ name: "Very High Quality Voice", language: "en-US", quality: "veryHigh" }),
    createTestVoice({ name: "No Quality Voice", language: "en-US", quality: undefined })
  ];
  
  // Test single quality filter
  const highQualityVoices = manager.filterVoices({ quality: "high" }, testVoices);
  t.is(highQualityVoices.length, 1); // Only the high quality voice
  
  // Test multiple quality filter
  const multiQualityVoices = manager.filterVoices({ quality: ["high", "normal"] }, testVoices);
  t.is(multiQualityVoices.length, 2); // high and normal quality voices
  
  // Test that undefined quality voices are filtered out
  const filteredVoices = manager.filterVoices({ quality: "high" }, testVoices);
  t.false(filteredVoices.some(v => v.quality === undefined));
});

testWithContext("filterVoices: filters out novelty and low quality voices", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices using the createTestVoice helper
  const testVoices = [
    createTestVoice({ 
      voiceURI: "com.apple.speech.synthesis.voice.Albert",
      name: "Albert",
      language: "en-US",
      isNovelty: true
    }),
    createTestVoice({ 
      voiceURI: "com.appk.it.speech.synthesis.voice.Eddy",
      name: "Eddy",
      language: "en-US",
      quality: "veryLow"
    })
  ];

  // Test filtering with default options (should filter out both voices)
  const filteredVoices = manager.filterVoices({
    excludeNovelty: true,
    excludeVeryLowQuality: true
  }, testVoices);
  t.is(filteredVoices.length, 0, "Should filter out all test voices by default");
  
  // Test including them by disabling the filters
  const allVoices = manager.filterVoices({ 
    excludeNovelty: false, 
    excludeVeryLowQuality: false 
  }, testVoices);
  t.is(allVoices.length, 2, "Should include all voices when not filtered");
});

testWithContext("filterVoices: filters by offline availability", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different offline availability
  const testVoices = [
    createTestVoice({ name: "Offline Voice 1", language: "en-US", offlineAvailability: true }),
    createTestVoice({ name: "Online Voice 1", language: "en-US", offlineAvailability: false }),
    createTestVoice({ name: "Offline Voice 2", language: "en-US", offlineAvailability: true }),
    createTestVoice({ name: "Undefined Availability Voice", language: "en-US" })
  ];
  
  const offlineVoices = manager.filterVoices({ offlineOnly: true }, testVoices);
  t.is(offlineVoices.length, 2);
  t.true(offlineVoices.every(v => v.offlineAvailability === true));
  
  // Test that undefined and false values are filtered out
  t.false(offlineVoices.some(v => v.offlineAvailability === false));
  t.false(offlineVoices.some(v => v.offlineAvailability === undefined));
});

testWithContext("filterVoices: filters by provider", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different providers
  const testVoices = [
    createTestVoice({ name: "Google Voice", language: "en-US", provider: "Google" }),
    createTestVoice({ name: "Microsoft Voice", language: "en-US", provider: "Microsoft" }),
    createTestVoice({ name: "Amazon Voice", language: "en-US", provider: "Amazon" }),
    createTestVoice({ name: "Another Google Voice", language: "en-US", provider: "Google" })
  ];
  
  const googleVoices = manager.filterVoices({ provider: "Google" }, testVoices);
  t.is(googleVoices.length, 2);
  t.true(googleVoices.every(v => v.provider === "Google"));
  
  // Test case insensitive matching
  const caseInsensitiveVoices = manager.filterVoices({ provider: "google" }, testVoices);
  t.is(caseInsensitiveVoices.length, 2);
});

testWithContext("filterVoices: combines multiple filters", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with various properties
  const testVoices = [
    createTestVoice({ name: "Male High Quality English", language: "en-US", gender: "male", quality: "high", provider: "Google" }),
    createTestVoice({ name: "Female Low Quality English", language: "en-US", gender: "female", quality: "low", provider: "Google" }),
    createTestVoice({ name: "Male High Quality French", language: "fr-FR", gender: "male", quality: "high", provider: "Microsoft" }),
    createTestVoice({ name: "Female Normal Quality English", language: "en-US", gender: "female", quality: "normal", provider: "Google" })
  ];
  
  // Filter by language and gender
  const englishFemaleVoices = manager.filterVoices({ 
    languages: "en", 
    gender: "female" 
  }, testVoices);
  t.is(englishFemaleVoices.length, 2);
  t.true(englishFemaleVoices.every(v => 
    v.language.startsWith("en") && v.gender === "female"
  ));
  
  // Filter by quality and provider
  const highQualityGoogleVoices = manager.filterVoices({ 
    quality: "high", 
    provider: "Google" 
  }, testVoices);
  t.is(highQualityGoogleVoices.length, 1);
  t.is(highQualityGoogleVoices[0].name, "Male High Quality English");
});

testWithContext("filterVoices: handles edge cases", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  const testVoices = [
    createTestVoice({ name: "Voice 1", language: "en-US", gender: "male", quality: "high" }),
    createTestVoice({ name: "Voice 2", language: "fr-FR", gender: "female", quality: "low" }),
    createTestVoice({ name: "Voice 3", language: "de-DE", gender: "male", quality: "normal" })
  ];
  
  // Test empty filter arrays
  const emptyLanguageFilter = manager.filterVoices({ languages: [] }, testVoices);
  t.is(emptyLanguageFilter.length, 0);
  
  const emptyQualityFilter = manager.filterVoices({ quality: undefined }, testVoices);
  t.is(emptyQualityFilter.length, testVoices.length, "Should return all voices when quality is undefined");
  
  // Test case sensitivity for language
  const caseSensitiveLanguage = manager.filterVoices({ languages: "EN-us" }, testVoices);
  t.is(caseSensitiveLanguage.length, 1); // Should match due to toLowerCase()
  
  // Test invalid quality values - cast to any for testing invalid input
  const invalidQualityFilter = manager.filterVoices({ quality: "invalid" as any }, testVoices);
  t.is(invalidQualityFilter.length, 0);
});

testWithContext("filterVoices: uses array values for multiple filters", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  const testVoices = [
    createTestVoice({ name: "English Male", language: "en-US", gender: "male", quality: "high" }),
    createTestVoice({ name: "English Female", language: "en-US", gender: "female", quality: "normal" }),
    createTestVoice({ name: "French Male", language: "fr-FR", gender: "male", quality: "low" }),
    createTestVoice({ name: "French Female", language: "fr-FR", gender: "female", quality: "high" }),
    createTestVoice({ name: "Spanish Male", language: "es-ES", gender: "male", quality: "normal" })
  ];
  
  // Test with array of languages and array of qualities
  const filtered = manager.filterVoices({ 
    languages: ["en", "fr"], 
    quality: ["high", "normal"] 
  }, testVoices);
  t.is(filtered.length, 3);
  t.true(filtered.every(v => 
    (v.language.startsWith("en") || v.language.startsWith("fr")) &&
    (v.quality === "high" || v.quality === "normal")
  ));
});

testWithContext("filterOutNoveltyVoices: removes novelty voices", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  const testVoices = [
    createTestVoice({ name: "Regular Voice 1", language: "en-US" }),
    createTestVoice({ name: "Novelty Voice 1", language: "en-US", isNovelty: true }),
    createTestVoice({ name: "Regular Voice 2", language: "en-US" }),
    createTestVoice({ name: "Novelty Voice 2", language: "en-US", isNovelty: true })
  ];
  
  const filtered = manager.filterOutNoveltyVoices(testVoices);
  t.is(filtered.length, 2);
  t.false(filtered.some((v: ReadiumSpeechVoice) => v.isNovelty));
});

testWithContext("filterOutVeryLowQualityVoices: removes very low quality voices", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with one very low quality voice
  const testVoices = [
    createTestVoice({ name: "Voice 1", language: "en-US", quality: "normal" }),
    createTestVoice({ name: "Low Quality Voice", language: "en-US", quality: "veryLow" }),
    createTestVoice({ name: "Voice 2", language: "fr-FR", quality: "normal" })
  ];
  
  const filtered = manager.filterOutVeryLowQualityVoices(testVoices);
  t.is(filtered.length, testVoices.length - 1);
  t.false(filtered.some((v: ReadiumSpeechVoice) => v.quality === "veryLow"));
});

testWithContext("filterVoices: deduplication keeps higher quality voice from voiceURI package name", (t) => {
  const manager = t.context.manager;
  
  // Define test voices once
  const lowVoice = {
    voiceURI: "com.apple.speech.synthesis.voice.compact.samantha",
    name: "Samantha",
    lang: "en-US",
    localService: true,
    default: false
  };

  const normalVoice = {
    voiceURI: "com.apple.speech.synthesis.voice.enhanced.samantha",
    name: "Samantha (enhanced)",
    lang: "en-US",
    localService: true,
    default: false
  };

  // Parse both voices and apply deduplication through filtering
  const parsedVoices = (manager as any).parseToReadiumSpeechVoices([lowVoice, normalVoice]);
  const deduped = manager.filterVoices({ removeDuplicates: true }, parsedVoices);
  
  // Verify the result
  t.is(deduped.length, 1, "Should only keep one voice after deduplication");
  const resultVoice = deduped[0];
  t.is(resultVoice.name, "Samantha", "Should use the JSON name of the voice");
  t.is(resultVoice.originalName, "Samantha (enhanced)", "Should keep the original name of the higher quality voice");
  t.deepEqual(resultVoice.quality, "normal", "Should keep the voice with normal quality");
});

testWithContext("filterVoices: deduplication keeps higher quality voice from voiceURI string", (t) => {
  const manager = t.context.manager;
  
  // Define test voices once
  const basicVoice = {
    voiceURI: "Samantha",
    name: "Samantha",
    lang: "en-US",
    localService: true,
    default: false
  };

  const enhancedVoice = {
    voiceURI: "Samantha (Premium)",
    name: "Samantha (Premium)",
    lang: "en-US",
    localService: true,
    default: false
  };

  // Parse both voices and apply deduplication through filtering
  const parsedVoices = (manager as any).parseToReadiumSpeechVoices([basicVoice, enhancedVoice]);
  const deduped = manager.filterVoices({ removeDuplicates: true }, parsedVoices);
  
  // Verify the result
  t.is(deduped.length, 1, "Should only keep one voice after deduplication");
  const resultVoice = deduped[0];
  t.is(resultVoice.name, "Samantha", "Should use the JSON name of the voice");
  t.is(resultVoice.originalName, "Samantha (Premium)", "Should keep the original name of the higher quality voice");
  t.deepEqual(resultVoice.quality, "high", "Should keep the voice with high quality");
});

testWithContext("filterVoices: deduplication keeps higher quality voice from json quality array", (t) => {
  const manager = t.context.manager;
  
  // Parse both voices together to get correct duplicate counts
  const voices = (manager as any).parseToReadiumSpeechVoices([
    {
      voiceURI: "Samantha",
      name: "Samantha",
      lang: "en-US",
      localService: true,
      default: false
    },
    {
      voiceURI: "Samantha superior",
      name: "Samantha (Superior)",
      lang: "en-US",
      localService: true,
      default: false
    }
  ]);
  // Now test deduplication with both voices
  const deduped = manager.filterVoices({ removeDuplicates: true }, voices);
  
  // Verify only the higher quality voice remains with its original name
  t.is(deduped.length, 1, "Should only keep one voice after deduplication");
  t.is(deduped[0].name, "Samantha", "Should use the JSON name of the voice");
  t.is(deduped[0].originalName, "Samantha (Superior)", "Should keep the original name of the higher quality voice");
  t.is(deduped[0].voiceURI, "Samantha superior", "Should keep the voice with superior quality");
  t.deepEqual(deduped[0].quality, "normal", "Should find the voice with normal quality from the array");
});

testWithContext("filterVoices: deduplication prefers voice with matching name over altNames", (t) => {
  const manager = t.context.manager;
  
  // Test scenario: two browser voices
  // One matches primary name in JSON, other matches altName in JSON
  const voices = [
    {
      voiceURI: "Google US English 5 (Natural)",
      name: "Google US English 5 (Natural)",
      lang: "en-US",
      localService: true,
      default: false
    },
    {
      voiceURI: "Android Speech Recognition and Synthesis from Google en-us-x-tpc-local",
      name: "Android Speech Recognition and Synthesis from Google en-us-x-tpc-local",
      lang: "en-US",
      localService: true,
      default: false
    }
  ];
  
  const parsedVoices = (manager as any).parseToReadiumSpeechVoices(voices);
  const deduped = manager.filterVoices({ removeDuplicates: true }, parsedVoices);
  
  // Should only keep one voice
  t.is(deduped.length, 1, "Should only keep one voice after deduplication");
  // Should prefer the voice with the primary name (Google US English 5 (Natural))
  t.is(deduped[0].name, "Google US English 5 (Natural)", "Should prefer voice with primary name over altName");
  t.is(deduped[0].originalName, "Google US English 5 (Natural)", "Should keep the original name of preferred voice");
});

testWithContext("filterVoices: deduplication prefers voice with earlier altName over later altName", (t) => {
  const manager = t.context.manager;
  
  // Test scenario: two browser voices 
  // Both match different altNames in same JSON voice entry
  const voices = [
    {
      voiceURI: "Android Speech Recognition and Synthesis from Google en-us-x-tpc-local",
      name: "Android Speech Recognition and Synthesis from Google en-us-x-tpc-local",
      lang: "en-US",
      localService: true,
      default: false
    },
    {
      voiceURI: "Android Speech Recognition and Synthesis from Google en-us-x-tpc-network", 
      name: "Android Speech Recognition and Synthesis from Google en-us-x-tpc-network",
      lang: "en-US",
      localService: true,
      default: false
    }
  ];
  
  const parsedVoices = (manager as any).parseToReadiumSpeechVoices(voices);
  const deduped = manager.filterVoices({ removeDuplicates: true }, parsedVoices);
  
  // Should only keep one voice
  t.is(deduped.length, 1, "Should only keep one voice after deduplication");
  // Should prefer the voice with the earlier altName (network comes before local in JSON)
  t.is(deduped[0].name, "Google US English 5 (Natural)", "Should prefer voice with earlier altName");
  t.is(deduped[0].originalName, "Android Speech Recognition and Synthesis from Google en-us-x-tpc-network", "Should prefer voice with earlier altName");
});