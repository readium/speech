import type { Decoration, DecorationController, DecorationStyle } from "@readium/decorator";
import { createLocator, type LocatorOptions } from "./createLocator";

export interface DecorationInput extends LocatorOptions {
  id: string;
  style: DecorationStyle;
}

// applyDecorations replaces the entire decoration set for a group on every
// call, so this batches all inputs into a single call rather than clobbering
// prior decorations with one-at-a-time application.
export function decorate(
  controller: DecorationController,
  decorations: DecorationInput[],
  group: string,
  wnd: Window = window
): void {
  controller.applyDecorations(
    decorations.map(({ id, style, ...locatorOptions }): Decoration => ({
      id,
      style,
      locator: createLocator(locatorOptions, wnd)
    })),
    group
  );
}
