import test from "ava";
import { neutralizeAngleBrackets } from "../../src/utils/text.js";

test("neutralizeAngleBrackets swaps < and > for a zero-width space, 1:1", (t) => {
  const text = "positioned <span> tokens";
  const result = neutralizeAngleBrackets(text);
  t.is(result.length, text.length);
  t.is(result, "positioned ​span​ tokens");
});

test("neutralizeAngleBrackets leaves text with no angle brackets untouched", (t) => {
  const text = "no markup-like characters here.";
  t.is(neutralizeAngleBrackets(text), text);
});
