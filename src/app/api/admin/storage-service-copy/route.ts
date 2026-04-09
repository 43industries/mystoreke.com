import { NextResponse } from "next/server";
import { STORAGE_TYPE_DETAILS } from "@/app/storage/data";
import { getBearerUserId } from "@/lib/bearerAuth";
import { isMystoreAdmin } from "@/lib/admin/allowlist";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const SLUGS = Object.keys(STORAGE_TYPE_DETAILS);

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
      {
        message: "Database not configured",
        defaults: STORAGE_TYPE_DETAILS,
        overrides: {},
      },
      { status: 200 },
    );
  }

  const { data, error } = await supabase
    .from("storage_service_copy")
    .select("slug, description, ideal_use, updated_at");

  if (error) {
    return NextResponse.json(
      { message: "Could not load overrides", defaults: STORAGE_TYPE_DETAILS, overrides: {} },
      { status: 200 },
    );
  }

  const overrides: Record<string, { description: string; idealUse: string; updated_at?: string }> =
    {};
  for (const row of (data ?? []) as {
    slug: string;
    description: string;
    ideal_use: string;
    updated_at: string;
  }[]) {
    overrides[row.slug] = {
      description: row.description,
      idealUse: row.ideal_use,
      updated_at: row.updated_at,
    };
  }

  return NextResponse.json(
    { defaults: STORAGE_TYPE_DETAILS, overrides },
    { status: 200 },
  );
}

export async function PATCH(request: Request) {
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
      { message: "Database not configured; add storage_service_copy table and Supabase env vars." },
      { status: 500 },
    );
  }

  let body: { slug?: string; description?: string; idealUse?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const { slug, description, idealUse } = body;
  if (!slug || typeof description !== "string" || typeof idealUse !== "string") {
    return NextResponse.json(
      { message: "slug, description, and idealUse are required" },
      { status: 400 },
    );
  }

  if (!SLUGS.includes(slug)) {
    return NextResponse.json({ message: "Unknown slug" }, { status: 400 });
  }

  const { error } = await supabase.from("storage_service_copy").upsert(
    {
      slug,
      description: description.trim(),
      ideal_use: idealUse.trim(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" },
  );

  if (error) {
    return NextResponse.json(
      { message: error.message || "Save failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
