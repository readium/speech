import test from "ava";
import { createLocator } from "../../build/index.js";
import { getCssSelector, getHtmlId, getDomRange } from "@readium/shared/html";

const mockWindow = { location: { href: "https://example.com/chapter1.html" } } as Window;

// =============================================
// href/type
// =============================================

test("createLocator: sets href from wnd.location.href and type to text/html", (t) => {
  const locator = createLocator({ highlight: "world" }, mockWindow);
  t.is(locator.href, "https://example.com/chapter1.html");
  t.is(locator.type, "text/html");
});

// =============================================
// text (highlight/before/after)
// =============================================

test("createLocator: builds text from highlight/before/after", (t) => {
  const locator = createLocator({ highlight: "world", before: "Hello ", after: "." }, mockWindow);
  t.is(locator.text?.highlight, "world");
  t.is(locator.text?.before, "Hello ");
  t.is(locator.text?.after, ".");
});

test("createLocator: builds text when only one of highlight/before/after is given", (t) => {
  const locator = createLocator({ before: "Hello " }, mockWindow);
  t.truthy(locator.text);
  t.is(locator.text?.before, "Hello ");
  t.is(locator.text?.highlight, undefined);
});

test("createLocator: omits text entirely when none of highlight/before/after are given", (t) => {
  const locator = createLocator({ selector: "#foo" }, mockWindow);
  t.is(locator.text, undefined);
});

// =============================================
// locations (selector/fragment)
// =============================================

test("createLocator: builds a locations selector readable via getCssSelector", (t) => {
  const locator = createLocator({ selector: "#foo" }, mockWindow);
  t.is(getCssSelector(locator.locations), "#foo");
});

test("createLocator: builds a locations fragment readable via getHtmlId", (t) => {
  const locator = createLocator({ fragment: "foo" }, mockWindow);
  t.is(getHtmlId(locator.locations), "foo");
});

test("createLocator: combines selector and fragment in the same locations", (t) => {
  const locator = createLocator({ selector: "#foo", fragment: "bar" }, mockWindow);
  t.is(getCssSelector(locator.locations), "#foo");
  t.is(getHtmlId(locator.locations), "bar");
});

test("createLocator: combines selector with text fields", (t) => {
  const locator = createLocator({ selector: "#foo", highlight: "world" }, mockWindow);
  t.is(locator.text?.highlight, "world");
  t.is(getCssSelector(locator.locations), "#foo");
});

test("createLocator: builds a locations domRange readable via getDomRange", (t) => {
  const domRange = {
    start: { cssSelector: "p", textNodeIndex: 0, charOffset: 3 },
    end: { cssSelector: "p", textNodeIndex: 0, charOffset: 8 },
  };
  const locator = createLocator({ domRange }, mockWindow);
  const decoded = getDomRange(locator.locations!);
  t.is(decoded?.start.cssSelector, "p");
  t.is(decoded?.start.textNodeIndex, 0);
  t.is(decoded?.start.charOffset, 3);
  t.is(decoded?.end?.charOffset, 8);
});

test("createLocator: leaves selector/fragment unreadable when neither is given", (t) => {
  const locator = createLocator({ highlight: "world" }, mockWindow);
  t.is(getCssSelector(locator.locations), undefined);
  t.is(getHtmlId(locator.locations), undefined);
});

// =============================================
// No options
// =============================================

test("createLocator: leaves text undefined and locations empty when no options are given", (t) => {
  const locator = createLocator({}, mockWindow);
  t.is(locator.text, undefined);
  t.is(getCssSelector(locator.locations), undefined);
  t.is(getHtmlId(locator.locations), undefined);
});
