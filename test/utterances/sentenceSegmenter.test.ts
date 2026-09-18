import test from "ava";
import { segmentSentences } from "../../src/utterances/sentenceSegmenter.js";
import { splitSsmlAtSentences } from "../../src/utterances/splitSsmlAtSentences.js";

test("splits plain declarative sentences", async (t) => {
  const boundaries = await segmentSentences("en", "Hello world. This is a test.");
  t.deepEqual(
    boundaries.map((b) => b.text),
    ["Hello world.", "This is a test."]
  );
});

// "Zqxk." is fabricated so this tests our passthrough, not a real gap in a
// third-party list that could get fixed upstream out from under us.
test("customSuppressions extends the built-in abbreviation list", async (t) => {
  const text = "We visited Zqxk. University last year.";
  const withoutCustom = await segmentSentences("en", text);
  t.true(withoutCustom.length > 1, "baseline: an unrecognized token isn't specially suppressed");

  const withCustom = await segmentSentences("en", text, ["Zqxk."]);
  t.deepEqual(
    withCustom.map((b) => b.text),
    [text]
  );
});

test("does not split on a common abbreviation", async (t) => {
  const boundaries = await segmentSentences("en", "Mr. Smith stayed. He was tired.");
  t.deepEqual(
    boundaries.map((b) => b.text),
    ["Mr. Smith stayed.", "He was tired."]
  );
});

test("does not split on e.g. mid-sentence", async (t) => {
  const boundaries = await segmentSentences(
    "en",
    "Bring layers, e.g. a jacket and gloves. It gets cold."
  );
  t.deepEqual(
    boundaries.map((b) => b.text),
    ["Bring layers, e.g. a jacket and gloves.", "It gets cold."]
  );
});

test("does not split on a decimal number", async (t) => {
  const boundaries = await segmentSentences("en", "The total was 3.14 dollars. Done.");
  t.deepEqual(
    boundaries.map((b) => b.text),
    ["The total was 3.14 dollars.", "Done."]
  );
});

test("start/contentEnd offsets are usable as JS string (UTF-16 code unit) indices for multi-byte text", async (t) => {
  const text = "⅓ cup of café. Then serve.";
  const boundaries = await segmentSentences("en", text);
  t.is(boundaries.length, 2);
  for (const boundary of boundaries) {
    t.is(text.slice(boundary.start, boundary.contentEnd), boundary.text);
  }
});

test("end reaches through the trailing separator, contentEnd stops at the trimmed text", async (t) => {
  const text = "Hello world. This is a test.";
  const boundaries = await segmentSentences("en", text);
  t.is(boundaries[0].text, "Hello world.");
  t.is(boundaries[0].contentEnd, "Hello world.".length);
  t.is(boundaries[0].end, "Hello world. ".length);
  t.is(text.slice(boundaries[0].contentEnd, boundaries[0].end), " ");
});

test("empty text yields no boundaries", async (t) => {
  t.deepEqual(await segmentSentences("en", ""), []);
});

test("splitSsmlAtSentences splits plain ssml text at sentence boundaries", async (t) => {
  const result = await splitSsmlAtSentences("Hello world. This is a test.", "en");
  t.deepEqual(result, ["Hello world.", "This is a test."]);
});

test("splitSsmlAtSentences returns undefined for a single sentence", async (t) => {
  const result = await splitSsmlAtSentences("Just one sentence.", "en");
  t.is(result, undefined);
});

test("splitSsmlAtSentences returns undefined for empty text", async (t) => {
  const result = await splitSsmlAtSentences("", "en");
  t.is(result, undefined);
});

test("splitSsmlAtSentences re-wraps a paired tag whose inner text spans a boundary", async (t) => {
  const result = await splitSsmlAtSentences('See <lang xml:lang="fr">Bonjour. Ça va?</lang> after that.', "en");
  t.deepEqual(result, [
    'See <lang xml:lang="fr">Bonjour.</lang>',
    '<lang xml:lang="fr">Ça va?</lang>',
    "after that.",
  ]);
});

test("splitSsmlAtSentences keeps a paired tag whole when it doesn't span a boundary", async (t) => {
  const result = await splitSsmlAtSentences('<emphasis level="strong">Careful!</emphasis> Now continue.', "en");
  t.deepEqual(result, ['<emphasis level="strong">Careful!</emphasis>', "Now continue."]);
});

test("splitSsmlAtSentences attaches a self-closing tag to the sentence following it", async (t) => {
  const result = await splitSsmlAtSentences("Line one. <break/>Line two.", "en");
  t.deepEqual(result, ["Line one.", "<break/>Line two."]);
});

test("splitSsmlAtSentences preserves entity escaping across a split", async (t) => {
  const result = await splitSsmlAtSentences("A &amp; B are fine. C &lt; D holds too.", "en");
  t.deepEqual(result, ["A &amp; B are fine.", "C &lt; D holds too."]);
});
