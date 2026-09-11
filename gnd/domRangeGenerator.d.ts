import { DomRangeJSON } from './textrefFragment.js';
export interface KnownSelector {
    el: Element;
    selector: string;
}
export declare function generateDomRange(range: {
    first: [Text, number];
    last: [Text, number];
}, docRoot: Document | null, known?: KnownSelector): DomRangeJSON | undefined;
