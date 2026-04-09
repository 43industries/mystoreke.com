import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "logo.png", "logo.png");
const dest = join(root, "public", "logo.png");

if (!existsSync(src)) {
  console.warn(
    "copy-logo: skipped (no source at logo.png/logo.png). Brand uses SVG or add your PNG there.",
  );
  process.exit(0);
}

mkdirSync(dirname(dest), { recursive: true });
copyFileSync(src, dest);
console.log("copy-logo: public/logo.png updated from logo.png/logo.png");
