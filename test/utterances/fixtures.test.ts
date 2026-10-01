import "../domSetup.js";
import test from "ava";
import { loadManifest, loadFixture, localFixtureIds, stripLocatorDetails } from "../testUtils.js";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import type { ExtractUtterancesOptions } from "../../src/utterances/types.js";

const manifest = loadManifest();

test("every @readium/guided-navigation fixture has a utterances.json, and vice versa", (t) => {
  t.deepEqual(localFixtureIds().sort(), manifest.map((entry) => entry.id).sort());
});

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

  fixture.utterances.cases.forEach(({ options: optionSets, utterances }, index) => {
    // One test per case rather than per option set: the largest fixtures have tens of thousands of option sets.
    test(`fixture "${entry.id}": extractUtterances matches utterances.json's case ${index} for all ${optionSets.length} option sets`, async (t) => {
      const expected = sortKeysDeep(utterances);
      const expectedJson = JSON.stringify(expected);
      for (const options of optionSets) {
        const actual = sortKeysDeep(stripLocatorDetails(await extractUtterances(fixture.gnd, options as ExtractUtterancesOptions)));
        if (JSON.stringify(actual) !== expectedJson) {
          t.deepEqual(actual, expected, `options: ${JSON.stringify(options)}`);
          return;
        }
      }
      t.pass();
    });
  });
}
