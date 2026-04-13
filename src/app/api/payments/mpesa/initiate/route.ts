import { NextResponse } from "next/server";
import { getBearerUserId } from "@/lib/bearerAuth";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { getMpesaConfig, initiateStkPush } from "@/lib/mpesa/daraja";
import { normalizeKenyaMsisdn } from "@/lib/mpesa/phone";

export async function POST(request: Request) {
  try {
    const authUserId = await getBearerUserId(request);
    if (!authUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const mpesa = getMpesaConfig();
    if (!mpesa) {
      return NextResponse.json(
        {
          message:
            "M-Pesa is not configured. Set MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE, MPESA_PASSKEY, and MPESA_CALLBACK_URL.",
        },
        { status: 503 },
      );
    }

    const body = await request.json().catch(() => ({}));
    const bookingId = body.bookingId as string | undefined;
    const phoneRaw = body.phone as string | undefined;

    if (!bookingId || !phoneRaw) {
      return NextResponse.json(
        { message: "Missing bookingId or phone" },
        { status: 400 },
      );
    }

    const phone = normalizeKenyaMsisdn(phoneRaw);
    if (!phone) {
      return NextResponse.json(
        {
          message:
            "Invalid phone. Use 07XXXXXXXX, 7XXXXXXXX, or 2547XXXXXXXX.",
        },
        { status: 400 },
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        { message: "Database not configured" },
        { status: 500 },
      );
    }

    const { data: booking, error: bookErr } = await supabase
      .from("bookings")
      .select("id, renter_id, total_price, status")
      .eq("id", bookingId)
      .single();

    if (bookErr || !booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    if (booking.renter_id !== authUserId) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    if (booking.status !== "pending") {
      return NextResponse.json(
        { message: "Only pending bookings can be paid via STK." },
        { status: 400 },
      );
    }

    const amountKes = Math.round(Number(booking.total_price));
    if (!Number.isFinite(amountKes) || amountKes < 1) {
      return NextResponse.json(
        { message: "Booking amount is invalid for M-Pesa." },
        { status: 400 },
      );
    }

    const { data: existingPaid } = await supabase
      .from("mpesa_payments")
      .select("id")
      .eq("booking_id", bookingId)
      .eq("status", "paid")
      .maybeSingle();

    if (existingPaid) {
      return NextResponse.json(
        { message: "This booking is already marked as paid." },
        { status: 400 },
      );
    }

    const stk = await initiateStkPush(mpesa, {
      amountKes,
      phone254: phone,
      accountReference: `BK${bookingId.slice(0, 8)}`,
      transactionDesc: "Mystore storage",
    });

    if (!stk.ok) {
      return NextResponse.json({ message: stk.error }, { status: 502 });
    }

    const { error: insErr } = await supabase.from("mpesa_payments").insert({
      booking_id: bookingId,
      renter_id: authUserId,
      amount_kes: amountKes,
      phone_normalized: phone,
      merchant_request_id: stk.merchantRequestId,
      checkout_request_id: stk.checkoutRequestId,
      status: "pending",
    });

    if (insErr) {
       
      console.error("mpesa_payments insert", insErr);
      return NextResponse.json(
        {
          message:
            "STK sent but saving payment failed. Check Supabase mpesa_payments table exists.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        checkoutRequestId: stk.checkoutRequestId,
        customerMessage: stk.customerMessage,
      },
      { status: 200 },
    );
  } catch (e) {
     
    console.error("M-Pesa initiate", e);
    return NextResponse.json(
      { message: "Could not start M-Pesa payment." },
      { status: 500 },
    );
  }
}
