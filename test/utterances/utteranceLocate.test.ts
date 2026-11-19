import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import { resolveUtteranceLocate, resolveUtteranceSourceText } from "../../src/utterances/utteranceLocate.js";
import type { ExtractUtterancesOptions } from "../../src/utterances/types.js";

test("resolveUtteranceLocate returns one locate per offset piece in sentence mode", async (t) => {
  const gnd = parseMarkup("<p>This sentence continues</p><p>across two paragraphs.</p>", undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence", reconstruct: true } });
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

test("resolveUtteranceSourceText gives the page text an utterance reads, in every format and segmentation", async (t) => {
  const cases: { markup: string; options?: ExtractUtterancesOptions; texts: (string | undefined)[] }[] = [
    { markup: "<p>Add 1/2 cup of sugar.</p>", texts: ["Add 1/2 cup of sugar."] },
    { markup: "<p>Plants absorb CO2.</p>", options: { substitutions: { CO2: "carbon dioxide" } }, texts: ["Plants absorb CO2."] },
    { markup: '<p>The <abbr title="World Health Organization">WHO</abbr> issued a warning.</p>', texts: ["The WHO issued a warning."] },
    {
      markup: '<p>The <abbr title="World Health Organization">WHO</abbr> issued a warning.</p>',
      options: { interruptions: { abbreviation: "after" } },
      texts: ["The WHO issued a warning."],
    },
    {
      markup: '<p>The <abbr title="World Health Organization">WHO</abbr> issued a warning.</p>',
      options: { interruptions: { abbreviation: "never" } },
      texts: ["The WHO issued a warning."],
    },
    {
      markup: '<p>Add 1/2 cup of <span role="doc-pagebreak" aria-label="12"></span>sugar.</p>',
      options: { interruptions: { pagebreak: "inline" } },
      texts: ["Add 1/2 cup of sugar."],
    },
    { markup: "<table><tr><th>Name</th></tr><tr><td>Alice</td></tr></table>", texts: ["Name", "Alice"] },
    { markup: "<p>A <em>two</em>fold rise.</p>", texts: ["A twofold rise."] },
    { markup: "<p>It cost 12&#160;dollars.</p>", texts: ["It cost 12\u00a0dollars."] },
    { markup: '<p>Rated <span role="img" aria-label="four stars">****</span> overall.</p>', texts: ["Rated overall."] },
  ];
  for (const { markup, options, texts } of cases) {
    const gnd = parseMarkup(markup, undefined, { textrefs: { roles: true } });
    for (const format of ["plain", "ssml"] as const) {
      for (const mode of ["structure", "sentence"] as const) {
        const utterances = await extractUtterances(gnd, { ...options, format, segmentation: { mode } });
        t.deepEqual(utterances.map(resolveUtteranceSourceText), texts, `${format}, ${mode}: ${markup}`);
      }
    }
  }
});

test("resolveUtteranceSourceText gives the page text of a sentence reconstructed across elements", async (t) => {
  const gnd = parseMarkup("<p>This recipe needs</p><p>1/2 cup today.</p>", undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence", reconstruct: true } });
  t.is(utterance.plain, "This recipe needs ½ cup today.");
  t.is(resolveUtteranceSourceText(utterance), "This recipe needs 1/2 cup today.");
});

test("resolveUtteranceSourceText gives the page text of the voice-stamped copies a navigator's queue holds", async (t) => {
  const gnd = parseMarkup("<p>Add 1/2 cup of sugar.</p>", undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(resolveUtteranceSourceText({ ...utterance, voice: "Samantha", language: "en" }), "Add 1/2 cup of sugar.");
});

test("resolveUtteranceSourceText is undefined for text not on the page", async (t) => {
  const gnd = parseMarkup('<p>Into speech. <a href="#ref" aria-label="Source: Wikipedia, Speech synthesis">[source]</a></p>', undefined, {
    textrefs: { roles: true },
  });
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(utterances.map(resolveUtteranceSourceText), ["Into speech.", undefined]);
  t.is(resolveUtteranceSourceText({ plain: "Some synthesized announcement." }), undefined);
});
