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
