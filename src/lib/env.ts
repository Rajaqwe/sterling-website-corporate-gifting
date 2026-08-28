/**
 * assertEnv — Fail-fast environment variable validation.
 *
 * Call this at module-load time for any required secret. If the variable is
 * missing or empty, it throws synchronously, crashing the process/request
 * immediately rather than silently falling back to a dummy value that could
 * accept forged payloads or reach production un-noticed.
 *
 * Usage:
 *   const stripeKey = assertEnv('STRIPE_SECRET_KEY')
 */
export function assertEnv(key: string): string {
  const value = process.env[key]
  if (!value || value.trim() === '') {
    throw new Error(
      `[env] Required environment variable "${key}" is missing or empty. ` +
        `Check your .env file or deployment environment. See .env.example for all required variables.`
    )
  }
  return value
}
