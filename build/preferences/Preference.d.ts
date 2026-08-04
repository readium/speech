export interface IPreference<T> {
    value: T | null | undefined;
    effectiveValue: T | null | undefined;
    isEffective: boolean;
    clear(): void;
}
export interface IEnumPreference<T> extends IPreference<T> {
    supportedValues: T[];
}
export interface IRangePreference<T> extends IPreference<T> {
    supportedRange: [T, T];
    step: number;
    increment(): void;
    decrement(): void;
    format(value: T): string;
}
export declare class Preference<T> implements IPreference<T> {
    protected _value?: T | null;
    protected readonly _effectiveValue?: T | null;
    protected readonly _isEffective: boolean;
    protected _onChange: (newValue: T | null | undefined) => void;
    constructor({ initialValue, effectiveValue, isEffective, onChange, }: {
        initialValue?: T | null;
        effectiveValue?: T | null;
        isEffective: boolean;
        onChange: (newValue: T | null | undefined) => void;
    });
    set value(value: T | null | undefined);
    get value(): T | null | undefined;
    get effectiveValue(): T | null | undefined;
    get isEffective(): boolean;
    clear(): void;
}
export declare class EnumPreference<T extends string | number | symbol> extends Preference<T> implements IEnumPreference<T> {
    private readonly _supportedValues;
    constructor({ initialValue, effectiveValue, isEffective, onChange, supportedValues, }: {
        initialValue?: T | null;
        effectiveValue?: T | null;
        isEffective: boolean;
        onChange: (newValue: T | null | undefined) => void;
        supportedValues: T[];
    });
    set value(value: T | null | undefined);
    get value(): T | null | undefined;
    get supportedValues(): T[];
}
export declare class BooleanPreference extends Preference<boolean> {
    set value(value: boolean | null | undefined);
    get value(): boolean | null | undefined;
}
export declare class StringArrayPreference extends Preference<string[]> {
    set value(value: string[] | null | undefined);
    get value(): string[] | null | undefined;
}
export declare class RangePreference<T extends number> extends Preference<T> implements IRangePreference<T> {
    private readonly _supportedRange;
    private readonly _step;
    private readonly _decimals;
    constructor({ initialValue, effectiveValue, isEffective, onChange, supportedRange, step, }: {
        initialValue?: T | null;
        effectiveValue?: T | null;
        isEffective: boolean;
        onChange: (newValue: T | null | undefined) => void;
        supportedRange: [T, T];
        step: number;
    });
    set value(value: T | null | undefined);
    get value(): T | null | undefined;
    get supportedRange(): [T, T];
    get step(): number;
    increment(): void;
    decrement(): void;
    format(value: T): string;
}
