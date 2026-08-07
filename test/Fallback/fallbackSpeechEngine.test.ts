import test from "ava";
import { FallbackSpeechEngine, WebSpeechVoiceManager } from "../../build/index.js";
import { FakeEngine, FakeFallbackProvider, FakePrimaryProvider, makeReadiumVoice, tick, wait } from "./testUtils.js";

// =============================================
// Mock Web Speech API
// =============================================
// Voice matching is driven by seeding the singleton's internal voice list directly (see
// beforeEach), not the real SpeechSynthesisVoice -> ReadiumSpeechVoice JSON pipeline.

class MockUtterance {
  constructor(public text: string) {}
}

function setWebSpeechGlobals(): void {
  if (typeof (globalThis as any).window === "undefined") {
    (globalThis as any).window = globalThis;
  }
  (globalThis as any).window.SpeechSynthesisUtterance = MockUtterance;
  (globalThis as any).window.speechSynthesis = {
    speaking: false,
    paused: false,
    onvoiceschanged: null,
    // Non-empty so WebSpeechVoiceManager.initialize() resolves immediately instead of polling
    // for onvoiceschanged/a timeout — the actual test voices are injected afterward below.
    getVoices: () => [{ voiceURI: "dummy", name: "Dummy", lang: "en-US", localService: true, default: false }],
    speak: () => {},
    cancel: () => {},
    pause: () => {},
    resume: () => {},
    addEventListener: () => {},
    removeEventListener: () => {}
  };
}

test.beforeEach(async () => {
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;
  setWebSpeechGlobals();

  // Seed the singleton with controlled voices so pickBestFallbackVoice's language/gender
  // matching can be asserted deterministically.
  const manager = await WebSpeechVoiceManager.initialize();
  (manager as any).voices = [
    makeReadiumVoice({ name: "French Female", language: "fr-FR", gender: "female" }),
    makeReadiumVoice({ name: "French Male", language: "fr-FR", gender: "male" }),
    makeReadiumVoice({ name: "English Female", language: "en-US", gender: "female" })
  ];
});

test.afterEach.always(() => {
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;
});

test.serial("swaps to the fallback engine on a recoverable error, matching language and gender, and resumes at the same utterance", async (t) => {
  const primary = new FakeEngine();
  primary.setCurrentVoiceForTest({ language: "fr-FR", gender: "female" });
  primary.setCurrentUtteranceIndexForTest(2);

  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });

  const utterances = [{ plain: "one" }, { plain: "two" }, { plain: "three", language: "fr-FR" }];
  wrapper.loadUtterances(utterances);

  const fallbackEvents: any[] = [];
  wrapper.on("enginefallback", (e: any) => fallbackEvents.push(e));

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  t.is(fallbackProvider.receivedVoice?.name, "French Female", "picked the matching-language, matching-gender voice");
  t.deepEqual(fallbackProvider.engine!.loadUtterancesCalls[0], utterances, "utterances replayed into the fallback engine");
  t.is(fallbackEvents.length, 1);
  t.is(fallbackEvents[0].detail.voice?.name, "French Female");
  t.is(primary.destroyCalls, 1, "old primary engine torn down after swapping away");

  // Playback only resumes once the fallback engine reports "ready".
  t.deepEqual(fallbackProvider.engine!.speakCalls, []);
  fallbackProvider.engine!.emit("ready");
  t.deepEqual(fallbackProvider.engine!.speakCalls, [2], "resumed at the utterance that was active when the primary failed");
});

test.serial("falls back to a language-only match when no voice satisfies both language and gender", async (t) => {
  const primary = new FakeEngine();
  primary.setCurrentVoiceForTest({ language: "fr-FR", gender: "neutral" }); // no neutral fr voice seeded

  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "hello" }]);

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  t.truthy(fallbackProvider.receivedVoice, "a voice was still picked");
  t.is(fallbackProvider.receivedVoice.language, "fr-FR", "language-only match, gender requirement dropped");
});

test.serial("does not swap on a non-recoverable error, forwards it as-is", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "hello" }]);

  const errors: any[] = [];
  wrapper.on("error", (e: any) => errors.push(e));

  primary.emit("error", { message: "bad request", status: 400, recoverable: false });
  await tick();

  t.is(errors.length, 1);
  t.is(errors[0].detail.status, 400);
  t.is(fallbackProvider.receivedVoice, undefined, "no swap attempted");
});

test.serial("onFailure: \"error\" disables swapping entirely", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any, onFailure: "error" });
  wrapper.loadUtterances([{ plain: "hello" }]);

  const errors: any[] = [];
  wrapper.on("error", (e: any) => errors.push(e));

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  t.is(errors.length, 1, "forwarded as a normal error despite being recoverable");
  t.is(fallbackProvider.receivedVoice, undefined);
});

test.serial("a further error from the fallback engine after swapping is forwarded normally, no second swap", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "hello" }]);

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  const errors: any[] = [];
  wrapper.on("error", (e: any) => errors.push(e));

  fallbackProvider.engine!.emit("error", { message: "fallback also failed", recoverable: true });
  await tick();

  t.is(errors.length, 1, "forwarded, not treated as another swap trigger");
});

test.serial("if creating the fallback engine itself fails, the original error is forwarded instead", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  fallbackProvider.shouldFail = true;
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "hello" }]);

  const errors: any[] = [];
  wrapper.on("error", (e: any) => errors.push(e));

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  t.is(errors.length, 1);
  t.is(errors[0].detail.message, "network failure", "the original failure, not a generic wrapper error");
});

test.serial("delegates playback methods to the active engine", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });

  wrapper.setRate(1.5);
  wrapper.setPitch(0.8);
  wrapper.setVolume(0.5);
  wrapper.speak(1);

  t.is(primary.getRate(), 1.5);
  t.is(primary.getPitch(), 0.8);
  t.is(primary.getVolume(), 0.5);
  t.deepEqual(primary.speakCalls, [1]);
});

test.serial("onFailure: \"fallback\" (default) never polls or recovers, even long after swapping", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const primaryProvider = new FakePrimaryProvider();
  primaryProvider.reachable = true;
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: primaryProvider as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "hello" }]);

  const recovered: any[] = [];
  wrapper.on("enginerecovered", (e: any) => recovered.push(e));

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();
  fallbackProvider.engine!.setStateForTest("idle");

  await wait(30);

  t.is(primaryProvider.getVoicesCalls, 0, "never polled the primary");
  t.is(recovered.length, 0);
});

test.serial("fallbackAndRecover: waits until nothing is playing before swapping back, then resumes on a fresh primary engine", async (t) => {
  const primary = new FakeEngine();
  primary.setCurrentUtteranceIndexForTest(2);
  const fallbackProvider = new FakeFallbackProvider();
  const primaryProvider = new FakePrimaryProvider();
  primaryProvider.reachable = false;
  const wrapper = new FallbackSpeechEngine({
    primaryEngine: primary as any,
    primaryProvider: primaryProvider as any,
    fallbackProvider: fallbackProvider as any,
    onFailure: "fallbackAndRecover",
    healthCheckIntervalMs: 5
  });
  wrapper.loadUtterances([{ plain: "one" }, { plain: "two" }, { plain: "three" }]);

  const recovered: any[] = [];
  wrapper.on("enginerecovered", (e: any) => recovered.push(e));

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  const fallbackEngine = fallbackProvider.engine!;
  fallbackEngine.setStateForTest("playing");

  primaryProvider.reachable = true;
  await wait(20);
  await tick();

  t.is(recovered.length, 0, "primary reachable, but still speaking — no swap yet");
  t.is(primaryProvider.engine, null, "no primary engine created while still playing");

  fallbackEngine.setStateForTest("idle");
  fallbackEngine.emit("end");
  await tick();

  t.is(recovered.length, 1);
  t.truthy(primaryProvider.engine, "recreated the primary engine via the provider");
  t.deepEqual(primaryProvider.engine!.loadUtterancesCalls[0], [{ plain: "one" }, { plain: "two" }, { plain: "three" }]);
  t.is(fallbackEngine.destroyCalls, 1, "old fallback engine torn down");
});

test.serial("fallbackAndRecover: resumes at the paused utterance when it swaps back mid-pause", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const primaryProvider = new FakePrimaryProvider();
  primaryProvider.reachable = true;
  const wrapper = new FallbackSpeechEngine({
    primaryEngine: primary as any,
    primaryProvider: primaryProvider as any,
    fallbackProvider: fallbackProvider as any,
    onFailure: "fallbackAndRecover",
    healthCheckIntervalMs: 5
  });
  wrapper.loadUtterances([{ plain: "one" }, { plain: "two" }]);

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  const fallbackEngine = fallbackProvider.engine!;
  fallbackEngine.setCurrentUtteranceIndexForTest(1);
  fallbackEngine.setStateForTest("paused");
  fallbackEngine.emit("pause");
  await wait(20);
  await tick();

  t.truthy(primaryProvider.engine, "swapped back while paused");
  primaryProvider.engine!.emit("ready");
  t.is(primaryProvider.engine!.getCurrentUtteranceIndex(), 1, "resumed at the paused utterance");
});

test.serial("fallbackAndRecover: if recreating the primary fails despite a successful probe, stays on the fallback and keeps polling", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const primaryProvider = new FakePrimaryProvider();
  primaryProvider.reachable = true;
  primaryProvider.shouldFailCreateEngine = true;
  const wrapper = new FallbackSpeechEngine({
    primaryEngine: primary as any,
    primaryProvider: primaryProvider as any,
    fallbackProvider: fallbackProvider as any,
    onFailure: "fallbackAndRecover",
    healthCheckIntervalMs: 5
  });
  wrapper.loadUtterances([{ plain: "hello" }]);

  const recovered: any[] = [];
  wrapper.on("enginerecovered", (e: any) => recovered.push(e));

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();
  fallbackProvider.engine!.setStateForTest("idle");

  await wait(20);
  await tick();
  const callsAfterFirstFailedRecovery = primaryProvider.getVoicesCalls;

  t.is(recovered.length, 0, "recreating the primary failed, no swap happened");
  t.is(primaryProvider.engine, null);
  t.true(callsAfterFirstFailedRecovery >= 1, "kept probing");

  await wait(20);
  t.true(primaryProvider.getVoicesCalls > callsAfterFirstFailedRecovery, "polling resumed after the failed recovery attempt");

  await wrapper.destroy();
});

test.serial("fallbackAndRecover: after recovering, a further primary failure falls back again (bounce allowed)", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const primaryProvider = new FakePrimaryProvider();
  primaryProvider.reachable = true;
  const wrapper = new FallbackSpeechEngine({
    primaryEngine: primary as any,
    primaryProvider: primaryProvider as any,
    fallbackProvider: fallbackProvider as any,
    onFailure: "fallbackAndRecover",
    healthCheckIntervalMs: 5
  });
  wrapper.loadUtterances([{ plain: "hello" }]);

  const fallbackEvents: any[] = [];
  wrapper.on("enginefallback", (e: any) => fallbackEvents.push(e));

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();
  fallbackProvider.engine!.setStateForTest("idle");
  fallbackProvider.engine!.emit("end");
  await wait(20);
  await tick();

  t.is(fallbackEvents.length, 1);
  const recoveredPrimary = primaryProvider.engine!;

  recoveredPrimary.emit("error", { message: "network failure again", recoverable: true });
  await tick();

  t.is(fallbackEvents.length, 2, "fell back again after recovering");

  await wrapper.destroy();
});

test.serial("destroy() clears the health-check timer", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const primaryProvider = new FakePrimaryProvider();
  primaryProvider.reachable = false;
  const wrapper = new FallbackSpeechEngine({
    primaryEngine: primary as any,
    primaryProvider: primaryProvider as any,
    fallbackProvider: fallbackProvider as any,
    onFailure: "fallbackAndRecover",
    healthCheckIntervalMs: 5
  });
  wrapper.loadUtterances([{ plain: "hello" }]);

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();
  await wait(15);

  await wrapper.destroy();
  const callsAtDestroy = primaryProvider.getVoicesCalls;

  await wait(30);

  t.is(primaryProvider.getVoicesCalls, callsAtDestroy, "no further polling after destroy");
});
