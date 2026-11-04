import test from "ava";
import { SpeechDefaults } from "../../src/preferences/SpeechDefaults.js";
import { SpeechPreferences } from "../../src/preferences/SpeechPreferences.js";
import { SpeechSettings } from "../../src/preferences/SpeechSettings.js";
import { contextualizedAtVerbosity, skippedAtVerbosity } from "../../src/preferences/verbosityTables.js";

const defaults = new SpeechDefaults();

test("defaults to the few preset and the rest of SpeechDefaults", (t) => {
  const settings = new SpeechSettings(new SpeechPreferences(), defaults);
  t.is(settings.verbosity, "few");
  t.is(settings.format, "plain");
  t.deepEqual(settings.interruptions, {});
  t.is(settings.language, "block-level");
  t.is(settings.pauseDuration, 300);
  t.is(settings.autoPause, "none");
  t.is(settings.rate, 1);
  t.is(settings.pitch, 1);
  t.is(settings.volume, 1);
  t.deepEqual([...settings.skip].sort(), [...skippedAtVerbosity.few].sort());
  t.deepEqual([...settings.contextualize].sort(), [...contextualizedAtVerbosity.few].sort());
});

test("none resolves to no contextualized roles and the widest skip set", (t) => {
  const settings = new SpeechSettings(new SpeechPreferences({ verbosity: "none" }), defaults);
  t.deepEqual(settings.contextualize, []);
  t.deepEqual([...settings.skip].sort(), [...skippedAtVerbosity.none].sort());
});

test("most resolves to every catalog role contextualized", (t) => {
  const settings = new SpeechSettings(new SpeechPreferences({ verbosity: "most" }), defaults);
  t.deepEqual([...settings.contextualize].sort(), [...contextualizedAtVerbosity.most].sort());
  t.deepEqual([...settings.skip].sort(), [...skippedAtVerbosity.most].sort());
});

test("custom contributes nothing from the tables — skip/contextualize are the sole source", (t) => {
  const settings = new SpeechSettings(
    new SpeechPreferences({ verbosity: "custom", skip: ["toc"], contextualize: ["chapter"] }),
    defaults,
  );
  t.deepEqual(settings.skip, ["toc"]);
  t.deepEqual(settings.contextualize, ["chapter"]);
});

test("custom with nothing set skips and contextualizes nothing", (t) => {
  const settings = new SpeechSettings(new SpeechPreferences({ verbosity: "custom" }), defaults);
  t.deepEqual(settings.skip, []);
  t.deepEqual(settings.contextualize, []);
});

test("skip/contextualize are ignored under any non-custom preset", (t) => {
  const settings = new SpeechSettings(
    new SpeechPreferences({ verbosity: "few", skip: ["chapter"], contextualize: ["chapter"] }),
    defaults,
  );
  t.false(settings.skip.includes("chapter"));
  t.deepEqual([...settings.skip].sort(), [...skippedAtVerbosity.few].sort());
  t.false(settings.contextualize.includes("chapter"));
  t.deepEqual([...settings.contextualize].sort(), [...contextualizedAtVerbosity.few].sort());
});

test("a voice record keeps the defaults' voice for each tag it has none for", (t) => {
  const settings = new SpeechSettings(
    new SpeechPreferences({ voice: { fr: "amelie", "de-AT": "anna", en_us: "alex" } }),
    new SpeechDefaults({ voice: { "fr-CA": "chantal", "en-US": "samantha", de: "helena" } }),
  );
  t.deepEqual(settings.voice, { fr: "amelie", "de-AT": "anna", en_us: "alex", "fr-CA": "chantal", de: "helena" });
});

test("a voice record's tags replace the defaults' for the same voice language, e.g. zh-HK for yue-HK", (t) => {
  const settings = new SpeechSettings(
    new SpeechPreferences({ voice: { "zh-HK": "aasing" } }),
    new SpeechDefaults({ voice: { "yue-HK": "sinji", cmn: "tingting" } }),
  );
  t.deepEqual(settings.voice, { "zh-HK": "aasing", cmn: "tingting" });
});

test("a single voice replaces the defaults' voices", (t) => {
  const settings = new SpeechSettings(new SpeechPreferences({ voice: "amelie" }), new SpeechDefaults({ voice: { en: "samantha" } }));
  t.is(settings.voice, "amelie");
});

test("no voice, or an empty record, is the defaults' voice", (t) => {
  const voiceDefaults = new SpeechDefaults({ voice: { en: "samantha" } });
  t.deepEqual(new SpeechSettings(new SpeechPreferences(), voiceDefaults).voice, { en: "samantha" });
  t.deepEqual(new SpeechSettings(new SpeechPreferences({ voice: {} }), voiceDefaults).voice, { en: "samantha" });
});
