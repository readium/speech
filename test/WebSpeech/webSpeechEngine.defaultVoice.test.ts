import test from "ava";
import { WebSpeechEngine, WebSpeechVoiceManager } from "../../build/index.js";
import { setGlobals, mockVoices, resetVoiceManager } from "./testUtils.js";

test.beforeEach(() => {
  resetVoiceManager();
  setGlobals(mockVoices);
});

test.afterEach.always(() => {
  resetVoiceManager();
});

test.serial("initialize() picks the default voice for the first of its languages with voices", async (t) => {
  const engine = new WebSpeechEngine();
  await engine.initialize({ languages: ["de", "fr", "en"] });

  t.is(engine.getCurrentVoice()?.name, "French Voice");
});

test.serial("concurrent initialize() calls share the first one's", async (t) => {
  const initialize = WebSpeechVoiceManager.initialize;
  let managerCalls = 0;
  (WebSpeechVoiceManager as any).initialize = (...args: any[]) => {
    managerCalls++;
    return initialize.apply(WebSpeechVoiceManager, args as any);
  };
  t.teardown(() => {
    (WebSpeechVoiceManager as any).initialize = initialize;
  });
  const engine = new WebSpeechEngine();
  const scoped = engine.initialize({ languages: ["fr"] });
  const unscoped = engine.initialize();

  t.true(await scoped);
  t.true(await unscoped);
  t.is(managerCalls, 1, "the second call waits for the first instead of loading again");
  t.is(engine.getCurrentVoice()?.name, "French Voice");
  t.false((await engine.getAvailableVoices()).some((voice: any) => voice.language === "en-US"), "scoped to the first call's languages");
});
