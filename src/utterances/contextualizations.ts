import type { Contextualizations } from "./types.js";
import catalog from "../../json/contextualizations/en.json" with { type: "json" };

// Default English contextualization catalog, one entry per GND role. Sourced
// from `json/contextualizations/en.json`, i18next-shaped so a platform like
// Weblate can round-trip it — see `Contextualizations` in `./types.js` for
// the entry shape.
//
// A role absent from the catalog has nothing to speak; most roles are
// absent on purpose, not by omission. Callers can override or extend any
// subset via `ExtractUtterancesOptions.contextualizations`.
export const defaultContextualizations: Contextualizations = (
  catalog as { speech: { contextualizations: Contextualizations } }
).speech.contextualizations;
