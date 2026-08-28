# Sterling — Agent Implementation Plan (UI/UX-First)

**How to use this file:** Hand this file + `PROJECT_OVERVIEW_FOR_AI.md` to the coding agent together. Work top to bottom — each phase builds on the last. Do not skip Phase 0. Every task lists exact files so the agent doesn't have to guess at architecture.

**Scope note:** This plan is weighted toward UI/UX (per request), with Code Quality, Performance/SEO, and Security tasks included afterward at lower priority, since they matter for a production B2B platform but were explicitly deprioritized this round.

---

## Phase 0 — Orientation (read-only, no edits)

Before changing anything, the agent should:

1. Read `prisma/schema.prisma` to understand `Product`, `QuoteRequest`, `Order`, `User`, `Company` shapes — UI work should never invent fields that don't exist in the schema.
2. Read `src/app/globals.css` and `tailwind.config.ts` — the design tokens already exist (deep navy primary, champagne/gold accent). **Do not introduce new ad-hoc colors** (no `bg-blue-600`, no hex literals in components) — use the existing `--primary`, `--accent`, `--secondary`, `--muted` CSS variables via Tailwind's `primary`/`accent`/`secondary`/`muted` classes.
3. Read `src/components/ui/` to see which shadcn/ui primitives are already installed (`button.tsx`, `card.tsx`, `input.tsx`, `dialog.tsx`, `separator.tsx`, etc.) — reuse these; don't hand-roll new buttons/cards/inputs.
4. Confirm the following pages exist and note their current data source before touching them: `src/app/corporate-gifts/page.tsx`, `src/app/products/[slug]/page.tsx`, `src/app/request-a-quote/page.tsx`, `src/app/(dashboard)/dashboard/**`, `src/app/(admin)/admin/**`. These now query Prisma directly — **preserve all existing data-fetching logic**; only touch presentation/markup/styling unless a task explicitly says otherwise.

---

## Phase 1 — Design System Consistency (do this first, it unblocks everything else)

### 1.1 Audit and unify spacing/typography scale
- **Files:** `tailwind.config.ts`, `src/app/globals.css`
- Confirm a consistent type scale exists (e.g., `text-sm/base/lg/xl/2xl/3xl/4xl` mapped to a serif display font for headings + sans body font — check `src/app/fonts/` for what's already loaded).
- Add/confirm a `font-serif` heading convention is used consistently for all `<h1>`/`<h2>` across marketing pages (`about`, `values`, `sustainability`, `corporate-gifts`, product pages) — right now heading font usage may be inconsistent page to page. Standardize.

### 1.2 Formalize the luxury B2B palette
- **File:** `src/app/globals.css`
- The tokens already exist: `--primary` (deep navy), `--accent` (champagne gold), `--secondary`/`--muted` (soft gray). Add two new semantic tokens if missing:
  - `--surface-elevated`: a very subtle off-white/cream for card backgrounds that sit on top of `--background`, to create depth without shadows alone.
  - `--gold-hover`: a slightly darker/richer gold for hover/active states on accent buttons (don't just rely on opacity, which looks cheap on a luxury brand).
- Apply these consistently: any element currently using raw `gray-*` or `slate-*` Tailwind classes should be migrated to `muted`/`secondary` tokens.

### 1.3 Reusable "luxury card" pattern
- **New file:** `src/components/ui/luxury-card.tsx` (wraps existing `Card` from `src/components/ui/card.tsx`)
- Add a subtle 1px gold-tinted border on hover (`hover:border-accent/40`), a soft shadow lift (`hover:shadow-lg hover:-translate-y-0.5`), and `transition-all duration-200`. This becomes the base for product cards, service pages, and dashboard summary cards — replacing one-off card styling scattered across the codebase.

---

## Phase 2 — Catalog & Product Pages (highest business impact)

### 2.1 Product Card polish
- **File:** `src/components/products/ProductCard.tsx`
- Current state: functional but likely styled minimally. Upgrade to:
  - Image container with a fixed aspect ratio (`aspect-[4/5]`) and `object-cover`, subtle zoom-on-hover (`group-hover:scale-105 transition-transform duration-300`, wrap image in `overflow-hidden`).
  - Price + MOQ (minimum order quantity) shown clearly — B2B buyers care about MOQ as much as price; make sure both are visible without a click.
  - A gold "Request Quote" CTA that appears on hover on desktop, always visible on mobile (`opacity-0 group-hover:opacity-100 md:transition-opacity` pattern, with a `@media (hover: none)` fallback so touch devices always show it — hover-only CTAs are a common mobile UX bug).
  - Category badge in the top-left corner using `--accent` at low opacity as background.
- **Do not** change the props/data shape this component receives — check `src/types/product.ts` first and only adjust JSX/className.

### 2.2 Catalog page (`/corporate-gifts`) filter & sort UX
- **Files:** `src/app/corporate-gifts/page.tsx`, `src/components/products/ProductFilterSidebar.tsx`, `src/hooks/useFilters.ts`
- Desktop: sticky filter sidebar (`sticky top-24`) so filters stay visible while scrolling a long grid.
- Mobile: confirm `MobileFilterDrawer` (already imported in the page) actually renders as a bottom sheet or slide-in drawer, not a full page navigation — check `src/components/products/ProductFilterSidebar.tsx` for the mobile variant and polish transition/animation (`data-[state=open]:animate-in slide-in-from-bottom`).
- Add active-filter "chips" above the grid (e.g., "Category: Drinkware ✕") so users can see and remove filters without opening the sidebar again — this is a standard, high-value B2B catalog pattern.
- Add a result count ("128 products") and a sort dropdown (Price: Low–High, Best Sellers, Newest) next to the grid header if not already present. Confirm `buildPrismaOrderBy` in `src/lib/products/filter-utils.ts` already supports the sort keys you expose in the UI — don't add UI options the backend can't fulfill.
- Add a skeleton grid state (reuse/extend `src/app/corporate-gifts/loading.tsx` if it exists, or create it) matching the real grid's card dimensions so there's no layout shift when data loads.

### 2.3 Product Detail Page (`/products/[slug]`)
- **Files:** `src/components/products/ProductDetailClient.tsx`, `src/app/products/[slug]/page.tsx`
- Image gallery: thumbnail strip + large image, with keyboard arrow navigation and touch swipe on mobile.
- **Tiered bulk-discount quantity slider** (from `PROJECT_OVERVIEW_FOR_AI.md` §4.2): add a quantity input/slider that live-updates unit price and total price as the buyer drags, pulling tier breakpoints from whatever pricing logic already exists in `src/lib/pricing/` (check for a `calculateQuotePricing`/tier function before writing a new one — do not duplicate pricing logic client-side; either call a server action or mirror the exact same tier table used server-side so displayed price always matches the real quote).
- Sticky "Request Quote" bar on mobile (fixed to bottom of viewport, above the fold) once the user scrolls past the main CTA — mobile B2B buyers frequently browse one-handed and lose the CTA on long product pages.
- Related products carousel at the bottom, reusing the polished `ProductCard` from 2.1.

### 2.4 Live custom logo mockup preview (from `PROJECT_OVERVIEW_FOR_AI.md` §4.2)
- **New files:** `src/components/products/LogoMockupPreview.tsx`, plus a small canvas/image-composition utility (e.g., `src/lib/mockup/composite.ts`)
- MVP scope for first pass: let the user upload a logo image (client-side only, no upload to storage yet), render it as an overlay on the product photo using `<canvas>` (position/scale controls: drag to reposition, slider to scale). Ship this as a client-side visual preview only in this phase — defer server-side persistence/storage (`ProductMedia`/Supabase Storage wiring) to a later backend-focused pass so this phase stays UI-scoped.
- Gate this behind a feature flag or a simple `products with a "customizable" field` check in the schema (`prisma/schema.prisma`) so it only renders on products that actually support branding.

---

## Phase 3 — Quote Builder & Checkout Flow UX

### 3.1 Request-a-Quote form (`/request-a-quote`)
- **File:** `src/app/request-a-quote/page.tsx`
- Break the current single long form into a **multi-step wizard** (Company Info → Product Selection/Quantities → Shipping/Recipients → Review & Submit) using local component state for the active step — do not change the final submit payload shape, since it must still match `createQuoteSchema` in `src/lib/validations/quotes.ts`.
- Add a persistent progress indicator (numbered steps with the current step highlighted in `--accent` gold).
- Inline validation per field (on blur, not just on submit) using the existing Zod schema — surface field-level errors under each input instead of a single generic error banner.

### 3.2 Multi-recipient CSV uploader (from `PROJECT_OVERVIEW_FOR_AI.md` §4.2)
- **New file:** `src/components/forms/RecipientCsvUploader.tsx`, used inside `request-a-quote/page.tsx`'s shipping step
- Accept a CSV (name, address, city, state, postal code), parse client-side (e.g., a lightweight parser, or hand-roll a simple CSV split since the format is fixed/small), show a preview table with per-row validation errors (missing postal code, malformed state, etc.) before allowing submit.
- Provide a downloadable CSV template button so users know the expected columns.
- This is UI/parsing only in this phase — actually storing many recipients against a quote/order is a schema question (`prisma/schema.prisma` doesn't currently model multiple shipping recipients per order) and should be scoped separately with backend involvement.

### 3.3 Checkout page polish (`src/app/checkout/page.tsx`, `src/app/checkout/CheckoutForm.tsx`)
- Clear order summary card (sticky on desktop) showing line items, quantities, subtotal, tax, total — don't let the buyer lose sight of what they're paying for while filling in shipping details.
- Trust signals appropriate for B2B: GST invoice note, secure payment badge, "PO/Bank Transfer available" mention if `PaymentProvider.BANK_TRANSFER`/`PURCHASE_ORDER` are real options in the schema.
- Clear loading/disabled state on the "Confirm Order" button while the Razorpay session is being created (`api/checkout/razorpay/route.ts`) — prevent double-submit.

### 3.4 Dashboard & Admin table UX
- **Files:** `src/app/(dashboard)/dashboard/**`, `src/app/(admin)/admin/**`, relevant components in `src/components/dashboard/` and `src/components/admin/`
- Replace any plain HTML tables with a consistent, sortable, responsive table pattern (stacks to cards on mobile below `md:` breakpoint — wide data tables are a common mobile-breakage point).
- Add empty states with an icon + short copy + a clear next action (e.g., dashboard quotes empty state → "Request your first quote" button) instead of a bare "No results" string.
- Status badges (quote/order status) should use consistent color coding across dashboard and admin (e.g., amber = pending, green = approved, gray = draft, red = rejected) — define this once as a shared `getStatusColor(status)` helper rather than repeating conditional className logic in every page.

---

## Phase 4 — Global Navigation, Micro-interactions, Responsiveness

### 4.1 Navbar (`src/components/layout/Navbar.tsx`)
- Confirm mobile menu is a proper slide-in drawer with focus trap and `Escape`-to-close, not just a `display: none` toggle.
- Add a subtle scroll-triggered state (background gains a shadow/blur once scrolled past ~50px) so the navbar reads clearly over hero imagery.
- Active-link underline/indicator using `--accent`.

### 4.2 Page transitions & micro-interactions
- Add consistent `transition-colors duration-200` to all interactive elements missing it (links, buttons, nav items) — check for inconsistency across `src/components/`.
- Button press states: confirm shadcn `Button` variants have a visible `active:scale-[0.98]` or similar tactile feedback.
- Form field focus states should use `--ring` (already defined) consistently — audit `src/components/ui/input.tsx` and any custom inputs for stray default browser focus outlines that clash with the design system.

### 4.3 Responsive audit pass
- Sweep every page under `src/app/(marketing pages)` — `about`, `values`, `sustainability`, `careers`, `faq`, `custom-branding`, `bulk-orders`, `employee-gifting`, `event-gifts` — at 375px, 768px, and 1280px widths. These informational pages are common dumping grounds for desktop-only layouts (fixed-width grids, text that overflows, images that don't scale). Fix any horizontal scroll or overlap issues found.

---

## Phase 5 — PDF Generation (feature addition, lower priority than Phases 1–4)

### 5.1 PDF quotation & invoice generation
- **New files:** `src/lib/pdf/generateQuotePdf.ts`, `src/lib/pdf/generateInvoicePdf.ts`, plus a "Download PDF" button added to `src/app/(dashboard)/dashboard/quotes/[id]/page.tsx` (or wherever quote detail renders) and the admin invoice view.
- Use a server-side PDF library (e.g., `@react-pdf/renderer` or `pdf-lib`) invoked from a route handler (`src/app/api/quotes/[id]/pdf/route.ts`) so generation happens server-side with real Prisma data — never generate financial documents client-side from data the browser could tamper with.
- Reuse the exact line-item/pricing data already computed in `src/app/actions/quotes.ts` / `src/app/actions/invoices.ts` — do not recompute totals in the PDF layer.

---

## Phase 6 — Performance, SEO, Code Quality, Security (do after UI/UX phases)

These are lower priority for this pass but listed so nothing from the original brief is dropped.

### 6.1 Images & caching
- Audit every `<img>` tag across `src/components/` and `src/app/` and replace with Next.js `<Image>` where not already used, with explicit `width`/`height` or `fill` + a sized parent, and `sizes` attributes tuned to actual layout (catalog grid cards need a different `sizes` value than a full-width hero).
- Add `export const revalidate = <n>` (ISR) to `src/app/corporate-gifts/page.tsx` and `src/app/products/[slug]/page.tsx` if they're currently fully dynamic on every request — catalog data doesn't need to be real-time-fresh.

### 6.2 Structured data
- Add JSON-LD `Product` schema to `src/app/products/[slug]/page.tsx` (price, availability, brand) and `FAQPage` schema to `src/app/faq/page.tsx`.

### 6.3 Code quality
- Confirm Server/Client component boundaries are minimal — any component under `src/components/products/` or `src/components/dashboard/` marked `"use client"` should be audited for whether it actually needs interactivity, or whether a smaller child component could be extracted as the only client boundary.

### 6.4 Security (see prior audit for full detail — summarized here for continuity)
- Add rate limiting to `src/app/actions/quotes.ts` (`createQuote`), `src/app/actions/forms.ts` (contact form), and `src/app/(auth)/actions.ts` (`login`, `signup`).
- Add Supabase RLS policies as defense-in-depth (docs currently claim RLS exists; verify and implement, or correct `docs/SECURITY.md`).
- Verify `companyId` scoping is enforced in every admin query intended to be company-scoped (`COMPANY_ADMIN`/`PROCUREMENT`/`HR` roles), not just `ADMIN`/`SUPER_ADMIN`.

---

## Notes for the agent

- Work in small, reviewable commits per numbered task (e.g., one commit for 2.1, one for 2.2) rather than one giant diff — it's much easier to review/revert a single misstep this way.
- Never invent new Prisma fields or change `prisma/schema.prisma` to support a UI feature without flagging it explicitly as a schema change, since that requires a migration and review outside the scope of a UI pass.
- Preserve all existing `data-testid` attributes referenced by `tests/` (if present) — check `tests/adversarial_verification.mjs` for expected test IDs like `data-testid="product-card"` before restructuring a component's DOM.
