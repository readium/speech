import "./setup.js";
import test from "ava";
import { loadManifest, loadFixture } from "../testUtils.js";
import { parseMarkup } from "../../src/gnd/converter.js";

const manifest = loadManifest();

test("manifest is a non-empty array", (t) => {
  t.true(Array.isArray(manifest));
  t.true(manifest.length > 0);
});

test("manifest has no duplicate ids", (t) => {
  const ids = manifest.map((entry) => entry.id);
  t.is(new Set(ids).size, ids.length);
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

// gnd.json stores a single fixture's expected top-level item(s) directly —
// a bare object for one item, or a role-less/id-less `{children: [...]}` for
// several siblings — while `parseMarkup()` always returns an array. This maps
// the stored file format onto that array shape for comparison.
function expectedTopLevel(gnd: unknown): unknown[] {
  if (gnd && typeof gnd === "object" && !Array.isArray(gnd)) {
    const keys = Object.keys(gnd);
    if (keys.length === 1 && keys[0] === "children") {
      return (gnd as { children: unknown[] }).children;
    }
  }
  return [gnd];
}

for (const entry of manifest) {
  test(`fixture "${entry.id}": loads and matches gnd.json`, (t) => {
    t.is(entry.dir, entry.id);

    const fixture = loadFixture(entry.id);

    t.is(fixture.meta.id, entry.id);
    t.is(fixture.meta.role, entry.role);

    t.true(fixture.inputHtml.trim().length > 0, "input file must not be empty");

    t.true(
      typeof fixture.gnd === "object" && fixture.gnd !== null,
      "gnd.json must parse to an object",
    );

    t.true(Array.isArray(fixture.utterances.cases), "utterances.json must have a cases array");
    for (const { options: optionSets, utterances } of fixture.utterances.cases) {
      t.true(Array.isArray(utterances), `utterances.json case ${JSON.stringify(optionSets)} must have a utterances array`);
      for (const options of optionSets) {
        for (const utterance of utterances as Record<string, unknown>[]) {
          t.true(typeof utterance === "object" && utterance !== null);
          t.true(
            typeof utterance[options.format] === "string",
            `each utterance in the ${JSON.stringify(options)} case needs a ${options.format} field`,
          );
        }
      }
    }

    const actual = parseMarkup(fixture.inputHtml);
    t.deepEqual(sortKeysDeep(actual), sortKeysDeep(expectedTopLevel(fixture.gnd)));
  });
}
