import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workspace = process.argv[2];
if (!new Set(["marketing", "app"]).has(workspace)) {
  throw new Error("Usage: node scripts/prepare-workspace-public.mjs <marketing|app>");
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public");
const destination = path.join(root, "apps", workspace, "public");

await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });

