import { NextResponse } from "next/server";
import { getBearerUserId } from "@/lib/bearerAuth";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

/**
 * Latest M-Pesa payment status for a booking (renter-only).
 */
export async function GET(request: Request) {
  const authUserId = await getBearerUserId(request);
  if (!authUserId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const bookingId = new URL(request.url).searchParams.get("bookingId");
  if (!bookingId) {
    return NextResponse.json({ message: "Missing bookingId" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { message: "Database not configured" },
      { status: 500 },
    );
  }

  const { data: booking } = await supabase
    .from("bookings")
    .select("id, renter_id")
    .eq("id", bookingId)
    .maybeSingle();

  if (!booking || booking.renter_id !== authUserId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { data: pay } = await supabase
    .from("mpesa_payments")
    .select(
      "status, mpesa_receipt_number, result_desc, updated_at, checkout_request_id",
    )
    .eq("booking_id", bookingId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return NextResponse.json(
    {
      status: pay?.status ?? "none",
      receipt: pay?.mpesa_receipt_number ?? null,
      message: pay?.result_desc ?? null,
      updatedAt: pay?.updated_at ?? null,
    },
    { status: 200 },
  );
}
