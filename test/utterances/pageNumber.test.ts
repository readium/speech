import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
import { GuidedNavigationObject } from "@readium/shared";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import { isPageNumber } from "../../src/utterances/pageNumber.js";

const pageNumbers = [
  "5", "123", " 42 ", "٥", "५", "５",
  "iv", "XII", "mcmxcix", "Ⅳ", "ⅻ",
  "五", "一百二十三", "፭",
  "ה׳", "ה'", "קכ״ג", "קכ\"ג",
  "εʹ", "εʹ", "ε΄", "ε'", "ριβʹ", "͵αφκγʹ",
  "Ե̅", "Ճ̅Ի̅Ե̅",
  "е҃", "҂а҃",
];

const notPageNumbers = [
  "", "Page 5", "p. 5", "5a", "5.", "iiii", "vx", "Chapter",
  "ה", "גם", "ε", "Ե", "е",
];

for (const label of pageNumbers) {
  test(`isPageNumber accepts ${JSON.stringify(label)}`, (t) => {
    t.true(isPageNumber(label));
  });
}

for (const label of notPageNumbers) {
  test(`isPageNumber rejects ${JSON.stringify(label)}`, (t) => {
    t.false(isPageNumber(label));
  });
}

async function plain(title: string, contextualize: "pagebreak"[] = []): Promise<(string | undefined)[]> {
  const gnd = parseMarkup(`<p>Text.</p><span epub:type="pagebreak" title="${title}"></span>`);
  const utterances = await extractUtterances(gnd, { format: "plain", contextualize });
  return utterances.map((u) => u.plain);
}

test("a bare page number gets the \"Page\" label", async (t) => {
  t.deepEqual(await plain("iv"), ["Text.", "Page iv"]);
});

test("a contextualized bare page number keeps \"Pagebreak.\" and gets the \"Page\" label", async (t) => {
  t.deepEqual(await plain("iv", ["pagebreak"]), ["Text.", "Pagebreak. Page iv."]);
});

test("a label that already says more than a number is left as is", async (t) => {
  t.deepEqual(await plain("Page 5"), ["Text.", "Page 5"]);
  t.deepEqual(await plain("Page 5", ["pagebreak"]), ["Text.", "Pagebreak. Page 5."]);
});

const frenchPagebreak = (label: string) =>
  GuidedNavigationObject.deserializeArray([
    {
      text: { plain: "Avant après.", ssml: 'Avant <readium:pagebreak id="p" /> après.', language: "fr" },
      children: [{ id: "p", role: ["pagebreak"], text: { plain: label, language: "fr" } }],
    },
  ])!;

async function spokenPagebreak(format: "plain" | "ssml", inline: boolean) {
  const utterances = await extractUtterances(frenchPagebreak("cinq"), {
    format,
    contextualize: ["pagebreak"],
    inlineContextualization: inline ? ["pagebreak"] : [],
  });
  return utterances.map((u) => [u[format], u.language]);
}

test("a contextualized label in another language than the catalog's keeps its trailing period in plain text", async (t) => {
  t.deepEqual(await spokenPagebreak("plain", false), [
    ["Avant après.", "fr"],
    ["Pagebreak.", "en"],
    ["cinq.", "fr"],
  ]);
});

test("an inline contextualized label in another language than the catalog's ends before the sentence resumes", async (t) => {
  t.deepEqual(await spokenPagebreak("plain", true), [
    ["Avant", "fr"],
    ["Pagebreak.", "en"],
    ["cinq. après.", "fr"],
  ]);
  t.deepEqual(await spokenPagebreak("ssml", true), [['Avant <lang xml:lang="en">Pagebreak.</lang> cinq. après.', "fr"]]);
});
