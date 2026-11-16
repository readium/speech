import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import type { GuidedNavigationObject } from "@readium/shared";
import { loadFixtureInput, loadManifest } from "../testUtils.js";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import { descriptionOf } from "../../src/utterances/nodeFields.js";
import { plainTextOf } from "../../src/utterances/tableStructure.js";
import type { ExtractUtterancesOptions } from "../../src/utterances/types.js";

const optionSets: Record<string, ExtractUtterancesOptions> = {
  structure: {},
  sentence: { segmentation: { mode: "sentence" } },
  inline: { interruptions: { noteref: "inline", pagebreak: "inline", abbreviation: "inline" } },
  after: { interruptions: { noteref: "after", pagebreak: "after", abbreviation: "after" }, segmentation: { mode: "sentence" } },
  language: { language: "always", segmentation: { mode: "sentence" } },
  contextualized: { contextualize: ["table", "figure", "footnote", "pagebreak", "list", "cell", "rowheader"], segmentation: { mode: "sentence" } },
};

// Every text an offset can be in: each node's own text, and a caption's description.
function sourceTexts(nodes: GuidedNavigationObject[], out: string[] = []): string[] {
  for (const node of nodes) {
    out.push(plainTextOf(node));
    const description = descriptionOf(node);
    if (description !== undefined) out.push(description);
    if (node.children) sourceTexts(node.children, out);
  }
  return out;
}

for (const entry of loadManifest()) {
  test(`fixture "${entry.id}": every quoted offset is its range of a source text`, async (t) => {
    const gnd = parseMarkup(loadFixtureInput(entry), undefined, { textrefs: true });
    const texts = sourceTexts(gnd);
    for (const [name, options] of Object.entries(optionSets)) {
      for (const format of ["plain", "ssml"] as const) {
        for (const utterance of await extractUtterances(gnd, { ...options, format })) {
          for (const { start, end, locate } of utterance.offsets ?? []) {
            const highlight = locate.text?.highlight;
            if (highlight === undefined) continue;
            t.true(texts.some((text) => text.slice(start, end) === highlight), `${name} ${format}: ${JSON.stringify(highlight)} at ${start}-${end}`);
          }
        }
      }
    }
    t.pass();
  });
}
