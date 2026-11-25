import "../domSetup.js";
import test from "ava";
import { GuidedNavigationObject } from "@readium/shared";
import { parseMarkup } from "@readium/guided-navigation";
import { extractUtterances, extractUtterancesWithSources } from "../../src/utterances/extractUtterances.js";
import { resolveBoundaryLocate } from "../../src/utterances/boundaryLocate.js";

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

test("an aria-substituted link gets no locate when textrefs was off at generation time", async (t) => {
  const inputs = [
    '<p>Into speech. <a href="#gloss" aria-labelledby="lbl">*</a></p><p>synthesized speech can be created.</p><span id="lbl" hidden>see glossary entry</span>',
    '<p><a href="#ref" aria-label="See note one.">[1]</a> Into speech.</p>',
  ];
  for (const html of inputs) {
    for (const mode of ["structure", "sentence"] as const) {
      const utterances = await extractUtterances(parseMarkup(html), { format: "plain", segmentation: { mode } });
      t.true(utterances.length > 0);
      t.true(utterances.every((u) => u.locate === undefined && u.offsets === undefined), `${mode}: ${html}`);
    }
  }
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

test("a link merging into text of a script written without spaces is never spaced from it across formatting, in SSML", async (t) => {
  const gnd = parseMarkup('<p lang="ja">東京<em>大学</em><a href="x.html">リンク</a>です。</p>');
  const [utterance] = await extractUtterances(gnd, { format: "ssml" });
  t.is(utterance.ssml, "東京<emphasis>大学</emphasis>リンクです。");
});

test("a link keeps the source's spaces around it in text of a script written without spaces", async (t) => {
  const gnd = parseMarkup('<p lang="ja">東京 <a href="x.html">リンク</a> へ行った。</p>');
  for (const format of ["plain", "ssml"] as const) {
    const [utterance] = await extractUtterances(gnd, { format });
    t.is(utterance.plain ?? utterance.ssml, "東京 リンク へ行った。", format);
  }
});

// The hoist-collision case (@readium/guided-navigation's object.ts never
// merges the link's href into the block's own textref) plus the ancestor
// fallback above, combined: the block's cssSelector survives on the <p> node
// for attachLocate() to find.
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
  // @readium/guided-navigation textref.test.ts case for why.
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
  t.deepEqual(fr.offsets?.[0], { start: 6, end: 13, locate: fr.locate });
  t.deepEqual(after.offsets?.[0], { start: 14, end: 20, locate: after.locate });
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

test("a sentence under a text-fragment range textref without a CSS selector is quoted, not located on the range", async (t) => {
  const gnd = [
    GuidedNavigationObject.deserialize({
      role: ["paragraph"],
      textref: "c.xhtml#:~:text=Call%20me,the%20world.",
      text: { plain: "Call me Ishmael. Some years ago, I thought I would sail about and see the world." },
    })!,
  ];
  const [first] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(first.offsets![0].locate, {
    href: "c.xhtml",
    text: { highlight: "Call me Ishmael.", after: " Some years ago, I thought I would sail about and see the world." },
  });
});

test("a sentence and its words under a prefixed range textref without a CSS selector are quoted in the paragraph's text alone", async (t) => {
  const gnd = [
    GuidedNavigationObject.deserialize({
      role: ["paragraph"],
      textref: "c.xhtml#:~:text=the%20sea.-,Call%20me,the%20world.",
      text: { plain: "Call me Ishmael. Some years ago, I thought I would sail about and see the world." },
    })!,
  ];
  const [first] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(first.offsets![0].locate, {
    href: "c.xhtml",
    text: { highlight: "Call me Ishmael.", after: " Some years ago, I thought I would sail about and see the world." },
  });
  t.is(resolveBoundaryLocate(first, 0, "Call".length)?.locate.text?.before, "");
});

test("an abbreviation's expansion is quoted with its node's text around it", async (t) => {
  for (const [textref, scope] of [
    ["c.xhtml#:~:text=Call,world.", {}],
    ["c.xhtml#b", { cssSelector: "#b" }],
  ] as const) {
    const gnd = [
      GuidedNavigationObject.deserialize({
        role: ["paragraph"],
        textref,
        text: { plain: "Call Dr. Smith to the world.", ssml: 'Call <sub alias="Doctor">Dr.</sub> Smith to the world.' },
      })!,
    ];
    const [utterance] = await extractUtterances(gnd, { format: "plain", interruptions: { abbreviation: "inline" } });
    const alias = utterance.offsets!.find((offset) => offset.locate.text?.highlight === "Dr.");
    t.deepEqual(alias?.locate, { ...scope, href: "c.xhtml", text: { highlight: "Dr.", before: "Call ", after: " Smith to the world." } }, textref);
  }
});

test("a paragraph under a section's text-fragment range textref without a CSS selector is quoted, not located on the section's range", async (t) => {
  const gnd = [
    GuidedNavigationObject.deserialize({
      role: ["section"],
      textref: "c.xhtml#:~:text=Call%20me,the%20end.",
      children: [{ role: ["paragraph"], text: { plain: "Call me Ishmael. Some years ago, I went to the end." } }],
    })!,
  ];
  const [structure] = await extractUtterances(gnd, { format: "plain" });
  t.deepEqual(structure.locate, { href: "c.xhtml", text: { highlight: "Call me Ishmael. Some years ago, I went to the end." } });

  const [first] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(first.offsets![0].locate, { href: "c.xhtml", text: { highlight: "Call me Ishmael.", after: " Some years ago, I went to the end." } });
  t.deepEqual(resolveBoundaryLocate(first, "Call ".length, "me".length)?.locate, {
    href: "c.xhtml",
    text: { highlight: "me", before: "Call ", after: " Ishmael. Some years ago, I went to the end." },
  });
});

test("a link without a textref is quoted in its paragraph's text alone, under a prefixed range textref", async (t) => {
  const gnd = [
    GuidedNavigationObject.deserialize({
      role: ["paragraph"],
      textref: "c.xhtml#:~:text=the%20sea.-,Call%20me,the%20world.",
      text: { plain: "Call me Ishmael, said the sailor to the world.", ssml: 'Call me Ishmael, said the sailor to <readium:link id="l1" />.' },
      children: [{ id: "l1", role: ["link"], text: { plain: "the world" } }],
    })!,
  ];
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  const link = utterance.offsets!.find((offset) => offset.locate.text?.highlight === "the world");
  t.deepEqual(link?.locate, { href: "c.xhtml", text: { highlight: "the world", before: "Call me Ishmael, said the sailor to ", after: "." } });
});

test("a link whose text its paragraph repeats is quoted with the paragraph's text around it", async (t) => {
  const gnd = parseMarkup('<p>Go <a href="x">here</a> and <a href="y">here</a> now.</p>', undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  const links = utterance.offsets!.filter((offset) => offset.locate.text?.highlight === "here");
  t.deepEqual(
    links.map((offset) => offset.locate.text),
    [
      { highlight: "here", before: "Go ", after: " and here now." },
      { highlight: "here", before: "Go here and ", after: " now." },
    ],
  );
});

test("a link's offsets and its paragraph's stop at a page break inside the link", async (t) => {
  const gnd = parseMarkup('<p>He said <a href="x">go <span role="doc-pagebreak" id="p12" aria-label="12"></span>now</a> please.</p>', undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.deepEqual(
    utterance.offsets!.map((offset) => offset.locate.text),
    [
      { highlight: "He said", after: " go" },
      { highlight: "go", before: "He said " },
      { highlight: "now", before: " ", after: " please." },
      { highlight: "please.", before: " now " },
    ],
  );
});

test("an abbreviation's locate in a link is quoted with its paragraph's text around it", async (t) => {
  const gnd = parseMarkup(
    '<p>Call <a href="x" lang="fr"><abbr title="Organisation">OMS</abbr></a> and <a href="y" lang="fr"><abbr title="Organisation">OMS</abbr></a> now.</p>',
    undefined,
    { textrefs: true },
  );
  const utterances = await extractUtterances(gnd, { format: "plain", language: "always" });
  t.deepEqual(
    utterances.filter((utterance) => utterance.plain!.includes("Organisation")).map((utterance) => utterance.locate?.text),
    [
      { highlight: "OMS", before: "Call ", after: " and OMS now." },
      { highlight: "OMS", before: "Call OMS and ", after: " now." },
    ],
  );
});

test("a sentence's locate quotes the page's text it reads, with the text around it", async (t) => {
  const gnd = parseMarkup('<p>Go <a href="x">home</a>. Go <a href="y">home</a>.</p>', undefined, { textrefs: true });
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((utterance) => utterance.locate?.text),
    [
      { highlight: "Go home.", after: " Go home." },
      { highlight: "Go home.", before: "Go home. " },
    ],
  );
});
