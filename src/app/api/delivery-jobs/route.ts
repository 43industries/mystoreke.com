import { NextResponse } from "next/server";
import { getBearerUserId } from "@/lib/bearerAuth";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

/**
 * Create a draft delivery / parcel job (renter). Full assignment flow comes later.
 */
export async function POST(request: Request) {
  try {
    const authUserId = await getBearerUserId(request);
    if (!authUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const pickupAddress =
      typeof body.pickupAddress === "string" ? body.pickupAddress.trim() : "";
    const dropoffAddress =
      typeof body.dropoffAddress === "string" ? body.dropoffAddress.trim() : "";
    const parcelDescription =
      typeof body.parcelDescription === "string"
        ? body.parcelDescription.trim()
        : "";
    const preferredDate =
      typeof body.preferredDate === "string" ? body.preferredDate.trim() : null;
    const notes = typeof body.notes === "string" ? body.notes.trim() : null;

    if (!pickupAddress || !dropoffAddress) {
      return NextResponse.json(
        { message: "pickupAddress and dropoffAddress are required." },
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

    const { data, error } = await supabase
      .from("delivery_jobs")
      .insert({
        renter_id: authUserId,
        status: "draft",
        pickup_address: pickupAddress.trim(),
        dropoff_address: dropoffAddress,
        parcel_description: parcelDescription || null,
        preferred_date: preferredDate || null,
        notes,
      })
      .select("id")
      .single();

    if (error) {
      // eslint-disable-next-line no-console
      console.error("delivery_jobs insert", error);
      return NextResponse.json(
        {
          message:
            "Could not create job. Ensure delivery_jobs table exists (supabase/schema.sql).",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, id: data?.id ?? null },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }
}
