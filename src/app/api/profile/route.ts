import { NextResponse } from "next/server";
import { getBearerUserId } from "@/lib/bearerAuth";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const ROLES = ["renter", "host", "driver"] as const;
type ProfileRole = (typeof ROLES)[number];

function isProfileRole(v: unknown): v is ProfileRole {
  return typeof v === "string" && (ROLES as readonly string[]).includes(v);
}

/**
 * Upserts the signed-in user's row in `public.profiles` (service role).
 * Called after sign-up / log-in so host listing and RLS-backed reads stay in sync.
 */
export async function POST(request: Request) {
  try {
    const authUserId = await getBearerUserId(request);
    if (!authUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const fullName =
      typeof body.fullName === "string" ? body.fullName.trim() : "";
    const roleRaw = body.role;
    const role: ProfileRole = isProfileRole(roleRaw) ? roleRaw : "renter";

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        { message: "Database not configured" },
        { status: 500 },
      );
    }

    const { error } = await supabase.from("profiles").upsert(
      {
        id: authUserId,
        full_name: fullName || null,
        role,
      },
      { onConflict: "id" },
    );

    if (error) {
      // eslint-disable-next-line no-console
      console.error("profile upsert error", error);
      return NextResponse.json(
        { message: "Failed to save profile" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }
}
