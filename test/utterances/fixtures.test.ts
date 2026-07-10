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
  test(`fixture "${entry.id}": extractUtterances matches utterances.json`, (t) => {
    const fixture = loadFixture(entry.id);
    const gnd = parseMarkup(fixture.inputHtml);
    const actual = extractUtterances(gnd);
    t.deepEqual(sortKeysDeep(actual), sortKeysDeep(fixture.utterances));
  });

  if (entry.skip) {
    test(`fixture "${entry.id}": extractUtterances with skip matches utterances-skipped.json`, (t) => {
      const fixture = loadFixture(entry.id);
      const gnd = parseMarkup(fixture.inputHtml);
      const actual = extractUtterances(gnd, { skip: entry.skip });
      t.deepEqual(sortKeysDeep(actual), sortKeysDeep(fixture.utterancesSkipped));
    });
  }
}
