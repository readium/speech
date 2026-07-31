import test from "ava";
import { selectFormat, selectBitrate, mimeTypeForFormat, CanPlayTypeResult } from "../../build/index.js";

function canPlayAll(): CanPlayTypeResult {
  return "probably";
}

function canPlayNone(): CanPlayTypeResult {
  return "";
}

function canPlayOnly(...mimes: string[]): (mime: string) => CanPlayTypeResult {
  return (mime: string) => (mimes.includes(mime) ? "maybe" : "");
}

// =============================================
// selectFormat
// =============================================

test("selectFormat returns the explicit preferredFormat when it's advertised and playable", (t) => {
  const format = selectFormat(
    { formats: ["wav", "mp3", "opus"], default: "wav" },
    { preferredFormat: "opus" },
    canPlayAll
  );
  t.is(format, "opus");
});

test("selectFormat falls back to strategy ranking when preferredFormat isn't playable", (t) => {
  const format = selectFormat(
    { formats: ["wav", "mp3", "opus"], default: "wav" },
    { preferredFormat: "opus", strategy: "quality" },
    canPlayOnly("audio/wav", "audio/mpeg")
  );
  t.is(format, "wav", "opus isn't playable, so quality ranking picks wav next");
});

test("selectFormat falls back to strategy ranking when preferredFormat isn't server-advertised", (t) => {
  const format = selectFormat(
    { formats: ["wav", "mp3"], default: "wav" },
    { preferredFormat: "opus", strategy: "bandwidth" },
    canPlayAll
  );
  t.is(format, "mp3", "opus is playable but not advertised, so bandwidth ranking picks the best of what's left");
});

test("selectFormat \"quality\" strategy prefers wav > opus > mp3", (t) => {
  const format = selectFormat(
    { formats: ["mp3", "opus", "wav"], default: "mp3" },
    { strategy: "quality" },
    canPlayAll
  );
  t.is(format, "wav");
});

test("selectFormat \"bandwidth\" strategy prefers opus > mp3 > wav", (t) => {
  const format = selectFormat(
    { formats: ["mp3", "opus", "wav"], default: "mp3" },
    { strategy: "bandwidth" },
    canPlayAll
  );
  t.is(format, "opus");
});

test("selectFormat defaults to \"quality\" strategy when none is specified", (t) => {
  const format = selectFormat(
    { formats: ["mp3", "opus", "wav"], default: "mp3" },
    {},
    canPlayAll
  );
  t.is(format, "wav");
});

test("selectFormat falls back to output.default when nothing advertised is playable", (t) => {
  const format = selectFormat(
    { formats: ["wav", "mp3", "opus"], default: "mp3" },
    { strategy: "quality" },
    canPlayNone
  );
  t.is(format, "mp3");
});

test("selectFormat treats \"maybe\" as playable, not just \"probably\"", (t) => {
  const format = selectFormat(
    { formats: ["wav"], default: "wav" },
    {},
    () => "maybe"
  );
  t.is(format, "wav");
});

test("selectFormat still picks a format the rank tables don't know about, over falling back to output.default", (t) => {
  const format = selectFormat(
    { formats: ["mp3", "flac9000"], default: "mp3" },
    { strategy: "quality" },
    canPlayOnly(mimeTypeForFormat("flac9000")) // only the unknown format is playable
  );
  t.is(format, "flac9000", "confirmed playable but unranked beats falling back to output.default");
});

test("selectFormat ranks a known format over an unranked-but-playable one", (t) => {
  const format = selectFormat(
    { formats: ["mp3", "flac9000"], default: "mp3" },
    { strategy: "quality" },
    canPlayAll
  );
  t.is(format, "mp3", "a format in the rank table still wins over an unranked one when both are playable");
});

test("selectFormat's widened rank tables cover aac/flac/ogg/webm, not just wav/mp3/opus", (t) => {
  const quality = selectFormat({ formats: ["mp3", "aac", "flac"], default: "mp3" }, { strategy: "quality" }, canPlayAll);
  t.is(quality, "flac", "flac (lossless) ranks above aac under \"quality\"");

  const bandwidth = selectFormat({ formats: ["webm", "ogg", "wav"], default: "wav" }, { strategy: "bandwidth" }, canPlayAll);
  t.is(bandwidth, "webm", "webm ranks above ogg/wav under \"bandwidth\"");
});

// =============================================
// mimeTypeForFormat
// =============================================

test("mimeTypeForFormat covers the widened known-format set", (t) => {
  t.is(mimeTypeForFormat("aac"), "audio/aac");
  t.is(mimeTypeForFormat("flac"), "audio/flac");
  t.is(mimeTypeForFormat("ogg"), "audio/ogg");
  t.is(mimeTypeForFormat("webm"), "audio/webm");
  t.is(mimeTypeForFormat("m4a"), "audio/mp4");
});

test("mimeTypeForFormat guesses honestly for an unrecognized format instead of mislabeling it as wav", (t) => {
  t.is(mimeTypeForFormat("weirdcodec"), "audio/weirdcodec");
});

// =============================================
// selectBitrate
// =============================================

test("selectBitrate returns undefined when adaptBitrateToNetwork is off", (t) => {
  t.is(selectBitrate("mp3", false, { saveData: true }), undefined);
});

test("selectBitrate returns undefined when there's no network info", (t) => {
  t.is(selectBitrate("mp3", true, undefined), undefined);
});

test("selectBitrate reduces bitrate when saveData is true", (t) => {
  t.is(selectBitrate("mp3", true, { saveData: true }), 48000);
  t.is(selectBitrate("opus", true, { saveData: true }), 24000);
});

test("selectBitrate reduces bitrate on a 2G-class effectiveType", (t) => {
  t.is(selectBitrate("mp3", true, { effectiveType: "slow-2g" }), 48000);
  t.is(selectBitrate("mp3", true, { effectiveType: "2g" }), 48000);
});

test("selectBitrate leaves bitrate unset on a fast connection", (t) => {
  t.is(selectBitrate("mp3", true, { effectiveType: "4g" }), undefined);
});

test("selectBitrate never reduces wav or flac, regardless of network", (t) => {
  t.is(selectBitrate("wav", true, { saveData: true }), undefined);
  t.is(selectBitrate("flac", true, { saveData: true }), undefined);
});

test("selectBitrate leaves an unrecognized format's bitrate untouched", (t) => {
  t.is(selectBitrate("flac9000", true, { saveData: true }), undefined, "no known reduced value for this format, so no adaptation happens");
});
