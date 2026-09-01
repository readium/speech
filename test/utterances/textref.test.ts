import "../gnd/setup.js";
import test from "ava";
import { parseMarkup } from "../../src/gnd/converter.js";
import { extractUtterances, extractUtterancesWithSources } from "../../src/utterances/extractUtterances.js";

test("extractUtterances attaches cssSelector from the source node's textref", (t) => {
  const gnd = parseMarkup("<p>Hello.</p>", undefined, { textrefs: true });
  const [utterance] = extractUtterances(gnd, { format: "plain" });
  t.is(utterance.locate?.cssSelector, "p");
});

test("extractUtterances leaves locate undefined when textrefs was off at generation time", (t) => {
  const gnd = parseMarkup("<p>Hello.</p>");
  const [utterance] = extractUtterances(gnd, { format: "plain" });
  t.is(utterance.locate, undefined);
});

test("extractUtterancesWithSources also attaches cssSelector, alongside sources", (t) => {
  const gnd = parseMarkup("<p>Hello.</p>", undefined, { textrefs: true });
  const { utterances } = extractUtterancesWithSources(gnd, { format: "plain" });
  t.is(utterances[0].locate?.cssSelector, "p");
});

test("a link embedded in a larger flow falls back to the enclosing block's cssSelector, not its own href", (t) => {
  const gnd = parseMarkup('<p>See <a href="chapter1.xhtml">chapter 1</a>.</p>', undefined, {
    textrefs: true,
  });
  const utterances = extractUtterances(gnd, { format: "plain" });
  t.is(utterances.length, 2);
  for (const utterance of utterances) t.is(utterance.locate?.cssSelector, "p");
});

// The hoist-collision case (object.ts never merges the link's href into
// the block's own textref) plus the ancestor fallback above, combined: the
// block's cssSelector survives on the <p> node for attachLocate() to find.
test("a link as a block's sole content falls back to the block's own cssSelector", (t) => {
  const gnd = parseMarkup('<p><a href="chapter1.xhtml">Chapter 1</a></p>', undefined, { textrefs: true });
  const [utterance] = extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Chapter 1");
  t.is(utterance.locate?.cssSelector, "p");
});

test("extractUtterances attaches an exact-match highlight when the text is unique in the document", (t) => {
  const gnd = parseMarkup("<p>A unique sentence.</p>", undefined, { textrefs: { roles: true, textFragment: true } });
  const [utterance] = extractUtterances(gnd, { format: "plain" });
  t.is(utterance.locate?.text?.highlight, "A unique sentence.");
});

test("extractUtterances disambiguates recurring text with prefix/suffix context", (t) => {
  const gnd = parseMarkup(
    "<p>Before one context</p><p>Repeated text</p><p>Middle marker</p><p>Repeated text</p><p>After two context</p>",
    undefined,
    { textrefs: { roles: true, textFragment: true } },
  );
  const utterances = extractUtterances(gnd, { format: "plain" });
  t.is(utterances.length, 5);
  const [, first, , second] = utterances;
  t.true(first.locate?.text?.before !== undefined || first.locate?.text?.after !== undefined);
  t.true(second.locate?.text?.before !== undefined || second.locate?.text?.after !== undefined);
  t.not(
    JSON.stringify([first.locate?.text?.before, first.locate?.text?.after]),
    JSON.stringify([second.locate?.text?.before, second.locate?.text?.after]),
  );
});
