import "../domSetup.js";
import test from "ava";
import { GuidedNavigationObject } from "@readium/shared";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import type { GndRole } from "@readium/guided-navigation";

function gndWithDescription(text: unknown): GuidedNavigationObject[] {
  return GuidedNavigationObject.deserializeArray([
    { role: ["figure"], textref: "#fig", description: { text }, children: [{ text: "Figure body", textref: "#fig-p" }] },
    { role: ["table"], textref: "#tbl", description: { text }, children: [{ text: "Cell", textref: "#tbl-c" }] },
  ])!;
}

const ssmlOnly = { ssml: "A <emphasis>cat</emphasis> on a mat" };
const plainOnly = { plain: "A cat on a mat" };

for (const contextualize of [[], ["figure", "table"]] as GndRole[][]) {
  for (const format of ["plain", "ssml"] as const) {
    test(`a description with only ssml is spoken like its plain equivalent (format: ${format}, contextualize: [${contextualize}])`, async (t) => {
      const fromSsml = await extractUtterances(gndWithDescription(ssmlOnly), { format, contextualize });
      const fromPlain = await extractUtterances(gndWithDescription(plainOnly), { format, contextualize });
      t.deepEqual(fromSsml.map((u) => u.plain ?? u.ssml), fromPlain.map((u) => u.plain ?? u.ssml));
      t.true(fromSsml.some((u) => (u.plain ?? u.ssml)!.includes("A cat on a mat")));
    });
  }
}
