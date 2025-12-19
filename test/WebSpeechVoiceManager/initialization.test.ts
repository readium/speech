import test, { type ExecutionContext } from "ava";
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
// Initialization Tests
// =============================================

test("initialize: returns singleton instance", async (t) => {
  // Reset singleton instance
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;
  
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

testWithContext("deduplication: keeps higher quality voice from voiceURI package name", (t) => {
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

  // 1. First parse separately to verify individual qualities
  const lowQualityVoice = (manager as any).parseToReadiumSpeechVoices([lowVoice])[0];
  const normalQualityVoice = (manager as any).parseToReadiumSpeechVoices([normalVoice])[0];

  // Verify individual qualities
  t.is(lowQualityVoice.quality, "low", "Low quality voice should have low quality");
  t.is(normalQualityVoice.quality, "normal", "Normal quality voice should have normal quality");

  // 2. Now parse both together to test deduplication
  const [resultVoice] = (manager as any).parseToReadiumSpeechVoices([lowVoice, normalVoice]);
  
  // Verify the result
  t.is(resultVoice.name, "Samantha", "Should use the JSON name of the voice");
  t.is(resultVoice.originalName, "Samantha (enhanced)", "Should keep the original name of the voice");
  t.deepEqual(resultVoice.quality, "normal", "Should keep the voice with normal quality");
});

testWithContext("deduplication: keeps higher quality voice from voiceURI string", (t) => {
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

  // 1. First parse separately to verify individual qualities
  const basicVoiceParsed = (manager as any).parseToReadiumSpeechVoices([basicVoice])[0];
  const enhancedVoiceParsed = (manager as any).parseToReadiumSpeechVoices([enhancedVoice])[0];

  // Verify individual qualities
  t.is(basicVoiceParsed.quality, "low", "Basic voice should have low quality");
  t.is(enhancedVoiceParsed.quality, "high", "Premium voice should have high quality");

  // 2. Now parse both together to test deduplication
  const [resultVoice] = (manager as any).parseToReadiumSpeechVoices([basicVoice, enhancedVoice]);
  
  // Verify the result
  t.is(resultVoice.name, "Samantha", "Should use the JSON name of the voice");
  t.is(resultVoice.originalName, "Samantha (Premium)", "Should keep the original name of the voice");
  t.deepEqual(resultVoice.quality, "high", "Should keep the voice with high quality");
});

testWithContext("deduplication: keeps higher quality voice from json quality array", (t) => {
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
  const deduped = (manager as any).removeDuplicate(voices);
  
  // Verify only the higher quality voice remains with its original name
  t.is(deduped.length, 1, "Should only keep one voice after deduplication");
  t.is(deduped[0].name, "Samantha", "Should use the JSON name of the voice");
  t.is(deduped[0].originalName, "Samantha (Superior)", "Should keep the original name of the voice");
  t.is(deduped[0].voiceURI, "Samantha superior", "Should keep the voice with superior quality");
  t.deepEqual(deduped[0].quality, "normal", "Should find the voice with normal quality from the array");
});

testWithContext("quality inference: infers quality from nativeID when voiceURI has no indicators", (t) => {
  const manager = t.context.manager;
  
  // Test Francesca voice from es.json which has nativeID with "enhanced"
  // Use plain voiceURI to force nativeID quality inference
  const testVoice = {
    voiceURI: "plain.voice.uri", // No package indicators
    name: "Francesca", // Must match the JSON voice name exactly
    lang: "es-CL", // Must match the JSON voice language
    localService: true,
    default: false
  };
  
  // Parse the voice - it should find Francesca in es.json and infer quality from nativeID
  const voices = (manager as any).parseToReadiumSpeechVoices([testVoice]);
  
  // Should infer "normal" quality from "enhanced" in nativeID array
  t.is(voices[0].quality, "normal", "Should infer 'normal' quality from 'enhanced' in Francesca's nativeID");
});

testWithContext("quality inference: voiceURI takes precedence over nativeID", (t) => {
  const manager = t.context.manager;
  
  // Test Francesca voice with compact in voiceURI (should take precedence over nativeID enhanced)
  const testVoice = {
    voiceURI: "com.apple.speech.synthesis.voice.compact.Francesca", // compact should infer "low"
    name: "Francesca", // Must match the JSON voice name exactly
    lang: "es-CL", // Must match the JSON voice language
    localService: true,
    default: false
  };
  
  // Parse the voice - it should find Francesca but use voiceURI quality (takes precedence)
  const voices = (manager as any).parseToReadiumSpeechVoices([testVoice]);
  
  // Should infer "low" from voiceURI, not "normal" from nativeID (voiceURI takes precedence)
  t.is(voices[0].quality, "low", "Should infer 'low' quality from voiceURI, not 'normal' from nativeID");
});