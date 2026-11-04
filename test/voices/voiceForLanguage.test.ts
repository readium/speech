import test from "ava";
import { voiceForLanguage } from "../../src/voices/voiceForLanguage.js";

test("voiceForLanguage() matches the exact tag, else the base language, case-insensitively", (t) => {
  const voices = { en: "Alba", "en-GB": "Daniel" };

  t.is(voiceForLanguage(voices, "en-gb"), "Daniel");
  t.is(voiceForLanguage(voices, "en-US"), "Alba");
  t.is(voiceForLanguage(voices, "fr"), undefined);
});

test("voiceForLanguage() matches Chinese variants as voice languages, keeping them apart", (t) => {
  t.is(voiceForLanguage({ "yue-HK": "Sinji" }, "zh-HK"), "Sinji");
  t.is(voiceForLanguage({ "zh-HK": "Sinji" }, "yue-HK"), "Sinji");
  t.is(voiceForLanguage({ yue: "Sinji" }, "zh-HK"), "Sinji");
  t.is(voiceForLanguage({ yue: "Sinji" }, "zh-TW"), undefined, "Cantonese isn't Mandarin's");
  t.is(voiceForLanguage({ "zh-HK": "Sinji", zh: "Tingting" }, "zh-CN"), "Tingting");
});
