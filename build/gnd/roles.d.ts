import { GndRole } from './types.js';
/**
 * Determines the Guided Navigation roles of an element, combining the roles
 * derived from the element type itself with the ones from its ARIA `role` and
 * `epub:type` attributes, e.g. `<section epub:type="chapter">` -> `[section, chapter]`.
 * An ARIA role of "presentation"/"none" strips the element of its native semantics.
 */
export declare function extractNodeRoles(el: Element): GndRole[];
