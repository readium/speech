import { Locator } from '@readium/shared';
import { DomRangeJSON } from '@readium/guided-navigation';
export interface LocatorOptions {
    href?: string;
    text?: {
        highlight?: string;
        before?: string;
        after?: string;
    };
    cssSelector?: string;
    domRange?: DomRangeJSON;
    fragment?: string;
}
export declare function createLocator(options: LocatorOptions, wnd?: Window): Locator;
