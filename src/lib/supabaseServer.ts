import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;

if (!url || !serviceKey) {
  // These env vars must be set in production; in dev we can still fall back to in-memory behaviour.
  // We avoid throwing here to keep local development usable even before Supabase is configured.
  console.warn(
    "Supabase server client not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY.",
  );
}

export function getSupabaseServerClient(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
    },
  });
}

