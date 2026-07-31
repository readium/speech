import test from "ava";
import {
  ReadiumSpeechProviderRegistry,
  WebSpeechEngineProvider,
  SpeechServerEngineProvider,
  WebSpeechVoiceManager
} from "../../build/index.js";
import { createMockFetch, makeServerVoice } from "../SpeechServer/testUtils.js";

// =============================================
// Mock Web Speech API
// =============================================
// WebSpeechEngineProvider constructs a WebSpeechEngine internally, which throws
// in its constructor unless speechSynthesis/SpeechSynthesisUtterance exist.

class MockUtterance {
  constructor(public text: string) {}
}

function makeVoice(lang: string, name: string) {
  return { voiceURI: `${name}-${lang}`, name, lang, localService: true, default: false };
}

const mockWebSpeechVoices = [makeVoice("en-US", "English Voice")];

function setWebSpeechGlobals() {
  if (typeof (globalThis as any).window === "undefined") {
    (globalThis as any).window = globalThis;
  }
  (globalThis as any).window.SpeechSynthesisUtterance = MockUtterance;
  (globalThis as any).window.speechSynthesis = {
    speaking: false,
    paused: false,
    onvoiceschanged: null,
    getVoices: () => mockWebSpeechVoices,
    speak: () => {},
    cancel: () => {},
    pause: () => {},
    resume: () => {},
    addEventListener: () => {},
    removeEventListener: () => {}
  };
}

test.beforeEach(() => {
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;
  setWebSpeechGlobals();
});

test.afterEach.always(() => {
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;
});

function makeSpeechServerProvider() {
  const { fetchImpl } = createMockFetch({ voices: () => [makeServerVoice()] });
  return new SpeechServerEngineProvider({
    endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" },
    fetch: fetchImpl
  });
}

// =============================================
// Tests
// =============================================

test.serial("getAllVoices() returns grouped voices for every registered provider, including WebSpeech with no engine created yet", async (t) => {
  const registry = new ReadiumSpeechProviderRegistry();
  registry.register(new WebSpeechEngineProvider());
  registry.register(makeSpeechServerProvider());

  const grouped = await registry.getAllVoices();

  const webspeech = grouped.find(g => g.providerId === "webspeech");
  const speechServer = grouped.find(g => g.providerId === "speech-server");

  t.truthy(webspeech, "webspeech group is present");
  t.true(webspeech!.voices.length > 0, "WebSpeechEngineProvider.getVoices() resolves without requiring createEngine() first");
  t.truthy(speechServer);
  t.true(speechServer!.voices.length > 0);
});

function registerBoth(registry: ReadiumSpeechProviderRegistry): void {
  registry.register(new WebSpeechEngineProvider());
  registry.register(makeSpeechServerProvider());
}

for (const providerId of ["webspeech", "speech-server"]) {
  test.serial(`getVoices("${providerId}") works on its own, without createEngine() or getAllVoices() first`, async (t) => {
    const registry = new ReadiumSpeechProviderRegistry();
    registerBoth(registry);

    const voices = await registry.getVoices(providerId);
    t.true(voices.length > 0);
  });

  test.serial(`createEngine("${providerId}") works for a provider whose voices were never explicitly fetched via getVoices()`, async (t) => {
    const registry = new ReadiumSpeechProviderRegistry();
    registerBoth(registry);

    const engine = await registry.createEngine(providerId);
    t.truthy(engine);
  });
}

test.serial("destroy() tears down every registered provider and clears the registry", async (t) => {
  const registry = new ReadiumSpeechProviderRegistry();
  registry.register(new WebSpeechEngineProvider());
  registry.register(makeSpeechServerProvider());

  await registry.getAllVoices();
  await registry.destroy();

  t.deepEqual(registry.list(), []);
});
