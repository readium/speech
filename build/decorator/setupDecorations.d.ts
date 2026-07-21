import { DirectCommsChannel, Decorator, DecorationController, DecorationControllerConfig, DecorationStyle } from '@readium/decorator';
import { LocatorOptions } from './createLocator';
export interface DecorationInput extends LocatorOptions {
    id: string;
    style: DecorationStyle;
}
export declare class ReadiumSpeechDecorationController extends DecorationController {
    private readonly channel;
    private readonly wnd;
    private readonly decorator;
    constructor(channel: DirectCommsChannel, wnd: Window, decorator: Decorator, config?: DecorationControllerConfig);
    decorate(decorations: DecorationInput[], group: string): void;
    destroy(): void;
}
export declare function setupDecorations(wnd?: Window, config?: DecorationControllerConfig): ReadiumSpeechDecorationController;
