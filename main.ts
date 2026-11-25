// news-image-20261125: the entry image lives beside this file as entry.png.
// The program copies it into the grader's output directory as entry.png.
// Node 22, standard library only. Outside the grader, MAKEFUN_OUTPUT_DIR
// stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
// Fail loudly instead of handing the grader a truncated copy.
if (statSync(dst).size !== statSync(src).size) {
  throw new Error(`entry.png copy incomplete: ${statSync(dst).size} of ${statSync(src).size} bytes`);
}
console.log(`wrote ${dst} (${statSync(dst).size} bytes)`);
