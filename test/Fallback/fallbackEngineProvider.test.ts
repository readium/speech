import test from "ava";
import { FallbackEngineProvider, FallbackSpeechEngine, SpeechServerEngineProvider, WebSpeechEngineProvider, WebSpeechVoiceManager } from "../../build/index.js";
import { createMockFetch, makeServerVoice } from "../SpeechServer/testUtils.js";
import { FakeFallbackProvider, stubOnLine } from "./testUtils.js";

// =============================================
// Mock Web Speech API
// =============================================

class MockUtterance {
  constructor(public text: string) {}
}

const mockWebSpeechVoices = [{ voiceURI: "en-voice", name: "English Voice", lang: "en-US", localService: true, default: false }];

function setWebSpeechGlobals(): void {
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

function makeUnreachableSpeechServerProvider(): SpeechServerEngineProvider {
  return new SpeechServerEngineProvider({
    endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" },
    fetch: (async () => {
      throw new TypeError("Failed to fetch");
    }) as any
  });
}

function makeWorkingSpeechServerProvider(): SpeechServerEngineProvider {
  const { fetchImpl } = createMockFetch({ voices: () => [makeServerVoice()] });
  return new SpeechServerEngineProvider({
    endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" },
    fetch: fetchImpl
  });
}

test.serial("getVoices() falls back to the fallback provider's voices when the primary is unreachable", async (t) => {
  const provider = new FallbackEngineProvider({
    primary: makeUnreachableSpeechServerProvider(),
    fallback: new WebSpeechEngineProvider()
  });

  const voices = await provider.getVoices();

  t.true(voices.length > 0);
  t.is(voices[0].originalName, "English Voice");
});

test.serial("getVoices() with onFailure: \"error\" rethrows instead of falling back", async (t) => {
  const provider = new FallbackEngineProvider({
    primary: makeUnreachableSpeechServerProvider(),
    fallback: new WebSpeechEngineProvider(),
    onFailure: "error"
  });

  await t.throwsAsync(() => provider.getVoices());
});

test.serial("getVoices() uses the primary's voices when it's reachable", async (t) => {
  const provider = new FallbackEngineProvider({
    primary: makeWorkingSpeechServerProvider(),
    fallback: new WebSpeechEngineProvider()
  });

  const voices = await provider.getVoices();

  t.true(voices.length > 0);
  t.is(voices[0].originalName, "alba");
});

test.serial("createEngine() wraps a reachable primary in a FallbackSpeechEngine, so later failures can still swap", async (t) => {
  const provider = new FallbackEngineProvider({
    primary: makeWorkingSpeechServerProvider(),
    fallback: new WebSpeechEngineProvider()
  });

  const engine = await provider.createEngine();

  t.true(engine instanceof FallbackSpeechEngine);
});

test.serial("createEngine() falls back directly when the primary fails to even create an engine", async (t) => {
  const fakePrimary = {
    id: "fake-primary",
    name: "Fake Primary",
    getVoices: async () => [],
    createEngine: async () => {
      throw new Error("primary construction failed");
    },
    destroy: async () => {}
  };

  const provider = new FallbackEngineProvider({
    primary: fakePrimary as any,
    fallback: new WebSpeechEngineProvider()
  });

  const engine = await provider.createEngine();

  t.false(engine instanceof FallbackSpeechEngine, "nothing left to fall back to, so it's the plain fallback engine");
});

test.serial("createEngine() with onFailure: \"error\" rethrows a primary construction failure instead of falling back", async (t) => {
  const fakePrimary = {
    id: "fake-primary",
    name: "Fake Primary",
    getVoices: async () => [],
    createEngine: async () => {
      throw new Error("primary construction failed");
    },
    destroy: async () => {}
  };

  const provider = new FallbackEngineProvider({
    primary: fakePrimary as any,
    fallback: new WebSpeechEngineProvider(),
    onFailure: "error"
  });

  await t.throwsAsync(() => provider.createEngine(), { message: "primary construction failed" });
});

test.serial("destroy() tears down both providers", async (t) => {
  const fakePrimary = new FakeFallbackProvider();
  const fakeFallback = new FakeFallbackProvider();
  let primaryDestroyed = false;
  let fallbackDestroyed = false;
  fakePrimary.destroy = async () => { primaryDestroyed = true; };
  fakeFallback.destroy = async () => { fallbackDestroyed = true; };

  const provider = new FallbackEngineProvider({ primary: fakePrimary as any, fallback: fakeFallback as any });
  await provider.destroy();

  t.true(primaryDestroyed);
  t.true(fallbackDestroyed);
});

test.serial("WebSpeechEngineProvider is available offline through an offline voice", async (t) => {
  t.teardown(stubOnLine(false));
  t.true(await new WebSpeechEngineProvider().isAvailable());
});

test.serial("WebSpeechEngineProvider is unavailable offline with network voices only, available once online", async (t) => {
  (globalThis as any).window.speechSynthesis.getVoices = () => [{ voiceURI: "google-en", name: "Google US English", lang: "en-US", localService: false, default: false }];
  const provider = new WebSpeechEngineProvider();
  const restoreOnLine = stubOnLine(false);
  t.teardown(restoreOnLine);

  t.false(await provider.isAvailable());
  stubOnLine(true);
  t.true(await provider.isAvailable());
});

test.serial("isAvailable() is the primary's, else the fallback's unless onFailure is \"error\"", async (t) => {
  const unavailable = { id: "a", name: "A", getVoices: async () => [], createEngine: async () => { throw new Error(); }, isAvailable: async () => false, destroy: async () => {} };
  const available = { ...unavailable, id: "b", name: "B", isAvailable: async () => true };

  t.true(await new FallbackEngineProvider({ primary: available as any, fallback: unavailable as any }).isAvailable());
  t.true(await new FallbackEngineProvider({ primary: unavailable as any, fallback: available as any }).isAvailable());
  t.false(await new FallbackEngineProvider({ primary: unavailable as any, fallback: available as any, onFailure: "error" }).isAvailable());
});

test.serial("isAvailable() checks the fallback when the primary's probe rejects", async (t) => {
  const rejecting = { id: "a", name: "A", getVoices: async () => [], createEngine: async () => { throw new Error(); }, isAvailable: async () => { throw new Error("offline"); }, destroy: async () => {} };
  const available = { ...rejecting, id: "b", name: "B", isAvailable: async () => true };

  t.true(await new FallbackEngineProvider({ primary: rejecting as any, fallback: available as any }).isAvailable());
  t.false(await new FallbackEngineProvider({ primary: rejecting as any, fallback: available as any, onFailure: "error" }).isAvailable());
});
