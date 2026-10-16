import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import { ReadiumSpeechNavigator } from "../../build/index.js";
import { MockEngine } from "./mockEngine.js";

const substitutedTree = () => parseMarkup("<p>Water boils at 100deg Celsius.</p>", undefined, { textrefs: true });

const wordAt = (navigator: ReadiumSpeechNavigator, engine: MockEngine, word: string): any => {
  let detail: any;
  navigator.on("boundary", (event) => { if (event.detail?.name === "word") detail = event.detail; });
  const plain = engine.loadedUtterances[0].plain!;
  engine.emit({ type: "boundary", detail: { name: "word", charIndex: plain.indexOf(word), charLength: word.length } });
  return detail;
};

test("a word in substituted text resolves to its source when the utterance is spoken with a voice and the content's language", async (t) => {
  const engine = new MockEngine();
  const navigator = new ReadiumSpeechNavigator(engine, { preferences: { language: "none", voice: { en: "Karen" } } });
  await navigator.loadGndContent(substitutedTree(), { language: "en-AU" });
  t.is(engine.loadedUtterances[0].plain, "Water boils at 100° Celsius.");
  t.is(engine.loadedUtterances[0].voice, "Karen");

  const detail = wordAt(navigator, engine, "100°");
  t.is(detail?.locate.text?.highlight, "100deg");
});
