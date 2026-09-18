import "../gnd/setup.js";
import test from "ava";
import { parseMarkup } from "../../src/gnd/converter.js";
import { extractUtterances, extractUtterancesWithSources } from "../../src/utterances/extractUtterances.js";

test("extractUtterances attaches cssSelector from the source node's textref", async (t) => {
  const gnd = parseMarkup("<p>Hello.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.locate?.cssSelector, "p");
});

test("extractUtterances leaves locate undefined when textrefs was off at generation time", async (t) => {
  const gnd = parseMarkup("<p>Hello.</p>");
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.locate, undefined);
});

test("extractUtterancesWithSources also attaches cssSelector, alongside sources", async (t) => {
  const gnd = parseMarkup("<p>Hello.</p>", undefined, { textrefs: true });
  const { utterances } = await extractUtterancesWithSources(gnd, { format: "plain" });
  t.is(utterances[0].locate?.cssSelector, "p");
});

test("a link embedded in a larger flow merges into one utterance, falling back to the enclosing block's cssSelector, not its own href", async (t) => {
  const gnd = parseMarkup('<p>See <a href="chapter1.xhtml">chapter 1</a>.</p>', undefined, {
    textrefs: true,
  });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "See chapter 1.");
  t.is(utterance.locate?.cssSelector, "p");
});

// The hoist-collision case (object.ts never merges the link's href into
// the block's own textref) plus the ancestor fallback above, combined: the
// block's cssSelector survives on the <p> node for attachLocate() to find.
test("a link as a block's sole content falls back to the block's own cssSelector", async (t) => {
  const gnd = parseMarkup('<p><a href="chapter1.xhtml">Chapter 1</a></p>', undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Chapter 1");
  t.is(utterance.locate?.cssSelector, "p");
});

test("extractUtterances attaches an exact-match highlight when the text is unique in the document", async (t) => {
  const gnd = parseMarkup("<p>A unique sentence.</p>", undefined, { textrefs: { roles: true, textFragment: true } });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  // Case-normalized by the polyfill's exact-match path — see the equivalent
  // gnd/textref.test.ts case for why.
  t.is(utterance.locate?.text?.highlight, "a unique sentence.");
});

test("a language-split fragment gets its own locate/offsets, not the whole node's", async (t) => {
  const gnd = parseMarkup('<p>Hello <span lang="fr">Bonjour</span> world.</p>', undefined, { textrefs: true });
  const utterances = await extractUtterances(gnd, { format: "plain", language: "always" });
  t.deepEqual(utterances.map((u) => u.plain), ["Hello", "Bonjour", "world."]);

  const [before, fr, after] = utterances;
  t.is(before.locate?.text?.highlight, "Hello");
  t.is(fr.locate?.text?.highlight, "Bonjour");
  t.is(after.locate?.text?.highlight, "world.");
  t.not(before.locate?.text?.highlight, fr.locate?.text?.highlight);

  // offsets are positions in the shared <p>'s own text, so they advance
  // instead of each fragment restarting at 0.
  t.deepEqual(before.offsets?.[0], { start: 0, end: before.plain!.length, locate: before.locate });
  t.deepEqual(fr.offsets?.[0], {
    start: before.plain!.length,
    end: before.plain!.length + fr.plain!.length,
    locate: fr.locate,
  });
  t.deepEqual(after.offsets?.[0], {
    start: before.plain!.length + fr.plain!.length,
    end: before.plain!.length + fr.plain!.length + after.plain!.length,
    locate: after.locate,
  });
});

test("extractUtterances disambiguates recurring text with prefix/suffix context", async (t) => {
  const gnd = parseMarkup(
    "<p>Before one context</p><p>Repeated text</p><p>Middle marker</p><p>Repeated text</p><p>After two context</p>",
    undefined,
    { textrefs: { roles: true, textFragment: true } },
  );
  const utterances = await extractUtterances(gnd, { format: "plain" });
  t.is(utterances.length, 5);
  const [, first, , second] = utterances;
  t.true(first.locate?.text?.before !== undefined || first.locate?.text?.after !== undefined);
  t.true(second.locate?.text?.before !== undefined || second.locate?.text?.after !== undefined);
  t.not(
    JSON.stringify([first.locate?.text?.before, first.locate?.text?.after]),
    JSON.stringify([second.locate?.text?.before, second.locate?.text?.after]),
  );
});
