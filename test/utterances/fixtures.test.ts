import "../domSetup.js";
import test from "ava";
import { loadManifest, loadFixture, localFixtureIds } from "../testUtils.js";
import { statSync } from "fs";
import { fileURLToPath } from "url";
import { maxUtterancesFileBytes, sortKeysDeep, stripLocatorDetails } from "../../scripts/fixtureCases.js";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import type { ExtractUtterancesOptions } from "../../src/utterances/types.js";

const manifest = loadManifest();

test("every @readium/guided-navigation fixture has a utterances.json, and vice versa", (t) => {
  t.deepEqual(localFixtureIds().sort(), manifest.map((entry) => entry.id).sort());
});

test("no utterances.json exceeds the size limit", (t) => {
  for (const id of localFixtureIds()) {
    const bytes = statSync(fileURLToPath(new URL(`../../fixtures/${id}/utterances.json`, import.meta.url))).size;
    t.true(bytes <= maxUtterancesFileBytes, `${id}: ${(bytes / 1024 / 1024).toFixed(1)} MB`);
  }
});

for (const entry of manifest) {
  const fixture = loadFixture(entry);

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
