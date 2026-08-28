# Sterling — Latest Bug Audit, Remediation Plan & Antigravity Instructions

## 1. Purpose

This document is the authoritative remediation brief for the latest Sterling codebase review.

Sterling is a B2B corporate gifting platform using Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL/Supabase, authentication, quotations, orders, invoices, and Razorpay/Stripe-related payment infrastructure.

The latest revision fixed a number of previously reported problems, especially around Prisma 7 configuration, basic catalog testing, server-side quote pricing in the newer quote path, and authentication of the admin role endpoint.

However, the project is **not yet production-ready**.

The remaining problems are concentrated in financial integrity, authorization, payment idempotency, reviews, checkout behavior, and consistency between the documented architecture and actual implementation.

---

# 2. Current Status

## Confirmed/improved

- Prisma 7 configuration was addressed.
- A `prisma.config.ts` configuration exists in the latest revision.
- The newer quote path performs trusted server-side price calculation.
- The admin role endpoint no longer uses the Supabase service-role key itself as a bearer credential.
- Role-change auditing/rate limiting has been improved.
- Product catalog adversarial tests are substantially better.
- Catalog filtering/sorting/pricing tests passed in the supplied audit results.

## Still unresolved

- A legacy quote action still trusts client-provided financial values.
- Review validation and purchase verification are insufficient.
- Quote-to-order conversion is not fully idempotent.
- Payment webhooks need replay/idempotency protection.
- Payment data needs stronger amount/order/currency verification.
- Number generation uses race-prone `count() + 1` patterns.
- Company permissions do not fully enforce company roles.
- Authorization still has more than one potential role source.
- OAuth redirect validation needs hardening.
- In-memory rate limiting is not reliable in distributed/serverless production.
- Checkout UI/server totals can diverge.
- PO/bank-transfer behavior does not fully match the UI promise.
- Some infrastructure/media/configuration items still need production verification.
- The existing test evidence does not cover the whole security-sensitive backend.

---

# 3. Critical Bugs To Fix

## P0-1 — Legacy quote action trusts client-supplied pricing

### File

`src/app/products/actions.ts`

### Function

`submitQuoteRequest()`

### Problem

The action accepts values such as:

- `quoteCalculation.tierUnitPrice`
- `quoteCalculation.estimatedTotal`

from the client and persists them.

A browser request can be modified before reaching the server.

### Risk

A malicious customer can submit a quote using a manipulated price.

Example:

- Real server price: INR 500 per unit
- Client submits: INR 1 per unit
- Quantity: 1000
- Manipulated total: INR 1000

### Required fix

Do not trust any client-side financial calculation.

Refactor or remove the legacy path so that the server calculates all authoritative financial values from:

- product
- variant
- quantity
- customization
- discount rules
- tax rules
- shipping rules

Use one shared trusted pricing function.

Example:

```ts
const pricing = await calculateServerProductTotal(
  productId,
  quantity,
  customizationIds,
  variantId
);
```

Persist only the server result.

### Acceptance criteria

- Changing browser-supplied unit price has no effect.
- Changing browser-supplied estimated total has no effect.
- Quote total always equals the server calculation.
- Unit tests prove tampered financial fields are ignored.

---

# P0-2 — Reviews can be fabricated or improperly verified

### File

`src/app/products/actions.ts`

### Function

`submitReview()`

### Problems

The current implementation:

- does not sufficiently enforce rating range
- automatically marks reviews as verified
- does not sufficiently prove product purchase
- does not prevent duplicate reviews for the same product/user

### Required fix

Validate:

```ts
rating >= 1 && rating <= 5
```

Verify that the authenticated user has a qualifying completed/delivered order containing the product.

Set:

```ts
isVerified = true
```

only when that server-side purchase check succeeds.

Prevent duplicate reviews.

Recommended Prisma constraint:

```prisma
@@unique([productId, userId])
```

### Acceptance criteria

- Rating 0 fails.
- Rating 6 fails.
- Negative/decimal/invalid values fail as appropriate.
- A user who has never purchased the product cannot create a verified review.
- The same user cannot create multiple reviews for the same product.
- Review average cannot be corrupted through malformed ratings.

---

# P0-3 — Quote-to-order conversion is not fully idempotent

### File

`src/app/actions/orders.ts`

### Problem

An approved quote can potentially be submitted more than once and produce multiple orders.

Current schema behavior permits a non-unique `quoteId`.

### Required fix

If business rules are one order per quote, enforce it at the database level:

```prisma
quoteId String? @unique
```

Then make conversion transactional.

Conceptual flow:

```text
Approved Quote
   |
   +-- existing order? --> return existing order / safe conflict
   |
   +-- none
        |
        +-- validate ownership
        +-- validate status
        +-- calculate/verify totals
        +-- create order
        +-- create items
        +-- mark quote converted
```

The operation must remain safe when the same request is submitted repeatedly.

### Acceptance criteria

- Replaying the same request cannot create a second order.
- Concurrent submissions cannot create two orders.
- Database uniqueness backs up application checks.

---

# P0-4 — Payment webhooks need idempotency

## Razorpay

### File

`src/app/api/webhooks/razorpay/route.ts`

### Problem

A duplicate gateway event can create duplicate payment records or repeat state transitions.

### Stripe

### File

`src/app/api/webhooks/stripe/route.ts`

The latest revision improved secret handling, but durable event replay protection is still required.

### Required fix

Add uniqueness around provider payment IDs where appropriate.

Example:

```prisma
providerPaymentId String? @unique
```

Preferably add durable event tracking:

```prisma
model PaymentWebhookEvent {
  id          String   @id @default(uuid())
  provider    String
  eventId     String
  receivedAt  DateTime @default(now())

  @@unique([provider, eventId])
}
```

Processing flow:

```text
Webhook received
    |
    +-- verify signature
    |
    +-- validate event/provider
    |
    +-- check event already processed
    |       |
    |       +-- yes -> return safe 2xx
    |
    +-- validate payment/order/amount/currency
    |
    +-- update order/payment in transaction
    |
    +-- record processed event
```

### Acceptance criteria

- Replaying the same webhook does not duplicate payment records.
- Replaying the same webhook does not produce repeated order state transitions.
- Concurrent duplicate deliveries are safe.
- Signature verification fails closed.
- Missing webhook secrets fail closed.

---

# P0-5 — Payment webhook must verify business facts, not only signature

A valid signature proves that the request came from the provider. It does not by itself prove that the payment belongs to the expected Sterling order for the expected amount.

For every payment callback, verify server-side:

- provider order ID
- Sterling order ID
- payment ID
- amount
- currency
- expected payment state
- expected order state

For Razorpay in particular, do not blindly trust an order ID read from free-form notes without cross-checking it against the database record and provider-side order relationship.

### Acceptance criteria

A validly signed webhook with:

- wrong amount
- wrong currency
- wrong order ID
- already-paid order
- already-cancelled order

must not silently create an inconsistent financial record.

---

# P0-6 — Never use payment secrets as fake build defaults

All payment credentials must fail closed.

Do not use placeholders such as:

```text
whsec_dummy
sk_test_dummy_key_for_build
```

for runtime secret behavior.

Use explicit required-environment-variable checks.

Build-only mocking, where absolutely necessary for tests, must be isolated to test configuration and must never silently affect production execution.

### Acceptance criteria

- Missing production payment secrets cause safe failure.
- No dummy secret is accepted by runtime webhook/auth logic.
- CI can still build through an explicit test/mock configuration when needed.

---

# P1-1 — Replace `count() + 1` numbering

Affected areas include order, quote, and invoice number generation.

Unsafe pattern:

```ts
const count = await prisma.order.count();
const orderNumber = `ORD-${year}-${count + 1}`;
```

Two concurrent requests can generate the same number.

### Required fix

Use one of:

- PostgreSQL sequences
- database counter table
- transaction-safe numbering
- collision-safe unique identifier with a separate human-readable display number

Do not depend on row count for identifiers.

### Acceptance criteria

Concurrent tests cannot produce duplicate public order/quote/invoice numbers.

---

# P1-2 — Invoice generation must be idempotent

### File

`src/app/actions/invoices.ts`

### Problem

An order can potentially receive multiple invoices due to repeated execution.

### Required fix

If Sterling uses one invoice per order, enforce:

```prisma
orderId String @unique
```

and check for an existing invoice before creating a new one.

Make invoice generation safe under retries and concurrent calls.

---

# P1-3 — Establish one canonical authorization source

The codebase still has potential role drift because some areas refer to Supabase JWT/app metadata while others use Prisma user data.

Do not maintain two independent authorities for sensitive business authorization.

### Recommended architecture

Use:

```text
Prisma User.role
```

as the canonical application authorization source.

Use JWT/app metadata only as a performance convenience where appropriate, not as an independent source that can contradict the database.

### Required fix

Review all:

- Server Actions
- Route Handlers
- dashboard loaders
- admin pages
- company operations
- order operations
- invoice operations
- role changes

and document exactly where authorization is enforced.

### Acceptance criteria

A user's authorization result is deterministic regardless of stale JWT metadata.

---

# P1-4 — Company membership is not the same as company administration

### Area

Company dashboard/profile editing

### Problem

Membership checks are present, but company role checks are not sufficiently enforced for all administrative operations.

### Required fix

Enforce role-specific permissions.

Recommended baseline:

```text
COMPANY_ADMIN
  - edit company profile
  - manage members
  - company settings

PROCUREMENT
  - procurement/order-related operations

HR
  - HR-related gifting operations where applicable

MARKETING
  - marketing-related content/requests where applicable

MEMBER
  - normal member capabilities / read-only where appropriate
```

Do not let any member automatically become a company administrator.

### Acceptance criteria

Every privileged company mutation has an explicit role check.

---

# P1-5 — OAuth `next` redirect must be allowlisted

### File

`src/app/auth/callback/route.ts`

### Problem

The callback accepts a user-controlled `next` parameter.

### Required fix

Only permit safe internal paths.

At minimum:

- must begin with `/`
- must not begin with `//`
- must not contain an external scheme
- reject malformed values

Safer pattern:

```ts
const rawNext = requestUrl.searchParams.get("next");

const next =
  rawNext &&
  rawNext.startsWith("/") &&
  !rawNext.startsWith("//")
    ? rawNext
    : "/dashboard";
```

### Acceptance criteria

External URLs cannot be used as post-login redirects.

Test:

```text
https://attacker.example
//attacker.example
javascript:...
```

and confirm they resolve to the safe fallback.

---

# P1-6 — Checkout should be idempotent

Current checkout flow can create a database order before payment initialization completes.

If payment initialization fails or the user retries, Sterling may accumulate orphaned/unpaid duplicate orders.

### Required fix

Design an explicit payment/order state machine.

Example:

```text
DRAFT
  -> PENDING_PAYMENT
  -> PAYMENT_INITIALIZED
  -> PAID

Failure paths:
  -> PAYMENT_FAILED
  -> CANCELLED
```

Repeated checkout submissions for the same cart/quote should reuse or safely reconcile the pending order when appropriate.

### Acceptance criteria

- Payment API failure does not cause uncontrolled duplicate orders.
- Retry is safe.
- Paid orders cannot be accidentally recreated.
- Payment state transitions are deterministic.

---

# P1-7 — Checkout UI totals must exactly match the server totals

The UI currently presents a subtotal/tax explanation while the backend calculates its own order total.

The customer-facing total must be derived from the same server-authoritative calculation.

### Required fix

Server should return or expose:

```text
Subtotal
Discount
GST
Shipping
Grand Total
```

The UI should display those exact values.

Never make the browser independently authoritative for the final payable amount.

### Acceptance criteria

The amount displayed before payment equals the amount used to create the provider payment order.

---

# P1-8 — PO / Bank Transfer flow must match the actual backend

The UI indicates a corporate PO/bank-transfer workflow with invoice and terms handling.

The backend must actually support the business state being advertised.

At minimum define:

```text
PAYMENT_METHOD
ONLINE
BANK_TRANSFER
PURCHASE_ORDER
```

and persist the required data such as:

- PO number
- payment terms
- bank-transfer pending state
- invoice state

If a feature is not yet implemented, remove misleading UI text until it is.

---

# P1-9 — Server validation for cart quantity, inventory, MOQ, and variants

Server actions must not trust browser validation.

For every cart/order/quote mutation validate:

- integer quantity
- positive quantity
- maximum allowed quantity
- minimum order quantity
- available inventory, if inventory is enforced
- product active status
- variant belongs to product
- variant is purchasable
- price source is server-authoritative

Do not rely only on React/UI constraints.

---

# P1-10 — Variant pricing must be part of secure server pricing

If variants can affect price, the trusted pricing service must receive and validate `variantId`.

Conceptual:

```text
Product
 + Variant
 + Quantity
 + Customization
       |
       v
Server Pricing Engine
       |
       v
Authoritative Total
```

Do not calculate the displayed variant price only in the browser and then use the base product price on the server.

---

# P1-11 — Review average updates must be concurrency-safe

Current logic can follow:

```text
create review
read all reviews
calculate average
update product
```

Concurrent reviews can overwrite each other.

### Required fix

Either:

- calculate aggregate from the database safely
- use transaction/locking
- or use a robust atomic aggregation strategy

### Acceptance criteria

Concurrent review submission cannot produce incorrect final average/count.

---

# P2-1 — Distributed rate limiting

Current in-memory `Map`-style rate limiting is not reliable across multiple serverless instances.

### Required fix

Use shared infrastructure such as:

- Upstash Redis
- another shared Redis-compatible store
- another durable distributed limiter

### Acceptance criteria

Rate limits remain effective when requests hit different instances.

---

# P2-2 — Supabase Storage / Next Image configuration

Verify the real production media host.

If product media is served from Supabase Storage, configure the actual Supabase hostname in `next.config.mjs` using appropriate `remotePatterns`.

### Acceptance criteria

Production product images load through `next/image` without hostname errors.

---

# P2-3 — Remove architecture/documentation drift

The documentation describes services and routes that do not fully correspond to the actual source tree.

Review:

- `docs/ARCHITECTURE.md`
- `docs/API.md`
- `docs/SECURITY.md`
- `docs/TESTING.md`
- `docs/DEPLOYMENT.md`

Update documentation so it describes what actually exists.

Do not claim a feature, test suite, service layer, or RLS protection model that is not actually implemented.

---

# P2-4 — Backend test coverage is required

The current successful catalog tests are useful, but not sufficient.

Add tests for:

## Authorization

- IDOR attempts
- cross-company data access
- admin-only routes
- company role enforcement
- stale role metadata
- unauthenticated mutations

## Quotes

- price tampering
- quantity tampering
- variant tampering
- duplicate quote submission
- ownership bypass
- concurrent conversion

## Orders

- duplicate creation
- quote reuse
- incorrect total
- wrong company
- wrong user
- concurrent requests

## Payments

- valid webhook
- invalid signature
- missing secret
- wrong amount
- wrong currency
- wrong order
- duplicate event
- concurrent duplicate event

## Reviews

- invalid rating
- fake purchase
- duplicate review
- unauthorized product review

## OAuth

- external `next`
- protocol-relative `next`
- malformed redirect

---

# 4. Required Antigravity Agent Instructions

## Role

Act as a senior Next.js + TypeScript + Prisma + Supabase security engineer.

You are modifying the Sterling production codebase.

Do not treat this report as a suggestion list. Treat it as the remediation specification.

---

## Mandatory operating rules

### Rule 1 — Inspect before changing

Before editing any file:

1. Search all call sites.
2. Find the corresponding Prisma models.
3. Trace the data from browser -> Server Action/API -> database.
4. Identify whether the existing function is still used.
5. Check middleware/auth guards.
6. Check related tests.

Do not patch one file in isolation when the same behavior exists elsewhere.

---

### Rule 2 — Server is authoritative for security and money

Never trust the browser for:

- price
- tax
- shipping
- discount
- stock
- MOQ
- variant validity
- company ownership
- role
- payment state
- verified-review status

The browser can display calculations, but the server/database decides the truth.

---

### Rule 3 — Prefer one source of truth

Do not create a second authorization or pricing implementation.

Reuse a central server-side function where possible.

For example:

```text
Server Pricing Service
Server Authorization Service
Server Order State Transition Logic
```

---

### Rule 4 — Database constraints are part of security

Where business rules require uniqueness, enforce uniqueness in Prisma/PostgreSQL.

Application checks alone are not sufficient against concurrent requests.

---

### Rule 5 — Make mutations retry-safe

Any external integration or user action can be retried.

Design mutation endpoints/actions to be idempotent where appropriate.

Especially:

- payment webhooks
- quote conversion
- order creation
- invoice creation
- role changes

---

### Rule 6 — Do not weaken production security for build convenience

Never introduce:

```text
dummy secret
fallback secret
development admin bypass
service-role bearer endpoint
```

just to make a build pass.

If a mock is required, isolate it to a clearly test-only environment.

---

### Rule 7 — Do not expose secrets

Never print, commit, return, or embed:

- Supabase service-role key
- Razorpay secret
- Stripe secret
- webhook secret
- JWT secret
- database password

Never place secret values into client components.

---

### Rule 8 — Preserve working UI unless a change is required

Do not redesign the site unnecessarily.

Focus on:

- security
- data integrity
- backend correctness
- tests
- deployment correctness

Only change UI when the UI currently promises behavior the backend does not actually implement.

---

### Rule 9 — Keep backwards compatibility in mind

Before deleting legacy actions/functions:

1. Find every import and invocation.
2. Find route references.
3. Find form actions.
4. Search tests.
5. Search documentation.

Remove dead code only after proving it is not needed.

---

# 5. Antigravity Implementation Sequence

Execute in this order.

## Phase A — Financial integrity

1. Find every quote creation path.
2. Remove client-price authority from all paths.
3. Centralize server pricing.
4. Add secure variant pricing.
5. Validate quantity/MOQ/inventory server-side.
6. Make quote conversion atomic/idempotent.
7. Add database uniqueness for quote/order relationships.
8. Replace count-based identifiers.
9. Make invoice creation idempotent.
10. Make checkout/order creation retry-safe.

## Phase B — Payment security

11. Harden Razorpay webhook.
12. Harden Stripe webhook.
13. Add webhook event idempotency.
14. Add provider payment uniqueness.
15. Validate amount.
16. Validate currency.
17. Validate provider order relationship.
18. Validate Sterling order state.
19. Remove all fake/default payment secrets.
20. Add replay/concurrency tests.

## Phase C — Authorization

21. Identify all role checks.
22. Choose canonical role source.
23. Remove conflicting role authority where safe.
24. Enforce company roles.
25. Test IDOR and cross-company access.
26. Verify admin actions cannot be reached by normal users.

## Phase D — Reviews

27. Validate ratings.
28. Validate purchase history.
29. Set verified state from server evidence.
30. Prevent duplicate reviews.
31. Make aggregate update concurrency-safe.

## Phase E — OAuth/security infrastructure

32. Validate OAuth redirect targets.
33. Replace local rate limiting with distributed rate limiting.
34. Verify secret handling.
35. Verify Supabase Storage media configuration.

## Phase F — Documentation/tests

36. Update architecture/security/API docs.
37. Add integration tests.
38. Add authorization tests.
39. Add webhook replay tests.
40. Add concurrent mutation tests.
41. Run typecheck.
42. Run lint.
43. Run production build.
44. Run unit tests.
45. Run integration tests.
46. Run Playwright E2E tests.

---

# 6. Required Verification Commands

After implementation, perform a clean verification.

Use the project's actual package manager.

Expected categories:

```bash
npm run typecheck
npm run lint
npm run build
npm test
```

Also run the appropriate Prisma validation/migration checks and Playwright tests.

If a command does not exist, do not silently skip it.

Report:

```text
COMMAND
STATUS
OUTPUT SUMMARY
```

Do not claim success from a test command that did not actually execute.

---

# 7. Required Security Test Cases

Antigravity must create or run tests equivalent to the following.

## Quote price tampering

```text
Client sends:
unitPrice = 1
estimatedTotal = 1

Expected:
Server ignores tampered values.
Persisted total equals trusted server price.
```

## Review fraud

```text
User who never bought product
attempts review.

Expected:
Request denied.
```

## Duplicate quote conversion

```text
Same approved quote submitted twice concurrently.

Expected:
Exactly one order.
```

## Webhook replay

```text
Same Razorpay/Stripe event delivered twice.

Expected:
Exactly one effective payment transition.
```

## Webhook mismatch

```text
Valid signature
but wrong amount.

Expected:
Reject/ignore safely.
```

## OAuth redirect

```text
next=https://attacker.example

Expected:
Redirect to safe internal fallback.
```

## Company privilege

```text
Company MEMBER
attempts company-admin mutation.

Expected:
Forbidden.
```

## IDOR

```text
User A requests User B's order/quote/invoice.

Expected:
Forbidden/not found.
```

---

# 8. Manual Actions Required From the Website Owner

Antigravity can modify code/configuration, but these items must be completed by the owner/deployment operator.

## Manual 1 — Add/verify production environment variables

In the actual deployment environment, verify the required variables exist.

Typical categories include:

```text
DATABASE_URL
DIRECT_URL (if used)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET

STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET

NEXTAUTH/JWT-related secrets if the project uses them
```

Use the exact variable names currently expected by the final codebase.

Do not paste production secret values into the Antigravity prompt or source files.

---

## Manual 2 — Configure Razorpay webhook

In the Razorpay dashboard:

1. Configure the production webhook endpoint.
2. Use the final deployed Sterling URL.
3. Set the webhook secret.
4. Enable the payment events required by the final implementation.
5. Test a real/sandbox payment event.
6. Confirm the webhook receives a 2xx response.
7. Confirm replayed events are ignored/idempotent.

---

## Manual 3 — Configure Stripe webhook if Stripe remains enabled

In Stripe:

1. Configure the deployed webhook endpoint.
2. Copy the signing secret into the deployment environment.
3. Ensure the selected event types match the implemented handler.
4. Perform a test event.
5. Replay the event and confirm no duplicate business effect.

If Sterling is not using Stripe, remove the unused Stripe production surface rather than leaving dead payment infrastructure active.

---

## Manual 4 — Supabase production configuration

In Supabase:

- verify Auth providers
- verify redirect URLs
- verify allowed site URLs
- verify production OAuth callback URLs
- verify RLS policies
- verify storage buckets
- verify storage access policies
- verify service-role key is never exposed to the browser

---

## Manual 5 — Create the real first admin account

Do not create a hidden admin URL or hardcoded admin password.

Use the proper authenticated flow:

```text
Normal authenticated account
        ↓
Trusted owner/admin process
        ↓
ADMIN role
```

Verify that the account can access the admin dashboard and that a normal customer cannot.

---

## Manual 6 — Database migration approval

Before production migration:

1. Back up the production database.
2. Review generated migration SQL.
3. Confirm destructive changes are acceptable.
4. Apply migration.
5. Run integrity checks.
6. Verify unique constraints exist.

Pay special attention to:

```text
Quote.quoteId / Order.quoteId relationship
Invoice.orderId uniqueness if applicable
Payment.providerPaymentId uniqueness
Review(productId, userId) uniqueness
Webhook event uniqueness
```

---

## Manual 7 — Payment testing

Perform at least one complete sandbox/test payment from:

```text
Product
→ Cart/Quote
→ Checkout
→ Payment gateway
→ Webhook
→ Paid order
→ Invoice
```

Also deliberately test:

```text
payment failure
user refresh
double click/pay retry
webhook replay
wrong callback order
```

---

## Manual 8 — Production media/storage

Upload at least one real product image to the intended production storage and verify:

- product page loads it
- `next/image` works
- mobile works
- admin upload works
- cached image works
- no unauthorized public exposure occurs

---

## Manual 9 — Custom domain and redirects

After deployment:

- verify HTTPS
- verify OAuth redirect URL
- verify Supabase redirect URL
- verify payment callback/webhook URL
- verify canonical site URL
- verify no HTTP-to-HTTP or wrong-domain redirect exists

---

# 9. What Antigravity Must NOT Ask the Owner To Do

Do not ask the owner to manually edit source code to apply security fixes that can be safely implemented by the agent.

The agent should implement:

- validation
- authorization
- idempotency
- transactions
- Prisma schema constraints
- test coverage
- safe redirects
- server pricing
- state transitions
- logging
- error handling
- documentation updates

The owner should supply/configure only external infrastructure and secrets that cannot safely be generated by source-code changes.

---

# 10. Definition of Done

Sterling must not be declared complete because catalog tests pass.

Declare the remediation complete only when all applicable checks pass:

```text
[ ] No client-supplied financial amount is trusted
[ ] All quote paths use server pricing
[ ] Variant pricing is validated server-side
[ ] Quantity/MOQ/inventory checks are server-side
[ ] Quote conversion is idempotent
[ ] Quote/order relation is protected by DB constraints
[ ] Order numbering is race-safe
[ ] Invoice creation is idempotent
[ ] Invoice numbering is race-safe
[ ] Payment webhooks verify signatures
[ ] Payment webhooks fail closed when secrets are missing
[ ] Payment webhooks are idempotent
[ ] Payment amount is verified
[ ] Payment currency is verified
[ ] Provider order/payment relationship is verified
[ ] Reviews validate rating range
[ ] Verified reviews require qualifying purchase
[ ] Duplicate reviews are prevented
[ ] Review aggregates are concurrency-safe
[ ] One canonical authorization source is documented
[ ] Company role permissions are enforced
[ ] IDOR tests pass
[ ] OAuth next redirect is allowlisted
[ ] Rate limiting is distributed if required by deployment
[ ] Checkout UI equals server-authoritative total
[ ] PO/bank-transfer flow matches actual backend behavior
[ ] Supabase Storage image configuration works
[ ] No production dummy secrets exist
[ ] Prisma schema/migrations are verified
[ ] Typecheck passes
[ ] Lint passes
[ ] Production build passes
[ ] Unit tests pass
[ ] Integration tests pass
[ ] Payment replay tests pass
[ ] Authorization tests pass
[ ] Playwright E2E tests pass
[ ] Documentation matches implementation
```

---

# 11. Final Status Classification

## Current status

**NOT PRODUCTION READY**

The latest codebase is materially better than the previous version, but the remaining issues affect financial correctness and authorization and therefore must be fixed before accepting real customer payments or relying on the platform for sensitive B2B operations.

## Most important remaining fixes

1. Remove the legacy client-trusted quote pricing path.
2. Make quote-to-order conversion idempotent.
3. Make payment webhooks idempotent and fully validate payment facts.
4. Prevent fake/duplicate verified reviews.
5. Replace race-prone number generation.
6. Enforce company roles and establish one authorization authority.
7. Make checkout retry-safe and totals identical between server and UI.
8. Add real backend security/integration tests.

---

# 12. Instruction to Antigravity

Use this file as the implementation specification.

Do not merely report the issues again.

**Inspect the repository, implement the fixes, add or update tests, run the verification commands, and produce a final remediation report listing every item as:**

```text
FIXED
PARTIALLY FIXED
NOT FIXED
BLOCKED — REQUIRES MANUAL OWNER ACTION
```

For every `PARTIALLY FIXED`, `NOT FIXED`, or `BLOCKED` item, include:

- exact file
- exact function/route/model
- reason
- remaining risk
- next action

Do not claim production readiness until the Definition of Done has been verified.
