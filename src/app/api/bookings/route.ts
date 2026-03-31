import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

async function getAuthenticatedUserId(request: Request): Promise<string | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.slice("Bearer ".length).trim();
  if (!token) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user.id;
}

export async function GET(request: Request) {
  const authUserId = await getAuthenticatedUserId(request);
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
    const authUserId = await getAuthenticatedUserId(request);
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

    const { error } = await supabase.from("bookings").insert({
      renter_id: authUserId,
      listing_id: listingId,
      start_date: startDate,
      end_date: endDate,
      duration_unit: durationUnit,
      total_price: totalPrice,
      status: "pending",
      note: note ?? null,
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

export async function PATCH(request: Request) {
  try {
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


