import "../gnd/setup.js";
import test from "ava";
import { parseMarkup } from "../../src/gnd/converter.js";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import { resolveUtteranceLocate } from "../../src/utterances/utteranceLocate.js";

test("resolveUtteranceLocate returns one locate per offset piece in sentence mode", async (t) => {
  const gnd = parseMarkup("<p>This sentence continues</p><p>across two paragraphs.</p>", undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.is(utterance.offsets?.length, 2);

  const locates = resolveUtteranceLocate(utterance, "sentence");
  t.is(locates.length, 2);
  t.is(locates[0], utterance.offsets![0].locate);
  t.is(locates[1], utterance.offsets![1].locate);
});

test("resolveUtteranceLocate returns a single locate in sentence mode when there's only one offset piece", async (t) => {
  const gnd = parseMarkup("<p>Hello world.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.is(utterance.offsets?.length, 1);

  const locates = resolveUtteranceLocate(utterance, "sentence");
  t.is(locates.length, 1);
  t.is(locates[0], utterance.offsets![0].locate);
});

test("resolveUtteranceLocate returns the utterance's own locate in structure mode, even with multiple offset pieces", (t) => {
  const utterance = {
    plain: "See note 1.",
    locate: { cssSelector: "p" },
    offsets: [
      { start: 0, end: 4, locate: { cssSelector: "p" } },
      { start: 4, end: 12, locate: { cssSelector: "a" } },
    ],
  };

  const locates = resolveUtteranceLocate(utterance, "structure");
  t.deepEqual(locates, [{ cssSelector: "p" }]);
});

test("resolveUtteranceLocate returns an empty array when the utterance has neither locate nor offsets", (t) => {
  const utterance = { plain: "Some synthesized announcement." };
  t.deepEqual(resolveUtteranceLocate(utterance, "structure"), []);
  t.deepEqual(resolveUtteranceLocate(utterance, "sentence"), []);
});
