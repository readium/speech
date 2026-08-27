import "./setup.js";
import test from "ava";
import { parseMarkup } from "../../src/gnd/converter.js";
import { encodeCssSelectorFragment, decodeCssSelectorFragment } from "../../src/gnd/cssSelectorFragment.js";

test("cssSelectors option is off by default — no textref is generated", (t) => {
  const [result] = parseMarkup("<p>Hello.</p>");
  t.is(result.textref, undefined);
});

test("cssSelectors: true generates a selector-directive textref for every node with a role", (t) => {
  const [result] = parseMarkup("<p>Hello.</p>", undefined, { cssSelectors: true });
  t.true(result.textref?.startsWith("#:~:selector(type=CssSelector,value="));
  t.is(decodeCssSelectorFragment(result.textref), "p");
});

test("cssSelectors: [roles] restricts generation to the listed roles", (t) => {
  const input = "<p>Hello.</p><h1>Title</h1>";
  const [p, h1] = parseMarkup(input, undefined, { cssSelectors: ["heading1"] });
  t.is(p.textref, undefined);
  t.true(decodeCssSelectorFragment(h1.textref)?.length ? true : false);
});

test("encodeCssSelectorFragment/decodeCssSelectorFragment round-trip", (t) => {
  const selector = 'li:nth-child(2) > a[href="chapter1.xhtml"]';
  t.is(decodeCssSelectorFragment(encodeCssSelectorFragment(selector)), selector);
});

test("decodeCssSelectorFragment returns undefined for an unrelated textref", (t) => {
  t.is(decodeCssSelectorFragment("chapter1.xhtml#intro"), undefined);
  t.is(decodeCssSelectorFragment(undefined), undefined);
});
