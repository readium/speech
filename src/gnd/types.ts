// Guided Navigation document model, produced by `parseMarkup()`/`makeGnd()`
// (see `converter.ts`) and consumed by `extractUtterances()`.
//
// The upstream spec is still evolving: https://github.com/readium/guided-navigation

// See roles.md for the full, growing vocabulary — kept as a plain string
// rather than a union so new roles don't require a type change here.
export type GndRole = string;

export interface GndText {
  language: string;
  plain?: string;
  ssml?: string;
}

export interface GndObject {
  role?: GndRole[];
  text?: string | GndText;
  description?: string;
  imgref?: string;
  audioref?: string;
  videoref?: string;
  textref?: string;
  id?: string;
  children?: GndObject[];
}

// A Guided Navigation Document — https://readium.org/guided-navigation/schema/document.schema.json
// Always a complete document: `guided` holds every top-level item produced
// from the input, however many there are (one item, several siblings, or —
// for a piece of input that describes no navigable content at all — none).
export interface GndDocument {
  links?: unknown[];
  guided: GndObject[];
}
