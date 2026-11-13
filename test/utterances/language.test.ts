import test from "ava";
import { overrideLangTags, stripLangTags } from "../../src/utterances/language.js";

test("stripLangTags unwraps nested lang elements, keeping other elements", (t) => {
  t.is(stripLangTags('<lang xml:lang="fr">a <emphasis><lang xml:lang=\'de\'>b</lang></emphasis> c</lang>'), "a <emphasis>b</emphasis> c");
});

test("stripLangTags leaves SSML without a lang element as written", (t) => {
  t.is(stripLangTags("a &#34;b&#34;"), "a &#34;b&#34;");
});

test("overrideLangTags overrides a lang element in any attribute shape, nested or not", (t) => {
  t.is(
    overrideLangTags(`<p><lang id="x" xml:lang='en'>a <lang xml:lang="fr">b</lang></lang></p>`, { en: "en-GB" }),
    '<p><lang id="x" xml:lang="en-GB">a <lang xml:lang="fr">b</lang></lang></p>',
  );
});

test("overrideLangTags leaves SSML with nothing to override as written", (t) => {
  t.is(overrideLangTags(`<lang xml:lang='fr'>&#34;b&#34;</lang>`, { en: "en-GB" }), `<lang xml:lang='fr'>&#34;b&#34;</lang>`);
});

test("stripLangTags removes a paragraph's xml:lang, keeping the paragraph", (t) => {
  t.is(stripLangTags('<p xml:lang="fr">a <lang xml:lang="de">b</lang></p><s id="x" xml:lang="en">c</s>'), '<p>a b</p><s id="x">c</s>');
});

test("overrideLangTags overrides a sentence's xml:lang", (t) => {
  t.is(overrideLangTags('<s xml:lang="en">a</s>', { en: "en-GB" }), '<s xml:lang="en-GB">a</s>');
});
