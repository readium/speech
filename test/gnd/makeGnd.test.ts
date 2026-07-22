import "./setup.js";
import test from "ava";
import { makeGnd } from "../../src/gnd/makeGnd.js";
import { parseMarkup } from "../../src/gnd/converter.js";

test("makeGnd wraps parseMarkup's output as-is for a full document", (t) => {
  const input = "<!DOCTYPE html><html><head><title>t</title></head><body><p>Hello.</p></body></html>";
  t.deepEqual(makeGnd(input).guided, parseMarkup(input));
});

test("makeGnd wraps parseMarkup's output as-is for a bodyless fragment", (t) => {
  const input = '<section epub:type="chapter" xml:lang="fr">Bonjour.</section>';
  t.deepEqual(makeGnd(input, "application/xhtml+xml").guided, parseMarkup(input, "application/xhtml+xml"));
});

test("makeGnd never fabricates a body node for a bodyless fragment", (t) => {
  const input = '<section epub:type="chapter" xml:lang="fr">Bonjour.</section>';
  const doc = makeGnd(input, "application/xhtml+xml");
  t.false(doc.guided.some((node) => node.role?.includes("body")));
});
