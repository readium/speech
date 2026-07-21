import { Locator } from '@readium/shared';
export interface LocatorOptions {
    highlight?: string;
    before?: string;
    after?: string;
    selector?: string;
    fragment?: string;
}
export declare function createLocator(options: LocatorOptions, wnd?: Window): Locator;
