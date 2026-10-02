import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import { GuidedNavigationObject } from "@readium/shared";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";

// Aria substitution is only known on parseMarkup() output, never on GND
// deserialized from JSON — so none of this is expressible in fixtures/.

function parse(html: string): { doc: Document; gnd: GuidedNavigationObject[] } {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const gnd = parseMarkup(doc.querySelector("body")!, undefined, { textrefs: { roles: true, domRange: true } });
  return { doc, gnd };
}

function roundTrip(gnd: GuidedNavigationObject[]): GuidedNavigationObject[] {
  return GuidedNavigationObject.deserializeArray(JSON.parse(JSON.stringify(gnd.map((node) => node.serialize()))))!;
}

test("a merged paragraph's offset for an aria-label link is the link's own box, not a quote", async (t) => {
  const { doc, gnd } = parse(`<body><p>Into speech. <a href="#ref" aria-label="Source: Wikipedia">[source]</a></p></body>`);
  const [parsed] = await extractUtterances(gnd, { format: "plain" });
  t.is(parsed.plain, "Into speech. Source: Wikipedia");
  const linkOffset = parsed.offsets!.find((offset) => offset.start === 0 && offset.end === "Source: Wikipedia".length)!;
  t.falsy(linkOffset.locate.text);
  t.is(doc.querySelector(linkOffset.locate.cssSelector!)?.tagName, "A");

  const [deserialized] = await extractUtterances(roundTrip(gnd), { format: "plain" });
  const fallbackOffset = deserialized.offsets!.find((offset) => offset.start === 0 && offset.end === "Source: Wikipedia".length)!;
  t.is(fallbackOffset.locate.text?.highlight, "Source: Wikipedia");
});

test("segmentation: sentence locates a paragraph's leading aria-label link on its own box", async (t) => {
  const { doc, gnd } = parse(`<body><p><a href="#ref" aria-label="See note one.">[1]</a> Into speech.</p></body>`);
  const parsed = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(parsed.map((u) => u.plain), ["See note one.", "Into speech."]);
  const link = parsed[0];
  t.falsy(link.locate?.text);
  t.is(doc.querySelector(link.locate!.cssSelector!)?.tagName, "A");

  const deserialized = await extractUtterances(roundTrip(gnd), { format: "plain", segmentation: { mode: "sentence" } });
  t.is(deserialized[0].plain, "See note one.");
  t.is(deserialized[0].locate?.text?.highlight, "See note one.");
});

test("segmentation: sentence never merges an aria-labelledby substitution into the next paragraph", async (t) => {
  const { gnd } = parse(
    `<body><p>Into speech. <a href="#gloss" aria-labelledby="lbl">*</a></p>` +
      `<p>synthesized speech can be created.</p><span id="lbl" hidden>see glossary entry</span></body>`,
  );
  const parsed = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(parsed.map((u) => u.plain), ["Into speech. see glossary entry", "synthesized speech can be created."]);

  const deserialized = await extractUtterances(roundTrip(gnd), { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(deserialized.map((u) => u.plain), ["Into speech. see glossary entry synthesized speech can be created."]);
});

test("segmentation: sentence locates every sentence of a multi-sentence aria-label on the link's own box", async (t) => {
  const { doc, gnd } = parse(`<body><p><a href="#ref" aria-label="First part. Second part.">[source]</a></p></body>`);
  const parsed = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(parsed.map((u) => u.plain), ["First part.", "Second part."]);
  for (const u of parsed) {
    t.falsy(u.locate?.text);
    t.is(doc.querySelector(u.locate!.cssSelector!)?.tagName, "A");
  }

  const deserialized = await extractUtterances(roundTrip(gnd), { format: "plain", segmentation: { mode: "sentence" } });
  t.true(deserialized.every((u) => u.locate?.text !== undefined));
});
