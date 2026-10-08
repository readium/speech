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
