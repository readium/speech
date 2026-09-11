import {
  DirectCommsChannel,
  Decorator,
  DecorationController,
  DecorationControllerConfig,
} from "@readium/decorator";
import type { Decoration, DecorationStyle } from "@readium/decorator";
import { createLocator, type LocatorOptions } from "./createLocator";

export interface DecorationInput extends LocatorOptions {
  id: string;
  style: DecorationStyle;
}

export class ReadiumSpeechDecorationController extends DecorationController {
  constructor(
    private readonly channel: DirectCommsChannel,
    private readonly wnd: Window,
    private readonly decorator: Decorator,
    config: DecorationControllerConfig = {}
  ) {
    super(channel.host, config);
  }

  // Convenience wrapper: builds Locators from shorthand text/cssSelector options
  // and delegates to applyDecorations, which replaces the entire decoration
  // set for a group on every call — batch everything for a group into one
  // call rather than clobbering the previous one.
  decorate(decorations: DecorationInput[], group: string): void {
    this.applyDecorations(
      decorations.map(({ id, style, ...locatorOptions }): Decoration => ({
        id,
        style,
        locator: createLocator(locatorOptions, this.wnd)
      })),
      group
    );
  }

  override destroy(): void {
    super.destroy();
    this.decorator.unmount(this.wnd, this.channel.frame);
    this.channel.frame.destroy();
  }
}

// Wires up the comms channel and mounts the Decorator module so consumers
// can apply/observe decorations directly in the current window without
// dealing with either concept themselves.
export function setupDecorations(
  wnd: Window = window,
  config: DecorationControllerConfig = {}
): ReadiumSpeechDecorationController {
  const channel = new DirectCommsChannel();
  const decorator = new Decorator();
  decorator.mount(wnd, channel.frame);
  return new ReadiumSpeechDecorationController(channel, wnd, decorator, config);
}
