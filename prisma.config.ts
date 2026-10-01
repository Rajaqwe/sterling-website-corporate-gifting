// prisma.config.ts — Prisma 7 configuration
// DIRECT_URL must be set in your environment for Prisma CLI/migrations.
// Runtime Prisma Client uses the pooled DATABASE_URL in src/lib/prisma/client.ts.
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
