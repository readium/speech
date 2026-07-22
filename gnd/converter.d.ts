import { GndObject } from './types.js';
import { GndMediaType } from './dom.js';
/** Walks a DOM subtree, building the Guided Navigation object tree. */
export declare class Converter {
    xmlParsed: boolean;
    ids: Map<string, Element>;
    suppressed: Set<Element>;
    idAlloc: {
        claimed: Set<string>;
        counters: Map<string, number>;
    };
    noterefDepth: number;
    allowNode: Element | null;
    private root;
    private current;
    private segments;
    private textAcc;
    private currentCtx;
    private flowEndsWithSpace;
    private pendingChildren;
    constructor(xmlParsed: boolean);
    private allocateId;
    private claimId;
    prescan(root: Element): void;
    convert(root: Element): void;
    convertChildren(root: Element): void;
    result(): GndObject[];
    private descend;
    private appendChild;
    private walk;
    private head;
    private tail;
    private text;
    private textContext;
    private updateFlowSpace;
    private closeSegment;
    private resetFlow;
    private placeholder;
    private pagebreak;
    private noteref;
    private link;
    private flushText;
}
/**
 * Converts an HTML or XHTML fragment or document into Guided Navigation
 * objects, reflecting exactly the input it's given: a real, author-written
 * <body> becomes its own role: ["body"] node like any other element; a
 * <body> synthesized only by text/html parsing around a bodyless fragment
 * is not content and is skipped through; a bodyless XHTML fragment's root
 * element is itself the content.
 */
export declare function parseMarkup(input: string, mediaType?: GndMediaType): GndObject[];
