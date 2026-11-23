import "../domSetup.js";
import test from "ava";
import { GuidedNavigationObject } from "@readium/shared";
import { parseMarkup } from "@readium/guided-navigation";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import { resolveUtteranceLocate, resolveUtteranceSourceText } from "../../src/utterances/utteranceLocate.js";
import type { ExtractUtterancesOptions } from "../../src/utterances/types.js";

test("resolveUtteranceLocate returns one locate per offset piece in sentence mode", async (t) => {
  const gnd = parseMarkup("<p>This sentence continues</p><p>across two paragraphs.</p>", undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence", reconstruct: true } });
  t.is(utterance.offsets?.length, 2);

  const locates = resolveUtteranceLocate(utterance, "sentence");
  t.is(locates.length, 2);
  t.is(locates[0], utterance.offsets![0].locate);
  t.is(locates[1], utterance.offsets![1].locate);
});

test("resolveUtteranceLocate returns a single locate in sentence mode when there's only one offset piece", async (t) => {
  const gnd = parseMarkup("<p>Hello world.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.is(utterance.offsets?.length, 1);

  const locates = resolveUtteranceLocate(utterance, "sentence");
  t.is(locates.length, 1);
  t.is(locates[0], utterance.offsets![0].locate);
});

test("resolveUtteranceLocate in sentence mode locates a label in a table cell on its element, as in running text", async (t) => {
  const content = 'See <a href="#x" id="a" aria-label="First">1</a> now.';
  const markups = { paragraph: `<p>${content}</p>`, cell: `<table><tr><th>Step</th></tr><tr><td>${content}</td></tr></table>` };
  for (const [kind, markup] of Object.entries(markups)) {
    const block = kind === "paragraph" ? "p" : "td";
    const gnd = parseMarkup(markup, undefined, { textrefs: { roles: true } });
    for (const format of ["plain", "ssml"] as const) {
      const utterances = await extractUtterances(gnd, { format, segmentation: { mode: "sentence" } });
      const utterance = utterances.find((u) => (u.plain ?? u.ssml)?.includes("First"))!;
      const locates = resolveUtteranceLocate(utterance, "sentence").map((locate) => [locate.cssSelector, locate.text?.highlight]);
      t.deepEqual(locates, [[block, "See"], ["#a", undefined], [block, "now."]], `${kind}, ${format}`);
    }
  }
});

test("resolveUtteranceLocate returns the utterance's own locate in structure mode, even with multiple offset pieces", (t) => {
  const utterance = {
    plain: "See note 1.",
    locate: { cssSelector: "p" },
    offsets: [
      { start: 0, end: 4, locate: { cssSelector: "p" } },
      { start: 4, end: 12, locate: { cssSelector: "a" } },
    ],
  };

  const locates = resolveUtteranceLocate(utterance, "structure");
  t.deepEqual(locates, [{ cssSelector: "p" }]);
});

test("resolveUtteranceLocate returns an empty array when the utterance has neither locate nor offsets", (t) => {
  const utterance = { plain: "Some synthesized announcement." };
  t.deepEqual(resolveUtteranceLocate(utterance, "structure"), []);
  t.deepEqual(resolveUtteranceLocate(utterance, "sentence"), []);
});

test("resolveUtteranceSourceText gives the page text an utterance reads, in every format and segmentation", async (t) => {
  const cases: { markup: string; options?: ExtractUtterancesOptions; texts: (string | undefined)[] }[] = [
    { markup: "<p>Add 1/2 cup of sugar.</p>", texts: ["Add 1/2 cup of sugar."] },
    { markup: "<p>Plants absorb CO2.</p>", options: { substitutions: { CO2: "carbon dioxide" } }, texts: ["Plants absorb CO2."] },
    ...(["inline", "after", "never"] as const).flatMap((abbreviation) =>
      [
        { markup: '<p>The <abbr title="World Health Organization">WHO</abbr> issued a warning.</p>', texts: ["The WHO issued a warning."] },
        { markup: '<p>The <abbr title="World Health Organization">WHO</abbr>.</p>', texts: ["The WHO."] },
        { markup: '<p>Ask the <abbr title="World Health Organization">WHO</abbr>, then wait.</p>', texts: ["Ask the WHO, then wait."] },
        { markup: '<p><abbr title="World Health Organization">WHO</abbr></p>', texts: ["WHO"] },
        { markup: '<p>(<abbr title="World Health Organization">WHO</abbr>)</p>', texts: ["(WHO)"] },
        {
          markup: '<p>The <abbr title="World Health Organization">WHO</abbr> and the <abbr title="United Nations">UN</abbr> met.</p>',
          texts: ["The WHO and the UN met."],
        },
      ].map((entry) => ({ ...entry, options: { interruptions: { abbreviation } } })),
    ),
    {
      markup: '<p>See <a href="#a" aria-label="First">1</a> <a href="#b" aria-label="Second">2</a> now.</p>',
      texts: ["See now."],
    },
    { markup: '<p>See <a href="#a" aria-label="First">1</a>, then stop.</p>', texts: ["See, then stop."] },
    {
      markup: '<p>Add a cup<span role="doc-pagebreak" aria-label="12"></span>, then stir.</p>',
      options: { interruptions: { pagebreak: "inline" } },
      texts: ["Add a cup, then stir."],
    },
    {
      markup: '<p>Add 1/2 cup of <span role="doc-pagebreak" aria-label="12"></span>sugar.</p>',
      options: { interruptions: { pagebreak: "inline" } },
      texts: ["Add 1/2 cup of sugar."],
    },
    { markup: "<table><tr><th>Name</th></tr><tr><td>Alice</td></tr></table>", texts: ["Name", "Alice"] },
    { markup: "<p>A <em>two</em>fold rise.</p>", texts: ["A twofold rise."] },
    { markup: "<p>It cost 12&#160;dollars.</p>", texts: ["It cost 12\u00a0dollars."] },
    { markup: '<p>Rated <span role="img" aria-label="four stars">****</span> overall.</p>', texts: ["Rated overall."] },
  ];
  for (const { markup, options, texts } of cases) {
    const gnd = parseMarkup(markup, undefined, { textrefs: { roles: true } });
    for (const format of ["plain", "ssml"] as const) {
      for (const mode of ["structure", "sentence"] as const) {
        const utterances = await extractUtterances(gnd, { ...options, format, segmentation: { mode } });
        t.deepEqual(utterances.map(resolveUtteranceSourceText), texts, `${format}, ${mode}: ${markup}`);
      }
    }
  }
});

test("resolveUtteranceSourceText gives the page text of a sentence reconstructed across elements", async (t) => {
  const gnd = parseMarkup("<p>This recipe needs</p><p>1/2 cup today.</p>", undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence", reconstruct: true } });
  t.is(utterance.plain, "This recipe needs ½ cup today.");
  t.is(resolveUtteranceSourceText(utterance), "This recipe needs 1/2 cup today.");
});

test("resolveUtteranceSourceText gives the page text of the voice-stamped copies a navigator's queue holds", async (t) => {
  const gnd = parseMarkup("<p>Add 1/2 cup of sugar.</p>", undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(resolveUtteranceSourceText({ ...utterance, voice: "Samantha", language: "en" }), "Add 1/2 cup of sugar.");
});

test("resolveUtteranceSourceText leaves out a reference's target read in its place, in every format and segmentation", async (t) => {
  const cases = [
    {
      markup: '<p>Prices rose<a epub:type="noteref" href="#n1">*</a> sharply that year.</p><aside epub:type="footnote" id="n1"><p>Adjusted for inflation.</p></aside>',
      role: "noteref",
      page: "Prices rose sharply that year.",
    },
    {
      markup: '<p>As shown in <a role="doc-biblioref" href="#b1">[1]</a>, speech works.</p><ol role="doc-bibliography"><li id="b1">Smith, J. Speech Synthesis. 2020.</li></ol>',
      role: "biblioref",
      page: "As shown in [1], speech works.",
    },
    {
      markup: '<p>Whisk the <a epub:type="glossref" href="#g1">roux</a> until golden.</p><dl epub:type="glossary"><dt id="g1">roux</dt><dd>Flour cooked in fat.</dd></dl>',
      role: "glossref",
      page: "Whisk the roux until golden.",
    },
    {
      markup: '<p><a epub:type="noteref" href="#n1">*</a> Prices rose sharply.</p><aside epub:type="footnote" id="n1"><p>Adjusted for inflation.</p></aside>',
      role: "noteref",
      page: "Prices rose sharply.",
    },
    {
      markup: '<p><a role="doc-biblioref" href="#b1">[1]</a> shows that speech works.</p><ol role="doc-bibliography"><li id="b1">Smith, J. Speech Synthesis. 2020.</li></ol>',
      role: "biblioref",
      page: "[1] shows that speech works.",
    },
    {
      markup: '<p><a epub:type="glossref" href="#g1">Roux</a> turns golden.</p><dl epub:type="glossary"><dt id="g1">roux</dt><dd>Flour cooked in fat.</dd></dl>',
      role: "glossref",
      page: "Roux turns golden.",
    },
  ];
  for (const { markup, role, page } of cases) {
    const doc = new DOMParser().parseFromString(`<body>${markup}</body>`, "text/html");
    const gnd = parseMarkup(doc.querySelector("body")!, undefined, { textrefs: { roles: true } });
    for (const format of ["plain", "ssml"] as const) {
      for (const segmentation of [{ mode: "structure" }, { mode: "sentence" }, { mode: "sentence", reconstruct: true }] as const) {
        const [utterance] = await extractUtterances(gnd, { format, segmentation, interruptions: { [role]: "inline" } });
        t.is(resolveUtteranceSourceText(utterance), page, `${role}, ${format}, ${JSON.stringify(segmentation)}`);
      }
    }
  }
});

test("resolveUtteranceSourceText leaves out an inline footnote from a sentence reconstructed across elements", async (t) => {
  const doc = new DOMParser().parseFromString(
    '<body><p>The committee met</p><p>in March<a epub:type="noteref" href="#n1">1</a> to vote.</p><aside epub:type="footnote" id="n1"><p>Minutes are archived.</p></aside></body>',
    "text/html",
  );
  const gnd = parseMarkup(doc.querySelector("body")!, undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence", reconstruct: true }, interruptions: { noteref: "inline" } });
  t.is(utterance.plain, "The committee met in March Minutes are archived. to vote.");
  t.is(resolveUtteranceSourceText(utterance), "The committee met in March to vote.");
});

test("resolveUtteranceSourceText gives a footnote read after its sentence its own text", async (t) => {
  const doc = new DOMParser().parseFromString(
    '<body><p>The plan failed<a epub:type="noteref" href="#n1">1</a>. It was revised.</p><aside epub:type="footnote" id="n1"><p>See the 1948 report.</p></aside></body>',
    "text/html",
  );
  const gnd = parseMarkup(doc.querySelector("body")!, undefined, { textrefs: { roles: true } });
  const utterances = await extractUtterances(gnd, { format: "plain", interruptions: { noteref: "after" } });
  t.deepEqual(utterances.map(resolveUtteranceSourceText), ["The plan failed. It was revised.", "See the 1948 report."]);
});

test("resolveUtteranceSourceText leaves out a label read in place of its element in a table cell, in every format and segmentation", async (t) => {
  const doc = new DOMParser().parseFromString(
    '<body><table><tr><th>Step</th></tr><tr><td>See <a href="#x" aria-label="First">1</a> now.</td></tr></table></body>',
    "text/html",
  );
  const gnd = parseMarkup(doc.querySelector("body")!, undefined, { textrefs: { roles: true } });
  for (const format of ["plain", "ssml"] as const) {
    for (const segmentation of [{ mode: "structure" }, { mode: "sentence" }, { mode: "sentence", reconstruct: true }] as const) {
      const utterances = await extractUtterances(gnd, { format, segmentation });
      const cell = utterances.find((u) => (u.plain ?? u.ssml)?.includes("First"))!;
      t.is(resolveUtteranceSourceText(cell), "See now.", `${format}, ${JSON.stringify(segmentation)}`);
    }
  }
});

test("resolveUtteranceSourceText spaces inline elements as their block's text does, in every format and segmentation", async (t) => {
  const cases = [
    { markup: '<p>Open<a href="#x">AI</a> tools.</p>', page: "OpenAI tools." },
    { markup: '<p><a href="#x">Open</a>AI tools.</p>', page: "OpenAI tools." },
    { markup: '<p><a href="#a">Open</a><a href="#b">AI</a> labs.</p>', page: "OpenAI labs." },
    { markup: '<p>Visit <a href="#x"><em>Open</em>AI</a> labs.</p>', page: "Visit OpenAI labs." },
    { markup: '<p>Read <a href="#x">the guide</a> now.</p>', page: "Read the guide now." },
    { markup: '<p>See <a href="#x">here</a>.</p>', page: "See here." },
  ];
  for (const { markup, page } of cases) {
    const gnd = parseMarkup(markup, undefined, { textrefs: { roles: true } });
    for (const format of ["plain", "ssml"] as const) {
      for (const segmentation of [{ mode: "structure" }, { mode: "sentence" }, { mode: "sentence", reconstruct: true }] as const) {
        const [utterance] = await extractUtterances(gnd, { format, segmentation });
        t.is(resolveUtteranceSourceText(utterance), page, `${markup}, ${format}, ${JSON.stringify(segmentation)}`);
      }
    }
  }
});

test("resolveUtteranceSourceText gives a sentence starting in an inline element whose text starts with whitespace its first character", async (t) => {
  const gnd = GuidedNavigationObject.deserializeArray([{
    textref: "#css(p)",
    text: { plain: "End. Next guide now.", ssml: 'End.<readium:link id="l1" /> now.' },
    children: [{ id: "l1", textref: "#css(a)", text: { plain: " Next guide" } }],
  }])!;
  for (const format of ["plain", "ssml"] as const) {
    const utterances = await extractUtterances(gnd, { format, segmentation: { mode: "sentence" } });
    t.deepEqual(utterances.map(resolveUtteranceSourceText), ["End.", "Next guide now."], format);
  }
});

test("resolveUtteranceSourceText reads an inline element's own text where its block's text differs from it", async (t) => {
  const cases = [
    { block: "End. First guide. Next guide now.", before: "End.", child: " First  guide. Next guide", page: ["End.", "First  guide.", "Next guide now."] },
    { block: "Read here now.", before: "Read ", child: "(here)", page: ["Read (here) now."] },
  ];
  for (const { block, before, child, page } of cases) {
    const gnd = GuidedNavigationObject.deserializeArray([{
      textref: "#css(p)",
      text: { plain: block, ssml: `${before}<readium:link id="l1" /> now.` },
      children: [{ id: "l1", textref: "#css(a)", text: { plain: child } }],
    }])!;
    for (const format of ["plain", "ssml"] as const) {
      const utterances = await extractUtterances(gnd, { format, segmentation: { mode: "sentence" } });
      t.deepEqual(utterances.map(resolveUtteranceSourceText), page, `${child}, ${format}`);
    }
  }
});

// parseMarkup() never repeats a placeholder ID, but GND from another producer may, hence hand-written GND.
test("resolveUtteranceSourceText places each occurrence of a repeated placeholder where it's read", async (t) => {
  const gnd = GuidedNavigationObject.deserializeArray([{
    textref: "#css(p)",
    text: { plain: "Read here. Then here.", ssml: 'Read <readium:link id="l1" />. Then <readium:link id="l1" />.' },
    children: [{ id: "l1", textref: "#css(a)", text: { plain: "here" } }],
  }])!;
  for (const format of ["plain", "ssml"] as const) {
    const utterances = await extractUtterances(gnd, { format, segmentation: { mode: "sentence" } });
    t.deepEqual(utterances.map(resolveUtteranceSourceText), ["Read here.", "Then here."], format);
  }
});

test("resolveUtteranceSourceText is undefined for text not on the page", async (t) => {
  const gnd = parseMarkup('<p>Into speech. <a href="#ref" aria-label="Source: Wikipedia, Speech synthesis">[source]</a></p>', undefined, {
    textrefs: { roles: true },
  });
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(utterances.map(resolveUtteranceSourceText), ["Into speech.", undefined]);
  t.is(resolveUtteranceSourceText({ plain: "Some synthesized announcement." }), undefined);
});
