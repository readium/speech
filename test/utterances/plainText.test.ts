import test from "ava";
import { layoutSsml, stripSsmlTagsKeepSpacing, stripSsmlTagsWithMap, textReader } from "../../src/utterances/plainText.js";
import { splitSsmlAtSentences } from "../../src/utterances/splitSsmlAtSentences.js";

const corpus = [
  "<s>Hello.</s><s>World.</s>",
  "across<break/>two <emphasis>bold</emphasis>ly<break/>, then",
  " a  &amp; b ",
  "One,<!-- comment > Phantom, --> Two",
  'A <say-as interpret-as="x>y">b</say-as> c',
  "A<![CDATA[ x &amp; y ]]> z",
  "a<!---->b",
  "<p></p>x<p>y</p>z",
  "<voice name='a'>a</voice><voice name='b'>b</voice>",
  'Before. <audio src="clip.wav">One. Two.</audio> After.',
  "unclosed <emphasis>a",
  "a</emphasis> b",
  "彼女は<s>東京</s>へ",
  "a&#x1F600;<break/>b",
];

test("every SSML plain-text reading agrees with the sentence splitter's", async (t) => {
  for (const ssml of corpus) {
    let split = "";
    await splitSsmlAtSentences(ssml, "en", async (_language, plain) => {
      split = plain;
      return [];
    });
    const plain = stripSsmlTagsKeepSpacing(ssml);
    t.is(plain, split, ssml);
    t.is(stripSsmlTagsWithMap(ssml).plain, plain.replace(/ {2,}/g, " ").trim(), ssml);
  }
});

test("stripSsmlTagsWithMap maps each char to the source char or entity it's read from", (t) => {
  for (const ssml of corpus) {
    const { plain, map } = stripSsmlTagsWithMap(ssml);
    t.is(map.length, plain.length, ssml);
    for (let i = 0; i < plain.length; i++) {
      if (plain[i] !== " " && ssml[map[i]] !== "&") t.is(ssml[map[i]], plain[i], `${ssml} at ${i}`);
    }
  }
});

test("textReader reads a source span's text, decoded, without tags or separator spaces", (t) => {
  const ssml = "a<emphasis>b &amp; c</emphasis><break/>d";
  const textIn = textReader(layoutSsml(ssml).pieces);
  t.is(textIn(0, ssml.length), "ab & cd");
  t.is(textIn(ssml.indexOf("b"), ssml.indexOf("</emphasis>")), "b & c");
});
