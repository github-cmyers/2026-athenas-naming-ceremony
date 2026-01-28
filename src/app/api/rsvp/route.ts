import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// Ensure table exists
async function ensureTable() {
  await query(`
    IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='RSVP_Naming_Ceremony' AND xtype='U')
    CREATE TABLE RSVP_Naming_Ceremony (
      Id INT IDENTITY(1,1) PRIMARY KEY,
      Name NVARCHAR(255) NOT NULL,
      PlusOne INT NOT NULL DEFAULT 0,
      Phone NVARCHAR(50) NOT NULL,
      Email NVARCHAR(255) NOT NULL,
      CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
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
      `INSERT INTO RSVP_Naming_Ceremony (Name, PlusOne, Phone, Email) VALUES (@name, @plusOne, @phone, @email)`,
      {
        name,
        plusOne: plusOne || 0,
        phone,
        email,
      }
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
      Id: number;
      Name: string;
      PlusOne: number;
      Phone: string;
      Email: string;
      CreatedAt: Date;
    }>("SELECT * FROM RSVP_Naming_Ceremony ORDER BY CreatedAt DESC");

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error("RSVP_Naming_Ceremony fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVP_Naming_Ceremonys" },
      { status: 500 }
    );
  }
}
