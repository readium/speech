export declare function nodeLanguage(el: Element | null): string;
export declare function hasElementChild(el: Element): boolean;
export declare function isAncestorOf(anc: Element, n: Element): boolean;
export declare function isInlineTag(tagName: string): boolean;
export type GndMediaType = "text/html" | "application/xhtml+xml";
export declare function sniffMediaType(input: string): GndMediaType;
