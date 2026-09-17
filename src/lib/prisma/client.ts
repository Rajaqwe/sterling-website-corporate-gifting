import { PrismaClient } from '@/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pool: Pool | undefined
}

// Instantiate pg Pool with connection string
// Supabase session-mode pooler is capped at pool_size: 15 connections.
// Dev caps at 5: Turbopack HMR and parallel server renders can open many
// sockets at once, and a second dev-server instance (e.g. a worktree copy)
// shares the same 15-connection ceiling — 10 left zero headroom (EMAXCONNSESSION).
// Prod keeps max: 3 because each serverless instance gets its own pool.
const pool = globalForPrisma.pool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: process.env.NODE_ENV === 'production' ? 3 : 5,
  idleTimeoutMillis: 30_000,      // release idle connections after 30 s
  connectionTimeoutMillis: 10_000, // fail fast if no connection available in 10 s
})
if (process.env.NODE_ENV !== 'production') globalForPrisma.pool = pool

const adapter = new PrismaPg(pool)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
