/**
 * Lightweight smoke checks (no browser):
 * - Optional: Supabase anon sign-in + REST (needs TEST_EMAIL / TEST_PASSWORD in .env.local).
 * - Optional: local Next API (needs dev server: npm run dev).
 *
 * Usage: npm run mvp-smoke
 */
import { loadEnvLocal, root } from "./load-env-local.mjs";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const env = { ...process.env, ...loadEnvLocal() };
const base =
  (env.MVP_SMOKE_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");

let failed = 0;
function fail(msg) {
  console.error(`FAIL: ${msg}`);
  failed++;
}

async function checkLocalApi() {
  try {
    const res = await fetch(`${base}/api/listings`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      fail(`/api/listings returned ${res.status} (is the dev server running?)`);
      return;
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
      fail("/api/listings did not return a JSON array");
      return;
    }
    console.log(`OK: GET /api/listings (${data.length} items)`);
  } catch (e) {
    fail(
      `Cannot reach ${base} — start with: npm run dev (${e instanceof Error ? e.message : e})`,
    );
  }

  try {
    const res = await fetch(`${base}/api/storage-type-details`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      fail(`/api/storage-type-details returned ${res.status}`);
      return;
    }
    console.log("OK: GET /api/storage-type-details");
  } catch (e) {
    fail(String(e instanceof Error ? e.message : e));
  }
}

async function checkSupabaseAuth() {
  const url = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL;
  const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const email = env.MVP_TEST_EMAIL;
  const password = env.MVP_TEST_PASSWORD;
  if (!url || !anon) {
    console.log("Skip auth smoke: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
    return;
  }
  if (!email || !password) {
    console.log("Skip auth smoke: set MVP_TEST_EMAIL and MVP_TEST_PASSWORD in .env.local");
    return;
  }
  const supabase = createClient(url, anon);
  const { data, error: signInErr } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (signInErr || !data.session) {
    fail(`Supabase sign-in failed: ${signInErr?.message || "no session"}`);
    return;
  }
  console.log("OK: Supabase sign-in with MVP_TEST_EMAIL");
  const token = data.session.access_token;
  const pr = await fetch(`${base}/api/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ fullName: "Smoke Test", role: "renter" }),
    signal: AbortSignal.timeout(8000),
  });
  if (!pr.ok) {
    const t = await pr.text();
    fail(`POST /api/profile ${pr.status}: ${t.slice(0, 200)}`);
    return;
  }
  console.log("OK: POST /api/profile");
}

async function main() {
  const envFile = join(root, ".env.local");
  if (!existsSync(envFile)) {
    console.error("Missing .env.local — run npm run mvp-setup first.");
    process.exit(1);
  }
  console.log("MVP smoke checks\n");
  await checkLocalApi();
  await checkSupabaseAuth();
  if (failed) {
    console.error(`\n${failed} check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll smoke checks passed.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
