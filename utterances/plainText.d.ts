import { SsmlElement, SsmlNode } from './ssml.js';
export declare function breakSpaced(before: string, after: string): boolean;
export declare function separatesWords(markup: string): boolean;
export type PlainPiece = {
    kind: "text";
    text: string;
    start: number;
    positions: number[];
    chain: SsmlElement[];
} | {
    kind: "separator";
    start: number;
    position: number;
    chain: SsmlElement[];
} | {
    kind: "element";
    node: SsmlNode;
    chain: SsmlElement[];
};
export declare function layoutSsml(ssml: string): {
    plain: string;
    pieces: PlainPiece[];
};
export declare function textReader(pieces: PlainPiece[]): (from: number, to: number) => string;
export declare function stripSsmlTagsKeepSpacing(ssml: string): string;
export declare function stripSsmlTagsWithMap(ssml: string): {
    plain: string;
    map: number[];
};
export declare function stripSsmlTags(ssml: string): string;
export declare function ssmlIndexToPlainIndex(map: number[], ssmlIndex: number): number;
