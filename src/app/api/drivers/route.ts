import { NextResponse } from "next/server";

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

    // In production: save to database, send confirmation email, etc.
    // For now we just validate and return success.
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

    // eslint-disable-next-line no-console
    console.log("Driver application received:", application);

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
