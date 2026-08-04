import test from "ava";
import { SpeechDefaults } from "../../src/preferences/SpeechDefaults.js";

test("defaults to the built-in literals when constructed with nothing", (t) => {
  const defaults = new SpeechDefaults();
  t.is(defaults.format, "plain");
  t.is(defaults.verbosity, "few");
  t.is(defaults.language, "always");
  t.is(defaults.pauseDuration, 300);
  t.is(defaults.pauseScope, "utterance");
  t.is(defaults.rate, 1);
  t.is(defaults.pitch, 1);
  t.is(defaults.volume, 1);
});

test("constructor copies given fields", (t) => {
  const defaults = new SpeechDefaults({ verbosity: "most", pauseDuration: 500, rate: 1.5 });
  t.is(defaults.verbosity, "most");
  t.is(defaults.pauseDuration, 500);
  t.is(defaults.rate, 1.5);
});

test("an out-of-range numeric default falls back to the literal default, not undefined", (t) => {
  const defaults = new SpeechDefaults({ rate: 999, pitch: -1, volume: 5 });
  t.is(defaults.rate, 1);
  t.is(defaults.pitch, 1);
  t.is(defaults.volume, 1);
});

test("an unsupported enum default falls back to the literal default", (t) => {
  const defaults = new SpeechDefaults({
    // @ts-expect-error deliberately invalid
    verbosity: "everything",
    // @ts-expect-error deliberately invalid
    format: "audio",
  });
  t.is(defaults.verbosity, "few");
  t.is(defaults.format, "plain");
});
