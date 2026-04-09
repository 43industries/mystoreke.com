import { NextResponse } from "next/server";
import { getBearerUserId } from "@/lib/bearerAuth";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

function listingHostIdFromNested(listings: unknown): string | null {
  if (listings == null) return null;
  const row = Array.isArray(listings) ? listings[0] : listings;
  if (!row || typeof row !== "object") return null;
  const id = (row as { host_id?: unknown }).host_id;
  return typeof id === "string" ? id : null;
}

export async function GET(request: Request) {
  const authUserId = await getBearerUserId(request);
  if (!authUserId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const renterId = searchParams.get("renterId");

  if (!renterId) {
    return NextResponse.json(
      { message: "Missing renterId" },
      { status: 400 },
    );
  }
  if (renterId !== authUserId) {
    return NextResponse.json(
      { message: "You can only view your own bookings" },
      { status: 403 },
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
    .from("bookings")
    .select(
      "id, start_date, end_date, duration_unit, total_price, status, listings ( id, title, city, county )",
    )
    .eq("renter_id", renterId)
    .order("created_at", { ascending: false });

  if (error) {
    // eslint-disable-next-line no-console
    console.error("Error loading bookings", error);
    return NextResponse.json(
      { message: "Failed to load bookings" },
      { status: 500 },
    );
  }

  return NextResponse.json(data ?? [], { status: 200 });
}

export async function POST(request: Request) {
  try {
    const authUserId = await getBearerUserId(request);
    if (!authUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      listingId,
      startDate,
      endDate,
      durationUnit,
      totalPrice,
      note,
    } = body;

    if (!listingId || !startDate || !endDate || !durationUnit || !totalPrice) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: listingId, startDate, endDate, durationUnit, totalPrice",
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

    const { data: row, error } = await supabase
      .from("bookings")
      .insert({
        renter_id: authUserId,
        listing_id: listingId,
        start_date: startDate,
        end_date: endDate,
        duration_unit: durationUnit,
        total_price: totalPrice,
        status: "pending",
        note: note ?? null,
      })
      .select("id")
      .single();

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
        bookingId: row?.id ?? null,
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

export async function PATCH(request: Request) {
  try {
    const authUserId = await getBearerUserId(request);
    if (!authUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { bookingId, status } = body;

    if (!bookingId || !status) {
      return NextResponse.json(
        { message: "Missing bookingId or status" },
        { status: 400 },
      );
    }

    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
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

    const { data: booking, error: fetchError } = await supabase
      .from("bookings")
      .select("id, renter_id, listings ( host_id )")
      .eq("id", bookingId)
      .single();

    if (fetchError || !booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    const hostId = listingHostIdFromNested(booking.listings);
    const isRenter = booking.renter_id === authUserId;
    const isHost = hostId !== null && hostId === authUserId;

    if (!isRenter && !isHost) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const renterMaySet = status === "cancelled";
    const hostMaySet = ["confirmed", "cancelled", "completed"].includes(status);
    const allowed =
      (isRenter && renterMaySet) || (isHost && hostMaySet && status !== "pending");
    if (!allowed) {
      return NextResponse.json(
        {
          message:
            "You cannot set this status. Renters may cancel; hosts may confirm, cancel, or complete.",
        },
        { status: 403 },
      );
    }

    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", bookingId);

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating booking", error);
      return NextResponse.json(
        { message: "Failed to update booking" },
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


