import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// Ensure table exists
async function ensureTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS RSVP_Naming_Ceremony (
      Id SERIAL PRIMARY KEY,
      Name VARCHAR(255) NOT NULL,
      PlusOne INT NOT NULL DEFAULT 0,
      Phone VARCHAR(50) NOT NULL,
      Email VARCHAR(255) NOT NULL,
      CreatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export async function POST(request: NextRequest) {
  try {
    await ensureTable();

    const body = await request.json();
    const { name, plusOne, phone, email } = body;

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required" },
        { status: 400 }
      );
    }

    await query(
      `INSERT INTO RSVP_Naming_Ceremony (Name, PlusOne, Phone, Email) VALUES ($1, $2, $3, $4)`,
      [name, plusOne || 0, phone, email]
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
    await ensureTable();
    const result = await query<{
      id: number;
      name: string;
      plusone: number;
      phone: string;
      email: string;
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
