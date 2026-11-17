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

async function announced(html: string, options: Partial<ExtractUtterancesOptions> = {}) {
  const utterances = await extractUtterances(parseMarkup(html), { format: "plain", contextualize: ["list"], ...options });
  return utterances.map((u) => [u.plain, u.language]);
}

test("an announcement takes the region of the content in its catalog's language", async (t) => {
  t.deepEqual(await announced('<html lang="en-US"><body><ul><li>One</li></ul></body></html>', { contentLanguage: "en" }), [
    ["Start of the list.", "en-US"],
    ["One", "en-US"],
    ["End of the list.", "en-US"],
  ]);
});

test("an announcement takes the region of the content after it, else before it", async (t) => {
  t.deepEqual(await announced('<html lang="en-GB"><body><p>Before</p><ul lang="fr"><li>Un</li></ul><p lang="en-US">After</p></body></html>'), [
    ["Before", "en-GB"],
    ["Start of the list.", "en-US"],
    ["Un", "fr"],
    ["End of the list.", "en-US"],
    ["After", "en-US"],
  ]);
});

test("an announcement keeps its catalog's language next to content in another language", async (t) => {
  t.deepEqual(await announced('<html lang="fr-FR"><body><ul><li>Un</li></ul></body></html>'), [
    ["Start of the list.", "en"],
    ["Un", "fr-FR"],
    ["End of the list.", "en"],
  ]);
});
