// Invalid values drop to undefined rather than throwing — SpeechPreferencesEditor's setters throw separately.

export function ensureBoolean(value: boolean | null | undefined): boolean | null | undefined {
  if (value === undefined || value === null) return value;
  return typeof value === "boolean" ? value : undefined;
}

export function ensureEnumValue<T extends string | number | symbol>(value: T | null | undefined, supportedValues: readonly T[]): T | null | undefined {
  if (value === undefined || value === null) return value;
  return supportedValues.includes(value) ? value : undefined;
}

export function ensureValueInRange(value: number | null | undefined, range: readonly [number, number]): number | null | undefined {
  if (value === undefined || value === null) return value;
  if (typeof value !== "number" || Number.isNaN(value)) return undefined;
  const min = Math.min(...range);
  const max = Math.max(...range);
  return value >= min && value <= max ? value : undefined;
}

export function ensureStringRecord(value: Record<string, string> | null | undefined): Record<string, string> | null | undefined {
  if (value === undefined || value === null) return value;
  if (typeof value !== "object" || Array.isArray(value)) return undefined;
  return Object.values(value).every((item) => typeof item === "string") ? value : undefined;
}

export function ensureStringOrStringRecord(value: string | Record<string, string> | null | undefined): string | Record<string, string> | null | undefined {
  return typeof value === "string" ? value : ensureStringRecord(value as Record<string, string> | null | undefined);
}

// GND roles are an open vocabulary — only the shape is checked, not role names.
export function ensureStringArray(value: string[] | null | undefined): string[] | null | undefined {
  if (value === undefined || value === null) return value;
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : undefined;
}
