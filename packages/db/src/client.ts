import { Kysely, PostgresDialect } from "kysely";
import pg from "pg";
import type { Database } from "./types.js";

const { Pool } = pg;

export function createDbClient(connectionString?: string): Kysely<Database> {
  const url = connectionString || process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/croip";

  const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: url,
      max: 10,
    }),
  });

  return new Kysely<Database>({
    dialect,
  });
}

let _db: Kysely<Database> | null = null;

export function getDb(): Kysely<Database> {
  if (!_db) {
    _db = createDbClient();
  }
  return _db;
}
