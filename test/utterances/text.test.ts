import test from "ava";
import { GuidedNavigationText } from "@readium/shared";
import {
  hasLangTag,
  hasPlaceholder,
  removeEmptiedPairs,
  resolveNodeText,
  splitOnPlaceholders,
  splitOnLangTags,
  ssmlIndexToPlainIndex,
  stripSsmlTags,
  stripSsmlTagsKeepSpacing,
  stripSsmlTagsWithMap,
  substitutedIndexToSourceIndex,
  substituteSsmlText,
  substituteWithMap,
} from "../../src/utterances/text.js";
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

test("substituteWithMap replaces a literal token and maps every output char back to the match's start", (t) => {
  const table: SubstitutionTable = { "(c)": "©" };
  const { text, map } = substituteWithMap("Copyright (c) 2026", table);
  t.is(text, "Copyright © 2026");
  t.is(map.length, text.length);
  const symbolIndex = text.indexOf("©");
  t.is(map[symbolIndex], "Copyright (c) 2026".indexOf("(c)"));
});

test("substituteWithMap shrinks a variable-length adjacency pattern, mapping the whole replacement to the match start", (t) => {
  const table: SubstitutionTable = { deg: { pattern: /(\d+)\s?deg\b/g, replace: (_m: string, digits: string) => `${digits}°` } };
  const { text, map } = substituteWithMap("Water boils at 100deg Celsius.", table);
  t.is(text, "Water boils at 100° Celsius.");
  const matchStart = "Water boils at ".length;
  // Every char of "100°" maps back to the original match's start index.
  for (let i = 0; i < "100°".length; i++) t.is(map[matchStart + i], matchStart);
  // Text after the match resumes at the correct original-source position.
  t.is(map[text.indexOf(" Celsius")], "Water boils at 100deg".length);
});

test("substituteWithMap keeps map/text length in sync for a surrogate-pair replacement", (t) => {
  const { text, map } = substituteWithMap("cheer", { cheer: "🎉" });
  t.is(map.length, text.length);
});

test("substituteWithMap leaves a token untouched when its adjacency requirement isn't met", (t) => {
  const table: SubstitutionTable = { deg: { pattern: /(\d+)\s?deg\b/g, replace: (_m: string, digits: string) => `${digits}°` } };
  const { text } = substituteWithMap("This is a deg without digits.", table);
  t.is(text, "This is a deg without digits.");
});

test("substituteWithMap rejects a literal match embedded inside a larger word/number", (t) => {
  const table: SubstitutionTable = { "1/2": "½" };
  const { text } = substituteWithMap("31/2 is not one half", table);
  t.is(text, "31/2 is not one half");
});

test("substituteWithMap resolves overlapping matches from different rules leftmost-first", (t) => {
  const table: SubstitutionTable = {
    ab: "X",
    b: { pattern: /b/g, replace: "Y" },
  };
  const { text } = substituteWithMap("ab", table);
  t.is(text, "X"); // "ab" (start 0) wins over the overlapping "b" (start 1)
});

test("substitutedIndexToSourceIndex translates a substituted-space index back to its original-text index", (t) => {
  const table: SubstitutionTable = { deg: { pattern: /(\d+)\s?deg\b/g, replace: (_m: string, digits: string) => `${digits}°` } };
  const original = "Water boils at 100deg Celsius.";
  const { text, map } = substituteWithMap(original, table);
  const degreeSymbolIndex = text.indexOf("°");
  t.is(substitutedIndexToSourceIndex(map, degreeSymbolIndex), original.indexOf("100deg"));
  // The end-exclusive bound of the whole string lands one past the last mapped char.
  t.is(substitutedIndexToSourceIndex(map, text.length), original.length);
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

test("hasLangTag finds a lang element in any attribute shape, nested or not", (t) => {
  t.true(hasLangTag("<p>a <lang xml:lang='fr'>b</lang></p>"));
  t.false(hasLangTag("<p xml:lang=\"fr\">a</p>"));
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
  t.like(before, { ssml: '<lang xml:lang="fr"><p>a', openTags: "", closeTags: "</p></lang>" });
  t.like(after, { ssml: "b</p></lang>", openTags: '<lang xml:lang="fr"><p>', closeTags: "" });
});

test("splitOnPlaceholders keeps a paragraph around a sub once, in the text around it", (t) => {
  const segments = splitOnPlaceholders('<p>The <sub alias="World Health Organization">WHO</sub> said</p>');
  t.deepEqual(segments.map((segment) => segment.ssml), ["<p>The", "WHO", "World Health Organization", "said</p>"]);
  t.like(segments[1], { openTags: "<p>", closeTags: "</p>" });
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

test("resolveNodeText removes a placeholder nested in an element, with the space before binding punctuation", (t) => {
  t.deepEqual(resolveNodeText(GuidedNavigationText.deserialize({ ssml: "<emphasis>word <readium:noteref id='n'/>.</emphasis>" })), { ssml: "<emphasis>word.</emphasis>" });
});
