import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Create table if it doesn't exist
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

    // Get aggregated counts only - no personal data exposed
    const result = await query<{ families: string; guests: string }>(`
      SELECT
        COUNT(*) as families,
        COALESCE(SUM(PlusOne), 0) + COUNT(*) as guests
      FROM RSVP_Naming_Ceremony
    `);

    const row = result.rows[0];

    return NextResponse.json({
      families: parseInt(row.families) || 0,
      guests: parseInt(row.guests) || 0,
    });
  } catch (error) {
    console.error("RSVP count fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVP count" },
      { status: 500 }
    );
  }
}
