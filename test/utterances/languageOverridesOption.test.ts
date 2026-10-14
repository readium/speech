import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import type { ExtractUtterancesOptions } from "../../src/utterances/types.js";

const html =
  '<html lang="en-US"><body><p>Bonjour tout le monde. <span lang="la">Carpe diem.</span></p>' +
  '<p lang="en-GB">Bonsoir.</p></body></html>';

async function languages(options: Partial<ExtractUtterancesOptions> = {}) {
  const utterances = await extractUtterances(parseMarkup(html), { format: "plain", ...options });
  return utterances.map((u) => [u.plain, u.language]);
}

test("languageOverrides replaces a declared language matching its primary subtag", async (t) => {
  t.deepEqual(await languages({ languageOverrides: { en: "fr" } }), [
    ["Bonjour tout le monde. Carpe diem.", "fr"],
    ["Bonsoir.", "fr"],
  ]);
});

test("languageOverrides prefers an exact tag over its primary subtag", async (t) => {
  t.deepEqual(await languages({ languageOverrides: { en: "fr", "en-GB": "fr-CA" } }), [
    ["Bonjour tout le monde. Carpe diem.", "fr"],
    ["Bonsoir.", "fr-CA"],
  ]);
});

test("languageOverrides leaves other inline languages as declared", async (t) => {
  t.deepEqual(await languages({ language: "always", languageOverrides: { en: "fr" } }), [
    ["Bonjour tout le monde.", "fr"],
    ["Carpe diem.", "la"],
    ["Bonsoir.", "fr"],
  ]);
});

test("languageOverrides also remaps inline language tags kept in SSML", async (t) => {
  const html = '<html lang="fr"><body><p>Il a dit <span lang="en">bonjour</span>.</p></body></html>';
  const [utterance] = await extractUtterances(parseMarkup(html), { format: "ssml", language: "always", languageOverrides: { en: "fr" } });
  t.is(utterance.language, "fr");
  t.false(utterance.ssml!.includes('xml:lang="en"'));
  t.true(utterance.ssml!.includes('<lang xml:lang="fr">'));
});

test("languageOverrides applies before sentence segmentation, so sentences carry the spoken language", async (t) => {
  t.deepEqual(await languages({ segmentation: { mode: "sentence" }, languageOverrides: { en: "fr" } }), [
    ["Bonjour tout le monde.", "fr"],
    ["Carpe diem.", "fr"],
    ["Bonsoir.", "fr"],
  ]);
});

test("announcements are in the contextualization catalog's language, not the content's, nor overridden", async (t) => {
  const html = '<html lang="fr"><body><ul><li>Un.</li></ul></body></html>';
  const utterances = await extractUtterances(parseMarkup(html), { format: "plain", contextualize: ["list"], languageOverrides: { fr: "de" } });
  t.deepEqual(utterances.map((u) => [u.plain, u.language]), [
    ["Start of the list.", "en"],
    ["Un.", "de"],
    ["End of the list.", "en"],
  ]);
});

test("announcements follow an unshipped contextualizationLocale's fallback catalog, English", async (t) => {
  const html = '<ul><li>One.</li></ul>';
  const [start] = await extractUtterances(parseMarkup(html), { format: "plain", contextualize: ["list"], contextualizationLocale: "xx" });
  t.is(start.language, "en");
});

test("announcements carry no language under language: \"none\"", async (t) => {
  const [start] = await extractUtterances(parseMarkup("<ul><li>One.</li></ul>"), { format: "plain", contextualize: ["list"], language: "none" });
  t.is(start.language, undefined);
});
