/* import { env } from "./src/config/env"; */
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: "env.DATABASE_URL",
  },
});
