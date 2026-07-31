import test from "ava";
import { SpeechPreferences } from "../../src/preferences/SpeechPreferences.js";

test("defaults to every field undefined", (t) => {
  const prefs = new SpeechPreferences();
  t.is(prefs.verbosity, undefined);
  t.is(prefs.skip, undefined);
  t.is(prefs.contextualize, undefined);
  t.is(prefs.format, undefined);
  t.is(prefs.pauseDuration, undefined);
});

test("constructor copies given fields", (t) => {
  const prefs = new SpeechPreferences({ verbosity: "most", skip: ["toc"], pauseDuration: 500 });
  t.is(prefs.verbosity, "most");
  t.deepEqual(prefs.skip, ["toc"]);
  t.is(prefs.pauseDuration, 500);
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
