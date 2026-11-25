import test from "ava";
import { ReadiumSpeechNavigator, RoutingEngineProvider, RoutingSpeechEngine } from "../../build/index.js";
import { FakeEngine, makeReadiumVoice, tick } from "../Fallback/testUtils.js";

const english = makeReadiumVoice({ name: "Samantha", voiceURI: "com.apple.voice.Samantha", language: "en-US", offlineAvailability: true });
const french = makeReadiumVoice({ source: "server", name: "Lea", identifier: "urn:voice:lea", language: "fr-FR" });

function setup(): { web: FakeEngine; server: FakeEngine; router: RoutingSpeechEngine; events: string[] } {
  const web = new FakeEngine({ synchronous: true });
  const server = new FakeEngine({ synchronous: true });
  web.availableVoices = [english];
  server.availableVoices = [french];
  const router = new RoutingSpeechEngine({ engines: [web as any, server as any] });
  const events: string[] = [];
  for (const type of ["ready", "start", "end", "stop", "pause", "resume"] as const) {
    router.on(type, () => events.push(type));
  }
  return { web, server, router, events };
}

const mixed = [
  { plain: "One.", voice: "com.apple.voice.Samantha" },
  { plain: "Un.", voice: "urn:voice:lea" },
  { plain: "Two.", voice: "com.apple.voice.Samantha" },
  { plain: "Deux.", voice: "urn:voice:lea" }
];

test("each engine is loaded with the utterances of its voices, from the start utterance on", async (t) => {
  const { web, server, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed, 1);

  t.deepEqual(web.loadUtterancesCalls.at(-1)!.map((u: any) => u.plain), ["One.", "Two."]);
  t.deepEqual(server.loadUtterancesCalls.at(-1)!.map((u: any) => u.plain), ["Un.", "Deux."]);
  t.deepEqual(web.loadUtterancesStartIndexCalls.at(-1), 1, "its first utterance from the start one on");
  t.deepEqual(server.loadUtterancesStartIndexCalls.at(-1), 0);
});

test("speak() goes to the engine of the utterance's voice, at its index in that engine's queue", async (t) => {
  const { web, server, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);

  router.speak(0);
  web.emit("end");
  router.speak(1);
  server.emit("end");
  router.speak(2);

  t.deepEqual(web.speakCalls, [0, 1]);
  t.deepEqual(server.speakCalls, [0]);
  t.is(router.getCurrentUtteranceIndex(), 2);
});

test("only the start utterance's engine tells \"ready\", once", async (t) => {
  const { router, events } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed, 1);

  t.deepEqual(events, ["ready"]);
});

test("events of an engine not speaking the current utterance aren't forwarded", async (t) => {
  const { web, server, router, events } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);
  router.speak(0);
  server.emit("end");
  server.emit("start");

  t.deepEqual(events, ["ready", "start"]);
});

test("moving to another engine's utterance mid-utterance stops the previous engine unheard", async (t) => {
  const { web, server, router, events } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);
  router.speak(0);
  router.speak(1);

  t.is(web.getState(), "idle", "stopped");
  t.deepEqual(server.speakCalls, [0]);
  t.deepEqual(events, ["ready", "start", "start"], "its \"stop\" isn't told");
});

test("an engine that ended its utterance isn't stopped when the next is another engine's", async (t) => {
  const { web, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);
  router.speak(0);
  web.emit("end");
  router.speak(1);

  t.is(web.getState(), "playing", "left as is, e.g. a speech-server keeping its prefetched audio");
});

test("moving to another engine's utterance while paused stays paused, and resume() speaks it", async (t) => {
  const { web, server, router, events } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);
  router.speak(0);
  router.pause();
  let moved: boolean | undefined;
  router.setCurrentUtteranceIndex(3, (success) => { moved = success; });

  t.true(moved);
  t.is(router.getState(), "paused");
  t.is(router.getCurrentUtteranceIndex(), 3);
  t.is(web.getState(), "idle", "the paused utterance is stopped");

  router.resume();
  t.deepEqual(server.speakCalls, [1]);
  t.deepEqual(events, ["ready", "start", "pause", "start"]);
});

test("utterances without a voice, or with one no engine lists, go to the engine of the current voice", async (t) => {
  const { web, server, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances([{ plain: "A." }, { plain: "B.", voice: "unknown" }]);
  await tick();
  t.is(web.loadUtterancesCalls.at(-1)!.length, 2);

  router.setVoice("urn:voice:lea");
  router.loadUtterances([{ plain: "A." }]);
  t.is(server.loadUtterancesCalls.at(-1)!.length, 1, "after setVoice() to another engine's voice");
});

test("a voice listed by several engines is spoken by the first", async (t) => {
  const { web, server, router } = setup();
  server.availableVoices = [french, english];
  const voices = await router.getAvailableVoices();
  router.loadUtterances([{ plain: "One.", voice: "com.apple.voice.Samantha" }]);

  t.is(voices.filter((voice: any) => voice.name === "Samantha").length, 1, "listed once");
  t.is(web.loadUtterancesCalls.at(-1)!.length, 1);
  t.is(server.loadUtterancesCalls.at(-1)!.length, 0);
});

test("utterance voices not listed yet are listed before the queue is split, speak() meanwhile kept", async (t) => {
  const { web, server, router } = setup();
  router.loadUtterances(mixed);
  t.is(router.getState(), "loading");
  router.speak(1);
  await tick();

  t.deepEqual(server.speakCalls, [0]);
  t.is(web.speakCalls.length, 0);
});

test("a reload while voices are listed drops the stale queue", async (t) => {
  const { web, router } = setup();
  router.loadUtterances(mixed);
  router.loadUtterances([{ plain: "Only.", voice: "com.apple.voice.Samantha" }]);
  await tick();

  t.true(web.loadUtterancesCalls.every((queue: any[]) => queue.length === 1));
});

test("an engine whose voices fail to list is left out of the listing", async (t) => {
  const { server, router } = setup();
  server.getAvailableVoices = async () => { throw new Error("offline"); };

  t.deepEqual((await router.getAvailableVoices()).map((voice: any) => voice.name), ["Samantha"]);
});

test("rate, pitch and volume reach every engine", (t) => {
  const { web, server, router } = setup();
  router.setRate(1.5);
  router.setPitch(0.8);
  router.setVolume(0.5);

  for (const engine of [web, server]) {
    t.deepEqual([engine.getRate(), engine.getPitch(), engine.getVolume()], [1.5, 0.8, 0.5]);
  }
});

test("an engine's fallback is told, and its voices listed again", async (t) => {
  const { server, router } = setup();
  await router.getAvailableVoices();
  const told: unknown[] = [];
  router.on("enginefallback", (event) => told.push(event.detail));
  server.availableVoices = [];
  server.emit("enginefallback", { reason: { message: "offline", recoverable: true }, voice: null });

  t.is(told.length, 1);
  router.loadUtterances([{ plain: "Un.", voice: "urn:voice:lea" }]);
  await tick();
  t.is(server.loadUtterancesCalls.at(-1)!.length, 0, "its old voices aren't routed to it any more");
});

test("the provider gives createEngine()'s voice to the provider listing it, failed providers left out", async (t) => {
  const web = new FakeEngine({ synchronous: true });
  const server = new FakeEngine({ synchronous: true });
  let received: unknown = "unset";
  const provider = new RoutingEngineProvider({
    providers: [
      { id: "webspeech", name: "", getVoices: async () => [english], createEngine: async (voice?: unknown) => { received = voice; return web as any; }, destroy: async () => {} },
      { id: "broken", name: "", getVoices: async () => { throw new Error("down"); }, createEngine: async () => { throw new Error("down"); }, destroy: async () => {} },
      { id: "speech-server", name: "", getVoices: async () => [french], createEngine: async () => server as any, destroy: async () => {} }
    ]
  });

  t.deepEqual((await provider.getVoices()).map((voice: any) => voice.name), ["Samantha", "Lea"]);
  await provider.createEngine("com.apple.voice.Samantha");
  t.is(received, "com.apple.voice.Samantha");
});

test("one navigator speaks each language with its provider's voice, without reloading between them", async (t) => {
  const { web, server, router } = setup();
  const navigator = new ReadiumSpeechNavigator(router, { languages: ["en", "fr"] });
  await tick();
  navigator.loadContent([{ plain: "Hello.", language: "en" }, { plain: "Bonjour.", language: "fr" }]);
  await tick();
  const loads = web.loadUtterancesCalls.length + server.loadUtterancesCalls.length;

  navigator.play();
  web.emit("end");
  await new Promise(resolve => setTimeout(resolve, navigator.settings.pauseDuration + 10));

  t.deepEqual(web.speakCalls, [0]);
  t.deepEqual(server.speakCalls, [0]);
  t.is(navigator.getCurrentContent()?.plain, "Bonjour.");
  t.is(web.loadUtterancesCalls.length + server.loadUtterancesCalls.length, loads, "no reload at the switch");
  t.deepEqual(structuredClone(navigator.settings.voice), { en: "com.apple.voice.Samantha", fr: "urn:voice:lea" });
});
