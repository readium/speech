import { readFileSync, writeFileSync } from "fs";

// Replaces the content between `<!-- generated:name -->` and `<!-- /generated:name -->` in a doc.
export function replaceGenerated(file, name, content) {
  const start = `<!-- generated:${name} -->`;
  const end = `<!-- /generated:${name} -->`;
  const doc = readFileSync(file, "utf8");
  const from = doc.indexOf(start);
  const to = doc.indexOf(end);
  if (from === -1 || to === -1 || to < from) throw new Error(`${file}: missing ${start} … ${end}`);
  writeFileSync(file, `${doc.slice(0, from + start.length)}\n${content}\n${doc.slice(to)}`);
}
