import test, { type ExecutionContext } from "ava";
import { WebSpeechVoiceManager, ReadiumSpeechVoice } from "../build/index.js";

// =============================================
// Mock Data and Helpers
// =============================================

// Mock DisplayNames for testing
class MockDisplayNames {
  options: any;
  constructor(_: any, options: any) {
    this.options = options;
  }
  
  of(code: string): string {
    if (this.options.type === "language") {
      return `${code.toUpperCase()}_LANG`;
    }
    if (this.options.type === "region") {
      return `${code.toUpperCase()}_REGION`;
    }
    return code;
  }
  
  static supportedLocalesOf(locales: string[]): string[] {
    return locales;
  }
}

// Mock Intl.DisplayNames
if (typeof (globalThis as any).Intl === "undefined") {
  (globalThis as any).Intl = {};
}
(globalThis as any).Intl.DisplayNames = MockDisplayNames as any;

interface TestContext {
  manager: WebSpeechVoiceManager;
}


// =============================================
// Test Data
// =============================================

// Mock voices for testing
const mockVoices = [
  {
    voiceURI: "voice1",
    name: "Voice 1",
    lang: "en-US",
    localService: true,
    default: true
  },
  {
    voiceURI: "voice2",
    name: "Voice 2",
    lang: "fr-FR",
    localService: true,
    default: false
  },
  {
    voiceURI: "voice3",
    name: "Voice 3",
    lang: "es-ES",
    localService: true,
    default: false
  },
  {
    voiceURI: "voice4",
    name: "Voice 4",
    lang: "de-DE",
    localService: true,
    default: false
  },
  {
    voiceURI: "voice5",
    name: "Voice 5",
    lang: "it-IT",
    localService: true,
    default: false
  }
];

// Store original globals
const originalNavigator = globalThis.navigator;
const originalSpeechSynthesis = globalThis.speechSynthesis;

// =============================================
// Test Setup
// =============================================

// Test context type and setup
type TestFn = (t: ExecutionContext<TestContext>) => void | Promise<void>;
const testWithContext = test as unknown as {
  (name: string, fn: TestFn): void;
  afterEach: {
    always: (fn: (t: ExecutionContext<TestContext>) => void | Promise<void>) => void;
  };
  beforeEach: (fn: (t: ExecutionContext<TestContext>) => void | Promise<void>) => void;
};

// Helper function to create test voice objects that match ReadiumSpeechVoice interface
function createTestVoice(overrides: Partial<ReadiumSpeechVoice> = {}): ReadiumSpeechVoice {
  return {
    source: "json",
    label: overrides.name || "Test Voice",
    name: overrides.name || "Test Voice",
    voiceURI: `voice-${overrides.name || "test"}`,
    language: "en-US",
    ...overrides
  };
}

// Set up global mocks before any tests run
if (typeof globalThis.window === "undefined") {
  (globalThis as any).window = globalThis;
}

// Mock the global objects
Object.defineProperty(globalThis, "navigator", {
  value: {
    ...originalNavigator,
    languages: ["en-US", "fr-FR"]
  },
  configurable: true,
  writable: true
});

// Create a mock speechSynthesis object that matches the browser's API
const mockSpeechSynthesis = {
  getVoices: () => mockVoices,
  onvoiceschanged: null as (() => void) | null,
  addEventListener: function(event: string, callback: () => void) {
    if (event === "voiceschanged") {
      this.onvoiceschanged = callback;
    }
  },
  removeEventListener: function(event: string) {
  },
  _triggerVoicesChanged: function() {
    if (this.onvoiceschanged) {
      this.onvoiceschanged();
    }
  }
};

// Mock the window.speechSynthesis to return our mock voices
Object.defineProperty(globalThis.window, "speechSynthesis", {
  value: mockSpeechSynthesis,
  configurable: true,
  writable: true
});

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
  // Clean up
  (WebSpeechVoiceManager as any).instance = undefined;
  
  // Restore original globals
  Object.defineProperty(globalThis, "navigator", {
    value: originalNavigator,
    configurable: true,
    writable: true
  });
  
  Object.defineProperty(globalThis, "speechSynthesis", {
    value: originalSpeechSynthesis,
    configurable: true,
    writable: true
  });
});

// =============================================
// 1. Initialization Tests
// =============================================

testWithContext("initialize: returns singleton instance", async (t) => {
  const instance1 = await WebSpeechVoiceManager.initialize();
  const instance2 = await WebSpeechVoiceManager.initialize();
  t.is(instance1, instance2);
});

testWithContext("initialize: loads voices and gets voices successfully", (t) => {
  const manager = t.context.manager;
  const voices = manager.getVoices();
  t.true(Array.isArray(voices));
  t.true(voices.length > 0);
});

testWithContext("deduplication: keeps higher quality voice", (t) => {
  const manager = t.context.manager;
  
  // Parse voices separately to check their qualities
  const basicVoice = (manager as any).parseToReadiumSpeechVoices([{
    voiceURI: "voice1",
    name: "Samantha",
    lang: "en-US",
    localService: true,
    default: false
  }])[0];

  const enhancedVoice = (manager as any).parseToReadiumSpeechVoices([{
    voiceURI: "voice2",
    name: "Samantha (Premium)",
    lang: "en-US",
    localService: true,
    default: false
  }])[0];

  // Verify qualities are set as expected
  t.deepEqual(basicVoice.quality, ["low", "normal"], "Basic voice should have json quality");
  t.deepEqual(enhancedVoice.quality, ["high"], "Premium voice should have high quality");

  // Now test deduplication with both voices
  const deduped = (manager as any).removeDuplicate([basicVoice, enhancedVoice]);
  
  // Verify only the higher quality voice remains with its original name
  t.is(deduped.length, 1, "Should only keep one voice after deduplication");
  t.is(deduped[0].name, "Samantha", "Should keep the json name of the voice");
  t.deepEqual(deduped[0].quality, ["high"], "Should keep the voice with high quality");
});

// =============================================
// 2. Voice Retrieval Tests
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
    createTestVoice({ name: "English Male High", language: "en-US", gender: "male", quality: ["high"], provider: "Google", offlineAvailability: true }),
    createTestVoice({ name: "English Female Normal", language: "en-US", gender: "female", quality: ["normal"], provider: "Microsoft", offlineAvailability: false }),
    createTestVoice({ name: "French Male Low", language: "fr-FR", gender: "male", quality: ["low"], provider: "Google", offlineAvailability: true }),
    createTestVoice({ name: "French Female High", language: "fr-FR", gender: "female", quality: ["high"], provider: "Amazon", offlineAvailability: false }),
    createTestVoice({ name: "Spanish Male Normal", language: "es-ES", gender: "male", quality: ["normal"], provider: "Microsoft", offlineAvailability: true })
  ];
  
  // Test with all filters combined
  const filtered = await manager.getVoices({ 
    language: ["en", "fr"],
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
  let voices = await manager.getVoices({ language: "en" });
  t.true(voices.length > 0);
  t.true(voices.every((v: ReadiumSpeechVoice) => v.language.startsWith("en")));
  
  // Multiple languages
  voices = await manager.getVoices({ language: ["en", "fr"] });
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
    quality: i % 2 === 0 ? ["high"] : ["low"]
  }));
  
  // Replace the voices in the manager
  (manager as any).voices = voicesWithQuality;
  
  const highQualityVoices = await manager.getVoices({ quality: "high" });
  t.true(highQualityVoices.length > 0);
  t.true(highQualityVoices.every((v: ReadiumSpeechVoice) => v.quality?.includes("high") ?? false));
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

// =============================================
// 3. Language Retrieval Tests
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

// =============================================
// 4. Region Retrieval Tests
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
  // Create a fresh instance to avoid interference
  (WebSpeechVoiceManager as any).instance = undefined;
  const manager = await WebSpeechVoiceManager.initialize();
  
  // Mock empty voices array
  const emptyMockVoices: any[] = [];
  const mockSpeechSynthesis = {
    getVoices: () => emptyMockVoices,
    onvoiceschanged: null as (() => void) | null,
    addEventListener: function(event: string, callback: () => void) {
      if (event === "voiceschanged") {
        this.onvoiceschanged = callback;
      }
    },
    removeEventListener: function(event: string) {
    },
    _triggerVoicesChanged: function() {
      if (this.onvoiceschanged) {
        this.onvoiceschanged();
      }
    }
  };
  
  Object.defineProperty(globalThis.window, "speechSynthesis", {
    value: mockSpeechSynthesis,
    configurable: true,
    writable: true
  });
  
  try {
    // Reset initialization
    (manager as any).initializationPromise = null;
    (manager as any).voices = [];
    (manager as any).browserVoices = [];
    
    const regions = manager.getRegions();
    t.deepEqual(regions, []);
  } finally {
    // Restore for other tests
    Object.defineProperty(globalThis.window, "speechSynthesis", {
      value: {
        getVoices: () => mockVoices,
        onvoiceschanged: null as (() => void) | null,
        addEventListener: function(event: string, callback: () => void) {
          if (event === "voiceschanged") {
            this.onvoiceschanged = callback;
          }
        },
        removeEventListener: function(event: string) {
        },
        _triggerVoicesChanged: function() {
          if (this.onvoiceschanged) {
            this.onvoiceschanged();
          }
        }
      },
      configurable: true,
      writable: true
    });
  }
});

// =============================================
// 5. Default Voice Retrieval Tests
// =============================================

testWithContext("getDefaultVoice: selects highest quality voice regardless of isDefault flag", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with quality as the distinguishing factor
  const testVoices = [
    { 
      voiceURI: "voice1", 
      name: "High Quality", 
      language: "en-US", 
      isDefault: false,  // Not default but higher quality
      quality: ["high"] 
    },
    { 
      voiceURI: "voice2", 
      name: "Normal Quality", 
      language: "en-US", 
      isDefault: true,  // Default but lower quality
      quality: ["normal"] 
    }
  ];
  
  (manager as any).voices = testVoices;
  
  const defaultVoice = await manager.getDefaultVoice("en-US");
  t.truthy(defaultVoice);
  t.is(defaultVoice?.voiceURI, "voice1", "Should select highest quality voice regardless of isDefault flag");
});

testWithContext("getDefaultVoice: falls back to base language", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  const testVoices = [
    { 
      voiceURI: "voice1", 
      name: "English Generic", 
      language: "en",  // Base language
      isDefault: false,
      quality: ["high"] 
    },
    { 
      voiceURI: "voice2", 
      name: "US English", 
      language: "en-US", 
      isDefault: false,
      quality: ["high"] 
    }
  ];
  
  (manager as any).voices = testVoices;
  
  // Request en-GB which isn't available, should fall back to en
  const defaultVoice = await manager.getDefaultVoice("en-GB");
  t.truthy(defaultVoice);
  t.is(defaultVoice?.language, "en", "Should fall back to base language when exact match not found");
});

testWithContext("getDefaultVoice: respects quality sorting", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  const testVoices = [
    { 
      voiceURI: "voice1", 
      name: "High Quality", 
      language: "en-US", 
      isDefault: false,
      quality: ["high"] 
    },
    { 
      voiceURI: "voice2", 
      name: "Very High Quality", 
      language: "en-US", 
      isDefault: false,
      quality: ["veryHigh"]  // Higher quality
    },
    { 
      voiceURI: "voice3", 
      name: "Normal Quality", 
      language: "en-US", 
      isDefault: false,
      quality: ["normal"]  // Lower quality
    }
  ];
  
  (manager as any).voices = testVoices;
  
  const defaultVoice = await manager.getDefaultVoice("en-US");
  t.truthy(defaultVoice);
  t.is(defaultVoice?.voiceURI, "voice2", "Should select highest quality voice available");
});

testWithContext("getDefaultVoice: returns undefined when no voices available", async (t) => {
  // Create a fresh instance to avoid interference
  (WebSpeechVoiceManager as any).instance = undefined;
  const manager = await WebSpeechVoiceManager.initialize();
  
  // Mock empty voices array
  const emptyMockVoices: any[] = [];
  const mockSpeechSynthesis = {
    getVoices: () => emptyMockVoices,
    onvoiceschanged: null as (() => void) | null,
    addEventListener: function(event: string, callback: () => void) {
      if (event === "voiceschanged") {
        this.onvoiceschanged = callback;
      }
    },
    removeEventListener: function(event: string) {
    },
    _triggerVoicesChanged: function() {
      if (this.onvoiceschanged) {
        this.onvoiceschanged();
      }
    }
  };
  
  Object.defineProperty(globalThis.window, "speechSynthesis", {
    value: mockSpeechSynthesis,
    configurable: true,
    writable: true
  });
  
  try {
    // Reset initialization
    (manager as any).initializationPromise = null;
    (manager as any).voices = [];
    (manager as any).browserVoices = [];
    
    const defaultVoice = manager.getDefaultVoice("en-US");
    t.is(defaultVoice, null);
  } finally {
    // Restore for other tests
    Object.defineProperty(globalThis.window, "speechSynthesis", {
      value: {
        getVoices: () => mockVoices,
        onvoiceschanged: null as (() => void) | null,
        addEventListener: function(event: string, callback: () => void) {
          if (event === "voiceschanged") {
            this.onvoiceschanged = callback;
          }
        },
        removeEventListener: function(event: string) {
        },
        _triggerVoicesChanged: function() {
          if (this.onvoiceschanged) {
            this.onvoiceschanged();
          }
        }
      },
      configurable: true,
      writable: true
    });
  }
});

testWithContext("getDefaultVoice: returns null when no matching language", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Test with language that has no voices
  const result = await manager.getDefaultVoice("xx-XX");
  t.is(result, null);
});

// =============================================
// 6. Test Utterance Retrieval Tests
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

// =============================================
// 7. Voice Filtering Tests
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
  
  const englishVoices = manager.filterVoices(testVoices, { language: "en" });
  t.is(englishVoices.length, 2);
  t.true(englishVoices.every(v => v.language.startsWith("en")));
  
  const multiLangVoices = manager.filterVoices(testVoices, { language: ["en", "fr"] });
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
  
  const jsonVoices = manager.filterVoices(testVoices, { source: "json" });
  t.is(jsonVoices.length, 2);
  t.true(jsonVoices.every(v => v.source === "json"));

  const browserVoices = manager.filterVoices(testVoices, { source: "browser"});
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
  
  const maleVoices = manager.filterVoices(testVoices, { gender: "male" });
  t.is(maleVoices.length, 2);
  t.true(maleVoices.every(v => v.gender === "male"));
  
  const femaleVoices = manager.filterVoices(testVoices, { gender: "female" });
  t.is(femaleVoices.length, 1);
  t.is(femaleVoices[0].gender, "female");
});

testWithContext("filterVoices: filters by quality array", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different quality levels
  const testVoices = [
    createTestVoice({ name: "High Quality Voice", language: "en-US", quality: ["high"] }),
    createTestVoice({ name: "Low Quality Voice", language: "en-US", quality: ["low"] }),
    createTestVoice({ name: "Normal Quality Voice", language: "en-US", quality: ["normal"] }),
    createTestVoice({ name: "Very High Quality Voice", language: "en-US", quality: ["veryHigh"] }),
    createTestVoice({ name: "Multi Quality Voice", language: "en-US", quality: ["high", "normal"] }),
    createTestVoice({ name: "No Quality Voice", language: "en-US", quality: undefined })
  ];
  
  // Test single quality filter
  const highQualityVoices = manager.filterVoices(testVoices, { quality: "high" });
  t.is(highQualityVoices.length, 2); // high and multi quality voices
  
  // Test multiple quality filter
  const multiQualityVoices = manager.filterVoices(testVoices, { quality: ["high", "normal"] });
  t.is(multiQualityVoices.length, 3); // high, normal, and multi quality voices
  
  // Test that undefined quality voices are filtered out
  const filteredVoices = manager.filterVoices(testVoices, { quality: "high" });
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
      quality: ["veryLow"]
    })
  ];

  // Test filtering with default options (should filter out both voices)
  const filteredVoices = manager.filterVoices(testVoices, {
    excludeNovelty: true,
    excludeVeryLowQuality: true
  });
  t.is(filteredVoices.length, 0, "Should filter out all test voices by default");
  
  // Test including them by disabling the filters
  const allVoices = manager.filterVoices(testVoices, { 
    excludeNovelty: false, 
    excludeVeryLowQuality: false 
  });
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
  
  const offlineVoices = manager.filterVoices(testVoices, { offlineOnly: true });
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
  
  const googleVoices = manager.filterVoices(testVoices, { provider: "Google" });
  t.is(googleVoices.length, 2);
  t.true(googleVoices.every(v => v.provider === "Google"));
  
  // Test case insensitive matching
  const caseInsensitiveVoices = manager.filterVoices(testVoices, { provider: "google" });
  t.is(caseInsensitiveVoices.length, 2);
});

testWithContext("filterVoices: combines multiple filters", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with various properties
  const testVoices = [
    createTestVoice({ name: "Male High Quality English", language: "en-US", gender: "male", quality: ["high"], provider: "Google" }),
    createTestVoice({ name: "Female Low Quality English", language: "en-US", gender: "female", quality: ["low"], provider: "Google" }),
    createTestVoice({ name: "Male High Quality French", language: "fr-FR", gender: "male", quality: ["high"], provider: "Microsoft" }),
    createTestVoice({ name: "Female Normal Quality English", language: "en-US", gender: "female", quality: ["normal"], provider: "Google" })
  ];
  
  // Filter by language and gender
  const englishFemaleVoices = manager.filterVoices(testVoices, { 
    language: "en", 
    gender: "female" 
  });
  t.is(englishFemaleVoices.length, 2);
  t.true(englishFemaleVoices.every(v => 
    v.language.startsWith("en") && v.gender === "female"
  ));
  
  // Filter by quality and provider
  const highQualityGoogleVoices = manager.filterVoices(testVoices, { 
    quality: "high", 
    provider: "Google" 
  });
  t.is(highQualityGoogleVoices.length, 1);
  t.is(highQualityGoogleVoices[0].name, "Male High Quality English");
});

testWithContext("filterVoices: handles edge cases", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  const testVoices = [
    createTestVoice({ name: "Voice 1", language: "en-US", gender: "male", quality: ["high"] }),
    createTestVoice({ name: "Voice 2", language: "fr-FR", gender: "female", quality: ["low"] }),
    createTestVoice({ name: "Voice 3", language: "de-DE", gender: "male", quality: ["normal"] })
  ];
  
  // Test empty filter arrays
  const emptyLanguageFilter = manager.filterVoices(testVoices, { language: [] });
  t.is(emptyLanguageFilter.length, 0);
  
  const emptyQualityFilter = manager.filterVoices(testVoices, { quality: [] });
  t.is(emptyQualityFilter.length, 0);
  
  // Test case sensitivity for language
  const caseSensitiveLanguage = manager.filterVoices(testVoices, { language: "EN-us" });
  t.is(caseSensitiveLanguage.length, 1); // Should match due to toLowerCase()
  
  // Test invalid quality values - cast to any for testing invalid input
  const invalidQualityFilter = manager.filterVoices(testVoices, { quality: "invalid" as any });
  t.is(invalidQualityFilter.length, 0);
});

testWithContext("filterVoices: uses array values for multiple filters", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  const testVoices = [
    createTestVoice({ name: "English Male", language: "en-US", gender: "male", quality: ["high"] }),
    createTestVoice({ name: "English Female", language: "en-US", gender: "female", quality: ["normal"] }),
    createTestVoice({ name: "French Male", language: "fr-FR", gender: "male", quality: ["low"] }),
    createTestVoice({ name: "French Female", language: "fr-FR", gender: "female", quality: ["high"] }),
    createTestVoice({ name: "Spanish Male", language: "es-ES", gender: "male", quality: ["normal"] })
  ];
  
  // Test with array of languages and array of qualities
  const filtered = manager.filterVoices(testVoices, { 
    language: ["en", "fr"], 
    quality: ["high", "normal"] 
  });
  t.is(filtered.length, 3);
  t.true(filtered.every(v => 
    (v.language.startsWith("en") || v.language.startsWith("fr")) &&
    (v.quality?.includes("high") || v.quality?.includes("normal"))
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
    createTestVoice({ name: "Voice 1", language: "en-US", quality: ["normal"] }),
    createTestVoice({ name: "Low Quality Voice", language: "en-US", quality: ["veryLow"] }),
    createTestVoice({ name: "Voice 2", language: "fr-FR", quality: ["normal"] })
  ];
  
  const filtered = manager.filterOutVeryLowQualityVoices(testVoices);
  t.is(filtered.length, testVoices.length - 1);
  t.false(filtered.some((v: ReadiumSpeechVoice) => v.quality?.includes("veryLow")));
});

// =============================================
// 8. Voice Sorting Tests
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
    createTestVoice({ name: "High Quality Voice", language: "en-US", quality: ["high"] }),
    createTestVoice({ name: "Low Quality Voice", language: "en-US", quality: ["low"] }),
    createTestVoice({ name: "Normal Quality Voice", language: "en-US", quality: ["normal"] }),
    createTestVoice({ name: "Very High Quality Voice", language: "en-US", quality: ["veryHigh"] }),
    createTestVoice({ name: "Very Low Quality Voice", language: "en-US", quality: ["veryLow"] })
  ];
  
  // Test ascending order (low to high quality)
  const sortedAsc = manager.sortVoices(testVoices, { by: "quality", order: "asc" });
  t.is(sortedAsc[0].quality?.[0], "veryLow");
  t.is(sortedAsc[1].quality?.[0], "low");
  t.is(sortedAsc[2].quality?.[0], "normal");
  t.is(sortedAsc[3].quality?.[0], "high");
  t.is(sortedAsc[4].quality?.[0], "veryHigh");
  
  // Test descending order (high to low quality)
  const sortedDesc = manager.sortVoices(testVoices, { by: "quality", order: "desc" });
  t.is(sortedDesc[0].quality?.[0], "veryHigh");
  t.is(sortedDesc[1].quality?.[0], "high");
  t.is(sortedDesc[2].quality?.[0], "normal");
  t.is(sortedDesc[3].quality?.[0], "low");
  t.is(sortedDesc[4].quality?.[0], "veryLow");
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

// =============================================
// 9. Voice Grouping Tests
// =============================================

testWithContext("groupVoices: groups by language", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Create test voices with different languages
  const testVoices = [
    { voiceURI: "voice1", name: "Voice 1", language: "en-US" },
    { voiceURI: "voice2", name: "Voice 2", language: "fr-FR" },
    { voiceURI: "voice3", name: "Voice 3", language: "en-US" }
  ];
  
  const groups = (manager as any).groupVoices(testVoices, "language");
  
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
  
  const groups = manager.groupVoices(testVoices, "gender");
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
    createTestVoice({ name: "High Quality 1", language: "en-US", quality: ["high"] }),
    createTestVoice({ name: "Low Quality Voice", language: "en-US", quality: ["low"] }),
    createTestVoice({ name: "High Quality 2", language: "fr-FR", quality: ["high"] })
  ];
  
  const groups = manager.groupVoices(testVoices, "quality");
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
  
  const groups = manager.groupVoices(testVoices, "region");
  t.is(Object.keys(groups).length, 4);
  t.is(groups.US.length, 1);
  t.is(groups.GB.length, 1);
  t.is(groups.CA.length, 1);
  t.is(groups.AU.length, 1);
});

testWithContext("groupVoices: handles empty voices array", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  const groups = manager.groupVoices([], "language");
  t.deepEqual(groups, {});
});

testWithContext("groupVoices: handles voices with missing properties", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  const testVoices = [
    createTestVoice({ name: "Voice 1", language: "en-US" }),
    createTestVoice({ name: "Voice 2", language: undefined as any }),
    createTestVoice({ name: "Voice 3", language: "fr-FR", gender: undefined as any }),
    createTestVoice({ name: "Voice 4", language: "es-ES", quality: undefined as any })
  ];
  
  // Should handle missing properties gracefully
  const groupsByLanguage = manager.groupVoices(testVoices, "language");
  t.true(groupsByLanguage.hasOwnProperty("en"));
  t.true(groupsByLanguage.hasOwnProperty("fr"));
  t.true(groupsByLanguage.hasOwnProperty("es"));
  
  const groupsByGender = manager.groupVoices(testVoices, "gender");
  // Should have an "undefined" group for voices without gender
  
  const groupsByQuality = manager.groupVoices(testVoices, "quality");
  // Should have an "undefined" group for voices without quality
});

// =============================================
// 10. Conversion Tests
// =============================================

testWithContext("convertToSpeechSynthesisVoice: converts ReadiumSpeechVoice to SpeechSynthesisVoice", async (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  const voices = await manager.getVoices();
  t.plan(3);
  
  if (voices.length > 0) {
    const speechVoice = manager.convertToSpeechSynthesisVoice(voices[0]);
    t.truthy(speechVoice);
    t.is(speechVoice?.name, voices[0].name);
    t.is(speechVoice?.voiceURI, voices[0].voiceURI);
  } else {
    t.pass("No voices available to test");
  }
});

testWithContext("convertToSpeechSynthesisVoice: handles invalid voice", (t: ExecutionContext<TestContext>) => {
  const manager = t.context.manager;
  
  // Test with undefined voice
  const result1 = manager.convertToSpeechSynthesisVoice(undefined as any);
  t.is(result1, undefined);
  
  // Test with voice that doesn't match any browser voice
  const invalidVoice = createTestVoice({ name: "Non-existent Voice", language: "xx-XX" });
  const result2 = manager.convertToSpeechSynthesisVoice(invalidVoice);
  t.is(result2, undefined);
});