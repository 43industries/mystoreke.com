/**
 * Comma-separated Supabase auth user UUIDs with access to /api/admin/* and /admin UI.
 */
export function isMystoreAdmin(userId: string): boolean {
  const raw = process.env.MYSTORE_ADMIN_USER_IDS ?? "";
  const ids = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return ids.includes(userId.toLowerCase());
}
