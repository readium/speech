import test from "ava";
import { SpeechPreferences } from "../../src/preferences/SpeechPreferences.js";

test("defaults to every field undefined", (t) => {
  const prefs = new SpeechPreferences();
  t.is(prefs.verbosity, undefined);
  t.is(prefs.skip, undefined);
  t.is(prefs.contextualize, undefined);
  t.is(prefs.format, undefined);
  t.is(prefs.pauseDuration, undefined);
  t.is(prefs.rate, undefined);
  t.is(prefs.pitch, undefined);
  t.is(prefs.volume, undefined);
});

test("constructor copies given fields", (t) => {
  const prefs = new SpeechPreferences({ verbosity: "most", skip: ["toc"], pauseDuration: 500, rate: 1.5, pitch: 0.8, volume: 0.5 });
  t.is(prefs.verbosity, "most");
  t.deepEqual(prefs.skip, ["toc"]);
  t.is(prefs.pauseDuration, 500);
  t.is(prefs.rate, 1.5);
  t.is(prefs.pitch, 0.8);
  t.is(prefs.volume, 0.5);
});

test("merging overrides only fields explicitly set on the other", (t) => {
  const base = new SpeechPreferences({ verbosity: "few", pauseDuration: 300 });
  const merged = base.merging(new SpeechPreferences({ verbosity: "most" }));
  t.is(merged.verbosity, "most");
  t.is(merged.pauseDuration, 300);
});

test("merging with an unset field leaves the base value untouched", (t) => {
  const base = new SpeechPreferences({ verbosity: "few", contextualize: ["chapter"] });
  const merged = base.merging(new SpeechPreferences({ pauseDuration: 500 }));
  t.is(merged.verbosity, "few");
  t.deepEqual(merged.contextualize, ["chapter"]);
  t.is(merged.pauseDuration, 500);
});

test("merging returns a new instance, not a mutation of the base", (t) => {
  const base = new SpeechPreferences({ verbosity: "few" });
  const merged = base.merging(new SpeechPreferences({ verbosity: "most" }));
  t.is(base.verbosity, "few");
  t.not(merged, base);
});

test("an out-of-range numeric value is dropped to undefined, not silently accepted", (t) => {
  const prefs = new SpeechPreferences({ rate: 20, pitch: -1, volume: 1.5, pauseDuration: -100 });
  t.is(prefs.rate, undefined);
  t.is(prefs.pitch, undefined);
  t.is(prefs.volume, undefined);
  t.is(prefs.pauseDuration, undefined);
});

test("a value at the exact edge of a range is kept", (t) => {
  const prefs = new SpeechPreferences({ rate: 10, pitch: 0, volume: 1 });
  t.is(prefs.rate, 10);
  t.is(prefs.pitch, 0);
  t.is(prefs.volume, 1);
});

test("an unsupported enum value is dropped to undefined", (t) => {
  const prefs = new SpeechPreferences({
    // @ts-expect-error deliberately invalid
    verbosity: "everything",
    // @ts-expect-error deliberately invalid
    autoPause: "sentence",
    // @ts-expect-error deliberately invalid
    format: "audio",
    // @ts-expect-error deliberately invalid
    language: "sometimes",
  });
  t.is(prefs.verbosity, undefined);
  t.is(prefs.autoPause, undefined);
  t.is(prefs.format, undefined);
  t.is(prefs.language, undefined);
});

test("a non-boolean value for a boolean field is dropped to undefined", (t) => {
  const prefs = new SpeechPreferences({
    // @ts-expect-error deliberately invalid
    inlineContextualization: "yes",
  });
  t.is(prefs.inlineContextualization, undefined);
});

test("explicit null is preserved (not coerced to undefined) for guarded fields", (t) => {
  const prefs = new SpeechPreferences({ rate: null, verbosity: null, inlineContextualization: null });
  t.is(prefs.rate, null);
  t.is(prefs.verbosity, null);
  t.is(prefs.inlineContextualization, null);
});
