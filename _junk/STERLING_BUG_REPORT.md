# Sterling — Code Review & Bug Report
Prepared for handoff to an autonomous coding agent (e.g. Google Antigravity).
Scope: full repo (`sterling_final_review.zip`) — Next.js 14 App Router / TypeScript / Prisma 7 / Supabase.

Verification method: `npm install` + `npx tsc --noEmit` run against the actual codebase (not a read-through guess), plus manual audit of auth, payments, and pricing code paths. Every item below is a confirmed, reproducible defect with file:line references.

---

## 0. Build Health Summary

| Check | Result |
|---|---|
| `npm install` | Succeeds, but `postinstall` (`prisma generate`) **fails** |
| `npx tsc --noEmit` | **48 errors across 21 files** |
| Root cause of ~35 of those 48 errors | Single misconfiguration in `prisma/schema.prisma` (see Bug #1) |

---

## 1. CRITICAL — Prisma 7 schema is unusable (breaks the entire type system)

**Files:** `prisma/schema.prisma`

Two Prisma-7-breaking-change requirements are missing:

```prisma
generator client {
  provider = "prisma-client-js"   // deprecated in Prisma 7, and...
}                                  // ...missing the now-mandatory `output` field

datasource db {
  provider = "postgresql"         // missing `url`, and Prisma 7 no longer
}                                  // even reads url from schema.prisma at all
```

In Prisma ORM v7:
- The `output` path is **required** in the `generator client` block. Without it, `prisma generate` cannot produce a client, and `@prisma/client` has no exported members.
- The database connection `url` is **no longer read from `schema.prisma`** — it must be moved to a `prisma.config.ts` file at the project root (`datasource: { url: env("DATABASE_URL") }`). **No `prisma.config.ts` file exists anywhere in this repo.**
- `prisma-client-js` is deprecated in favor of the new Rust-free `prisma-client` provider.

**This is the root cause of 35 of the 48 TypeScript errors**, all of the shape:
```
prisma/seed-demo.ts(1,10): error TS2305: Module '"@prisma/client"' has no exported member 'PrismaClient'.
src/lib/prisma/client.ts(1,10): error TS2305: Module '"@prisma/client"' has no exported member 'PrismaClient'.
src/lib/auth/server.ts(3,10): error TS2305: Module '"@prisma/client"' has no exported member 'User'.
src/app/actions/orders.ts(5,10): error TS2305: Module '"@prisma/client"' has no exported member 'OrderStatus'.
src/app/actions/invoices.ts(5,10): error TS2305: Module '"@prisma/client"' has no exported member 'InvoiceStatus'.
src/app/actions/quotes.ts(6,10): error TS2305: Module '"@prisma/client"' has no exported member 'QuoteStatus'.
```
...plus every `error TS7006: Parameter '...' implicitly has an 'any' type` in the admin/dashboard pages — those params are `.map()`/`.reduce()` callbacks over Prisma query results, and once `@prisma/client` has no real types, the inferred array types collapse to `any[]`.

**This also explains why `npm install` failed its `postinstall` step** in a clean environment — `prisma generate` has nothing to generate against.

**Fix:**
```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}
```
```ts
// prisma.config.ts (new file, project root)
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") },
});
```
Then update every `import { PrismaClient, ... } from '@prisma/client'` to import from the new generated path (`@/generated/prisma`), per Prisma's v7 migration guide. Note: if deploying with Next.js + Turbopack, keeping `prisma-client-js` (with `output` added) is currently the more compatible option — pick one provider and add the required `output` field either way.

**Also missing:** there is no `.env` or `.env.example` anywhere in the repo, so `DATABASE_URL` and every other secret referenced in code (see Bug #4) is undocumented for whoever deploys this.

---

## 2. CRITICAL — Privilege-escalation risk in `/api/admin/set-role`

**File:** `src/app/api/admin/set-role/route.ts`

```ts
const authHeader = request.headers.get('authorization')
if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

This route — which **promotes any user to `ADMIN` or `SUPER_ADMIN`** — is gated only by comparing the request's `Authorization` header to the app's own Supabase **service-role secret**, not by a real session/`requireSuperAdmin()` check. Problems:

1. **It is not covered by `middleware.ts` at all.** The middleware's admin guard only matches paths starting with `/admin` (page routes); `/api/admin/*` is not intercepted, so this route's only protection is the code above.
2. It compares secrets with `!==` (not constant-time), which is a minor timing-attack surface for a value this sensitive.
3. It has **no rate limiting** (every other auth-sensitive action in the app — `login`, `signup`, `createQuote` — uses `rateLimit()`; this one doesn't), so it's also brute-forceable without throttling.
4. Design-wise, requiring the caller to already possess `SUPABASE_SERVICE_ROLE_KEY` to call an *application* HTTP endpoint is backwards — that key is meant to stay server-side only (e.g. used *inside* server actions), never transmitted over HTTP as a bearer credential. If it is ever logged, proxied, or exposed via a misconfigured `NEXT_PUBLIC_` build, this endpoint is a full, unauthenticated path to Super Admin.
5. No audit log of who promoted whom.

**Fix:** remove this route (call the Supabase Admin API + Prisma update directly from a `'use server'` action instead), or at minimum gate it behind `requireSuperAdmin()` from `src/lib/auth/require-admin.ts` using the caller's real session, add it to the middleware matcher, add `rateLimit()`, and use `crypto.timingSafeEqual` if a shared-secret check must be kept as defense-in-depth.

---

## 3. HIGH — Duplicate, conflicting `requireAdmin()` implementations

**Files:** `src/lib/auth/server.ts` vs `src/lib/auth/require-admin.ts`

Two functions with the same name and purpose exist and check **two different sources of truth**:

- `auth/server.ts → requireAdmin()` checks the **Prisma** `User.role` column (DB is source of truth).
- `auth/require-admin.ts → requireAdmin()` checks the **Supabase JWT** `user.app_metadata.role` claim (token is source of truth).

`src/app/actions/quotes.ts` even **imports both in the same file**. Currently every live call site happens to use the `app_metadata` version (`admin/layout.tsx`, `admin/products/actions.ts`, `quotes.ts`), so there is no *active* bypass today — but:
- `auth/server.ts`'s `requireAdmin()` / `requireSuperAdmin()` are dead code, sitting there as a trap for the next engineer (or coding agent) who imports "the obvious one" from `@/lib/auth/server` (which is already imported in the same files for `requireUser`/`getAuthUser`) and gets DB-role gating instead of JWT-role gating.
- These two sources of truth **can drift**: `app_metadata.role` is only ever set by `/api/admin/set-role` (Bug #2). If that call partially fails (e.g. Prisma update succeeds, Supabase `updateUserById` throws — see the two are not wrapped in one transaction), the DB and JWT roles diverge, and different guards in the app will disagree about whether the same user is an admin.

**Fix:** delete one implementation (recommend keeping the JWT-based one, since middleware also relies on `app_metadata`), and make `/api/admin/set-role` update both sources atomically with rollback-on-failure, or make the DB the single source of truth and have `requireAdmin()` always check it (JWT role only used for optimistic middleware routing, re-verified server-side).

---

## 4. HIGH — Silent fallback to fake secrets instead of failing fast

**Files:**
- `src/app/api/webhooks/stripe/route.ts:6,10`
- `src/app/api/webhooks/razorpay/route.ts:14`
- `src/lib/email/sender.ts:5`

```ts
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_build', { ... });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_dummy';
...
const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";
...
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');
```

If these environment variables are ever missing in a deployment (easy to do — there's no `.env.example` documenting them, see Bug #1), the app doesn't crash on boot; it silently starts signing/verifying webhooks against a **known, hardcoded placeholder secret**. For the Razorpay case specifically, an attacker who notices the misconfiguration could forge a webhook payload signed with the empty-string secret and have it accepted as a legitimate `payment.captured` event, since `expectedSignature !== signature` in `razorpay/route.ts` is a plain string comparison with no upstream check that `secret` is non-empty.

**Fix:** throw at module load (or in a startup env-validation step, e.g. a small `assertEnv()` called from `instrumentation.ts`) if any required secret is missing, rather than defaulting to a dummy value. Never let a payment-webhook secret silently become `""`.

---

## 5. HIGH — Bulk-pricing tier selection is order-dependent (financial correctness bug)

**File:** `src/lib/pricing/server.ts` (`calculateServerProductTotal`, ~lines 20–45)

```ts
const product = await prisma.product.findUnique({
  where: { id: productId },
  include: { bulkPricingTiers: true, ... },  // no orderBy!
});

let activeTier = product.bulkPricingTiers[0] || { ... };

for (const tier of product.bulkPricingTiers) {
  if (quantity >= tier.minQuantity) {
    if (tier.maxQuantity === null || quantity <= tier.maxQuantity) {
      activeTier = tier;
      break;               // <-- stops at the FIRST matching tier in DB return order
    }
  }
}
```

This function is the **server-side "trust nothing from the client" price calculator** used by both quote requests and checkout — it exists specifically to be authoritative. But `bulkPricingTiers` is fetched with no `orderBy`, so Postgres/Prisma may return the rows in insertion order (or any order), not ascending `minQuantity`. If any tier has `maxQuantity: null` (used intentionally for the top/uncapped bracket) and it happens to sort before a narrower tier in the returned array, the loop will match the unbounded tier first and `break`, silently charging the wrong (likely lower, "wholesale") unit price for a quantity that should have landed in a cheaper-but-narrower bracket, or vice versa. Pricing bugs like this are invisible in normal manual testing (data usually happens to come back in insertion order) and only surface after data migrations, re-seeding, or a DB provider change reorders rows.

There's a second, separate issue right below it:
```ts
const highestTier = product.bulkPricingTiers.sort((a, b) => b.minQuantity - a.minQuantity)[0];
```
`Array.prototype.sort()` **mutates the array in place**. This mutates `product.bulkPricingTiers` — the very same `product` object that's returned from this function and (per `quotes.ts`) stored as `pricing.product`. Any caller that also renders `product.bulkPricingTiers` in original order (e.g. a pricing table on the product page) will silently see it re-ordered descending by `minQuantity` as a side effect of calling the pricing function.

**Fix:**
```ts
include: {
  bulkPricingTiers: { orderBy: { minQuantity: 'asc' } },
  ...
}
```
and replace the mutating `.sort()` with a non-mutating copy: `[...product.bulkPricingTiers].sort((a, b) => b.minQuantity - a.minQuantity)[0]`. Also consider validating at write-time (admin product form) that tiers are contiguous/non-overlapping, since the read-side loop assumes that invariant.

---

## 6. MEDIUM — Stripe API version pinned to a value the installed SDK doesn't support

**File:** `src/app/api/webhooks/stripe/route.ts:7`

```ts
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '...', {
  apiVersion: '2026-07-29.dahlia',
});
```
```
error TS2322: Type '"2026-07-29.dahlia"' is not assignable to type '"2026-08-26.dahlia"'.
```
`stripe` in `package.json` is `^22.5.0`, and the installed `22.6.0` package's type definitions only accept `'2026-08-26.dahlia'` as the pinned `apiVersion` literal. This isn't just a type error to silence — the string is a literal-typed API version, and mismatching it against what the installed SDK expects means the webhook client is (or was) built against a different Stripe API contract than the SDK was generated for, which can affect event payload shape.

**Fix:** update the literal to `'2026-08-26.dahlia'` (or whatever the currently intended, supported version is) and add a CI check that fails the build if `tsc` reports a mismatch here — this class of error should never reach production silently.

---

## 7. MEDIUM — `React.useState<boolean>` fed a possibly-`undefined` value

**Files:** `src/components/products/ProductDetailClient.tsx:121`, `src/app/products/actions.ts` (`toggleLike`)

```ts
// ProductDetailClient.tsx
setIsLiked(res.isLiked);   // TS2345: boolean | undefined not assignable to SetStateAction<boolean>
```

`toggleLike()`'s two return branches are:
```ts
return { success: true, likes: updated.likes, isLiked: !existingLike };
return { success: false, error: err.message || "Failed to like product" };
```
Because the function has **no explicit return type**, TypeScript widens the literal `success: true` to plain `boolean` when inferring the return type — which destroys the discriminated union. As a result, even after the caller checks `res.success && res.likes !== undefined`, TypeScript can't narrow `res.isLiked` to `boolean`, and callers must at minimum handle `undefined`, or (worse) this can be masking cases where `success` really is `true` but the object shape assumed elsewhere is wrong.

**Fix:** give `toggleLike` (and the other similarly-shaped actions in this file) an explicit discriminated-union return type:
```ts
type ToggleLikeResult =
  | { success: true; likes: number; isLiked: boolean }
  | { success: false; error: string };

export async function toggleLike(productId: string): Promise<ToggleLikeResult> { ... }
```
This is a repo-wide pattern worth fixing everywhere server actions return `{ success, ... }` shapes (checkout, cart, quotes, orders all follow the same convention and are equally at risk of this narrowing failure).

---

## 8. LOW / Hygiene

| Issue | Where | Note |
|---|---|---|
| In-memory rate limiter | `src/lib/security/rate-limit.ts` | Already flagged in the code's own comment — resets per server instance/region, so it's ineffective on serverless/multi-instance deployments (Vercel). Fine for a single long-running server; **must** move to Redis (`@upstash/ratelimit`) before production if deploying serverless. Also affects `/api/admin/set-role` (Bug #2), which doesn't call it at all. |
| Implicit `any` in `.reduce()`/`.map()` across admin & dashboard pages | `src/app/(admin)/...`, `src/app/(dashboard)/...`, `src/app/checkout/page.tsx`, `src/app/products/[slug]/page.tsx`, `src/lib/products/filter-utils.ts` | ~30 of these are downstream of Bug #1 and will disappear once Prisma types resolve. Recommend enabling `noImplicitAny` enforcement in CI (it's already `true`-equivalent via `strict`, but currently failing silently because the build doesn't run `tsc --noEmit` as a gate). |
| No `.env.example` / `.env` in repo | project root | Nothing documents `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`. Combine with Bug #4 and misconfiguration becomes invisible rather than a hard failure. |
| `postinstall: "prisma generate"` | `package.json` | Will fail every fresh `npm install` (in any offline/restricted-network CI image, and permanently until Bug #1 is fixed) since there's nothing valid to generate. |

---

## Priority Order for the Agent

1. Fix `prisma/schema.prisma` + add `prisma.config.ts` (Bug #1) — unblocks the type system and the other ~35 cascading errors; do this first and re-run `tsc --noEmit` to confirm the implicit-`any` list shrinks to only the genuinely new ones (Bug #7 area).
2. Lock down or remove `/api/admin/set-role` (Bug #2) — this is the only item here with real, exploitable production-security impact.
3. Resolve the duplicate `requireAdmin()` (Bug #3) and make role promotion atomic.
4. Add fail-fast env validation and remove dummy secret fallbacks (Bug #4).
5. Fix bulk-pricing tier ordering + non-mutating sort (Bug #5) — silent revenue-impacting bug.
6. Fix Stripe `apiVersion` literal (Bug #6).
7. Add discriminated-union return types to server actions, starting with `toggleLike` (Bug #7).
8. Hygiene pass (Bug #8) before any serverless production deploy.

---

## Appendix — Full raw `tsc --noEmit` output (48 errors)

```
prisma/seed-demo.ts(1,10): error TS2305: Module '"@prisma/client"' has no exported member 'PrismaClient'.
src/app/(admin)/admin/customers/page.tsx(76,26): error TS7006: Parameter 'user' implicitly has an 'any' type.
src/app/(admin)/admin/orders/page.tsx(76,27): error TS7006: Parameter 'order' implicitly has an 'any' type.
src/app/(admin)/admin/page.tsx(98,35): error TS7006: Parameter 'quote' implicitly has an 'any' type.
src/app/(admin)/admin/page.tsx(99,58): error TS7006: Parameter 'acc' implicitly has an 'any' type.
src/app/(admin)/admin/page.tsx(99,63): error TS7006: Parameter 'item' implicitly has an 'any' type.
src/app/(admin)/admin/products/page.tsx(89,29): error TS7006: Parameter 'product' implicitly has an 'any' type.
src/app/(admin)/admin/quotes/page.tsx(77,30): error TS7006: Parameter 'quote' implicitly has an 'any' type.
src/app/(admin)/admin/quotes/page.tsx(108,26): error TS7006: Parameter 'quote' implicitly has an 'any' type.
src/app/(dashboard)/dashboard/orders/page.tsx(56,27): error TS7006: Parameter 'order' implicitly has an 'any' type.
src/app/(dashboard)/dashboard/page.tsx(109,36): error TS7006: Parameter 'quote' implicitly has an 'any' type.
src/app/(dashboard)/dashboard/quotes/page.tsx(53,30): error TS7006: Parameter 'quote' implicitly has an 'any' type.
src/app/(dashboard)/dashboard/quotes/page.tsx(54,58): error TS7006: Parameter 'acc' implicitly has an 'any' type.
src/app/(dashboard)/dashboard/quotes/page.tsx(54,63): error TS7006: Parameter 'item' implicitly has an 'any' type.
src/app/(dashboard)/dashboard/quotes/page.tsx(55,61): error TS7006: Parameter 'acc' implicitly has an 'any' type.
src/app/(dashboard)/dashboard/quotes/page.tsx(55,66): error TS7006: Parameter 'item' implicitly has an 'any' type.
src/app/(dashboard)/dashboard/quotes/page.tsx(80,26): error TS7006: Parameter 'quote' implicitly has an 'any' type.
src/app/(dashboard)/dashboard/quotes/page.tsx(81,54): error TS7006: Parameter 'acc' implicitly has an 'any' type.
src/app/(dashboard)/dashboard/quotes/page.tsx(81,59): error TS7006: Parameter 'item' implicitly has an 'any' type.
src/app/actions/invoices.ts(5,10): error TS2305: Module '"@prisma/client"' has no exported member 'InvoiceStatus'.
src/app/actions/orders.ts(5,10): error TS2305: Module '"@prisma/client"' has no exported member 'OrderStatus'.
src/app/actions/orders.ts(61,42): error TS7006: Parameter 'acc' implicitly has an 'any' type.
src/app/actions/orders.ts(61,47): error TS7006: Parameter 'item' implicitly has an 'any' type.
src/app/actions/orders.ts(84,31): error TS7006: Parameter 'item' implicitly has an 'any' type.
src/app/actions/quotes.ts(6,10): error TS2305: Module '"@prisma/client"' has no exported member 'QuoteStatus'.
src/app/api/webhooks/razorpay/route.ts(35,40): error TS7006: Parameter 'tx' implicitly has an 'any' type.
src/app/api/webhooks/stripe/route.ts(7,3): error TS2322: Type '"2026-07-29.dahlia"' is not assignable to type '"2026-08-26.dahlia"'.
src/app/checkout/page.tsx(42,42): error TS7006: Parameter 'acc' implicitly has an 'any' type.
src/app/checkout/page.tsx(42,47): error TS7006: Parameter 'item' implicitly has an 'any' type.
src/app/checkout/page.tsx(43,45): error TS7006: Parameter 'acc' implicitly has an 'any' type.
src/app/checkout/page.tsx(43,50): error TS7006: Parameter 'item' implicitly has an 'any' type.
src/app/corporate-gifts/page.tsx(89,30): error TS7006: Parameter 'product' implicitly has an 'any' type.
src/app/gift-collections/page.tsx(75,30): error TS7006: Parameter 'product' implicitly has an 'any' type.
src/app/personalised-gifts/page.tsx(75,30): error TS7006: Parameter 'product' implicitly has an 'any' type.
src/app/products/[slug]/page.tsx(23,43): error TS7006: Parameter 'm' implicitly has an 'any' type.
src/app/products/[slug]/page.tsx(48,24): error TS7006: Parameter 'product' implicitly has an 'any' type.
src/app/products/[slug]/page.tsx(121,50): error TS7006: Parameter 'bo' implicitly has an 'any' type.
src/app/products/[slug]/page.tsx(128,31): error TS7006: Parameter 'm' implicitly has an 'any' type.
src/components/products/ProductDetailClient.tsx(121,20): error TS2345: Argument of type 'boolean | undefined' is not assignable to parameter of type 'SetStateAction<boolean>'.
  Type 'undefined' is not assignable to type 'SetStateAction<boolean>'.
src/lib/auth/server.ts(3,10): error TS2305: Module '"@prisma/client"' has no exported member 'User'.
src/lib/pricing/server.ts(46,56): error TS7006: Parameter 'a' implicitly has an 'any' type.
src/lib/pricing/server.ts(46,59): error TS7006: Parameter 'b' implicitly has an 'any' type.
src/lib/pricing/server.ts(60,49): error TS7006: Parameter 'o' implicitly has an 'any' type.
src/lib/prisma/client.ts(1,10): error TS2305: Module '"@prisma/client"' has no exported member 'PrismaClient'.
src/lib/products/filter-utils.ts(159,32): error TS7006: Parameter 'c' implicitly has an 'any' type.
src/lib/products/filter-utils.ts(160,32): error TS7006: Parameter 'a' implicitly has an 'any' type.
src/lib/products/filter-utils.ts(162,28): error TS7006: Parameter 'v' implicitly has an 'any' type.
```
