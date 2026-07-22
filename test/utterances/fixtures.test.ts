import "../gnd/setup.js";
import test from "ava";
import { loadManifest, loadFixture } from "../testUtils.js";
import { parseMarkup } from "../../src/gnd/converter.js";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import type { ExtractUtterancesOptions } from "../../src/utterances/types.js";

const manifest = loadManifest();

function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((acc: Record<string, unknown>, key) => {
        acc[key] = sortKeysDeep((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }
  return value;
}

for (const entry of manifest) {
  const fixture = loadFixture(entry.id);

  for (const { options, utterances } of fixture.utterances.cases) {
    test(`fixture "${entry.id}": extractUtterances matches utterances.json's case ${JSON.stringify(options)}`, (t) => {
      const gnd = parseMarkup(fixture.inputHtml);
      const actual = extractUtterances(gnd, options as ExtractUtterancesOptions);
      t.deepEqual(sortKeysDeep(actual), sortKeysDeep(utterances));
    });
  }
}
