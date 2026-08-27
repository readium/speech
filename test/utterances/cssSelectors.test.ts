import "../gnd/setup.js";
import test from "ava";
import { parseMarkup } from "../../src/gnd/converter.js";
import { extractUtterances, extractUtterancesWithSources } from "../../src/utterances/extractUtterances.js";

test("extractUtterances attaches selector from the source node's textref", (t) => {
  const gnd = parseMarkup("<p>Hello.</p>", undefined, { cssSelectors: true });
  const [utterance] = extractUtterances(gnd, { format: "plain" });
  t.is(utterance.selector, "p");
});

test("extractUtterances leaves selector undefined when cssSelectors was off at generation time", (t) => {
  const gnd = parseMarkup("<p>Hello.</p>");
  const [utterance] = extractUtterances(gnd, { format: "plain" });
  t.is(utterance.selector, undefined);
});

test("extractUtterancesWithSources also attaches selector, alongside sources", (t) => {
  const gnd = parseMarkup("<p>Hello.</p>", undefined, { cssSelectors: true });
  const { utterances } = extractUtterancesWithSources(gnd, { format: "plain" });
  t.is(utterances[0].selector, "p");
});
