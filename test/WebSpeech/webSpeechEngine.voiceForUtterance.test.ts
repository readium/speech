import test from "ava";
import { ReadiumSpeechNavigator, WebSpeechEngine, WebSpeechVoiceManager, getVoiceId } from "../../build/index.js";
import { setGlobals, makeVoice, mockVoices, resetVoiceManager } from "./testUtils.js";

test.beforeEach(() => {
  resetVoiceManager();
  setGlobals(mockVoices);
});

test.afterEach.always(() => {
  resetVoiceManager();
});

async function makeEngine() {
  const engine = new WebSpeechEngine();
  await engine.initialize();
  return engine;
}

// =============================================
// Tests
// =============================================

test("content in another language than the selected voice's is spoken with the selected voice", async (t) => {
  const { spoken } = setGlobals(mockVoices);
  const engine = await makeEngine();
  const voices = await engine.getAvailableVoices();
  engine.setVoice(voices.find((v: any) => v.language === "en-US")!);

  engine.loadUtterances([{ id: "1", plain: "bonjour", language: "fr-FR" }]);
  engine.speak();

  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken[0].voice?.lang, "en-US");
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

test("generation guard drops a stale resolution when speak() is called again before the first resolves", async (t) => {
  const { spoken } = setGlobals(mockVoices);
  const engine = new WebSpeechEngine();
  await engine.initialize();
  engine.loadUtterances([
    { id: "1", plain: "bonjour", language: "fr-FR" },
    { id: "2", plain: "hello", language: "en-US" }
  ]);

  engine.speak(0); // triggers an async voice resolution
  engine.speak(1); // supersedes it before the first resolution can complete

  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken.length, 1, "the superseded speak(0) call must not also reach speechSynthesis.speak()");
  t.is(spoken[0].text, "hello");
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

test("an utterance's own voice wins over the selected voice", async (t) => {
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

test("an utterance voice this engine doesn't have falls back to the selected voice", async (t) => {
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
test.serial("an utterance's own voice, as getVoiceId() gives it, is matched by voiceURI among voices sharing a name", async (t) => {
  const { spoken } = setGlobals([...mockVoices, makeVoice("de-DE", "French Voice")]);
  const engine = await makeEngine();
  const voices = await engine.getAvailableVoices();
  const german = voices.find((v: any) => v.language === "de-DE")!;

  engine.loadUtterances([{ id: "1", plain: "hallo", language: "de-DE", voice: getVoiceId(german) }]);
  engine.speak();
  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken[0].voice?.lang, "de-DE");
});

test.serial("setVoice() with a voice id matches it by voiceURI among voices sharing a name", async (t) => {
  const { spoken } = setGlobals([...mockVoices, makeVoice("de-DE", "French Voice")]);
  const engine = await makeEngine();
  const voices = await engine.getAvailableVoices();
  await engine.setVoice(getVoiceId(voices.find((v: any) => v.language === "de-DE")!));

  engine.loadUtterances([{ id: "1", plain: "hallo" }]);
  engine.speak();
  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken[0].voice?.lang, "de-DE");
});

test.serial("voices of languages the manager is initialized with later are available, and spoken", async (t) => {
  const { spoken } = setGlobals(mockVoices);
  const engine = new WebSpeechEngine();
  await engine.initialize({ languages: ["en"] });
  t.false((await engine.getAvailableVoices()).some((v: any) => v.language === "fr-FR"));

  await WebSpeechVoiceManager.initialize({ languages: ["fr"] });
  const french = (await engine.getAvailableVoices()).find((v: any) => v.language === "fr-FR");
  t.truthy(french);

  engine.loadUtterances([{ id: "1", plain: "bonjour", language: "en-US", voice: french!.voiceURI }]);
  engine.speak();
  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken[0].voice?.name, "French Voice");
});

test.serial("an utterance's own voice of a language the manager wasn't initialized with is loaded and spoken", async (t) => {
  const { spoken } = setGlobals(mockVoices);
  const engine = new WebSpeechEngine();
  await engine.initialize({ languages: ["en"] });
  t.false((await engine.getAvailableVoices()).some((v: any) => v.language === "fr-FR"));

  engine.loadUtterances([{ id: "1", plain: "hello", language: "en-US", voice: "French Voice-fr-FR" }]);
  engine.speak();
  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(spoken[0].voice?.name, "French Voice");
});

test.serial("getAvailableVoices() lists the browser's voices asked for by id, whatever their language", async (t) => {
  const engine = new WebSpeechEngine();
  await engine.initialize({ languages: ["en"] });

  const voices = await engine.getAvailableVoices(undefined, ["French Voice-fr-FR", "Missing"]);
  t.true(voices.some((v: any) => v.voiceURI === "French Voice-fr-FR"));
});

test.serial("a navigator's voice preference of a language the engine wasn't initialized with is kept", async (t) => {
  const engine = new WebSpeechEngine();
  await engine.initialize({ languages: ["en"] });
  const navigator = new ReadiumSpeechNavigator(engine, { preferences: { voice: "French Voice-fr-FR" } });
  navigator.loadContent([{ plain: "hello", language: "en-US" }]);
  await new Promise(resolve => setTimeout(resolve, 20));

  t.is(navigator.settings.voice, "French Voice-fr-FR");
  t.is(navigator.getContentQueue()[0].voice, "French Voice-fr-FR");
});

test.serial("getCurrentVoice() returns the default voice until one is set", async (t) => {
  setGlobals(mockVoices);
  const engine = await makeEngine();
  const defaultVoice = engine.getCurrentVoice();
  t.truthy(defaultVoice);

  const french = (await engine.getAvailableVoices()).find((v: any) => v.language === "fr-FR")!;
  await engine.setVoice(french);
  t.is(engine.getCurrentVoice(), french);
});
