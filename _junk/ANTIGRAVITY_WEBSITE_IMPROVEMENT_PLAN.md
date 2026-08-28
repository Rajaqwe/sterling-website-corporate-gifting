# Sterling Website — Google Antigravity Improvement & Fix Execution Plan

## Purpose

This document is an **implementation runbook for Google Antigravity**.

The goal is to take the existing Sterling Corporate Gifting website codebase and improve it systematically without breaking existing functionality.

The implementation should be based on:

1. The current Sterling source code.
2. The existing project documentation.
3. The previous Round-2 verification report.
4. The concrete source-level findings captured below.
5. New verification performed after each change.

This is **not** a request to redesign the entire website from scratch.

Preserve the current Sterling brand direction, business logic, product data model, authentication model, payment integrations, and overall information architecture unless a change below explicitly requires modification.

---

# 1. PRIMARY INSTRUCTION TO ANTIGRAVITY

Act as a senior:

- Full-stack engineer
- Next.js engineer
- React/TypeScript engineer
- Security engineer
- DevOps engineer
- QA engineer
- Performance engineer
- SEO engineer
- Accessibility engineer
- UI/UX engineer

Work directly on the existing project.

## Core rule

**Do not merely describe fixes. IMPLEMENT THEM in the codebase.**

For every change:

1. Inspect the current implementation.
2. Identify the safest modification.
3. Implement it.
4. Run the relevant checks.
5. Fix any regression introduced by the change.
6. Re-run the checks.
7. Only mark the task complete when the acceptance criteria are satisfied.

Do not stop after fixing the first few issues.

---

# 2. VERY IMPORTANT: PROTECT EXISTING BUSINESS LOGIC

Do not casually rewrite:

- Product pricing
- Bulk pricing logic
- Cart behavior
- Quote calculations
- Order calculations
- Payment amount calculations
- Payment webhook processing
- Authentication
- Authorization
- Company/customer relationships
- Admin/Super Admin permissions
- Product inventory semantics
- Existing database relationships
- Existing public URLs

Before modifying shared logic, understand all call sites.

Never replace working business logic with a simplified demo implementation.

---

# 3. CURRENT CODEBASE SNAPSHOT

The project is a Next.js/React/TypeScript application with:

- Next.js 14.2.x
- React 18
- TypeScript
- Prisma
- PostgreSQL/Supabase
- Supabase Auth
- Razorpay
- Stripe
- Resend
- Upstash Redis/Ratelimit
- React Hook Form
- Zod
- Tailwind CSS
- Recharts
- Playwright
- Vitest

Important areas include:

- `src/app`
- `src/components`
- `src/lib`
- `src/app/api`
- `prisma`
- `tests`
- `docs`

Do not edit generated Prisma client code manually.

---

# 4. MANDATORY BASELINE BEFORE CHANGES

Before touching implementation:

## 4.1 Install dependencies

Use the repository's lockfile.

Prefer:

```bash
npm ci
```

If the environment or package configuration prevents `npm ci`, diagnose the reason before using an alternative.

## 4.2 Generate Prisma client

Run:

```bash
npx prisma generate
```

This MUST succeed in the real development environment.

The existing Prisma configuration was previously identified as structurally corrected. Confirm it again.

Expected important configuration:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}
```

## 4.3 Type-check

Run:

```bash
npx tsc --noEmit
```

Acceptance criterion:

```text
0 TypeScript errors
```

Do not silence errors with:

- `@ts-ignore`
- unnecessary `any`
- broad casts
- disabling TypeScript checks

Fix the actual cause.

## 4.4 Build

Run:

```bash
npm run build
```

The build must complete successfully.

## 4.5 Tests

Run the existing test suite(s), including:

```bash
npm test
```

If `npm test` does not exist, inspect `package.json` and execute the available test runners directly.

Also run:

```bash
npx vitest run
```

and:

```bash
npx playwright test
```

where environment/setup permits.

## 4.6 Security/dependency baseline

Run:

```bash
npm audit
```

Record the result.

Do not automatically upgrade every dependency. Assess compatibility first.

---

# 5. PRIORITY SYSTEM

Use this severity system:

### P0 — Critical
Security vulnerabilities, credential exposure, payment correctness failures, authorization bypasses, destructive data bugs, production-breaking issues.

### P1 — High
Major functionality issues, serious reliability issues, important performance/security/SEO/accessibility failures.

### P2 — Medium
Meaningful UX, maintainability, performance, accessibility, SEO, content, and consistency issues.

### P3 — Low
Cleanup, minor UI inconsistencies, small code quality improvements.

### P4 — Nice-to-have
Optional enhancements.

---

# 6. MANDATORY TASK ORDER

Implement in this order unless a dependency requires otherwise:

1. Secrets and repository hygiene
2. Distributed rate limiting
3. Security hardening
4. Build/type/test reliability
5. Payment/webhook hardening
6. API/server-side validation
7. Type-safety improvements
8. SEO/metadata corrections
9. Accessibility
10. Performance
11. UI/UX consistency
12. Dead code/cleanup
13. Final regression testing
14. Final verification report

---

# 7. P0 — ENVIRONMENT / SECRET HYGIENE

## Finding

The supplied source bundle contains a `.env` file with populated environment values.

Even if the file is ignored by Git, the source bundle itself contains real-looking environment values.

This is a production-security risk.

## Required actions

### 7.1 Remove `.env` from the project artifact

The repository should not contain committed production/local secrets.

Keep:

```text
.env.example
```

Keep actual secrets only in:

- local `.env.local`
- secure deployment environment variables
- approved secret managers

### 7.2 Inspect the repository/history

Check whether `.env` has ever been committed.

If it has ever been exposed or committed:

- Treat affected credentials as compromised.
- Rotate them.
- Revoke old credentials where applicable.
- Regenerate credentials.
- Update deployment configuration.

Do NOT paste secret values into logs or reports.

### 7.3 Strengthen environment validation

Audit all required environment variables.

Use fail-fast validation for server-only secrets.

Do not use:

```ts
process.env.X || "dummy"
```

or equivalent fallback secrets.

### Acceptance criteria

- No secret values in source-controlled files.
- `.env.example` documents required variables without real secrets.
- Server-only secrets are never exposed to client code.
- Application startup fails clearly when mandatory secrets are absent.
- No dummy security/payment credentials remain.

---

# 8. P0 — DISTRIBUTED RATE LIMITING

## Current problem

`src/lib/security/rate-limit.ts` currently:

- Supports Upstash Redis.
- Falls back to an in-memory `Map`.
- Uses a fixed Upstash limiter configuration of 5 requests / 60 seconds.
- Does not truly honor the requested `limit` and `windowMs` when Redis is active.
- Falls back to process-local memory if Redis is unavailable.

This is unsafe as a production strategy for multi-instance/serverless deployments.

## Required implementation

Replace the current design with a proper distributed rate-limit implementation.

Preferred architecture:

- Upstash Redis as the production backend.
- No production dependence on process-local memory.
- Local development may optionally use a clearly flagged development-only fallback.

### Important

Different endpoint classes need different policies.

Do not make every endpoint use 5 requests / 60 seconds.

Create explicit policies such as:

```ts
AUTH
ADMIN
SEARCH
CONTACT
QUOTE
CHECKOUT
WEBHOOK
```

Use centralized configuration.

Example conceptual API:

```ts
rateLimit({
  identifier,
  policy: RATE_LIMIT_POLICIES.ADMIN,
})
```

## Required behavior

When Redis is configured:

- use distributed storage
- honor each endpoint's intended limit/window
- return remaining/reset information when useful
- handle Redis failures intentionally

Do not silently downgrade a production security control to process-local memory.

### Redis failure policy

Choose and document one:

1. Fail closed for security-critical endpoints, or
2. Fail open only for low-risk/non-security-sensitive endpoints.

For role-changing, authentication, and payment-sensitive operations, prefer fail-closed behavior.

### Acceptance criteria

- `set-role` is protected by a distributed limiter.
- Auth-sensitive endpoints use appropriate policies.
- Payment-sensitive endpoints cannot be trivially spammed.
- No production security endpoint relies on an in-memory Map.
- Automated tests cover rate-limit behavior.

---

# 9. P1 — ADMIN ROLE CHANGE ENDPOINT

Target:

```text
src/app/api/admin/set-role/route.ts
```

The previous verification found this endpoint substantially hardened, including:

- authenticated session requirement
- SUPER_ADMIN authorization
- role validation
- self-demotion protection
- database update
- Supabase role update
- rollback handling
- audit logging
- middleware defense-in-depth
- rate limiting

Do not remove those protections.

## Improvements

### 9.1 Remove unused imports

Remove the unused `crypto` import if still present.

### 9.2 Validate request body robustly

Do not destructure arbitrary JSON blindly.

Create a Zod schema for:

```ts
{
  userId: string,
  role: "ADMIN" | "SUPER_ADMIN" | "CUSTOMER"
}
```

Reject:

- malformed JSON
- missing values
- invalid IDs
- invalid roles
- unexpected input shapes

### 9.3 Improve atomicity

Current behavior updates Prisma, then updates Supabase, then rolls Prisma back on Supabase failure.

Preserve the existing safety behavior, but review race conditions and failure windows.

Document the consistency model.

Where practical, make role ownership have a clearly defined source of truth.

### 9.4 Prevent privilege escalation edge cases

Explicitly test:

- CUSTOMER attempting role change
- ADMIN attempting role change
- SUPER_ADMIN changing another user
- SUPER_ADMIN changing self
- SUPER_ADMIN attempting self-demotion
- invalid role
- nonexistent target user
- malformed request
- repeated requests
- Redis unavailable
- Supabase update failure
- DB update failure

---

# 10. P1 — PAYMENT WEBHOOK HARDENING

Targets:

```text
src/app/api/webhooks/razorpay/route.ts
src/app/api/webhooks/stripe/route.ts
```

## Razorpay

The timing-safe signature comparison is already improved.

Maintain the explicit signature-length check before:

```ts
crypto.timingSafeEqual(...)
```

This is correct and should remain.

## Required improvements

### 10.1 Avoid `any` in webhook transaction code

Replace broad `any` where possible with meaningful Prisma transaction/client types.

### 10.2 Validate webhook payload structure

Do not trust nested properties such as:

```ts
event.payload.payment.entity
```

without runtime validation.

Create a validation schema or safe parser.

Malformed payloads should produce predictable client responses without uncaught exceptions.

### 10.3 Idempotency

Preserve the payment event idempotency mechanism.

Verify:

- duplicate events do not create duplicate payments
- duplicate events do not update orders twice
- concurrent delivery does not double-process
- payment IDs are unique

### 10.4 Payment amount integrity

Keep server-side amount verification.

Do not trust client-provided totals.

Prefer integer minor-unit calculations for payment amounts rather than floating-point arithmetic where practical.

For INR:

```text
₹123.45 -> 12345 paise
```

Use integer comparisons wherever possible.

### 10.5 Currency integrity

Make currency handling explicit.

Do not assume INR silently if the database/payment configuration could support multiple currencies.

Centralize the supported-currency policy.

### 10.6 Error response correctness

Differentiate:

- malformed request
- invalid signature
- duplicate event
- invalid order
- amount mismatch
- server failure

Do not return misleading 500 responses for client validation errors.

---

# 11. P1 — REMOVE BUILD-LINT BLIND SPOT

Current configuration contains:

```js
eslint: {
  ignoreDuringBuilds: true,
}
```

This means build success does not guarantee lint correctness.

## Required action

Determine whether this was temporary.

Do not blindly remove it if existing lint configuration is incompatible with the project version.

Instead:

1. Run ESLint directly.
2. Record current errors.
3. Fix them.
4. Restore build-time lint enforcement if feasible.

Target:

```text
Build + TypeScript + ESLint should all pass.
```

Do not solve lint errors by globally disabling rules.

---

# 12. P1 — SECURITY HEADERS ALIGNMENT

## Finding

Documentation claims CSP support, but the current `next.config.mjs` does not add a Content-Security-Policy header.

The code currently sets:

- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy
- Strict-Transport-Security
- Permissions-Policy

## Required action

Implement a real CSP appropriate to the application.

Do not copy a generic CSP blindly.

First inspect:

- Next.js scripts
- Supabase
- Razorpay
- Stripe
- image hosts
- analytics
- fonts
- video assets
- any third-party content

Build a CSP based on actual resource usage.

Test development and production behavior after adding it.

### Also

Review whether:

```text
X-XSS-Protection
```

is still useful for the supported browser baseline.

Do not depend on that header as a primary XSS control.

### Acceptance criteria

- CSP is present in production.
- Required application resources still load.
- Payment flows still function.
- Authentication still functions.
- Images/fonts/videos still load.
- CSP does not create hidden runtime failures.

---

# 13. P1 — TYPE SAFETY CLEANUP

There are many broad `any` usages across the repository.

Important examples include:

- `ProductCard.tsx`
- `ProductDetailClient.tsx`
- `ProductReviews.tsx`
- `NavbarClient.tsx`
- `CheckoutForm.tsx`
- pricing helpers
- PDF generators
- server actions
- API routes
- transaction callbacks

## Required approach

Do NOT try to eliminate every `any` in one uncontrolled rewrite.

Prioritize:

1. Security-sensitive code
2. Payment code
3. Pricing code
4. Database transaction code
5. API inputs/outputs
6. Product models
7. Shared components

Use actual types derived from Prisma/domain models where appropriate.

Create shared domain types instead of repeating anonymous object shapes.

### Acceptance criteria

- No `any` in newly modified security/payment/API logic.
- Replace high-risk existing `any` usages with proper types.
- No increase in TypeScript errors.
- `tsc --noEmit` passes.

---

# 14. P1 — PRODUCT DATA TYPE CONSISTENCY

Product components currently contain defensive casts such as:

```ts
(product as any)
```

and generic data assumptions.

Review the canonical product data shape.

Create or strengthen a shared product model that consistently represents:

- id
- slug
- name
- description
- category
- media
- pricing
- minimum quantity
- variants
- customizations
- availability

Ensure:

- ProductCard
- ProductGrid
- ProductDetailClient
- ProductGallery
- ProductCustomization
- ProductSpecifications
- pricing utilities
- catalog filters
- search
- admin product forms

use compatible types.

Do not duplicate product shapes in multiple components.

---

# 15. P1 — PRICING SAFETY

Audit:

```text
src/lib/utils/pricing.ts
src/lib/pricing/server.ts
src/components/products/TieredPricingTable.tsx
```

The prior Round-2 report confirmed the order-dependent bulk-tier bug was fixed.

Keep the fix.

Verify:

- tier selection is deterministic
- tiers are ordered correctly
- no mutating `.sort()` is used on shared arrays
- pricing is calculated server-side
- client values cannot override server pricing
- minimum quantities are enforced
- variant pricing is correct
- customization pricing is correct
- discounts do not become negative
- decimals/rounding are deterministic

Add focused tests around boundary quantities:

```text
0
1
MOQ-1
MOQ
MOQ+1
tier boundary-1
tier boundary
tier boundary+1
very large quantity
```

---

# 16. P1 — AUTHORIZATION / MULTI-TENANCY

Review all server actions and route handlers for company isolation.

Pay special attention to:

- orders
- quotes
- invoices
- carts
- dashboard
- admin operations
- company settings

Every data read/write should answer:

> Is this resource actually owned by the authenticated user/company?

Do not rely only on frontend visibility.

Server-side authorization must be enforced.

Test cross-company access attempts.

---

# 17. P1 — SERVER ACTION INPUT VALIDATION

Review:

```text
src/app/actions/
src/app/cart/actions.ts
src/app/products/actions.ts
src/app/(auth)/actions.ts
src/app/(admin)/actions/
```

Use Zod or equivalent runtime validation consistently.

Validate:

- IDs
- quantities
- pagination
- sort parameters
- search parameters
- user-entered strings
- uploaded metadata
- quote data
- checkout data

Do not trust TypeScript types at runtime.

---

# 18. P1 — SEARCH API

Target:

```text
src/app/api/search/route.ts
```

Review:

- input parsing
- query length
- rate limiting
- pagination
- result limits
- wildcard behavior
- database query efficiency
- error handling
- response shape
- normalization
- relevance
- empty results

Prevent unlimited result sets and expensive queries.

Add tests for:

- empty query
- very long query
- special characters
- no results
- common terms
- repeated requests
- pagination boundaries

---

# 19. P1 — FILE UPLOAD / BULK IMPORT

Inspect:

```text
src/components/forms/RecipientCsvUploader.tsx
src/components/admin/BulkProductImport.tsx
src/app/(admin)/actions/bulk-import.ts
```

Verify all file-validation claims in `docs/SECURITY.md` against actual implementation.

Especially verify:

- MIME validation
- file size checks
- CSV parsing
- malformed rows
- formula injection risks
- oversized input
- row limits
- duplicate SKU handling
- transaction behavior
- partial failure handling
- error reporting
- authorization

Do not trust extensions alone.

---

# 20. P1 — ERROR HANDLING

The repository contains many `console.error` calls.

Do not remove logging blindly.

Instead:

- keep server-side useful logs
- remove sensitive data from logs
- do not log secrets/tokens
- do not log entire user records unnecessarily
- avoid dumping payment payloads unless safely redacted
- return safe client-facing errors
- use consistent error envelopes where appropriate

Review:

```text
src/app/global-error.tsx
src/app/not-found.tsx
src/app/**/error.tsx
```

Make error boundaries user-friendly and non-leaky.

---

# 21. P2 — SEO SYSTEM

Review all public pages and product pages.

Ensure:

- unique page titles
- unique descriptions
- useful H1
- logical H2/H3 hierarchy
- canonical URLs
- Open Graph metadata
- Twitter metadata
- structured data
- product schema where applicable
- breadcrumb schema where applicable
- clean URLs
- correct sitemap
- correct robots configuration

Review:

```text
src/app/layout.tsx
src/app/sitemap.ts
src/app/robots.ts
src/app/products/[slug]/
```

Do not put private/dashboard/admin URLs into public SEO output.

---

# 22. P2 — SEO DATA ACCURACY

Ensure the metadata describes the actual page.

Do not use the same generic description for every product.

Product metadata should derive from product data where appropriate.

Avoid:

- duplicate titles
- duplicate descriptions
- incorrect canonical URLs
- stale product values
- nonexistent OG images

Verify every important public route.

---

# 23. P2 — ACCESSIBILITY

Audit the entire component system.

Prioritize:

- `Button`
- `Input`
- `Textarea`
- `Select`
- `Checkbox`
- `Sheet`
- `Dialog/Modal`
- `Accordion`
- `Tabs`
- navigation
- product cards
- product gallery
- cart drawer
- forms

Ensure:

- keyboard accessibility
- visible focus states
- labels
- semantic HTML
- appropriate ARIA
- accessible names
- error associations
- meaningful alt text
- reduced-motion support

## Reduced motion

The existing animations should respect:

```css
@media (prefers-reduced-motion: reduce)
```

Add a reduced-motion mode so decorative animations do not create accessibility problems.

---

# 24. P2 — RESPONSIVE DESIGN

Test at minimum:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px
```

Pay particular attention to:

- navigation
- cart drawer
- product grids
- filters
- product gallery
- checkout
- dashboard
- admin tables
- charts
- forms
- long product names
- long email addresses
- long company names

Check for:

- horizontal scrolling
- clipped content
- buttons outside viewport
- fixed-width overflow
- broken grid layouts
- tiny touch targets

---

# 25. P2 — PERFORMANCE

Audit:

- image sizes
- lazy loading
- priority loading
- videos
- font loading
- JavaScript bundle size
- client components
- server components
- duplicate requests
- unnecessary re-renders
- expensive database queries
- large dependencies

Use:

```bash
npm run analyze
```

when useful.

Do not optimize blindly.

Optimize based on measurable or strongly evidenced bottlenecks.

---

# 26. P2 — VIDEO PERFORMANCE

The project contains multiple demo videos under:

```text
public/videos/
```

Review:

- file sizes
- codecs
- poster images
- preload behavior
- autoplay behavior
- mobile data usage
- lazy loading
- visibility-based playback
- accessible controls
- reduced-motion implications

Do not preload all videos aggressively on mobile.

---

# 27. P2 — IMAGE OPTIMIZATION

Audit all product/public imagery.

Use Next.js image optimization where appropriate.

Verify:

- correct width/height
- aspect ratio
- responsive sizing
- useful alt text
- lazy loading
- priority loading only for above-the-fold images
- modern formats when practical

Do not replace product imagery without preserving existing visual intent.

---

# 28. P2 — DATABASE / QUERY PERFORMANCE

Inspect Prisma queries for:

- N+1 patterns
- unnecessary includes
- large unbounded reads
- missing pagination
- repeated identical queries
- inefficient sorting
- unnecessary aggregation
- missing selective field selection

Review high-traffic areas:

- product catalog
- search
- dashboard
- orders
- admin product list
- quotes
- sitemap

Avoid over-fetching large records when only a subset is needed.

---

# 29. P2 — CART CONSISTENCY

Review:

```text
src/components/cart/CartContext.tsx
src/components/cart/CartDrawer.tsx
src/app/cart/actions.ts
```

Verify:

- cart count
- quantities
- variant identity
- duplicate item merging
- stale cart handling
- product deletion
- price changes
- unauthorized cart access
- optimistic UI rollback
- server/client synchronization

Do not trust client cart totals.

---

# 30. P2 — CHECKOUT HARDENING

Review:

```text
src/app/checkout/page.tsx
src/app/checkout/CheckoutForm.tsx
src/app/api/checkout/
```

Verify:

- authenticated/authorized user behavior
- server-side totals
- server-side pricing
- quantity validation
- quote/order ownership
- payment provider configuration
- failed-payment handling
- retry behavior
- duplicate submission handling
- loading states
- success state
- error state

Prevent double submission.

Disable payment buttons while an active payment request is in progress.

---

# 31. P2 — UI/UX CONSISTENCY

Preserve the current premium Sterling aesthetic.

Do not redesign just for the sake of redesigning.

Improve:

- spacing consistency
- typography hierarchy
- CTA clarity
- button consistency
- card consistency
- product information hierarchy
- empty states
- loading states
- error states
- form feedback

Create or reuse shared primitives instead of fixing the same issue independently in many pages.

---

# 32. P2 — FORMS

Audit all forms:

- login
- registration
- password reset
- contact
- quote request
- checkout
- product creation
- product editing
- bulk import
- company settings

Every form should have:

- accessible labels
- validation
- clear errors
- success feedback
- loading state
- disabled state during submission
- keyboard accessibility
- server-side validation

---

# 33. P2 — ADMIN EXPERIENCE

Inspect:

```text
src/app/(admin)/
src/components/admin/
```

Review:

- pagination
- search
- filters
- bulk operations
- error handling
- loading states
- destructive-action confirmation
- permission enforcement
- table overflow
- mobile behavior

Admin UI must not become a security boundary.

The server must remain authoritative.

---

# 34. P2 — DEAD CODE / DUPLICATES

Find and safely remove:

- unused imports
- unused files
- obsolete components
- duplicate helpers
- duplicate data
- dead styles
- dead routes
- deprecated code

Do not remove something simply because it appears unused without checking imports/dynamic references.

Generated Prisma files should be treated separately from hand-written source.

---

# 35. P2 — DOCUMENTATION ACCURACY

Existing documentation makes security/architecture claims.

Compare documentation against actual code.

Especially audit:

```text
docs/SECURITY.md
docs/DEPLOYMENT.md
docs/ARCHITECTURE.md
docs/API.md
docs/TESTING.md
```

Do not leave documentation claiming a control exists when implementation does not match.

Either:

- implement the control, or
- correct the documentation.

Do not weaken documentation to hide an implementation gap.

---

# 36. TESTING EXPANSION

Strengthen automated coverage around the highest-risk workflows.

## Mandatory test areas

### Authentication

- register
- login
- logout
- reset password
- invalid credentials
- protected route access

### Authorization

- customer access
- admin access
- super admin access
- cross-company access
- unauthorized API calls

### Products

- list
- search
- filtering
- sorting
- product detail
- variants
- customization

### Cart

- add
- update
- remove
- variant differentiation
- quantity validation

### Quotes

- create
- calculate
- submit
- invalid input
- ownership

### Orders

- conversion
- payment
- duplicate webhook
- invalid webhook
- amount mismatch

### Admin

- role changes
- product management
- bulk import
- orders
- quotes

---

# 37. REGRESSION TEST MATRIX

After implementation, verify:

| Area | Required |
|---|---|
| TypeScript | PASS |
| Build | PASS |
| ESLint | PASS |
| Unit tests | PASS |
| E2E tests | PASS where environment permits |
| Prisma generate | PASS |
| Payment webhook tests | PASS |
| Auth tests | PASS |
| Authorization tests | PASS |
| Product catalog | PASS |
| Cart | PASS |
| Checkout | PASS |
| Quote workflow | PASS |
| Admin workflow | PASS |
| Mobile layout | PASS |
| Accessibility smoke tests | PASS |

---

# 38. REQUIRED DATABASE SAFETY

Before schema/migration changes:

1. Review current schema.
2. Review existing migrations.
3. Determine whether production data compatibility matters.
4. Never destroy production data merely to make development easier.
5. Prefer additive migrations.
6. Document breaking changes.
7. Test migrations on a disposable/staging database first.

---

# 39. REQUIRED PAYMENT SAFETY

Before modifying payment code:

- never log secrets
- never log raw card data
- never trust client totals
- never bypass webhook signature verification
- never remove idempotency
- never skip order ownership checks
- never silently ignore payment failures
- never mark an order paid solely because a client says payment succeeded

---

# 40. REQUIRED SECURITY SAFETY

Do not perform destructive security testing.

Safe validation includes:

- static code inspection
- malformed-input testing
- unauthorized-request testing
- authorization boundary tests
- duplicate-event tests
- validation tests
- rate-limit tests
- dependency audit

Do not:

- attack production systems
- brute-force credentials
- execute destructive payloads
- expose secrets

---

# 41. IMPLEMENTATION CHECKPOINTS

After each major phase, create a local checkpoint/commit or equivalent versioned milestone.

Recommended milestones:

```text
checkpoint-01-security
checkpoint-02-rate-limit
checkpoint-03-payment
checkpoint-04-validation
checkpoint-05-type-safety
checkpoint-06-seo-accessibility
checkpoint-07-performance
checkpoint-08-ui-ux
checkpoint-09-final-verification
```

Do not squash away useful debugging history until the project is stable.

---

# 42. DEFINITION OF DONE

A change is NOT done merely because the code compiles.

A task is complete only when:

1. Code is implemented.
2. TypeScript passes.
3. Relevant tests pass.
4. Existing functionality remains intact.
5. Error paths were considered.
6. Security implications were reviewed.
7. Mobile/responsive behavior was considered where applicable.
8. Documentation is updated where behavior changed.
9. No unnecessary `any`/ignore directives were introduced.
10. No secrets were exposed.

---

# 43. FINAL VALIDATION

Run all appropriate commands again:

```bash
npx prisma generate
npx tsc --noEmit
npm run build
npm audit
npx vitest run
npx playwright test
```

Also run:

```bash
npm run analyze
```

when bundle/performance verification is relevant.

If ESLint is configured:

```bash
npx eslint .
```

Do not report a check as passed unless it actually passed.

---

# 44. FINAL USER-FACING VERIFICATION REPORT

After implementation, create:

```text
ANTIGRAVITY_IMPLEMENTATION_REPORT.md
```

Include:

## Summary

- What was changed
- What was not changed
- Major architectural decisions

## Completed Tasks

For every task:

- Task ID
- Status
- Files changed
- What changed
- Why
- Tests run
- Test result

## Remaining Issues

For every remaining issue:

- Severity
- Why it remains
- What is needed
- Whether it is blocked by environment/infrastructure

## Security

- secret handling
- rate limiting
- authentication
- authorization
- CSP
- webhooks
- dependency audit

## Performance

- major optimizations
- assets
- bundle findings
- database/query changes

## SEO

- metadata
- sitemap
- robots
- structured data
- canonical strategy

## Accessibility

- keyboard
- labels
- focus
- semantic structure
- reduced motion

## Testing

Show actual command results.

## Final Status

Use one of:

```text
READY FOR STAGING
```

or:

```text
NOT READY — BLOCKED BY:
```

Do not claim production readiness unless the evidence supports it.

---

# 45. FINAL HARD RULES

### Rule 1
Do not fake test results.

### Rule 2
Do not invent bugs that were not observed.

### Rule 3
Do not remove existing working features to simplify the code.

### Rule 4
Do not redesign the entire UI without evidence that redesign is necessary.

### Rule 5
Do not expose secrets in logs, reports, screenshots, commits, or generated files.

### Rule 6
Do not modify generated Prisma client files manually.

### Rule 7
Do not bypass server-side authorization.

### Rule 8
Do not trust client-side prices, totals, roles, or permissions.

### Rule 9
Do not replace secure payment/webhook checks with shortcuts.

### Rule 10
Do not mark an issue fixed until the relevant verification passes.

### Rule 11
Prefer small, well-tested changes over one giant rewrite.

### Rule 12
When uncertain, inspect the surrounding code and call sites before changing behavior.

---

# 46. IMMEDIATE ACTION LIST

## P0

- [ ] Remove `.env` from project artifacts.
- [ ] Determine whether any credentials in `.env` were ever exposed/committed.
- [ ] Rotate exposed credentials if applicable.
- [ ] Establish secure environment management.
- [ ] Replace production in-memory rate limiting with distributed rate limiting.
- [ ] Define endpoint-specific rate-limit policies.
- [ ] Verify critical auth/payment/admin rate-limit behavior.

## P1

- [ ] Run `npx prisma generate`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Run production build.
- [ ] Restore meaningful lint enforcement.
- [ ] Add/verify CSP.
- [ ] Harden webhook payload validation.
- [ ] Verify payment idempotency.
- [ ] Verify server-side pricing and amount checks.
- [ ] Strengthen Zod validation.
- [ ] Audit authorization and company isolation.
- [ ] Reduce `any` in security/payment/API logic.

## P2

- [ ] Audit public-page SEO.
- [ ] Audit accessibility.
- [ ] Add reduced-motion support.
- [ ] Audit responsive layouts.
- [ ] Optimize product/media loading.
- [ ] Audit database query efficiency.
- [ ] Improve cart/checkout resilience.
- [ ] Improve form UX.
- [ ] Improve admin UX.
- [ ] Remove confirmed dead code.
- [ ] Synchronize docs with actual implementation.

---

# 47. FINAL SUCCESS CRITERIA

The implementation should end with:

```text
Prisma generate: PASS
TypeScript: PASS
Build: PASS
ESLint: PASS
Unit tests: PASS
E2E tests: PASS (or clearly documented environment limitation)
Security audit: reviewed
Dependency audit: reviewed
Payment flows: verified
Authentication: verified
Authorization: verified
Rate limiting: verified
SEO: reviewed
Accessibility: reviewed
Responsive layouts: reviewed
Performance: reviewed
Secrets hygiene: verified
Documentation: synchronized
```

The final result should be a stronger production candidate, not merely a project that "builds."

## Most important objective

**Make the website safer, more reliable, faster, more maintainable, more accessible, and more production-ready while preserving Sterling's existing business functionality and premium user experience.**
