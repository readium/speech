import test from "ava";
import { WebSpeechEngine, WebSpeechVoiceManager } from "../../build/index.js";

class MockUtterance {
  voice: any = null;
  lang = "";
  rate = 1;
  pitch = 1;
  volume = 1;
  onstart: (() => void) | null = null;
  onend: (() => void) | null = null;
  onerror: ((event: any) => void) | null = null;
  onpause: (() => void) | null = null;
  onresume: (() => void) | null = null;
  onboundary: ((event: any) => void) | null = null;
  onmark: ((event: any) => void) | null = null;
  constructor(public text: string) {}
}

interface MockSynth {
  spoken: MockUtterance[];
  calls: string[];
}

function setWebSpeechGlobals(): MockSynth {
  if (typeof (globalThis as any).window === "undefined") {
    (globalThis as any).window = globalThis;
  }
  const synth: MockSynth = { spoken: [], calls: [] };
  (globalThis as any).window.SpeechSynthesisUtterance = MockUtterance;
  (globalThis as any).window.speechSynthesis = {
    speaking: false,
    paused: false,
    onvoiceschanged: null,
    getVoices: () => [],
    speak: (u: MockUtterance) => { synth.calls.push("speak"); synth.spoken.push(u); },
    cancel: () => { synth.calls.push("cancel"); },
    pause: () => { synth.calls.push("pause"); },
    resume: () => { synth.calls.push("resume"); },
    addEventListener: () => {},
    removeEventListener: () => {}
  };
  return synth;
}

const flush = () => new Promise<void>(resolve => setTimeout(resolve, 0));
// Past the delay Safari is given to settle a cancel before speaking again.
const settle = () => new Promise<void>(resolve => setTimeout(resolve, 300));

function makeVoice(name: string) {
  return { source: "json", label: name, name, originalName: name, language: "en-US", identifier: name } as any;
}

async function speakThenPause(engine: WebSpeechEngine, synth: MockSynth) {
  engine.loadUtterances([{ plain: "First." }, { plain: "Second." }], 1);
  engine.speak();
  await flush();
  engine.pause();
  synth.calls.length = 0;
}

test.serial("resume without a parameter change while paused resumes natively", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  await speakThenPause(engine, synth);

  engine.resume();
  await flush();

  t.deepEqual(synth.calls, ["resume"]);
});

test.serial("setRate while paused restarts the paused utterance with the new rate on resume", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  await speakThenPause(engine, synth);

  engine.setRate(2);
  await flush();
  t.deepEqual(synth.calls, [], "paused — no restart yet");

  engine.resume();
  await flush();

  t.false(synth.calls.includes("resume"), "the native utterance with the old rate is not resumed");
  const last = synth.spoken[synth.spoken.length - 1];
  t.is(last.text, "Second.");
  t.is(last.rate, 2);
});

test.serial("setRate then pause in the same tick applies the new rate on resume", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  engine.loadUtterances([{ plain: "First." }, { plain: "Second." }], 1);
  engine.speak();
  await flush();
  synth.calls.length = 0;

  engine.setRate(2);
  engine.pause();
  await flush();
  t.deepEqual(synth.calls, ["pause"], "paused — no restart yet");

  engine.resume();
  await flush();

  t.false(synth.calls.includes("resume"), "the native utterance with the old rate is not resumed");
  const last = synth.spoken[synth.spoken.length - 1];
  t.is(last.text, "Second.");
  t.is(last.rate, 2);
});

test.serial("setPitch and setVolume while paused apply on resume", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  await speakThenPause(engine, synth);

  engine.setPitch(1.5);
  engine.setVolume(0.5);
  engine.resume();
  await flush();

  const last = synth.spoken[synth.spoken.length - 1];
  t.is(last.pitch, 1.5);
  t.is(last.volume, 0.5);
});

test.serial("setVoice while paused applies on resume and keeps the current position", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  await engine.setVoice(makeVoice("A"));
  await speakThenPause(engine, synth);

  await engine.setVoice(makeVoice("B"));
  t.is(engine.getCurrentUtteranceIndex(), 1);

  engine.resume();
  await flush();

  t.false(synth.calls.includes("resume"));
  t.is(synth.spoken[synth.spoken.length - 1].text, "Second.");
});

test.serial("setVoice while paused to another voice of the same name restarts with it on resume", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  await engine.setVoice({ ...makeVoice("A"), voiceURI: "A-1" });
  await speakThenPause(engine, synth);

  await engine.setVoice({ ...makeVoice("A"), voiceURI: "A-2" });
  engine.resume();
  await flush();

  t.false(synth.calls.includes("resume"), "the native utterance with the old voice is not resumed");
  t.is(synth.spoken[synth.spoken.length - 1].text, "Second.");
});

test.serial("resume right after an unawaited cross-language setVoice while paused restarts with the new voice", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  await engine.setVoice(makeVoice("A"));
  await speakThenPause(engine, synth);
  (engine as any).defaultVoice = makeVoice("A");
  (engine as any).voiceManager = {
    getVoices: () => [],
    getDefaultVoice: () => new Promise(() => {}),
    convertToSpeechSynthesisVoice: (voice: any) => ({ name: voice.name, lang: voice.language }),
  };

  void engine.setVoice({ ...makeVoice("B"), language: "fr-FR" });
  engine.resume();
  await flush();

  t.false(synth.calls.includes("resume"), "the native utterance with the old voice is not resumed");
  const last = synth.spoken[synth.spoken.length - 1];
  t.is(last.text, "Second.");
  t.is(last.voice?.name, "B");
});

test.serial("setRate while playing restarts the current utterance with the new rate", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  engine.loadUtterances([{ plain: "First." }]);
  engine.speak();
  await flush();
  const before = synth.spoken.length;

  engine.setRate(2);
  await flush();

  t.is(synth.spoken.length, before + 1);
  t.is(synth.spoken[synth.spoken.length - 1].rate, 2);
});

test.serial("late events from an utterance replaced by a restart are ignored", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  engine.loadUtterances([{ plain: "First." }, { plain: "Second." }]);
  engine.speak();
  await flush();
  const replaced = synth.spoken[synth.spoken.length - 1];
  replaced.onstart?.();

  engine.setRate(2);
  await flush();
  const events: string[] = [];
  for (const type of ["stop", "end", "error"] as const) engine.on(type, () => events.push(type));

  replaced.onerror?.({ error: "interrupted" });
  replaced.onend?.();

  t.is(engine.getState(), "playing");
  t.deepEqual(events, []);
});

async function speakingEngine(isSafari: boolean) {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  (engine as any).patches = { ...(engine as any).patches, isSafari };
  engine.loadUtterances([{ plain: "First." }, { plain: "Second." }]);
  engine.speak();
  await flush();
  (globalThis as any).window.speechSynthesis.speaking = true;
  return { synth, engine };
}

// setCurrentUtteranceIndex() while an utterance plays stops it. The engine then sends "idle" and "stop", after the move and
// before onComplete, so a "stop" listener sees the new index and can speak(). The browser reports the cancel too, with an
// "interrupted" error: Safari within cancel(), before the move; other browsers later. That report must change nothing.
// speakingEngine() plays "First.", followed by "Second.".

for (const isSafari of [false, true]) {
  const browser = isSafari ? "in Safari" : "in other browsers";
  // The browser's report of the cancel, as each browser sends it
  const reportCancelLikeTheBrowser = (synth: MockSynth) => {
    const cancelled = synth.spoken[synth.spoken.length - 1];
    if (isSafari) (globalThis as any).window.speechSynthesis.cancel = () => cancelled.onerror?.({ error: "interrupted" });
    return () => {
      if (!isSafari) cancelled.onerror?.({ error: "interrupted" });
    };
  };

  test.serial(`${browser}: setCurrentUtteranceIndex() while one plays sends "idle" and "stop" at the new index, then onComplete`, async (t) => {
    const { synth, engine } = await speakingEngine(isSafari);
    const reportLater = reportCancelLikeTheBrowser(synth);
    const events: string[] = [];
    for (const type of ["idle", "stop", "end", "error"] as const) engine.on(type, () => events.push(`${type} at ${engine.getCurrentUtteranceIndex()}`));

    engine.setCurrentUtteranceIndex(1, () => events.push("onComplete"));
    reportLater();

    t.deepEqual(events, ["idle at 1", "stop at 1", "onComplete"], "once each, the browser's report adding nothing");
    t.is(engine.getState(), "idle");
    const spoken = synth.spoken.length;
    await settle();
    t.is(synth.spoken.length, spoken, "nothing is spoken");
  });

  test.serial(`${browser}: a "stop" listener can speak() another utterance: the move that sent the "stop" doesn't undo it`, async (t) => {
    const { synth, engine } = await speakingEngine(isSafari);
    const reportLater = reportCancelLikeTheBrowser(synth);
    engine.on("stop", () => engine.speak(0));
    const spoken = synth.spoken.length;

    engine.setCurrentUtteranceIndex(1); // stops "First."
    reportLater();
    await settle();

    t.is(engine.getCurrentUtteranceIndex(), 0, "not moved back to \"Second.\"");
    t.is(engine.getState(), "playing");
    t.deepEqual(synth.spoken.slice(spoken).map(utterance => utterance.text), ["First."], "spoken again by the listener");
  });
}

test.serial("in Safari: setCurrentUtteranceIndex() right after speak() keeps that utterance from being spoken", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  engine.speak(1); // Safari waits for the cancel of "First." to settle before it speaks "Second."
  const spoken = synth.spoken.length;

  engine.setCurrentUtteranceIndex(0);
  await settle();

  t.is(synth.spoken.length, spoken, "\"Second.\" is never spoken");
  t.is(engine.getState(), "idle");
});

test.serial("setCurrentUtteranceIndex() after stop(): no second \"stop\"", async (t) => {
  const { engine } = await speakingEngine(false);
  engine.stop();
  const events: string[] = [];
  for (const type of ["idle", "stop"] as const) engine.on(type, () => events.push(type));

  engine.setCurrentUtteranceIndex(1);

  t.deepEqual(events, [], "nothing was playing");
});

test.serial("setCurrentUtteranceIndex() while paused: no \"stop\"", async (t) => {
  const { engine } = await speakingEngine(false);
  engine.pause();
  const events: string[] = [];
  for (const type of ["idle", "stop"] as const) engine.on(type, () => events.push(type));

  engine.setCurrentUtteranceIndex(1);

  t.deepEqual(events, []);
  t.is(engine.getCurrentUtteranceIndex(), 1);
});

test.serial("in Safari, a restart speaks the utterance again once the cancel settled", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  const before = synth.spoken.length;

  engine.setRate(2);
  await flush();
  t.is(synth.spoken.length, before, "not spoken before the cancel settled");

  await settle();
  t.is(synth.spoken.length, before + 1);
  t.is(synth.spoken[synth.spoken.length - 1].rate, 2);
});

test.serial("in Safari, a restart superseded before the next task isn't spoken", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  const before = synth.spoken.length;

  engine.setRate(2);
  await flush();
  engine.stop();
  await flush();

  t.is(synth.spoken.length, before);
});

test.serial("in Safari, a restart Safari ends without starting is spoken once more instead of emitting end", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  let ends = 0;
  engine.on("end", () => { ends++; });

  engine.setRate(2);
  await settle();
  const restarted = synth.spoken.length;
  synth.spoken[restarted - 1].onend?.();
  await flush();

  t.is(ends, 0);
  t.is(synth.spoken.length, restarted + 1);
});

test.serial("in Safari, a retried restart that ends without starting again emits end", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  let ends = 0;
  engine.on("end", () => { ends++; });

  engine.setRate(2);
  await settle();
  synth.spoken[synth.spoken.length - 1].onend?.();
  await flush();
  const retried = synth.spoken.length;
  synth.spoken[retried - 1].onend?.();
  await flush();

  t.is(ends, 1);
  t.is(synth.spoken.length, retried);
});

test.serial("in Safari, a restart Safari ends without starting while paused emits no end, and resuming speaks it", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  let ends = 0;
  engine.on("end", () => { ends++; });

  engine.setRate(2);
  await settle();
  const restarted = synth.spoken.length;
  engine.pause();
  synth.spoken[restarted - 1].onend?.();
  await flush();

  t.is(ends, 0);
  t.is(synth.spoken.length, restarted, "not spoken while paused");

  engine.resume();
  await settle();
  t.is(synth.spoken.length, restarted + 1);
  t.is(synth.spoken[synth.spoken.length - 1].text, "First.");
});

test.serial("in Safari, a retried restart Safari ends without starting while paused emits no end either", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  let ends = 0;
  engine.on("end", () => { ends++; });

  engine.setRate(2);
  await settle();
  synth.spoken[synth.spoken.length - 1].onend?.();
  await flush();
  const retried = synth.spoken.length;
  engine.pause();
  synth.spoken[retried - 1].onend?.();
  await flush();

  t.is(ends, 0);
  engine.resume();
  await settle();
  t.is(synth.spoken[synth.spoken.length - 1].text, "First.");
});

test.serial("in Safari, a restart paused before it is spoken isn't spoken, and resuming speaks it", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  const before = synth.spoken.length;

  engine.setRate(2);
  await flush();
  engine.pause();
  await settle();
  t.is(synth.spoken.length, before, "not spoken while paused");

  engine.resume();
  await settle();
  t.is(synth.spoken.length, before + 1);
  t.is(synth.spoken[synth.spoken.length - 1].rate, 2);
});

test.serial("in Safari, a restart isn't spoken once other content was loaded before it was", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  const before = synth.spoken.length;

  engine.setRate(2);
  await flush();
  engine.loadUtterances([{ plain: "Other." }]);
  await settle();

  t.is(synth.spoken.length, before);
  t.is(engine.getState(), "ready");
});

test.serial("in Safari, a restart that started then ends emits end", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  let ends = 0;
  engine.on("end", () => { ends++; });

  engine.setRate(2);
  await settle();
  const restarted = synth.spoken[synth.spoken.length - 1];
  restarted.onstart?.();
  restarted.onend?.();
  await flush();

  t.is(ends, 1);
});

test.serial("in Safari, a restart superseded by a stop and a new queue emits no end", async (t) => {
  const { engine } = await speakingEngine(true);
  let ends = 0;
  engine.on("end", () => { ends++; });

  engine.setRate(2);
  await drainMicrotasks();
  engine.stop();
  engine.loadUtterances([]);
  await flush();

  t.is(ends, 0);
  t.is(engine.getState(), "ready");
});

test.serial("outside Safari, a restart speaks the utterance again right away", async (t) => {
  const { synth, engine } = await speakingEngine(false);
  const before = synth.spoken.length;

  engine.setRate(2);
  await flush();

  t.is(synth.spoken.length, before + 1);
});

// Runs what's left of the current task, without reaching the next one.
const drainMicrotasks = async () => { for (let i = 0; i < 50; i++) await Promise.resolve(); };

// Like Safari, cancel() stops speaking at once, so speak() after stop() finds nothing speaking.
const cancelStopsSpeaking = () => {
  const speechSynthesis = (globalThis as any).window.speechSynthesis;
  const cancel = speechSynthesis.cancel;
  speechSynthesis.cancel = () => { cancel(); speechSynthesis.speaking = false; };
};

test.serial("in Safari, speaking in the task that stopped speech waits for the cancel to settle", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  cancelStopsSpeaking();
  const before = synth.spoken.length;

  engine.stop();
  engine.speak(1);
  await flush();
  t.is(synth.spoken.length, before, "not spoken before the cancel settled");

  await settle();
  t.is(synth.spoken.length, before + 1);
});

test.serial("in Safari, a second restart before the first cancel settled waits for it too", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  cancelStopsSpeaking();
  const before = synth.spoken.length;

  engine.setRate(2);
  await flush();
  engine.setRate(3);
  await flush();
  t.is(synth.spoken.length, before, "not spoken before the first cancel settled");

  await settle();
  t.is(synth.spoken.length, before + 1);
  t.is(synth.spoken[synth.spoken.length - 1].rate, 3);
});

// Like Safari, cancel() fires the spoken utterance's onerror("canceled") synchronously.
const cancelErrorsSynchronously = (synth: MockSynth) => {
  const speechSynthesis = (globalThis as any).window.speechSynthesis;
  const cancel = speechSynthesis.cancel;
  speechSynthesis.cancel = () => {
    cancel();
    synth.spoken[synth.spoken.length - 1]?.onerror?.({ error: "canceled" });
    speechSynthesis.speaking = false;
  };
};

test.serial("in Safari, replacing the spoken utterance emits no stop for it", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  cancelErrorsSynchronously(synth);
  let stops = 0;
  engine.on("stop", () => { stops++; });

  engine.speak(1);
  await flush();

  t.is(stops, 0);
  t.is(engine.getState(), "playing");
});

test.serial("in Safari, stop() still emits stop", async (t) => {
  const { synth, engine } = await speakingEngine(true);
  cancelErrorsSynchronously(synth);
  let stops = 0;
  engine.on("stop", () => { stops++; });

  engine.stop();

  t.true(stops > 0);
  t.is(engine.getState(), "idle");
});

test.serial("outside Safari, speaking right after stop() speaks right away", async (t) => {
  const { synth, engine } = await speakingEngine(false);
  cancelStopsSpeaking();
  const before = synth.spoken.length;

  engine.stop();
  engine.speak(1);
  await drainMicrotasks();

  t.is(synth.spoken.length, before + 1);
});

const usesResumeInfinity = (lacksNativePauseEvents: boolean): boolean => {
  setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  (engine as any).patches = { isAndroid: false, isFirefox: false, isSafari: false, isKaiOS: false, isLinux: false };
  (engine as any).lacksNativePauseEvents = lacksNativePauseEvents;
  return (engine as any).shouldUseResumeInfinity();
};

test.serial("resume infinity runs for a voice without pause events, e.g. Chrome's Google voices", (t) => {
  t.true(usesResumeInfinity(true));
});

test.serial("resume infinity doesn't run for a voice with pause events, which would report each pause/resume", (t) => {
  t.false(usesResumeInfinity(false));
});

test.serial("stop() ends resume infinity, the timer that pauses and resumes speech every 5 seconds", async (t) => {
  const synth = setWebSpeechGlobals();
  // Resume infinity's 5-second timers are kept here instead of running
  const resumeTimers = new Set<unknown>();
  const { setTimeout: realSetTimeout, clearTimeout: realClearTimeout } = globalThis;
  (globalThis as any).setTimeout = (callback: () => void, ms?: number) => {
    if (ms !== 5000) return realSetTimeout(callback, ms);
    resumeTimers.add(callback);
    return callback;
  };
  (globalThis as any).clearTimeout = (id: any) => (resumeTimers.has(id) ? resumeTimers.delete(id) : realClearTimeout(id));
  try {
    // A Google voice: it never fires pause events, so resume infinity runs for it
    (WebSpeechVoiceManager as any).instance = undefined;
    (WebSpeechVoiceManager as any).initializationPromise = null;
    const google = { voiceURI: "Google US English", name: "Google US English", lang: "en-US", localService: false, default: false };
    (globalThis as any).window.speechSynthesis.getVoices = () => [google];
    const engine = new WebSpeechEngine();
    (engine as any).patches = { isAndroid: false, isFirefox: false, isSafari: false, isKaiOS: false, isLinux: false };
    await engine.initialize();
    const [voice] = await engine.getAvailableVoices();
    await engine.setVoice(voice);
    engine.loadUtterances([{ plain: "First." }]);
    engine.speak();
    await flush();
    synth.spoken[synth.spoken.length - 1].onstart?.();
    t.is(resumeTimers.size, 1, "running while it speaks");

    engine.stop();

    t.is(resumeTimers.size, 0, "no longer running");
  } finally {
    globalThis.setTimeout = realSetTimeout;
    globalThis.clearTimeout = realClearTimeout;
  }
});

test.serial("the current utterance being interrupted still emits stop", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  engine.loadUtterances([{ plain: "First." }]);
  engine.speak();
  await flush();
  const current = synth.spoken[synth.spoken.length - 1];
  current.onstart?.();
  const events: string[] = [];
  engine.on("stop", () => events.push("stop"));

  current.onerror?.({ error: "interrupted" });

  t.is(engine.getState(), "idle");
  t.deepEqual(events, ["stop"]);
});

test.serial("after its own last utterance, it still reports playing while another engine has one to speak after it", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  engine.loadUtterances([{ plain: "Mine." }, { plain: "Another engine's." }], 0, index => index === 1);
  engine.speak();
  await flush();
  const current = synth.spoken[synth.spoken.length - 1];
  current.onstart?.();
  current.onend?.(); // "Mine." ended

  t.is(engine.getState(), "playing", "\"Another engine's.\" is still to come");
});

async function pausedWithNativeVoice(nativeVoice: { name: string; localService: boolean }) {
  (WebSpeechVoiceManager as any).instance = undefined;
  (WebSpeechVoiceManager as any).initializationPromise = null;
  const synth = setWebSpeechGlobals();
  const voice = { voiceURI: nativeVoice.name, lang: "en-US", default: false, ...nativeVoice };
  (globalThis as any).window.speechSynthesis.getVoices = () => [voice];
  const engine = new WebSpeechEngine();
  await engine.initialize();
  const [readiumVoice] = await engine.getAvailableVoices();
  await engine.setVoice(readiumVoice);
  engine.loadUtterances([{ plain: "First." }]);
  const events: string[] = [];
  engine.on("pause", () => events.push("pause"));
  engine.on("resume", () => events.push("resume"));
  engine.speak();
  await flush();
  const utterance = synth.spoken[synth.spoken.length - 1];
  engine.pause();
  return { engine, utterance, events };
}

test.serial("pause and resume emit their events for a Google online voice, which never fires the native ones", async (t) => {
  const { engine, utterance, events } = await pausedWithNativeVoice({ name: "Google US English", localService: false });

  t.is(utterance.voice?.name, "Google US English");
  t.deepEqual(events, ["pause"]);
  engine.resume();
  t.deepEqual(events, ["pause", "resume"]);
});

test.serial("pause and resume emit their events for a local Google (Natural) voice, which never fires the native ones", async (t) => {
  const { engine, utterance, events } = await pausedWithNativeVoice({ name: "Google US English 5 (Natural)", localService: true });

  t.is(utterance.voice?.name, "Google US English 5 (Natural)");
  t.deepEqual(events, ["pause"]);
  engine.resume();
  t.deepEqual(events, ["pause", "resume"]);
});

test.serial("pause and resume emit their events for a Chrome OS voice, which never fires the native ones", async (t) => {
  const { engine, utterance, events } = await pausedWithNativeVoice({ name: "Chrome OS US English 5", localService: true });

  t.is(utterance.voice?.name, "Chrome OS US English 5");
  t.deepEqual(events, ["pause"]);
  engine.resume();
  t.deepEqual(events, ["pause", "resume"]);
});

test.serial("pause and resume leave their events to the native handlers for a local voice", async (t) => {
  const { engine, utterance, events } = await pausedWithNativeVoice({ name: "Samantha", localService: true });

  t.is(utterance.voice?.name, "Samantha");
  t.deepEqual(events, []);
  utterance.onpause?.();
  t.deepEqual(events, ["pause"]);
  engine.resume();
  t.deepEqual(events, ["pause"]);
  utterance.onresume?.();
  t.deepEqual(events, ["pause", "resume"]);
});

test.serial("a synthesis error is reported as a non-recoverable ErrorEventDetail", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  engine.loadUtterances([{ plain: "First." }]);
  engine.speak();
  await flush();
  const details: unknown[] = [];
  engine.on("error", (event) => details.push(event.detail));

  synth.spoken[synth.spoken.length - 1].onerror?.({ error: "synthesis-failed" });

  t.deepEqual(details, [{ error: "synthesis-failed", message: "Speech synthesis error: synthesis-failed", recoverable: false }]);
});

test.serial("a network synthesis error is recoverable", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  engine.loadUtterances([{ plain: "First." }]);
  engine.speak();
  await flush();
  const details: unknown[] = [];
  engine.on("error", (event) => details.push(event.detail));

  synth.spoken[synth.spoken.length - 1].onerror?.({ error: "network" });

  t.deepEqual(details, [{ error: "network", message: "Speech synthesis error: network", recoverable: true }]);
});

async function pausedWithoutNativePause() {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  (engine as any).lacksNativePause = true;
  engine.loadUtterances([{ plain: "First." }]);
  const events: string[] = [];
  for (const type of ["pause", "resume", "end", "stop"] as const) engine.on(type, () => events.push(type));
  engine.speak();
  await flush();
  const utterance = synth.spoken[synth.spoken.length - 1];
  utterance.onstart?.();
  synth.calls.length = 0;
  engine.pause();
  return { synth, engine, utterance, events };
}

test.serial("without native pause, pause cancels and emits a single pause", async (t) => {
  const { synth, engine, events } = await pausedWithoutNativePause();

  t.deepEqual(synth.calls, ["cancel"]);
  t.is(engine.getState(), "paused");
  t.deepEqual(events, ["pause"]);
});

test.serial("without native pause, the cancelled utterance's end and interrupted error don't undo the pause", async (t) => {
  const { engine, utterance, events } = await pausedWithoutNativePause();

  utterance.onend?.();
  utterance.onerror?.({ error: "interrupted" });

  t.is(engine.getState(), "paused");
  t.deepEqual(events, ["pause"]);
});

test.serial("without native pause, resume speaks the paused utterance again", async (t) => {
  const { synth, engine, utterance, events } = await pausedWithoutNativePause();

  engine.resume();
  await flush();

  t.false(synth.calls.includes("resume"));
  t.is(synth.spoken[synth.spoken.length - 1].text, utterance.text);
  t.not(synth.spoken[synth.spoken.length - 1], utterance);
  t.deepEqual(events, ["pause", "resume"]);
});

test.serial("without native pause, pausing from a start listener still speaks the utterance again on resume", async (t) => {
  const synth = setWebSpeechGlobals();
  const engine = new WebSpeechEngine();
  (engine as any).lacksNativePause = true;
  engine.loadUtterances([{ plain: "First." }]);
  engine.on("start", () => engine.pause());
  engine.speak();
  await flush();
  const utterance = synth.spoken[synth.spoken.length - 1];
  utterance.onstart?.();
  synth.calls.length = 0;

  engine.resume();
  await flush();

  t.false(synth.calls.includes("resume"));
  t.is(synth.spoken[synth.spoken.length - 1].text, utterance.text);
  t.not(synth.spoken[synth.spoken.length - 1], utterance);
});
