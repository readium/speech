import { GndObject } from '../gnd/types.js';
export declare function plainTextOf(node: GndObject): string;
export interface TableStructure {
    lines: number;
    columns: number;
    rowNumbers: Map<GndObject, number>;
    cellHeaders: Map<GndObject, string>;
}
export declare function computeTableStructure(rows: GndObject[]): TableStructure;
