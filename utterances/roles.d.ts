import { GndRole } from '@readium/guided-navigation';
export declare const skippableRoles: GndRole[];
export declare const blockLevelRoles: GndRole[];
export declare const roleDropOverrides: Partial<Record<GndRole, {
    drops: GndRole[];
    unconditional?: boolean;
}>>;
export declare const inlineContextualizationRoles: GndRole[];
export declare const descriptionFoldingRoles: GndRole[];
export declare const valueFoldingRoles: GndRole[];
export declare const contentlessRoles: GndRole[];
