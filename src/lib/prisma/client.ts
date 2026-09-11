import { PrismaClient } from '@/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  pool: Pool | undefined
}

// Instantiate pg Pool with connection string
// Supabase session-mode pooler is capped at pool_size: 15 connections.
// In dev:  max: 10  keeps headroom while allowing parallel queries.
// In prod: max: 3   because each serverless function instance gets its own pool;
//          many instances × 3 stays well under the 15-connection ceiling.
const pool = globalForPrisma.pool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  max: process.env.NODE_ENV === 'production' ? 3 : 10,
  idleTimeoutMillis: 30_000,      // release idle connections after 30 s
  connectionTimeoutMillis: 10_000, // fail fast if no connection available in 10 s
})
if (process.env.NODE_ENV !== 'production') globalForPrisma.pool = pool

const adapter = new PrismaPg(pool)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
