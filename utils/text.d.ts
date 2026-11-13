export declare const OPENING_PUNCT_CLASS = "\\p{Ps}\\p{Pi}\u00BF\u00A1";
export declare function startsWithOpeningPunct(s: string): boolean;
export declare function endsWithOpeningPunct(s: string): boolean;
export declare function joinsWithoutSpace(before: string, after: string): boolean;
export declare function meetsUnspaced(before: string, after: string): boolean;
export declare function isSinglePunctuationChar(s: string): boolean;
export declare function neutralizeAngleBrackets(text: string): string;
export declare function decodeResidualHtmlEntities(text: string): string;
