# ChatGPT Handoff Briefing

Hello ChatGPT! You are analyzing "Sterling Corporate", a B2B corporate gifting e-commerce platform.

**Tech Stack**: Next.js 16 (App Router), Prisma 7 (PostgreSQL), Supabase (Auth), Tailwind + Shadcn.

**Current State**: 
The app is functional for browsing products, adding to cart (guest and authenticated), and proceeding to checkout or requesting quotes. We recently unified pricing logic (variants + bulk tiers) into `src/lib/pricing/line-item.ts`, implemented a guest cart using cookies, and unified search logic in `filter-utils.ts`.

**Before Making Improvements**:
- ALWAYS inspect the original source files before modifying anything. Do not guess the structure of `src/components/ui` or `actions.ts`.
- Pay attention to Server Actions (`"use server"`) vs Client Components (`"use client"`).
- Ensure you respect the existing `getLineItemPrice` logic for any pricing modifications.

Enjoy building!