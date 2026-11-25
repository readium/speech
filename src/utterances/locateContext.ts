export const defaultContextLength = 50;

// A non-negative integer or `Infinity` (no limit); anything else is the default.
export function contextLengthOf(value: number | undefined): number {
  return value !== undefined && value >= 0 && (Number.isInteger(value) || value === Infinity) ? value : defaultContextLength;
}

const isLowSurrogate = (code: number) => code >= 0xdc00 && code <= 0xdfff;
const isHighSurrogate = (code: number) => code >= 0xd800 && code <= 0xdbff;

// At most `length` characters of `text` ending at `end`, not before `start`, never half a surrogate pair.
export function contextBefore(text: string, end: number, length: number, start = 0): string {
  let from = Math.max(start, end - length);
  if (from > start && isLowSurrogate(text.charCodeAt(from))) from++;
  return text.slice(from, end);
}

// At most `length` characters of `text` starting at `start`, not past `end`, never half a surrogate pair.
export function contextAfter(text: string, start: number, length: number, end = text.length): string {
  let to = Math.min(end, start + length);
  if (to > start && to < end && isHighSurrogate(text.charCodeAt(to - 1))) to--;
  return text.slice(start, to);
}
