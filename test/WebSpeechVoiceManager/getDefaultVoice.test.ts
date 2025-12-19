import { type ExecutionContext } from "ava";
import { testWithContext, TestContext, mockVoices } from "./setup.js";
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
// getDefaultVoice Tests
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
      quality: "high" 
    },
    { 
      voiceURI: "voice2", 
      name: "Normal Quality", 
      language: "en-US", 
      isDefault: true,  // Default but lower quality
      quality: "normal" 
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
      quality: "high" 
    },
    { 
      voiceURI: "voice2", 
      name: "US English", 
      language: "en-US", 
      isDefault: false,
      quality: "high" 
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
      quality: "high" 
    },
    { 
      voiceURI: "voice2", 
      name: "Very High Quality", 
      language: "en-US", 
      isDefault: false,
      quality: "veryHigh"  // Higher quality
    },
    { 
      voiceURI: "voice3", 
      name: "Normal Quality", 
      language: "en-US", 
      isDefault: false,
      quality: "normal"  // Lower quality
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