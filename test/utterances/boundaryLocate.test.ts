import "../domSetup.js";
import test from "ava";
import { GuidedNavigationObject } from "@readium/shared";
import { encodeCssSelectorFragment, parseMarkup } from "@readium/guided-navigation";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";
import { resolveBoundaryLocate } from "../../src/utterances/boundaryLocate.js";
import { stripSsmlTags } from "../../src/utterances/plainText.js";

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
    t.is(resolveBoundaryLocate(biblioref, charIndex, word.length), undefined, `"${word}" must not resolve a doomed per-word quote`);
  }
});

test("resolveBoundaryLocate drops a piece's domRange, so a consumer trying domRange before text.highlight doesn't anchor the whole piece instead of the word", (t) => {
  const utterance = {
    plain: "Speech Synthesis",
    offsets: [{
      start: 0,
      end: 17,
      locate: {
        cssSelector: "h1",
        domRange: { start: { cssSelector: "h1", textNodeIndex: 0, charOffset: 0 } },
        text: { highlight: "Speech Synthesis" },
      },
    }],
  };

  const charIndex = utterance.plain.indexOf("Synthesis");
  const resolved = resolveBoundaryLocate(utterance, charIndex, "Synthesis".length);
  t.is(resolved?.word, "Synthesis");
  t.is(resolved?.locate.domRange, undefined);
  t.is(resolved?.locate.cssSelector, "h1");
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
  // the end-exclusive edge case substitutedIndexToSourceIndex must handle.
  t.is(charIndex + "Celsius.".length, utterance.plain!.length);
  const resolved = resolveBoundaryLocate(utterance, charIndex, "Celsius.".length);
  t.is(resolved?.locate.text?.highlight, "Celsius.");
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
          } else t.is(resolved, undefined, label);
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
