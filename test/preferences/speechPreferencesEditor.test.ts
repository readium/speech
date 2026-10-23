import test from "ava";
import { SpeechDefaults } from "../../src/preferences/SpeechDefaults.js";
import { SpeechPreferences } from "../../src/preferences/SpeechPreferences.js";
import { SpeechPreferencesEditor } from "../../src/preferences/SpeechPreferencesEditor.js";
import { SpeechSettings } from "../../src/preferences/SpeechSettings.js";

function makeEditor(preferences = new SpeechPreferences()) {
  const settings = new SpeechSettings(preferences, new SpeechDefaults());
  return new SpeechPreferencesEditor(preferences, settings);
}

test("verbosity: unset preference reports the effective default and isEffective false", (t) => {
  const editor = makeEditor();
  t.is(editor.verbosity.value, null);
  t.is(editor.verbosity.effectiveValue, "few");
  t.false(editor.verbosity.isEffective);
  t.deepEqual(editor.verbosity.supportedValues, ["none", "few", "some", "most", "custom"]);
});

test("verbosity: an explicit preference is effective and matches the resolved settings", (t) => {
  const editor = makeEditor(new SpeechPreferences({ verbosity: "most" }));
  t.is(editor.verbosity.value, "most");
  t.is(editor.verbosity.effectiveValue, "most");
  t.true(editor.verbosity.isEffective);
});

test("setting a preference through the editor mutates its own preferences object", (t) => {
  const editor = makeEditor();
  editor.verbosity.value = "most";
  t.is(editor.preferences.verbosity, "most");
});

test("verbosity.value rejects a value outside supportedValues", (t) => {
  const editor = makeEditor();
  t.throws(() => {
    // @ts-expect-error deliberately invalid
    editor.verbosity.value = "everything";
  });
});

test("pauseDuration is a range preference with the expected bounds", (t) => {
  const editor = makeEditor();
  t.deepEqual(editor.pauseDuration.supportedRange, [0, 5000]);
  t.is(editor.pauseDuration.step, 100);
  t.is(editor.pauseDuration.effectiveValue, 300);
});

test("autoPause: unset preference reports the effective default and isEffective false", (t) => {
  const editor = makeEditor();
  t.is(editor.autoPause.value, null);
  t.is(editor.autoPause.effectiveValue, "none");
  t.false(editor.autoPause.isEffective);
  t.deepEqual(editor.autoPause.supportedValues, ["none", "utterance", "block"]);
});

test("autoPause: an explicit preference is effective and matches the resolved settings", (t) => {
  const editor = makeEditor(new SpeechPreferences({ autoPause: "block" }));
  t.is(editor.autoPause.value, "block");
  t.is(editor.autoPause.effectiveValue, "block");
  t.true(editor.autoPause.isEffective);
});

test("reconstruct: unset preference reports the false default and isEffective false", (t) => {
  const editor = makeEditor();
  t.is(editor.reconstruct.value, null);
  t.false(editor.reconstruct.effectiveValue);
  t.false(editor.reconstruct.isEffective);
});

test("reconstruct: an explicit preference is effective only with sentence segmentation", (t) => {
  t.false(makeEditor(new SpeechPreferences({ reconstruct: true })).reconstruct.isEffective);
  t.false(makeEditor(new SpeechPreferences({ reconstruct: true, segmentation: "structure" })).reconstruct.isEffective);
  t.true(makeEditor(new SpeechPreferences({ reconstruct: true, segmentation: "sentence" })).reconstruct.isEffective);
});

test("reconstruct: setting it stages the preference, a non-boolean throws", (t) => {
  const editor = makeEditor();
  editor.reconstruct.value = true;
  t.true(editor.preferences.reconstruct);
  // @ts-expect-error deliberately invalid
  t.throws(() => { editor.reconstruct.value = "yes"; });
});

test("clear() resets preferences to explicit nulls, not undefined", (t) => {
  const editor = makeEditor(new SpeechPreferences({ verbosity: "most", pauseDuration: 500 }));
  editor.clear();
  t.is(editor.preferences.verbosity, null);
  t.is(editor.preferences.pauseDuration, null);
});

test("languageOverrides: an explicit preference is effective and matches the resolved settings", (t) => {
  const editor = makeEditor(new SpeechPreferences({ languageOverrides: { en: "fr" } }));
  t.deepEqual(editor.languageOverrides.value, { en: "fr" });
  t.deepEqual(editor.languageOverrides.effectiveValue, { en: "fr" });
  t.true(editor.languageOverrides.isEffective);
  editor.languageOverrides.value = { en: "de" };
  t.deepEqual(editor.preferences.languageOverrides, { en: "de" });
});

test("voice: unset preference has no effective voice, a set one is effective", (t) => {
  t.is(makeEditor(new SpeechPreferences()).voice.effectiveValue, null);
  const editor = makeEditor(new SpeechPreferences({ voice: { fr: "Thomas" } }));
  t.deepEqual(editor.voice.effectiveValue, { fr: "Thomas" });
  t.true(editor.voice.isEffective);
});

test("clear() actually resets preferences submitted through submitPreferences()", (t) => {
  const initial = new SpeechPreferences({ verbosity: "most", pauseDuration: 500 });
  const editor = makeEditor(initial);
  editor.clear();
  // Mirrors what ReadiumSpeechNavigator.submitPreferences() does internally —
  // undefined-only clears would be silently swallowed by merging() here.
  const merged = initial.merging(editor.preferences);
  t.is(merged.verbosity, null);
  t.is(merged.pauseDuration, null);
});

test("rate is a range preference with the expected bounds", (t) => {
  const editor = makeEditor();
  t.deepEqual(editor.rate.supportedRange, [0.1, 10]);
  t.is(editor.rate.step, 0.1);
  t.is(editor.rate.effectiveValue, 1);
});

test("pitch is a range preference with the expected bounds", (t) => {
  const editor = makeEditor();
  t.deepEqual(editor.pitch.supportedRange, [0, 2]);
  t.is(editor.pitch.step, 0.1);
  t.is(editor.pitch.effectiveValue, 1);
});

test("volume is a range preference with the expected bounds", (t) => {
  const editor = makeEditor();
  t.deepEqual(editor.volume.supportedRange, [0, 1]);
  t.is(editor.volume.step, 0.05);
  t.is(editor.volume.effectiveValue, 1);
});

test("editing an array or record preference in place leaves the navigator's preferences untouched", (t) => {
  const preferences = new SpeechPreferences({ skip: ["pagebreak"], languageOverrides: { en: "en-GB" }, voice: { fr: "Amélie" } });
  const editor = makeEditor(preferences);
  editor.preferences.skip!.push("footnote");
  editor.preferences.languageOverrides!.fr = "fr-CA";
  (editor.preferences.voice as Record<string, string>).en = "Daniel";
  t.deepEqual(preferences.skip, ["pagebreak"]);
  t.deepEqual(preferences.languageOverrides, { en: "en-GB" });
  t.deepEqual(preferences.voice, { fr: "Amélie" });
});
