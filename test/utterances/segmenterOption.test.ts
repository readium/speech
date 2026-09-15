import "./setup.js";
import "../gnd/setup.js";
import test from "ava";
import { parseMarkup } from "../../src/gnd/converter.js";
import { extractUtterances, extractUtterancesWithSources } from "../../src/utterances/extractUtterances.js";

const html = "<p>Hello there. This has two sentences.</p><p>And a second paragraph.</p>";

test("segmenter defaults to structure (one utterance per block)", async (t) => {
  const gnd = parseMarkup(html);
  const utterances = await extractUtterances(gnd, { format: "plain" });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["Hello there. This has two sentences.", "And a second paragraph."]
  );
});

test("segmenter: structure is explicitly equivalent to the default", async (t) => {
  const gnd = parseMarkup(html);
  const defaultUtterances = await extractUtterances(gnd, { format: "plain" });
  const structureUtterances = await extractUtterances(gnd, { format: "plain", segmenter: "structure" });
  t.deepEqual(structureUtterances, defaultUtterances);
});

test("segmenter: sentence splits a multi-sentence paragraph into one utterance per sentence", async (t) => {
  const gnd = parseMarkup("<p>Hello there. This has two sentences.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmenter: "sentence" });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["Hello there. ", "This has two sentences."]
  );
});

test("segmenter: sentence does not split on an abbreviation", async (t) => {
  const gnd = parseMarkup("<p>Mr. Smith stayed. He was tired.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmenter: "sentence" });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["Mr. Smith stayed. ", "He was tired."]
  );
});

test("segmenter: sentence leaves a single-sentence paragraph untouched", async (t) => {
  const gnd = parseMarkup("<p>Just one sentence.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmenter: "sentence" });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["Just one sentence."]
  );
});

test("segmenter: sentence never merges sentences across separate paragraphs", async (t) => {
  const gnd = parseMarkup("<p>First one. First two.</p><p>Second one. Second two.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmenter: "sentence" });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["First one. ", "First two.", "Second one. ", "Second two."]
  );
});

test("segmenter: sentence does not split synthesized contextualization/label text", async (t) => {
  const gnd = parseMarkup(
    `<table><tr><td>Cell.</td></tr></table>`,
    undefined,
    { textrefs: false }
  );
  const utterances = await extractUtterances(gnd, {
    format: "plain",
    segmenter: "sentence",
    contextualize: ["table"],
  });
  const label = utterances.find((u) => u.synthetic);
  t.truthy(label);
  t.true((label?.plain ?? "").includes("."));
});

test("segmenter: sentence splits ssml the same way as plain when there's no markup to preserve", async (t) => {
  const gnd = parseMarkup("<p>Hello there. This has two sentences.</p>");
  const utterances = await extractUtterances(gnd, { format: "ssml", segmenter: "sentence" });
  t.deepEqual(
    utterances.map((u) => u.ssml),
    ["Hello there. ", "This has two sentences."]
  );
});

test("segmenter: sentence re-wraps a <lang> span whose inner text spans a sentence boundary", async (t) => {
  const gnd = parseMarkup('<p>See <span lang="fr">Bonjour. Ça va?</span> after that.</p>');
  const utterances = await extractUtterances(gnd, {
    format: "ssml",
    segmenter: "sentence",
    language: "always",
  });
  t.deepEqual(
    utterances.map((u) => u.ssml),
    [
      'See <lang xml:lang="fr">Bonjour. </lang>',
      '<lang xml:lang="fr">Ça va?</lang> ',
      "after that.",
    ]
  );
});

test("segmenter: sentence attaches a self-closing tag to the sentence following it", async (t) => {
  const gnd = parseMarkup("<p>Line one.<br>Line two after a break.</p>");
  const utterances = await extractUtterances(gnd, { format: "ssml", segmenter: "sentence" });
  t.deepEqual(
    utterances.map((u) => u.ssml),
    ["Line one.", "<break/>Line two after a break."]
  );
});

test("segmenter: sentence leaves single-sentence ssml untouched", async (t) => {
  const gnd = parseMarkup("<p>Just one sentence.</p>");
  const utterances = await extractUtterances(gnd, { format: "ssml", segmenter: "sentence" });
  t.deepEqual(
    utterances.map((u) => u.ssml),
    ["Just one sentence."]
  );
});

test("segmenter: sentence keeps blockStarts on only the first sentence of a split paragraph", async (t) => {
  const gnd = parseMarkup("<p>First. Second.</p><p>Third.</p>");
  const { utterances, blockStarts } = await extractUtterancesWithSources(gnd, {
    format: "plain",
    segmenter: "sentence",
  });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["First. ", "Second.", "Third."]
  );
  t.deepEqual(blockStarts, [true, false, true]);
});
