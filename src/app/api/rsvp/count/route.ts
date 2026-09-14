import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ensureRsvpTable } from "@/lib/rsvp";

export async function GET() {
  try {
    await ensureRsvpTable();

    // Get aggregated counts only - no personal data exposed.
    // Declines are counted separately so they never inflate the headcount.
    const result = await query<{
      families: string;
      guests: string;
      declined: string;
    }>(`
      SELECT
        COUNT(*) FILTER (WHERE Attending) as families,
        COALESCE(SUM(PlusOne) FILTER (WHERE Attending), 0)
          + COUNT(*) FILTER (WHERE Attending) as guests,
        COUNT(*) FILTER (WHERE NOT Attending) as declined
      FROM RSVP_Naming_Ceremony
    `);

    const row = result.rows[0];

    return NextResponse.json({
      families: parseInt(row.families) || 0,
      guests: parseInt(row.guests) || 0,
      declined: parseInt(row.declined) || 0,
    });
  } catch (error) {
    console.error("RSVP count fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVP count" },
      { status: 500 }
    );
  }
}
