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

// TODO: root shape (single node vs. an implicit multi-node fragment) is not
// yet settled upstream; fixtures with multiple top-level siblings currently
// use a bare `{ children: GndNode[] }` with no role.
export type GndDocument = GndNode;
