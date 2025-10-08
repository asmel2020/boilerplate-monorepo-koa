import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
export async function setupTestDb() {
  const container = await new PostgreSqlContainer("postgres:16")
    .withDatabase("testdb")
    .withUsername("testuser")
    .withPassword("testpassword")
    .start();

  const pool = new Pool({
    connectionString: container.getConnectionUri(),
  });

  const db = drizzle(pool);
  return {
    container,
    pool,
    db,
  };
}
