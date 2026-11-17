export interface SsmlElement {
    kind: "element";
    name: string;
    attrs: Map<string, string>;
    children: SsmlNode[];
    selfClosing: boolean;
    openTag: string;
    start: number;
    closeStart: number;
    end: number;
}
export interface SsmlText {
    kind: "text";
    text: string;
    positions?: number[];
}
export type SsmlNode = SsmlElement | SsmlText;
export interface SsmlLeaf {
    node: SsmlText | SsmlElement;
    ancestors: SsmlElement[];
}
export declare const SSML_ENTITY_RE: RegExp;
export declare function decodeSsmlEntities(text: string): string;
export declare function ssmlEntityAt(text: string, index: number): {
    length: number;
    decoded: string;
} | undefined;
export declare function ssmlMarkup(ssml: string): string | undefined;
export declare function parseSsml(ssml: string): SsmlNode[];
export declare function closeTag(element: SsmlElement): string;
export declare function openTags(elements: SsmlElement[]): string;
export declare function closeTags(elements: SsmlElement[]): string;
export declare function serializeSsml(nodes: SsmlNode[]): string;
export declare function commonAncestors(a: SsmlElement[], b: SsmlElement[]): SsmlElement[];
export declare class SsmlWriter {
    private out;
    private open;
    private moveTo;
    text(chain: SsmlElement[], text: string): void;
    node(chain: SsmlElement[], node: SsmlNode): void;
    flush(): string;
}
export declare function isUnrepeatable(element: SsmlElement): boolean;
export declare function declaredLanguage(element: SsmlElement): string | undefined;
export declare function ssmlElements(nodes: SsmlNode[]): Generator<SsmlElement>;
export declare function setSsmlAttribute(element: SsmlElement, name: string, value: string | undefined): void;
export declare function bindNamespacesInward(ssml: string, unwrapped: (element: SsmlElement) => boolean): string;
export declare function unwrapSsmlElements(nodes: SsmlNode[], unwrap: (element: SsmlElement) => boolean): SsmlNode[];
export declare function ssmlLeaves(nodes: SsmlNode[], whole?: (element: SsmlElement) => boolean, ancestors?: SsmlElement[]): SsmlLeaf[];
