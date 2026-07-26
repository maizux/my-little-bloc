import { copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const publicDirs = [
  join(root, "dist", "client"),
  join(root, ".output", "public"),
];

const publicDir = publicDirs.find((dir) => existsSync(dir));

if (!publicDir) {
  console.error(
    "[github-pages-fallback] No static output dir found (dist/client or .output/public).",
  );
  process.exit(1);
}

const candidates = [
  join(publicDir, "_shell", "index.html"),
  join(publicDir, "_shell.html"),
  join(publicDir, "index.html"),
];

const source = candidates.find((path) => existsSync(path));

if (!source) {
  console.error(
    "[github-pages-fallback] No prerendered HTML found. Is prerender enabled?",
  );
  process.exit(1);
}

const target = join(publicDir, "404.html");
copyFileSync(source, target);
console.log(
  `[github-pages-fallback] Copied ${source.replace(root + "/", "")} → ${target.replace(root + "/", "")}`,
);
