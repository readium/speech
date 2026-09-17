import test from "ava";
import { ssmlIndexToPlainIndex, stripSsmlTagsWithMap } from "../../src/utterances/text.js";

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
