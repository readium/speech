import {
  DirectCommsChannel,
  Decorator,
  DecorationController,
  DecorationControllerConfig,
} from "@readium/decorator";

class DirectDecorationController extends DecorationController {
  constructor(
    private readonly channel: DirectCommsChannel,
    private readonly wnd: Window,
    private readonly decorator: Decorator,
    config: DecorationControllerConfig = {}
  ) {
    super(channel.host, config);
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
export function createDecorations(
  wnd: Window = window,
  config: DecorationControllerConfig = {}
): DecorationController {
  const channel = new DirectCommsChannel();
  const decorator = new Decorator();
  decorator.mount(wnd, channel.frame);
  return new DirectDecorationController(channel, wnd, decorator, config);
}
