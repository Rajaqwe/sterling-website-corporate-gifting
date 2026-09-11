# Sterling Corporate Gifting Platform — Project Definition

## Project Architecture
- **Framework**: Next.js 16 (React 19 App Router, Turbopack)
- **Language**: TypeScript 5.x (Strict type checking)
- **Styling**: Tailwind CSS v3, Radix UI Primitives, Lucide React
- **Database & Data Layer**: PostgreSQL (Supabase), Prisma ORM 7 (`@prisma/adapter-pg`)
- **Authentication**: Supabase Auth (SSR cookie handling, JWT session verification, RLS policies)
- **Testing**: Vitest, Playwright, Standalone Catalog Oracle & Adversarial Verification

## Directory Organization
- `src/app/`: Next.js App Router (Public routes, User dashboard, Admin console, Server Action handlers, and REST API endpoints)
- `src/components/`: Reusable design system UI components, products catalog, cart, and admin modules
- `src/lib/`: Domain business logic, database singletons, pricing engines, and Supabase client/server utilities
- `prisma/`: Prisma schema, migrations, and database seed scripts
- `tests/`: Comprehensive multi-tier test suites and domain oracle
- `docs/`: In-depth architecture, database schema, and security documentation
