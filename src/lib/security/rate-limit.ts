// Distributed rate limiter for Server Actions and Webhooks
// Falls back to in-memory caching if Redis environment variables are not configured

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// --- In-memory Fallback (for local development) ---
const rateLimitCache = new Map<string, { count: number, resetTime: number }>();

function memoryRateLimit(identifier: string, limit: number, windowMs: number) {
  const now = Date.now();
  const record = rateLimitCache.get(identifier);

  // Cleanup old records occasionally (every 100 requests)
  if (Math.random() < 0.01) {
    rateLimitCache.forEach((value, key) => {
      if (value.resetTime < now) {
        rateLimitCache.delete(key);
      }
    });
  }

  if (!record || record.resetTime < now) {
    rateLimitCache.set(identifier, { count: 1, resetTime: now + windowMs });
    return { success: true };
  }

  if (record.count >= limit) {
    return { success: false, resetTime: record.resetTime };
  }

  record.count += 1;
  return { success: true };
}

// --- Redis Client Initialization ---
let redisClient: Redis | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    redisClient = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  } catch (error) {
    console.error("Failed to initialize Upstash Redis:", error);
  }
}

// Cache of Upstash rate limiters to avoid recreating them on every request
const limiters = new Map<string, Ratelimit>();

function getLimiter(limit: number, windowMs: number) {
  if (!redisClient) return null;
  const windowSeconds = Math.max(1, Math.floor(windowMs / 1000));
  const key = `${limit}_${windowSeconds}`;
  
  if (!limiters.has(key)) {
    limiters.set(key, new Ratelimit({
      redis: redisClient,
      limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      analytics: true,
      prefix: "sterling_ratelimit",
    }));
  }
  
  return limiters.get(key)!;
}

/**
 * Validates rate limit. Uses Upstash Redis if configured, otherwise falls back to memory.
 * This implementation dynamically caches Ratelimit instances per limit/window combo.
 */
export async function rateLimit(identifier: string, limit: number = 5, windowMs: number = 60000) {
  const ratelimitClient = getLimiter(limit, windowMs);

  if (ratelimitClient) {
    try {
      const { success, reset } = await ratelimitClient.limit(identifier);
      return { success, resetTime: reset };
    } catch (error) {
      console.error("Redis rate limit failed, falling back to memory:", error);
      return memoryRateLimit(identifier, limit, windowMs);
    }
  }

  // Fallback
  return memoryRateLimit(identifier, limit, windowMs);
}
