import type { GndObject } from "../gnd/types.js";
import { resolveNodeText, stripSsmlTags } from "./text.js";

export function plainTextOf(node: GndObject): string {
  const resolved = resolveNodeText(node.text);
  if (!resolved) return "";
  return resolved.plain ?? (resolved.ssml ? stripSsmlTags(resolved.ssml) : "");
}

export interface TableStructure {
  lines: number;
  columns: number;
  rowNumbers: Map<GndObject, number>;
  cellHeaders: Map<GndObject, string>;
}

// GND publishes no colspan/rowspan, so header association is purely
// positional: a header row's Nth cell governs every later row's Nth cell.
export function computeTableStructure(rows: GndObject[]): TableStructure {
  const rowNumbers = new Map<GndObject, number>();
  const cellHeaders = new Map<GndObject, string>();
  let columns = 0;
  let activeHeader: string[] | undefined;

  rows.forEach((row, index) => {
    rowNumbers.set(row, index + 1);
    const cells = row.children ?? [];
    columns = Math.max(columns, cells.length);

    if (cells.some((cell) => cell.role?.includes("columnheader"))) {
      activeHeader = cells.map(plainTextOf);
      return;
    }
    if (!activeHeader) return;
    cells.forEach((cell, position) => {
      const roles = cell.role ?? [];
      if (!roles.includes("cell") && !roles.includes("rowheader")) return;
      const header = activeHeader![position];
      if (header) cellHeaders.set(cell, header);
    });
  });

  return { lines: rows.length, columns, rowNumbers, cellHeaders };
}
