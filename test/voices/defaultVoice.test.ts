import test from "ava";
import { pickDefaultVoice, pickLanguageVoice, ReadiumSpeechVoice } from "../../build/index.js";

const voice = (name: string, language: string, overrides: Partial<ReadiumSpeechVoice> = {}): ReadiumSpeechVoice => ({
  source: "json", label: name, name, originalName: name, language, voiceURI: `${name}-${language}`, ...overrides,
}) as ReadiumSpeechVoice;

test("pickLanguageVoice() picks in the content's region, else the JSON's default region", async (t) => {
  const voices = [voice("Celine", "fr-CA"), voice("Lea", "fr-FR"), voice("Alba", "en-US")];

  t.is((await pickLanguageVoice("fr-CA", voices))?.name, "Celine");
  t.is((await pickLanguageVoice("fr", voices))?.name, "Lea");
  t.is((await pickLanguageVoice("fr-BE", voices))?.name, "Lea", "no fr-BE voice: the default region's");
});

test("pickLanguageVoice() prefers the boundary support asked for, else any", async (t) => {
  const voices = [voice("Amelie", "fr-FR", { controls: { boundary: false } }), voice("Lea", "fr-FR")];

  t.is((await pickLanguageVoice("fr", voices))?.name, "Lea");
  t.is((await pickLanguageVoice("fr", voices, false))?.name, "Amelie");
  t.is((await pickLanguageVoice("fr", [voices[0]]))?.name, "Amelie", "without one with boundary events");
});

test("pickLanguageVoice() is null without a voice of the language, novelty ones left out", async (t) => {
  t.is(await pickLanguageVoice("de", [voice("Alba", "en-US")]), null);
  t.is(await pickLanguageVoice("en", [voice("Alba", "en-US", { isNovelty: true })]), null);
});

test("pickDefaultVoice() picks for the first of its languages with a voice", async (t) => {
  const voices = [voice("Alba", "en-US"), voice("Lea", "fr-FR")];

  t.is((await pickDefaultVoice(["de", "fr", "en"], voices))?.name, "Lea");
});
