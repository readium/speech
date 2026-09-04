import { Locator, LocatorLocations, LocatorText } from "@readium/shared";
import { DomRange, DomRangePoint } from "@readium/shared/html";
import type { DomRangeJSON } from "../gnd/textrefFragment.js";

export interface LocatorOptions {
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

// href/type are required by Locator's constructor but never read when
// anchoring within the current document, so they're always synthesized here.
export function createLocator(options: LocatorOptions, wnd: Window = window): Locator {
  const { text: textOptions, cssSelector, domRange, fragment } = options;

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
    href: wnd.location.href,
    type: "text/html",
    text,
    locations
  });
}
