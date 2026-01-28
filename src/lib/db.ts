import sql, { config as SqlConfig, ConnectionPool, IResult } from "mssql";

const config: SqlConfig = {
  user: "Myers_Event",
  password: "Myers_Event",
  server: "localhost",
  database: "Myers_Event",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: ConnectionPool | null = null;

export async function getConnection(): Promise<ConnectionPool> {
  if (pool) {
    return pool;
  }
  pool = await sql.connect(config);
  return pool;
}

export async function query<T>(
  queryString: string,
  params?: Record<string, unknown>
): Promise<IResult<T>> {
  const connection = await getConnection();
  const request = connection.request();

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      request.input(key, value);
    }
  }

  return request.query(queryString);
}
