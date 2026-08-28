# Sterling B2B Corporate Gifting Platform — Senior Engineering Audit

**Stack observed:** Next.js 14.2 (App Router), React 18, Supabase Auth (`@supabase/ssr`), Prisma 7 + `pg` (direct Postgres connection, no PgBouncer/adapter pooling config beyond `pg.Pool`), Tailwind, Zod, Resend, Stripe, Razorpay (installed, unused), shadcn/ui.

**Bottom line up front:** The codebase looks polished at the component level (good Tailwind design system, decent Zod validation where used, sensible Prisma schema), but **the three core subsystems — storefront catalog, quote/lead capture, and admin authorization — are not actually wired together.** There are three independent, mutually‑inconsistent product data sources, the two real backend flows for quotes are dead code, and the admin authorization check is based on a client‑forgeable field. None of this shows up from a quick glance at any one file — it only appears once you trace data end‑to‑end, which is what this audit does.

---

## Architecture map (what actually talks to what)

| Layer | Data source | Files |
|---|---|---|
| Public catalog grid `/corporate-gifts` | **Hardcoded 6-item mock array inside the page component** (`p1`…`p6`, generic icons, ₹ prices) | `src/app/corporate-gifts/page.tsx` |
| Product detail `/products/[slug]` | **Hardcoded `PRODUCTS` constant** (10 rich products, $ prices, Unsplash images) | `src/lib/constants/products.ts`, `src/lib/utils/pricing.ts` |
| Admin catalog `/admin/products*` | **Prisma → Postgres `Product` table** | `src/app/(admin)/admin/products/**` |
| Sitemap | **Prisma `Product` table** | `src/app/sitemap.ts` |
| Customer dashboard (orders/quotes) | **Prisma tables**, correctly scoped by `userId` | `src/app/(dashboard)/dashboard/**` |
| Auth session | **Supabase Auth** (`auth.users`, cookies) | `src/lib/supabase/*`, `src/middleware.ts` |
| App user profile | **Prisma `User` table** (separate id space from Supabase `auth.users`) | `prisma/schema.prisma` |

**These do not sync.** A product created in `/admin/products/new` never appears on `/corporate-gifts` or `/products/[slug]`. A user who registers via `/register` or Google OAuth never gets a row in the Prisma `User` table. This single fact explains most of the P0 findings below.

---

## P0 — Critical: broken core flows & security holes (fix before anything else)

### 1. The main catalog page links 404 on every product
**File:** `src/app/corporate-gifts/page.tsx`

The page defines its own inline mock list (`id: "p1"` … `"p6"`) and links to `` /products/${product.id} ``, i.e. `/products/p1`. But `/products/[slug]/page.tsx` resolves against `getProductBySlug()` in `src/lib/utils/pricing.ts`, which searches the **different** `PRODUCTS` array in `src/lib/constants/products.ts`, none of whose slugs/ids are `p1`–`p6`. **Every product card on the primary browse page 404s when clicked.** This is the single most important functional bug in the app — it breaks the entire "browse → view → get quote" funnel that the whole site exists to drive.

**Fix:** Delete the inline mock array in `corporate-gifts/page.tsx`; render from the same `PRODUCTS`/`queryProducts()` pipeline already built in `src/lib/utils/pricing.ts` (or, better, from Prisma — see #4). Wire `ProductFilterSidebar`/`ProductFilters` (currently dead code, see P3) into this page instead of leaving it a static grid.

### 2. The quote-request funnel does not persist anything, anywhere
**Files:** `src/app/actions/forms.ts`, `src/components/products/QuoteRequestModal.tsx`, `src/app/contact/page.tsx`, `src/app/request-a-quote/page.tsx`

There are **three** places a visitor submits a quote/contact request, and all three are non-functional stubs, while a fully correct, Prisma-backed implementation sits unused:

- `submitContactForm` and `submitQuoteForm` (`src/app/actions/forms.ts`) — wired to `contact/page.tsx` and `request-a-quote/page.tsx` respectively — do nothing but `console.log` the payload and `await new Promise(setTimeout(...))` before returning a fake success message. No DB write, no email.
- `QuoteRequestModal.tsx` (the per-product "Request Corporate Quote" modal, the highest-intent CTA on the whole site) has `handleSubmitQuote` generate a **client-side `Math.random()` reference number** and flip to a "success" screen. It never calls a server action or `fetch` at all.
- Meanwhile `src/app/actions/quotes.ts` (`createQuote`) is a correct, Zod-validated, Prisma-backed implementation — and `src/lib/email/sender.ts` (`sendQuoteReceivedEmail`, using Resend + a React Email template) is a correct transactional email sender — but **neither is imported or called anywhere in the codebase.** `grep` confirms zero call sites outside their own definitions.

**Impact:** `/admin/quotes` will always show "No quotes found" in production; the B2B sales pipeline this app is built around cannot generate a single real lead.

**Fix:** Point all three entry points at `createQuote`, attach the current Supabase session's user id when present, call `sendQuoteReceivedEmail` (and a matching internal-notification email) inside `createQuote` after the Prisma write, and delete `submitContactForm`/`submitQuoteForm`/the fake modal handler.

### 3. Admin authorization relies on a client-editable field
**Files:** `src/middleware.ts` (line ~73), `src/app/(auth)/actions.ts` (line ~22), `src/components/layout/Navbar.tsx` (line ~59)

All three admin/role checks read `user.user_metadata?.role`. In Supabase Auth, `user_metadata` is **explicitly designed to be end-user-writable** — any authenticated user can call `supabase.auth.updateUser({ data: { role: 'ADMIN' } })` from the browser client and their JWT's `user_metadata.role` will become `ADMIN`. The only Supabase field that is safe for authorization is `app_metadata`, which can only be set with the service-role key from trusted server code (e.g., a webhook/trigger on user creation, or an admin-only server action).

**Fix, concretely:**
- Add a Postgres trigger or a server-only `POST /api/admin/set-role` route (using the Supabase **service role** key, never exposed to the client) that writes `app_metadata.role`, driven off the Prisma `User.role` column (the actual source of truth).
- Change `src/middleware.ts`, `src/app/(auth)/actions.ts`, and `Navbar.tsx` to read `user.app_metadata?.role` instead of `user_metadata`.
- Treat this as a live vulnerability, not a hardening nice-to-have: as shipped, any customer can self-promote to admin and reach every page under `/admin`.

### 4. Zero authorization checks inside Server Actions and admin pages themselves
**Files:** `src/app/(admin)/admin/products/actions.ts` (`createProduct`, `seedCategoriesIfEmpty`), `src/app/actions/quotes.ts` (`updateQuoteStatus`), `src/app/actions/invoices.ts` (`generateInvoiceForOrder`), `src/app/(admin)/layout.tsx`, every file under `src/app/(admin)/admin/*/page.tsx`

Authorization is enforced **only** in `middleware.ts`. None of the admin Server Actions re-check `auth.getUser()` + role before touching Prisma, and `(admin)/layout.tsx` renders `<AdminSidebar/>` and `children` with no guard of its own. This is a defense-in-depth failure on top of #3: once the single middleware check is bypassed (or if a future refactor changes the middleware matcher, or a Server Action is invoked directly), there is nothing else stopping a `CUSTOMER` session from creating products, changing any quote's status, or generating invoices.

**Fix:** Add a small `requireAdmin()` helper (`src/lib/auth/require-admin.ts`, new file) that calls `createClient()` → `getUser()` → checks `app_metadata.role`, throws/redirects otherwise — and call it at the top of every admin Server Action and every admin page/layout, not just once in middleware.

### 5. IDOR: `createOrderFromQuote` trusts a client-supplied `quoteId` with no ownership check
**File:** `src/app/actions/orders.ts`

`createOrderFromQuote(quoteId, shippingData)` loads `prisma.quoteRequest.findUnique({ where: { id: quoteId }})` and proceeds if `status === 'APPROVED'`, with no check that `quote.userId` matches the currently authenticated user. Any logged-in customer who learns (or guesses/enumerates) another customer's approved quote id can convert it into an order under their own checkout flow. Same class of issue in `generateInvoiceForOrder` (`src/app/actions/invoices.ts`) — no check that the caller owns or administers `orderId`.

**Fix:** Fetch the current user first; compare against `quote.userId`/`order.userId` (or company membership for B2B shared accounts) before proceeding; return a generic error otherwise.

### 6. Supabase Auth and the Prisma `User` table are never synchronized
**Files:** `src/app/(auth)/actions.ts` (`signup`), `src/app/auth/callback/route.ts`, `src/app/auth/confirm/page.tsx`, `prisma/schema.prisma` (`User` model)

`signup()` calls `supabase.auth.signUp({ email, password })` and nothing else — it discards `firstName`, `lastName`, and `companyName` from the form entirely (they're read from `formData` in `register/page.tsx` but never read by the server action). More importantly, **no code path anywhere creates a corresponding row in the Prisma `User` table** (the only place this happens is the demo seeder, `api/seed/route.ts` / `prisma/seed-demo.ts`, which upserts directly and never goes through Supabase Auth). The OAuth callback (`auth/callback/route.ts`) and the implicit-flow handler (`auth/confirm/page.tsx`) both stop at "session established," with no Prisma sync step.

**Impact:** every real signup produces a Supabase Auth identity with **no matching `public.User` row**. Any later Prisma write that requires a `User` foreign key — creating an order (`Order.userId`), a quote with `userId` set, a wishlist, an address tied to a user — will throw a foreign-key constraint violation. Dashboard pages that query `prisma.order.findMany({ where: { userId: user.id }})` won't crash (empty result), which is exactly why this bug is invisible in a demo walkthrough seeded via `/api/seed` — but it means **no real registered user's data can ever actually be written**.

**Fix:** In `signup()`, after a successful `auth.signUp`, create the Prisma `User` (and `Company`/`CompanyMember` if `companyName` was supplied) in the same action, using the returned `data.user.id` as the Prisma `User.id` so the two systems share a primary key. Do the equivalent in `auth/callback/route.ts` for OAuth (check-and-create-if-missing, since OAuth users don't pass through `signup()`). Consider a Postgres trigger on `auth.users` insert as a more robust alternative to duplicating this logic in two Next.js code paths.

### 7. `GET /api/seed` is a public, unauthenticated database-mutation endpoint
**File:** `src/app/api/seed/route.ts`

Protected only by `?secret=seed_demo` — a hardcoded literal string checked into source control (and thus into any deployed build/inspectable bundle or public repo). There's no `NODE_ENV` guard, so this route ships to production and lets **anyone who has read this file once** repeatedly upsert demo companies/users/products/orders/quotes into the live database.

**Fix:** Delete this route entirely from anything resembling production (move the logic into a one-off script run via `npx tsx prisma/seed-demo.ts` locally / in CI, which is what `prisma/seed-demo.ts` already appears to be for — the two files are near-duplicates and only one should exist). If an HTTP-triggerable reseed is genuinely needed for a staging environment, gate it behind a real secret pulled from `process.env.SEED_SECRET` (compared with a constant-time check) **and** `process.env.NODE_ENV !== 'production'`.

### 8. Checkout is entirely non-functional despite two payment SDKs being installed
**File:** `src/app/checkout/page.tsx`

The whole page is static JSX with `defaultValue="Stark Industries"` / `"Tony Stark"` placeholders and a hardcoded `$8,750.00` total; the "Confirm Corporate Order" `<Button>` has no `onClick`, no form `action`, nothing. There is no code anywhere that calls `stripe.checkout.sessions.create(...)` (the Stripe SDK is only referenced inside the *webhook handler*, which has nothing upstream creating the sessions it's meant to receive) or any Razorpay order-creation call (the `razorpay` package is a dependency and mentioned once in FAQ copy text — otherwise entirely unused).

**Fix:** Decide on one payment provider given the India-first B2B context (Razorpay + PO/bank-transfer is the more natural fit than Stripe here, given `PaymentProvider.RAZORPAY`/`BANK_TRANSFER`/`PURCHASE_ORDER` already modeled in the schema). Build a `createCheckoutSession` Server Action that reads the approved quote/order via `createOrderFromQuote`, creates a payment-provider session, and redirects; make the checkout page a client component bound to real state instead of `defaultValue` placeholders.

---

## P1 — High: data integrity, correctness, and missing functionality

### 9. Tax and shipping are hardcoded to zero in the one real order-creation path
**File:** `src/app/actions/orders.ts` — `tax: 0, // Calculate appropriate tax`

Given the `Company` model already carries `gstNumber`, this is a B2B India context where GST calculation is not optional for a real invoice. Ship at minimum a configurable flat-rate GST calculation (the admin `Order Settings` mock UI in `admin/settings/page.tsx` already implies an 18% default) before this path is used for real money.

### 10. Admin panel product form and DB schema don't cover what the storefront needs
**File:** `src/app/(admin)/admin/products/new/ProductForm.tsx`, `actions.ts`

`createProduct` only accepts `name, sku, slug, categoryId, price, stockQuantity, minimumOrderQuantity, status`. There is no way through the admin UI to add images (`ProductMedia`), bulk pricing tiers (`BulkPricingTier`), branding options (`ProductBrandingOption`/`BrandingOption`), or variants (`ProductVariant`) — all of which exist in the Prisma schema and are essential to the storefront experience already built against `PRODUCTS`/`CustomizationOption`/`PriceTier` in `src/types/product.ts`. Once #1/#4 (catalog unification) is fixed, the admin form needs to grow to match, or the storefront's richest features (tiered pricing table, customization picker, gallery) will have nothing to render for DB-backed products.

### 11. Settings pages are inert placeholders
**Files:** `src/app/(admin)/admin/settings/page.tsx`, `src/app/(dashboard)/dashboard/settings/page.tsx`, `src/app/(dashboard)/dashboard/company/page.tsx`

All three render `<Input defaultValue="...">` and buttons with no `onClick`/`action`, and there is no `Settings` model in `prisma/schema.prisma` to persist admin-configurable tax/shipping/MOQ defaults into. `dashboard/company` and `dashboard/settings` literally render the text "…configuration will go here." These are at least honest about being stubs (unlike #2/#8), but they block the "Order Settings" (`admin/settings`) values that `createOrderFromQuote` should be reading for tax/shipping instead of the hardcoded `0`s in #9.

### 12. Duplicate, conflicting middleware/session logic
**Files:** `src/middleware.ts`, `src/lib/supabase/middleware.ts`

`src/lib/supabase/middleware.ts` exports `updateSession()`, a near-identical reimplementation of the logic already in the real, active `src/middleware.ts` (Next.js only executes the root `middleware.ts`). `grep` confirms `updateSession` has zero call sites — it's dead code, but it's the kind of dead code that actively misleads future maintainers into thinking session refresh logic lives in two places, or editing the wrong one and wondering why nothing changes. Also note the two files' route lists have already drifted: `src/middleware.ts` protects `/dashboard` and `/admin`; `updateSession` also protects them but under different redirect targets.

**Fix:** Delete `src/lib/supabase/middleware.ts` and consolidate.

### 13. Broken internal link: `/request-quote` vs. actual route `/request-a-quote`
**Files:** `src/app/(dashboard)/dashboard/page.tsx` (Quick Actions card), `src/app/sitemap.ts` (static URL entry), `src/app/actions/quotes.ts` (`revalidatePath('/request-quote')`)

The real route directory is `src/app/request-a-quote/`. Every one of these three references 404s (or, for `revalidatePath`, silently revalidates a path that doesn't exist). Grep the whole repo for `/request-quote` and fix all three plus the sitemap entry.

### 14. Currency inconsistency across the app
Product constants (`src/lib/constants/products.ts`), the product detail page, and `QuoteRequestModal` all use **USD ($)**. The admin dashboard, dashboard/orders, dashboard/page, the `corporate-gifts` mock, and the Prisma `Payment.currency` default all use **INR (₹)**. The `Company`/`Address` models default country to `"India"`, and GST fields exist — this is clearly meant to be an India-first (or India + export) B2B platform, so the $ pricing throughout the customer-facing catalog is very likely wrong, not just inconsistent. Pick one currency (with multi-currency as an explicit future feature if needed) and apply it everywhere, including a shared `formatCurrency()` helper instead of ad hoc `$`/`₹` string interpolation scattered across ~8 files.

### 15. No pagination anywhere admin lists query the DB
**Files:** `src/app/(admin)/admin/orders/page.tsx`, `.../customers/page.tsx`, `.../quotes/page.tsx`, `.../products/page.tsx`

Every admin list does `prisma.<model>.findMany({ orderBy: ... })` with no `take`/`skip`/cursor. Fine at demo scale, a real production hazard once there are thousands of orders/customers — full table scan + full HTML table render on every request, plus the "Search" inputs on `admin/orders` and `admin/customers` are purely decorative (`<Input placeholder="Search...">` with no `onChange`, no server-side filtering — same fake-UI pattern as the settings pages).

**Fix:** Standard `page`/`pageSize` (or cursor) params via `searchParams`, `take`/`skip` in Prisma, and wire the search inputs to `router.push` with `?q=` the way `ProductSearch.tsx` already correctly demonstrates elsewhere in the same codebase.

---

## P2 — Medium: performance, SEO, scalability, error handling

### 16. Product detail page is a Client Component with no static generation
**Files:** `src/app/products/[slug]/page.tsx`, `src/app/products/[slug]/layout.tsx`

The page is `"use client"` and resolves its product via `useParams()` + a synchronous in-memory lookup. There's no `generateStaticParams`, so every product page is rendered/hydrated client-side rather than pre-rendered at build time or via ISR — a real cost once this is backed by a DB instead of an in-memory array (#1/#10), and already unnecessary today since the data is static at build time. Separately, `generateMetadata` in `layout.tsx` derives `<title>`/description purely from a slug→Title Case transform (`slug.replace(/-/g,' ').replace(/\b\w/g, l=>l.toUpperCase())`) instead of the actual product name/description in `PRODUCTS` — so metadata can mismatch the real title (e.g. slug `sterling-titan-wireless-charging-station` → "Sterling Titan Wireless Charging Station", but the real title is "Sterling Titan **3-in-1** Charging Station"). No canonical URL, no product images in OpenGraph tags, no `Product`/`Offer` JSON-LD structured data — all standard, high-value e-commerce SEO that's currently absent.

**Fix:** Convert to a Server Component, add `generateStaticParams()` returning all slugs, pull real title/description/image/price into `generateMetadata`, add `<script type="application/ld+json">` Product schema (price, availability, SKU), and keep only the interactive quantity/customization sub-tree as a small client component island.

### 17. Sitemap references content the storefront can't serve, and omits content it can
**File:** `src/app/sitemap.ts`

Pulls slugs from the Prisma `Product` table, which — per the architecture map above — the public site never renders (`/products/[slug]` reads `PRODUCTS`, not Prisma). Result: `sitemap.xml` lists URLs that 404, and omits the actual 10 live product URLs (from `PRODUCTS`) entirely. Also includes the broken `/request-quote` URL (#13). This needs to be regenerated from whatever the catalog's fixed single source of truth becomes.

### 18. No error boundaries, loading states, or custom 404 anywhere in the App Router
Confirmed via full-tree search: zero `error.tsx`, `loading.tsx`, `not-found.tsx`, or `global-error.tsx` files exist under `src/app`. Every admin and dashboard page does 2–7 sequential/parallel `await prisma.*` calls directly in a Server Component with no try/catch — any transient DB error (connection drop, timeout) will bubble to Next's default unstyled error overlay in dev or a generic 500 in production, and there's no branded 404 for mistyped product/category URLs (Next's default `notFound()` styling only, and only where `notFound()` is even called — the product page instead renders a custom "not found" *inline* in `page.tsx` rather than using Next's `notFound()`/`not-found.tsx` convention, so it won't get a proper 404 HTTP status code — check this if it matters for SEO/crawlers).

**Fix:** Add `loading.tsx` (skeleton/spinner) and `error.tsx` (branded retry UI) at minimum for `(admin)/`, `(dashboard)/`, and `products/[slug]/`; add a root `not-found.tsx`; and have the product detail "not found" path call Next's `notFound()` instead of a manual inline render, so it returns a real 404 status.

### 19. Direct `pg.Pool` connection with no serverless-aware pooling/connection limits
**File:** `src/lib/prisma/client.ts`

`new Pool({ connectionString: process.env.DATABASE_URL })` opens a standard TCP connection pool per server instance. On any serverless/edge deployment target (Vercel, etc.), this is the single most common cause of "too many connections" outages against Postgres once traffic is non-trivial, because each function instance gets its own pool. Since this is explicitly a Supabase-backed project, the standard fix is Supabase's pooled connection string (port 6543 / PgBouncer, `?pgbouncer=true`) for `DATABASE_URL`, with a separate unpooled `DIRECT_URL` for migrations — neither of which is referenced in `schema.prisma`'s `datasource db` block (it only defines `provider = "postgresql"`, no `url`/`directUrl` fields are even declared, which will also fail Prisma's own schema validation as written — `datasource` blocks require a `url`).

**Fix:** Add `url = env("DATABASE_URL")` and `directUrl = env("DIRECT_URL")` to the `datasource` block in `prisma/schema.prisma`; point `DATABASE_URL` at Supabase's transaction-mode pooler; keep `pg.Pool`'s own `max` conservatively low (e.g. 1–3) per serverless instance, or switch to Prisma's Data Proxy / Accelerate if deploying to Vercel Edge.

### 20. Missing security headers / config gaps
**File:** `next.config.mjs`

Good baseline headers are present (`X-Frame-Options`, `HSTS`, `Referrer-Policy`, etc.), but there's no `Content-Security-Policy` at all, which matters here specifically because the app embeds Stripe/Razorpay payment flows and Google OAuth — all of which need explicit `connect-src`/`frame-src` CSP entries to be safely locked down rather than left fully open. Also no `images.dangerouslyAllowSVG`-style hardening is needed, but note `remotePatterns` only whitelists `images.unsplash.com` — once product images move to Supabase Storage (needed for #10/#1), that bucket's hostname must be added or all admin-uploaded images will fail to render via `next/image`.

---

## P3 — Lower priority: code quality, accessibility, dead code, polish

### 21. Dead/duplicate components
- `src/components/products/ProductFilterSidebar.tsx` (337 lines) and `src/components/products/ProductFilters.tsx` (240 lines) are both unused — no page imports either of them. Given #1's fix requires *some* filter UI on `/corporate-gifts`, pick one (they appear to overlap heavily), delete the other.
- `src/lib/supabase/middleware.ts` — see #12.
- `src/app/api/seed/route.ts` largely duplicates `prisma/seed-demo.ts` — keep one.
- `src/app/fonts/GeistVF.woff` / `GeistMonoVF.woff` — not referenced anywhere (`layout.tsx` uses `next/font/google` for Inter/Playfair Display instead); leftover template assets that should be removed to trim the bundle.

### 22. Accessibility
- `QuoteRequestModal.tsx`'s modal `<div>` has no `role="dialog"`, `aria-modal="true"`, no focus trap, and no `Escape`-to-close handler — it's a plain `fixed inset-0` overlay, not an accessible dialog. Same for any other ad hoc modals in the components directory. Recommend using the already-installed `@base-ui/react` or Radix-based `Dialog` primitive (shadcn already provides `sheet.tsx` using a similar pattern) instead of hand-rolled overlays.
- Good marks: breadcrumb nav correctly uses `aria-label="Breadcrumb"`, icon-only buttons generally have `aria-label`s (`Navbar.tsx`, `FloatingButtons.tsx`, `ProductCard.tsx`'s quantity steppers) — this pattern is followed inconsistently rather than absent, so an accessibility pass mainly needs to bring the modal/dialog components up to the same standard already used elsewhere.

### 23. Type-safety gaps
- `api/seed/route.ts` uses `role: u.role as any` and `status: orderStatuses[i % orderStatuses.length] as any` to force-fit Prisma enums — indicates the demo data literals aren't typed against the actual `Role`/`OrderStatus` enums; use the generated enum objects (`Role.CUSTOMER`, etc.) instead of string casts.
- `src/types/product.ts`'s `Product` interface carries heavy optionality/duplication (`title`/`name`, `startingPrice`/`lowestPrice`/`basePrice`, `customizations`/`customizationOptions`, `isFeatured`/`featured`) that every consumer then has to defensively coalesce (`product.title || product.name`, `product.customizations || product.customizationOptions`, etc. — seen in `ProductCard.tsx`, `QuoteRequestModal.tsx`, `pricing.ts`). This is a symptom of the schema having been iterated on without cleaning up the old field names; worth a single normalization pass once the catalog is unified (#1).

### 24. Contact/quote form validation is duplicated and superficial
`src/app/actions/forms.ts` hand-rolls a regex email check (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) instead of reusing Zod (already a dependency, already used correctly in `src/lib/validations/quotes.ts`). Once #2 is fixed and these forms are merged into the real `createQuote`/Zod path, this duplication goes away for free.

---

## Suggested execution order

1. **P0 #3, #4, #6, #7** (auth/authz + user-sync + open seed endpoint) — these are exploitable-today security and data-integrity issues; fix before any public deploy, independent of anything else.
2. **P0 #1 + #2** together (unify the product catalog source, then point all quote entry points at the real `createQuote`) — this is the "does the product actually work" fix, and #2 depends on #1 only loosely (can be sequenced first if preferred).
3. **P0 #5, #8** (IDOR guard, real checkout) — needed before any real money/PII moves through the app.
4. **P1 (#9–#15)** — data correctness and admin usability, needed before onboarding real merchandising/ops staff.
5. **P2 (#16–#20)** — do alongside or right after catalog unification, since #10/#16/#19 all touch the same "make Prisma the real catalog" migration.
6. **P3** — ongoing cleanup, safe to interleave with the above.
