import { Locator, LocatorLocations, LocatorText } from "@readium/shared";
import { DomRange, DomRangePoint } from "@readium/shared/html";
import type { DomRangeJSON } from "@readium/guided-navigation";

export interface LocatorOptions {
  // The resource the locate points into, from an href-qualified textref.
  href?: string;
  // Text-quote anchoring.
  text?: { highlight?: string; before?: string; after?: string };
  cssSelector?: string;
  domRange?: DomRangeJSON;
  fragment?: string;
}

function toDomRange(json: DomRangeJSON): DomRange {
  return new DomRange({
    start: new DomRangePoint(json.start),
    end: json.end ? new DomRangePoint(json.end) : undefined,
  });
}

// Without an href in options, href is the current document's, which is all anchoring within it needs.
export function createLocator(options: LocatorOptions, wnd: Window = window): Locator {
  const { href, text: textOptions, cssSelector, domRange, fragment } = options;

  const text = textOptions ? new LocatorText(textOptions) : undefined;

  const otherLocations = cssSelector || domRange ? new Map<string, unknown>() : undefined;
  if (otherLocations) {
    if (cssSelector) otherLocations.set("cssSelector", cssSelector);
    if (domRange) otherLocations.set("domRange", toDomRange(domRange).serialize());
  }
  const hasLocations = otherLocations !== undefined || fragment !== undefined;
  const locations = hasLocations
    ? new LocatorLocations({
        fragments: fragment ? [fragment] : undefined,
        otherLocations
      })
    : undefined;

  return new Locator({
    href: href ?? wnd.location.href,
    type: "text/html",
    text,
    locations
  });
}
