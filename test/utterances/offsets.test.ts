import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";

test("a plain utterance gets one offset spanning its whole text", async (t) => {
  const gnd = parseMarkup("<p>Hello world.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.deepEqual(utterance.offsets, [{ start: 0, end: utterance.plain!.length, locate: utterance.locate }]);
});

test("a language-split fragment gets its own offset scoped to the shared node's text, not restarting at 0", async (t) => {
  const gnd = parseMarkup('<p>Hello <span lang="fr">Bonjour</span> world.</p>', undefined, { textrefs: true });
  const utterances = await extractUtterances(gnd, { format: "plain", language: "always" });
  const [before, fr, after] = utterances;
  t.deepEqual(before.offsets?.[0], { start: 0, end: before.plain!.length, locate: before.locate });
  t.deepEqual(fr.offsets?.[0], {
    start: before.plain!.length,
    end: before.plain!.length + fr.plain!.length,
    locate: fr.locate,
  });
  t.deepEqual(after.offsets?.[0], {
    start: before.plain!.length + fr.plain!.length,
    end: before.plain!.length + fr.plain!.length + after.plain!.length,
    locate: after.locate,
  });
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
    { html: '<p>Text (<a role="doc-noteref" href="#n">1</a> <em>)</em> after.</p><aside id="n" role="doc-footnote">Note.</aside>', highlights: ["Text (", "Note.", ") after."] },
  ];
  for (const { html, highlights } of cases) {
    const [utterance] = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format: "ssml", interruptions: { noteref: "inline" } });
    t.deepEqual(utterance.offsets?.map((offset) => offset.locate.text?.highlight), highlights, html);
    t.deepEqual(utterance.offsets?.map((offset) => offset.end - offset.start), highlights.map((h) => h.length), html);
  }
});
