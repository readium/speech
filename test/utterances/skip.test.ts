import test from "ava";
import { skippableRoles } from "../../src/utterances/roles.js";

// Behavioral skip coverage (footnote/aside/pagebreak/...) lives in the
// shared fixtures suite (fixtures/*/utterances-skipped.json, driven by
// test/utterances/fixtures.test.ts) so other platform ports get it too.
// This only checks the TS-specific convenience export against the spec.
test("skippableRoles matches the roles.md skippable-roles list", (t) => {
  t.deepEqual(
    [...skippableRoles].sort(),
    [
      "aside",
      "bibliography",
      "details",
      "endnotes",
      "footnote",
      "landmarks",
      "loa",
      "loi",
      "lot",
      "lov",
      "noteref",
      "pagebreak",
      "pullquote",
      "toc",
    ].sort(),
  );
});
