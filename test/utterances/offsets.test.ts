import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import type { GuidedNavigationObject } from "@readium/shared";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import { plainTextOf } from "../../src/utterances/tableStructure.js";
import type { ReadiumSpeechUtterance } from "../../src/utterance.js";
import { resolveBoundaryLocate } from "../../src/utterances/boundaryLocate.js";

test("a plain utterance gets one offset spanning its whole text", async (t) => {
  const gnd = parseMarkup("<p>Hello world.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.deepEqual(utterance.offsets, [{ start: 0, end: utterance.plain!.length, locate: utterance.locate }]);
});

test("a language-split fragment gets its own offset at its position in the shared node's text", async (t) => {
  const gnd = parseMarkup('<p>Hello <span lang="fr">Bonjour</span> world.</p>', undefined, { textrefs: true });
  const utterances = await extractUtterances(gnd, { format: "plain", language: "always" });
  t.deepEqual(
    utterances.map((u) => [u.plain, u.offsets?.map(({ start, end }) => [start, end])]),
    [["Hello", [[0, 5]]], ["Bonjour", [[6, 13]]], ["world.", [[14, 20]]]],
  );
});

test("sentence segmentation advances a split sentence's offset instead of restarting it at 0", async (t) => {
  const gnd = parseMarkup("<p>Hello there. This has two sentences.</p>", undefined, { textrefs: { roles: true, domRange: true } });
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  const [first, second] = utterances;
  t.deepEqual(first.offsets?.[0], { start: 0, end: first.plain!.length, locate: first.locate });
  // The one-character gap is the separating space: part of neither sentence's own text.
  t.deepEqual(second.offsets?.[0], {
    start: first.plain!.length + 1,
    end: first.plain!.length + 1 + second.plain!.length,
    locate: second.locate,
  });
});

test("a purely synthesized announcement has no offsets", async (t) => {
  const gnd = parseMarkup("<table><tr><td>Cell.</td></tr></table>", undefined, { textrefs: false });
  const utterances = await extractUtterances(gnd, { format: "plain", contextualize: ["table"] });
  const label = utterances.find((u) => u.plain?.includes("table"));
  t.truthy(label);
  t.is(label?.offsets, undefined);
});

test("an empty rowheader'd cell still gets offsets for its header wording, not just the value-folding roles' real content", async (t) => {
  const gnd = parseMarkup(
    `<table><tr><th>Engine</th><th>Author</th></tr><tr><th scope="row">eSpeak</th><td></td></tr></table>`,
    undefined,
    { textrefs: { roles: true } }
  );
  const utterances = await extractUtterances(gnd, { format: "plain", language: "always" });
  const emptyCell = utterances.find((u) => u.plain === "Author: ");
  t.truthy(emptyCell?.offsets);
});

test("a header-contextualized cell's offset is a position in the cell's own text", async (t) => {
  const gnd = parseMarkup("<table><tr><th>Name</th></tr><tr><td>Ada</td></tr></table>", undefined, { textrefs: true });
  const utterances = await extractUtterances(gnd, { format: "plain" });
  const cell = utterances.find((u) => u.plain === "Name: Ada");
  t.deepEqual(cell?.offsets?.map(({ start, end }) => ({ start, end })), [{ start: 0, end: 3 }]);
});

test("a contextualized figure caption's offset is a position in the caption's own text", async (t) => {
  const gnd = parseMarkup("<figure><img src='a.png' alt=''><figcaption>A cat</figcaption></figure>", undefined, { textrefs: true });
  const utterances = await extractUtterances(gnd, { format: "plain", contextualize: ["figure"] });
  const caption = utterances.find((u) => u.plain?.includes("A cat"));
  t.deepEqual(caption?.offsets?.map(({ start, end }) => ({ start, end })), [{ start: 0, end: 5 }]);
});

test("an SSML utterance's text quotes and offsets are its plain text, without markup", async (t) => {
  const cases = [
    { html: '<p lang="ja">東京<em>大学</em><a href="x.html">リンク</a>です。</p>', highlights: ["東京大学", "リンク", "です。"] },
    { html: '<p>Text (<a role="doc-noteref" href="#n">1</a> <em>)</em> after.</p><aside id="n" role="doc-footnote">Note.</aside>', highlights: ["Text", "Note.", "after."] },
  ];
  for (const { html, highlights } of cases) {
    const [utterance] = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format: "ssml", interruptions: { noteref: "inline" } });
    t.deepEqual(utterance.offsets?.map((offset) => offset.locate.text?.highlight), highlights, html);
    t.deepEqual(utterance.offsets?.map((offset) => offset.end - offset.start), highlights.map((h) => h.length), html);
  }
});

test("a node split around placeholders has each piece's offset at its position in the node's own text", async (t) => {
  const cases = [
    {
      html: '<p>She joined the <abbr title="World Health Organization">W.H.O.</abbr> and then left.</p>',
      interruptions: { abbreviation: "inline" as const },
      expected: [
        { highlight: "She joined the", start: 0, end: 14 },
        { highlight: "W.H.O.", start: 15, end: 21 },
        { highlight: "and then left.", start: 22, end: 36 },
      ],
    },
    {
      html: '<p>She joined<a epub:type="noteref" href="#n1">1</a> and then left.</p><aside epub:type="footnote" id="n1"><p>N.</p></aside>',
      interruptions: {},
      expected: [
        { highlight: "She joined", start: 0, end: 10 },
        { highlight: "and then left.", start: 11, end: 25 },
      ],
    },
  ];
  for (const { html, interruptions, expected } of cases) {
    for (const mode of ["structure", "sentence"] as const) {
      for (const format of ["plain", "ssml"] as const) {
        const [utterance] = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format, interruptions, segmentation: { mode } });
        const offsets = utterance.offsets?.map(({ start, end, locate }) => ({ highlight: locate.text?.highlight, start, end }));
        t.deepEqual(offsets, expected, `${mode} ${format}: ${html}`);
      }
    }
  }
});

test("sentences split out of a language-split fragment have offsets in the shared node's text", async (t) => {
  const gnd = parseMarkup('<p>Hello there. <span lang="fr">Bonjour. Ça va.</span></p>', undefined, { textrefs: true });
  const utterances = await extractUtterances(gnd, { format: "plain", language: "always", segmentation: { mode: "sentence" } });
  t.deepEqual(
    utterances.map((u) => [u.plain, u.offsets?.map(({ start, end }) => [start, end])]),
    [["Hello there.", [[0, 12]]], ["Bonjour.", [[13, 21]]], ["Ça va.", [[22, 28]]]],
  );
});

const quoted = (u: ReadiumSpeechUtterance | undefined) => u?.offsets?.map(({ start, end, locate }) => [locate.text?.highlight, start, end]);

test("an inline note's brackets, not in the node's own text, are left out of its offsets", async (t) => {
  const html = '<p>Text (<a role="doc-noteref" href="#n">1</a>) after. Next.</p><aside id="n" role="doc-footnote">Note.</aside>';
  for (const format of ["plain", "ssml"] as const) {
    const [structure] = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format, interruptions: { noteref: "inline" } });
    t.deepEqual(quoted(structure), [["Text", 0, 4], ["Note.", 0, 5], ["after. Next.", 5, 17]], `structure ${format}`);
    const [first, second] = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format, interruptions: { noteref: "inline" }, segmentation: { mode: "sentence" } });
    t.deepEqual(quoted(first), [["Text", 0, 4], ["Note.", 0, 5], ["after.", 5, 11]], `sentence ${format}`);
    t.deepEqual(quoted(second), [["Next.", 12, 17]], `sentence ${format}`);
  }
});

test("sentences split out of a header-contextualized cell have offsets in the cell's own text", async (t) => {
  const html = "<table><tr><th>Name</th></tr><tr><td>Ada one. Ada two.</td></tr></table>";
  for (const format of ["plain", "ssml"] as const) {
    const utterances = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format, segmentation: { mode: "sentence" } });
    const first = utterances.find((u) => (u.plain ?? u.ssml)?.startsWith("Name: Ada"));
    const second = utterances.find((u) => (u.plain ?? u.ssml) === "Ada two.");
    t.deepEqual(quoted(first), [["Ada one.", 0, 8]], format);
    t.deepEqual(quoted(second), [["Ada two.", 9, 17]], format);
  }
});

const documents = [
  "<p>Hello world. Bye now.</p>",
  "<p>Tom &amp; Jerry. Bye now.</p>",
  "<p>Hello\n    world.   Bye <em>now</em>.</p>",
  '<p>Say <span lang="fr">oui</span>  <a role="doc-noteref" href="#n">1</a>   then. More.</p><aside id="n" role="doc-footnote">N.</aside>',
  '<p>Text (<a role="doc-noteref" href="#n">1</a>) after. Next.</p><aside id="n" role="doc-footnote">Note.</aside>',
  '<p>The <abbr title="World Health Organization">WHO</abbr> and the <abbr title="World Health Organization">WHO</abbr> met. Then.</p>',
  "<table><tr><th>Name</th></tr><tr><td>Ada one. Ada two.</td></tr></table>",
  '<p>Hello <a href="x.html">there. Link</a> end. Bye.</p>',
  "<p>Hello <b>world</b> and</p><p>more text. Bye.</p>",
];
const optionSets = [
  {},
  { segmentation: { mode: "sentence" as const } },
  { interruptions: { noteref: "inline" as const, abbreviation: "after" as const } },
  { interruptions: { noteref: "inline" as const, abbreviation: "inline" as const }, segmentation: { mode: "sentence" as const } },
];

test("plain and SSML extraction give the same offsets", async (t) => {
  for (const html of documents) {
    for (const options of optionSets) {
      const offsetsIn = async (format: "plain" | "ssml") =>
        (await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { ...options, format })).map((u) => u.offsets?.map(({ start, end }) => [start, end]));
      t.deepEqual(await offsetsIn("ssml"), await offsetsIn("plain"), `${JSON.stringify(options)} ${html}`);
    }
  }
});

function ownTexts(nodes: GuidedNavigationObject[], out: string[] = []): string[] {
  for (const node of nodes) {
    out.push(plainTextOf(node));
    if (node.children) ownTexts(node.children, out);
  }
  return out;
}

test("every quoted offset's highlight is its range of a node's own text", async (t) => {
  for (const html of documents) {
    const gnd = parseMarkup(html, undefined, { textrefs: true });
    const texts = ownTexts(gnd);
    for (const options of optionSets) {
      for (const format of ["plain", "ssml"] as const) {
        for (const u of await extractUtterances(gnd, { ...options, format })) {
          for (const { start, end, locate } of u.offsets ?? []) {
            const highlight = locate.text?.highlight;
            if (highlight === undefined) continue;
            t.true(texts.some((text) => text.slice(start, end) === highlight), `${format} ${JSON.stringify(options)} ${html}: ${highlight} ${start}-${end}`);
          }
        }
      }
    }
  }
});

test("an offset covering part of its node's own text quotes it with the text around it", async (t) => {
  const gnd = parseMarkup('<p>oui <span lang="fr">oui</span> oui.</p>', undefined, { textrefs: true });
  const utterances = await extractUtterances(gnd, { format: "plain", language: "always" });
  t.deepEqual(
    utterances.map((u) => u.offsets?.map(({ locate }) => locate.text)),
    [[{ highlight: "oui", after: " oui oui." }], [{ highlight: "oui", before: "oui ", after: " oui." }], [{ highlight: "oui.", before: "oui oui " }]],
  );
});

test("a sentence holding an inline link has the same offsets in sentence and structure modes", async (t) => {
  const html = '<p>Hi <a href="x.html">link</a> end.</p>';
  for (const format of ["plain", "ssml"] as const) {
    const [structure] = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format });
    const [sentence] = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format, segmentation: { mode: "sentence" } });
    t.deepEqual(quoted(structure), [["Hi", 0, 2], ["link", 0, 4], ["end.", 8, 12]], format);
    t.deepEqual(quoted(sentence), quoted(structure), format);
  }
});

test("offsets count UTF-16 code units, like the strings they index", async (t) => {
  const html = "<table><tr><th>Name</th></tr><tr><td>😀Ada. Bob.</td></tr></table>";
  for (const format of ["plain", "ssml"] as const) {
    const structure = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format });
    t.deepEqual(structure.find((u) => (u.plain ?? u.ssml)?.startsWith("Name: "))?.offsets?.map(({ start, end }) => [start, end]), [[0, 11]], format);
    const sentences = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format, segmentation: { mode: "sentence" } });
    t.deepEqual(quoted(sentences.find((u) => (u.plain ?? u.ssml) === "Bob.")), [["Bob.", 7, 11]], format);
  }
});

test("punctuation opening a node's text is in its offsets, like the punctuation closing it", async (t) => {
  for (const format of ["plain", "ssml"] as const) {
    const sentences = await extractUtterances(parseMarkup("<p>(Hello.) “Bye.”</p>", undefined, { textrefs: true }), { format, segmentation: { mode: "sentence" } });
    t.deepEqual(sentences.map(quoted), [[["(Hello.)", 0, 8]], [["“Bye.”", 9, 15]]], format);
  }
  const split = await extractUtterances(parseMarkup('<p>Hi <span lang="fr">(oui)</span> there.</p>', undefined, { textrefs: true }), { format: "plain", language: "always" });
  t.deepEqual(quoted(split.find((u) => u.plain === "(oui)")), [["(oui)", 3, 8]]);
});

test("an offset next to synthesized text quotes its own, so the synthesized words don't resolve to the page", async (t) => {
  const gnd = parseMarkup("<table><tr><th>Name</th></tr><tr><td>Ada</td></tr></table>", undefined, { textrefs: true });
  const cell = (await extractUtterances(gnd, { format: "plain" })).find((u) => u.plain === "Name: Ada")!;
  t.deepEqual(quoted(cell), [["Ada", 0, 3]]);
  t.is(resolveBoundaryLocate(cell, 0, 4), undefined);
  t.is(resolveBoundaryLocate(cell, 6, 3)?.locate.text?.highlight, "Ada");
});

test("a node too long to spread into a call still gets its offsets", async (t) => {
  const text = `${"word ".repeat(200000)}end.`;
  const [utterance] = await extractUtterances(parseMarkup(`<p>${text}</p>`, undefined, { textrefs: true }), { format: "plain" });
  t.deepEqual(utterance.offsets?.map(({ start, end }) => [start, end]), [[0, text.length]]);
});

test("text of nothing but punctuation is real content, with its offsets", async (t) => {
  for (const format of ["plain", "ssml"] as const) {
    const [utterance] = await extractUtterances(parseMarkup("<p>«»</p>", undefined, { textrefs: true }), { format });
    t.deepEqual(utterance.offsets?.map(({ start, end }) => [start, end]), [[0, 2]], format);
  }
});

test("text after a link is placed past the link's words, even where it repeats them", async (t) => {
  for (const format of ["plain", "ssml"] as const) {
    const [utterance] = await extractUtterances(parseMarkup('<p>end <a href="x.html">end</a> end</p>', undefined, { textrefs: true }), { format });
    t.deepEqual(quoted(utterance), [["end", 0, 3], ["end", 0, 3], ["end", 8, 11]], format);
  }
});

test("a cell's value is placed where its announcement reads it, even where its header repeats it", async (t) => {
  const html = "<table><tr><th>Value. Details</th></tr><tr><td>Value.</td></tr></table>";
  for (const format of ["plain", "ssml"] as const) {
    const utterances = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format, segmentation: { mode: "sentence" } });
    const [, , header, value] = utterances;
    t.deepEqual([header.plain ?? header.ssml, header.offsets], ["Value.", undefined], format);
    t.deepEqual([value.plain ?? value.ssml, quoted(value)], ["Details: Value.", [["Value.", 0, 6]]], format);
  }
});

test("a caption read in another language than its announcement keeps its offsets, wherever the announcement's punctuation falls", async (t) => {
  const gnd = parseMarkup("<figure><img src='a.png' alt=''><figcaption lang='fr'>Un chat</figcaption></figure>", undefined, { textrefs: true });
  const contextualizations = { figure: { block: { start: { labelled: "Figure: “{{ description }}”." } } } };
  const utterances = await extractUtterances(gnd, { format: "plain", language: "always", contextualize: ["figure"], contextualization: { contextualizations } });
  t.deepEqual(utterances.map((u) => [u.plain, quoted(u)]), [["Figure:", undefined], ["“Un chat”.", [["Un chat", 0, 7]]]]);
});

test("a page break's label, not in its node's text, doesn't take the place of the same text read after it", async (t) => {
  const html = '<p><span role="doc-pagebreak" id="p5" aria-label="5"></span>5 <span role="doc-pagebreak" id="p6" aria-label="6"></span>5</p>';
  for (const format of ["plain", "ssml"] as const) {
    const [utterance] = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format });
    t.deepEqual(quoted(utterance), [["5", 0, 1], ["5", 2, 3]], format);
  }
});
