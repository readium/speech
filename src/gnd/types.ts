// Guided Navigation document model.
//
// This is a minimal, intentionally loose type stub for the fixture suite in
// `fixtures/` to type-check against. It does not implement HTML parsing or
// utterance extraction — see fixtures/README.md for the fixture format this
// is meant to satisfy.
//
// The upstream spec is still evolving: https://github.com/readium/guided-navigation

// See roles.md for the full, growing vocabulary — kept as a plain string
// rather than a union so new roles don't require a type change here.
export type GndRole = string;

export interface GndTextAlternative {
  language: string;
  plain?: string;
  ssml?: string;
}

export interface GndNode {
  role?: GndRole[];
  text?: string | GndTextAlternative;
  description?: string;
  imgref?: string;
  audioref?: string;
  videoref?: string;
  textref?: string;
  id?: string;
  lang?: string;
  children?: GndNode[];
}

// A Guided Navigation Document — https://readium.org/guided-navigation/schema/document.schema.json
// Always a complete document: `guided` holds every top-level item produced
// from the input, however many there are (one item, several siblings, or —
// for a piece of input that describes no navigable content at all — none).
export interface GndDocument {
  links?: unknown[];
  guided: GndNode[];
}
