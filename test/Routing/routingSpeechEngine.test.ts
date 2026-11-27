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

// The texts the engine was last loaded to speak itself; it gets the others only as their neighbours' text.
function spokenBy(engine: FakeEngine): string[] {
  const contextual = engine.loadUtterancesContextualCalls.at(-1)!;
  return engine.loadUtterancesCalls.at(-1)!.filter((_, index) => !contextual[index]).map((utterance: any) => utterance.plain);
}

test("each engine is loaded with the whole queue from the start utterance, other engines' utterances as context", async (t) => {
  const { web, server, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed, 1);

  for (const engine of [web, server]) {
    t.deepEqual(engine.loadUtterancesCalls.at(-1)!.map((u: any) => u.plain), ["One.", "Un.", "Two.", "Deux."]);
    t.is(engine.loadUtterancesStartIndexCalls.at(-1), 1);
  }
  t.deepEqual(web.loadUtterancesContextualCalls.at(-1), [false, true, false, true]);
  t.deepEqual(server.loadUtterancesContextualCalls.at(-1), [true, false, true, false]);
});

// The router can itself be one of the engines of another router, or of a Fallback: that one marks the utterances
// the router doesn't speak with `isContextual`.
test("utterances the router was told another engine speaks are spoken by none of its engines", async (t) => {
  const { web, server, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed, 0, index => index < 2); // "One." and "Un." are spoken elsewhere

  t.deepEqual(spokenBy(web), ["Two."]);
  t.deepEqual(spokenBy(server), ["Deux."]);
});

test("speak() goes to the engine of the utterance's voice, at the utterance's index", async (t) => {
  const { web, server, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);

  router.speak(0);
  web.emit("end");
  router.speak(1);
  server.emit("end");
  router.speak(2);

  t.deepEqual(web.speakCalls, [0, 2]);
  t.deepEqual(server.speakCalls, [1]);
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
  t.deepEqual(server.speakCalls, [1]);
  t.deepEqual(events, ["ready", "start", "start"], "its \"stop\" isn't told");
});

// setCurrentUtteranceIndex() while an utterance plays stops it. Like every engine, the router then sends "idle" and
// "stop", after the move and before onComplete, so a "stop" listener sees the new index and can speak().

test("setCurrentUtteranceIndex() to another engine's utterance while one plays: \"idle\", \"stop\", then onComplete", async (t) => {
  const { web, router, events } = setup();
  router.on("idle", () => events.push("idle"));
  await router.getAvailableVoices();
  router.loadUtterances(mixed);
  router.speak(0); // Web Speech plays "One."
  router.setCurrentUtteranceIndex(1, () => events.push("complete")); // to "Un.", the speech-server's

  t.is(web.getState(), "idle", "\"One.\" is stopped");
  t.is(router.getState(), "idle");
  t.deepEqual(events, ["ready", "start", "idle", "stop", "complete"]);
});

test("a \"stop\" listener can speak() another utterance: the move that sent the \"stop\" doesn't undo it", async (t) => {
  const { server, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);
  router.speak(0); // Web Speech plays "One."
  router.on("stop", () => router.speak(3)); // "Deux."
  router.setCurrentUtteranceIndex(1); // to "Un.": stops "One."

  t.is(router.getCurrentUtteranceIndex(), 3);
  t.is(server.getCurrentUtteranceIndex(), 3, "the speech-server is on \"Deux.\", not moved back to \"Un.\"");
  t.is(router.getState(), "playing");
});

test("setCurrentUtteranceIndex() to another engine's utterance after one ended, before the next plays: no \"stop\"", async (t) => {
  const { web, router, events } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);
  router.speak(0);
  web.emit("end"); // "One." ended, nothing plays
  router.setCurrentUtteranceIndex(1);

  t.deepEqual(events, ["ready", "start", "end"]);
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
  t.deepEqual(server.speakCalls, [3]);
  t.deepEqual(events, ["ready", "start", "pause", "resume", "start"]);
});

test("once the queue has ended, moving back to its first utterance, another engine's, reports idle", async (t) => {
  const { web, server, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed.slice(0, 2)); // "One." for Web Speech, then "Un." for the speech-server, the last
  router.speak(0);
  web.emit("end");
  router.speak(1);
  server.setStateForTest("idle"); // a real engine goes idle at the end of the queue
  server.emit("end");
  router.setCurrentUtteranceIndex(0); // what the navigator does once the queue has ended

  t.is(router.getState(), "idle");
});

test("at the end of the queue, an engine that read an earlier utterance is stopped", async (t) => {
  const { web, server, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed.slice(0, 2)); // "One." for Web Speech, then "Un." for the speech-server, the last
  router.speak(0);
  web.emit("end");
  router.speak(1);
  server.emit("end");

  t.is(web.getState(), "idle");
});

test("stop() also stops an engine that read an earlier utterance", async (t) => {
  const { web, server, router, events } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);
  router.speak(0);
  web.emit("end");
  router.speak(1);
  router.stop();

  t.is(web.getState(), "idle");
  t.is(server.getState(), "idle");
  t.deepEqual(events, ["ready", "start", "end", "start", "stop"], "one \"stop\"");
});

test("loadUtterances() during an utterance stops it unheard, so the new queue's engine doesn't speak over it", async (t) => {
  const { web, server, router, events } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);
  router.speak(0); // Web Speech reads "One."
  let webStopped = false;
  web.on("stop", () => { webStopped = true; });
  router.loadUtterances(mixed.slice(1)); // starts with "Un.", the speech-server's
  router.speak(0);

  t.true(webStopped);
  t.deepEqual(server.speakCalls, [0]);
  t.deepEqual(events, ["ready", "start", "ready", "start"]);
});

test("moving to another engine's utterance after one ended, before the next plays, still reports playing", async (t) => {
  const { web, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);
  router.speak(0);
  web.emit("end"); // "One." ended, nothing plays yet
  router.setCurrentUtteranceIndex(1); // to "Un.", the speech-server's

  t.is(router.getState(), "playing");
});

test("pause() right after moving to another engine's utterance between utterances reports paused, and resume() speaks it", async (t) => {
  const { web, server, router, events } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);
  router.speak(0);
  web.emit("end"); // "One." ended, nothing plays yet
  router.setCurrentUtteranceIndex(1); // to "Un.", the speech-server's
  router.pause();

  t.is(router.getState(), "paused");
  t.deepEqual(events, ["ready", "start", "end", "pause"]);

  router.resume();
  t.deepEqual(server.speakCalls, [1]);
  t.deepEqual(events, ["ready", "start", "end", "pause", "resume", "start"]);
});

test("before anything is loaded, the state is the current engine's", (t) => {
  const { router } = setup();

  t.is(router.getState(), "idle");
});

test("moving to another engine's utterance before anything played reports that engine's state", async (t) => {
  const { server, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances(mixed);
  router.setCurrentUtteranceIndex(1); // to "Un.", the speech-server's

  server.setStateForTest("loading"); // e.g. still fetching its first audio
  t.is(router.getState(), "loading");
});

test("utterances without a voice, or with one no engine lists, go to the engine of the current voice", async (t) => {
  const { web, server, router } = setup();
  await router.getAvailableVoices();
  router.loadUtterances([{ plain: "A." }, { plain: "B.", voice: "unknown" }]);
  await tick();
  t.deepEqual(web.loadUtterancesContextualCalls.at(-1), [false, false]);

  router.setVoice("urn:voice:lea");
  router.loadUtterances([{ plain: "A." }]);
  t.deepEqual(server.loadUtterancesContextualCalls.at(-1), [false], "after setVoice() to another engine's voice");
});

// Each engine's setVoice() calls, as "<engine> ← <voice>".
function recordSetVoice(engines: Record<string, FakeEngine>): string[] {
  const calls: string[] = [];
  for (const [name, engine] of Object.entries(engines)) engine.setVoice = (voice: any) => { calls.push(`${name} ← ${voice}`); };
  return calls;
}

// In the setVoice() tests below, the router hasn't asked the engines for their voices yet (no getAvailableVoices() call),
// so it doesn't know which engine has the voice: it has to ask them first.
// Web Speech has Samantha and is the default engine; the speech-server has Lea.

test("setVoice() asks the engines which one has the voice, and sets it on that engine", async (t) => {
  const { web, server, router } = setup();
  const setVoiceCalls = recordSetVoice({ web, server });

  router.setVoice("urn:voice:lea");
  await tick();

  t.deepEqual(setVoiceCalls, ["server ← urn:voice:lea"], "set on the speech-server, not on Web Speech, the default engine");
});

test("content loaded right after setVoice() waits for that answer, then is spoken by the engine that has the voice", async (t) => {
  const { web, server, router } = setup();

  router.setVoice("urn:voice:lea");
  router.loadUtterances([{ plain: "Bonjour." }]); // no voice of its own, so it's spoken with Lea
  t.is(router.getState(), "loading", "waiting to know which engine has Lea");
  await tick();

  t.deepEqual(spokenBy(server), ["Bonjour."]);
  t.deepEqual(spokenBy(web), []);
});

test("setVoice() while content is loading: that content is spoken by the engine that has the new voice", async (t) => {
  const { web, server, router } = setup();

  router.loadUtterances([{ plain: "Bonjour." }, { plain: "Hello.", voice: "com.apple.voice.Samantha" }]); // loading: asks who has Samantha
  router.setVoice("urn:voice:lea");
  await tick();

  t.deepEqual(spokenBy(server), ["Bonjour."], "no voice of its own, so it's spoken with Lea");
  t.deepEqual(spokenBy(web), ["Hello."], "its own voice, Samantha");
});

test("two setVoice() calls in a row: only the second voice is set", async (t) => {
  const { web, server, router } = setup();
  const setVoiceCalls = recordSetVoice({ web, server });

  router.setVoice("urn:voice:lea");
  router.setVoice("com.apple.voice.Samantha");
  await tick();

  t.deepEqual(setVoiceCalls, ["web ← com.apple.voice.Samantha"], "Lea is never set, even once the speech-server says it has her");
});

test("setVoice() with a voice no engine has: it is set on Web Speech, the default engine", async (t) => {
  const { web, server, router } = setup();
  const setVoiceCalls = recordSetVoice({ web, server });

  router.setVoice("unknown");
  await tick();

  t.deepEqual(setVoiceCalls, ["web ← unknown"]);
});

test("destroy() right after setVoice(): no engine gets the voice", async (t) => {
  const { web, server, router } = setup();
  const setVoiceCalls = recordSetVoice({ web, server });

  router.setVoice("urn:voice:lea");
  await router.destroy();
  await tick();

  t.deepEqual(setVoiceCalls, []);
});

test("a voice listed by several engines is spoken by the first", async (t) => {
  const { web, server, router } = setup();
  server.availableVoices = [french, english];
  const voices = await router.getAvailableVoices();
  router.loadUtterances([{ plain: "One.", voice: "com.apple.voice.Samantha" }]);

  t.is(voices.filter((voice: any) => voice.name === "Samantha").length, 1, "listed once");
  t.deepEqual(web.loadUtterancesContextualCalls.at(-1), [false]);
  t.deepEqual(server.loadUtterancesContextualCalls.at(-1), [true]);
});

test("utterance voices not listed yet are listed before the queue is split, speak() meanwhile kept", async (t) => {
  const { web, server, router } = setup();
  router.loadUtterances(mixed);
  t.is(router.getState(), "loading");
  router.speak(1);
  await tick();

  t.deepEqual(server.speakCalls, [1]);
  t.is(web.speakCalls.length, 0);
});

test("resume() without speak() while voices are listed plays nothing", async (t) => {
  const { web, server, router } = setup();
  router.loadUtterances(mixed);
  router.resume();
  await tick();

  t.deepEqual([...web.speakCalls, ...server.speakCalls], []);
});

test("speak() then pause() while voices are listed is paused once they are, and resume() speaks it", async (t) => {
  const { web, server, router, events } = setup();
  router.loadUtterances(mixed);
  router.speak(1);
  router.pause();
  t.is(router.getState(), "paused", "paused while listed");
  t.deepEqual(events, ["pause"]);
  await tick();

  t.is(server.speakCalls.length, 0, "nothing spoken while paused");
  t.is(router.getState(), "paused");
  router.resume();
  t.deepEqual(server.speakCalls, [1]);
  t.is(web.speakCalls.length, 0);
  t.deepEqual(events, ["pause", "ready", "resume", "start"]);
});

test("speak(), pause() then resume() while voices are listed speaks once they are", async (t) => {
  const { server, router, events } = setup();
  router.loadUtterances(mixed);
  router.speak(1);
  router.pause();
  router.resume();
  t.is(router.getState(), "loading");
  t.deepEqual(events, ["pause", "resume"]);
  await tick();

  t.deepEqual(server.speakCalls, [1]);
});

test("speak() with an index outside the queue throws at once, also while the router still asks which engine has each voice", async (t) => {
  const { web, server, router } = setup();
  router.loadUtterances(mixed); // 4 utterances; no getAvailableVoices() call before, so the router asks the engines first
  t.throws(() => router.speak(4), { message: "Invalid utterance index" }, "while it asks");
  await tick();
  t.throws(() => router.speak(-1), { message: "Invalid utterance index" }, "once it knows");

  t.deepEqual([...web.speakCalls, ...server.speakCalls], [], "no engine speaks");
  t.is(router.getCurrentUtteranceIndex(), 0, "still on the first utterance");
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
  t.deepEqual(server.loadUtterancesContextualCalls.at(-1), [true], "its old voices aren't routed to it any more");
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
  t.deepEqual(server.speakCalls, [1]);
  t.is(navigator.getCurrentContent()?.plain, "Bonjour.");
  t.is(web.loadUtterancesCalls.length + server.loadUtterancesCalls.length, loads, "no reload at the switch");
  t.deepEqual(structuredClone(navigator.settings.voice), { en: "com.apple.voice.Samantha", fr: "urn:voice:lea" });
});
