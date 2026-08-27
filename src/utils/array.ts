// Bounds an index into [0, length - 1], collapsing to 0 for an empty array rather than -1.
export const clampIndex = (index: number, length: number): number => {
  return Math.min(Math.max(index, 0), Math.max(length - 1, 0));
};
