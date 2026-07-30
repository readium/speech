import test from "ava";
import { SpeechServerEngine, chunkPlainText } from "../../build/index.js";
import { createMockFetch, makeServerVoice, wavBase64, flush, defaultServiceInfo } from "./testUtils.js";

// =============================================
// Mock <audio>
// =============================================
// SpeechServerEngine drives playback through a real HTMLAudioElement in the
// browser; Node has no such global, so this stands in for it.

class MockAudio {
  static instances: MockAudio[] = [];

  src: string;
  currentTime = 0;
  volume = 1;
  playbackRate = 1;
  onended: (() => void) | null = null;
  onerror: (() => void) | null = null;
  private listeners: Record<string, Array<() => void>> = {};

  // No src means this instance exists only to probe canPlayType() (see engine's
  // `canPlayType` field) — it's never actually played, so it's excluded from `instances`,
  // which tests use to inspect the real playback elements created per chunk.
  constructor(src?: string) {
    this.src = src ?? "";
    if (src) {
      MockAudio.instances.push(this);
    }
  }

  addEventListener(type: string, cb: () => void): void {
    (this.listeners[type] ??= []).push(cb);
  }

  removeEventListener(type: string, cb: () => void): void {
    this.listeners[type] = (this.listeners[type] || []).filter(l => l !== cb);
  }

  play(): Promise<void> {
    return Promise.resolve();
  }

  pause(): void {}

  canPlayType(_mime: string): string {
    return "probably";
  }

  emitTimeUpdate(): void {
    (this.listeners["timeupdate"] || []).forEach(cb => cb());
  }
}

test.beforeEach(() => {
  MockAudio.instances = [];
  (globalThis as any).Audio = MockAudio;
});

// =============================================
// Tests
// =============================================

test.serial("speak() POSTs /synthesize with the loaded utterance and current voice identifier", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.setVoice(makeServerVoice() as any);
  engine.loadUtterances([{ id: "u1", plain: "Hello world", language: "en" }]);

  engine.speak();
  await flush();

  const synth = calls.find(c => c.url.endsWith("/synthesize"))!;
  const body = JSON.parse(synth.init.body);
  t.is(body.text, "Hello world");
  t.is(body.ssml, false);
  t.is(body.voice, "urn:readium:tts:pocket:alba");
  t.is(body.boundary, true);
  t.is(body.language, undefined, "language omitted when speakInContentLanguage is off");
});

test.serial("speak() sends the queue's neighboring utterances as prev_utterance/next_utterance", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "First." }, { plain: "Second." }, { plain: "Third." }]);

  engine.speak(1);
  await flush();

  const body = JSON.parse(calls.find(c => c.url.endsWith("/synthesize") && JSON.parse(c.init.body).text === "Second.")!.init.body);
  t.is(body.text, "Second.");
  t.is(body.prev_utterance, "First.");
  t.is(body.next_utterance, "Third.");
});

test.serial("prev_utterance/next_utterance are omitted at the start/end of the queue", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Only one." }]);

  engine.speak();
  await flush();

  const body = JSON.parse(calls.find(c => c.url.endsWith("/synthesize"))!.init.body);
  t.is(body.prev_utterance, undefined);
  t.is(body.next_utterance, undefined);
});

test.serial("ssml-only content (no plain) is sent as text with ssml:true", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ ssml: "<p>Hi</p>" }]);

  engine.speak();
  await flush();

  const body = JSON.parse(calls.find(c => c.url.endsWith("/synthesize"))!.init.body);
  t.is(body.text, "<p>Hi</p>");
  t.is(body.ssml, true);
});

test.serial("plain takes priority over ssml when both are present", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hi", ssml: "<p>Hi</p>" }]);

  engine.speak();
  await flush();

  const body = JSON.parse(calls.find(c => c.url.endsWith("/synthesize"))!.init.body);
  t.is(body.text, "Hi");
  t.is(body.ssml, false);
});

test.serial("setSpeakInContentLanguage(true) sends the utterance's own language", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.setSpeakInContentLanguage(true);
  engine.loadUtterances([{ plain: "Bonjour", language: "fr" }]);

  engine.speak();
  await flush();

  const body = JSON.parse(calls.find(c => c.url.endsWith("/synthesize"))!.init.body);
  t.is(body.language, "fr");
});

test.serial("setVoice(string) uses a cached voice when found, else keeps the raw identifier usable", async (t) => {
  const { fetchImpl } = createMockFetch({ voices: () => [makeServerVoice()] });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });

  await engine.getAvailableVoices();
  engine.setVoice("urn:readium:tts:pocket:alba");
  t.is(engine.getCurrentVoice()?.name, "Alba");

  engine.setVoice("urn:readium:tts:pocket:unknown");
  t.is(engine.getCurrentVoice()?.identifier, "urn:readium:tts:pocket:unknown");
  t.is(engine.getCurrentVoice()?.source, "server");
});

test.serial("speak() plays audio and fires loading/start/end events", async (t) => {
  const { fetchImpl } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });

  const events: string[] = [];
  engine.on("loading", () => events.push("loading"));
  engine.on("start", () => events.push("start"));
  engine.on("end", () => events.push("end"));

  engine.loadUtterances([{ plain: "Hello" }]);
  await flush();
  t.is(engine.getState(), "ready", "buffering resolves before playback is requested");
  events.length = 0; // drop the "loading" from initial buffering; only speak()'s own events matter here

  engine.speak();
  await flush();

  t.deepEqual(events, ["loading", "start"]);
  t.is(engine.getState(), "playing");

  MockAudio.instances[0].onended?.();
  t.deepEqual(events, ["loading", "start", "end"]);
  t.is(engine.getState(), "idle", "state is idle after the last (only) utterance ends");
});

test.serial("boundary marks fire as audio.currentTime crosses each mark's elapsedTime", async (t) => {
  const marks = [
    { name: "word", charIndex: 0, charLength: 5, elapsedTime: 0 },
    { name: "word", charIndex: 6, charLength: 5, elapsedTime: 0.5 }
  ];
  const { fetchImpl } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: marks } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hello world" }]);

  const boundaries: any[] = [];
  engine.on("boundary", (e: any) => boundaries.push(e.detail));

  engine.speak();
  await flush();

  const audio = MockAudio.instances[0];
  audio.currentTime = 0;
  audio.emitTimeUpdate();
  t.is(boundaries.length, 1);
  t.is(boundaries[0].charIndex, 0);

  audio.currentTime = 0.5;
  audio.emitTimeUpdate();
  t.is(boundaries.length, 2);
  t.is(boundaries[1].charIndex, 6);
});

test.serial("pause/resume control the underlying audio element", async (t) => {
  const { fetchImpl } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hello" }]);
  engine.speak();
  await flush();

  engine.pause();
  t.is(engine.getState(), "paused");

  engine.resume();
  t.is(engine.getState(), "playing");
});

test.serial("speak() prefetches the next utterance while the current one plays", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl, prefetchWindow: 1 });
  engine.loadUtterances([{ plain: "First." }, { plain: "Second." }, { plain: "Third." }]);

  engine.speak(0);
  await flush();

  const synthCalls = calls.filter(c => c.url.endsWith("/synthesize"));
  t.is(synthCalls.length, 2, "prefetch for the next utterance fires without waiting for the current one to end");
  t.is(JSON.parse(synthCalls[0].init.body).text, "First.");
  t.is(JSON.parse(synthCalls[1].init.body).text, "Second.");
});

test.serial("the default prefetch window buffers several utterances ahead, not just one", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([
    { plain: "One" }, { plain: "Two" }, { plain: "Three" }, { plain: "Four" }, { plain: "Five" }
  ]);

  engine.speak(0);
  await flush();

  const texts = calls.filter(c => c.url.endsWith("/synthesize")).map(c => JSON.parse(c.init.body).text);
  t.deepEqual(texts, ["One", "Two", "Three", "Four"], "current utterance plus 3 ahead (the default window), not the whole queue");
});

test.serial("prefetch requests are chained: never more than one /synthesize in flight at once", async (t) => {
  const calls: string[] = [];
  const pending: Array<() => void> = [];

  const fetchImpl = (async (url: string, init?: any) => {
    if (url.endsWith("/service")) {
      return {
        ok: true,
        status: 200,
        headers: { get: () => "application/json" },
        json: async () => defaultServiceInfo()
      };
    }
    if (!url.endsWith("/synthesize")) {
      throw new Error(`Unhandled mock fetch URL: ${url}`);
    }
    calls.push(JSON.parse(init.body).text);
    await new Promise<void>((resolve) => pending.push(resolve));
    return {
      ok: true,
      status: 200,
      headers: { get: () => "application/json" },
      json: async () => ({ audio: wavBase64(), format: "wav", boundaries: null })
    };
  }) as unknown as typeof fetch;

  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl, prefetchWindow: 3 });
  engine.loadUtterances([{ plain: "One" }, { plain: "Two" }, { plain: "Three" }, { plain: "Four" }]);

  engine.speak(0);
  await flush();
  t.deepEqual(calls, ["One"], "only the current utterance's own request has been sent so far");

  pending.shift()!();
  await flush();
  t.deepEqual(calls, ["One", "Two"], "prefetch for the next utterance starts once the current one's request resolves");

  pending.shift()!();
  await flush();
  t.deepEqual(calls, ["One", "Two", "Three"], "the following prefetch only starts once the previous one resolves, not concurrently");

  pending.shift()!();
  await flush();
  t.deepEqual(calls, ["One", "Two", "Three", "Four"]);
});

test.serial("a completed prefetch is reused instead of triggering a second fetch", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "First." }, { plain: "Second." }]);

  engine.speak(0);
  await flush();
  t.is(calls.filter(c => c.url.endsWith("/synthesize")).length, 2, "First. fetched, Second. prefetched");

  engine.speak(1);
  await flush();
  t.is(calls.filter(c => c.url.endsWith("/synthesize")).length, 2, "speak(1) reused the prefetch instead of fetching again");
});

test.serial("changing rate invalidates a pending prefetch", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "First." }, { plain: "Second." }]);

  engine.speak(0);
  await flush();
  t.is(calls.filter(c => c.url.endsWith("/synthesize")).length, 2);

  engine.setRate(2);
  engine.speak(1);
  await flush();

  const synthCalls = calls.filter(c => c.url.endsWith("/synthesize"));
  t.is(synthCalls.length, 3, "the rate-2 speak(1) re-fetched instead of reusing the stale rate-1 prefetch");
  t.is(JSON.parse(synthCalls[2].init.body).output.speed, 2);
});

test.serial("no prefetch happens past the end of the queue", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Only one." }]);

  engine.speak(0);
  await flush();

  t.is(calls.filter(c => c.url.endsWith("/synthesize")).length, 1);
});

test.serial("stop() resets to idle and index 0", async (t) => {
  const { fetchImpl } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "One" }, { plain: "Two" }]);
  engine.speak(1);
  await flush();

  engine.stop();
  t.is(engine.getState(), "idle");
  t.is(engine.getCurrentUtteranceIndex(), 0);
});

test.serial("a non-ok /synthesize response surfaces as an error event, not a thrown exception", async (t) => {
  const { fetchImpl } = createMockFetch({
    synthesize: () => ({
      status: 404,
      ok: false,
      json: {
        type: "urn:example:voice-not-found",
        title: "Voice Not Found",
        status: 404,
        detail: "Voice 'x' not found."
      },
      contentType: "application/problem+json"
    })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hello" }]);

  const errors: any[] = [];
  engine.on("error", (e: any) => errors.push(e.detail));

  engine.speak();
  await flush();

  t.is(errors.length, 1);
  t.is(errors[0].message, "Voice 'x' not found.");
  t.is(errors[0].status, 404);
  t.is(errors[0].type, "urn:example:voice-not-found");
  t.is(engine.getState(), "idle");
});

test.serial("rate is only faked locally when the voice's controls don't report server-side speed support", async (t) => {
  const { fetchImpl } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.setRate(2);
  engine.loadUtterances([{ plain: "Hello" }]);

  engine.setVoice(makeServerVoice({ controls: {} }) as any);
  engine.speak();
  await flush();
  t.is(MockAudio.instances[0].playbackRate, 2, "local fallback applies since controls.speed isn't true");

  engine.setVoice(makeServerVoice({ controls: { speed: true } }) as any);
  engine.speak();
  await flush();
  t.is(MockAudio.instances[1].playbackRate, 1, "server is trusted to apply speed itself, no local doubling");
});

test.serial("setVolume applies to the live audio element", async (t) => {
  const { fetchImpl } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hello" }]);
  engine.speak();
  await flush();

  engine.setVolume(0.4);
  t.is(MockAudio.instances[0].volume, 0.4);
});

test.serial("synthesize() requests /service's advertised default output format", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    // A single advertised format means it's the only playable candidate regardless of
    // strategy, isolating this test from selectFormat()'s quality/bandwidth ranking.
    service: () => ({ json: { ...defaultServiceInfo(), output: { formats: ["mp3"], default: "mp3" } } }),
    synthesize: () => ({ json: { audio: wavBase64(), format: "mp3", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hello" }]);

  engine.speak();
  await flush();

  const body = JSON.parse(calls.find(c => c.url.endsWith("/synthesize"))!.init.body);
  t.is(body.output.format, "mp3");
});

test.serial("/service is only fetched once and reused across multiple synthesize() calls", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "First." }, { plain: "Second." }]);

  engine.speak(0);
  await flush();
  engine.speak(1);
  await flush();

  t.is(calls.filter(c => c.url.endsWith("/service")).length, 1, "cached after the first fetch");
});

test.serial("text exceeding /service's maxTextLength is split into multiple sequential /synthesize requests by default", async (t) => {
  const maxTextLength = 20;
  const text = "First sentence here now. Second sentence follows too.";
  const expectedChunks = chunkPlainText(text, maxTextLength);
  t.true(expectedChunks.length > 1, "test text must actually need chunking for this test to be meaningful");

  const { fetchImpl, calls } = createMockFetch({
    service: () => ({ json: { ...defaultServiceInfo(), limits: { maxTextLength, maxConcurrentSyntheses: 2 } } }),
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: text }]);

  engine.speak();
  await flush();

  const synthCalls = calls.filter(c => c.url.endsWith("/synthesize"));
  t.is(synthCalls.length, expectedChunks.length);
  t.deepEqual(synthCalls.map(c => JSON.parse(c.init.body).text), expectedChunks.map(c => c.text));
});

test.serial("chunked utterance playback fires a single start/end pair across all chunks, chained via onended", async (t) => {
  const maxTextLength = 20;
  const text = "First sentence here now. Second sentence follows too.";
  const expectedChunkCount = chunkPlainText(text, maxTextLength).length;
  t.true(expectedChunkCount > 1);

  const { fetchImpl } = createMockFetch({
    service: () => ({ json: { ...defaultServiceInfo(), limits: { maxTextLength, maxConcurrentSyntheses: 2 } } }),
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: text }]);

  const events: string[] = [];
  engine.on("start", () => events.push("start"));
  engine.on("end", () => events.push("end"));

  engine.speak();
  await flush();

  t.is(MockAudio.instances.length, 1, "only the first chunk's <audio> exists until it ends — the rest are created lazily");
  t.deepEqual(events, ["start"], "\"start\" fires once, for the logical utterance, not per chunk");

  for (let i = 0; i < expectedChunkCount - 1; i++) {
    MockAudio.instances[i].onended?.();
    t.is(MockAudio.instances.length, i + 2, "the next chunk's <audio> is created once the previous one ends");
    t.deepEqual(events, ["start"], "\"end\" hasn't fired yet — chunks before the last just chain to the next");
  }

  MockAudio.instances[expectedChunkCount - 1].onended?.();
  t.is(MockAudio.instances.length, expectedChunkCount, "exactly one <audio> element was created per chunk overall");
  t.deepEqual(events, ["start", "end"], "\"end\" fires once, only after the last chunk");
  t.is(engine.getState(), "idle");
});

test.serial("boundary charIndex is offset by each chunk's position in the original utterance text", async (t) => {
  const maxTextLength = 20;
  const text = "First sentence here now. Second sentence follows too.";
  const expectedChunks = chunkPlainText(text, maxTextLength);
  t.true(expectedChunks.length > 1);

  const marksByChunkText = new Map(expectedChunks.map(c => [c.text, [{ name: "word", charIndex: 2, charLength: 3, elapsedTime: 0 }]]));

  const { fetchImpl } = createMockFetch({
    service: () => ({ json: { ...defaultServiceInfo(), limits: { maxTextLength, maxConcurrentSyntheses: 2 } } }),
    synthesize: (body) => ({ json: { audio: wavBase64(), format: "wav", boundaries: marksByChunkText.get(body.text) ?? null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: text }]);

  const boundaries: any[] = [];
  engine.on("boundary", (e: any) => boundaries.push(e.detail));

  engine.speak();
  await flush();

  MockAudio.instances[0].currentTime = 0;
  MockAudio.instances[0].emitTimeUpdate();
  t.is(boundaries.length, 1);
  t.is(boundaries[0].charIndex, 2 + expectedChunks[0].offset, "first chunk's charIndex is offset by its (zero) position");

  MockAudio.instances[0].onended?.();
  MockAudio.instances[1].currentTime = 0;
  MockAudio.instances[1].emitTimeUpdate();
  t.is(boundaries.length, 2);
  t.true(expectedChunks[1].offset > 0, "test setup sanity check: the second chunk isn't at the start of the text");
  t.is(boundaries[1].charIndex, 2 + expectedChunks[1].offset, "second chunk's charIndex is offset by its position in the original text");
});

test.serial("overLengthText: \"error\" opts back into the old fail-fast behavior instead of splitting", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    service: () => ({ json: { ...defaultServiceInfo(), limits: { maxTextLength: 5, maxConcurrentSyntheses: 2 } } })
  });
  const engine = new SpeechServerEngine({
    endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" },
    fetch: fetchImpl,
    overLengthText: "error"
  });
  engine.loadUtterances([{ plain: "Way too long for the limit" }]);

  const errors: any[] = [];
  engine.on("error", (e: any) => errors.push(e.detail));

  engine.speak();
  await flush();

  t.is(errors.length, 1);
  t.is(errors[0].status, 413);
  t.is(errors[0].type, "https://readium.org/speech-server/error#payload_too_large");
  t.is(calls.filter(c => c.url.endsWith("/synthesize")).length, 0, "the oversized request never reached /synthesize");
});

test.serial("overLengthText: \"error\" also rejects over-long SSML content, which isn't split", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    service: () => ({ json: { ...defaultServiceInfo(), limits: { maxTextLength: 5, maxConcurrentSyntheses: 2 } } })
  });
  const engine = new SpeechServerEngine({
    endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" },
    fetch: fetchImpl,
    overLengthText: "error"
  });
  engine.loadUtterances([{ ssml: "<p>Way too long for the limit</p>" }]);

  const errors: any[] = [];
  engine.on("error", (e: any) => errors.push(e.detail));

  engine.speak();
  await flush();

  t.is(errors.length, 1);
  t.is(errors[0].status, 413);
  t.is(calls.filter(c => c.url.endsWith("/synthesize")).length, 0);
});

test.serial("format.preferredFormat is requested when the server advertises it", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    service: () => ({ json: { ...defaultServiceInfo(), output: { formats: ["wav", "mp3", "opus"], default: "wav" } } }),
    synthesize: () => ({ json: { audio: wavBase64(), format: "opus", boundaries: null } })
  });
  const engine = new SpeechServerEngine({
    endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" },
    fetch: fetchImpl,
    format: { preferredFormat: "opus" }
  });
  engine.loadUtterances([{ plain: "Hello" }]);

  engine.speak();
  await flush();

  const body = JSON.parse(calls.find(c => c.url.endsWith("/synthesize"))!.init.body);
  t.is(body.output.format, "opus");
});

test.serial("format.strategy: \"bandwidth\" picks opus over wav/mp3 when all are advertised", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    service: () => ({ json: { ...defaultServiceInfo(), output: { formats: ["wav", "mp3", "opus"], default: "wav" } } }),
    synthesize: () => ({ json: { audio: wavBase64(), format: "opus", boundaries: null } })
  });
  const engine = new SpeechServerEngine({
    endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" },
    fetch: fetchImpl,
    format: { strategy: "bandwidth" }
  });
  engine.loadUtterances([{ plain: "Hello" }]);

  engine.speak();
  await flush();

  const body = JSON.parse(calls.find(c => c.url.endsWith("/synthesize"))!.init.body);
  t.is(body.output.format, "opus");
});

test.serial("no format options sends no bitrate, matching today's behavior", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({
    endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" },
    fetch: fetchImpl
  });
  engine.loadUtterances([{ plain: "Hello" }]);

  engine.speak();
  await flush();

  const body = JSON.parse(calls.find(c => c.url.endsWith("/synthesize"))!.init.body);
  t.is(body.output.bitrate, undefined);
});

test.serial("format.adaptBitrateToNetwork sends a reduced bitrate when navigator.connection reports a constrained connection", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    service: () => ({ json: { ...defaultServiceInfo(), output: { formats: ["mp3"], default: "mp3" } } }),
    synthesize: () => ({ json: { audio: wavBase64(), format: "mp3", boundaries: null } })
  });
  const engine = new SpeechServerEngine({
    endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" },
    fetch: fetchImpl,
    format: { adaptBitrateToNetwork: true }
  });
  engine.loadUtterances([{ plain: "Hello" }]);

  (navigator as any).connection = { saveData: true };
  try {
    engine.speak();
    await flush();
  } finally {
    delete (navigator as any).connection;
  }

  const body = JSON.parse(calls.find(c => c.url.endsWith("/synthesize"))!.init.body);
  t.is(body.output.bitrate, 48000);
});
