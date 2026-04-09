import { NextResponse } from "next/server";
import { STORAGE_TYPE_DETAILS } from "@/app/storage/data";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

/**
 * Public merged copy for storage type explainer blocks (defaults + optional DB overrides).
 */
export async function GET() {
  const base = { ...STORAGE_TYPE_DETAILS };
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("storage_service_copy")
      .select("slug, description, ideal_use");

    if (!error && data?.length) {
      for (const row of data as {
        slug: string;
        description: string;
        ideal_use: string;
      }[]) {
        const key = row.slug;
        if (base[key]) {
          base[key] = {
            ...base[key],
            description: row.description,
            idealUse: row.ideal_use,
          };
        }
      }
    }
  }

  return NextResponse.json(base, { status: 200 });
}
