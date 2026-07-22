import { GndText } from './types.js';
/** Normalized (whitespace-coalesced and trimmed) text content of a node's subtree. */
export declare function normalizedNodeText(el: Node): string;
/**
 * Computes the text that becomes a node's `GndObject.description`, and
 * whether the node is visible in the first place. Follows the AccName
 * precedence order (https://www.w3.org/TR/accname/#terminology, 2.A-2.D)
 * for its accessible-name sources, with a non-AccName `aria-describedby`
 * fallback spliced in between 2.C and 2.D — see that branch below.
 */
export declare function extractNodeAria(el: Element): [GndText | null, boolean];
/**
 * Maps an HTML element to the SSML tag its text should be wrapped in.
 * https://www.w3.org/TR/speech-synthesis11/#S3.2.2
 */
export declare function convertElementToSSMLTag(tagName: string): [string, Record<string, string>?];
/** Elements whose entire subtree carries no user-facing content. */
export declare const skippedElements: Set<string>;
