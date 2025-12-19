import { type ExecutionContext } from "ava";
import { testWithContext, TestContext, mockVoices, mockSpeechSynthesis } from "./setup.js";
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