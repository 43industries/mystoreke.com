/**
 * Hit public JSON routes (no Supabase required for listings mock path).
 *
 * Set SMOKE_BASE_URL (default http://127.0.0.1:3000). Start the app first, e.g.:
 *   npm run dev
 *   or: npm run start   (after npm run build)
 *
 * Usage: npm run smoke:public
 */
const base = (process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);

const paths = ["/api/listings", "/api/storage-type-details"];

let failed = 0;

async function check(path) {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) {
      console.error(`FAIL ${path}: HTTP ${res.status}`);
      failed++;
      return;
    }
    const ct = res.headers.get("content-type") || "";
    if (!ct.includes("application/json")) {
      console.warn(`WARN ${path}: expected JSON, got ${ct || "(none)"}`);
    }
    console.log(`OK ${path}`);
  } catch (e) {
    console.error(
      `FAIL ${path}: ${e instanceof Error ? e.message : String(e)}`,
    );
    failed++;
  }
}

async function main() {
  console.log(`Smoke public API at ${base}\n`);
  for (const p of paths) {
    await check(p);
  }
  if (failed) {
    console.error(`\n${failed} request(s) failed. Is the server running?`);
    process.exit(1);
  }
  console.log("\nAll public API smoke checks passed.");
}

main();
