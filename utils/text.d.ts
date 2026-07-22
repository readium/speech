export declare const BINDING_PUNCT_CLASS = "\\p{Pe}\\p{Pf}.,;:!?\uFF0C\u3002\u3001\uFF1B\uFF1A\uFF01\uFF1F\u060C\u061B\u061F";
export declare const OPENING_PUNCT_CLASS = "\\p{Ps}\\p{Pi}\u00BF\u00A1";
export declare function startsWithBindingPunct(s: string): boolean;
export declare function startsWithOpeningPunct(s: string): boolean;
