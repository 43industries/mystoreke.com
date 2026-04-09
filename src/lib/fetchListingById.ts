import { MOCK_LISTINGS, type StorageListing } from "@/app/storage/data";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

type ListingRow = {
  id: string;
  title: string;
  storage_type: string;
  city: string;
  county: string;
  size: number | null;
  size_unit: "sqft" | "sqm";
  price_per_day: number | null;
  price_per_week: number | null;
  price_per_month: number | null;
  rating: number | null;
  review_count: number | null;
  security: string[] | null;
  parcel_drop_off: boolean | null;
};

function mapRow(row: ListingRow): StorageListing {
  return {
    id: row.id,
    title: row.title,
    storageType: row.storage_type as StorageListing["storageType"],
    city: row.city,
    county: row.county,
    size: row.size ?? 0,
    sizeUnit: row.size_unit,
    pricePerDay: row.price_per_day ?? 0,
    pricePerWeek: row.price_per_week ?? 0,
    pricePerMonth: row.price_per_month ?? 0,
    rating: row.rating ?? 4.8,
    reviewCount: row.review_count ?? 1,
    security: row.security ?? [],
    parcelDropOff: !!row.parcel_drop_off,
  };
}

/**
 * Loads a single listing from Supabase when configured, otherwise from mock data.
 * Avoids server-side HTTP self-fetch (unreliable host headers / edge cases).
 */
export async function fetchListingById(id: string): Promise<StorageListing | undefined> {
  const supabase = getSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("listings")
      .select(
        "id, title, storage_type, city, county, size, size_unit, price_per_day, price_per_week, price_per_month, rating, review_count, security, parcel_drop_off",
      )
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      return mapRow(data as ListingRow);
    }
  }

  return MOCK_LISTINGS.find((l) => l.id === id);
}
