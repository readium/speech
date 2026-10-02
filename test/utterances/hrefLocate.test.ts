import "../domSetup.js";
import test from "ava";
import { GuidedNavigationObject } from "@readium/shared";
import { encodeCssSelectorFragment, parseMarkup } from "@readium/guided-navigation";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import { resolveBoundaryLocate } from "../../src/utterances/boundaryLocate.js";

// Two fixed-layout pages, each converted on its own and stitched in reading order.
const stitchedPages = (page1: string, page2: string) => [
  ...parseMarkup(page1, "text/html", { textrefs: { roles: true }, href: "page1.xhtml" }),
  ...parseMarkup(page2, "text/html", { textrefs: { roles: true }, href: "page2.xhtml" }),
];

test("a sentence cut across two stitched pages is one utterance whose pieces keep their own href", async (t) => {
  const gnd = stitchedPages("<p>This sentence continues</p>", "<p>across two pages.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(utterances.map((u) => u.plain), ["This sentence continues across two pages."]);
  t.deepEqual(utterances[0].offsets?.map((o) => o.locate.href), ["page1.xhtml", "page2.xhtml"]);
  t.is(utterances[0].locate?.href, "page1.xhtml");
});

test("a word on the second page resolves to that page's href", async (t) => {
  const gnd = stitchedPages("<p>This sentence continues</p>", "<p>across two pages.</p>");
  const [utterance] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  const first = resolveBoundaryLocate(utterance, utterance.plain!.indexOf("continues"), "continues".length);
  const second = resolveBoundaryLocate(utterance, utterance.plain!.indexOf("pages"), "pages".length);
  t.is(first?.locate.href, "page1.xhtml");
  t.is(second?.word, "pages");
  t.is(second?.locate.href, "page2.xhtml");
});

test("skipping pagebreak keeps a page label out of a stitched sentence", async (t) => {
  const gnd = stitchedPages(
    "<p>This sentence continues</p>",
    '<span role="doc-pagebreak" aria-label="12"></span><p>across two pages.</p>',
  );
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" }, skip: ["pagebreak"] });
  t.deepEqual(utterances.map((u) => u.plain), ["This sentence continues across two pages."]);
  t.deepEqual(utterances[0].offsets?.map((o) => o.locate.href), ["page1.xhtml", "page2.xhtml"]);
});

test("href-qualified #css() textrefs from a deserialized document carry their href", async (t) => {
  const gnd = [
    GuidedNavigationObject.deserialize({
      role: ["body"],
      textref: "chapter.xhtml",
      children: [{ role: ["paragraph"], text: "Hello world.", textref: `chapter.xhtml${encodeCssSelectorFragment("body > p")}` }],
    })!,
  ];
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.deepEqual(utterance.locate, { href: "chapter.xhtml", cssSelector: "body > p" });
  const word = resolveBoundaryLocate(utterance, utterance.plain!.indexOf("world"), "world".length);
  t.is(word?.locate.href, "chapter.xhtml");
  t.is(word?.locate.cssSelector, "body > p");
});

test("an href-qualified #id without a matching node id gives no locate", async (t) => {
  const gnd = [
    GuidedNavigationObject.deserialize({
      role: ["body"],
      textref: "chapter.xhtml",
      children: [{ role: ["paragraph"], text: "Hello world.", textref: "chapter.xhtml#p1" }],
    })!,
  ];
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.locate, undefined);
  t.is(utterance.offsets, undefined);
});
