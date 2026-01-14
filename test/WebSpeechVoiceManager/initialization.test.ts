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

testWithContext("initialization: keeps all voices by default", (t) => {
  const manager = t.context.manager;
  
  // Test 1: Basic duplicate voices
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

  const basicVoices = (manager as any).parseToReadiumSpeechVoices([lowVoice, normalVoice]);
  t.is(basicVoices.length, 2, "Should keep both basic voices when parsing");
  
  const basicFiltered = manager.filterVoices({}, basicVoices);
  t.is(basicFiltered.length, 2, "Should keep both basic voices by default");
  
  // Verify specific voices are preserved
  const lowQualityVoice = basicFiltered.find((v: any) => v.voiceURI === lowVoice.voiceURI);
  const normalQualityVoice = basicFiltered.find((v: any) => v.voiceURI === normalVoice.voiceURI);
  t.is(lowQualityVoice?.originalName, "Samantha", "Should preserve low quality voice original name");
  t.is(normalQualityVoice?.originalName, "Samantha (enhanced)", "Should preserve normal quality voice original name");
  
  // Test 2: VoiceURI string duplicates
  const premiumVoices = (manager as any).parseToReadiumSpeechVoices([
    {
      voiceURI: "Samantha",
      name: "Samantha",
      lang: "en-US",
      localService: true,
      default: false
    },
    {
      voiceURI: "Samantha (Premium)",
      name: "Samantha (Premium)",
      lang: "en-US",
      localService: true,
      default: false
    }
  ]);
  t.is(premiumVoices.length, 2, "Should keep both premium voices when parsing");
  
  const premiumFiltered = manager.filterVoices({}, premiumVoices);
  t.is(premiumFiltered.length, 2, "Should keep both premium voices by default");
  
  // Verify specific voices are preserved
  const basicVoice = premiumFiltered.find((v: any) => v.voiceURI === "Samantha");
  const enhancedVoice = premiumFiltered.find((v: any) => v.voiceURI === "Samantha (Premium)");
  t.is(basicVoice?.originalName, "Samantha", "Should preserve basic voice original name");
  t.is(enhancedVoice?.originalName, "Samantha (Premium)", "Should preserve enhanced voice original name");
  
  // Test 3: Primary name vs altName matches
  const altNameVoices = (manager as any).parseToReadiumSpeechVoices([
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
  ]);
  t.is(altNameVoices.length, 2, "Should keep both altName voices when parsing");
  
  const altNameFiltered = manager.filterVoices({}, altNameVoices);
  t.is(altNameFiltered.length, 2, "Should keep both altName voices by default");
  
  // Verify specific voices are preserved
  const primaryVoice = altNameFiltered.find((v: any) => v.voiceURI === "Google US English 5 (Natural)");
  const altVoice = altNameFiltered.find((v: any) => v.voiceURI.includes("en-us-x-tpc-local"));
  t.is(primaryVoice?.originalName, "Google US English 5 (Natural)", "Should preserve primary name voice original name");
  t.is(altVoice?.originalName, "Android Speech Recognition and Synthesis from Google en-us-x-tpc-local", "Should preserve altName voice original name");
  
  // Test 4: Multiple altName matches
  const multiAltVoices = (manager as any).parseToReadiumSpeechVoices([
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
  ]);
  t.is(multiAltVoices.length, 2, "Should keep both multi-alt voices when parsing");
  
  const multiAltFiltered = manager.filterVoices({}, multiAltVoices);
  t.is(multiAltFiltered.length, 2, "Should keep both multi-alt voices by default");
  
  // Verify specific voices are preserved
  const localVoice = multiAltFiltered.find((v: any) => v.voiceURI.includes("en-us-x-tpc-local"));
  const networkVoice = multiAltFiltered.find((v: any) => v.voiceURI.includes("en-us-x-tpc-network"));
  t.is(localVoice?.originalName, "Android Speech Recognition and Synthesis from Google en-us-x-tpc-local", "Should preserve local altName voice original name");
  t.is(networkVoice?.originalName, "Android Speech Recognition and Synthesis from Google en-us-x-tpc-network", "Should preserve network altName voice original name");
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