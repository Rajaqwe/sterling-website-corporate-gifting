# Architecture

**Technical architecture**:
- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL
- **ORM**: Prisma 7
- **Authentication**: Supabase Auth (SSR)
- **Styling**: Tailwind CSS, Shadcn UI
- **Payments**: Stripe & Razorpay (Integration points exist)
- **Email**: Resend
- **Rate Limiting**: Upstash Redis (Optional)

**Data flow**:
Client Components (React) -> Server Actions (Next.js) -> Prisma ORM -> PostgreSQL.
Authentication state is managed via Supabase cookies.

**Important dependencies**:
- @supabase/ssr for auth
- @prisma/client for DB access
- lucide-react for icons
- cmdk for command palette/search