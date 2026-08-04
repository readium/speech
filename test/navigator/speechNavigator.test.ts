import test from "ava";
import type { GndObject } from "../../src/gnd/types.js";
import { ReadiumSpeechNavigator, SpeechPreferences } from "../../build/index.js";
import { MockEngine } from "./mockEngine.js";

const chapterTree: GndObject[] = [{ role: ["chapter"], text: { language: "en", plain: "Hello world." } }];

const twoParagraphTree: GndObject[] = [
  { role: ["paragraph"], text: { language: "en", plain: "First." } },
  { role: ["paragraph"], text: { language: "en", plain: "Second." } },
];

// "few" skips the footnote entirely; "most" doesn't — shifts every later index.
const footnoteThenParagraphsTree: GndObject[] = [
  { role: ["footnote"], text: { language: "en", plain: "A footnote." } },
  { role: ["paragraph"], text: { language: "en", plain: "First." } },
  { role: ["paragraph"], text: { language: "en", plain: "Second." } },
];

test("loadGndContent extracts with the default (few) verbosity", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadGndContent(chapterTree);
  t.deepEqual(navigator.getContentQueue(), [{ language: "en", plain: "Hello world." }]);
});

test("submitPreferences re-extracts content loaded via loadGndContent", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadGndContent(chapterTree);
  navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  t.deepEqual(navigator.getContentQueue(), [
    { plain: "Start of the chapter." },
    { language: "en", plain: "Hello world." },
    { plain: "End of the chapter." },
  ]);
});

test("submitPreferences is a no-op on content loaded via plain loadContent", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Hello world.", language: "en" }]);
  navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  t.deepEqual(navigator.getContentQueue(), [{ plain: "Hello world.", language: "en" }]);
});

test("submitPreferences warns when an extraction-affecting preference has no source to re-extract from", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Hello world.", language: "en" }]);

  const calls: unknown[][] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => calls.push(args);
  try {
    navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  } finally {
    console.warn = original;
  }
  t.is(calls.length, 1);
  t.true(String(calls[0][0]).includes("no effect on content loaded via loadContent()"));
});

test("submitPreferences does not warn for prosody-only preferences on plain loadContent", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([{ plain: "Hello world.", language: "en" }]);

  const calls: unknown[][] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => calls.push(args);
  try {
    navigator.submitPreferences(new SpeechPreferences({ rate: 1.5 }));
  } finally {
    console.warn = original;
  }
  t.is(calls.length, 0);
});

test("settings/preferencesEditor reflect submitted preferences", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  t.is(navigator.settings.verbosity, "few");
  navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
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

test("editing the preferencesEditor without submitting does not leak into a later, unrelated submitPreferences call", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.preferencesEditor.pauseDuration.value = 500;
  navigator.submitPreferences(new SpeechPreferences({ rate: 1.5 }));
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

test("submitPreferences pushes rate/pitch/volume to the engine", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.submitPreferences(new SpeechPreferences({ rate: 1.5, pitch: 0.5, volume: 0.2 }));
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

test("pauseDuration delays the next speak() call under the default pauseScope (utterance)", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
  ]);
  navigator.submitPreferences(new SpeechPreferences({ pauseDuration: 60 }));

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
  navigator.submitPreferences(new SpeechPreferences({ pauseDuration: 0 }));

  engine.emit({ type: "end" });
  t.is(engine.speakCalls.length, 0, "still async even at 0ms — setTimeout, not a synchronous call");

  await new Promise((resolve) => setTimeout(resolve, 0));
  t.is(engine.speakCalls.length, 1);
});

test("pauseScope 'block' skips pauseDuration when the next utterance doesn't start a new block", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Still the same block.", language: "en" },
  ]);
  navigator.submitPreferences(new SpeechPreferences({ pauseDuration: 60, pauseScope: "block" }));

  engine.emit({ type: "end" });
  t.is(engine.speakCalls.length, 0, "still async — setTimeout with delay 0, not a synchronous call");

  await new Promise((resolve) => setTimeout(resolve, 0));
  t.is(engine.speakCalls.length, 1);
});

test("pauseScope 'block' applies pauseDuration when the next utterance starts a new block", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadGndContent(twoParagraphTree);
  navigator.submitPreferences(new SpeechPreferences({ pauseDuration: 60, pauseScope: "block" }));

  const before = Date.now();
  engine.emit({ type: "end" });
  t.is(engine.speakCalls.length, 0, "speak() must not fire synchronously when a pause is configured");

  await new Promise((resolve) => setTimeout(resolve, 120));
  t.is(engine.speakCalls.length, 1);
  t.true(engine.speakCalls[0] - before >= 50);
});

test("prosody-only submitPreferences mid-playback does not reload the queue", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadGndContent(twoParagraphTree);
  engine.emit({ type: "ready" });
  navigator.play();

  engine.emit({ type: "end" }); // schedules a delayed speak()
  navigator.submitPreferences(new SpeechPreferences({ rate: 1.5 }));
  t.is(engine.stopCalls, 0);
  t.is(navigator.getState(), "playing");

  await new Promise((resolve) => setTimeout(resolve, 350));
  t.is(engine.speakCalls.length, 2, "the pre-existing timer still fires normally");
});

test("extraction-affecting submitPreferences mid-playback cancels speech and the pending timer", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadGndContent(twoParagraphTree);
  engine.emit({ type: "ready" });
  navigator.play();

  engine.emit({ type: "end" }); // schedules a delayed speak()
  navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  t.is(engine.stopCalls, 1);

  await new Promise((resolve) => setTimeout(resolve, 350));
  t.is(engine.speakCalls.length, 1, "no stale speak() from the pre-reload timer");
});

test("an extraction-affecting change mid-playback resumes at the same content, not index 0", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadGndContent(footnoteThenParagraphsTree);
  engine.emit({ type: "ready" });
  navigator.play();
  navigator.jumpTo(1, true); // "Second." under "few" (footnote skipped, indices 0/1)

  navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" })); // footnote no longer skipped, shifts indices
  engine.emit({ type: "ready" });

  t.is(navigator.getState(), "playing");
  const expectedIndex = navigator.getContentQueue().findIndex((u) => u.plain === "Second.");
  t.true(expectedIndex > 1, "the footnote now takes up earlier slots");
  t.is(engine.getCurrentUtteranceIndex(), expectedIndex);
});

test("an extraction-affecting change mid-pause resumes paused at the same content", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadGndContent(footnoteThenParagraphsTree);
  engine.emit({ type: "ready" });
  navigator.play();
  navigator.jumpTo(1, true);
  navigator.pause();

  navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  engine.emit({ type: "ready" });

  t.is(navigator.getState(), "paused");
  const expectedIndex = navigator.getContentQueue().findIndex((u) => u.plain === "Second.");
  t.is(engine.getCurrentUtteranceIndex(), expectedIndex);
});

test("resuming falls back to the nearest earlier node still present when the current one got skipped", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadGndContent(footnoteThenParagraphsTree);
  navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" })); // footnote included
  engine.emit({ type: "ready" });
  navigator.play();
  navigator.jumpTo(0, true); // the footnote's own utterance

  navigator.submitPreferences(new SpeechPreferences({ verbosity: "few" })); // footnote skipped again
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
