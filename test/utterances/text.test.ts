import test from "ava";
import {
  ssmlIndexToPlainIndex,
  stripSsmlTagsWithMap,
  substitutedIndexToSourceIndex,
  substituteSsmlText,
  substituteWithMap,
} from "../../src/utterances/text.js";
import type { SubstitutionTable } from "../../src/utterances/types.js";

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

test("substituteSsmlText echoes a tag-boundary glue space into the returned ssml, not just plain", (t) => {
  const table: SubstitutionTable = { nomatch: "X" };
  const ssml = "foo<emphasis>bar</emphasis>baz";
  const result = substituteSsmlText(ssml, table);
  t.is(result.plain, "foo bar baz");
  t.is(result.ssml, "foo <emphasis>bar</emphasis> baz");
});
