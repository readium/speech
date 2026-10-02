import { GuidedNavigationObject } from '@readium/shared';
export declare function plainTextOf(node: GuidedNavigationObject): string;
export interface TableStructure {
    lines: number;
    columns: number;
    rowNumbers: Map<GuidedNavigationObject, number>;
    cellHeaders: Map<GuidedNavigationObject, string>;
}
export declare function computeTableStructure(rows: GuidedNavigationObject[]): TableStructure;
