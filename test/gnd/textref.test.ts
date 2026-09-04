import "./setup.js";
import test from "ava";
import { parseMarkup } from "../../src/gnd/converter.js";
import {
  encodeCssSelectorFragment,
  decodeCssSelectorFragment,
  encodeDomRangeFragment,
  decodeDomRangeFragment,
  encodeTextFragmentDirective,
  decodeTextFragmentDirective,
  decodeTextref,
} from "../../src/gnd/textrefFragment.js";

test("textrefs option is off by default — no textref is generated", (t) => {
  const [result] = parseMarkup("<p>Hello.</p>");
  t.is(result.textref, undefined);
});

test("textrefs: true generates a #css(...) textref for a node with no id", (t) => {
  const [result] = parseMarkup("<p>Hello.</p>", undefined, { textrefs: true });
  t.true(result.textref?.startsWith("#css("));
  t.is(decodeCssSelectorFragment(result.textref), "p");
});

test("textrefs prefers a bare #id over a generated selector", (t) => {
  const [result] = parseMarkup('<p id="par1">Hello.</p>', undefined, { textrefs: true });
  t.is(result.textref, "#par1");
});

test("textrefs: [roles] restricts generation to the listed roles", (t) => {
  const input = "<p>Hello.</p><h1>Title</h1>";
  const [p, h1] = parseMarkup(input, undefined, { textrefs: ["heading1"] });
  t.is(p.textref, undefined);
  t.true(decodeCssSelectorFragment(h1.textref)?.length ? true : false);
});

test("textrefs: true doesn't stop a role-less <thead>/<tbody> from being flattened away", (t) => {
  const html = `<table><thead><tr><th scope="col">Name</th></tr></thead><tbody><tr><td>Ada</td></tr><tr><td>Bob</td></tr></tbody></table>`;
  const [withRefs] = parseMarkup(html, undefined, { textrefs: { roles: true } });
  const [without] = parseMarkup(html);
  t.is(withRefs.children?.length, without.children?.length);
  t.true(withRefs.children?.every((c) => c.role?.includes("row")));
});

test("a link's own href textref is never clobbered by, nor clobbers, the parent's generated reference", (t) => {
  const input = '<ul><li><a href="chapter1.xhtml">Chapter 1</a></li></ul>';
  const [list] = parseMarkup(input, undefined, { textrefs: ["listItem"] });
  const [item] = list.children!;
  t.true(decodeCssSelectorFragment(item.textref)?.length ? true : false);
  const [link] = item.children!;
  t.is(link.textref, "chapter1.xhtml");
});

test("encodeCssSelectorFragment/decodeCssSelectorFragment round-trip", (t) => {
  const selector = 'li:nth-child(2) > a[href="chapter1.xhtml"]';
  t.is(decodeCssSelectorFragment(encodeCssSelectorFragment(selector)), selector);
});

test("decodeCssSelectorFragment returns undefined for an unrelated textref", (t) => {
  t.is(decodeCssSelectorFragment("chapter1.xhtml#intro"), undefined);
  t.is(decodeCssSelectorFragment(undefined), undefined);
});

test("encodeDomRangeFragment/decodeDomRangeFragment round-trip", (t) => {
  const domRange = {
    start: { cssSelector: "p", textNodeIndex: 0, charOffset: 3 },
    end: { cssSelector: "p", textNodeIndex: 0, charOffset: 8 },
  };
  t.deepEqual(decodeDomRangeFragment(encodeDomRangeFragment(domRange)), domRange);
});

test("decodeDomRangeFragment returns undefined for an unrelated or malformed textref", (t) => {
  t.is(decodeDomRangeFragment("chapter1.xhtml#intro"), undefined);
  t.is(decodeDomRangeFragment("#domrange(not-json)"), undefined);
  t.is(decodeDomRangeFragment(undefined), undefined);
});

test("decodeTextref prefers domRange, then css(), then a self-matching bare #id", (t) => {
  const domRange = { start: { cssSelector: "p", textNodeIndex: 0, charOffset: 0 } };
  t.deepEqual(decodeTextref({ textref: encodeDomRangeFragment(domRange) }), {
    cssSelector: "p",
    domRange,
  });
  t.deepEqual(decodeTextref({ textref: encodeCssSelectorFragment("p") }), { cssSelector: "p" });
  t.deepEqual(decodeTextref({ id: "par1", textref: "#par1" }), { cssSelector: "#par1" });
});

test("decodeTextref ignores a navigational textref that isn't this node's own id", (t) => {
  t.is(decodeTextref({ textref: "chapter1.xhtml" }), undefined);
  t.is(decodeTextref({ id: "par1", textref: "#note1" }), undefined);
  t.is(decodeTextref(undefined), undefined);
});

test("parseMarkup() given a live element computes a domRange resolving back to the exact text", (t) => {
  const doc = new DOMParser().parseFromString("<body><p>Hello <em>world</em>.</p></body>", "text/html");
  const p = doc.querySelector("p")!;

  const [result] = parseMarkup(p, undefined, { textrefs: { roles: true, domRange: true } });

  const ref = decodeTextref(result);
  t.truthy(ref?.domRange);
  const { start, end } = ref!.domRange!;
  t.truthy(end);

  const isText = (n: Node) => n.nodeType === 3;
  const startContainer = doc.querySelector(start.cssSelector)!;
  const startNode = Array.from(startContainer.childNodes).filter(isText)[start.textNodeIndex] as Text;
  t.is(startNode.nodeValue!.slice(start.charOffset), "Hello ");

  const endContainer = doc.querySelector(end!.cssSelector)!;
  const endNode = Array.from(endContainer.childNodes).filter(isText)[end!.textNodeIndex] as Text;
  t.is(endNode.nodeValue!.slice(0, end!.charOffset), ".");
});

test("parseMarkup() given a markup string never enables domRange, even when requested — it always parses a detached document", (t) => {
  const [result] = parseMarkup("<p>Hello.</p>", undefined, { textrefs: { roles: true, domRange: true } });
  t.true(decodeCssSelectorFragment(result.textref)?.length ? true : false);
  t.is(decodeDomRangeFragment(result.textref), undefined);
});

test("encodeTextFragmentDirective/decodeTextFragmentDirective round-trip", (t) => {
  t.deepEqual(decodeTextFragmentDirective(encodeTextFragmentDirective({ textStart: "Hello, world!" })), {
    textStart: "Hello, world!",
  });
  t.deepEqual(
    decodeTextFragmentDirective(encodeTextFragmentDirective({ textStart: "middle", prefix: "before-text", suffix: "after-text" })),
    { textStart: "middle", prefix: "before-text", suffix: "after-text" },
  );
  t.deepEqual(decodeTextFragmentDirective(encodeTextFragmentDirective({ textStart: "start", textEnd: "end" })), {
    textStart: "start",
    textEnd: "end",
  });
});

test("decodeTextFragmentDirective returns undefined for a textref with no directive", (t) => {
  t.is(decodeTextFragmentDirective("#css(p)"), undefined);
  t.is(decodeTextFragmentDirective(undefined), undefined);
});

test("textFragment: true appends a :~:text=... directive onto the existing #css(...) reference, unique text as-is", (t) => {
  const [result] = parseMarkup("<p>A unique sentence.</p>", undefined, { textrefs: { roles: true, textFragment: true } });
  t.true(result.textref!.startsWith("#css(p)"));
  t.true(result.textref!.includes(":~:text="));
  t.deepEqual(decodeTextFragmentDirective(result.textref), { textStart: "A unique sentence." });
});

test("textFragment: true composes with domRange: true — both encodings appear in one textref", (t) => {
  const doc = new DOMParser().parseFromString("<body><p>A unique sentence.</p></body>", "text/html");
  const p = doc.querySelector("p")!;
  const [result] = parseMarkup(p, undefined, { textrefs: { roles: true, domRange: true, textFragment: true } });
  t.truthy(decodeTextref(result)?.domRange);
  t.deepEqual(decodeTextFragmentDirective(result.textref), { textStart: "A unique sentence." });
});

test("textFragment: true works from a detached markup string too, unlike domRange", (t) => {
  const [result] = parseMarkup("<p>A unique sentence.</p>", undefined, { textrefs: { roles: true, textFragment: true } });
  t.deepEqual(decodeTextFragmentDirective(result.textref), { textStart: "A unique sentence." });
});

test("textFragment: true widens with prefix/suffix context when the text recurs, and gives up when it still can't disambiguate", (t) => {
  const input =
    "<p>Before one context</p><p>Repeated text</p><p>Middle marker</p><p>Repeated text</p><p>After two context</p>";
  const [, first, , second] = parseMarkup(input, undefined, { textrefs: { roles: true, textFragment: true } });

  const firstDirective = decodeTextFragmentDirective(first.textref);
  const secondDirective = decodeTextFragmentDirective(second.textref);
  t.truthy(firstDirective);
  t.truthy(secondDirective);
  t.notDeepEqual(firstDirective, secondDirective);

  // Recurring text with identical surrounding context on every occurrence
  // gives up — the existing #css(...) reference is left untouched.
  const identicalContext =
    "<p>A B C</p><p>Same</p><p>D E F</p><p>A B C</p><p>Same</p><p>D E F</p>";
  const nodes = parseMarkup(identicalContext, undefined, { textrefs: { roles: true, textFragment: true } });
  const [dupA, dupB] = nodes.filter((n) => n.text === "Same");
  t.is(decodeTextFragmentDirective(dupA.textref), undefined);
  t.is(decodeTextFragmentDirective(dupB.textref), undefined);
});

test("decodeTextref decodes text (highlight/before/after) from a text-fragment directive, independent of cssSelector/domRange", (t) => {
  const textref = `${encodeCssSelectorFragment("p")}${encodeTextFragmentDirective({ textStart: "middle", prefix: "before", suffix: "after" })}`;
  t.deepEqual(decodeTextref({ textref }), {
    cssSelector: "p",
    text: { highlight: "middle", before: "before", after: "after" },
  });

  const bare = encodeTextFragmentDirective({ textStart: "Hello." });
  t.deepEqual(decodeTextref({ textref: `#${bare}` }), { text: { highlight: "Hello." } });
});
