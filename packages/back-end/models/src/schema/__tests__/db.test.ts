import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";
import { users } from "../../schema/users.schema";
import { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { DrizzleQueryError, eq } from "drizzle-orm";
import { setupTestDb } from "./utils/db";
import { randomUUID } from "crypto";
interface ExtendedError extends Error {
  code: string;
}

describe("drizzle module", () => {
  let db: ReturnType<typeof drizzle>;
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  const uuid = randomUUID();
  beforeAll(async () => {
    const setup = await setupTestDb();

    container = setup.container;

    pool = setup.pool;
    db = setup.db;

    await pool.query(`
     CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

    `);
  }, 30000);

  afterAll(async () => {
    try {
      await pool.end(); // 🧹 Cerrar todas las conexiones primero
    } catch (err) {
      console.warn("Error al cerrar el pool:", err);
    }

    try {
      await container.stop(); // 🧱 Luego detener el contenedor
    } catch (err) {
      console.warn("Error al detener el contenedor:", err);
    }
  });

  it("debería insertar un usuario correctamente", async () => {
    const result = await db
      .insert(users)
      .values({
        id: uuid,
        username: "danny",
        password: "12345",
        email: "danny@example.com",
      })
      .returning();

    if (result.length === 0 || typeof result[0] === "undefined")
      throw new Error("No se ha insertado el usuario");
    const user = result[0];
    expect(user.username).toBe("danny");
    expect(user.email).toBe("danny@example.com");
    expect(user.id).toBeDefined();
  });

  it("debería fallar al insertar un usuario con el mismo nombre", async () => {
    try {
      await db
        .insert(users)
        .values({
          username: "danny",
          password: "12345",
          email: "danny@example.com",
        })
        .returning();
    } catch (error: unknown) {
      if (error instanceof DrizzleQueryError) {
        if (!error.cause) throw new Error("No se ha encontrado el error");
        const code = (error.cause as ExtendedError).code;

        expect(code).toBe("23505");
        expect(error.cause.message).toBe(
          'duplicate key value violates unique constraint "users_username_unique"'
        );
      }
    }
  });

  it("debería fallar al insertar un usuario con el mismo correo", async () => {
    try {
      await db
        .insert(users)
        .values({
          username: "dannys",
          password: "12345",
          email: "danny@example.com",
        })
        .returning();
    } catch (error: unknown) {
      if (error instanceof DrizzleQueryError) {
        if (!error.cause) throw new Error("No se ha encontrado el error");
        const code = (error.cause as ExtendedError).code;

        expect(code).toBe("23505");
        expect(error.cause.message).toBe(
          'duplicate key value violates unique constraint "users_email_unique"'
        );
      }
    }
  });

  it("debería fallar al insertar un usuario con el mismo id", async () => {
    try {
      await db
        .insert(users)
        .values({
          username: "danny",
          password: "12345",
          email: "danny@example.com",
          id: uuid,
        })
        .returning();
    } catch (error: unknown) {
      if (error instanceof DrizzleQueryError) {
        if (!error.cause) throw new Error("No se ha encontrado el error");
        const code = (error.cause as ExtendedError).code;

        expect(code).toBe("23505");
        expect(error.cause.message).toBe(
          'duplicate key value violates unique constraint "users_pkey"'
        );
      }
    }
  });

  it("deberia actualizar el usuario", async () => {
    const result = await db
      .update(users)
      .set({
        username: "danny_2",
      })
      .where(eq(users.id, uuid))
      .returning();

    if (result.length === 0 || typeof result[0] === "undefined")
      throw new Error("No se ha insertado el usuario");
    const user = result[0];

    expect(user.username).toBe("danny_2");
    expect(user.email).toBe("danny@example.com");
    expect(user.id).toBeDefined();
  });
});
