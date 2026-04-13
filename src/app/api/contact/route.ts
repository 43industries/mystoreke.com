import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const MAX_MESSAGE = 8000;
const MAX_NAME = 200;
const MAX_CONTACT = 500;

/**
 * Public contact form — no auth. Uses honeypot field `company` (must be empty).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const honeypot =
      typeof body.company === "string" ? body.company.trim() : "";
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    const name =
      typeof body.name === "string" ? body.name.trim().slice(0, MAX_NAME) : "";
    const contact =
      typeof body.contact === "string"
        ? body.contact.trim().slice(0, MAX_CONTACT)
        : "";
    const message =
      typeof body.message === "string"
        ? body.message.trim().slice(0, MAX_MESSAGE)
        : "";

    if (!name || !contact || !message) {
      return NextResponse.json(
        { message: "Name, contact, and message are required." },
        { status: 400 },
      );
    }
    if (message.length < 10) {
      return NextResponse.json(
        { message: "Please write a slightly longer message (at least 10 characters)." },
        { status: 400 },
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        { message: "Database not configured." },
        { status: 503 },
      );
    }

    const { error } = await supabase.from("contact_messages").insert({
      name,
      contact,
      message,
    });

    if (error) {
      console.error("contact_messages insert", error);
      return NextResponse.json(
        { message: "Could not save your message. Try again later." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }
}
