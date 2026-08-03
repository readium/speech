import test from "ava";
import type { GndObject } from "../../src/gnd/types.js";
import { ReadiumSpeechNavigator, SpeechPreferences } from "../../build/index.js";
import { MockEngine } from "./mockEngine.js";

const chapterTree: GndObject[] = [{ role: ["chapter"], text: { language: "en", plain: "Hello world." } }];

test("loadGndContent extracts with the default (few) verbosity", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadGndContent(chapterTree);
  t.deepEqual(navigator.getContentQueue(), [{ language: "en", plain: "Hello world.", startsNewBlock: true }]);
});

test("submitPreferences re-extracts content loaded via loadGndContent", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadGndContent(chapterTree);
  navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  t.deepEqual(navigator.getContentQueue(), [
    { plain: "Start of the chapter.", startsNewBlock: true },
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

test("settings/preferencesEditor reflect submitted preferences", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  t.is(navigator.settings.verbosity, "few");
  navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  t.is(navigator.settings.verbosity, "most");
  t.is(navigator.preferencesEditor.verbosity.effectiveValue, "most");
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
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "New paragraph.", language: "en", startsNewBlock: true },
  ]);
  navigator.submitPreferences(new SpeechPreferences({ pauseDuration: 60, pauseScope: "block" }));

  const before = Date.now();
  engine.emit({ type: "end" });
  t.is(engine.speakCalls.length, 0, "speak() must not fire synchronously when a pause is configured");

  await new Promise((resolve) => setTimeout(resolve, 120));
  t.is(engine.speakCalls.length, 1);
  t.true(engine.speakCalls[0] - before >= 50);
});
