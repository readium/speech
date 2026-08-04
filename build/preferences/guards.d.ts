export declare function ensureBoolean(value: boolean | null | undefined): boolean | null | undefined;
export declare function ensureEnumValue<T extends string | number | symbol>(value: T | null | undefined, supportedValues: readonly T[]): T | null | undefined;
export declare function ensureValueInRange(value: number | null | undefined, range: [number, number]): number | null | undefined;
export declare function ensureStringArray(value: string[] | null | undefined): string[] | null | undefined;
