import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import { ReadiumSpeechNavigator, SpeechPreferences } from "../../build/index.js";
import { MockEngine } from "./mockEngine.js";

// What a reader submits for separate notes and page breaks settings: custom
// verbosity seeded from the selected preset, each role never, inline or after.
type Placement = "never" | "inline" | "after";

const NOTE_ROLES = ["noteref", "footnote"];
const PAGEBREAK_ROLES = ["pagebreak"];

const html =
  '<p>First with a note<a epub:type="noteref" href="#n1">1</a> here. Second <span epub:type="pagebreak" title="5"></span> breaks.</p>' +
  '<aside epub:type="footnote" id="n1"><p>The note.</p></aside>' +
  "<p>Next paragraph.</p>";

async function queue(preset: "few" | "most", notes: Placement, pageBreaks: Placement): Promise<(string | undefined)[]> {
  const navigator = new ReadiumSpeechNavigator(new MockEngine());
  await navigator.submitPreferences(new SpeechPreferences({ verbosity: preset, segmentation: "sentence" }));
  await navigator.loadGndContent(parseMarkup(html));

  const placed = [...NOTE_ROLES, ...PAGEBREAK_ROLES];
  const skip = navigator.settings.skip.filter((role) => !placed.includes(role));
  const contextualize = navigator.settings.contextualize.filter((role) => !placed.includes(role));
  const inlineContextualization: string[] = [];
  for (const [placement, roles] of [[notes, NOTE_ROLES], [pageBreaks, PAGEBREAK_ROLES]] as const) {
    if (placement === "never") skip.push(...roles);
    else contextualize.push(...roles);
    if (placement === "inline") inlineContextualization.push(roles[0]);
  }

  await navigator.submitPreferences(new SpeechPreferences({
    verbosity: "custom",
    segmentation: "sentence",
    skip,
    contextualize,
    inlineContextualization,
  }));
  return navigator.getContentQueue().map((u) => u.plain);
}

for (const preset of ["few", "most"] as const) {
  test(`custom from '${preset}': never skips notes and page breaks`, async (t) => {
    t.deepEqual(await queue(preset, "never", "never"), ["First with a note here.", "Second breaks.", "Next paragraph."]);
  });

  test(`custom from '${preset}': inline speaks them inside their sentence`, async (t) => {
    t.deepEqual(await queue(preset, "inline", "inline"), [
      "First with a note Start of the footnote. The note. End of the footnote. here.",
      "Second Pagebreak. Page 5. breaks.",
      "Next paragraph.",
    ]);
  });

  test(`custom from '${preset}': after speaks them after their sentence`, async (t) => {
    t.deepEqual(await queue(preset, "after", "after"), [
      "First with a note here.",
      "Start of the footnote. The note. End of the footnote.",
      "Second breaks.",
      "Pagebreak. Page 5.",
      "Next paragraph.",
    ]);
  });

  test(`custom from '${preset}': notes and page breaks are placed independently`, async (t) => {
    t.deepEqual(await queue(preset, "after", "inline"), [
      "First with a note here.",
      "Start of the footnote. The note. End of the footnote.",
      "Second Pagebreak. Page 5. breaks.",
      "Next paragraph.",
    ]);
    t.deepEqual(await queue(preset, "never", "after"), ["First with a note here.", "Second breaks.", "Pagebreak. Page 5.", "Next paragraph."]);
  });
}
