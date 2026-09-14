import { query } from "./db";

// Both the RSVP routes and the count route need this table, so the definition
// lives in one place rather than being copy-pasted into each handler.
export async function ensureRsvpTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS RSVP_Naming_Ceremony (
      Id SERIAL PRIMARY KEY,
      Name VARCHAR(255) NOT NULL,
      PlusOne INT NOT NULL DEFAULT 0,
      Phone VARCHAR(50) NOT NULL,
      Email VARCHAR(255) NOT NULL,
      Attending BOOLEAN NOT NULL DEFAULT TRUE,
      CreatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  // Rows that predate the decline option were all acceptances, so the existing
  // default of TRUE backfills them correctly.
  await query(`
    ALTER TABLE RSVP_Naming_Ceremony
    ADD COLUMN IF NOT EXISTS Attending BOOLEAN NOT NULL DEFAULT TRUE
  `);
}
