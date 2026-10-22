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

for (const [name, space] of [["space", " "], ["no-break space", " "], ["narrow no-break space", " "]]) {
  for (const mark of ["!", "?", "."]) {
    test(`a closing guillemet after "${mark}" and a ${name} stays with its sentence`, async (t) => {
      const text = `«${space}Il n’y a rien${space}${mark}${space}»`;
      const boundaries = await segmentSentences("fr", text);
      t.deepEqual(boundaries.map((b) => b.text), [text]);
    });
  }
}

test("a closing guillemet stays with its sentence, the next one starting after it", async (t) => {
  const boundaries = await segmentSentences("fr", "« Il n’y a rien ! » Elle se tut. « Vraiment ? »");
  t.deepEqual(boundaries.map((b) => b.text), ["« Il n’y a rien ! »", "Elle se tut.", "« Vraiment ? »"]);
});

test("a closing guillemet ending a quotation of several sentences stays with the last one", async (t) => {
  const boundaries = await segmentSentences("fr", "« Il n’y a rien ! Vraiment rien ! » Elle se tut.");
  t.deepEqual(boundaries.map((b) => b.text), ["« Il n’y a rien !", "Vraiment rien ! »", "Elle se tut."]);
});

test("English quotes and apostrophes are left as Intl.Segmenter splits them", async (t) => {
  for (const [text, sentences] of [
    ["‘Go on! ’E’s waiting.’", ["‘Go on!", "’E’s waiting.’"]],
    ["‘Don’t wait!’ Then go.", ["‘Don’t wait!’", "Then go."]],
    ["“The students’ books!” Then go.", ["“The students’ books!”", "Then go."]],
  ] as const) {
    const boundaries = await segmentSentences("en", text);
    t.deepEqual(boundaries.map((b) => b.text), sentences);
  }
});

test("a guillemet opening the next quote stays with it, as in German", async (t) => {
  const boundaries = await segmentSentences("de", "Er sagte: »Ja.« »Nein.« Dann ging er.");
  t.deepEqual(boundaries.map((b) => b.text), ["Er sagte: »Ja.«", "»Nein.«", "Dann ging er."]);
});

test("a dialogue dash after terminal punctuation starts a new sentence", async (t) => {
  const boundaries = await segmentSentences(
    "fr",
    "… elle lui conterait tout son malheur. —Dites répondit Mme de Rênal. —Eh bien, madame, il me refuse; il les croit. —Qui vous refuse? dit Mme de Rênal respirant à peine.",
  );
  t.deepEqual(boundaries.map((b) => b.text), [
    "… elle lui conterait tout son malheur.",
    "—Dites répondit Mme de Rênal.",
    "—Eh bien, madame, il me refuse; il les croit.",
    "—Qui vous refuse? dit Mme de Rênal respirant à peine.",
  ]);
});

test("a spaced dialogue dash after terminal punctuation starts a new sentence", async (t) => {
  for (const dash of ["—", "―"]) {
    const boundaries = await segmentSentences("fr", `Tout son malheur. ${dash} Dites répondit Mme de Rênal.`);
    t.deepEqual(boundaries.map((b) => b.text), ["Tout son malheur.", `${dash} Dites répondit Mme de Rênal.`]);
  }
});

test("an em dash attribution after a quote is its own sentence, opening with the dash", async (t) => {
  const boundaries = await segmentSentences("en", "A lighthouse is a compromise with the sea. — Anonymous");
  t.deepEqual(boundaries.map((b) => b.text), ["A lighthouse is a compromise with the sea.", "— Anonymous"]);
});

test("an em dash without terminal punctuation before it stays mid-sentence", async (t) => {
  for (const text of ["He paused — then left.", "He paused—then left.", "He said “Stop!”—and ran."]) {
    const boundaries = await segmentSentences("en", text);
    t.deepEqual(boundaries.map((b) => b.text), [text]);
  }
});

test("a dialogue dash before a lowercase word continues the sentence, as in a Spanish incise", async (t) => {
  const boundaries = await segmentSentences("es", "—¿Qué quieres? —preguntó ella. Se fue.");
  t.deepEqual(boundaries.map((b) => b.text), ["—¿Qué quieres? —preguntó ella.", "Se fue."]);
});

test("a lowercase word after a question or exclamation mark continues the sentence", async (t) => {
  for (const [language, text, sentences] of [
    ["en", "“Who?” she asked. Then left.", ["“Who?” she asked.", "Then left."]],
    ["fr", "« Qui vous refuse ? » dit-elle. Bon.", ["« Qui vous refuse ? » dit-elle.", "Bon."]],
    ["de", "Was? sagte er. Gut.", ["Was? sagte er.", "Gut."]],
    ["es", "¿Qué? dijo él. ¡Hola! ¿Cómo estás?", ["¿Qué? dijo él.", "¡Hola!", "¿Cómo estás?"]],
  ] as const) {
    const boundaries = await segmentSentences(language, text);
    t.deepEqual(boundaries.map((b) => b.text), sentences);
  }
});

test("a capitalized word after a question or exclamation mark starts a new sentence", async (t) => {
  for (const text of ["Who? Next one.", "Stop! Next one."]) {
    const boundaries = await segmentSentences("en", text);
    t.deepEqual(boundaries.map((b) => b.text), [text.slice(0, text.indexOf(" ")), "Next one."]);
  }
});

test("splitSsmlAtSentences keeps a closing guillemet with its sentence", async (t) => {
  const result = await splitSsmlAtSentences("« Il n’y a rien ! » Elle se tut.", "fr", segmentSentences);
  t.deepEqual(result, ["« Il n’y a rien ! »", "Elle se tut."]);
});

test("a language tag with an underscore segments like its hyphenated form", async (t) => {
  const boundaries = await segmentSentences("en_US", "Hello Mr. Smith. Goodbye.");
  t.deepEqual(boundaries.map((b) => b.text), ["Hello Mr. Smith.", "Goodbye."]);
});

test("an invalid language tag segments in English instead of throwing, with English abbreviations", async (t) => {
  const boundaries = await segmentSentences("", "Hello Mr. Smith. Goodbye.");
  t.deepEqual(boundaries.map((b) => b.text), ["Hello Mr. Smith.", "Goodbye."]);
});

test("splitSsmlAtSentences splits plain ssml text at sentence boundaries", async (t) => {
  const result = await splitSsmlAtSentences("Hello world. This is a test.", "en", segmentSentences);
  t.deepEqual(result, ["Hello world.", "This is a test."]);
});

test("splitSsmlAtSentences returns undefined for a single sentence", async (t) => {
  const result = await splitSsmlAtSentences("Just one sentence.", "en", segmentSentences);
  t.is(result, undefined);
});

test("splitSsmlAtSentences returns undefined for empty text", async (t) => {
  const result = await splitSsmlAtSentences("", "en", segmentSentences);
  t.is(result, undefined);
});

test("splitSsmlAtSentences re-wraps a paired tag whose inner text spans a boundary", async (t) => {
  const result = await splitSsmlAtSentences('See <lang xml:lang="fr">Bonjour. Ça va?</lang> After that.', "en", segmentSentences);
  t.deepEqual(result, [
    'See <lang xml:lang="fr">Bonjour.</lang>',
    '<lang xml:lang="fr">Ça va?</lang>',
    "After that.",
  ]);
});

test("splitSsmlAtSentences keeps a paired tag whole when it doesn't span a boundary", async (t) => {
  const result = await splitSsmlAtSentences('<emphasis level="strong">Careful!</emphasis> Now continue.', "en", segmentSentences);
  t.deepEqual(result, ['<emphasis level="strong">Careful!</emphasis>', "Now continue."]);
});

test("splitSsmlAtSentences attaches a self-closing tag to the sentence following it", async (t) => {
  const result = await splitSsmlAtSentences("Line one. <break/>Line two.", "en", segmentSentences);
  t.deepEqual(result, ["Line one.", "<break/>Line two."]);
});

test("splitSsmlAtSentences preserves entity escaping across a split", async (t) => {
  const result = await splitSsmlAtSentences("A &amp; B are fine. C &lt; D holds too.", "en", segmentSentences);
  t.deepEqual(result, ["A &amp; B are fine.", "C &lt; D holds too."]);
});
