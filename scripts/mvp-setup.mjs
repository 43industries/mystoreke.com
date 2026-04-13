/**
 * MVP remote setup (requires filled .env.local):
 * 1) Ensure Storage bucket "driver-uploads" (public; matches /api/drivers).
 * 2) Optionally run supabase/mvp_marketplace.sql via psql when DATABASE_URL is set.
 * 3) Verify core tables respond over PostgREST (service role).
 *
 * Usage: npm run mvp-setup
 */
import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { loadEnvLocal, root } from "./load-env-local.mjs";

const BUCKET = "driver-uploads";
const envPath = join(root, ".env.local");
const examplePath = join(root, ".env.example");

if (!existsSync(envPath)) {
  if (existsSync(examplePath)) {
    copyFileSync(examplePath, envPath);
    console.log("Created .env.local from .env.example — add your Supabase keys, then run again.");
    process.exit(1);
  }
  console.error("Missing .env.local and .env.example.");
  process.exit(1);
}

const env = { ...process.env, ...loadEnvLocal() };
const url = (env.SUPABASE_URL || "").replace(/\/$/, "");
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY || "";
const databaseUrl = env.DATABASE_URL || "";

if (!url || !serviceKey) {
  console.error(
    "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local, then run again.",
  );
  process.exit(1);
}

function serviceHeaders() {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };
}

async function ensureBucket() {
  const listRes = await fetch(`${url}/storage/v1/bucket`, {
    headers: serviceHeaders(),
  });
  if (!listRes.ok) {
    const t = await listRes.text();
    throw new Error(`List buckets failed ${listRes.status}: ${t}`);
  }
  const buckets = await listRes.json();
  if (Array.isArray(buckets) && buckets.some((b) => b.id === BUCKET)) {
    console.log(`Storage bucket "${BUCKET}" already exists.`);
    return;
  }
  const createRes = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: serviceHeaders(),
    body: JSON.stringify({
      id: BUCKET,
      name: BUCKET,
      public: true,
    }),
  });
  if (!createRes.ok) {
    const t = await createRes.text();
    throw new Error(`Create bucket failed ${createRes.status}: ${t}`);
  }
  console.log(`Created public storage bucket "${BUCKET}".`);
}

function runSqlWithPsql() {
  if (!databaseUrl) {
    console.log(
      "\nOptional: set DATABASE_URL (Session mode URI from Supabase → Connect) to apply SQL from disk.",
    );
    console.log(
      "Otherwise: open Supabase → SQL Editor, paste supabase/mvp_marketplace.sql, and run once.\n",
    );
    return false;
  }
  const sqlPath = join(root, "supabase", "mvp_marketplace.sql");
  if (!existsSync(sqlPath)) {
    console.warn("Missing supabase/mvp_marketplace.sql — skip SQL.");
    return false;
  }
  const r = spawnSync("psql", [databaseUrl, "-v", "ON_ERROR_STOP=1", "-f", sqlPath], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PGSSLMODE: process.env.PGSSLMODE || "require" },
  });
  if (r.error && r.error.code === "ENOENT") {
    console.warn("psql not found — install PostgreSQL client tools or run SQL in the Supabase SQL Editor.");
    return false;
  }
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout || "psql failed");
    return false;
  }
  console.log("Applied supabase/mvp_marketplace.sql via psql.");
  return true;
}

async function verifyTable(name) {
  const res = await fetch(`${url}/rest/v1/${name}?select=id&limit=1`, {
    headers: {
      ...serviceHeaders(),
      Prefer: "count=exact",
    },
  });
  if (!res.ok) {
    const t = await res.text();
    return { ok: false, detail: `${res.status} ${t}` };
  }
  return { ok: true, detail: "ok" };
}

async function main() {
  console.log("Mystore MVP setup — Supabase\n");
  await ensureBucket();
  runSqlWithPsql();

  const tables = [
    "profiles",
    "listings",
    "bookings",
    "driver_applications",
    "mpesa_payments",
    "delivery_jobs",
    "storage_service_copy",
  ];
  console.log("\nVerifying PostgREST visibility (service role)…");
  let bad = 0;
  for (const t of tables) {
    const r = await verifyTable(t);
    if (r.ok) {
      console.log(`  ✓ ${t}`);
    } else {
      console.log(`  ✗ ${t} — ${r.detail}`);
      bad++;
    }
  }
  if (bad > 0) {
    console.log(
      "\nSome tables are missing or not exposed. Run supabase/mvp_marketplace.sql in the SQL Editor, then re-run npm run mvp-setup.",
    );
    process.exit(1);
  }
  console.log("\nMVP setup checks passed. Next: npm run dev, then npm run mvp-smoke");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
