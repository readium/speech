import test from "ava";
import type { GndObject } from "../../src/gnd/types.js";
import { ReadiumSpeechNavigator, SpeechPreferences } from "../../build/index.js";
import { MockEngine } from "./mockEngine.js";

const chapterTree: GndObject[] = [{ role: ["chapter"], text: { language: "en", plain: "Hello world." } }];

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

test("settings/preferencesEditor reflect submitted preferences", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  t.is(navigator.settings.verbosity, "few");
  navigator.submitPreferences(new SpeechPreferences({ verbosity: "most" }));
  t.is(navigator.settings.verbosity, "most");
  t.is(navigator.preferencesEditor.verbosity.effectiveValue, "most");
});

test("automaticPausesBetweenUtterances delays the next speak() call by pauseDuration", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
  ]);
  navigator.submitPreferences(new SpeechPreferences({ automaticPausesBetweenUtterances: true, pauseDuration: 60 }));

  const before = Date.now();
  engine.emit({ type: "end" });
  t.is(engine.speakCalls.length, 0, "speak() must not fire synchronously when a pause is configured");

  await new Promise((resolve) => setTimeout(resolve, 120));
  t.is(engine.speakCalls.length, 1);
  t.true(engine.speakCalls[0] - before >= 50);
});

test("without automaticPausesBetweenUtterances, speak() fires immediately", (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine);
  navigator.loadContent([
    { plain: "First.", language: "en" },
    { plain: "Second.", language: "en" },
  ]);
  engine.emit({ type: "end" });
  t.is(engine.speakCalls.length, 1);
});
