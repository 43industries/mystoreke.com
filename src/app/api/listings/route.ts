import { NextResponse } from "next/server";

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
        { message: "Missing required fields: title, storageType, description, address, city, county" },
        { status: 400 }
      );
    }

    if (title.length > 60) {
      return NextResponse.json(
        { message: "Storage title must be 60 characters or less" },
        { status: 400 }
      );
    }

    const wordCount = (description || "").trim().split(/\s+/).filter(Boolean).length;
    if (wordCount < 100) {
      return NextResponse.json(
        { message: "Description must be at least 100 words" },
        { status: 400 }
      );
    }

    // In production: save to database, handle photo uploads to storage, etc.
    const listing = {
      title,
      storageType,
      description,
      size: size || null,
      sizeUnit: sizeUnit || "sqft",
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

    // eslint-disable-next-line no-console
    console.log("Listing received (photos would be uploaded separately):", listing);

    return NextResponse.json(
      {
        success: true,
        message: "Listing submitted. It will be reviewed and go live shortly.",
        id: `listing-${Date.now()}`,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}
