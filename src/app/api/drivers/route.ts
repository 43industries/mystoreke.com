import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      idType,
      idNumber,
      vehicleType,
      licensePlate,
      areasServed,
      availability,
      message,
      photoDataUrl,
      vehiclePhotoDataUrl,
      logbookCopyDataUrl,
    } = body;

    if (!fullName || !email || !phone || !idNumber || !vehicleType || !licensePlate || !areasServed || !availability) {
      return NextResponse.json(
        { message: "Missing required fields: fullName, email, phone, idNumber, vehicleType, licensePlate, areasServed, availability" },
        { status: 400 }
      );
    }

    if (!photoDataUrl || typeof photoDataUrl !== "string" || photoDataUrl.length < 100) {
      return NextResponse.json(
        { message: "A current photo is required (photoDataUrl)." },
        { status: 400 }
      );
    }
    if (!vehiclePhotoDataUrl || typeof vehiclePhotoDataUrl !== "string" || vehiclePhotoDataUrl.length < 100) {
      return NextResponse.json(
        { message: "A vehicle photo is required (vehiclePhotoDataUrl)." },
        { status: 400 }
      );
    }
    if (!logbookCopyDataUrl || typeof logbookCopyDataUrl !== "string" || logbookCopyDataUrl.length < 100) {
      return NextResponse.json(
        { message: "A logbook copy photo is required (logbookCopyDataUrl)." },
        { status: 400 }
      );
    }

    const maxDocLen = 500_000;
    const clip = (s: string) =>
      s.length > maxDocLen ? s.slice(0, maxDocLen) : s;

    const photoUrl = clip(photoDataUrl);
    const vehiclePhotoUrl = clip(vehiclePhotoDataUrl);
    const logbookPhotoUrl = clip(logbookCopyDataUrl);

    const application = {
      fullName,
      email,
      phone,
      idType: idType || "National ID",
      idNumber,
      vehicleType,
      licensePlate,
      areasServed,
      availability,
      message: `${message || ""}\n[docs] vehiclePhoto:yes, logbookCopy:yes`.trim(),
      submittedAt: new Date().toISOString(),
    };

    const supabase = getSupabaseServerClient();

    if (supabase) {
      const { error } = await supabase.from("driver_applications").insert({
        full_name: application.fullName,
        email: application.email,
        phone: application.phone,
        id_type: application.idType,
        id_number: application.idNumber,
        vehicle_type: application.vehicleType,
        license_plate: application.licensePlate,
        areas_served: application.areasServed,
        availability: application.availability,
        message: application.message,
        photo_url: photoUrl,
        vehicle_photo_url: vehiclePhotoUrl,
        logbook_photo_url: logbookPhotoUrl,
      });

      if (error) {
        // eslint-disable-next-line no-console
        console.error("Error saving driver application to Supabase", error);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("Driver application received (no Supabase configured):", application);
    }

    return NextResponse.json(
      { success: true, message: "Application received. We'll be in touch shortly." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }
}
