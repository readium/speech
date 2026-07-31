import test from "ava";
import { chunkPlainText, chunkSsmlText } from "../../build/index.js";

function reconstruct(chunks: { text: string; offset: number }[]): string {
  return chunks.map(c => c.text).join("");
}

// =============================================
// chunkPlainText
// =============================================

test("chunkPlainText returns the text unchanged as a single chunk when under budget", (t) => {
  const chunks = chunkPlainText("Short sentence.", 100);
  t.deepEqual(chunks, [{ text: "Short sentence.", offset: 0 }]);
});

test("chunkPlainText splits multiple sentences at sentence boundaries once over budget", (t) => {
  const text = "First sentence. Second sentence. Third sentence.";
  const chunks = chunkPlainText(text, 20);

  t.true(chunks.length > 1);
  for (const chunk of chunks) {
    t.true(chunk.text.length <= 20, `chunk "${chunk.text}" exceeds budget`);
  }
  t.is(reconstruct(chunks), text, "chunks concatenate back into the exact original text");
  for (const chunk of chunks) {
    t.is(text.slice(chunk.offset, chunk.offset + chunk.text.length), chunk.text, "offset matches the original text");
  }
});

test("chunkPlainText falls back to word-boundary packing when a single sentence exceeds the budget", (t) => {
  const text = "This one sentence by itself is much longer than the tiny budget allowed here.";
  const chunks = chunkPlainText(text, 20);

  t.true(chunks.length > 1);
  for (const chunk of chunks) {
    t.true(chunk.text.length <= 20, `chunk "${chunk.text}" exceeds budget`);
  }
  t.is(reconstruct(chunks), text);
  // No chunk boundary lands mid-word: every chunk (but possibly the last) ends on whitespace.
  for (const chunk of chunks.slice(0, -1)) {
    t.regex(chunk.text, /\s$/, `chunk "${chunk.text}" should end on whitespace, not mid-word`);
  }
});

test("chunkPlainText hard-splits a single word longer than the budget as a last resort", (t) => {
  const text = "Supercalifragilisticexpialidocious";
  const chunks = chunkPlainText(text, 10);

  t.true(chunks.length > 1);
  for (const chunk of chunks) {
    t.true(chunk.text.length <= 10);
  }
  t.is(reconstruct(chunks), text);
});

test("chunkPlainText: an atom exceeding maxLength alone is still emitted as its own oversized chunk", (t) => {
  // A single "word" with no spaces, longer than the budget and not further divisible cleanly,
  // still comes back as one chunk if hard-splitting isn't triggered (word == budget edge case).
  const chunks = chunkPlainText("word.", 4);
  t.true(chunks.every(c => c.text.length > 0));
  t.is(reconstruct(chunks), "word.");
});

test("chunkPlainText splits CJK text at full-width sentence punctuation, with no space required between sentences", (t) => {
  const text = "这是一个测试句子。这是第二个句子！这是第三个句子？".repeat(3);
  const chunks = chunkPlainText(text, 15);

  t.true(chunks.length > 1);
  t.is(reconstruct(chunks), text, "no text is dropped even though CJK sentences run together with no whitespace");
  for (const chunk of chunks) {
    t.true(chunk.text.length <= 15, `chunk "${chunk.text}" exceeds budget`);
  }
});

test("chunkPlainText never splits a surrogate pair (e.g. an emoji) during a hard character split", (t) => {
  const text = "\u{1F600}".repeat(20); // 20 emoji, no whitespace/punctuation to split on
  const chunks = chunkPlainText(text, 15);

  t.is(reconstruct(chunks), text);
  for (const chunk of chunks) {
    for (let i = 0; i < chunk.text.length; i++) {
      const code = chunk.text.charCodeAt(i);
      if (code >= 0xd800 && code <= 0xdbff) {
        const next = chunk.text.charCodeAt(i + 1);
        t.true(next >= 0xdc00 && next <= 0xdfff, `chunk "${chunk.text}" ends mid-surrogate-pair`);
      }
    }
  }
});

// =============================================
// chunkSsmlText
// =============================================

test("chunkSsmlText returns the text unchanged as a single chunk when under budget", (t) => {
  const text = "Hello <lang xml:lang=\"fr\">bonjour</lang> there.";
  const chunks = chunkSsmlText(text, 100);
  t.deepEqual(chunks, [{ text, offset: 0 }]);
});

test("chunkSsmlText never splits inside a tag span", (t) => {
  const text = "Hello <lang xml:lang=\"fr\">bonjour tout le monde</lang> and <lang xml:lang=\"es\">hola a todos</lang> there my friend.";
  const chunks = chunkSsmlText(text, 30);

  t.true(chunks.length > 1);
  t.is(reconstruct(chunks), text, "chunks concatenate back into the exact original text");
  for (const chunk of chunks) {
    const openTags = (chunk.text.match(/<lang\b[^>]*>/g) ?? []).length;
    const closeTags = (chunk.text.match(/<\/lang>/g) ?? []).length;
    t.is(openTags, closeTags, `chunk "${chunk.text}" has an unbalanced <lang> tag`);
  }
});

test("chunkSsmlText emits a single atomic tag span exceeding maxLength as one oversized chunk", (t) => {
  const text = "Hi. <lang xml:lang=\"fr\">this whole tagged phrase is longer than the tiny budget</lang> bye.";
  const chunks = chunkSsmlText(text, 15);

  t.is(reconstruct(chunks), text);
  const tagChunk = chunks.find(c => c.text.includes("<lang"));
  t.truthy(tagChunk);
  t.true(tagChunk!.text.length > 15, "the tag span chunk is allowed to exceed the budget rather than being corrupted");
  t.regex(tagChunk!.text, /^<lang[^>]*>.*<\/lang>$/, "the tag span is emitted whole, unsplit");
});
