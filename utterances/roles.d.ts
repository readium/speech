import { GndRole } from '../gnd/types.js';
export declare const skippableRoles: GndRole[];
export declare const blockLevelRoles: GndRole[];
export declare const roleDropOverrides: Partial<Record<GndRole, {
    drops: GndRole[];
    unconditional?: boolean;
}>>;
export declare const deferrablePlaceholderRoles: GndRole[];
export declare const descriptionFoldingRoles: GndRole[];
export declare const valueFoldingRoles: GndRole[];
export declare const contentlessRoles: GndRole[];
