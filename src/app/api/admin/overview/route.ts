import { NextResponse } from "next/server";
import { getBearerUserId } from "@/lib/bearerAuth";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { isMystoreAdmin } from "@/lib/admin/allowlist";

async function safeCountEq(
  supabase: NonNullable<ReturnType<typeof getSupabaseServerClient>>,
  table: string,
  column: string,
  value: string,
): Promise<number> {
  const { count, error } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq(column, value);

  if (error) return 0;
  return count ?? 0;
}

/**
 * Lightweight ops snapshot for allowlisted admins (Bearer token).
 */
export async function GET(request: Request) {
  const userId = await getBearerUserId(request);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!isMystoreAdmin(userId)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { message: "Database not configured" },
      { status: 500 },
    );
  }

  const [
    pendingBookings,
    mpesaPending,
    mpesaPaidTodayApprox,
    draftJobs,
  ] = await Promise.all([
    safeCountEq(supabase, "bookings", "status", "pending"),
    safeCountEq(supabase, "mpesa_payments", "status", "pending"),
    safeCountEq(supabase, "mpesa_payments", "status", "paid"),
    safeCountEq(supabase, "delivery_jobs", "status", "draft"),
  ]);

  return NextResponse.json(
    {
      pendingBookings,
      mpesaPaymentsPending: mpesaPending,
      mpesaPaymentsPaidTotal: mpesaPaidTodayApprox,
      deliveryJobsDraft: draftJobs,
      generatedAt: new Date().toISOString(),
    },
    { status: 200 },
  );
}
