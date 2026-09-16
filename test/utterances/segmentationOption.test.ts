import "../gnd/setup.js";
import test from "ava";
import { parseMarkup } from "../../src/gnd/converter.js";
import { decodeTextref } from "../../src/gnd/textrefFragment.js";
import { extractUtterances, extractUtterancesWithSources } from "../../src/utterances/extractUtterances.js";

const html = "<p>Hello there. This has two sentences.</p><p>And a second paragraph.</p>";

test("segmentation defaults to structure (one utterance per block)", async (t) => {
  const gnd = parseMarkup(html);
  const utterances = await extractUtterances(gnd, { format: "plain" });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["Hello there. This has two sentences.", "And a second paragraph."]
  );
});

test("segmentation: structure is explicitly equivalent to the default", async (t) => {
  const gnd = parseMarkup(html);
  const defaultUtterances = await extractUtterances(gnd, { format: "plain" });
  const structureUtterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "structure" } });
  t.deepEqual(structureUtterances, defaultUtterances);
});

test("segmentation: sentence splits a multi-sentence paragraph into one utterance per sentence", async (t) => {
  const gnd = parseMarkup("<p>Hello there. This has two sentences.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["Hello there. ", "This has two sentences."]
  );
});

test("segmentation: sentence gives each split sentence its own locate/offsets, not the whole paragraph's", async (t) => {
  const doc = new DOMParser().parseFromString(
    "<body><p>Hello there. This has two sentences.</p></body>",
    "text/html"
  );
  const root = doc.querySelector("p")!;
  const gnd = parseMarkup(root, undefined, { textrefs: { roles: true, domRange: true } });
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["Hello there. ", "This has two sentences."]
  );

  const [first, second] = utterances;
  t.is(first.locate?.text?.highlight, "Hello there. ");
  t.is(second.locate?.text?.highlight, "This has two sentences.");
  t.not(first.locate?.text?.highlight, second.locate?.text?.highlight);

  // offsets are positions in the *source* paragraph's own text, not each
  // split sentence's own (so the second sentence's start is non-zero).
  t.is(first.offsets?.length, 1);
  t.deepEqual(first.offsets?.[0], { start: 0, end: first.plain!.length, locate: first.locate });
  t.is(second.offsets?.length, 1);
  t.deepEqual(second.offsets?.[0], {
    start: first.plain!.length,
    end: first.plain!.length + second.plain!.length,
    locate: second.locate,
  });
});

test("segmentation: sentence does not split on an abbreviation", async (t) => {
  const gnd = parseMarkup("<p>Mr. Smith stayed. He was tired.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["Mr. Smith stayed. ", "He was tired."]
  );
});

test("segmentation: sentence leaves a single-sentence paragraph untouched", async (t) => {
  const gnd = parseMarkup("<p>Just one sentence.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["Just one sentence."]
  );
});

test("segmentation: sentence never merges sentences across separate paragraphs", async (t) => {
  const gnd = parseMarkup("<p>First one. First two.</p><p>Second one. Second two.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["First one. ", "First two.", "Second one. ", "Second two."]
  );
});

test("segmentation: sentence does not split synthesized contextualization/label text", async (t) => {
  const gnd = parseMarkup(
    `<table><tr><td>Cell.</td></tr></table>`,
    undefined,
    { textrefs: false }
  );
  const utterances = await extractUtterances(gnd, {
    format: "plain",
    segmentation: { mode: "sentence" },
    contextualize: ["table"],
  });
  const label = utterances.find((u) => !u.offsets);
  t.truthy(label);
  t.true((label?.plain ?? "").includes("."));
});

test("segmentation: sentence splits ssml the same way as plain when there's no markup to preserve", async (t) => {
  const gnd = parseMarkup("<p>Hello there. This has two sentences.</p>");
  const utterances = await extractUtterances(gnd, { format: "ssml", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.ssml),
    ["Hello there. ", "This has two sentences."]
  );
});

test("segmentation: sentence re-wraps a <lang> span whose inner text spans a sentence boundary", async (t) => {
  const gnd = parseMarkup('<p>See <span lang="fr">Bonjour. Ça va?</span> after that.</p>');
  const utterances = await extractUtterances(gnd, {
    format: "ssml",
    segmentation: { mode: "sentence" },
    language: "always",
  });
  t.deepEqual(
    utterances.map((u) => u.ssml),
    [
      'See <lang xml:lang="fr">Bonjour. </lang>',
      '<lang xml:lang="fr">Ça va?</lang> ',
      "after that.",
    ]
  );
});

test("segmentation: sentence attaches a self-closing tag to the sentence following it", async (t) => {
  const gnd = parseMarkup("<p>Line one. <br>Line two after a break.</p>");
  const utterances = await extractUtterances(gnd, { format: "ssml", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.ssml),
    ["Line one. ", "<break/>Line two after a break."]
  );
});

test("segmentation: sentence leaves single-sentence ssml untouched", async (t) => {
  const gnd = parseMarkup("<p>Just one sentence.</p>");
  const utterances = await extractUtterances(gnd, { format: "ssml", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.ssml),
    ["Just one sentence."]
  );
});

test("segmentation: sentence keeps blockStarts on only the first sentence of a split paragraph", async (t) => {
  const gnd = parseMarkup("<p>First. Second.</p><p>Third.</p>");
  const { utterances, blockStarts } = await extractUtterancesWithSources(gnd, {
    format: "plain",
    segmentation: { mode: "sentence" },
  });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["First. ", "Second.", "Third."]
  );
  t.deepEqual(blockStarts, [true, false, true]);
});

// "Zqxk." is fabricated so these test our own passthrough/scoping, not a
// real gap in a third-party abbreviation list.
test("segmentation: sentence honors suppressions for the utterance's own language", async (t) => {
  const gnd = parseMarkup("<p>We visited Zqxk. University last year.</p>");
  const withoutSuppressions = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.true(withoutSuppressions.length > 1, "baseline: an unrecognized token isn't specially suppressed");

  const withSuppressions = await extractUtterances(gnd, {
    format: "plain",
    segmentation: { mode: "sentence", suppressions: { en: ["Zqxk."] } },
  });
  t.deepEqual(
    withSuppressions.map((u) => u.plain),
    ["We visited Zqxk. University last year."]
  );
});

test("segmentation: sentence reconstructs a sentence split across two sibling paragraphs", async (t) => {
  const gnd = parseMarkup("<p>This sentence continues</p><p>across two paragraphs.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["This sentence continues across two paragraphs."]
  );
});

test("segmentation: sentence reconstruction spans both source elements in the locator", async (t) => {
  const doc = new DOMParser().parseFromString(
    "<body><div><p>This sentence continues</p><p>across two paragraphs.</p></div></body>",
    "text/html"
  );
  const root = doc.querySelector("div")!;
  const gnd = parseMarkup(root, undefined, { textrefs: { roles: true, domRange: true } });
  const { utterances, sources } = await extractUtterancesWithSources(gnd, {
    format: "plain",
    segmentation: { mode: "sentence" },
  });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["This sentence continues across two paragraphs."]
  );
  const [source] = sources;
  t.true(Array.isArray(source), "sourced from a [first, last] node span");
  const [first, last] = source as [{ textref?: string }, { textref?: string }];
  const firstRef = decodeTextref(first);
  const lastRef = decodeTextref(last);
  t.truthy(firstRef?.domRange);
  t.truthy(lastRef?.domRange);
  t.not(firstRef!.domRange!.start.cssSelector, lastRef!.domRange!.start.cssSelector);

  const locate = utterances[0].locate;
  t.truthy(locate?.domRange);
  t.is(locate!.domRange!.start.cssSelector, firstRef!.domRange!.start.cssSelector);
  t.is(locate!.domRange!.end!.cssSelector, lastRef!.domRange!.end?.cssSelector ?? lastRef!.domRange!.start.cssSelector);

  // Both selectors must actually resolve to the two distinct paragraphs —
  // selectors are anchored at the document, not at `root`.
  const paragraphs = root.querySelectorAll("p");
  t.is(doc.querySelector(locate!.domRange!.start.cssSelector), paragraphs[0]);
  t.is(doc.querySelector(locate!.domRange!.end!.cssSelector), paragraphs[1]);
});

test("segmentation: sentence reconstruction's offsets attribute each half of the sentence to its own element", async (t) => {
  const doc = new DOMParser().parseFromString(
    "<body><div><p>This sentence continues</p><p>across two paragraphs.</p></div></body>",
    "text/html"
  );
  const root = doc.querySelector("div")!;
  const gnd = parseMarkup(root, undefined, { textrefs: { roles: true, domRange: true } });
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.is(utterances.length, 1);

  const offsets = utterances[0].offsets;
  t.is(offsets?.length, 2);
  // Each half is its contributing paragraph's *whole own* text, so its own
  // source-relative range is simply 0..its own length.
  t.is(offsets![0].locate.text?.highlight, "This sentence continues");
  t.deepEqual(offsets![0], { start: 0, end: "This sentence continues".length, locate: offsets![0].locate });
  t.is(offsets![1].locate.text?.highlight, "across two paragraphs.");
  t.deepEqual(offsets![1], { start: 0, end: "across two paragraphs.".length, locate: offsets![1].locate });

  const cssA = offsets![0].locate.cssSelector;
  const cssB = offsets![1].locate.cssSelector;
  t.truthy(cssA);
  t.truthy(cssB);
  t.not(cssA, cssB);

  const paragraphs = root.querySelectorAll("p");
  t.is(doc.querySelector(cssA!), paragraphs[0]);
  t.is(doc.querySelector(cssB!), paragraphs[1]);
});

test("segmentation: sentence does not falsely merge a genuine abbreviation-adjacent sentence end across paragraphs", async (t) => {
  const gnd = parseMarkup("<p>He works at Acme Inc.</p><p>Tomorrow starts early.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["He works at Acme Inc.", "Tomorrow starts early."]
  );
});

test("segmentation: sentence reuses suppression logic across a paragraph boundary", async (t) => {
  const gnd = parseMarkup("<p>Contact Mr.</p><p>Smith for details.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["Contact Mr. Smith for details."]
  );
});

test("segmentation: sentence reconstruction chains across three sibling paragraphs", async (t) => {
  const gnd = parseMarkup("<p>One sentence</p><p>split across</p><p>three paragraphs.</p>");
  const { utterances, sources } = await extractUtterancesWithSources(gnd, {
    format: "plain",
    segmentation: { mode: "sentence" },
  });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["One sentence split across three paragraphs."]
  );
  t.true(Array.isArray(sources[0]));
});

test("segmentation: sentence merges only a paragraph's trailing incomplete sentence into its neighbor, leaving its earlier complete sentences untouched", async (t) => {
  const gnd = parseMarkup("<p>First one. First two. Third begins here</p><p>and finishes here.</p>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["First one. ", "First two. ", "Third begins here and finishes here."]
  );
});

test("segmentation: sentence reconstruction never double-spaces a boundary that already carries a real space", async (t) => {
  const gnd = parseMarkup("<div>This fragment already ends with a space </div><div>so no second one should be added.</div>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["This fragment already ends with a space so no second one should be added."]
  );
});

test("segmentation: sentence never reconstructs across a table cell boundary", async (t) => {
  const gnd = parseMarkup("<table><tr><td>eSpeak</td><td>Jonathan Duddington</td></tr></table>");
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["eSpeak", "Jonathan Duddington"]
  );
});

test("segmentation: sentence does not apply another language's suppressions to this utterance's language", async (t) => {
  const gnd = parseMarkup("<p>We visited Zqxk. University last year.</p>");
  const withoutSuppressions = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  const withOtherLanguageSuppressions = await extractUtterances(gnd, {
    format: "plain",
    segmentation: { mode: "sentence", suppressions: { fr: ["Zqxk."] } },
  });
  t.deepEqual(withOtherLanguageSuppressions, withoutSuppressions);
});
