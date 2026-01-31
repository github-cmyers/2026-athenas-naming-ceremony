import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

export async function query<T>(
  queryString: string,
  params?: unknown[]
): Promise<{ rows: T[] }> {
  const result = await pool.query(queryString, params);
  return { rows: result.rows };
}
