import type { GndRole } from "./types.js";

export interface TextrefOptions {
  // Which roles get a generated textref reference. `true` covers every node
  // that gets a role; an array restricts generation to just those roles.
  roles?: boolean | GndRole[];
  // Also compute a DomRange (textNodeIndex/charOffset) alongside the CSS
  // selector, for exact (not css-selector-only) DOM addressing. Requires
  // converting a live, already-rendered element (see Converter.convert) —
  // a domRange computed against parseMarkup()'s detached document can't be
  // resolved back against whatever later renders the resource, so it's a
  // no-op there.
  domRange?: boolean;
  // Also append a WICG Text Fragment (":~:text=...") directive when the
  // node's own text can be found uniquely (or made unique with bounded
  // surrounding context) across the whole document. Unlike domRange, this
  // only needs the document's text content, so it works against
  // parseMarkup()'s detached document too, not just a live element.
  textFragment?: boolean;
}

export interface GndGenerationOptions {
  // Generates a reference (see textrefFragment.ts) into textref for
  // nodes as they're converted. Off by default — selector generation has a
  // real compute cost.
  textrefs?: boolean | GndRole[] | TextrefOptions;
}

function normalizeRoles(opt: boolean | GndRole[] | undefined): ((roles: GndRole[]) => boolean) | null {
  if (opt === true) return () => true;
  if (Array.isArray(opt) && opt.length > 0) {
    const set = new Set(opt);
    return (roles) => roles.some((r) => set.has(r));
  }
  return null;
}

export interface NormalizedTextrefOptions {
  predicate: ((roles: GndRole[]) => boolean) | null;
  domRange: boolean;
  textFragment: boolean;
}

function isTextrefOptions(
  opt: GndGenerationOptions["textrefs"],
): opt is TextrefOptions {
  return !!opt && typeof opt === "object" && !Array.isArray(opt);
}

export function normalizeTextrefOptions(
  opt: GndGenerationOptions["textrefs"],
): NormalizedTextrefOptions {
  if (isTextrefOptions(opt)) {
    return { predicate: normalizeRoles(opt.roles), domRange: !!opt.domRange, textFragment: !!opt.textFragment };
  }
  return { predicate: normalizeRoles(opt), domRange: false, textFragment: false };
}
