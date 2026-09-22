import { DomRangeJSON } from './textrefFragment.js';
export interface KnownSelector {
    el: Element;
    selector: string;
}
export declare function generateDomRange(range: {
    first: [Text, number];
    last: [Text, number];
}, selectorRoot: Element | null, rootAnchor: string | null, known?: KnownSelector): DomRangeJSON | undefined;
