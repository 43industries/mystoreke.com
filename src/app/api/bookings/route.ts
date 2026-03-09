import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      renterId,
      listingId,
      startDate,
      endDate,
      durationUnit,
      totalPrice,
    } = body;

    if (!renterId || !listingId || !startDate || !endDate || !durationUnit || !totalPrice) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: renterId, listingId, startDate, endDate, durationUnit, totalPrice",
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

    const { error } = await supabase.from("bookings").insert({
      renter_id: renterId,
      listing_id: listingId,
      start_date: startDate,
      end_date: endDate,
      duration_unit: durationUnit,
      total_price: totalPrice,
      status: "pending",
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Error creating booking", error);
      return NextResponse.json(
        { message: "Failed to create booking" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking request submitted.",
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }
}

