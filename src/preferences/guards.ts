// Invalid values drop to undefined rather than throwing — SpeechPreferencesEditor's setters throw separately.

export function ensureBoolean(value: boolean | null | undefined): boolean | null | undefined {
  if (value === undefined || value === null) return value;
  return typeof value === "boolean" ? value : undefined;
}

export function ensureEnumValue<T extends string>(value: T | null | undefined, supportedValues: readonly T[]): T | null | undefined {
  if (value === undefined || value === null) return value;
  return (supportedValues as readonly string[]).includes(value) ? value : undefined;
}

export function ensureValueInRange(value: number | null | undefined, range: [number, number]): number | null | undefined {
  if (value === undefined || value === null) return value;
  if (typeof value !== "number" || Number.isNaN(value)) return undefined;
  const min = Math.min(...range);
  const max = Math.max(...range);
  return value >= min && value <= max ? value : undefined;
}

// GND roles are an open vocabulary — only the shape is checked, not role names.
export function ensureStringArray(value: string[] | null | undefined): string[] | null | undefined {
  if (value === undefined || value === null) return value;
  return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : undefined;
}
