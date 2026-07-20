import { Locator, LocatorLocations, LocatorText } from "@readium/shared";

export interface LocatorOptions {
  highlight?: string;
  before?: string;
  after?: string;
  selector?: string;
  fragment?: string;
}

// href/type are required by Locator's constructor but never read when
// anchoring within the current document, so they're always synthesized here.
export function createLocator(options: LocatorOptions, wnd: Window = window): Locator {
  const { highlight, before, after, selector, fragment } = options;

  const hasText = highlight !== undefined || before !== undefined || after !== undefined;
  const text = hasText ? new LocatorText({ highlight, before, after }) : undefined;

  const otherLocations = selector ? new Map([["cssSelector", selector]]) : undefined;
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
