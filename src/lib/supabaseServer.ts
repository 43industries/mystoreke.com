import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  // These env vars must be set in production; in dev we can still fall back to in-memory behaviour.
  // We avoid throwing here to keep local development usable even before Supabase is configured.
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not set. API routes will fall back to in-memory storage if implemented.",
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

