import test from "ava";
import { GuidedNavigationObject, GuidedNavigationText } from "@readium/shared";
import { nodeText } from "../../src/utterances/nodeFields.js";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";

test("nodeText unwraps a root speak, taking its xml:lang when the text declares no language", (t) => {
  const text = nodeText(GuidedNavigationText.deserialize({ ssml: ' <speak version="1.1" xml:lang="fr"><emphasis>Bonjour</emphasis></speak> ' }));
  t.is(text?.ssml, "<emphasis>Bonjour</emphasis>");
  t.is(text?.language, "fr");
});

test("nodeText moves the speak's prefixed namespace declarations onto its top-level elements", (t) => {
  const ssml =
    '<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:x="urn:example">Hi <x:effect name="whispered">there</x:effect> <x:breath/><emphasis xmlns:x="urn:other">x</emphasis></speak>';
  t.is(
    nodeText(GuidedNavigationText.deserialize({ ssml }))?.ssml,
    'Hi <x:effect name="whispered" xmlns:x="urn:example">there</x:effect> <x:breath xmlns:x="urn:example"/><emphasis xmlns:x="urn:other">x</emphasis>',
  );
});

test("nodeText keeps the text's own language over the speak's", (t) => {
  t.is(nodeText(GuidedNavigationText.deserialize({ ssml: "<speak xml:lang='fr'>a</speak>", language: "de" }))?.language, "de");
});

test("nodeText leaves SSML that isn't wrapped in a single speak as written", (t) => {
  const text = GuidedNavigationText.deserialize({ ssml: "<speak>a</speak> b" })!;
  t.is(nodeText(text), text);
});

test("a node's root speak is unwrapped in its utterance, its language spoken", async (t) => {
  const gnd = [
    GuidedNavigationObject.deserialize({
      role: ["paragraph"],
      text: { ssml: '<speak xml:lang="fr"><emphasis>Bonjour <readium:pagebreak id="pb"/> le monde.</emphasis></speak>' },
      children: [{ id: "pb", role: ["pagebreak"], text: { plain: "5" } }],
    })!,
  ];
  const utterances = await extractUtterances(gnd, { format: "ssml", interruptions: { pagebreak: "inline" } });
  t.deepEqual(
    utterances.map((u) => [u.ssml, u.language]),
    [['<emphasis>Bonjour <lang xml:lang="en">Page 5</lang> le monde.</emphasis>', "fr"]],
  );
});

test("nodeText unwraps a root speak after a processing instruction holding a '>'", (t) => {
  const text = nodeText(GuidedNavigationText.deserialize({ ssml: '<?producer a > b?><speak xml:lang="fr">Bonjour</speak>' }));
  t.is(text?.ssml, "Bonjour");
  t.is(text?.language, "fr");
});

test("nodeText unwraps paragraphs and sentences, keeping their language and the space between them", (t) => {
  const text = nodeText(
    GuidedNavigationText.deserialize({ ssml: '<p><s>One.</s><s xml:lang="fr">Deux.</s></p><p>Three<s/>four.</p>' }),
  );
  t.is(text?.ssml, 'One. <lang xml:lang="fr">Deux.</lang> Three four.');
});

test("nodeText keeps the speak's and a removed paragraph's xml:base on what they held", (t) => {
  for (const ssml of ['<speak xml:base="http://example.com/a/"><audio src="clip.wav">Hi</audio></speak>', '<p xml:base="http://example.com/a/"><audio src="clip.wav">Hi</audio></p>']) {
    t.is(nodeText(GuidedNavigationText.deserialize({ ssml }))?.ssml, '<audio src="clip.wav" xml:base="http://example.com/a/">Hi</audio>', ssml);
  }
});

test("nodeText keeps a removed paragraph's namespace declarations on what it held, over the speak's", (t) => {
  const text = nodeText(
    GuidedNavigationText.deserialize({ ssml: '<speak xmlns:x="urn:outer"><p xml:lang="fr" xmlns:x="urn:inner"><x:effect>Hi</x:effect> <x:breath/></p></speak>' }),
  );
  t.is(text?.ssml, '<lang xml:lang="fr" xmlns:x="urn:outer"><x:effect xmlns:x="urn:inner">Hi</x:effect> <x:breath xmlns:x="urn:inner"/></lang>');
});

test("nodeText unwraps a paragraph in a root speak, keeping the speak's namespace declarations on what it held", (t) => {
  const text = nodeText(GuidedNavigationText.deserialize({ ssml: '<speak xmlns:x="urn:example"><p><x:effect>Hi</x:effect></p></speak>' }));
  t.is(text?.ssml, '<x:effect xmlns:x="urn:example">Hi</x:effect>');
});

test("a paragraph or sentence in a node's SSML is never repeated around its sentences", async (t) => {
  const gnd = [
    GuidedNavigationObject.deserialize({
      role: ["paragraph"],
      text: { ssml: '<p>One. <s xml:lang="fr">Deux. Trois.</s></p>' },
    })!,
  ];
  const utterances = await extractUtterances(gnd, { format: "ssml", language: "always", segmentation: { mode: "sentence" } });
  t.deepEqual(utterances.map((u) => u.ssml), ["One.", '<lang xml:lang="fr">Deux.</lang>', '<lang xml:lang="fr">Trois.</lang>']);
});
