import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";

const html =
  '<p>Before the break <span epub:type="pagebreak" title="5"></span> and before the note' +
  '<a epub:type="noteref" href="#n1">1</a> end of sentence.</p>' +
  '<aside epub:type="footnote" id="n1"><p>The note.</p></aside>';

async function plain(inlineContextualization?: ("noteref" | "pagebreak")[]): Promise<(string | undefined)[]> {
  const utterances = await extractUtterances(parseMarkup(html), { format: "plain", inlineContextualization });
  return utterances.map((u) => u.plain);
}

test("inlineContextualization defaults to deferring both pagebreak and noteref past the sentence", async (t) => {
  t.deepEqual(await plain(), ["Before the break and before the note end of sentence.", "Page 5", "The note."]);
});

test("inlineContextualization: [\"pagebreak\"] speaks the pagebreak mid-sentence, still defers the note", async (t) => {
  t.deepEqual(await plain(["pagebreak"]), ["Before the break Page 5 and before the note end of sentence.", "The note."]);
});

test("inlineContextualization: [\"noteref\"] speaks the note mid-sentence, still defers the pagebreak", async (t) => {
  t.deepEqual(await plain(["noteref"]), ["Before the break and before the note The note. end of sentence.", "Page 5"]);
});

test("inlineContextualization with both roles speaks both mid-sentence", async (t) => {
  t.deepEqual(await plain(["noteref", "pagebreak"]), ["Before the break Page 5 and before the note The note. end of sentence."]);
});

const sentencesHtml =
  '<p>First with a note<a epub:type="noteref" href="#n1">1</a> here. Second <span epub:type="pagebreak" title="5"></span> breaks.</p>' +
  '<aside epub:type="footnote" id="n1"><p>The note.</p></aside>';

const betweenHtml =
  '<p>Ends with a note.<a epub:type="noteref" href="#n1">1</a> Then another. Last one.<span epub:type="pagebreak" title="5"></span> Final.</p>' +
  '<aside epub:type="footnote" id="n1"><p>The note.</p></aside>';

async function sentences(markup: string, format: "plain" | "ssml") {
  return extractUtterances(parseMarkup(markup, undefined, { textrefs: true }), {
    format,
    inlineContextualization: ["noteref", "pagebreak"],
    contextualize: ["footnote", "pagebreak"],
    segmentation: { mode: "sentence" },
  });
}

test("sentence segmentation keeps an inline announcement inside the sentence holding it", async (t) => {
  t.deepEqual((await sentences(sentencesHtml, "plain")).map((u) => u.plain), [
    "First with a note Start of the footnote. The note. End of the footnote. here.",
    "Second Pagebreak. Page 5. breaks.",
  ]);
});

test("sentence segmentation closes the previous sentence with an inline announcement between two sentences", async (t) => {
  t.deepEqual((await sentences(betweenHtml, "plain")).map((u) => u.plain), [
    "Ends with a note. Start of the footnote. The note. End of the footnote.",
    "Then another.",
    "Last one. Pagebreak. Page 5.",
    "Final.",
  ]);
});

test("sentence segmentation keeps inline announcements whole in SSML too", async (t) => {
  t.deepEqual((await sentences(sentencesHtml, "ssml")).map((u) => u.ssml), [
    "First with a note Start of the footnote. The note. End of the footnote. here.",
    "Second Pagebreak. Page 5. breaks.",
  ]);
});

test("a sentence split around an inline note quotes its own text and the note's, not the announcement", async (t) => {
  const [first] = await sentences(sentencesHtml, "plain");
  t.deepEqual(first.offsets?.map((offset) => offset.locate.text?.highlight), ["First with a note", "The note.", "here."]);
});

async function deferredSentences(markup: string, format: "plain" | "ssml") {
  const utterances = await extractUtterances(parseMarkup(markup), {
    format,
    contextualize: ["footnote", "pagebreak"],
    segmentation: { mode: "sentence" },
  });
  return utterances.map((u) => u[format]);
}

test("sentence segmentation speaks a deferred note or pagebreak right after the sentence holding it", async (t) => {
  t.deepEqual(await deferredSentences(sentencesHtml, "plain"), [
    "First with a note here.",
    "Start of the footnote. The note. End of the footnote.",
    "Second breaks.",
    "Pagebreak. Page 5.",
  ]);
  t.deepEqual(await deferredSentences(betweenHtml, "plain"), [
    "Ends with a note.",
    "Start of the footnote. The note. End of the footnote.",
    "Then another.",
    "Last one.",
    "Pagebreak. Page 5.",
    "Final.",
  ]);
});

test("sentence segmentation speaks a deferred pagebreak opening a paragraph before it", async (t) => {
  t.deepEqual(await deferredSentences('<p><span epub:type="pagebreak" title="5"></span>Starts a page. Then more.</p>', "plain"), [
    "Pagebreak. Page 5.",
    "Starts a page.",
    "Then more.",
  ]);
});

test("sentence segmentation places deferred notes and pagebreaks the same way in SSML", async (t) => {
  t.deepEqual(await deferredSentences(sentencesHtml, "ssml"), [
    "First with a note here.",
    "Start of the footnote. The note. End of the footnote.",
    "Second breaks.",
    "Pagebreak. Page 5.",
  ]);
});
