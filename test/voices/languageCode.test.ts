import test from "ava";
import { normalizeLanguageCode } from "../../src/voices/languageCode.js";

test("normalizeLanguageCode() maps Chinese variants whatever their script", (t) => {
  t.is(normalizeLanguageCode("zh-Hant-HK"), "yue-HK");
  t.is(normalizeLanguageCode("zh-Hant-TW"), "cmn-TW");
  t.is(normalizeLanguageCode("zh-Hans-CN"), "cmn-CN");
  t.is(normalizeLanguageCode("zh-Hant"), "cmn");
  t.is(normalizeLanguageCode("zh_hant_hk"), "yue-HK");
});
