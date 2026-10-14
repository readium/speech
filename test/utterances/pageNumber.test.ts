import "../domSetup.js";
import test from "ava";
import { parseMarkup } from "@readium/guided-navigation";
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
