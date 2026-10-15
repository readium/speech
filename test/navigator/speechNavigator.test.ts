import test from "ava";
import { GuidedNavigationObject } from "@readium/shared";
import { ReadiumSpeechNavigator, ReadiumSpeechVoice, SpeechPreferences } from "../../build/index.js";
import { MockEngine } from "./mockEngine.js";

const gnd = (json: unknown[]): GuidedNavigationObject[] => GuidedNavigationObject.deserializeArray(json)!;

const listTree = gnd([{ role: ["list"], text: { language: "en", plain: "Hello world." } }]);

const twoParagraphTree = gnd([
  { role: ["paragraph"], text: { language: "en", plain: "First." } },
  { role: ["paragraph"], text: { language: "en", plain: "Second." } },
]);

// "few" skips the footnote entirely; "most" doesn't — shifts every later index.
const footnoteThenParagraphsTree = gnd([
  { role: ["footnote"], text: { language: "en", plain: "A footnote." } },
  { role: ["paragraph"], text: { language: "en", plain: "First." } },
  { role: ["paragraph"], text: { language: "en", plain: "Second." } },
]);

test("navigator defaults to 'few' verbosity when none is set", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  t.is(navigator.settings.verbosity, "few");
});

const tableTree = gnd([
  {
    role: ["table"],
    children: [
      {
        role: ["row"],
        children: [{ role: ["cell"], text: { language: "en", plain: "Cell." } }],
      },
    ],
  },
]);

test("table contextualization is inline at 'few', block from 'some' on", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "few" }));
  await navigator.loadGndContent(tableTree);
  t.deepEqual(navigator.getContentQueue(), [{ language: "en", plain: "Table. 1 line. 1 column." }]);

  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "some" }));
  t.deepEqual(navigator.getContentQueue(), [
    { language: "en", plain: "Table. 1 line. 1 column." },
    { language: "en", plain: "Row: 1" },
    { language: "en", plain: "Cell." },
    { language: "en", plain: "End of the table." },
  ]);

  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  t.deepEqual(navigator.getContentQueue(), [
    { language: "en", plain: "Table. 1 line. 1 column." },
    { language: "en", plain: "Row: 1" },
    { language: "en", plain: "Cell." },
    { language: "en", plain: "End of the table." },
  ]);
});

test("submitPreferences re-extracts content loaded via loadGndContent", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.loadGndContent(listTree);
  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  t.deepEqual(navigator.getContentQueue(), [
    { language: "en", plain: "Start of the list." },
    { language: "en", plain: "Hello world." },
    { language: "en", plain: "End of the list." },
  ]);
});

test("submitPreferences re-extracts when languageOverrides changes, not when it's resubmitted equal", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.loadGndContent(listTree);
  await navigator.submitPreferences(new SpeechPreferences({ languageOverrides: { en: "fr" } }));
  t.deepEqual(navigator.getContentQueue(), [{ language: "fr", plain: "Hello world." }]);

  const loads = engine.loadUtterancesStartIndexCalls.length;
  await navigator.submitPreferences(new SpeechPreferences({ languageOverrides: { en: "fr" } }));
  t.is(engine.loadUtterancesStartIndexCalls.length, loads);
});

// .serial: this and the next three tests all exercise submitPreferences()'s
// console.warn side effect (an extraction-affecting change with no GND
// source) — now that submitPreferences() is async, letting them run
// concurrently lets one test's warning land in another's mocked console.warn.
test.serial("submitPreferences is a no-op on content loaded via plain loadContent", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Hello world.", language: "en" }]);
  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  t.deepEqual(navigator.getContentQueue(), [{ plain: "Hello world.", language: "en" }]);
});

test.serial("submitPreferences warns when an extraction-affecting preference has no source to re-extract from", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Hello world.", language: "en" }]);

  const calls: unknown[][] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => calls.push(args);
  try {
    await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  } finally {
    console.warn = original;
  }
  t.is(calls.length, 1);
  t.true(String(calls[0][0]).includes("no effect on content loaded via loadContent()"));
});

test.serial("submitPreferences does not warn when no content has been loaded yet", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);

  const calls: unknown[][] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => calls.push(args);
  try {
    await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  } finally {
    console.warn = original;
  }
  t.is(calls.length, 0);
});

test.serial("submitPreferences does not warn for prosody-only preferences on plain loadContent", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Hello world.", language: "en" }]);

  const calls: unknown[][] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => calls.push(args);
  try {
    await navigator.submitPreferences(new SpeechPreferences({ rate: 1.5 }));
  } finally {
    console.warn = original;
  }
  t.is(calls.length, 0);
});

test.serial("settings/preferencesEditor reflect submitted preferences", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  t.is(navigator.settings.verbosity, "few");
  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  t.is(navigator.settings.verbosity, "most");
  t.is(navigator.preferencesEditor.verbosity.effectiveValue, "most");
});

test("editing the preferencesEditor without submitting does not affect the navigator's settings", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.preferencesEditor.verbosity.value = "most";
  // Staged on the editor's own (cloned) preferences...
  t.is(navigator.preferencesEditor.preferences.verbosity, "most");
  // ...but not committed to the navigator until submitPreferences() is called.
  t.is(navigator.settings.verbosity, "few");
});

test("editing the preferencesEditor without submitting does not leak into a later, unrelated submitPreferences call", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.preferencesEditor.pauseDuration.value = 500;
  await navigator.submitPreferences(new SpeechPreferences({ rate: 1.5 }));
  t.is(navigator.settings.rate, 1.5);
  t.is(navigator.settings.pauseDuration, 300);
});

test("constructing a navigator pushes the default rate/pitch/volume to the engine", (t) => {
  const engine = new MockEngine();
  new ReadiumSpeechNavigator(engine);
  t.is(engine.rate, 1);
  t.is(engine.pitch, 1);
  t.is(engine.volume, 1);
});

test("submitPreferences pushes rate/pitch/volume to the engine", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.submitPreferences(new SpeechPreferences({ rate: 1.5, pitch: 0.5, volume: 0.2 }));
  t.is(engine.rate, 1.5);
  t.is(engine.pitch, 0.5);
  t.is(engine.volume, 0.2);
  t.is(navigator.settings.rate, 1.5);
  t.is(navigator.preferencesEditor.rate.effectiveValue, 1.5);
});

test("defaults are configurable via the constructor and pushed to the engine on construction", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine, { defaults: { rate: 1.5, verbosity: "most" } });
  t.is(engine.rate, 1.5);
  t.is(navigator.settings.rate, 1.5);
  t.is(navigator.settings.verbosity, "most");
});

test("an out-of-range constructor default falls back to the literal default", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine, { defaults: { rate: 999 } });
  t.is(engine.rate, 1);
  t.is(navigator.settings.rate, 1);
});

test("initial preferences are configurable via the constructor", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine, { preferences: { rate: 2 } });
  t.is(engine.rate, 2);
  t.is(navigator.settings.rate, 2);
});

test("pauseDuration delays the next speak() call", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
  ]);
  await navigator.submitPreferences(new SpeechPreferences({ pauseDuration: 60 }));

  const before = Date.now();
  engine.emit({ type: "end" });
  t.is(engine.speakCalls.length, 0, "speak() must not fire synchronously when a pause is configured");

  await new Promise((resolve) => setTimeout(resolve, 120));
  t.is(engine.speakCalls.length, 1);
  t.true(engine.speakCalls[0] - before >= 50);
});

test("a zero pauseDuration still yields to the event loop, but resolves on the next tick", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
  ]);
  await navigator.submitPreferences(new SpeechPreferences({ pauseDuration: 0 }));

  engine.emit({ type: "end" });
  t.is(engine.speakCalls.length, 0, "still async even at 0ms — setTimeout, not a synchronous call");

  await new Promise((resolve) => setTimeout(resolve, 0));
  t.is(engine.speakCalls.length, 1);
});

test("content ending naturally resets to utterance 0, so a later play() restarts instead of replaying the last utterance", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
  ]);

  engine.setCurrentUtteranceIndex(1); // playback reached the last utterance
  engine.emit({ type: "end" });

  t.is(engine.getCurrentUtteranceIndex(), 0);

  navigator.play();
  t.is(engine.speakCalls.length, 1, "play() from idle calls speak() to restart");
});

test("pause during the pauseDuration gap continues with the next utterance on play()", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
  ]);
  engine.emit({ type: "ready" });
  await navigator.submitPreferences(new SpeechPreferences({ pauseDuration: 60 }));
  const pauses: string[] = [];
  navigator.on("pause", () => pauses.push("pause"));

  navigator.play();
  engine.emit({ type: "end" });
  navigator.pause();

  t.is(navigator.getState(), "paused");
  t.is(engine.pauseCalls, 0, "the engine has nothing to pause between utterances");
  t.deepEqual(pauses, ["pause"]);

  await new Promise((resolve) => setTimeout(resolve, 120));
  t.is(engine.speakCalls.length, 1, "the pending advance was cancelled");

  navigator.play();
  t.is(navigator.getState(), "playing");
  t.is(engine.resumeCalls, 0);
  t.is(engine.speakCalls.length, 2);
  t.is(engine.getCurrentUtteranceIndex(), 1);
});

test("next() while paused during the pauseDuration gap is the utterance spoken on play()", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
    { plain: "Third.", language: "en" },
  ]);
  engine.emit({ type: "ready" });
  await navigator.submitPreferences(new SpeechPreferences({ pauseDuration: 60 }));

  navigator.play();
  engine.emit({ type: "end" });
  navigator.pause();
  navigator.next();

  navigator.play();
  t.is(engine.speakCalls.length, 2);
  t.is(engine.getCurrentUtteranceIndex(), 1);
});

test("pause mid-utterance pauses and resumes the engine", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
  ]);
  engine.emit({ type: "ready" });

  navigator.play();
  navigator.pause();
  t.is(engine.pauseCalls, 1);

  navigator.play();
  t.is(engine.resumeCalls, 1);
  t.is(engine.speakCalls.length, 1, "resumed, not re-spoken");
});

test("autoPause 'utterance' fully pauses instead of continuing automatically", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
  ]);
  await navigator.submitPreferences(new SpeechPreferences({ autoPause: "utterance" }));

  engine.emit({ type: "end" });
  t.is(navigator.getState(), "paused");
  t.is(engine.speakCalls.length, 0, "no automatic continuation while auto-paused");

  await new Promise((resolve) => setTimeout(resolve, 50));
  t.is(engine.speakCalls.length, 0, "still paused after a delay — this isn't pauseDuration");

  navigator.play();
  t.is(navigator.getState(), "playing");
  t.is(engine.speakCalls.length, 1);
  t.is(engine.getCurrentUtteranceIndex(), 1);
});

test("autoPause 'block' does not pause when the next utterance doesn't start a new block", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Still the same block.", language: "en" },
  ]);
  await navigator.submitPreferences(new SpeechPreferences({ autoPause: "block", pauseDuration: 0 }));

  engine.emit({ type: "end" });
  t.is(engine.speakCalls.length, 0, "still async — setTimeout, not a synchronous call");
  t.not(navigator.getState(), "paused", "no block boundary here, so autoPause never triggers");

  await new Promise((resolve) => setTimeout(resolve, 0));
  t.is(engine.speakCalls.length, 1, "continues automatically, delayed only by pauseDuration");
});

test("autoPause 'block' pauses when the next utterance starts a new block", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.loadGndContent(twoParagraphTree);
  await navigator.submitPreferences(new SpeechPreferences({ autoPause: "block" }));

  engine.emit({ type: "end" });
  t.is(navigator.getState(), "paused");
  t.is(engine.speakCalls.length, 0);

  navigator.play();
  t.is(engine.speakCalls.length, 1);
  t.is(engine.getCurrentUtteranceIndex(), 1);
});

test("jumping while auto-paused resumes at the jumped-to index, not the original one", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
    { plain: "Third.", language: "en" },
  ]);
  await navigator.submitPreferences(new SpeechPreferences({ autoPause: "utterance" }));

  engine.emit({ type: "end" }); // finishes index 0, auto-pauses before index 1
  t.is(navigator.getState(), "paused");

  navigator.jumpTo(2, false);
  navigator.play();
  t.is(engine.speakCalls.length, 1);
  t.is(engine.getCurrentUtteranceIndex(), 2);
});

test("changing voice while auto-paused resumes at the withheld utterance, not the finished one", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
  ]);
  await navigator.submitPreferences(new SpeechPreferences({ autoPause: "utterance" }));

  engine.emit({ type: "end" }); // finishes index 0, auto-pauses before index 1
  await navigator.submitPreferences(new SpeechPreferences({ voice: "Samantha" }));
  engine.emit({ type: "ready" });
  t.is(navigator.getState(), "paused");

  navigator.play();
  t.is(engine.speakCalls.length, 1);
  t.is(engine.getCurrentUtteranceIndex(), 1);
});

test("an extraction-affecting change while auto-paused resumes at the withheld utterance, not the finished one", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.loadGndContent(footnoteThenParagraphsTree);
  await navigator.submitPreferences(new SpeechPreferences({ autoPause: "utterance" }));

  engine.emit({ type: "end" }); // finishes "First.", auto-pauses before "Second."
  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  engine.emit({ type: "ready" });
  t.is(navigator.getState(), "paused");

  navigator.play();
  const expectedIndex = navigator.getContentQueue().findIndex((u) => u.plain === "Second.");
  t.is(engine.speakCalls.length, 1);
  t.is(engine.getCurrentUtteranceIndex(), expectedIndex);
});

test("changing voice again before the reload is ready still resumes where playback was", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
    { plain: "Third.", language: "en" },
  ]);
  engine.emit({ type: "ready" });
  navigator.play();
  navigator.jumpTo(2, true);

  await navigator.submitPreferences(new SpeechPreferences({ voice: "Samantha" }));
  await navigator.submitPreferences(new SpeechPreferences({ voice: "Daniel" })); // before "ready"
  engine.emit({ type: "ready" });

  t.is(navigator.getState(), "playing");
  t.is(engine.getCurrentUtteranceIndex(), 2);
  t.deepEqual(engine.loadedUtterances.map((u) => u.voice), ["Daniel", "Daniel", "Daniel"]);
});

test("an extraction-affecting change before the previous reload is ready still resumes paused at the same content", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.loadGndContent(footnoteThenParagraphsTree);
  engine.emit({ type: "ready" });
  navigator.play();
  navigator.jumpTo(1, true); // "Second." under "few"
  navigator.pause();

  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "some" })); // before "ready"
  engine.emit({ type: "ready" });

  t.is(navigator.getState(), "paused");
  const expectedIndex = navigator.getContentQueue().findIndex((u) => u.plain === "Second.");
  t.is(engine.getCurrentUtteranceIndex(), expectedIndex);
});

test("prosody-only submitPreferences mid-playback does not reload the queue", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.loadGndContent(twoParagraphTree);
  engine.emit({ type: "ready" });
  navigator.play();

  engine.emit({ type: "end" }); // schedules a delayed speak()
  await navigator.submitPreferences(new SpeechPreferences({ rate: 1.5 }));
  t.is(engine.stopCalls, 0);
  t.is(navigator.getState(), "playing");

  await new Promise((resolve) => setTimeout(resolve, 350));
  t.is(engine.speakCalls.length, 2, "the pre-existing timer still fires normally");
});

test("extraction-affecting submitPreferences mid-playback cancels speech and the pending timer", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.loadGndContent(twoParagraphTree);
  engine.emit({ type: "ready" });
  navigator.play();

  engine.emit({ type: "end" }); // schedules a delayed speak()
  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  t.is(engine.stopCalls, 1);

  await new Promise((resolve) => setTimeout(resolve, 350));
  t.is(engine.speakCalls.length, 1, "no stale speak() from the pre-reload timer");
});

test("an extraction-affecting change mid-playback resumes at the same content, not index 0", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.loadGndContent(footnoteThenParagraphsTree);
  engine.emit({ type: "ready" });
  navigator.play();
  navigator.jumpTo(1, true); // "Second." under "few" (footnote skipped, indices 0/1)

  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" })); // footnote no longer skipped, shifts indices
  engine.emit({ type: "ready" });

  t.is(navigator.getState(), "playing");
  const expectedIndex = navigator.getContentQueue().findIndex((u) => u.plain === "Second.");
  t.true(expectedIndex > 1, "the footnote now takes up earlier slots");
  t.is(engine.getCurrentUtteranceIndex(), expectedIndex);
});

test("an extraction-affecting change mid-pause resumes paused at the same content", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.loadGndContent(footnoteThenParagraphsTree);
  engine.emit({ type: "ready" });
  navigator.play();
  navigator.jumpTo(1, true);
  navigator.pause();

  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  engine.emit({ type: "ready" });

  t.is(navigator.getState(), "paused");
  const expectedIndex = navigator.getContentQueue().findIndex((u) => u.plain === "Second.");
  t.is(engine.getCurrentUtteranceIndex(), expectedIndex);
});

test("play() after an extraction-affecting change mid-pause speaks the resumed content instead of resuming the reloaded engine", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.loadGndContent(footnoteThenParagraphsTree);
  engine.emit({ type: "ready" });
  navigator.play();
  navigator.jumpTo(1, true);
  navigator.pause();

  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  engine.emit({ type: "ready" });
  const speakCallsBefore = engine.speakCalls.length;

  navigator.play();

  t.is(engine.resumeCalls, 0);
  t.is(engine.speakCalls.length, speakCallsBefore + 1);
  const expectedIndex = navigator.getContentQueue().findIndex((u) => u.plain === "Second.");
  t.is(engine.getCurrentUtteranceIndex(), expectedIndex);
});

test("resuming falls back to the nearest earlier node still present when the current one got skipped", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  await navigator.loadGndContent(footnoteThenParagraphsTree);
  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" })); // footnote included
  engine.emit({ type: "ready" });
  navigator.play();
  navigator.jumpTo(0, true); // the footnote's own utterance

  await navigator.submitPreferences(new SpeechPreferences({ verbosity: "few" })); // footnote skipped again
  engine.emit({ type: "ready" });

  t.is(navigator.getState(), "playing");
  t.is(engine.getCurrentUtteranceIndex(), 0, "falls back to the start — nothing earlier to land on");
});

test("setContentQueue does not call engine.stop() when the navigator is idle", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Hello world.", language: "en" }]);
  t.is(engine.stopCalls, 0);
});

test("engine 'start' also emits a synthesized 'boundary' with name 'structure' (structure segmentation, the default), before 'start' itself", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Hello world.", language: "en", locate: { cssSelector: "p" } }]);

  const seen: string[] = [];
  navigator.on("boundary", (event) => seen.push(`boundary:${event.detail.name}`));
  navigator.on("start", () => seen.push("start"));

  engine.emit({ type: "start" });

  t.deepEqual(seen, ["boundary:structure", "start"]);
});

test("engine 'start' is re-emitted with its detail, reporting the voice used", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Hello world.", language: "en" }]);
  const voice = { name: "Voice", language: "en-US", voiceURI: "voice-en-US" };

  let detail: any;
  navigator.on("start", (event) => { detail = event.detail; });
  engine.emit({ type: "start", detail: { voice } });

  t.is(detail?.voice, voice);
});

function captureLastBoundary(navigator: ReadiumSpeechNavigator): { detail?: any } {
  const captured: { detail?: any } = {};
  navigator.on("boundary", (event) => {
    if (event.detail?.name !== "word") captured.detail = event.detail;
  });
  return captured;
}

test("synthesized 'boundary' carries the utterance's own locate in structure mode", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Hello world.", language: "en", locate: { cssSelector: "p" } }]);
  const captured = captureLastBoundary(navigator);

  engine.emit({ type: "start" });

  t.is(captured.detail.name, "structure");
  t.deepEqual(captured.detail.locate, [{ cssSelector: "p" }]);
});

test("synthesized 'boundary' carries one locate per offsets piece in sentence mode", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine, { preferences: { segmentation: "sentence" } });
  navigator.loadContent([{
    plain: "Hello world.",
    language: "en",
    locate: { cssSelector: "p" },
    offsets: [
      { start: 0, end: 6, locate: { cssSelector: "p", text: { highlight: "Hello " } } },
      { start: 6, end: 12, locate: { cssSelector: "p", text: { highlight: "world." } } },
    ],
  }]);
  const captured = captureLastBoundary(navigator);

  engine.emit({ type: "start" });

  t.is(captured.detail.name, "sentence");
  t.is(captured.detail.locate.length, 2);
});

test("synthesized 'boundary' is not emitted for an utterance with nothing to locate", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Some synthesized announcement." }]);

  let fired = false;
  navigator.on("boundary", () => { fired = true; });

  engine.emit({ type: "start" });

  t.false(fired);
});

test("skipping to another utterance while paused also emits the synthesized 'boundary'", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en", locate: { cssSelector: "p:nth-child(1)" } },
    { plain: "Second.", language: "en", locate: { cssSelector: "p:nth-child(2)" } },
  ]);
  engine.emit({ type: "ready" });
  navigator.play();
  navigator.pause();
  const captured = captureLastBoundary(navigator);

  navigator.next();

  t.is(captured.detail.name, "structure");
  t.deepEqual(captured.detail.locate, [{ cssSelector: "p:nth-child(2)" }]);
});

test("voice stamps loadContent() utterances without their own voice, a record by their language", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine, { preferences: { voice: { fr: "Thomas", "en-GB": "Daniel" } } });
  navigator.loadContent([
    { plain: "Bonjour.", language: "fr-FR" },
    { plain: "Hello.", language: "en-GB" },
    { plain: "Hi.", language: "en-US" },
    { plain: "Salut.", language: "fr", voice: "Amelie" },
    { plain: "No language." },
  ]);
  t.deepEqual(engine.loadedUtterances.map((u) => u.voice), ["Thomas", "Daniel", undefined, "Amelie", undefined]);
});

test("a single voice stamps every utterance without its own, announcements included", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine, { preferences: { voice: "Samantha", verbosity: "most" } });
  await navigator.loadGndContent(listTree);
  t.deepEqual(navigator.getContentQueue().map((u) => u.voice), ["Samantha", "Samantha", "Samantha"]);
});

test("changing voice re-stamps the loaded queue without re-extracting, resuming at the current utterance", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "One.", language: "fr" }, { plain: "Two.", language: "fr" }]);
  engine.emit({ type: "ready" });
  navigator.play();
  engine.emit({ type: "end" });
  await new Promise((resolve) => setTimeout(resolve, 350));

  await navigator.submitPreferences(new SpeechPreferences({ voice: { fr: "Thomas" } }));
  t.deepEqual(engine.loadedUtterances.map((u) => u.voice), ["Thomas", "Thomas"]);
  t.is(engine.loadUtterancesStartIndexCalls.at(-1), 1);

  const loads = engine.loadUtterancesStartIndexCalls.length;
  await navigator.submitPreferences(new SpeechPreferences({ voice: { fr: "Thomas" } }));
  t.is(engine.loadUtterancesStartIndexCalls.length, loads, "an equal voice doesn't reload");
});

class VoicedMockEngine extends MockEngine {
  getCurrentVoice(): ReadiumSpeechVoice | null {
    return { source: "json", label: "Alba", name: "Alba", originalName: "Alba", language: "en-US", voiceURI: "alba-en-US" } as ReadiumSpeechVoice;
  }
}

test("settings.voice falls back to the engine's voice, filling its language in a record without it", async (t) => {
  const navigator = new ReadiumSpeechNavigator(new VoicedMockEngine());
  t.is(navigator.settings.voice, "alba-en-US");

  await navigator.submitPreferences(new SpeechPreferences({ voice: { fr: "lea-fr-FR" } }));
  t.deepEqual(navigator.settings.voice, { fr: "lea-fr-FR", en: "alba-en-US" });

  await navigator.submitPreferences(new SpeechPreferences({ voice: { "en-GB": "oliver-en-GB", en: "eddy-en-US" } }));
  t.deepEqual(navigator.settings.voice, { "en-GB": "oliver-en-GB", en: "eddy-en-US" }, "a record's own entry for the language wins");

  await navigator.submitPreferences(new SpeechPreferences({ voice: "lea-fr-FR" }));
  t.is(navigator.settings.voice, "lea-fr-FR");
});

test("the engine's voice isn't stamped on utterances, which stay free to follow their language", (t) => {
  const engine = new VoicedMockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Bonjour", language: "fr-FR" }]);

  t.is(engine.loadedUtterances[0].voice, undefined);
});
