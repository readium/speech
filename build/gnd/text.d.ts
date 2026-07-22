import { GndText } from './types.js';
export interface TextBuilder {
    plain: string;
    ssml: string;
    language: string;
}
export declare function textIsEmpty(t: TextBuilder): boolean;
export declare function finalizeText(t?: TextBuilder): string | GndText | undefined;
export interface SSMLContext {
    lang: string;
    tag: string;
    attrs?: Record<string, string>;
}
export declare function ctxEqual(a: SSMLContext, b: SSMLContext): boolean;
export declare const ssmlTextEscape: (s: string) => string;
export declare const ssmlAttrEscape: (s: string) => string;
export declare function isNoBreakSpace(ch: string): boolean;
export declare function normalizeWhitespace(text: string, stripLeading: boolean): string;
