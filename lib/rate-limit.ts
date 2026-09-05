import { RateLimitError } from './errors'

interface RateLimitRecord {
  timestamps: number[]
}

const rateLimitStore = new Map<string, RateLimitRecord>()

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitStore.entries()) {
    // Retain only timestamps from the last 10 minutes
    record.timestamps = record.timestamps.filter((ts) => now - ts < 600_000)
    if (record.timestamps.length === 0) {
      rateLimitStore.delete(key)
    }
  }
}, 300_000).unref?.()

export interface RateLimitResult {
  allowed: boolean
  limit: number
  remaining: number
  resetTime: number
}

/**
 * Evaluates sliding-window rate limit for an identifier (UID or IP address).
 * Note: Uses in-memory storage per instance. In a multi-instance Cloud Run deployment,
 * this enforces per-instance ceilings. For clustered deployments, Redis/Upstash can be dropped in.
 */
export function checkRateLimit(
  identifier: string,
  limit = 10,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now()
  const windowStart = now - windowMs

  let record = rateLimitStore.get(identifier)
  if (!record) {
    record = { timestamps: [] }
    rateLimitStore.set(identifier, record)
  }

  // Filter timestamps within current sliding window
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart)

  if (record.timestamps.length >= limit) {
    const oldest = record.timestamps[0]
    const resetTime = oldest + windowMs
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetTime,
    }
  }

  record.timestamps.push(now)
  return {
    allowed: true,
    limit,
    remaining: limit - record.timestamps.length,
    resetTime: now + windowMs,
  }
}

/**
 * Throws RateLimitError if the rate limit is exceeded.
 */
export function assertRateLimit(
  identifier: string,
  limit = 10,
  windowMs = 60_000
): void {
  const result = checkRateLimit(identifier, limit, windowMs)
  if (!result.allowed) {
    const retrySeconds = Math.max(1, Math.ceil((result.resetTime - Date.now()) / 1000))
    throw new RateLimitError(
      `Too many requests. Please wait ${retrySeconds} seconds before trying again.`
    )
  }
}
