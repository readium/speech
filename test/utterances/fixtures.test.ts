import "../gnd/setup.js";
import test from "ava";
import { loadManifest, loadFixture } from "../testUtils.js";
import { parseMarkup } from "../../src/gnd/converter.js";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";

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

  for (const format of ["plain", "ssml"] as const) {
    const branch = fixture.utterances[format];

    test(`fixture "${entry.id}": extractUtterances matches utterances.json's "${format}" base`, (t) => {
      const gnd = parseMarkup(fixture.inputHtml);
      const actual = extractUtterances(gnd, { format });
      t.deepEqual(sortKeysDeep(actual), sortKeysDeep(branch.base));
    });

    for (const variant of branch.variants ?? []) {
      test(`fixture "${entry.id}": extractUtterances matches utterances.json's "${format}" variant ${JSON.stringify(variant.options)}`, (t) => {
        const gnd = parseMarkup(fixture.inputHtml);
        const actual = extractUtterances(gnd, { format, ...variant.options });
        t.deepEqual(sortKeysDeep(actual), sortKeysDeep(variant.utterances));
      });
    }
  }
}
