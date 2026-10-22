import "../domSetup.js";
import test from "ava";
import { GuidedNavigationObject } from "@readium/shared";
import { parseMarkup } from "@readium/guided-navigation";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import type { Interruption } from "../../src/utterances/types.js";

const html =
  '<p>Before the break <span epub:type="pagebreak" title="5"></span> and before the note' +
  '<a epub:type="noteref" href="#n1">1</a> end of sentence.</p>' +
  '<aside epub:type="footnote" id="n1"><p>The note.</p></aside>';

async function plain(interruptions?: { noteref?: Interruption; pagebreak?: Interruption }): Promise<(string | undefined)[]> {
  const utterances = await extractUtterances(parseMarkup(html), { format: "plain", interruptions });
  return utterances.map((u) => u.plain);
}

test("interruptions default to deferring both pagebreak and noteref past the sentence", async (t) => {
  t.deepEqual(await plain(), ["Before the break and before the note end of sentence.", "Page 5", "The note."]);
});

test("an inline pagebreak is spoken mid-sentence, the note still deferred", async (t) => {
  t.deepEqual(await plain({ pagebreak: "inline" }), ["Before the break Page 5 and before the note end of sentence.", "The note."]);
});

test("an inline noteref speaks the note mid-sentence, the pagebreak still deferred", async (t) => {
  t.deepEqual(await plain({ noteref: "inline" }), ["Before the break and before the note The note. end of sentence.", "Page 5"]);
});

test("both inline are spoken mid-sentence", async (t) => {
  t.deepEqual(await plain({ noteref: "inline", pagebreak: "inline" }), ["Before the break Page 5 and before the note The note. end of sentence."]);
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
    interruptions: { noteref: "inline", pagebreak: "inline" },
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

const inLanguage = (language: string, markup: string) => `<div lang="${language}">${markup}</div>`;

async function spoken(markup: string, format: "plain" | "ssml", options: Parameters<typeof extractUtterances>[1]) {
  const utterances = await extractUtterances(parseMarkup(markup, undefined, { textrefs: true }), { format, ...options });
  return utterances.map((u) => [u[format], u.language]);
}

const sentenceOptions = { contextualize: ["footnote", "pagebreak"], segmentation: { mode: "sentence" } } as const;

test("sentence segmentation speaks deferred announcements after their sentence in another language than the catalog's", async (t) => {
  t.deepEqual(await spoken(inLanguage("fr", sentencesHtml), "plain", sentenceOptions), [
    ["First with a note here.", "fr"],
    ["Start of the footnote.", "en"],
    ["The note.", "fr"],
    ["End of the footnote.", "en"],
    ["Second breaks.", "fr"],
    ["Pagebreak. Page 5.", "en"],
  ]);
});

test("sentence segmentation splits a sentence around an inline announcement in another language than the catalog's in plain text", async (t) => {
  t.deepEqual(await spoken(inLanguage("fr", sentencesHtml), "plain", { ...sentenceOptions, interruptions: { noteref: "inline", pagebreak: "inline" } }), [
    ["First with a note", "fr"],
    ["Start of the footnote.", "en"],
    ["The note.", "fr"],
    ["End of the footnote.", "en"],
    ["here.", "fr"],
    ["Second", "fr"],
    ["Pagebreak. Page 5.", "en"],
    ["breaks.", "fr"],
  ]);
});

test("an inline pagebreak in another language than the catalog's is its own utterance in plain text", async (t) => {
  t.deepEqual(await spoken(inLanguage("fr", html), "plain", { interruptions: { pagebreak: "inline" } }), [
    ["Before the break", "fr"],
    ["Page 5", "en"],
    ["and before the note end of sentence.", "fr"],
    ["The note.", "fr"],
  ]);
});

for (const format of ["plain", "ssml"] as const) {
  test(`sentence segmentation keeps an inline announcement whole in content sharing the catalog's primary language (${format})`, async (t) => {
    t.deepEqual(await spoken(inLanguage("en-US", sentencesHtml), format, { ...sentenceOptions, interruptions: { noteref: "inline", pagebreak: "inline" } }), [
      ["First with a note Start of the footnote. The note. End of the footnote. here.", "en-US"],
      ["Second Pagebreak. Page 5. breaks.", "en-US"],
    ]);
  });

  test(`an inline pagebreak merges into content sharing the catalog's primary language (${format})`, async (t) => {
    t.deepEqual(await spoken(inLanguage("en-US", html), format, { interruptions: { pagebreak: "inline" } }), [
      ["Before the break Page 5 and before the note end of sentence.", "en-US"],
      ["The note.", "en-US"],
    ]);
  });
}

const emphasisHtml = '<p>One sentence. Second <em>bold <span epub:type="pagebreak" title="5"></span> word</em> breaks.</p>';

test("sentence segmentation splits SSML whose piece ends in a tag at its plain text's boundaries", async (t) => {
  t.deepEqual(await spoken(emphasisHtml, "ssml", sentenceOptions), [
    ["One sentence.", "en"],
    ["Second <emphasis>bold </emphasis><emphasis> word</emphasis> breaks.", "en"],
    ["Pagebreak. Page 5.", "en"],
  ]);
});

const enLang = (ssml: string) => `<lang xml:lang="en">${ssml}</lang>`;

test("sentence segmentation wraps a deferred note's announcements in another language than the catalog's in lang tags in SSML", async (t) => {
  t.deepEqual(await spoken(inLanguage("fr", sentencesHtml), "ssml", sentenceOptions), [
    ["First with a note here.", "fr"],
    [`${enLang("Start of the footnote.")} The note. ${enLang("End of the footnote.")}`, "fr"],
    ["Second breaks.", "fr"],
    ["Pagebreak. Page 5.", "en"],
  ]);
});

test("sentence segmentation keeps a sentence whole around an inline announcement in another language, in lang tags, in SSML", async (t) => {
  t.deepEqual(await spoken(inLanguage("fr", sentencesHtml), "ssml", { ...sentenceOptions, interruptions: { noteref: "inline", pagebreak: "inline" } }), [
    [`First with a note ${enLang("Start of the footnote.")} The note. ${enLang("End of the footnote.")} here.`, "fr"],
    [`Second ${enLang("Pagebreak. Page 5.")} breaks.`, "fr"],
  ]);
});

test("an inline pagebreak in another language than the catalog's is wrapped in a lang tag in SSML", async (t) => {
  t.deepEqual(await spoken(inLanguage("fr", html), "ssml", { interruptions: { pagebreak: "inline" } }), [
    [`Before the break ${enLang("Page 5")} and before the note end of sentence.`, "fr"],
    ["The note.", "fr"],
  ]);
});

test("a lang-wrapped inline announcement keeps the sentence's SSML well-formed", async (t) => {
  t.deepEqual(await spoken(inLanguage("fr", emphasisHtml), "ssml", { ...sentenceOptions, interruptions: { pagebreak: "inline" } }), [
    ["One sentence.", "fr"],
    [`Second <emphasis>bold </emphasis>${enLang("Pagebreak. Page 5.")}<emphasis> word</emphasis> breaks.`, "fr"],
  ]);
});

test("a contextualized text reference with no targets reads only its own text", async (t) => {
  const gnd = [
    GuidedNavigationObject.deserialize({
      role: ["paragraph"],
      children: [{ text: "See " }, { role: ["glossref"], text: "term" }, { text: " here." }],
    })!,
  ];
  (gnd[0].children![1] as { children?: GuidedNavigationObject[] }).children = [];
  for (const glossref of ["inline", "after", "never"] as const) {
    const utterances = await extractUtterances(gnd, { format: "plain", contextualize: ["glossref"], interruptions: { glossref } });
    t.deepEqual(utterances.map((u) => u.plain), ["See ", "term", " here."], glossref);
  }
});
