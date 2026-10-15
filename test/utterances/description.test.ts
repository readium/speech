import "../domSetup.js";
import test from "ava";
import { GuidedNavigationObject } from "@readium/shared";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import type { GndRole } from "@readium/guided-navigation";

function gndWithDescription(text: unknown): GuidedNavigationObject[] {
  return GuidedNavigationObject.deserializeArray([
    { role: ["figure"], textref: "#fig", description: { text }, children: [{ text: "Figure body", textref: "#fig-p" }] },
    { role: ["table"], textref: "#tbl", description: { text }, children: [{ text: "Cell", textref: "#tbl-c" }] },
  ])!;
}

const ssmlOnly = { ssml: "A <emphasis>cat</emphasis> on a mat" };
const plainOnly = { plain: "A cat on a mat" };

for (const contextualize of [[], ["figure", "table"]] as GndRole[][]) {
  for (const format of ["plain", "ssml"] as const) {
    test(`a description with only ssml is spoken like its plain equivalent (format: ${format}, contextualize: [${contextualize}])`, async (t) => {
      const fromSsml = await extractUtterances(gndWithDescription(ssmlOnly), { format, contextualize });
      const fromPlain = await extractUtterances(gndWithDescription(plainOnly), { format, contextualize });
      t.deepEqual(fromSsml.map((u) => u.plain ?? u.ssml), fromPlain.map((u) => u.plain ?? u.ssml));
      t.true(fromSsml.some((u) => (u.plain ?? u.ssml)!.includes("A cat on a mat")));
    });
  }
}

function gndWithLanguage(language: string): GuidedNavigationObject[] {
  return GuidedNavigationObject.deserializeArray([
    { role: ["paragraph"], text: { plain: "Un texte.", language: "fr" } },
    { role: ["image"], imgref: "a.png", description: { text: { plain: "Un chat", language } } },
  ])!;
}

const spoken = (utterances: { plain?: string; ssml?: string; language?: string }[]) => utterances.map((u) => [u.plain ?? u.ssml, u.language]);

test("a description is spoken in its declared language", async (t) => {
  t.deepEqual(spoken(await extractUtterances(gndWithLanguage("fr"))), [["Un texte.", "fr"], ["Un chat", "fr"]]);
});

test("a description's language follows languageOverrides", async (t) => {
  t.deepEqual(spoken(await extractUtterances(gndWithLanguage("fr"), { languageOverrides: { fr: "de" } }))[1], ["Un chat", "de"]);
});

test("a description has no language with language: \"none\"", async (t) => {
  t.is((await extractUtterances(gndWithLanguage("fr"), { language: "none" }))[1].language, undefined);
});

test("an announcement is split around a description in another language than the catalog's in plain text", async (t) => {
  t.deepEqual(spoken(await extractUtterances(gndWithLanguage("fr"), { contextualize: ["image"] })), [
    ["Un texte.", "fr"],
    ["Image with a label:", "en"],
    ["Un chat", "fr"],
  ]);
});

test("an announcement wraps a description in another language than the catalog's in a lang tag in SSML", async (t) => {
  t.deepEqual(spoken(await extractUtterances(gndWithLanguage("fr"), { format: "ssml", contextualize: ["image"] })), [
    ["Un texte.", "fr"],
    ['Image with a label: <lang xml:lang="fr">Un chat</lang>', "en"],
  ]);
});

test("a lang-wrapped description in SSML follows languageOverrides and escapes its text", async (t) => {
  const gnd = GuidedNavigationObject.deserializeArray([{ role: ["image"], imgref: "a.png", description: { text: { plain: "Chat & chien", language: "fr" } } }])!;
  const [utterance] = await extractUtterances(gnd, { format: "ssml", contextualize: ["image"], languageOverrides: { fr: "de" } });
  t.is(utterance.ssml, 'Image with a label: <lang xml:lang="de">Chat &amp; chien</lang>');
});

test("an announcement holding a description in the catalog's primary language is one utterance in the description's tag", async (t) => {
  t.deepEqual(spoken(await extractUtterances(gndWithLanguage("en-US"), { contextualize: ["image"] }))[1], ["Image with a label: Un chat", "en-US"]);
});
