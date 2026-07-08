import test from "ava";
import { loadManifest, loadFixture } from "../testUtils.js";

const manifest = loadManifest();

test("manifest is a non-empty array", (t) => {
  t.true(Array.isArray(manifest));
  t.true(manifest.length > 0);
});

test("manifest has no duplicate ids", (t) => {
  const ids = manifest.map((entry) => entry.id);
  t.is(new Set(ids).size, ids.length);
});

for (const entry of manifest) {
  test(`fixture "${entry.id}": loads and has the expected shape`, (t) => {
    t.is(entry.dir, entry.id);

    const fixture = loadFixture(entry.id);

    t.is(fixture.meta.id, entry.id);
    t.is(fixture.meta.role, entry.role);

    t.true(fixture.inputHtml.trim().length > 0, "input.html must not be empty");

    t.true(
      typeof fixture.gnd === "object" && fixture.gnd !== null,
      "gnd.json must parse to an object",
    );

    t.true(Array.isArray(fixture.utterances), "utterances.json must parse to an array");
    for (const utterance of fixture.utterances as Record<string, unknown>[]) {
      t.true(typeof utterance === "object" && utterance !== null);
      t.true(typeof utterance.text === "string", "each utterance needs a text field");
    }
  });
}
