#!/usr/bin/env node
/**
 * The saved mirror this project was rebuilt from did not contain every image the page uses
 * (speaker portraits, hero images, QR code, brochures). Placeholders were generated for those
 * (see scripts/placeholder-assets.json). Run this script to replace them with the real files
 * from the live site:
 *
 *   node scripts/fetch-missing-assets.mjs                 # fetch from https://bharatiyavyaparmahotsav.com
 *   node scripts/fetch-missing-assets.mjs https://staging.example.com
 *
 * Files that already exist and are not placeholders are left alone.
 */
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.argv[2] ?? "https://bharatiyavyaparmahotsav.com").replace(/\/$/, "");

const placeholders = JSON.parse(await readFile(path.join(root, "scripts/placeholder-assets.json"), "utf8"));

// Assets that have no placeholder at all (documents linked from the page).
const documents = ["BVM_2026_Brochure.pdf", "PM-Message.pdf", "images/Rate-Card-BVM.pdf"];

const targets = [...placeholders, ...documents];
let ok = 0;
let failed = 0;

for (const rel of targets) {
  const dest = path.join(root, "public", rel);
  const url = `${base}/${rel.split("/").map(encodeURIComponent).join("/")}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = res.headers.get("content-type") ?? "";
    if (type.includes("text/html")) throw new Error("got an HTML page (asset not found)");
    await mkdir(path.dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    const { size } = await stat(dest);
    console.log(`  ok  ${rel} (${(size / 1024).toFixed(0)} KB)`);
    ok++;
  } catch (err) {
    console.warn(` skip ${rel}: ${err.message}`);
    failed++;
  }
}

console.log(`\nDone: ${ok} fetched, ${failed} skipped.`);
if (failed) process.exitCode = 1;
