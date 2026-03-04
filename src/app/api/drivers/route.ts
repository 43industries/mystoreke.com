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
    } = body;

    if (!fullName || !email || !phone || !idNumber || !vehicleType || !licensePlate || !areasServed || !availability) {
      return NextResponse.json(
        { message: "Missing required fields: fullName, email, phone, idNumber, vehicleType, licensePlate, areasServed, availability" },
        { status: 400 }
      );
    }

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
      message: message || "",
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
