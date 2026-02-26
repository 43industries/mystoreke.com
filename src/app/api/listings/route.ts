import { NextResponse } from "next/server";
import { MOCK_LISTINGS, type StorageListing } from "../../storage/data";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

type HostListing = {
  title: string;
  storageType: string;
  description: string;
  size: number | null;
  sizeUnit: "sqft" | "sqm";
  accessHours: string;
  security: {
    CCTV: boolean;
    guard: boolean;
    lockedUnit: boolean;
    gatedArea: boolean;
    alarm: boolean;
  };
  rentalMinDays: number | null;
  rentalMaxDays: number | null;
  pricePerDay: number | null;
  pricePerWeek: number | null;
  pricePerMonth: number | null;
  securityDeposit: number | null;
  longTermDiscount: boolean;
  address: string;
  city: string;
  county: string;
  mapPin: string | null;
  parcelDropOff: boolean;
  parcel: {
    maxSize: string | null;
    operatingHours: string | null;
    notification: {
      sms: boolean;
      app: boolean;
      email: boolean;
    };
    idRequiredAtPickup: boolean;
    maxPerDay: number | null;
    feePerDay: number | null;
  } | null;
  createdAt: string;
};

const HOST_LISTINGS: HostListing[] = [];

export async function GET() {
  const supabase = getSupabaseServerClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("listings")
      .select(
        "id, title, storage_type, city, county, size, size_unit, price_per_day, price_per_week, price_per_month, rating, review_count, security, parcel_drop_off",
      )
      .order("created_at", { ascending: false });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Error loading listings from Supabase", error);
    } else if (data) {
      const rows = data as {
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
      }[];

      const listingsFromDb: StorageListing[] = rows.map((row) => ({
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
      }));

      return NextResponse.json(listingsFromDb, { status: 200 });
    }
  }

  const hostListingsSummaries: StorageListing[] = HOST_LISTINGS.map(
    (listing, index) => {
      const securityLabels: string[] = [];
      if (listing.security.CCTV) securityLabels.push("CCTV");
      if (listing.security.guard) securityLabels.push("Guard");
      if (listing.security.lockedUnit) securityLabels.push("Locked Unit");
      if (listing.security.gatedArea) securityLabels.push("Gated Area");
      if (listing.security.alarm) securityLabels.push("Alarm");

      return {
        id: `host-${index + 1}`,
        title: listing.title,
        storageType: listing.storageType as StorageListing["storageType"],
        city: listing.city,
        county: listing.county,
        size: listing.size ?? 0,
        sizeUnit: listing.sizeUnit,
        pricePerDay: listing.pricePerDay ?? 0,
        pricePerWeek: listing.pricePerWeek ?? 0,
        pricePerMonth: listing.pricePerMonth ?? 0,
        rating: 4.8,
        reviewCount: 1,
        security: securityLabels,
        parcelDropOff: listing.parcelDropOff,
      };
    },
  );

  const listings: StorageListing[] = [...MOCK_LISTINGS, ...hostListingsSummaries];

  return NextResponse.json(listings, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      storageType,
      description,
      size,
      sizeUnit,
      accessHours,
      securityCCTV,
      securityGuard,
      securityLockedUnit,
      securityGatedArea,
      securityAlarm,
      rentalMinDays,
      rentalMaxDays,
      pricePerDay,
      pricePerWeek,
      pricePerMonth,
      securityDeposit,
      longTermDiscount,
      address,
      city,
      county,
      mapPin,
      offerParcelDropOff,
      parcelMaxSize,
      parcelOperatingHours,
      parcelNotificationSms,
      parcelNotificationApp,
      parcelNotificationEmail,
      parcelIdRequired,
      parcelMaxPerDay,
      parcelFeePerDay,
    } = body;

    if (!title || !storageType || !description || !address || !city || !county) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: title, storageType, description, address, city, county",
        },
        { status: 400 },
      );
    }

    if (title.length > 60) {
      return NextResponse.json(
        { message: "Storage title must be 60 characters or less" },
        { status: 400 },
      );
    }

    const wordCount = (description || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    if (wordCount < 100) {
      return NextResponse.json(
        { message: "Description must be at least 100 words" },
        { status: 400 },
      );
    }

    const listing: HostListing = {
      title,
      storageType,
      description,
      size: size ? Number(size) : null,
      sizeUnit: (sizeUnit || "sqft") === "sqm" ? "sqm" : "sqft",
      accessHours: accessHours || "",
      security: {
        CCTV: !!securityCCTV,
        guard: !!securityGuard,
        lockedUnit: !!securityLockedUnit,
        gatedArea: !!securityGatedArea,
        alarm: !!securityAlarm,
      },
      rentalMinDays: rentalMinDays ? Number(rentalMinDays) : null,
      rentalMaxDays: rentalMaxDays ? Number(rentalMaxDays) : null,
      pricePerDay: pricePerDay ? Number(pricePerDay) : null,
      pricePerWeek: pricePerWeek ? Number(pricePerWeek) : null,
      pricePerMonth: pricePerMonth ? Number(pricePerMonth) : null,
      securityDeposit: securityDeposit ? Number(securityDeposit) : null,
      longTermDiscount: !!longTermDiscount,
      address,
      city,
      county,
      mapPin: mapPin || null,
      parcelDropOff: !!offerParcelDropOff,
      parcel: offerParcelDropOff
        ? {
            maxSize: parcelMaxSize || null,
            operatingHours: parcelOperatingHours || null,
            notification: {
              sms: !!parcelNotificationSms,
              app: !!parcelNotificationApp,
              email: !!parcelNotificationEmail,
            },
            idRequiredAtPickup: !!parcelIdRequired,
            maxPerDay: parcelMaxPerDay ? Number(parcelMaxPerDay) : null,
            feePerDay: parcelFeePerDay ? Number(parcelFeePerDay) : null,
          }
        : null,
      createdAt: new Date().toISOString(),
    };

    const supabase = getSupabaseServerClient();
    let id = `host-${HOST_LISTINGS.length + 1}`;

    if (supabase) {
      const { data, error } = await supabase
        .from("listings")
        .insert({
          title: listing.title,
          storage_type: listing.storageType,
          description: listing.description,
          size: listing.size,
          size_unit: listing.sizeUnit,
          access_hours: listing.accessHours,
          rental_min_days: listing.rentalMinDays,
          rental_max_days: listing.rentalMaxDays,
          price_per_day: listing.pricePerDay,
          price_per_week: listing.pricePerWeek,
          price_per_month: listing.pricePerMonth,
          security_deposit: listing.securityDeposit,
          long_term_discount: listing.longTermDiscount,
          address: listing.address,
          city: listing.city,
          county: listing.county,
          map_pin: listing.mapPin,
          security: Object.entries(listing.security)
            .filter(([, enabled]) => enabled)
            .map(([key]) =>
              key === "CCTV"
                ? "CCTV"
                : key === "guard"
                  ? "Guard"
                  : key === "lockedUnit"
                    ? "Locked Unit"
                    : key === "gatedArea"
                      ? "Gated Area"
                      : "Alarm",
            ),
          parcel_drop_off: listing.parcelDropOff,
          parcel_max_size: listing.parcel?.maxSize,
          parcel_operating_hours: listing.parcel?.operatingHours,
          parcel_notification_sms: listing.parcel?.notification.sms ?? false,
          parcel_notification_app: listing.parcel?.notification.app ?? false,
          parcel_notification_email: listing.parcel?.notification.email ?? false,
          parcel_id_required: listing.parcel?.idRequiredAtPickup ?? false,
          parcel_max_per_day: listing.parcel?.maxPerDay,
          parcel_fee_per_day: listing.parcel?.feePerDay,
        })
        .select("id")
        .single();

      if (error) {
        // eslint-disable-next-line no-console
        console.error("Error saving listing to Supabase, falling back to memory", error);
      } else if (data?.id) {
        id = data.id as string;
      }
    }

    if (!supabase) {
      HOST_LISTINGS.push(listing);
      // eslint-disable-next-line no-console
      console.log("Listing stored in memory (no Supabase configured):", listing);
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Listing submitted. It will be reviewed and will appear in search shortly.",
        id,
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
