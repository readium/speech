import test from "ava";
import "./setup.js";
import { WebSpeechVoiceManager } from "../../build/index.js";

// =============================================
// Test Hooks
// =============================================
// Unlike the other WebSpeechVoiceManager test files, most tests here need the
// singleton to persist ACROSS multiple initialize() calls within a single test
// (that's what's being tested), so we only reset it before each test, not
// re-initialize it.

test.beforeEach(() => {
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;
});

test.afterEach.always(() => {
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;
});

// =============================================
// Tests
// =============================================

test("initialize: a second call with new languages broadens the singleton, keeping earlier voices", async (t) => {
  const manager1 = await WebSpeechVoiceManager.initialize({ languages: ["en-US"] });
  const enVoices = manager1.getVoices();
  t.true(enVoices.length > 0);
  t.true(enVoices.every((v: any) => v.language.toLowerCase().startsWith("en")));

  const manager2 = await WebSpeechVoiceManager.initialize({ languages: ["fr-FR"] });
  t.is(manager1, manager2, "broadening returns the same singleton instance");

  const voices = manager2.getVoices();
  t.true(voices.some((v: any) => v.language.toLowerCase().startsWith("en")), "earlier language's voices are kept");
  t.true(voices.some((v: any) => v.language.toLowerCase().startsWith("fr")), "newly requested language is added");
});

test("initialize: re-requesting an already-covered language is a no-op", async (t) => {
  await WebSpeechVoiceManager.initialize({ languages: ["en-US"] });
  const manager = await WebSpeechVoiceManager.initialize({ languages: ["en-US"] });
  const before = manager.getVoices();

  const again = await WebSpeechVoiceManager.initialize({ languages: ["en-US"] });
  const after = again.getVoices();

  t.is(before.length, after.length);
  t.deepEqual(before.map((v: any) => v.voiceURI).sort(), after.map((v: any) => v.voiceURI).sort());
});

test("initialize: no languages after a full/unscoped init does not narrow the voice list", async (t) => {
  const manager = await WebSpeechVoiceManager.initialize();
  const fullCount = manager.getVoices().length;

  const again = await WebSpeechVoiceManager.initialize({ languages: ["en-US"] });
  t.is(again.getVoices().length, fullCount, "an already-unscoped instance stays unscoped");
});

test("initialize: languages after a full/unscoped init is a no-op, not a narrow", async (t) => {
  await WebSpeechVoiceManager.initialize();
  const manager = await WebSpeechVoiceManager.initialize({ languages: ["en-US"] });
  const withLangs = manager.getVoices().length;

  const noLangs = await WebSpeechVoiceManager.initialize();
  t.is(noLangs.getVoices().length, withLangs, "omitting languages on a later call is a no-op, not a broaden-to-everything");
});

test("initialize: concurrent broaden calls for different languages don't duplicate voices", async (t) => {
  await WebSpeechVoiceManager.initialize({ languages: ["en-US"] });

  const [m1, m2] = await Promise.all([
    WebSpeechVoiceManager.initialize({ languages: ["fr-FR"] }),
    WebSpeechVoiceManager.initialize({ languages: ["es-ES"] })
  ]);

  t.is(m1, m2);
  const voices = m1.getVoices();
  const uris = voices.map((v: any) => v.voiceURI);
  t.is(uris.length, new Set(uris).size, "no duplicate voices from concurrent broaden calls");
  t.true(voices.some((v: any) => v.language.toLowerCase().startsWith("en")));
  t.true(voices.some((v: any) => v.language.toLowerCase().startsWith("fr")));
  t.true(voices.some((v: any) => v.language.toLowerCase().startsWith("es")));
});
