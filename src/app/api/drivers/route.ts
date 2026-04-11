import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const BUCKET = "driver-uploads";

type ParsedFields = {
  fullName: string;
  email: string;
  phone: string;
  idType: string;
  idNumber: string;
  vehicleType: string;
  licensePlate: string;
  areasServed: string;
  availability: string;
  message: string;
};

function requiredString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

async function uploadDriverFile(
  supabase: NonNullable<ReturnType<typeof getSupabaseServerClient>>,
  folder: string,
  file: File,
): Promise<string | null> {
  const rawName = file.name || "upload";
  const ext = rawName.includes(".") ? rawName.split(".").pop() : undefined;
  const safeExt = ext && /^[a-z0-9]+$/i.test(ext) ? ext : "bin";
  const path = `${folder}/${randomUUID()}.${safeExt}`;
  const buf = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage.from(BUCKET).upload(path, buf, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) {
    // eslint-disable-next-line no-console
    console.error("Driver document upload failed", error);
    return null;
  }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function isFile(v: unknown): v is File {
  return typeof File !== "undefined" && v instanceof File && v.size > 0;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let fields: ParsedFields;
    let idPhoto: File | null = null;
    let logbook: File | null = null;
    let vehiclePhoto: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      fields = {
        fullName: requiredString(form.get("fullName")),
        email: requiredString(form.get("email")),
        phone: requiredString(form.get("phone")),
        idType: requiredString(form.get("idType")) || "National ID",
        idNumber: requiredString(form.get("idNumber")),
        vehicleType: requiredString(form.get("vehicleType")),
        licensePlate: requiredString(form.get("licensePlate")),
        areasServed: requiredString(form.get("areasServed")),
        availability: requiredString(form.get("availability")),
        message: requiredString(form.get("message")),
      };
      const ip = form.get("idPhoto");
      const lb = form.get("logbook");
      const vp = form.get("vehiclePhoto");
      if (isFile(ip)) idPhoto = ip;
      if (isFile(lb)) logbook = lb;
      if (isFile(vp)) vehiclePhoto = vp;
    } else {
      const body = await request.json();
      fields = {
        fullName: requiredString(body.fullName),
        email: requiredString(body.email),
        phone: requiredString(body.phone),
        idType: requiredString(body.idType) || "National ID",
        idNumber: requiredString(body.idNumber),
        vehicleType: requiredString(body.vehicleType),
        licensePlate: requiredString(body.licensePlate),
        areasServed: requiredString(body.areasServed),
        availability: requiredString(body.availability),
        message: requiredString(body.message),
      };
    }

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
    } = fields;

    if (
      !fullName ||
      !email ||
      !phone ||
      !idNumber ||
      !vehicleType ||
      !licensePlate ||
      !areasServed ||
      !availability
    ) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: fullName, email, phone, idNumber, vehicleType, licensePlate, areasServed, availability",
        },
        { status: 400 },
      );
    }

    if (contentType.includes("multipart/form-data")) {
      if (!idPhoto || !logbook || !vehiclePhoto) {
        return NextResponse.json(
          {
            message:
              "Please upload a selfie/ID photo, vehicle logbook, and a photo of the vehicle showing the number plate.",
          },
          { status: 400 },
        );
      }
    }

    const application = {
      fullName,
      email,
      phone,
      idType,
      idNumber,
      vehicleType,
      licensePlate,
      areasServed,
      availability,
      message: message || "",
      submittedAt: new Date().toISOString(),
    };

    const supabase = getSupabaseServerClient();

    let idPhotoUrl: string | null = null;
    let logbookUrl: string | null = null;
    let vehiclePhotoUrl: string | null = null;

    if (supabase && idPhoto && logbook && vehiclePhoto) {
      const folder = `applications/${randomUUID()}`;
      const [a, b, c] = await Promise.all([
        uploadDriverFile(supabase, `${folder}/id`, idPhoto),
        uploadDriverFile(supabase, `${folder}/logbook`, logbook),
        uploadDriverFile(supabase, `${folder}/vehicle`, vehiclePhoto),
      ]);
      idPhotoUrl = a;
      logbookUrl = b;
      vehiclePhotoUrl = c;
    }

    if (supabase) {
      const row: Record<string, unknown> = {
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
      };
      if (idPhotoUrl) row.id_photo_url = idPhotoUrl;
      if (logbookUrl) row.logbook_url = logbookUrl;
      if (vehiclePhotoUrl) row.vehicle_photo_url = vehiclePhotoUrl;

      const { error } = await supabase.from("driver_applications").insert(row);

      if (error) {
        // eslint-disable-next-line no-console
        console.error("Error saving driver application to Supabase", error);
        return NextResponse.json(
          {
            message:
              "Could not save your application. If this persists, contact support.",
          },
          { status: 500 },
        );
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("Driver application received (no Supabase configured):", {
        ...application,
        idPhotoUrl,
        logbookUrl,
        vehiclePhotoUrl,
      });
    }

    return NextResponse.json(
      { success: true, message: "Application received. We'll be in touch shortly." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }
}
