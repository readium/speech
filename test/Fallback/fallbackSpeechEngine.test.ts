import test from "ava";
import { FallbackSpeechEngine } from "../../build/index.js";
import { FakeEngine, FakeFallbackProvider, FakePrimaryProvider, tick, wait, deferred } from "./testUtils.js";

// =============================================
// Basic delegation
// =============================================

test.serial("loadUtterances(contents, startIndex) forwards startIndex to the active engine and updates desiredIndex", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });

  wrapper.loadUtterances([{ plain: "one" }, { plain: "two" }, { plain: "three" }], 2);

  t.is(primary.loadUtterancesStartIndexCalls[0], 2, "forwarded to the active engine — e.g. a navigator reextract() resuming mid-chapter");
  t.is(wrapper.getCurrentUtteranceIndex(), 2);
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

// =============================================
// Swapping to the fallback
// =============================================

test.serial("swaps to the fallback engine on a recoverable error, matching language and gender, and resumes at the same utterance", async (t) => {
  const primary = new FakeEngine();
  primary.setCurrentVoiceForTest({ language: "fr-FR", gender: "female" });

  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });

  const utterances = [{ plain: "one" }, { plain: "two" }, { plain: "three", language: "fr-FR" }];
  wrapper.loadUtterances(utterances);
  wrapper.speak(2); // playing utterance 2 when the primary fails

  const fallbackEvents: any[] = [];
  wrapper.on("enginefallback", (e: any) => fallbackEvents.push(e));

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  t.is(fallbackProvider.receivedVoice?.name, "French Female", "picked the matching-language, matching-gender voice");
  t.deepEqual(fallbackProvider.engine!.loadUtterancesCalls[0], utterances, "utterances replayed into the fallback engine");
  t.is(fallbackProvider.engine!.loadUtterancesStartIndexCalls[0], 2, "desiredIndex passed as a start-index hint, so the fallback engine warms the right utterance");
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

test.serial("a second error while swapToFallback() is already in flight does not start a second, concurrent swap", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "hello" }]);

  const gate = deferred();
  fallbackProvider.createEngineGate = gate.promise;
  let createEngineCalls = 0;
  const originalCreateEngine = fallbackProvider.createEngine.bind(fallbackProvider);
  fallbackProvider.createEngine = async (voice?: any) => {
    createEngineCalls++;
    return originalCreateEngine(voice);
  };

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick(); // swapToFallback is now blocked inside createEngine()

  primary.emit("error", { message: "network failure again", recoverable: true }); // races the in-flight swap
  await tick();

  gate.resolve();
  await tick();

  t.is(createEngineCalls, 1, "only one swap attempt — the second error was ignored while a swap was already in flight");
});

// =============================================
// Races during swapToFallback()'s async gap
// =============================================

test.serial("swapToFallback respects a pause() that races the original failure", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "one" }, { plain: "two" }]);
  wrapper.speak(1); // playing utterance 1 when the primary fails

  const gate = deferred();
  fallbackProvider.createEngineGate = gate.promise;

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick(); // swapToFallback is now blocked inside fallbackProvider.createEngine()

  wrapper.pause(); // races the swap, before the fallback engine even exists yet
  gate.resolve();
  await tick();

  t.truthy(fallbackProvider.engine, "swap still creates the fallback engine");
  fallbackProvider.engine!.emit("ready");

  t.deepEqual(fallbackProvider.engine!.speakCalls, [], "pause() during the swap must not be overridden by a delayed speak()");
  t.is(wrapper.getState(), "paused");
});

test.serial("loadUtterances() racing swapToFallback()'s gap lands the new content on the arriving engine, not the dying primary", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "one" }, { plain: "two" }]);
  wrapper.speak(0);

  const gate = deferred();
  fallbackProvider.createEngineGate = gate.promise;

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick(); // swapToFallback is blocked inside fallbackProvider.createEngine()

  wrapper.loadUtterances([{ plain: "new one" }]); // a fresh content load races the in-flight swap
  gate.resolve();
  await tick();

  t.truthy(fallbackProvider.engine, "swap still creates and adopts the fallback engine");
  t.is(fallbackProvider.engine!.destroyCalls, 0, "adopted, not torn down");
  t.deepEqual(fallbackProvider.engine!.loadUtterancesCalls[0], [{ plain: "new one" }], "the new content, not the stale queue");
  t.is(primary.loadUtterancesCalls.length, 1, "the dying primary never saw the racing load");
  t.deepEqual(fallbackProvider.engine!.speakCalls, [], "a fresh load never auto-plays");

  fallbackProvider.engine!.emit("ready");
  t.is(wrapper.getState(), "paused", "loaded but not playing, matching ordinary loadUtterances() semantics");

  wrapper.speak(0); // proves the new content is genuinely usable now, not just silently accepted
  t.deepEqual(fallbackProvider.engine!.speakCalls, [0]);
});

test.serial("speak() racing swapToFallback()'s gap does not strand the wrapper on the dead primary", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "one" }, { plain: "two" }, { plain: "three" }]);
  wrapper.speak(0);

  const gate = deferred();
  fallbackProvider.createEngineGate = gate.promise;

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick(); // swapToFallback is blocked inside fallbackProvider.createEngine()

  wrapper.speak(2); // an explicit jump races the in-flight swap
  t.is(primary.speakCalls.filter(i => i === 2).length, 0, "never forwarded to the dying primary");

  gate.resolve();
  await tick();

  t.truthy(fallbackProvider.engine, "the swap still creates and adopts the fallback engine");
  t.is(fallbackProvider.engine!.destroyCalls, 0, "not stranded — the arriving engine is adopted, not destroyed");

  fallbackProvider.engine!.emit("ready");
  t.deepEqual(fallbackProvider.engine!.speakCalls, [2], "the racing speak()'s index takes effect once ready");
});

test.serial("pause() racing swapToFallback()'s gap is deferred, not forwarded to the dying primary", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "one" }]);
  wrapper.speak(0);

  const gate = deferred();
  fallbackProvider.createEngineGate = gate.promise;

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  wrapper.pause();
  t.not(primary.getState(), "paused", "pause() during the swap never reaches the dying primary");

  gate.resolve();
  await tick();

  t.is(fallbackProvider.engine!.destroyCalls, 0);
  fallbackProvider.engine!.emit("ready");
  t.deepEqual(fallbackProvider.engine!.speakCalls, [], "stays paused");
  t.is(wrapper.getState(), "paused");
});

test.serial("setCurrentUtteranceIndex() racing swapToFallback()'s gap is deferred, takes effect once ready", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "one" }, { plain: "two" }]);
  wrapper.speak(0);

  const gate = deferred();
  fallbackProvider.createEngineGate = gate.promise;

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  let completed = false;
  wrapper.setCurrentUtteranceIndex(1, (success) => { completed = success; });
  t.true(completed, "reports success immediately, matching not-started semantics");
  t.is(primary.getCurrentUtteranceIndex(), 0, "never forwarded to the dying primary");

  gate.resolve();
  await tick();

  fallbackProvider.engine!.emit("ready");
  t.deepEqual(fallbackProvider.engine!.speakCalls, [1], "deferred index took effect once the arriving engine was ready");
});

test.serial("stop() racing swapToFallback()'s gap lets the swap land in idle instead of aborting it", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "one" }]);
  wrapper.speak(0);

  const gate = deferred();
  fallbackProvider.createEngineGate = gate.promise;

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  wrapper.stop();
  gate.resolve();
  await tick();

  t.truthy(fallbackProvider.engine, "swap still creates and adopts the fallback engine");
  t.is(fallbackProvider.engine!.destroyCalls, 0, "adopted, not aborted-and-destroyed");
  t.deepEqual(fallbackProvider.engine!.loadUtterancesCalls[0], [{ plain: "one" }]);

  fallbackProvider.engine!.emit("ready");
  t.deepEqual(fallbackProvider.engine!.speakCalls, [], "stop() means desiredPlaying is false — never told to speak");
  t.is(wrapper.getState(), "paused", "resting idle-equivalent");
});

test.serial("destroy() racing swapToFallback()'s gap aborts the swap and tears down the arriving engine", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "one" }]);

  const gate = deferred();
  fallbackProvider.createEngineGate = gate.promise;

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  const destroyPromise = wrapper.destroy();
  gate.resolve();
  await destroyPromise;
  await tick(); // destroy() doesn't await the in-flight swap; give it a turn to notice and unwind

  t.truthy(fallbackProvider.engine, "the swap still creates the fallback engine before noticing it's stale");
  t.is(fallbackProvider.engine!.destroyCalls, 1, "torn down, not adopted");
  t.deepEqual(fallbackProvider.engine!.speakCalls, []);
});

// =============================================
// enginefallback / enginerecovered event ordering
// =============================================

test.serial("enginefallback fires before start, even when the fallback engine's ready/start are synchronous (like real WebSpeechEngine)", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  fallbackProvider.engineOptions = { synchronous: true };
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, primaryProvider: new FakePrimaryProvider() as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "one" }]);
  wrapper.speak(0);

  const order: string[] = [];
  wrapper.on("enginefallback", () => order.push("enginefallback"));
  wrapper.on("start", () => order.push("start"));

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  t.deepEqual(order, ["enginefallback", "start"]);
});

test.serial("enginerecovered fires before start, even when the recovered primary's ready/start are synchronous", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const primaryProvider = new FakePrimaryProvider();
  primaryProvider.reachable = false;
  primaryProvider.engineOptions = { synchronous: true };
  const wrapper = new FallbackSpeechEngine({
    primaryEngine: primary as any,
    primaryProvider: primaryProvider as any,
    fallbackProvider: fallbackProvider as any,
    onFailure: "fallbackAndRecover",
    healthCheckIntervalMs: 20
  });
  wrapper.loadUtterances([{ plain: "one" }]);
  wrapper.speak(0);

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();
  fallbackProvider.engine!.emit("ready");
  await tick();
  fallbackProvider.engine!.setStateForTest("idle"); // opens the recovery window

  const order: string[] = [];
  wrapper.on("enginerecovered", () => order.push("enginerecovered"));
  wrapper.on("start", () => order.push("start"));

  primaryProvider.reachable = true;
  await wait(60); // health check fires, recreates the primary synchronously readying/starting
  await tick();

  t.deepEqual(order, ["enginerecovered", "start"]);
});

// =============================================
// fallbackAndRecover
// =============================================

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

  await wait(120);

  t.is(primaryProvider.getVoicesCalls, 0, "never polled the primary");
  t.is(recovered.length, 0);
});

test.serial("fallbackAndRecover: waits until nothing is playing before swapping back, then resumes on a fresh primary engine", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const primaryProvider = new FakePrimaryProvider();
  primaryProvider.reachable = false;
  const wrapper = new FallbackSpeechEngine({
    primaryEngine: primary as any,
    primaryProvider: primaryProvider as any,
    fallbackProvider: fallbackProvider as any,
    onFailure: "fallbackAndRecover",
    healthCheckIntervalMs: 20
  });
  wrapper.loadUtterances([{ plain: "one" }, { plain: "two" }, { plain: "three" }]);

  const recovered: any[] = [];
  wrapper.on("enginerecovered", (e: any) => recovered.push(e));

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  const fallbackEngine = fallbackProvider.engine!;
  fallbackEngine.setStateForTest("playing");

  primaryProvider.reachable = true;
  await wait(80);
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

test.serial("fallbackAndRecover: an explicit speak() (mimicking the navigator's advance-to-next call) intercepts and recovers instead of continuing on the fallback", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const primaryProvider = new FakePrimaryProvider();
  primaryProvider.reachable = false;
  const wrapper = new FallbackSpeechEngine({
    primaryEngine: primary as any,
    primaryProvider: primaryProvider as any,
    fallbackProvider: fallbackProvider as any,
    onFailure: "fallbackAndRecover",
    healthCheckIntervalMs: 20
  });
  wrapper.loadUtterances([{ plain: "one" }, { plain: "two" }]);
  wrapper.speak(0);

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();
  fallbackProvider.engine!.emit("ready"); // starts playing utterance 0 on the fallback

  primaryProvider.reachable = true;
  await wait(60); // health check succeeds; fallback is mid-utterance — no swap yet
  await tick();

  t.is(primaryProvider.engine, null, "primary reachable, but mid-utterance — no swap yet");

  // Utterance 0 ends: real engines go idle before firing "end", which is what actually makes
  // the navigator's next speak() call land in a safe (non-audible) gap.
  fallbackProvider.engine!.setStateForTest("idle");
  fallbackProvider.engine!.emit("end");

  wrapper.speak(1); // the navigator advancing to utterance 1
  await tick();

  t.truthy(primaryProvider.engine, "speak() advancing to the next utterance was intercepted into a recovery");
  t.deepEqual(fallbackProvider.engine!.speakCalls, [0], "the fallback engine was never told to speak utterance 1");
});

test.serial("fallbackAndRecover: resumes at the utterance jumped to before pausing, when it swaps back mid-pause", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const primaryProvider = new FakePrimaryProvider();
  primaryProvider.reachable = true;
  const wrapper = new FallbackSpeechEngine({
    primaryEngine: primary as any,
    primaryProvider: primaryProvider as any,
    fallbackProvider: fallbackProvider as any,
    onFailure: "fallbackAndRecover",
    healthCheckIntervalMs: 20
  });
  wrapper.loadUtterances([{ plain: "one" }, { plain: "two" }]);
  wrapper.speak(0);

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();
  fallbackProvider.engine!.emit("ready");
  await tick();

  wrapper.setCurrentUtteranceIndex(1); // jump to utterance 1 while still on the fallback
  wrapper.pause();
  fallbackProvider.engine!.emit("pause"); // the fallback engine confirming the pause — triggers maybeRecoverNow()
  await wait(80);
  await tick();

  t.truthy(primaryProvider.engine, "swapped back while paused");
  primaryProvider.engine!.emit("ready");

  t.deepEqual(primaryProvider.engine!.speakCalls, [], "stays paused, doesn't auto-play");
  t.is(wrapper.getCurrentUtteranceIndex(), 1, "resumed at the utterance jumped to before pausing");
  t.is(primaryProvider.engine!.loadUtterancesStartIndexCalls[0], 1, "recovered primary was told to warm utterance 1, not cold-buffer from 0");
});

test.serial("stop() racing recoverToPrimary()'s gap lets the swap land in idle instead of aborting it", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const primaryProvider = new FakePrimaryProvider();
  primaryProvider.reachable = false;
  const wrapper = new FallbackSpeechEngine({
    primaryEngine: primary as any,
    primaryProvider: primaryProvider as any,
    fallbackProvider: fallbackProvider as any,
    onFailure: "fallbackAndRecover",
    healthCheckIntervalMs: 20
  });
  wrapper.loadUtterances([{ plain: "one" }]);
  wrapper.speak(0);

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();
  fallbackProvider.engine!.emit("ready");
  await tick();
  fallbackProvider.engine!.setStateForTest("idle"); // opens the recovery window

  const gate = deferred();
  primaryProvider.createEngineGate = gate.promise;
  primaryProvider.reachable = true;
  await wait(60); // health check fires, createEngine() called, now blocked on the gate

  wrapper.stop(); // races the in-flight recovery
  gate.resolve();
  await tick();

  t.truthy(primaryProvider.engine, "recovery still creates and adopts the primary engine");
  t.is(primaryProvider.engine!.destroyCalls, 0, "adopted, not aborted-and-destroyed");

  primaryProvider.engine!.emit("ready");
  t.deepEqual(primaryProvider.engine!.speakCalls, [], "stop() means desiredPlaying is false — never told to speak");
});

test.serial("loadUtterances() racing recoverToPrimary()'s gap lands the new content on the arriving primary, not the (still functional) fallback", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const primaryProvider = new FakePrimaryProvider();
  primaryProvider.reachable = false;
  const wrapper = new FallbackSpeechEngine({
    primaryEngine: primary as any,
    primaryProvider: primaryProvider as any,
    fallbackProvider: fallbackProvider as any,
    onFailure: "fallbackAndRecover",
    healthCheckIntervalMs: 20
  });
  wrapper.loadUtterances([{ plain: "one" }, { plain: "two" }, { plain: "three" }]);
  wrapper.speak(2);

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();
  const fallbackEngine = fallbackProvider.engine!;
  fallbackEngine.emit("ready");
  await tick();
  fallbackEngine.setStateForTest("idle"); // opens the recovery window

  const gate = deferred();
  primaryProvider.createEngineGate = gate.promise;
  primaryProvider.reachable = true;
  await wait(60); // health check fires, createEngine() called, now blocked on the gate

  // A completely different, shorter queue loads while the old recovery is still in flight — index
  // 2 wouldn't even exist in it, and the deferral must not forward it to the dead-end recovery
  // gap the way it would to a dying primary in the swapToFallback direction.
  wrapper.loadUtterances([{ plain: "new one" }]);
  t.is(fallbackEngine.loadUtterancesCalls.length, 1, "not forwarded to the fallback either — deferred uniformly, same rule both directions");

  gate.resolve();
  await tick();

  t.truthy(primaryProvider.engine, "recovery still creates and adopts the primary engine");
  t.is(primaryProvider.engine!.destroyCalls, 0);
  t.deepEqual(primaryProvider.engine!.loadUtterancesCalls[0], [{ plain: "new one" }], "the new content, not the stale queue");
  t.deepEqual(primaryProvider.engine!.speakCalls, [], "a fresh load never auto-plays");
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
    healthCheckIntervalMs: 20
  });
  wrapper.loadUtterances([{ plain: "hello" }]);

  const recovered: any[] = [];
  wrapper.on("enginerecovered", (e: any) => recovered.push(e));

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();
  fallbackProvider.engine!.setStateForTest("idle");

  await wait(80);
  await tick();
  const callsAfterFirstFailedRecovery = primaryProvider.getVoicesCalls;

  t.is(recovered.length, 0, "recreating the primary failed, no swap happened");
  t.is(primaryProvider.engine, null);
  t.true(callsAfterFirstFailedRecovery >= 1, "kept probing");

  await wait(80);
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
    healthCheckIntervalMs: 20
  });
  wrapper.loadUtterances([{ plain: "hello" }]);

  const fallbackEvents: any[] = [];
  wrapper.on("enginefallback", (e: any) => fallbackEvents.push(e));

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();
  fallbackProvider.engine!.setStateForTest("idle");
  fallbackProvider.engine!.emit("end");
  await wait(80);
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
    healthCheckIntervalMs: 20
  });
  wrapper.loadUtterances([{ plain: "hello" }]);

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();
  await wait(60);

  await wrapper.destroy();
  const callsAtDestroy = primaryProvider.getVoicesCalls;

  await wait(120);

  t.is(primaryProvider.getVoicesCalls, callsAtDestroy, "no further polling after destroy");
});
