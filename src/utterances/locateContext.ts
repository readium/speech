export const defaultContextLength = 50;

// A non-negative integer or `Infinity` (no limit); anything else is the default.
export function contextLengthOf(value: number | undefined): number {
  return value !== undefined && value >= 0 && (Number.isInteger(value) || value === Infinity) ? value : defaultContextLength;
}

const isLowSurrogate = (code: number) => code >= 0xdc00 && code <= 0xdfff;
const isHighSurrogate = (code: number) => code >= 0xd800 && code <= 0xdbff;

// The end of `text` nearest what follows it, at most `length` characters, never half a surrogate pair.
export function contextBefore(text: string, length: number): string {
  let start = Math.max(0, text.length - length);
  if (start > 0 && isLowSurrogate(text.charCodeAt(start))) start++;
  return text.slice(start);
}

// The start of `text` nearest what precedes it, at most `length` characters, never half a surrogate pair.
export function contextAfter(text: string, length: number): string {
  let end = Math.min(text.length, length);
  if (end < text.length && isHighSurrogate(text.charCodeAt(end - 1))) end--;
  return text.slice(0, end);
}
