import type { GndRole } from "./types.js";

export interface GndGenerationOptions {
  // Generates a CSS-selector locator (see cssSelectorFragment.ts) for nodes
  // as they're converted. Off by default — selector generation has a real
  // compute cost. `true` covers every node that gets a role; an array
  // restricts generation to just those roles.
  cssSelectors?: boolean | GndRole[];
}

export function normalizeCssSelectorsOption(
  opt: boolean | GndRole[] | undefined,
): ((roles: GndRole[]) => boolean) | null {
  if (opt === true) return () => true;
  if (Array.isArray(opt) && opt.length > 0) {
    const set = new Set(opt);
    return (roles) => roles.some((r) => set.has(r));
  }
  return null;
}
