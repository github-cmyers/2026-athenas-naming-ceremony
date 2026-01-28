declare module "mssql" {
  export interface config {
    user: string;
    password: string;
    server: string;
    database: string;
    options?: {
      encrypt?: boolean;
      trustServerCertificate?: boolean;
    };
  }

  export interface IResult<T> {
    recordset: T[];
    recordsets: T[][];
    output: Record<string, unknown>;
    rowsAffected: number[];
  }

  export interface Request {
    input(name: string, value: unknown): Request;
    query<T>(command: string): Promise<IResult<T>>;
  }

  export interface ConnectionPool {
    request(): Request;
    close(): Promise<void>;
  }

  export function connect(config: config): Promise<ConnectionPool>;

  const sql: {
    connect: typeof connect;
    config: config;
  };

  export default sql;
}
