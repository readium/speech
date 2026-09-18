import "../gnd/setup.js";
import test from "ava";
import { parseMarkup } from "../../src/gnd/converter.js";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";

test("substitutions: a built-in substitution applies by default", async (t) => {
  const gnd = parseMarkup("<p>Copyright (c) 2026 Acme Corp.</p>");
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Copyright © 2026 Acme Corp.");
});

test("substitutions: no match leaves text untouched", async (t) => {
  const gnd = parseMarkup("<p>Nothing to substitute here.</p>");
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Nothing to substitute here.");
});

test("substitutions: a caller-supplied key replaces the built-in rule of the same name", async (t) => {
  const gnd = parseMarkup("<p>Copyright (c) 2026 Acme Corp.</p>");
  const [utterance] = await extractUtterances(gnd, {
    format: "plain",
    substitutions: { "(c)": "(Copyright)" },
  });
  t.is(utterance.plain, "Copyright (Copyright) 2026 Acme Corp.");
});

test("substitutions: a same-value override disables a built-in rule", async (t) => {
  const gnd = parseMarkup("<p>Copyright (c) 2026 Acme Corp.</p>");
  const [utterance] = await extractUtterances(gnd, {
    format: "plain",
    substitutions: { "(c)": "(c)" },
  });
  t.is(utterance.plain, "Copyright (c) 2026 Acme Corp.");
});

test("substitutions: a caller-supplied new key applies alongside built-ins", async (t) => {
  const gnd = parseMarkup("<p>Fizz (c) buzz</p>");
  const [utterance] = await extractUtterances(gnd, {
    format: "plain",
    substitutions: { Fizz: "FIZZ" },
  });
  t.is(utterance.plain, "FIZZ © buzz");
});

test("substitutions: an adjacency-aware pattern only fires with its required context", async (t) => {
  const gnd = parseMarkup("<p>Water boils at 100deg Celsius, not just deg.</p>");
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Water boils at 100° Celsius, not just deg.");
});

test("substitutions: converts a micro-prefixed unit but leaves the bare unit letter alone", async (t) => {
  const gnd = parseMarkup("<p>The dose is 5ug per tablet, measured to within 2us and 3uF.</p>");
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "The dose is 5µg per tablet, measured to within 2µs and 3µF.");
});

test("substitutions: converts typed arrows to their Unicode glyph", async (t) => {
  const gnd = parseMarkup("<p>Go north->south, then south<-north.</p>");
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Go north→south, then south←north.");
});

test("substitutions: converts real prime marks down to the ASCII feet/inches convention engines actually recognize", async (t) => {
  const gnd = parseMarkup("<p>The room is 12′6″ wide.</p>");
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, `The room is 12'6" wide.`);
});

test("substitutions: applies after sentence-mode reconstruction joins sibling nodes", async (t) => {
  const gnd = parseMarkup("<p>It measured 100</p><p>deg Celsius exactly.</p>");
  const utterances = await extractUtterances(gnd, {
    format: "plain",
    segmentation: { mode: "sentence" },
  });
  t.deepEqual(
    utterances.map((u) => u.plain),
    ["It measured 100° Celsius exactly."]
  );
});

test("substitutions: ssml format changes text-node content but leaves tags/attributes intact", async (t) => {
  const gnd = parseMarkup('<p>Copyright (c) 2026, <span lang="fr">(c) non traduit</span></p>', undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "ssml", language: "always" });
  t.is(utterance.ssml, 'Copyright © 2026, <lang xml:lang="fr">© non traduit</lang>');
});

test("substitutions: disabled via a same-value override leaves ssml untouched", async (t) => {
  const gnd = parseMarkup("<p>Copyright (c) 2026.</p>");
  const [utterance] = await extractUtterances(gnd, {
    format: "ssml",
    substitutions: { "(c)": "(c)" },
  });
  t.is(utterance.ssml, "Copyright (c) 2026.");
});

for (const format of ["plain", "ssml"] as const) {
  for (const mode of ["structure", "sentence"] as const) {
    test(`substitutions: applies under format=${format}, segmentation.mode=${mode}`, async (t) => {
      const gnd = parseMarkup("<p>It cost (c) 2026 to renew.</p>");
      const utterances = await extractUtterances(gnd, { format, segmentation: { mode } });
      const text = format === "plain" ? utterances[0].plain : (utterances[0].ssml ?? utterances[0].plain);
      t.true((text ?? "").includes("©"));
    });
  }
}
