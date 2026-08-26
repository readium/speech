import test from "ava";
import { SpeechServerEngine, chunkPlainText } from "../../build/index.js";
import { createMockFetch, makeServerVoice, wavBase64, flush, defaultServiceInfo } from "./testUtils.js";

// =============================================
// Mock <audio> (canPlayType probing only)
// =============================================
// The engine's `canPlayType` field probes `new Audio().canPlayType(mime)` to pick an output
// format; Node has no such global, so this stands in for it. Actual playback goes through
// Web Audio (see the AudioContext mocks below), not this class.

class MockAudio {
  canPlayType(_mime: string): string {
    return "probably";
  }
}

// =============================================
// Mock Web Audio API
// =============================================
// SpeechServerEngine drives playback through AudioContext/AudioBufferSourceNode in the
// browser; Node has no such globals, so these stand in for them.

class MockAudioBuffer {
  constructor(public duration: number) {}
}

class MockGainNode {
  static instances: MockGainNode[] = [];
  gain = { value: 1 };
  constructor() {
    MockGainNode.instances.push(this);
  }
  connect(): void {}
  disconnect(): void {}
}

class MockAudioBufferSourceNode {
  static instances: MockAudioBufferSourceNode[] = [];
  buffer: MockAudioBuffer | null = null;
  playbackRate = { value: 1 };
  onended: (() => void) | null = null;
  startedAt: number | null = null;
  constructor() {
    MockAudioBufferSourceNode.instances.push(this);
  }
  connect(): void {}
  disconnect(): void {}
  start(t: number): void {
    this.startedAt = t;
  }
  stop(): void {}
}

class MockAudioContext {
  static instances: MockAudioContext[] = [];
  // Consumed FIFO by decodeAudioData, one entry per call; falls back to 1s once exhausted.
  static decodeDurations: number[] = [];

  currentTime = 0;
  state: "running" | "suspended" | "closed" = "running";
  destination = {};

  constructor() {
    MockAudioContext.instances.push(this);
  }

  createGain(): MockGainNode {
    return new MockGainNode();
  }

  createBufferSource(): MockAudioBufferSourceNode {
    return new MockAudioBufferSourceNode();
  }

  decodeAudioData(_buffer: ArrayBuffer): Promise<MockAudioBuffer> {
    const duration = MockAudioContext.decodeDurations.shift() ?? 1;
    return Promise.resolve(new MockAudioBuffer(duration));
  }

  suspend(): Promise<void> {
    this.state = "suspended";
    return Promise.resolve();
  }

  resume(): Promise<void> {
    this.state = "running";
    return Promise.resolve();
  }

  close(): Promise<void> {
    this.state = "closed";
    return Promise.resolve();
  }
}

// Fake requestAnimationFrame/cancelAnimationFrame: queues callbacks instead of firing on a
// real clock, so tests drive boundary polling deterministically via driveFrame().
let rafCallbacks = new Map<number, (t: number) => void>();
let rafNextId = 1;

function driveFrame(): void {
  const callbacks = Array.from(rafCallbacks.values());
  rafCallbacks.clear();
  callbacks.forEach(cb => cb(0));
}

test.beforeEach(() => {
  (globalThis as any).Audio = MockAudio;

  MockAudioContext.instances = [];
  MockAudioContext.decodeDurations = [];
  MockAudioBufferSourceNode.instances = [];
  MockGainNode.instances = [];
  (globalThis as any).AudioContext = MockAudioContext;

  rafCallbacks = new Map();
  rafNextId = 1;
  (globalThis as any).requestAnimationFrame = (cb: (t: number) => void) => {
    const id = rafNextId++;
    rafCallbacks.set(id, cb);
    return id;
  };
  (globalThis as any).cancelAnimationFrame = (id: number) => {
    rafCallbacks.delete(id);
  };
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

  MockAudioBufferSourceNode.instances[0].onended?.();
  t.deepEqual(events, ["loading", "start", "end"]);
  t.is(engine.getState(), "idle", "state is idle after the last (only) utterance ends");
});

test.serial("boundary marks fire as the AudioContext clock crosses each mark's elapsedTime", async (t) => {
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

  const ctx = MockAudioContext.instances[0];
  ctx.currentTime = 0;
  driveFrame();
  t.is(boundaries.length, 1);
  t.is(boundaries[0].charIndex, 0);

  ctx.currentTime = 0.5;
  driveFrame();
  t.is(boundaries.length, 2);
  t.is(boundaries[1].charIndex, 6);
});

test.serial("pause/resume control the underlying AudioContext", async (t) => {
  const { fetchImpl } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hello" }]);
  engine.speak();
  await flush();

  const ctx = MockAudioContext.instances[0];

  engine.pause();
  t.is(engine.getState(), "paused");
  t.is(ctx.state, "suspended");

  engine.resume();
  t.is(engine.getState(), "playing");
  t.is(ctx.state, "running");
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
  t.is(MockAudioBufferSourceNode.instances[0].playbackRate.value, 2, "local fallback applies since controls.speed isn't true");

  engine.setVoice(makeServerVoice({ controls: { speed: true } }) as any);
  engine.speak();
  await flush();
  t.is(MockAudioBufferSourceNode.instances[1].playbackRate.value, 1, "server is trusted to apply speed itself, no local doubling");
});

test.serial("setVoice(string) with an uncached identifier resolves controls.speed in the background, avoiding a doubled rate once resolved", async (t) => {
  const { fetchImpl } = createMockFetch({
    voices: () => [makeServerVoice()],
    service: () => ({ json: { ...defaultServiceInfo(), providers: [{ id: "pocket", installedLanguages: ["en"], controls: { speed: true } }] } }),
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.setRate(2);
  engine.loadUtterances([{ plain: "Hello" }]);

  // Voice list isn't cached yet, so this only has a placeholder with no `controls` at first.
  engine.setVoice("urn:readium:tts:pocket:alba");
  t.is(engine.getCurrentVoice()?.controls, undefined, "placeholder has no controls yet, right after setVoice()");

  await flush(); // background getAvailableVoices() resolves

  t.deepEqual(engine.getCurrentVoice()?.controls, { speed: true }, "placeholder was swapped for the real, cached voice");

  engine.speak();
  await flush();
  t.is(MockAudioBufferSourceNode.instances[0].playbackRate.value, 1, "server-honored speed is trusted, not doubled with a local fallback");
});

test.serial("setVoice(string) called again before the background voice lookup resolves doesn't get overwritten by the stale lookup", async (t) => {
  const { fetchImpl } = createMockFetch({
    voices: () => [
      makeServerVoice(),
      makeServerVoice({ name: "Estelle", identifier: "urn:readium:tts:elevenlabs:estelle", provider: "elevenlabs" })
    ],
    service: () => ({
      json: {
        ...defaultServiceInfo(),
        providers: [
          { id: "pocket", installedLanguages: ["en"], controls: { speed: true } },
          { id: "elevenlabs", installedLanguages: ["en"], controls: {} }
        ]
      }
    })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });

  engine.setVoice("urn:readium:tts:pocket:alba");
  engine.setVoice("urn:readium:tts:elevenlabs:estelle"); // supersedes the still-pending lookup for "alba"
  await flush();

  t.is(engine.getCurrentVoice()?.identifier, "urn:readium:tts:elevenlabs:estelle", "the later setVoice() call wins, not the earlier one's background resolution");
  t.deepEqual(engine.getCurrentVoice()?.controls, {}, "estelle's own provider's controls, not alba's");
});

test.serial("setVolume applies to the shared gain node", async (t) => {
  const { fetchImpl } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hello" }]);
  engine.speak();
  await flush();

  engine.setVolume(0.4);
  t.is(MockGainNode.instances[0].gain.value, 0.4);
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

test.serial("split chunks are capped at readyBufferChars, not the (larger) maxTextLength", async (t) => {
  const maxTextLength = 40;
  const readyBufferChars = 20;
  const text = "First sentence here now. Second sentence follows too.";
  const expectedChunks = chunkPlainText(text, readyBufferChars);
  t.true(text.length > maxTextLength, "text must actually exceed maxTextLength, or splitting wouldn't happen at all");
  t.true(chunkPlainText(text, maxTextLength).length < expectedChunks.length, "readyBufferChars must produce more/smaller chunks than maxTextLength alone would");

  const { fetchImpl, calls } = createMockFetch({
    service: () => ({ json: { ...defaultServiceInfo(), limits: { maxTextLength, maxConcurrentSyntheses: 2 } } }),
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({
    endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" },
    fetch: fetchImpl,
    readyBufferChars
  });
  engine.loadUtterances([{ plain: text }]);

  engine.speak();
  await flush();

  const synthCalls = calls.filter(c => c.url.endsWith("/synthesize"));
  t.deepEqual(synthCalls.map(c => JSON.parse(c.init.body).text), expectedChunks.map(c => c.text));
});

test.serial("bufferUntilReady doesn't wait for a long utterance's entire chunk train, just its first chunk", async (t) => {
  const maxTextLength = 20;
  const readyBufferChars = 5; // smaller than the utterance's own text, so index 0 alone qualifies
  const text = "First sentence here now. Second sentence follows too. And a third one here.";
  const expectedChunkCount = chunkPlainText(text, Math.min(maxTextLength, readyBufferChars)).length;
  t.true(expectedChunkCount > 1);

  const pending: Array<() => void> = [];
  let synthCount = 0;
  const fetchImpl = (async (url: string) => {
    if (url.endsWith("/service")) {
      return {
        ok: true,
        status: 200,
        headers: { get: () => "application/json" },
        json: async () => ({ ...defaultServiceInfo(), limits: { maxTextLength, maxConcurrentSyntheses: 2 } })
      };
    }
    if (!url.endsWith("/synthesize")) {
      throw new Error(`Unhandled mock fetch URL: ${url}`);
    }
    synthCount++;
    if (synthCount > 1) {
      await new Promise<void>(resolve => pending.push(resolve));
    }
    return {
      ok: true,
      status: 200,
      headers: { get: () => "application/json" },
      json: async () => ({ audio: wavBase64(), format: "wav", boundaries: null })
    };
  }) as unknown as typeof fetch;

  const engine = new SpeechServerEngine({
    endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" },
    fetch: fetchImpl,
    readyBufferChars
  });

  const events: string[] = [];
  engine.on("ready", () => events.push("ready"));

  engine.loadUtterances([{ plain: text }]);
  await flush();

  t.true(events.includes("ready"), "ready fired despite later chunks of the same utterance still being in flight");
  t.true(pending.length > 0, "sanity check: this test setup does leave later chunks unresolved");
});

test.serial("chunked utterance playback fires a single start/end pair across all chunks", async (t) => {
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

  t.is(MockAudioBufferSourceNode.instances.length, expectedChunkCount, "every chunk resolved and got scheduled by the time speak() settles");
  t.deepEqual(events, ["start"], "\"start\" fires once, for the logical utterance, not per chunk");

  for (let i = 0; i < expectedChunkCount - 1; i++) {
    t.is(MockAudioBufferSourceNode.instances[i].onended, null, "only the last chunk's node gets an onended handler");
  }

  MockAudioBufferSourceNode.instances[expectedChunkCount - 1].onended?.();
  t.deepEqual(events, ["start", "end"], "\"end\" fires once, only after the last chunk's node ends");
  t.is(engine.getState(), "idle");
});

test.serial("chunked utterance playback starts on the first chunk without waiting for the rest", async (t) => {
  const maxTextLength = 20;
  const text = "First sentence here now. Second sentence follows too. And a third one here.";
  const expectedChunkCount = chunkPlainText(text, maxTextLength).length;
  t.true(expectedChunkCount > 2, "need 3+ chunks to tell \"only chunk 0 ready\" apart from \"everything ready\"");

  const pending: Array<() => void> = [];
  let synthCount = 0;
  const fetchImpl = (async (url: string) => {
    if (url.endsWith("/service")) {
      return {
        ok: true,
        status: 200,
        headers: { get: () => "application/json" },
        json: async () => ({ ...defaultServiceInfo(), limits: { maxTextLength, maxConcurrentSyntheses: 2 } })
      };
    }
    if (!url.endsWith("/synthesize")) {
      throw new Error(`Unhandled mock fetch URL: ${url}`);
    }
    synthCount++;
    if (synthCount > 1) {
      await new Promise<void>(resolve => pending.push(resolve));
    }
    return {
      ok: true,
      status: 200,
      headers: { get: () => "application/json" },
      json: async () => ({ audio: wavBase64(), format: "wav", boundaries: null })
    };
  }) as unknown as typeof fetch;

  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: text }]);

  const events: string[] = [];
  engine.on("start", () => events.push("start"));

  engine.speak();
  await flush();

  t.deepEqual(events, ["start"], "playback starts once chunk 0 is ready, without waiting for chunks 1+");
  t.is(MockAudioBufferSourceNode.instances.length, 1, "only chunk 0 is scheduled — the rest are still in flight");

  pending.shift()!();
  await flush();
  t.is(MockAudioBufferSourceNode.instances.length, 2, "chunk 1 is appended to the schedule once its own request resolves");

  while (pending.length > 0) {
    pending.shift()!();
    await flush();
  }
  t.is(MockAudioBufferSourceNode.instances.length, expectedChunkCount, "every chunk eventually gets scheduled");
});

test.serial("chunked utterance nodes are scheduled back-to-back with zero gap between them", async (t) => {
  const maxTextLength = 20;
  const text = "First sentence here now. Second sentence follows too. And a third one here.";
  const expectedChunkCount = chunkPlainText(text, maxTextLength).length;
  t.true(expectedChunkCount > 1);

  const durations = [2, 3, 1.5, 4, 5]; // more than enough for any chunk count
  MockAudioContext.decodeDurations = [...durations];

  const { fetchImpl } = createMockFetch({
    service: () => ({ json: { ...defaultServiceInfo(), limits: { maxTextLength, maxConcurrentSyntheses: 2 } } }),
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ endpoints: { voices: "http://localhost:8000/voices", synthesize: "http://localhost:8000/synthesize", service: "http://localhost:8000/service" }, fetch: fetchImpl });
  engine.loadUtterances([{ plain: text }]);

  engine.speak();
  await flush();

  let expectedStart = 0;
  for (let i = 0; i < expectedChunkCount; i++) {
    t.is(MockAudioBufferSourceNode.instances[i].startedAt, expectedStart, `chunk ${i} starts exactly where the previous one ended`);
    expectedStart += durations[i];
  }
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

  const ctx = MockAudioContext.instances[0];

  ctx.currentTime = 0;
  driveFrame();
  t.is(boundaries.length, 1);
  t.is(boundaries[0].charIndex, 2 + expectedChunks[0].offset, "first chunk's charIndex is offset by its (zero) position");

  // Chunks are scheduled back-to-back at 1s each (the mock's default decoded duration), so
  // the second chunk's mark (elapsedTime: 0) crosses once the clock reaches its start time.
  ctx.currentTime = 1;
  driveFrame();
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
