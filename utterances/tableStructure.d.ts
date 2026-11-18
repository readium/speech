import { GuidedNavigationObject } from '@readium/shared';
export declare function plainTextOf(node: GuidedNavigationObject): string;
export declare function redundantCaptionOf(node: GuidedNavigationObject): GuidedNavigationObject | undefined;
export declare function spokenDescriptionOf(node: GuidedNavigationObject): string | undefined;
export interface TableStructure {
    lines: number;
    columns: number;
    rowNumbers: Map<GuidedNavigationObject, number>;
    cellHeaders: Map<GuidedNavigationObject, string>;
}
export declare function computeTableStructure(rows: GuidedNavigationObject[]): TableStructure;
