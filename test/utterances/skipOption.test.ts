import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";

const html =
  '<p>Text with a note<a epub:type="noteref" href="#n1">1</a>.</p>' +
  '<aside epub:type="footnote" id="n1"><p>The note.</p></aside>' +
  "<aside><p>A sidebar.</p></aside>";

async function plain(skip: ("aside" | "footnote" | "noteref")[]): Promise<(string | undefined)[]> {
  const utterances = await extractUtterances(parseMarkup(html), { format: "plain", skip });
  return utterances.map((u) => u.plain);
}

test("skipping aside still speaks a footnote aside, which drops its aside role", async (t) => {
  t.deepEqual(await plain(["aside"]), ["Text with a note.", "The note."]);
});

test("skipping footnote and noteref skips the note, not the sidebar", async (t) => {
  t.deepEqual(await plain(["footnote", "noteref"]), ["Text with a note.", "A sidebar."]);
});
