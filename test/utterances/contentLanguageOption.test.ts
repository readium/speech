import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import type { ExtractUtterancesOptions } from "../../src/utterances/types.js";

const html = '<html><body><p>Es war einmal.</p><p lang="fr">Il était une fois.</p></body></html>';

async function languages(options: Partial<ExtractUtterancesOptions> = {}) {
  const utterances = await extractUtterances(parseMarkup(html), { format: "plain", ...options });
  return utterances.map((u) => [u.plain, u.language]);
}

test("contentLanguage is the language of content without lang", async (t) => {
  t.deepEqual(await languages({ contentLanguage: "de" }), [
    ["Es war einmal.", "de"],
    ["Il était une fois.", "fr"],
  ]);
});

test("contentLanguage is the language of all content with language: none", async (t) => {
  t.deepEqual(await languages({ contentLanguage: "de", language: "none" }), [
    ["Es war einmal.", "de"],
    ["Il était une fois.", "de"],
  ]);
});

test("without contentLanguage, content without lang has no language", async (t) => {
  t.deepEqual(await languages(), [
    ["Es war einmal.", undefined],
    ["Il était une fois.", "fr"],
  ]);
});

test("languageOverrides applies to contentLanguage", async (t) => {
  t.deepEqual(await languages({ contentLanguage: "en", language: "none", languageOverrides: { en: "de" } }), [
    ["Es war einmal.", "de"],
    ["Il était une fois.", "de"],
  ]);
});
