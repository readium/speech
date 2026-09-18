import "../gnd/setup.js";
import test from "ava";
import { parseMarkup } from "../../src/gnd/converter.js";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import { resolveBoundaryLocate } from "../../src/utterances/boundaryLocate.js";

test("resolveBoundaryLocate finds a word within a single-offset utterance", async (t) => {
  const gnd = parseMarkup("<p>Hello world.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Hello world.");

  const charIndex = utterance.plain!.indexOf("world");
  const resolved = resolveBoundaryLocate(utterance, charIndex, "world".length);
  t.is(resolved?.word, "world");
  t.is(resolved?.locate.text?.highlight, "world");
  t.is(resolved?.locate.cssSelector, utterance.locate?.cssSelector);
});

test("resolveBoundaryLocate finds a word in the second of two offset pieces (sentence reconstructed across elements)", async (t) => {
  const gnd = parseMarkup("<p>This sentence continues</p><p>across two paragraphs.</p>", undefined, { textrefs: { roles: true } });
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.is(utterances.length, 1);
  const [utterance] = utterances;
  t.is(utterance.plain, "This sentence continues across two paragraphs.");
  t.is(utterance.offsets?.length, 2);

  const charIndex = utterance.plain!.indexOf("paragraphs");
  const resolved = resolveBoundaryLocate(utterance, charIndex, "paragraphs".length);
  t.is(resolved?.word, "paragraphs");
  // Resolved against the second piece's own locate, not the first's.
  t.is(resolved?.locate.cssSelector, utterance.offsets![1].locate.cssSelector);
  t.not(resolved?.locate.cssSelector, utterance.offsets![0].locate.cssSelector);
  t.is(resolved?.locate.text?.before, "across two ");
  t.is(resolved?.locate.text?.after, ".");
});

test("resolveBoundaryLocate finds a word exactly at a piece boundary", async (t) => {
  const gnd = parseMarkup("<p>This sentence continues</p><p>across two paragraphs.</p>", undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });

  const charIndex = utterance.plain!.indexOf("across");
  const resolved = resolveBoundaryLocate(utterance, charIndex, "across".length);
  t.is(resolved?.word, "across");
  t.is(resolved?.locate.cssSelector, utterance.offsets![1].locate.cssSelector);
});

test("resolveBoundaryLocate returns undefined for a synthesized utterance with no offsets", async (t) => {
  const utterance = { plain: "Some synthesized announcement." };
  t.is(resolveBoundaryLocate(utterance, 5, 4), undefined);
});

test("resolveBoundaryLocate returns undefined when charIndex falls outside every offset piece's actual text", async (t) => {
  const gnd = parseMarkup("<p>Hello world.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(resolveBoundaryLocate(utterance, 9999, 1), undefined);
});

test("resolveBoundaryLocate drops a piece's domRange, so a consumer trying domRange before text.highlight doesn't anchor the whole piece instead of the word", (t) => {
  const utterance = {
    plain: "Speech Synthesis",
    offsets: [{
      start: 0,
      end: 17,
      locate: {
        cssSelector: "h1",
        domRange: { start: { cssSelector: "h1", textNodeIndex: 0, charOffset: 0 } },
        text: { highlight: "Speech Synthesis" },
      },
    }],
  };

  const charIndex = utterance.plain.indexOf("Synthesis");
  const resolved = resolveBoundaryLocate(utterance, charIndex, "Synthesis".length);
  t.is(resolved?.word, "Synthesis");
  t.is(resolved?.locate.domRange, undefined);
  t.is(resolved?.locate.cssSelector, "h1");
});

test("resolveBoundaryLocate matches a plain-text-space charIndex against SSML markup, skipping past an inline tag", async (t) => {
  const gnd = parseMarkup('<p>See <span lang="fr">Bonjour</span> friend.</p>', undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "ssml", language: "always" });
  t.true((utterance.ssml ?? "").includes("<lang"));

  // charIndex here mirrors what SpeechServerEngine reports: a position in the
  // tag-stripped plain text ("See Bonjour friend."), not the raw SSML string.
  const plainText = "See Bonjour friend.";
  const charIndex = plainText.indexOf("friend");
  const resolved = resolveBoundaryLocate(utterance, charIndex, "friend".length);
  t.is(resolved?.word, "friend");
});
