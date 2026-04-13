import { NextResponse } from "next/server";
import { getBearerUserId } from "@/lib/bearerAuth";
import { isMystoreAdmin } from "@/lib/admin/allowlist";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const STATUSES = [
  "draft",
  "quoted",
  "assigned",
  "in_transit",
  "delivered",
  "cancelled",
] as const;
type JobStatus = (typeof STATUSES)[number];

function isJobStatus(v: unknown): v is JobStatus {
  return typeof v === "string" && (STATUSES as readonly string[]).includes(v);
}

/** Admin-only: valid forward moves + cancel (not from delivered). */
function adminMaySet(from: JobStatus, to: JobStatus): boolean {
  if (to === "cancelled") return from !== "cancelled" && from !== "delivered";
  const edges: Record<JobStatus, JobStatus[]> = {
    draft: ["quoted", "assigned"],
    quoted: ["assigned"],
    assigned: ["in_transit"],
    in_transit: ["delivered"],
    delivered: [],
    cancelled: [],
  };
  return edges[from]?.includes(to) ?? false;
}

/**
 * GET — renter: own jobs. Admin + ?scope=all: recent jobs (limit 40).
 * POST — create draft (renter).
 * PATCH — renter: draft→cancelled only. Admin: allowed status transitions.
 */
export async function GET(request: Request) {
  const authUserId = await getBearerUserId(request);
  if (!authUserId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const scopeAll = searchParams.get("scope") === "all";

  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json(
      { message: "Database not configured" },
      { status: 500 },
    );
  }

  if (scopeAll) {
    if (!isMystoreAdmin(authUserId)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    const { data, error } = await supabase
      .from("delivery_jobs")
      .select(
        "id, status, pickup_address, dropoff_address, parcel_description, preferred_date, notes, created_at, renter_id",
      )
      .order("created_at", { ascending: false })
      .limit(40);

    if (error) {
      console.error("delivery_jobs admin list", error);
      return NextResponse.json(
        { message: "Failed to load delivery jobs" },
        { status: 500 },
      );
    }
    return NextResponse.json(data ?? [], { status: 200 });
  }

  const { data, error } = await supabase
    .from("delivery_jobs")
    .select(
      "id, status, pickup_address, dropoff_address, parcel_description, preferred_date, notes, created_at",
    )
    .eq("renter_id", authUserId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("delivery_jobs renter list", error);
    return NextResponse.json(
      { message: "Failed to load your delivery jobs" },
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
      console.error("delivery_jobs insert", error);
      return NextResponse.json(
        {
          message:
            "Could not create job. Ensure delivery_jobs table exists (supabase/mvp_marketplace.sql).",
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

export async function PATCH(request: Request) {
  try {
    const authUserId = await getBearerUserId(request);
    if (!authUserId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const id = typeof body.id === "string" ? body.id.trim() : "";
    const nextStatusRaw = body.status;
    if (!id || !isJobStatus(nextStatusRaw)) {
      return NextResponse.json(
        { message: "Missing id or invalid status." },
        { status: 400 },
      );
    }
    const nextStatus = nextStatusRaw;

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        { message: "Database not configured" },
        { status: 500 },
      );
    }

    const { data: row, error: fetchErr } = await supabase
      .from("delivery_jobs")
      .select("id, renter_id, status")
      .eq("id", id)
      .maybeSingle();

    if (fetchErr || !row) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    const current = row.status as JobStatus;
    if (!isJobStatus(current)) {
      return NextResponse.json({ message: "Invalid stored status" }, { status: 500 });
    }

    const admin = isMystoreAdmin(authUserId);
    const isRenter = row.renter_id === authUserId;

    if (admin) {
      if (!adminMaySet(current, nextStatus)) {
        return NextResponse.json(
          { message: `Cannot change status from ${current} to ${nextStatus}.` },
          { status: 400 },
        );
      }
    } else if (isRenter) {
      if (!(current === "draft" && nextStatus === "cancelled")) {
        return NextResponse.json(
          {
            message:
              "Renters may only cancel draft jobs. Contact support for other changes.",
          },
          { status: 403 },
        );
      }
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { error: upErr } = await supabase
      .from("delivery_jobs")
      .update({
        status: nextStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (upErr) {
      console.error("delivery_jobs patch", upErr);
      return NextResponse.json(
        { message: "Failed to update job." },
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
