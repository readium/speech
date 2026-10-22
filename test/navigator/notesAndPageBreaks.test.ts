import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import { ReadiumSpeechNavigator, SpeechPreferences } from "../../build/index.js";
import { MockEngine } from "./mockEngine.js";

// What a reader submits for separate notes and page breaks settings: each never, inline or after,
// under whatever verbosity preset is selected.
type Interruption = "never" | "inline" | "after";

const html =
  '<p>First with a note<a epub:type="noteref" href="#n1">1</a> here. Second <span epub:type="pagebreak" title="5"></span> breaks.</p>' +
  '<aside epub:type="footnote" id="n1"><p>The note.</p></aside>' +
  "<p>Next paragraph.</p>";

async function queue(preset: "few" | "most", notes: Interruption, pageBreaks: Interruption) {
  const navigator = new ReadiumSpeechNavigator(new MockEngine());
  await navigator.loadGndContent(parseMarkup(html));
  await navigator.submitPreferences(new SpeechPreferences({
    verbosity: preset,
    segmentation: "sentence",
    interruptions: { noteref: notes, pagebreak: pageBreaks },
  }));
  return { verbosity: navigator.settings.verbosity, plain: navigator.getContentQueue().map((u) => u.plain) };
}

// "most" contextualizes footnotes and page breaks, "few" doesn't.
const note = { few: "The note.", most: "Start of the footnote. The note. End of the footnote." };
const pageBreak = { few: "Page 5", most: "Pagebreak. Page 5." };
const inlinePageBreak = { few: "Second Page 5 breaks.", most: "Second Pagebreak. Page 5. breaks." };

for (const preset of ["few", "most"] as const) {
  test(`'${preset}': never drops notes and page breaks, keeping the preset`, async (t) => {
    const { verbosity, plain } = await queue(preset, "never", "never");
    t.is(verbosity, preset);
    t.deepEqual(plain, ["First with a note here.", "Second breaks.", "Next paragraph."]);
  });

  test(`'${preset}': inline speaks them inside their sentence`, async (t) => {
    t.deepEqual((await queue(preset, "inline", "inline")).plain, [
      `First with a note ${note[preset]} here.`,
      inlinePageBreak[preset],
      "Next paragraph.",
    ]);
  });

  test(`'${preset}': after speaks them after their sentence`, async (t) => {
    t.deepEqual((await queue(preset, "after", "after")).plain, [
      "First with a note here.",
      note[preset],
      "Second breaks.",
      pageBreak[preset],
      "Next paragraph.",
    ]);
  });

  test(`'${preset}': notes and page breaks are placed independently`, async (t) => {
    t.deepEqual((await queue(preset, "never", "after")).plain, ["First with a note here.", "Second breaks.", pageBreak[preset], "Next paragraph."]);
  });
}
