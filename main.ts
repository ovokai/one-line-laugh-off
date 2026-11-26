// One-Line Laugh-Off entry: writes exactly one funny line to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "My smoke alarm only goes off when I cook, which makes it less of a safety device and more of a food critic with a siren.";

function main(): void {
  // Gate check: the entry must be 1-200 characters of non-whitespace UTF-8 text.
  if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
    throw new Error(`entry line out of bounds: ${LINE.length} characters`);
  }
  const target = "/output/entry.txt";
  try {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, LINE, "utf8");
  } catch {
    // Fallback for environments where /output is not writable.
    writeFileSync(new URL("./entry.txt", import.meta.url), LINE, "utf8");
  }
  console.log(`wrote ${LINE.length} characters`);
}

main();
