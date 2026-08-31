import "../gnd/setup.js";
import test from "ava";
import { parseMarkup } from "../../src/gnd/converter.js";
import { extractUtterances, extractUtterancesWithSources } from "../../src/utterances/extractUtterances.js";

test("extractUtterances attaches selector from the source node's textref", (t) => {
  const gnd = parseMarkup("<p>Hello.</p>", undefined, { textrefs: true });
  const [utterance] = extractUtterances(gnd, { format: "plain" });
  t.is(utterance.selector, "p");
});

test("extractUtterances leaves selector undefined when textrefs was off at generation time", (t) => {
  const gnd = parseMarkup("<p>Hello.</p>");
  const [utterance] = extractUtterances(gnd, { format: "plain" });
  t.is(utterance.selector, undefined);
});

test("extractUtterancesWithSources also attaches selector, alongside sources", (t) => {
  const gnd = parseMarkup("<p>Hello.</p>", undefined, { textrefs: true });
  const { utterances } = extractUtterancesWithSources(gnd, { format: "plain" });
  t.is(utterances[0].selector, "p");
});

test("a link embedded in a larger flow falls back to the enclosing block's selector, not its own href", (t) => {
  const gnd = parseMarkup('<p>See <a href="chapter1.xhtml">chapter 1</a>.</p>', undefined, {
    textrefs: true,
  });
  const utterances = extractUtterances(gnd, { format: "plain" });
  t.is(utterances.length, 2);
  for (const utterance of utterances) t.is(utterance.selector, "p");
});

// The hoist-collision case (object.ts never merges the link's href into
// the block's own textref) plus the ancestor fallback above, combined: the
// block's selector survives on the <p> node for attachSelectors() to find.
test("a link as a block's sole content falls back to the block's own selector", (t) => {
  const gnd = parseMarkup('<p><a href="chapter1.xhtml">Chapter 1</a></p>', undefined, { textrefs: true });
  const [utterance] = extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Chapter 1");
  t.is(utterance.selector, "p");
});
