import test from "ava";
import { WebSpeechEngine, WebSpeechVoiceManager } from "../../build/index.js";

// =============================================
// Mock Web Speech API
// =============================================
// WebSpeechEngine needs a fuller speechSynthesis mock than the
// WebSpeechVoiceManager test suite's (speak/cancel/pause/resume, plus a
// SpeechSynthesisUtterance constructor) since it actually drives playback.

class MockUtterance {
  text: string;
  voice: any = null;
  lang = "";
  rate = 1;
  pitch = 1;
  volume = 1;
  onstart: (() => void) | null = null;
  onend: (() => void) | null = null;
  onerror: ((e: any) => void) | null = null;
  onpause: (() => void) | null = null;
  onresume: (() => void) | null = null;
  onboundary: ((e: any) => void) | null = null;
  onmark: ((e: any) => void) | null = null;

  constructor(text: string) {
    this.text = text;
  }
}

function createMockSpeechSynthesis(mockVoices: any[]) {
  const spoken: MockUtterance[] = [];
  const synth = {
    speaking: false,
    paused: false,
    onvoiceschanged: null as (() => void) | null,
    getVoices: () => mockVoices,
    speak: (utterance: MockUtterance) => {
      spoken.push(utterance);
      synth.speaking = true;
      // Simulate the utterance completing asynchronously, like a real engine would.
      queueMicrotask(() => {
        utterance.onstart?.();
        queueMicrotask(() => {
          synth.speaking = false;
          utterance.onend?.();
        });
      });
    },
    cancel: () => {
      synth.speaking = false;
    },
    pause: () => {
      synth.paused = true;
    },
    resume: () => {
      synth.paused = false;
    },
    addEventListener: () => {},
    removeEventListener: () => {}
  };
  return { synth, spoken };
}

function setGlobals(mockVoices: any[]) {
  if (typeof (globalThis as any).window === "undefined") {
    (globalThis as any).window = globalThis;
  }
  (globalThis as any).window.SpeechSynthesisUtterance = MockUtterance;
  const { synth, spoken } = createMockSpeechSynthesis(mockVoices);
  (globalThis as any).window.speechSynthesis = synth;
  return { synth, spoken };
}

function makeVoice(lang: string, name: string) {
  return { voiceURI: `${name}-${lang}`, name, lang, localService: true, default: false };
}

const mockVoices = [
  makeVoice("en-US", "English Voice"),
  makeVoice("fr-FR", "French Voice"),
  makeVoice("fr-CA", "French Canadian Voice")
];

test.beforeEach(() => {
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;
  setGlobals(mockVoices);
});

test.afterEach.always(() => {
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;
});

async function makeEngine() {
  const engine = new WebSpeechEngine();
  await engine.initialize();
  return engine;
}

// =============================================
// Tests
// =============================================

test("the selected voice keeps content in its own language, whatever the region", async (t) => {
  const { spoken } = setGlobals(mockVoices);
  const engine = await makeEngine();
  const voices = await engine.getAvailableVoices();
  engine.setVoice(voices.find((v: any) => v.language === "fr-CA")!);

  engine.loadUtterances([{ id: "1", plain: "bonjour", language: "fr-FR" }]);
  engine.speak();

  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken.length, 1);
  t.is(spoken[0].voice?.lang, "fr-CA");
});

test("content in another language than the selected voice's is spoken with a voice of its language", async (t) => {
  const { spoken } = setGlobals(mockVoices);
  const engine = await makeEngine();
  const voices = await engine.getAvailableVoices();
  engine.setVoice(voices.find((v: any) => v.language === "en-US")!);

  engine.loadUtterances([{ id: "1", plain: "bonjour", language: "fr-FR" }]);
  engine.speak();

  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken[0].voice?.lang, "fr-FR");
});

test("content without a language is spoken with the selected voice", async (t) => {
  const { spoken } = setGlobals(mockVoices);
  const engine = await makeEngine();
  const voices = await engine.getAvailableVoices();
  engine.setVoice(voices.find((v: any) => v.language === "en-US")!);

  engine.loadUtterances([{ id: "1", plain: "bonjour" }]);
  engine.speak();

  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken[0].voice?.lang, "en-US");
});

test("content language: speak() called immediately after loadUtterances still picks the matching-language voice", async (t) => {
  const { spoken } = setGlobals(mockVoices);
  const engine = new WebSpeechEngine();
  await engine.initialize();

  engine.loadUtterances([{ id: "1", plain: "bonjour", language: "fr-FR" }]);

  // Call speak() right away, without waiting for the fire-and-forget cache warm to settle.
  engine.speak();

  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken.length, 1);
  t.is(spoken[0].voice?.lang, "fr-FR", "used the French voice matching content.language, not a wrong-language fallback");
});

test("content language: region-strict matching (fr-FR content must not use the fr-CA voice)", async (t) => {
  const { spoken } = setGlobals(mockVoices);
  const engine = new WebSpeechEngine();
  await engine.initialize();
  engine.loadUtterances([{ id: "1", plain: "bonjour", language: "fr-FR" }]);

  engine.speak();
  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken[0].voice?.lang, "fr-FR");
  t.not(spoken[0].voice?.lang, "fr-CA");
});

test("content language: generation guard drops a stale resolution when speak() is called again before the first resolves", async (t) => {
  const { spoken } = setGlobals(mockVoices);
  const engine = new WebSpeechEngine();
  await engine.initialize();
  engine.loadUtterances([
    { id: "1", plain: "bonjour", language: "fr-FR" },
    { id: "2", plain: "hello", language: "en-US" }
  ]);

  engine.speak(0); // triggers an async voice resolution for fr-FR
  engine.speak(1); // supersedes it before the fr-FR resolution can complete

  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken.length, 1, "the superseded speak(0) call must not also reach speechSynthesis.speak()");
  t.is(spoken[0].text, "hello");
});

test("languagefallback fires only when no voice matches at all, not merely because the cache wasn't warm yet", async (t) => {
  setGlobals(mockVoices);
  const engine = new WebSpeechEngine();
  await engine.initialize();

  const fallbacks: any[] = [];
  engine.on("languagefallback", (e: any) => fallbacks.push(e));

  engine.loadUtterances([{ id: "1", plain: "hallo", language: "de-DE" }]); // no German voice in mockVoices
  engine.speak();

  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(fallbacks.length, 1);
  t.is(fallbacks[0].detail.language, "de-DE");
});

test("loadUtterances() emits exactly one \"ready\" per call, including back-to-back calls while already ready", async (t) => {
  setGlobals(mockVoices);
  const engine = new WebSpeechEngine();
  await engine.initialize();

  const readyEvents: any[] = [];
  engine.on("ready", () => readyEvents.push(true));

  engine.loadUtterances([{ id: "1", plain: "one" }]);
  t.is(readyEvents.length, 1, "first load");

  // Never played — state is still "ready" from the first load — yet a second load must still emit.
  engine.loadUtterances([{ id: "2", plain: "two" }]);
  t.is(readyEvents.length, 2, "second load while still ready");
});

test("an utterance's own voice wins over the selected voice and content-language matching", async (t) => {
  const { spoken } = setGlobals(mockVoices);
  const engine = await makeEngine();
  const voices = await engine.getAvailableVoices();
  engine.setVoice(voices.find((v: any) => v.language === "en-US")!);
  const canadian = voices.find((v: any) => v.language === "fr-CA")!;

  engine.loadUtterances([{ id: "1", plain: "bonjour", language: "fr-FR", voice: canadian.voiceURI }]);
  engine.speak();
  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken[0].voice?.lang, "fr-CA");
});

test("an utterance voice this engine doesn't have falls back to its own choice", async (t) => {
  const { spoken } = setGlobals(mockVoices);
  const engine = await makeEngine();
  const voices = await engine.getAvailableVoices();
  engine.setVoice(voices.find((v: any) => v.language === "en-US")!);

  engine.loadUtterances([{ id: "1", plain: "hello", language: "en-US", voice: "Unknown Voice" }]);
  engine.speak();
  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken[0].voice?.lang, "en-US");
});

test("the start event reports the voice the utterance is spoken with", async (t) => {
  setGlobals(mockVoices);
  const engine = await makeEngine();
  const voices = await engine.getAvailableVoices();
  engine.setVoice(voices.find((v: any) => v.language === "en-US")!);
  const french = voices.find((v: any) => v.language === "fr-FR")!;
  const started: any[] = [];
  engine.on("start", (event: any) => started.push(event.detail?.voice));

  engine.loadUtterances([{ id: "1", plain: "bonjour", language: "fr-FR", voice: french.voiceURI }, { id: "2", plain: "hello", language: "en-US" }]);
  engine.speak(0);
  await new Promise(resolve => setTimeout(resolve, 20));
  engine.speak(1);
  await new Promise(resolve => setTimeout(resolve, 20));

  t.deepEqual(started.map((voice) => voice?.language), ["fr-FR", "en-US"]);
});

// Serial: the only test here installing other voices, on globals the concurrent ones share.
test.serial("an utterance's own voice is matched by voiceURI among voices sharing a name", async (t) => {
  const { spoken } = setGlobals([...mockVoices, makeVoice("de-DE", "French Voice")]);
  const engine = await makeEngine();
  const voices = await engine.getAvailableVoices();
  const german = voices.find((v: any) => v.language === "de-DE")!;

  engine.loadUtterances([{ id: "1", plain: "hallo", language: "de-DE", voice: german.voiceURI }]);
  engine.speak();
  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken[0].voice?.lang, "de-DE");
});
