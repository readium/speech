import type { Contextualizations } from "./types.js";
import en from "../../locales/en.json" with { type: "json" };

type LocaleModule = { speech: { contextualizations: Contextualizations } };

export const defaultContextualizations: Contextualizations = (en as LocaleModule).speech.contextualizations;

const catalogCache: Record<string, Contextualizations> = { en: defaultContextualizations };

// Every non-English locale is its own dynamic import, so a bundler code-splits
// it into its own chunk and it's only ever fetched when a caller actually
// requests it via `contextualizationLocale` — the main bundle doesn't grow as
// Weblate delivers more locales. Add one entry per shipped `locales/*.json`
// file, e.g. once `locales/fr.json` exists:
//   fr: () => import("../../locales/fr.json", { with: { type: "json" } }) as Promise<LocaleModule>,
const localeLoaders: Record<string, () => Promise<LocaleModule>> = {};

export async function contextualizationsForLocale(locale: string): Promise<Contextualizations> {
  const cached = catalogCache[locale];
  if (cached) return cached;
  const loader = localeLoaders[locale];
  if (!loader) return defaultContextualizations;
  const catalog = (await loader()).speech.contextualizations;
  catalogCache[locale] = catalog;
  return catalog;
}
