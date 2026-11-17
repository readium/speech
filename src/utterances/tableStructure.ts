import type { GuidedNavigationObject } from "@readium/shared";
import { descriptionOf, nodeRoles, spokenText } from "./nodeFields.js";
import { resolveNodeText } from "./text.js";
import { stripSsmlTags } from "./plainText.js";

export function plainTextOf(node: GuidedNavigationObject): string {
  const resolved = resolveNodeText(spokenText(node));
  if (!resolved) return "";
  return resolved.plain ?? (resolved.ssml ? stripSsmlTags(resolved.ssml) : "");
}

// A table's caption with the same text as its description, e.g. the one its aria-labelledby points to.
function namingCaptionOf(node: GuidedNavigationObject): GuidedNavigationObject | undefined {
  const description = descriptionOf(node);
  if (description === undefined || !nodeRoles(node).includes("table")) return undefined;
  return node.children?.find((child) => nodeRoles(child).includes("caption") && plainTextOf(child) === description);
}

// Children or markup, e.g. a noteref or a language change, that a plain description can't say.
function holdsMoreThanText(caption: GuidedNavigationObject): boolean {
  return !!caption.children?.length || spokenText(caption)?.ssml !== undefined;
}

// A naming caption holding only its text is skipped, read as the description; one holding more is read instead of it.
export function redundantCaptionOf(node: GuidedNavigationObject): GuidedNavigationObject | undefined {
  const caption = namingCaptionOf(node);
  return caption && !holdsMoreThanText(caption) ? caption : undefined;
}

export function spokenDescriptionOf(node: GuidedNavigationObject): string | undefined {
  const caption = namingCaptionOf(node);
  return caption && holdsMoreThanText(caption) ? undefined : descriptionOf(node);
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
