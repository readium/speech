import { GndObject, GndRole } from './types.js';
import { ObjBuilder } from './object.js';
import { GndMediaType } from './dom.js';
import { GndGenerationOptions } from './options.js';
import { IdAllocator } from './idAllocator.js';
/** Walks a DOM subtree, building the Guided Navigation object tree. */
export declare class Converter {
    xmlParsed: boolean;
    ids: Map<string, Element>;
    suppressed: Set<Element>;
    idAlloc: IdAllocator;
    noterefDepth: number;
    allowNode: Element | null;
    selectorPredicate: ((roles: GndRole[]) => boolean) | null;
    domRangeEnabled: boolean;
    textFragmentEnabled: boolean;
    docRoot: Document | null;
    private root;
    private current;
    private foldedCaptions;
    private segments;
    private textAcc;
    private currentCtx;
    private flowEndsWithSpace;
    private pendingChildren;
    private flowFirstNode;
    private flowFirstOffset;
    private flowLastNode;
    private flowLastOffset;
    private lastFlowRange;
    private lastFlowText;
    constructor(xmlParsed: boolean);
    spawnChild(allowNode: Element, depthDelta?: number): Converter;
    prescan(root: Element): void;
    convert(root: Element): void;
    convertChildren(root: Element): void;
    result(): GndObject[];
    private descend;
    private appendChild;
    private walk;
    private head;
    private implicitCaptionOf;
    private tail;
    private applyTextref;
    private text;
    private textContext;
    private updateFlowSpace;
    private closeSegment;
    private resetFlow;
    placeholder(el: Element, tag: string, object: ObjBuilder, candidateID?: string): void;
    private flushText;
}
/**
 * Converts an HTML or XHTML fragment or document into Guided Navigation
 * objects.
 *
 * Given a string, `input` is parsed into a detached document that's never
 * seen again — `options.textrefs.domRange` has nothing to resolve back
 * against there, so it's ignored. Reflects exactly the input it's given: a
 * real, author-written <body> becomes its own role: ["body"] node like any
 * other element; a <body> synthesized only by text/html parsing around a
 * bodyless fragment is not content and is skipped through; a bodyless XHTML
 * fragment's root element is itself the content.
 *
 * Given a live, already-rendered element instead, it's converted in place —
 * no parsing, no detached copy — so `domRange` can pinpoint exact text
 * nodes a DOM-highlighting consumer can resolve straight back against that
 * same document.
 */
export declare function parseMarkup(input: string | Element, mediaType?: GndMediaType, options?: GndGenerationOptions): GndObject[];
