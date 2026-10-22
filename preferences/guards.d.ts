export declare function ensureBoolean(value: boolean | null | undefined): boolean | null | undefined;
export declare function ensureEnumValue<T extends string | number | symbol>(value: T | null | undefined, supportedValues: readonly T[]): T | null | undefined;
export declare function ensureValueInRange(value: number | null | undefined, range: readonly [number, number]): number | null | undefined;
export declare function ensureStringRecord(value: Record<string, string> | null | undefined): Record<string, string> | null | undefined;
export declare function ensureEnumRecord<T extends string>(value: Partial<Record<string, T>> | null | undefined, supportedValues: readonly T[]): Partial<Record<string, T>> | null | undefined;
export declare function ensureStringOrStringRecord(value: string | Record<string, string> | null | undefined): string | Record<string, string> | null | undefined;
export declare function ensureStringArray(value: string[] | null | undefined): string[] | null | undefined;
