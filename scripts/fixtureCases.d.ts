export interface FixtureRoleLists {
  skippableRoles: string[];
  contextualizableRoles: string[];
  shapeableRoles: string[];
  interruptionRoles: string[];
}

export type FixtureOptions = Record<string, unknown> & { format: "plain" | "ssml" };

export const maxUtterancesFileBytes: number;
export const parsedInputFixtures: ReadonlySet<string>;
export function roleListsFrom(mod: Record<string, unknown>): FixtureRoleLists;
export function fixtureTopLevel(gnd: unknown): unknown[];
export function stripLocatorDetails(value: unknown): unknown;
export function sortKeysDeep(value: unknown): unknown;
export function sameJson(a: unknown, b: unknown): boolean;
export function collectRoles(nodes: { role?: string[]; text?: { ssml?: string }; children?: unknown[] }[], acc?: Set<string>): Set<string>;
export function subsets<T>(items: T[]): T[][];
export function optionSpace(format: "plain" | "ssml", rolesInTree: Set<string>, lists: FixtureRoleLists): Generator<FixtureOptions>;
export function canonicalOptions(options: Record<string, unknown>, rolesInTree: Set<string>, lists: FixtureRoleLists): FixtureOptions;
export function expectedCase(utterancesFile: { cases?: { options: FixtureOptions[]; utterances: unknown[] }[] }, options: FixtureOptions): unknown[] | undefined;
