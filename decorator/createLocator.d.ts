import { Locator } from '@readium/shared';
import { DomRangeJSON } from '../gnd/textrefFragment.js';
export interface LocatorOptions {
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
