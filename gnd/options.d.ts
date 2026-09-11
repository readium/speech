import { GndRole } from './types.js';
export interface TextrefOptions {
    roles?: boolean | GndRole[];
    domRange?: boolean;
    textFragment?: boolean;
}
export interface GndGenerationOptions {
    textrefs?: boolean | GndRole[] | TextrefOptions;
}
export interface NormalizedTextrefOptions {
    predicate: ((roles: GndRole[]) => boolean) | null;
    domRange: boolean;
    textFragment: boolean;
}
export declare function normalizeTextrefOptions(opt: GndGenerationOptions["textrefs"]): NormalizedTextrefOptions;
