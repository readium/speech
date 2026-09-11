import { GndObject, GndRole } from '../gnd/types.js';
export type ContextualizationEntry = string | {
    [key: string]: ContextualizationEntry;
};
export type Contextualizations = Record<GndRole, ContextualizationEntry>;
export interface ContextualizationOptions {
    contextualizations?: Contextualizations;
    shapes?: Partial<Record<GndRole, "inline" | "block">>;
    params?: (role: GndRole, node: GndObject) => Record<string, string> | undefined;
}
export interface ExtractUtterancesOptions {
    format?: "plain" | "ssml";
    contextualization?: ContextualizationOptions;
    contextualizationLocale?: string;
    skip?: GndRole[];
    contextualize?: GndRole[];
    language?: "none" | "block-level" | "always";
    inlineContextualization?: boolean;
}
