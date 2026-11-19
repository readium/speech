import test from "ava";
import { GuidedNavigationText } from "@readium/shared";
import {
  hasLangTag,
  hasPlaceholder,
  removeEmptiedPairs,
  resolveNodeText,
  splitOnPlaceholders,
  splitOnLangTags,
  substitutePlainText,
  substituteSsmlText,
  toSourcePosition,
} from "../../src/utterances/text.js";
import { ssmlIndexToPlainIndex, stripSsmlTags, stripSsmlTagsKeepSpacing, stripSsmlTagsWithMap } from "../../src/utterances/plainText.js";
import { closeTags, openTags } from "../../src/utterances/ssml.js";
import { builtInSubstitutions } from "../../src/utterances/builtInSubstitutions.js";
import type { SubstitutionTable } from "../../src/utterances/types.js";

test("stripSsmlTagsWithMap never spaces apart two characters of a script written without spaces", (t) => {
  t.is(stripSsmlTagsWithMap("彼女は<emphasis>東京</emphasis>へ行った。").plain, "彼女は東京へ行った。");
});

test("stripSsmlTagsWithMap strips tags and maps each plain char back to its SSML source position", (t) => {
  const ssml = "<p>Hello <emphasis>world</emphasis>.</p>";
  const { plain, map } = stripSsmlTagsWithMap(ssml);
  t.is(plain, "Hello world.");
  t.is(map.length, plain.length);
  // "world" starts right after "<p>Hello <emphasis>" in the raw SSML.
  const worldStart = plain.indexOf("world");
  t.is(ssml.slice(map[worldStart], map[worldStart] + 1), "w");
});

test("stripSsmlTagsWithMap unescapes entities as single characters", (t) => {
  const ssml = "<p>Fish &amp; chips</p>";
  const { plain, map } = stripSsmlTagsWithMap(ssml);
  t.is(plain, "Fish & chips");
  t.is(map.length, plain.length);
});

test("stripSsmlTagsWithMap reads a > inside a comment, attribute or CDATA as the parser does, mapping each char to its source", (t) => {
  for (const [ssml, expected] of [
    ["One,<!-- comment > Phantom, --> Two", "One, Two"],
    ['A <say-as interpret-as="x>y">b</say-as> c', "A b c"],
    ["A<![CDATA[ x &amp; y ]]> z", "A x &amp; y z"],
  ]) {
    const { plain, map } = stripSsmlTagsWithMap(ssml);
    t.is(plain, expected);
    t.is(map.length, plain.length);
    for (let i = 0; i < plain.length; i++) if (plain[i] !== " ") t.is(ssml[map[i]], plain[i], `${ssml} at ${i}`);
  }
});

test("ssmlIndexToPlainIndex translates a raw SSML boundary position into the equivalent plain-text position", (t) => {
  const ssml = "<p>Hello <emphasis>world</emphasis>.</p>";
  const { plain, map } = stripSsmlTagsWithMap(ssml);
  const rawWorldStart = ssml.indexOf("world");
  const plainIndex = ssmlIndexToPlainIndex(map, rawWorldStart);
  t.is(plain.slice(plainIndex, plainIndex + "world".length), "world");
});

test("ssmlIndexToPlainIndex resolves a position inside a stripped tag to the next real character", (t) => {
  const ssml = "<p>Hello <emphasis>world</emphasis>.</p>";
  const { map } = stripSsmlTagsWithMap(ssml);
  const insideTag = ssml.indexOf("<emphasis>") + 3; // inside the tag itself
  const plainIndex = ssmlIndexToPlainIndex(map, insideTag);
  t.is(plainIndex, "Hello ".length); // lands on "world"'s first character
});

test("substitutePlainText replaces a literal token and records where it was spoken and what it replaced", (t) => {
  const table: SubstitutionTable = { "(c)": "©" };
  const { text, replacements } = substitutePlainText("Copyright (c) 2026", table);
  t.is(text, "Copyright © 2026");
  t.deepEqual(replacements, [{ spoken: { start: 10, end: 11 }, source: { start: 10, end: 13 } }]);
});

test("substitutePlainText records a variable-length adjacency pattern's whole match", (t) => {
  const table: SubstitutionTable = { deg: { pattern: /(\d+)\s?deg\b/g, replace: (_m: string, digits: string) => `${digits}°` } };
  const { text, replacements } = substitutePlainText("Water boils at 100deg Celsius.", table);
  t.is(text, "Water boils at 100° Celsius.");
  t.deepEqual(replacements, [{ spoken: { start: 15, end: 19 }, source: { start: 15, end: 21 } }]);
});

test("substitutePlainText counts a surrogate-pair replacement by UTF-16 code unit", (t) => {
  const { text, replacements } = substitutePlainText("cheer", { cheer: "🎉" });
  t.is(replacements[0].spoken.end, text.length);
});

test("substitutePlainText leaves a token untouched when its adjacency requirement isn't met", (t) => {
  const table: SubstitutionTable = { deg: { pattern: /(\d+)\s?deg\b/g, replace: (_m: string, digits: string) => `${digits}°` } };
  const { text } = substitutePlainText("This is a deg without digits.", table);
  t.is(text, "This is a deg without digits.");
});

test("substitutePlainText rejects a literal match embedded inside a larger word/number", (t) => {
  const table: SubstitutionTable = { "1/2": "½" };
  const { text } = substitutePlainText("31/2 is not one half", table);
  t.is(text, "31/2 is not one half");
});

test("substitutePlainText resolves overlapping matches from different rules leftmost-first", (t) => {
  const table: SubstitutionTable = {
    ab: "X",
    b: { pattern: /b/g, replace: "Y" },
  };
  const { text } = substitutePlainText("ab", table);
  t.is(text, "X"); // "ab" (start 0) wins over the overlapping "b" (start 1)
});

test("toSourcePosition takes in a replacement's whole source at either edge, and shifts the text after it", (t) => {
  const original = "Plants absorb CO2 from the air.";
  const { text, replacements } = substitutePlainText(original, { CO2: "carbon dioxide" });
  const source = (word: string) => {
    const start = text.indexOf(word);
    return original.slice(toSourcePosition(replacements, start, "start"), toSourcePosition(replacements, start + word.length, "end"));
  };
  t.is(source("carbon"), "CO2");
  t.is(source("dioxide"), "CO2");
  t.is(source("absorb"), "absorb");
  t.is(source("from"), "from");
  t.is(toSourcePosition(replacements, text.length, "end"), original.length);
});

test("toSourcePosition keeps a deletion out of the word ending or starting right next to it", (t) => {
  const original = "value[sic] was";
  const { text, replacements } = substitutePlainText(original, { sic: { pattern: /\[sic\]/g, replace: "" } });
  t.is(text, "value was");
  t.is(toSourcePosition(replacements, "value".length, "end"), "value".length);
  t.is(toSourcePosition(replacements, "value".length, "start"), "value[sic]".length);
});

test("toSourcePosition resolves every word among many replacements, adjacent ones included", (t) => {
  const original = "Mix 1/2 1/4 cup CO2 and (c) 3/4 water(TM) now.";
  const { text, replacements } = substitutePlainText(original, { ...builtInSubstitutions, CO2: "carbon dioxide" });
  t.is(text, "Mix ½ ¼ cup carbon dioxide and © ¾ water™ now.");
  const sources = [...text.matchAll(/\S+/g)].map((m) =>
    original.slice(toSourcePosition(replacements, m.index, "start"), toSourcePosition(replacements, m.index + m[0].length, "end")),
  );
  t.deepEqual(sources, ["Mix", "1/2", "1/4", "cup", "CO2", "CO2", "and", "(c)", "3/4", "water(TM)", "now."]);
});

test("substituteSsmlText rewrites text content but leaves tags/attributes untouched", (t) => {
  const table: SubstitutionTable = { "(c)": "©" };
  const ssml = 'Copyright (c) 2026, <lang xml:lang="fr">(c) non traduit</lang>';
  const result = substituteSsmlText(ssml, table);
  t.is(result.ssml, 'Copyright © 2026, <lang xml:lang="fr">© non traduit</lang>');
});

test("substituteSsmlText escapes a custom replace() result before splicing it into SSML", (t) => {
  const table: SubstitutionTable = { angle: { pattern: /angle/g, replace: "<b>&</b>" } };
  const result = substituteSsmlText("an angle here", table);
  t.is(result.ssml, "an &lt;b&gt;&amp;&lt;/b&gt; here");
});

test("substituteSsmlText applies a match that crosses a tag boundary, spliced in flat", (t) => {
  const table: SubstitutionTable = { "1)": "X" };
  const ssml = "1<emphasis>)</emphasis> rest";
  const result = substituteSsmlText(ssml, table);
  // "1)" spans the emphasis tag, so there's no single tag it could stay wrapped
  // in — it's substituted flat rather than left unmatched.
  t.is(result.ssml, "X rest");
  t.is(result.plain, "1) rest");
});

test("substituteSsmlText keeps a match fully inside one atom wrapped in its tag, even next to a crossing match", (t) => {
  const table: SubstitutionTable = { "(c)": "©", "1)": "X" };
  const ssml = '1<emphasis>)</emphasis> and <lang xml:lang="fr">(c)</lang> too';
  const result = substituteSsmlText(ssml, table);
  t.is(result.ssml, 'X and <lang xml:lang="fr">©</lang> too');
  t.is(result.plain, "1) and (c) too");
});

test("substituteSsmlText keeps nested elements as markup", (t) => {
  const table: SubstitutionTable = { nomatch: "X" };
  t.is(
    substituteSsmlText('x<lang xml:lang="en"><sub alias="World Health Organization">WHO</sub></lang>y', table).ssml,
    'x<lang xml:lang="en"><sub alias="World Health Organization">WHO</sub></lang>y',
  );
  t.is(substituteSsmlText("<speak>a<p>b</p>c</speak>", table).ssml, "<speak>a <p>b</p> c</speak>");
});

test("substituteSsmlText keeps a match within one nested text node in all its elements", (t) => {
  const result = substituteSsmlText('<lang xml:lang="fr"><emphasis>(c)</emphasis> x</lang>', { "(c)": "©" });
  t.is(result.ssml, '<lang xml:lang="fr"><emphasis>©</emphasis> x</lang>');
});

test("substituteSsmlText puts a match crossing nested elements in the innermost element enclosing all of it", (t) => {
  const result = substituteSsmlText('<lang xml:lang="fr">1<emphasis>)</emphasis> x</lang>', { "1)": "X" });
  t.is(result.ssml, '<lang xml:lang="fr">X x</lang>');
  t.is(result.plain, "1) x");
});

test("substituteSsmlText keeps a self-closing element inside a nested element", (t) => {
  t.is(substituteSsmlText("a<emphasis>b<break/>c</emphasis>d", { nomatch: "X" }).ssml, "a<emphasis>b<break/> c</emphasis>d");
});

test("substituteSsmlText echoes a break's glue space into the returned ssml, not just plain", (t) => {
  const table: SubstitutionTable = { nomatch: "X" };
  const result = substituteSsmlText("foo<break/>bar", table);
  t.is(result.plain, "foo bar");
  t.is(result.ssml, "foo<break/> bar");
});

test("substituteSsmlText adds no space around inline formatting within a word", (t) => {
  const table: SubstitutionTable = { nomatch: "X" };
  const result = substituteSsmlText("foo<emphasis>bar</emphasis>baz", table);
  t.is(result.plain, "foobarbaz");
  t.is(result.ssml, "foo<emphasis>bar</emphasis>baz");
});

test("stripSsmlTagsKeepSpacing reads a break as a space, not inline formatting or binding punctuation", (t) => {
  t.is(stripSsmlTagsKeepSpacing("across<break/>two <emphasis>bold</emphasis>ly<break/>, then"), "across two boldly, then");
});

test("stripSsmlTagsWithMap separates words at a sentence or paragraph element, not inline formatting", (t) => {
  t.is(stripSsmlTagsWithMap("<s>Hello.</s><s>World.</s>").plain, "Hello. World.");
  t.is(stripSsmlTagsWithMap("one<p>two</p>three").plain, "one two three");
  t.is(stripSsmlTagsWithMap("<speak>two<emphasis>fold</emphasis></speak>").plain, "twofold");
});

test("stripSsmlTagsKeepSpacing separates words at a sentence element", (t) => {
  t.is(stripSsmlTagsKeepSpacing("<s>Hello.</s><s>World.</s>"), "Hello. World.");
});

test("substituteSsmlText positions its replacements on the text engines speak, a doubled space collapsed", (t) => {
  const result = substituteSsmlText("A  value [sic] <emphasis>was</emphasis> wrong.", { sic: { pattern: /\[sic\]/g, replace: "" } });
  const spoken = stripSsmlTags(result.ssml);
  t.is(spoken, "A value was wrong.");
  t.is(result.plain, "A value [sic] was wrong.");
  // The space after "[sic]" is dropped from the spoken text only, so it goes with the deletion.
  t.deepEqual(result.replacements, [{ spoken: { start: 8, end: 8 }, source: { start: 8, end: 14 } }]);
  const was = spoken.indexOf("was");
  t.is(result.plain.slice(toSourcePosition(result.replacements, was, "start"), toSourcePosition(result.replacements, was + 3, "end")), "was");
});

test("substituteSsmlText writes a zero-width match where it sits, at the start, middle or end", (t) => {
  const ssml = "a <emphasis>b</emphasis> c";
  t.is(substituteSsmlText(ssml, { prefix: { pattern: /^/, replace: "Note: " } }).ssml, "Note: a <emphasis>b</emphasis> c");
  t.is(substituteSsmlText(ssml, { middle: { pattern: /(?=b)/, replace: "[" } }).ssml, "a <emphasis>[b</emphasis> c");
  t.is(substituteSsmlText(ssml, { suffix: { pattern: /$/, replace: " (end)" } }).ssml, "a <emphasis>b</emphasis> c (end)");
});

test("substituteSsmlText separates words at a paragraph element, outside its tags", (t) => {
  const result = substituteSsmlText("one<p>two</p>three", { nomatch: "X" });
  t.is(result.plain, "one two three");
  t.is(result.ssml, "one <p>two</p> three");
});

test("stripSsmlTagsWithMap decodes every entity, mapping each decoded char to the entity's position", (t) => {
  const { plain, map } = stripSsmlTagsWithMap("&quot;a&#x1F600;&nbsp;b");
  t.is(plain, '"a\u{1F600} b');
  t.deepEqual(map, [0, 6, 7, 7, 16, 22]);
});

test("stripSsmlTags decodes an escaped angle bracket as text, not as a tag", (t) => {
  t.is(stripSsmlTags("&#60;b&#62;bold&amp;lt;"), "<b>bold&lt;");
});

test("stripSsmlTagsKeepSpacing keeps whitespace as is", (t) => {
  t.is(stripSsmlTagsKeepSpacing(" a  &amp; b "), " a  & b ");
});

test("stripSsmlTagsKeepSpacing reads a > inside a comment, attribute or CDATA as the parser does", (t) => {
  t.is(stripSsmlTagsKeepSpacing("One,<!-- comment > Phantom, --> Two"), "One, Two");
  t.is(stripSsmlTagsKeepSpacing('A <say-as interpret-as="x>y">b</say-as> c'), "A b c");
  t.is(stripSsmlTagsKeepSpacing("A<![CDATA[ x > y ]]> z"), "A x > y  z");
});

test("hasLangTag finds a lang element in any attribute shape, nested or not", (t) => {
  t.true(hasLangTag("<p>a <lang xml:lang='fr'>b</lang></p>"));
});

test("hasLangTag finds xml:lang on a paragraph, sentence, voice, token or word, not on other elements", (t) => {
  for (const name of ["p", "s", "voice", "token", "w"]) t.true(hasLangTag(`<${name} xml:lang="fr">a</${name}>`), name);
  t.false(hasLangTag('<emphasis xml:lang="fr">a</emphasis>'));
});

test("splitOnLangTags reads a single-quoted xml:lang", (t) => {
  t.deepEqual(splitOnLangTags("<lang xml:lang='fr'>bonjour</lang> hi", "en"), [
    { plain: "bonjour", language: "fr" },
    { plain: "hi", language: "en" },
  ]);
});

test("splitOnLangTags gives text in nested lang elements the innermost one's language", (t) => {
  t.deepEqual(splitOnLangTags('<lang xml:lang="fr">a <lang xml:lang="de">b</lang> c</lang> d', "en"), [
    { plain: "a", language: "fr" },
    { plain: "b", language: "de" },
    { plain: "c", language: "fr" },
    { plain: "d", language: "en" },
  ]);
});

test("splitOnLangTags keeps punctuation touching a lang element nested in another element with that element", (t) => {
  t.deepEqual(splitOnLangTags('<p>He said « <emphasis><lang xml:lang="fr">oui</lang></emphasis> ».</p>', "en"), [
    { plain: "He said", language: "en" },
    { plain: "« oui ».", language: "fr" },
  ]);
});

test("splitOnLangTags keeps punctuation touching a lang element with it inside a paragraph declaring a language", (t) => {
  t.deepEqual(splitOnLangTags('<p xml:lang="en">He said « <lang xml:lang="fr">oui</lang> ».</p>', "de"), [
    { plain: "He said", language: "en" },
    { plain: "« oui ».", language: "fr" },
  ]);
});

test("splitOnLangTags leaves punctuation between sibling lang elements where it is", (t) => {
  t.deepEqual(splitOnLangTags('<lang xml:lang="fr">oui</lang> « <lang xml:lang="de">ja</lang>', "en"), [
    { plain: "oui", language: "fr" },
    { plain: "« ja", language: "de" },
  ]);
});

test("hasPlaceholder finds a placeholder nested in an element, with single-quoted attributes", (t) => {
  t.true(hasPlaceholder("<p><readium:pagebreak id='p1'/></p>"));
});

const segmentSsml = (ssml: string) => splitOnPlaceholders(ssml).map((segment) => segment.ssml ?? segment.placeholderId);

test("splitOnPlaceholders reads a sub with a single-quoted alias", (t) => {
  const segments = splitOnPlaceholders("The <sub alias='World Health Organization'>WHO</sub> said");
  t.deepEqual(segments.map((segment) => segment.ssml), ["The", "WHO", "World Health Organization", "said"]);
  t.like(segments[2], { abbreviation: "alias", abbreviationText: "WHO", parenthesizedSsml: "(World Health Organization)" });
});

test("splitOnPlaceholders cuts the source where a placeholder is, leaving each element opened once and closed once", (t) => {
  const segments = splitOnPlaceholders('<p>a <emphasis>b <readium:noteref id="n"/> c</emphasis> d</p>');
  t.deepEqual(segments.map((segment) => segment.ssml ?? segment.placeholderId), ["<p>a <emphasis>b", "n", "c</emphasis> d</p>"]);
  t.like(segments[1], { textBefore: "a b ", textAfter: " c d" });
});

test("splitOnPlaceholders gives a segment the elements open around it, to read it on its own", (t) => {
  const [before, , after] = splitOnPlaceholders('<lang xml:lang="fr"><p>a <readium:noteref id="n"/> b</p></lang>');
  t.deepEqual([before.ssml, openTags(before.open!), closeTags(before.close!)], ['<lang xml:lang="fr"><p>a', "", "</p></lang>"]);
  t.deepEqual([after.ssml, openTags(after.open!), closeTags(after.close!)], ["b</p></lang>", '<lang xml:lang="fr"><p>', ""]);
});

test("splitOnPlaceholders keeps a paragraph around a sub once, in the text around it", (t) => {
  const segments = splitOnPlaceholders('<p>The <sub alias="World Health Organization">WHO</sub> said</p>');
  t.deepEqual(segments.map((segment) => segment.ssml), ["<p>The", "WHO", "World Health Organization", "said</p>"]);
  t.deepEqual([openTags(segments[1].open!), closeTags(segments[1].close!)], ["<p>", "</p>"]);
});

test("splitOnPlaceholders keeps formatting wrapping just a sub on the abbreviation and its alias, with its attached text", (t) => {
  const segments = splitOnPlaceholders('The <emphasis><sub alias="World Health Organization">WHO</sub></emphasis>s said');
  t.deepEqual(segments.map((segment) => segment.ssml), ["The", "<emphasis>WHOs</emphasis>", "<emphasis>World Health Organizations</emphasis>", "said"]);
  t.like(segments[2], { parenthesizedSsml: "<emphasis>(World Health Organization)</emphasis>" });
});

test("splitOnPlaceholders keeps a sentence before a placeholder as written", (t) => {
  t.deepEqual(segmentSsml('<s>a</s> <readium:noteref id="n"/>'), ["<s>a</s>", "n"]);
});

test("removeEmptiedPairs removes every element the removal leaves empty, nested or not", (t) => {
  const { ssml } = removeEmptiedPairs('a <emphasis><lang xml:lang="fr">(</lang></emphasis><readium:noteref id="n"/>) b', () => true, "en");
  t.is(ssml, 'a <readium:noteref id="n"/> b');
});

test("removeEmptiedPairs removes the bracket of the emptied pair, not a copy of it in another element", (t) => {
  const cases = [
    ['a (<readium:noteref id="n"/>)<emphasis>)</emphasis> b', 'a <readium:noteref id="n"/><emphasis>)</emphasis> b'],
    ['a <emphasis>(</emphasis><readium:noteref id="n"/>)( b', 'a <readium:noteref id="n"/>( b'],
    ['a ((<readium:noteref id="n"/>) b', 'a (<readium:noteref id="n"/> b'],
  ];
  for (const [input, expected] of cases) t.is(removeEmptiedPairs(input, () => true, "en").ssml, expected, input);
});

test("resolveNodeText removes a placeholder nested in an element, with the space before binding punctuation", (t) => {
  t.deepEqual(resolveNodeText(GuidedNavigationText.deserialize({ ssml: "<emphasis>word <readium:noteref id='n'/>.</emphasis>" })), { ssml: "<emphasis>word.</emphasis>" });
});

test("splitOnLangTags reads the language of a paragraph or sentence declaring one", (t) => {
  t.deepEqual(splitOnLangTags('<p xml:lang="fr">Bonjour.</p> <p><s xml:lang="de">Hallo.</s> Hi.</p>', "en"), [
    { plain: "Bonjour.", language: "fr" },
    { plain: "Hallo.", language: "de" },
    { plain: "Hi.", language: "en" },
  ]);
});
