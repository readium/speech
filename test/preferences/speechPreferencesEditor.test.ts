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

test("pauseScope: unset preference reports the effective default and isEffective false", (t) => {
  const editor = makeEditor();
  t.is(editor.pauseScope.value, null);
  t.is(editor.pauseScope.effectiveValue, "utterance");
  t.false(editor.pauseScope.isEffective);
  t.deepEqual(editor.pauseScope.supportedValues, ["utterance", "block"]);
});

test("pauseScope: an explicit preference is effective and matches the resolved settings", (t) => {
  const editor = makeEditor(new SpeechPreferences({ pauseScope: "block" }));
  t.is(editor.pauseScope.value, "block");
  t.is(editor.pauseScope.effectiveValue, "block");
  t.true(editor.pauseScope.isEffective);
});

test("clear() resets preferences to an empty SpeechPreferences", (t) => {
  const editor = makeEditor(new SpeechPreferences({ verbosity: "most", pauseDuration: 500 }));
  editor.clear();
  t.is(editor.preferences.verbosity, undefined);
  t.is(editor.preferences.pauseDuration, undefined);
});

test("automaticPausesAtPageOrSpreadEnd is a plain, settable preference", (t) => {
  const editor = makeEditor();
  t.false(editor.automaticPausesAtPageOrSpreadEnd.isEffective);
  editor.automaticPausesAtPageOrSpreadEnd.value = true;
  t.is(editor.preferences.automaticPausesAtPageOrSpreadEnd, true);
});
