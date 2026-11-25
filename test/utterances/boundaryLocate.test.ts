import "../domSetup.js";
import test from "ava";
import { GuidedNavigationObject } from "@readium/shared";
import { encodeCssSelectorFragment, parseMarkup } from "@readium/guided-navigation";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import { resolveBoundaryLocate } from "../../src/utterances/boundaryLocate.js";
import { stripSsmlTags } from "../../src/utterances/plainText.js";
import type { SubstitutionTable } from "../../src/utterances/types.js";

test("resolveBoundaryLocate finds a word within a single-offset utterance", async (t) => {
  const gnd = parseMarkup("<p>Hello world.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Hello world.");

  const charIndex = utterance.plain!.indexOf("world");
  const resolved = resolveBoundaryLocate(utterance, charIndex, "world".length);
  t.is(resolved?.word, "world");
  t.is(resolved?.locate.text?.highlight, "world");
  t.is(resolved?.locate.cssSelector, utterance.locate?.cssSelector);
});

test("resolveBoundaryLocate finds a word in the second of two offset pieces (sentence reconstructed across elements)", async (t) => {
  const gnd = parseMarkup("<p>This sentence continues</p><p>across two paragraphs.</p>", undefined, { textrefs: { roles: true } });
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence", reconstruct: true } });
  t.is(utterances.length, 1);
  const [utterance] = utterances;
  t.is(utterance.plain, "This sentence continues across two paragraphs.");
  t.is(utterance.offsets?.length, 2);

  const charIndex = utterance.plain!.indexOf("paragraphs");
  const resolved = resolveBoundaryLocate(utterance, charIndex, "paragraphs".length);
  t.is(resolved?.word, "paragraphs");
  // Resolved against the second piece's own locate, not the first's.
  t.is(resolved?.locate.cssSelector, utterance.offsets![1].locate.cssSelector);
  t.not(resolved?.locate.cssSelector, utterance.offsets![0].locate.cssSelector);
  t.is(resolved?.locate.text?.before, "across two ");
  t.is(resolved?.locate.text?.after, ".");
});

test("resolveBoundaryLocate finds an SSML word formatted within itself in a reconstructed sentence", async (t) => {
  const gnd = parseMarkup("<p>This sentence continues</p><p>across <em>two</em>fold paragraphs.</p>", undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "ssml", segmentation: { mode: "sentence", reconstruct: true } });
  t.is(utterance.ssml, "This sentence continues across <emphasis>two</emphasis>fold paragraphs.");

  const charIndex = "This sentence continues across ".length;
  const resolved = resolveBoundaryLocate(utterance, charIndex, "twofold".length);
  t.is(resolved?.word, "twofold");
  t.is(resolved?.locate.cssSelector, utterance.offsets![1].locate.cssSelector);
});

test("resolveBoundaryLocate finds an SSML word after a line break in a reconstructed sentence", async (t) => {
  const gnd = parseMarkup("<p>This sentence continues</p><p>across<br>two lines.</p>", undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "ssml", segmentation: { mode: "sentence", reconstruct: true } });
  t.is(utterance.offsets![1].locate.text?.highlight, "across two lines.");

  const resolved = resolveBoundaryLocate(utterance, "This sentence continues across ".length, "two".length);
  t.is(resolved?.word, "two");
  t.is(resolved?.locate.cssSelector, utterance.offsets![1].locate.cssSelector);
});

test("resolveBoundaryLocate finds a word exactly at a piece boundary", async (t) => {
  const gnd = parseMarkup("<p>This sentence continues</p><p>across two paragraphs.</p>", undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence", reconstruct: true } });

  const charIndex = utterance.plain!.indexOf("across");
  const resolved = resolveBoundaryLocate(utterance, charIndex, "across".length);
  t.is(resolved?.word, "across");
  t.is(resolved?.locate.cssSelector, utterance.offsets![1].locate.cssSelector);
});

test("resolveBoundaryLocate clips a word whose reported length runs past the end of the utterance", async (t) => {
  const gnd = parseMarkup("<p>Speech Synthesis</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Speech Synthesis");

  const resolved = resolveBoundaryLocate(utterance, "Speech ".length, 12);
  t.is(resolved?.word, "Synthesis");
  t.is(resolved?.locate.text?.highlight, "Synthesis");
  t.is(resolved?.locate.text?.after, "");
});

test("resolveBoundaryLocate clips a word whose reported length runs into the next label to its own", async (t) => {
  const gnd = parseMarkup('<p>See <a href="#a" id="a" aria-label="First">1</a> <a href="#b" id="b" aria-label="Second">2</a> now.</p>', undefined, {
    textrefs: { roles: true },
  });
  for (const format of ["plain", "ssml"] as const) {
    const [utterance] = await extractUtterances(gnd, { format });
    const resolved = resolveBoundaryLocate(utterance, "See ".length, "First Second".length);
    t.is(resolved?.word, "First", format);
    t.is(resolved?.locate.cssSelector, "#a", format);
  }
});

test("resolveBoundaryLocate resolves no word in text a substitution inserts", async (t) => {
  const gnd = parseMarkup("<p>Hello world.</p>", undefined, { textrefs: true });
  for (const format of ["plain", "ssml"] as const) {
    const [utterance] = await extractUtterances(gnd, { format, substitutions: { note: { pattern: /^/, replace: "Note: " } } });
    t.is(resolveBoundaryLocate(utterance, 0, "Note:".length), undefined, format);
    t.is(resolveBoundaryLocate(utterance, "Note: ".length, "Hello".length)?.word, "Hello", format);
  }
});

test("resolveBoundaryLocate quotes a word with its sentence's context in the rest of the paragraph", async (t) => {
  const gnd = parseMarkup("<p>He ran. He ran.</p>", undefined, { textrefs: true });
  for (const format of ["plain", "ssml"] as const) {
    const utterances = await extractUtterances(gnd, { format, segmentation: { mode: "sentence" } });
    const quotes = utterances.map((utterance) => resolveBoundaryLocate(utterance, 0, "He".length)?.locate.text);
    t.deepEqual(quotes, [
      { highlight: "He", before: "", after: " ran. He ran." },
      { highlight: "He", before: "He ran. ", after: " ran." },
    ], format);
  }
});

test("resolveBoundaryLocate returns undefined for a synthesized utterance with no offsets", async (t) => {
  const utterance = { plain: "Some synthesized announcement." };
  t.is(resolveBoundaryLocate(utterance, 5, 4), undefined);
});

test("resolveBoundaryLocate returns undefined when charIndex falls outside every offset piece's actual text", async (t) => {
  const gnd = parseMarkup("<p>Hello world.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(resolveBoundaryLocate(utterance, 9999, 1), undefined);
});

test("resolveBoundaryLocate never quote-searches an aria-substituted utterance for a word", async (t) => {
  const doc = new DOMParser().parseFromString(
    `<body><p>Into speech. <a href="#ref" aria-label="Source: Wikipedia, Speech synthesis">[source]</a></p></body>`,
    "text/html"
  );
  const root = doc.querySelector("body")!;
  const gnd = parseMarkup(root, undefined, { textrefs: { roles: true, domRange: true } });
  const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  const biblioref = utterances.find((u) => u.plain === "Source: Wikipedia, Speech synthesis")!;
  t.truthy(biblioref);
  for (const word of ["Source:", "Wikipedia,", "Speech", "synthesis"]) {
    const charIndex = biblioref.plain!.indexOf(word);
    const resolved = resolveBoundaryLocate(biblioref, charIndex, word.length);
    // No doomed per-word quote: the labelled element's own locate, as is.
    t.is(resolved?.locate, biblioref.offsets![0].locate, `"${word}"`);
    t.is(resolved?.word, word);
  }
});

test("each word of consecutive labels resolves to its own labelled element", async (t) => {
  const link = (id: string, label: string) => `<a href="#${id}" id="${id}" aria-label="${label}">${id}</a>`;
  const abbr = '<abbr title="World Health Organization">WHO</abbr>';
  const cases = [
    { markup: `<p>See ${link("a", "First")} ${link("b", "Second")} now.</p>`, words: { First: "#a", Second: "#b" } },
    { markup: `<p>See ${link("a", "First")}${link("b", "Second")} now.</p>`, words: { First: "#a", Second: "#b" } },
    { markup: `<p>See ${link("a", "First")} ${link("b", "Second")} ${link("c", "Third")}</p>`, words: { First: "#a", Second: "#b", Third: "#c" } },
    { markup: `<p>See ${link("a", "Half 1/2")} ${link("b", "Second")} now.</p>`, words: { Half: "#a", "½": "#a", Second: "#b" } },
    { markup: `<p>See ${link("a", "First")} ${abbr} now.</p>`, words: { First: "#a" } },
    { markup: `<p>See ${abbr} ${link("a", "First")} now.</p>`, words: { First: "#a" } },
  ];
  for (const { markup, words } of cases) {
    const gnd = parseMarkup(markup, undefined, { textrefs: { roles: true } });
    for (const abbreviation of ["after", "inline"] as const) {
      for (const mode of ["structure", "sentence"] as const) {
        for (const format of ["plain", "ssml"] as const) {
          const [utterance] = await extractUtterances(gnd, { format, segmentation: { mode }, interruptions: { abbreviation } });
          const spoken = utterance.plain ?? stripSsmlTags(utterance.ssml!);
          for (const [word, selector] of Object.entries(words)) {
            const resolved = resolveBoundaryLocate(utterance, spoken.indexOf(word), word.length);
            t.is(resolved?.locate.cssSelector, selector, `${abbreviation}, ${mode}, ${format}: ${markup} "${word}"`);
          }
        }
      }
    }
  }
});

test("each word of a table cell's labels resolves to its own labelled element", async (t) => {
  const link = (id: string, label: string) => `<a href="#${id}" id="${id}" aria-label="${label}">${id}</a>`;
  const abbr = '<abbr title="World Health Organization">WHO</abbr>';
  const cell = (content: string) => `<table><tr><th>Step</th></tr><tr><td>${content}</td></tr></table>`;
  const cases = [
    { markup: cell(`See ${link("a", "First")} now.`), words: { First: "#a" } },
    { markup: cell(`See ${link("a", "First")} ${link("b", "Second")} now.`), words: { First: "#a", Second: "#b" } },
    { markup: cell(`See ${link("a", "First")}${link("b", "Second")} now.`), words: { First: "#a", Second: "#b" } },
    { markup: cell(`See ${abbr} ${link("a", "First")} now.`), words: { First: "#a" } },
  ];
  for (const { markup, words } of cases) {
    const gnd = parseMarkup(markup, undefined, { textrefs: { roles: true } });
    for (const abbreviation of ["after", "inline"] as const) {
      for (const mode of ["structure", "sentence"] as const) {
        for (const format of ["plain", "ssml"] as const) {
          const utterances = await extractUtterances(gnd, { format, segmentation: { mode }, interruptions: { abbreviation } });
          const utterance = utterances.find((u) => (u.plain ?? u.ssml)?.includes("First"))!;
          const spoken = utterance.plain ?? stripSsmlTags(utterance.ssml!);
          for (const [word, selector] of Object.entries(words)) {
            const resolved = resolveBoundaryLocate(utterance, spoken.indexOf(word), word.length);
            t.is(resolved?.locate.cssSelector, selector, `${abbreviation}, ${mode}, ${format}: ${markup} "${word}"`);
          }
        }
      }
    }
  }
});

test("resolveBoundaryLocate drops a piece's domRange, so a consumer trying domRange before text.highlight doesn't anchor the whole piece instead of the word", async (t) => {
  const doc = new DOMParser().parseFromString("<body><h1>Speech Synthesis</h1></body>", "text/html");
  const gnd = parseMarkup(doc.querySelector("body")!, undefined, { textrefs: { roles: true, domRange: true } });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.truthy(utterance.offsets?.[0].locate.domRange);

  const charIndex = utterance.plain!.indexOf("Synthesis");
  const resolved = resolveBoundaryLocate(utterance, charIndex, "Synthesis".length);
  t.is(resolved?.word, "Synthesis");
  t.is(resolved?.locate.domRange, undefined);
  t.is(resolved?.locate.cssSelector, utterance.offsets![0].locate.cssSelector);
});

test("resolveBoundaryLocate matches a plain-text-space charIndex against SSML markup, skipping past an inline tag", async (t) => {
  const gnd = parseMarkup('<p>See <span lang="fr">Bonjour</span> friend.</p>', undefined, { textrefs: { roles: true } });
  const [utterance] = await extractUtterances(gnd, { format: "ssml", language: "always" });
  t.true((utterance.ssml ?? "").includes("<lang"));

  // charIndex here mirrors what SpeechServerEngine reports: a position in the
  // tag-stripped plain text ("See Bonjour friend."), not the raw SSML string.
  const plainText = "See Bonjour friend.";
  const charIndex = plainText.indexOf("friend");
  const resolved = resolveBoundaryLocate(utterance, charIndex, "friend".length);
  t.is(resolved?.word, "friend");
});

test("resolveBoundaryLocate on a substituted utterance resolves back to the original source span, not the substituted symbol", async (t) => {
  const gnd = parseMarkup("<p>Water boils at 100deg Celsius.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Water boils at 100° Celsius.");

  // charIndex lands inside the substituted "°" glyph, as the engine would report.
  const charIndex = utterance.plain!.indexOf("°");
  const resolved = resolveBoundaryLocate(utterance, charIndex, 1);
  t.is(resolved?.locate.text?.highlight, "100deg");
  t.is(resolved?.locate.text?.before, "Water boils at ");
  t.is(resolved?.locate.text?.after, " Celsius.");
});

test("resolveBoundaryLocate on a substituted ssml utterance resolves back to the original source span", async (t) => {
  const gnd = parseMarkup("<p>Copyright (c) 2026 Acme Corp.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "ssml" });
  t.is(utterance.ssml, "Copyright © 2026 Acme Corp.");

  const charIndex = utterance.ssml!.indexOf("©");
  const resolved = resolveBoundaryLocate(utterance, charIndex, 1);
  t.is(resolved?.locate.text?.highlight, "(c)");
});

test("resolveBoundaryLocate on a substituted utterance resolves a charIndex+charLength reaching the very end of the utterance", async (t) => {
  const gnd = parseMarkup("<p>Water boils at 100deg Celsius.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Water boils at 100° Celsius.");

  const charIndex = utterance.plain!.indexOf("Celsius.");
  // charIndex + charLength lands exactly on the substituted text's length —
  // the end-exclusive edge case toSourcePosition must handle.
  t.is(charIndex + "Celsius.".length, utterance.plain!.length);
  const resolved = resolveBoundaryLocate(utterance, charIndex, "Celsius.".length);
  t.is(resolved?.locate.text?.highlight, "Celsius.");
});

test("each word of a multiword replacement resolves to the whole source it replaces", async (t) => {
  const gnd = parseMarkup("<p>Plants absorb CO2 from the <em>air</em>.</p>", undefined, { textrefs: true });
  for (const format of ["plain", "ssml"] as const) {
    const [utterance] = await extractUtterances(gnd, { format, substitutions: { CO2: "carbon dioxide" } });
    const spoken = utterance.plain ?? stripSsmlTags(utterance.ssml!);
    t.is(spoken, "Plants absorb carbon dioxide from the air.");
    for (const word of ["carbon", "dioxide"]) {
      const resolved = resolveBoundaryLocate(utterance, spoken.indexOf(word), word.length);
      t.is(resolved?.word, "CO2", `${format}: "${word}"`);
      t.is(resolved?.locate.text?.before, "Plants absorb ", `${format}: "${word}"`);
      t.is(resolved?.locate.text?.after, " from the air.", `${format}: "${word}"`);
    }
  }
});

test("a replacement ending the utterance resolves to its whole source", async (t) => {
  const cases = [
    { markup: "<p>1/2</p>", word: "½", source: "1/2" },
    { markup: "<p>Made by Acme(TM)</p>", word: "Acme™", source: "Acme(TM)" },
    { markup: "<p>The main greenhouse gas is CO2</p>", word: "dioxide", source: "CO2" },
  ];
  for (const { markup, word, source } of cases) {
    const gnd = parseMarkup(markup, undefined, { textrefs: true });
    const [utterance] = await extractUtterances(gnd, { format: "plain", substitutions: { CO2: "carbon dioxide" } });
    const resolved = resolveBoundaryLocate(utterance, utterance.plain!.indexOf(word), word.length);
    t.is(resolved?.word, source, markup);
    t.is(resolved?.locate.text?.after, "", markup);
  }
});

test("a word ending inside a replacement resolves to the whole source it replaces", async (t) => {
  const gnd = parseMarkup("<p>Cut a 2 x 4 board.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Cut a 2×4 board.");

  const resolved = resolveBoundaryLocate(utterance, utterance.plain!.indexOf("2"), 1);
  t.is(resolved?.word, "2 x");
  t.is(resolveBoundaryLocate(utterance, utterance.plain!.indexOf("4"), 1)?.word, "4");
});

test("in ssml, words after a replacement leaving a doubled space resolve to their own text", async (t) => {
  const cases: { markup: string; substitutions: SubstitutionTable }[] = [
    { markup: "<p>The value [sic] was <em>wrong</em> again.</p>", substitutions: { sic: { pattern: /\[sic\]/g, replace: "" } } },
    { markup: "<p>Use a whisk, e.g. a <em>balloon</em> whisk.</p>", substitutions: { "e.g.": "for example " } },
    { markup: "<p>Compare the A / B <em>balloon</em> whisk.</p>", substitutions: { "/": " " } },
  ];
  for (const { markup, substitutions } of cases) {
    const gnd = parseMarkup(markup, undefined, { textrefs: true });
    for (const segmentation of ["structure", "sentence"] as const) {
      const [utterance] = await extractUtterances(gnd, { format: "ssml", substitutions, segmentation: { mode: segmentation } });
      const spoken = stripSsmlTags(utterance.ssml!);
      for (const word of ["wrong", "again.", "balloon", "whisk."].filter((word) => spoken.includes(word))) {
        const resolved = resolveBoundaryLocate(utterance, spoken.lastIndexOf(word), word.length);
        t.is(resolved?.word, word, `${segmentation}: ${markup} "${word}"`);
      }
    }
  }
});

test("the words of a replacement ending in a space resolve to its source, without the space after it", async (t) => {
  const gnd = parseMarkup("<p>Use a whisk, e.g. a <em>balloon</em> whisk.</p>", undefined, { textrefs: true });
  for (const format of ["plain", "ssml"] as const) {
    const [utterance] = await extractUtterances(gnd, { format, substitutions: { "e.g.": "for example " } });
    const spoken = utterance.plain ?? stripSsmlTags(utterance.ssml!);
    for (const word of ["for", "example"]) {
      const resolved = resolveBoundaryLocate(utterance, spoken.indexOf(word), word.length);
      t.is(resolved?.locate.text?.highlight, "e.g.", `${format}: "${word}"`);
      t.is(resolved?.locate.text?.after, " a balloon whisk.", `${format}: "${word}"`);
    }
  }
});

test("adjacent replacements resolve to their own source each", async (t) => {
  const gnd = parseMarkup("<p>Use 1/2 1/4 cups.</p>", undefined, { textrefs: true });
  const [utterance] = await extractUtterances(gnd, { format: "plain" });
  t.is(utterance.plain, "Use ½ ¼ cups.");

  t.is(resolveBoundaryLocate(utterance, utterance.plain!.indexOf("½"), 1)?.word, "1/2");
  t.is(resolveBoundaryLocate(utterance, utterance.plain!.indexOf("¼"), 1)?.word, "1/4");
  t.is(resolveBoundaryLocate(utterance, utterance.plain!.indexOf("cups."), 5)?.word, "cups.");
});

test("page text after substituted text resolves word by word, even when it repeats the substituted source", async (t) => {
  const substituted = [
    '<abbr title="World Health Organization">WHO</abbr>',
    '<a href="chapter.xhtml" aria-label="chapter one">1</a>',
    '<a href="chapter.xhtml" aria-label="one">1</a>',
  ];
  for (const markup of substituted) {
    for (const abbreviation of ["inline", "after"] as const) {
      for (const format of ["plain", "ssml"] as const) {
        const html = `<p>${markup} and WHO said one thing.</p>`;
        const [utterance] = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format, interruptions: { abbreviation } });
        const text = utterance.plain ?? utterance.ssml!.replace(/<[^>]+>/g, "");
        const tail = text.lastIndexOf(" and ") + 1;
        for (const match of text.slice(tail).matchAll(/\p{L}+/gu)) {
          const resolved = resolveBoundaryLocate(utterance, tail + match.index!, match[0].length);
          t.is(resolved?.word, match[0], `${format} ${abbreviation} ${markup}: ${match[0]}`);
        }
      }
    }
  }
});

test("page text right after substituted text resolves word by word, even when it repeats the substitution", async (t) => {
  const substituted = [
    { markup: '<abbr title="one">1</abbr>', spoken: "one", abbreviation: "1" },
    { markup: '<abbr title="R&amp;D one">RD</abbr>', spoken: "R&D one", abbreviation: "RD" },
    { markup: '<a href="chapter.xhtml" aria-label="one">1</a>', spoken: "one", abbreviation: undefined },
  ];
  for (const { markup, spoken, abbreviation } of substituted) {
    for (const mode of ["structure", "sentence"] as const) {
      for (const format of ["plain", "ssml"] as const) {
        const html = `<p>${markup} one</p>`;
        const [utterance] = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), {
          format,
          segmentation: { mode },
          interruptions: { abbreviation: "inline" },
        });
        const text = utterance.plain ?? utterance.ssml!.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");
        t.is(text, `${spoken} one`);
        for (const match of text.matchAll(/\p{L}+/gu)) {
          const resolved = resolveBoundaryLocate(utterance, match.index!, match[0].length);
          const label = `${format} ${mode} ${markup}: ${match[0]}@${match.index}`;
          if (match.index! >= spoken.length) {
            t.is(resolved?.word, match[0], label);
            t.is(resolved?.locate.text?.highlight, match[0], label);
          } else if (abbreviation) {
            t.is(resolved?.word, match[0], label);
            t.is(resolved?.locate.text?.highlight, abbreviation, label);
          } else {
            t.is(resolved?.word, match[0], label);
            t.deepEqual(resolved?.locate, { cssSelector: "a" }, label);
          }
        }
      }
    }
  }
});

test("a sentence's quote cut out of a longer run of page text carries that run around it", async (t) => {
  const html =
    "<body><p>A computer system is called a speech synthesizer. " +
    'A <abbr title="text-to-speech">TTS</abbr> system converts text into speech.</p></body>';
  const root = new DOMParser().parseFromString(html, "text/html").querySelector("body")!;
  const gnd = parseMarkup(root, undefined, { textrefs: { roles: true, domRange: true } });
  for (const abbreviation of ["inline", "after"] as const) {
    const utterances = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" }, interruptions: { abbreviation } });
    const first = utterances[1].offsets![0].locate.text!;
    t.is(first.highlight, "A", abbreviation);
    t.is(first.before, "A computer system is called a speech synthesizer. ", abbreviation);
  }
});

test("an abbreviation's spoken expansion resolves word by word to the abbreviation, including the terminator it keeps", async (t) => {
  const cases = [
    { abbreviation: "inline" as const, html: '<p>She joined the <abbr title="World Health Organization">W.H.O.</abbr> Then she left.</p>' },
    { abbreviation: "after" as const, html: '<p>She joined the <abbr title="World Health Organization">WHO</abbr> and then left.</p>' },
  ];
  for (const { abbreviation, html } of cases) {
    for (const mode of ["structure", "sentence"] as const) {
      for (const format of ["plain", "ssml"] as const) {
        const utterances = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format, segmentation: { mode }, interruptions: { abbreviation } });
        const resolved = utterances.flatMap((utterance) => {
          const text = utterance.plain ?? utterance.ssml!.replace(/<[^>]+>/g, "");
          return [...text.matchAll(/\S+/g)].map((match) => {
            const result = resolveBoundaryLocate(utterance, match.index!, match[0].length);
            return [result?.word, result?.locate.text?.highlight];
          });
        });
        const label = `${abbreviation} ${mode} ${format}`;
        if (abbreviation === "inline") {
          t.deepEqual(resolved, [
            ["She", "She"], ["joined", "joined"], ["the", "the"],
            ["World", "W.H.O."], ["Health", "W.H.O."], ["Organization.", "W.H.O."],
            ["Then", "Then"], ["she", "she"], ["left.", "left."],
          ], label);
        } else {
          t.deepEqual(resolved, [
            ["She", "She"], ["joined", "joined"], ["the", "the"], ["WHO", "WHO"],
            ["(World", "WHO"], ["Health", "WHO"], ["Organization)", "WHO"],
            ["and", "and"], ["then", "then"], ["left.", "left."],
          ], label);
        }
      }
    }
  }
});

test("consecutive inline abbreviations' expansions each resolve to their own abbreviation", async (t) => {
  const html = '<p><abbr title="Lieutenant">Lt.</abbr> <abbr title="Colonel">Col.</abbr> Ward took command of the regiment.</p>';
  for (const mode of ["structure", "sentence"] as const) {
    for (const format of ["plain", "ssml"] as const) {
      const utterances = await extractUtterances(parseMarkup(html, undefined, { textrefs: true }), { format, segmentation: { mode }, interruptions: { abbreviation: "inline" } });
      const resolved = utterances.flatMap((utterance) => {
        const text = utterance.plain ?? utterance.ssml!.replace(/<[^>]+>/g, "");
        return [...text.matchAll(/\S+/g)].map((match) => {
          const result = resolveBoundaryLocate(utterance, match.index!, match[0].length);
          return [result?.word, result?.locate.text?.highlight];
        });
      });
      t.deepEqual(resolved, [
        ["Lieutenant", "Lt."], ["Colonel", "Col."], ["Ward", "Ward"], ["took", "took"],
        ["command", "command"], ["of", "of"], ["the", "the"], ["regiment.", "regiment."],
      ], `${mode} ${format}`);
    }
  }
});

test("resolveBoundaryLocate highlights every word of SSML whose formatting is split around a link or a sentence end", async (t) => {
  const html = [
    '<p lang="fr">Un <em>deux <a href="#x" lang="en">the link</a> trois. Quatre</em> cinq.</p>',
    '<p>One <em>two <a href="#x">three <strong>four</strong> five</a> six. Seven</em> eight.</p>',
    '<p>This <em>sentence <a href="#x">goes</a></em></p><p>on <em>here</em>. Next one.</p>',
  ];
  for (const markup of html) {
    for (const mode of ["structure", "sentence"] as const) {
      for (const language of ["always", "block-level"] as const) {
        const gnd = parseMarkup(markup, undefined, { textrefs: { roles: true } });
        for (const utterance of await extractUtterances(gnd, { format: "ssml", language, segmentation: { mode, reconstruct: true } })) {
          const plain = stripSsmlTags(utterance.ssml!);
          for (const word of plain.matchAll(/\S+/g)) {
            const resolved = resolveBoundaryLocate(utterance, word.index, word[0].length);
            t.is(resolved?.locate.text?.highlight, word[0], `${utterance.ssml} (${mode}, ${language})`);
          }
        }
      }
    }
  }
});

test("resolveBoundaryLocate highlights every word around a placeholder inside formatting", async (t) => {
  const gnd = () => [
    GuidedNavigationObject.deserialize({
      role: ["body"],
      textref: "c.xhtml",
      children: [
        {
          role: ["paragraph"],
          textref: `c.xhtml${encodeCssSelectorFragment("body > p")}`,
          text: { ssml: '<emphasis>One two <readium:pagebreak id="pb"/> three four.</emphasis> Five six.' },
          children: [{ id: "pb", role: ["pagebreak"], text: { plain: "5" } }],
        },
      ],
    })!,
  ];
  for (const mode of ["structure", "sentence"] as const) {
    const utterances = await extractUtterances(gnd(), { format: "ssml", segmentation: { mode }, interruptions: { pagebreak: "after" } });
    const words = utterances
      .filter((utterance) => utterance.offsets)
      .flatMap((utterance) =>
        [...stripSsmlTags(utterance.ssml!).matchAll(/\S+/g)].map((word) => resolveBoundaryLocate(utterance, word.index, word[0].length)?.locate.text?.highlight),
      );
    t.deepEqual(words, ["One", "two", "three", "four.", "Five", "six."], mode);
  }
});

test("resolveBoundaryLocate keeps a no-break space of the page text in the word's locate", async (t) => {
  const gnd = parseMarkup("<p>First sentence. It costs 10 euros today.</p>", undefined, { textrefs: true });
  for (const format of ["plain", "ssml"] as const) {
    const utterances = await extractUtterances(gnd, { format, segmentation: { mode: "sentence" } });
    const utterance = utterances.find((u) => (u.plain ?? u.ssml)!.startsWith("It costs"))!;
    const quote = utterance.offsets![0].locate.text!;
    t.true(quote.highlight!.includes("10 euros"), format);

    const text = utterance.plain ?? stripSsmlTags(utterance.ssml!);
    const locate = resolveBoundaryLocate(utterance, text.indexOf("euros"), "euros".length)!.locate.text!;
    t.is(locate.highlight, "euros", format);
    t.is(locate.before, "First sentence. It costs 10 ", format);
    t.is(locate.before! + locate.highlight + locate.after, (quote.before ?? "") + quote.highlight + (quote.after ?? ""), format);
  }
});

test("resolveBoundaryLocate locates a word under a text-fragment range textref on the word, not the range", async (t) => {
  for (const [selector, scope] of [[encodeCssSelectorFragment("body > p"), { cssSelector: "body > p" }], ["#", {}]] as const) {
    const gnd = [
      GuidedNavigationObject.deserialize({
        role: ["paragraph"],
        textref: `c.xhtml${selector}:~:text=Call%20me,world.`,
        text: { plain: "Call me Ishmael, said the sailor to the world." },
      })!,
    ];
    const [utterance] = await extractUtterances(gnd, { format: "plain" });
    t.is(utterance.offsets![0].locate.fragment, ":~:text=Call%20me,world.", selector);

    const resolved = resolveBoundaryLocate(utterance, utterance.plain!.indexOf("sailor"), "sailor".length);
    t.deepEqual(
      resolved?.locate,
      { ...scope, href: "c.xhtml", text: { highlight: "sailor", before: "Call me Ishmael, said the ", after: " to the world." } },
      selector,
    );
  }
});

test("a sentence under a text-fragment range textref without a CSS selector is quoted, not located on the range", async (t) => {
  const gnd = [
    GuidedNavigationObject.deserialize({
      role: ["paragraph"],
      textref: "c.xhtml#:~:text=Call%20me,the%20world.",
      text: { plain: "Call me Ishmael. Some years ago, I thought I would sail about and see the world." },
    })!,
  ];
  const [first] = await extractUtterances(gnd, { format: "plain", segmentation: { mode: "sentence" } });
  t.deepEqual(first.offsets![0].locate, {
    href: "c.xhtml",
    text: { highlight: "Call me Ishmael.", after: " Some years ago, I thought I would sail about and see the world." },
  });
});
