// Clamps into [min, max]; non-finite input (NaN, ±Infinity) returns `fallback`
// unchanged instead of polluting downstream state.
export function clamp(value: number, min: number, max: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, value));
}
