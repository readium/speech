import type { Contextualizations } from "./types.js";
import en from "../../locales/en.json" with { type: "json" };

// One entry per shipped locale — add a JSON file + a record entry to add a
// language. Callers can override or extend any subset via
// `ExtractUtterancesOptions.contextualizations`.
const catalogsByLocale: Record<string, Contextualizations> = {
  en: (en as { speech: { contextualizations: Contextualizations } }).speech.contextualizations,
};

export const defaultContextualizations = catalogsByLocale.en;

export function contextualizationsForLocale(locale: string): Contextualizations {
  return catalogsByLocale[locale] ?? catalogsByLocale.en;
}
