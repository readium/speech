import { Contextualizations } from './types.js';
export declare const defaultContextualizations: Contextualizations;
export declare function catalogLocale(locale: string): string;
export declare function contextualizationsForLocale(locale: string): Promise<Contextualizations>;
