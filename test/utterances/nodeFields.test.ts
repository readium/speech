import test from "ava";
import { GuidedNavigationObject, GuidedNavigationText } from "@readium/shared";
import { nodeText } from "../../src/utterances/nodeFields.js";
import { extractUtterances } from "../../src/utterances/extractUtterances.js";

test("nodeText unwraps a root speak, taking its xml:lang when the text declares no language", (t) => {
  const text = nodeText(GuidedNavigationText.deserialize({ ssml: ' <speak version="1.1" xml:lang="fr"><p>Bonjour</p></speak> ' }));
  t.is(text?.ssml, "<p>Bonjour</p>");
  t.is(text?.language, "fr");
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
      text: { ssml: '<speak xml:lang="fr"><p>Bonjour <readium:pagebreak id="pb"/> le monde.</p></speak>' },
      children: [{ id: "pb", role: ["pagebreak"], text: { plain: "5" } }],
    })!,
  ];
  const utterances = await extractUtterances(gnd, { format: "ssml", interruptions: { pagebreak: "inline" } });
  t.deepEqual(
    utterances.map((u) => [u.ssml, u.language]),
    [['<p>Bonjour <lang xml:lang="en">Page 5</lang> le monde.</p>', "fr"]],
  );
});
