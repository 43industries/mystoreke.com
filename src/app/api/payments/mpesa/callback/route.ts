import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { parseStkCallbackBody } from "@/lib/mpesa/parseCallback";

/**
 * Daraja STK callback (no auth). Must respond quickly with ResultCode 0.
 */
export async function POST(request: Request) {
  const ack = NextResponse.json(
    { ResultCode: 0, ResultDesc: "Accepted" },
    { status: 200 },
  );

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return ack;
  }

  const parsed = parseStkCallbackBody(body);
  if (!parsed) {
    return ack;
  }

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return ack;
  }

  try {
    const { data: payment } = await supabase
      .from("mpesa_payments")
      .select("id, booking_id, status")
      .eq("checkout_request_id", parsed.checkoutRequestId)
      .maybeSingle();

    if (!payment) {
      return ack;
    }

    if (payment.status === "paid") {
      return ack;
    }

    const success = parsed.resultCode === 0;

    await supabase
      .from("mpesa_payments")
      .update({
        status: success ? "paid" : "failed",
        result_code: parsed.resultCode,
        result_desc: parsed.resultDesc,
        mpesa_receipt_number: success ? parsed.mpesaReceiptNumber : null,
        callback_raw: body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payment.id);

    if (success) {
      await supabase
        .from("bookings")
        .update({ status: "confirmed" })
        .eq("id", payment.booking_id);
    }
  } catch (err) {
     
    console.error("M-Pesa callback handler", err);
  }

  return ack;
}
