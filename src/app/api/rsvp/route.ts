import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ensureRsvpTable } from "@/lib/rsvp";

export async function POST(request: NextRequest) {
  try {
    await ensureRsvpTable();

    const body = await request.json();
    const { name, plusOne, phone, email, attending } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required" },
        { status: 400 }
      );
    }

    if (typeof attending !== "boolean") {
      return NextResponse.json(
        { error: "An attending response is required" },
        { status: 400 }
      );
    }

    // Someone who is not coming cannot bring anyone with them.
    const guests = attending ? plusOne || 0 : 0;

    await query(
      `INSERT INTO RSVP_Naming_Ceremony (Name, PlusOne, Phone, Email, Attending) VALUES ($1, $2, $3, $4, $5)`,
      [name, guests, phone, email, attending]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("RSVP_Naming_Ceremony submission error:", error);
    return NextResponse.json(
      { error: "Failed to save RSVP_Naming_Ceremony" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await ensureRsvpTable();
    const result = await query<{
      id: number;
      name: string;
      plusone: number;
      phone: string;
      email: string;
      attending: boolean;
      createdat: Date;
    }>("SELECT * FROM RSVP_Naming_Ceremony ORDER BY CreatedAt DESC");

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("RSVP_Naming_Ceremony fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVP_Naming_Ceremonys" },
      { status: 500 }
    );
  }
}
