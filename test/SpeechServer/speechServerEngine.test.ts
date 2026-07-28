import test from "ava";
import { SpeechServerEngine } from "../../build/index.js";
import { createMockFetch, makeServerVoice, wavBase64, flush } from "./testUtils.js";

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

  constructor(src: string) {
    this.src = src;
    MockAudio.instances.push(this);
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
  const engine = new SpeechServerEngine({ baseUrl: "http://localhost:8000", fetch: fetchImpl });
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

test.serial("ssml-only content (no plain) is sent as text with ssml:true", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ baseUrl: "http://localhost:8000", fetch: fetchImpl });
  engine.loadUtterances([{ ssml: "<p>Hi</p>" }]);

  engine.speak();
  await flush();

  const body = JSON.parse(calls[0].init.body);
  t.is(body.text, "<p>Hi</p>");
  t.is(body.ssml, true);
});

test.serial("plain takes priority over ssml when both are present", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ baseUrl: "http://localhost:8000", fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hi", ssml: "<p>Hi</p>" }]);

  engine.speak();
  await flush();

  const body = JSON.parse(calls[0].init.body);
  t.is(body.text, "Hi");
  t.is(body.ssml, false);
});

test.serial("setSpeakInContentLanguage(true) sends the utterance's own language", async (t) => {
  const { fetchImpl, calls } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ baseUrl: "http://localhost:8000", fetch: fetchImpl });
  engine.setSpeakInContentLanguage(true);
  engine.loadUtterances([{ plain: "Bonjour", language: "fr" }]);

  engine.speak();
  await flush();

  const body = JSON.parse(calls[0].init.body);
  t.is(body.language, "fr");
});

test.serial("setVoice(string) uses a cached voice when found, else keeps the raw identifier usable", async (t) => {
  const { fetchImpl } = createMockFetch({ voices: () => [makeServerVoice()] });
  const engine = new SpeechServerEngine({ baseUrl: "http://localhost:8000", fetch: fetchImpl });

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
  const engine = new SpeechServerEngine({ baseUrl: "http://localhost:8000", fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hello" }]);

  const events: string[] = [];
  engine.on("loading", () => events.push("loading"));
  engine.on("start", () => events.push("start"));
  engine.on("end", () => events.push("end"));

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
  const engine = new SpeechServerEngine({ baseUrl: "http://localhost:8000", fetch: fetchImpl });
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
  const engine = new SpeechServerEngine({ baseUrl: "http://localhost:8000", fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hello" }]);
  engine.speak();
  await flush();

  engine.pause();
  t.is(engine.getState(), "paused");

  engine.resume();
  t.is(engine.getState(), "playing");
});

test.serial("stop() resets to idle and index 0", async (t) => {
  const { fetchImpl } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ baseUrl: "http://localhost:8000", fetch: fetchImpl });
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
        type: "https://readium.org/speech-server/error#voice_not_found",
        title: "Voice Not Found",
        status: 404,
        detail: "Voice 'x' not found."
      },
      contentType: "application/problem+json"
    })
  });
  const engine = new SpeechServerEngine({ baseUrl: "http://localhost:8000", fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hello" }]);

  const errors: any[] = [];
  engine.on("error", (e: any) => errors.push(e.detail));

  engine.speak();
  await flush();

  t.is(errors.length, 1);
  t.is(errors[0].message, "Voice 'x' not found.");
  t.is(engine.getState(), "idle");
});

test.serial("rate is only faked locally when the voice's controls don't report server-side speed support", async (t) => {
  const { fetchImpl } = createMockFetch({
    synthesize: () => ({ json: { audio: wavBase64(), format: "wav", boundaries: null } })
  });
  const engine = new SpeechServerEngine({ baseUrl: "http://localhost:8000", fetch: fetchImpl });
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
  const engine = new SpeechServerEngine({ baseUrl: "http://localhost:8000", fetch: fetchImpl });
  engine.loadUtterances([{ plain: "Hello" }]);
  engine.speak();
  await flush();

  engine.setVolume(0.4);
  t.is(MockAudio.instances[0].volume, 0.4);
});
