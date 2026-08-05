import test from "ava";
import { FallbackSpeechEngine, WebSpeechVoiceManager } from "../../build/index.js";
import { FakeEngine, FakeFallbackProvider, makeReadiumVoice, tick } from "./testUtils.js";

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
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, fallbackProvider: fallbackProvider as any });

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

  // Playback only resumes once the fallback engine reports "ready".
  t.deepEqual(fallbackProvider.engine!.speakCalls, []);
  fallbackProvider.engine!.emit("ready");
  t.deepEqual(fallbackProvider.engine!.speakCalls, [2], "resumed at the utterance that was active when the primary failed");
});

test.serial("falls back to a language-only match when no voice satisfies both language and gender", async (t) => {
  const primary = new FakeEngine();
  primary.setCurrentVoiceForTest({ language: "fr-FR", gender: "neutral" }); // no neutral fr voice seeded

  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, fallbackProvider: fallbackProvider as any });
  wrapper.loadUtterances([{ plain: "hello" }]);

  primary.emit("error", { message: "network failure", recoverable: true });
  await tick();

  t.truthy(fallbackProvider.receivedVoice, "a voice was still picked");
  t.is(fallbackProvider.receivedVoice.language, "fr-FR", "language-only match, gender requirement dropped");
});

test.serial("does not swap on a non-recoverable error, forwards it as-is", async (t) => {
  const primary = new FakeEngine();
  const fallbackProvider = new FakeFallbackProvider();
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, fallbackProvider: fallbackProvider as any });
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
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, fallbackProvider: fallbackProvider as any, onFailure: "error" });
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
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, fallbackProvider: fallbackProvider as any });
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
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, fallbackProvider: fallbackProvider as any });
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
  const wrapper = new FallbackSpeechEngine({ primaryEngine: primary as any, fallbackProvider: fallbackProvider as any });

  wrapper.setRate(1.5);
  wrapper.setPitch(0.8);
  wrapper.setVolume(0.5);
  wrapper.speak(1);

  t.is(primary.getRate(), 1.5);
  t.is(primary.getPitch(), 0.8);
  t.is(primary.getVolume(), 0.5);
  t.deepEqual(primary.speakCalls, [1]);
});
