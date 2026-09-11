# Sterling Corporate Gifting — Claude Project Guide

Welcome Claude! You are analyzing and improving **Sterling Corporate**, a modern B2B corporate gifting, employee appreciation, and promotional merchandise platform.

---

## 1. Core Tech Stack
- **Framework:** Next.js 16 (React 19, App Router)
- **Language:** TypeScript 5.x (Strict mode)
- **Styling & UI:** Tailwind CSS, Radix UI primitives, Shadcn UI, Lucide React icons
- **Database & ORM:** PostgreSQL (via Supabase), Prisma ORM 7 (`@prisma/adapter-pg`)
- **Authentication:** Supabase Auth (SSR cookie handling & RLS security policies)
- **State & Forms:** React Server Components (RSC) + Server Actions (`"use server"`), React Hook Form, Zod validation
- **Testing:** Playwright (E2E), Vitest (Unit / Integration)

---

## 2. Directory Layout
- `src/app/`: Next.js App Router routes (Marketing, Products catalog, Product detail `[slug]`, Cart, Checkout, Admin dashboard `(admin)`, and API routes `api/`)
- `src/components/`: UI components (`products/`, `cart/`, `layout/`, `ui/`)
- `src/lib/`: Core business logic:
  - `pricing/line-item.ts`: Line item price resolution for carts & checkout
  - `utils/pricing.ts`: Tiered volume pricing calculator & customization fee logic
  - `supabase/`: Server & client Supabase helpers
  - `prisma/`: Prisma client singleton
- `prisma/`: Database schema (`schema.prisma`) and seed data (`seed.ts`)
- `docs/`: 9 comprehensive engineering guides (`ARCHITECTURE.md`, `DATABASE.md`, `API.md`, etc.)
- `WEBSITE_HANDOFF/`: 18 detailed handoff briefing documents
- `STERLING_ANTIGRAVITY_REMAINING_FIXES.md`: Detailed implementation brief for remaining UI/UX, pricing, and performance tasks.

---

## 3. Key Development Guidelines for Claude
1. **Source of Truth:** Always inspect actual files before modifying. Do not assume older paths exist.
2. **Pricing Logic:** Always use or respect `src/lib/utils/pricing.ts` and `src/lib/pricing/line-item.ts`. Never hardcode calculations in components.
3. **Server vs. Client:** Keep `"use server"` on Server Actions and `"use client"` on interactive components.
4. **Type Safety:** Maintain strict TypeScript types. Check compilation with `npx tsc --noEmit`.
5. **Dark Mode & Contrast:** Use semantic Tailwind tokens (`bg-card`, `text-foreground`, `text-muted-foreground`) instead of hardcoded `bg-white` or `text-gray-500`.

---

