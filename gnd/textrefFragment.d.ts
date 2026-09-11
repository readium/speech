export declare function encodeCssSelectorFragment(selector: string): string;
export declare function decodeCssSelectorFragment(textref: string | undefined): string | undefined;
export interface DomRangeJSON {
    start: {
        cssSelector: string;
        textNodeIndex: number;
        charOffset?: number;
    };
    end?: {
        cssSelector: string;
        textNodeIndex: number;
        charOffset?: number;
    };
}
export declare function encodeDomRangeFragment(domRange: DomRangeJSON): string;
export declare function decodeDomRangeFragment(textref: string | undefined): DomRangeJSON | undefined;
export interface TextFragmentDirective {
    textStart: string;
    textEnd?: string;
    prefix?: string;
    suffix?: string;
}
export declare function encodeTextFragmentDirective(fragment: TextFragmentDirective): string;
export declare function decodeTextFragmentDirective(textref: string | undefined): TextFragmentDirective | undefined;
export interface DecodedTextref {
    cssSelector?: string;
    domRange?: DomRangeJSON;
    text?: {
        highlight?: string;
        before?: string;
        after?: string;
    };
    fragment?: string;
}
export declare function decodeTextref(node: {
    id?: string;
    textref?: string;
} | undefined): DecodedTextref | undefined;
