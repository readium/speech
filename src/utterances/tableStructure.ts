import type { GuidedNavigationObject } from "@readium/shared";
import { spokenText } from "./nodeFields.js";
import { resolveNodeText, stripSsmlTags } from "./text.js";

export function plainTextOf(node: GuidedNavigationObject): string {
  const resolved = resolveNodeText(spokenText(node));
  if (!resolved) return "";
  return resolved.plain ?? (resolved.ssml ? stripSsmlTags(resolved.ssml) : "");
}

export interface TableStructure {
  lines: number;
  columns: number;
  rowNumbers: Map<GuidedNavigationObject, number>;
  cellHeaders: Map<GuidedNavigationObject, string>;
}

// GND publishes no colspan/rowspan, so header association is purely
// positional: a header row's Nth cell governs every later row's Nth cell.
export function computeTableStructure(rows: GuidedNavigationObject[]): TableStructure {
  const rowNumbers = new Map<GuidedNavigationObject, number>();
  const cellHeaders = new Map<GuidedNavigationObject, string>();
  let columns = 0;
  let activeHeader: string[] | undefined;

  rows.forEach((row, index) => {
    rowNumbers.set(row, index + 1);
    const cells = row.children ?? [];
    columns = Math.max(columns, cells.length);

    if (cells.some((cell) => cell.role?.has("columnheader"))) {
      activeHeader = cells.map(plainTextOf);
      return;
    }
    if (!activeHeader) return;
    cells.forEach((cell, position) => {
      if (!cell.role?.has("cell") && !cell.role?.has("rowheader")) return;
      const header = activeHeader![position];
      if (header) cellHeaders.set(cell, header);
    });
  });

  return { lines: rows.length, columns, rowNumbers, cellHeaders };
}
