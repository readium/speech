import test from "ava";
import { decodeSsmlEntities, parseSsml, serializeSsml, ssmlLeaves, type SsmlElement } from "../../src/utterances/ssml.js";

test("parseSsml builds nested elements", (t) => {
  const [lang] = parseSsml('<lang xml:lang="en"><sub alias="World Health Organization">WHO</sub></lang>') as SsmlElement[];
  t.is(lang.name, "lang");
  t.is(lang.attrs.get("xml:lang"), "en");
  const sub = lang.children[0] as SsmlElement;
  t.is(sub.name, "sub");
  t.is(sub.attrs.get("alias"), "World Health Organization");
  t.deepEqual(sub.children, [{ kind: "text", text: "WHO" }]);
});

test("parseSsml reads single-quoted attributes in any order", (t) => {
  const [lang] = parseSsml(`<lang id="x" xml:lang='fr'>a</lang>`) as SsmlElement[];
  t.is(lang.attrs.get("xml:lang"), "fr");
  t.is(lang.attrs.get("id"), "x");
});

test("parseSsml decodes named and numeric entities in text and attributes", (t) => {
  const [sub] = parseSsml('<sub alias="&quot;A&quot; &amp; B">a&#160;b&#x2014;&apos;</sub>') as SsmlElement[];
  t.is(sub.attrs.get("alias"), '"A" & B');
  t.deepEqual(sub.children, [{ kind: "text", text: "a b—'" }]);
});

test("decodeSsmlEntities leaves an unknown entity as written", (t) => {
  t.is(decodeSsmlEntities("&eacute;&lt;"), "&eacute;<");
});

test("decodeSsmlEntities reads &nbsp; as a no-break space", (t) => {
  t.is(decodeSsmlEntities("a&nbsp;b"), "a b");
});

test("parseSsml drops comments and processing instructions, and reads CDATA as text", (t) => {
  t.deepEqual(parseSsml('<?xml version="1.0"?>a<!-- b > c -->d<![CDATA[<e>]]>'), [{ kind: "text", text: "ad<e>" }]);
});

test("parseSsml reads input that isn't well-formed as one text node", (t) => {
  t.deepEqual(parseSsml("<p>a</s>"), [{ kind: "text", text: "<p>a</s>" }]);
  t.deepEqual(parseSsml("<p>a"), [{ kind: "text", text: "<p>a" }]);
});

test("serializeSsml round-trips the source byte for byte when entities are the ones it escapes", (t) => {
  const ssml = `<speak>a<p>b <emphasis level='strong'>c &amp; d</emphasis><break time="1s"/></p>e</speak>`;
  t.is(serializeSsml(parseSsml(ssml)), ssml);
});

test("ssmlLeaves lists text nodes and childless elements with their ancestors", (t) => {
  const leaves = ssmlLeaves(parseSsml("a<p>b<break/><emphasis>c</emphasis></p>"));
  t.deepEqual(
    leaves.map(({ node, ancestors }) => [node.kind === "text" ? node.text : `<${node.name}/>`, ancestors.map((a) => a.name)]),
    [
      ["a", []],
      ["b", ["p"]],
      ["<break/>", ["p"]],
      ["c", ["p", "emphasis"]],
    ],
  );
});
