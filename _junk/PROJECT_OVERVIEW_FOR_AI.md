# Sterling — Premium B2B Corporate Gifting Platform
## Comprehensive Overview & Context for AI Code Review & Suggestions

---

### 1. Executive Summary & Business Context
- **Brand Name**: Sterling
- **Business Model**: Premium B2B Corporate Gifting & Merchandise Platform (India & Global).
- **Target Audience**: Startups, Enterprise HR Teams, Marketing & Sales Teams, Corporate Event Planners, Executive Leadership.
- **Core Value Proposition**: Curated high-end gift collections, automated custom logo branding, bulk order tier pricing, corporate quotation workflows, GST-compliant invoicing, and dedicated multi-recipient logistics.

---

### 2. Technology Stack
- **Framework**: Next.js 14+ (App Router, Server Actions, Route Handlers)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3 + shadcn/ui + Lucide Icons + Radix/Base-UI Primitives
- **Database & ORM**: PostgreSQL hosted on Supabase + Prisma ORM
- **Authentication**: Supabase Auth (Email/Password, Google OAuth, Guest/Anonymous Sessions, Role-Based Access Control)
- **Roles & Permissions**: SUPER_ADMIN, ADMIN, COMPANY_ADMIN, PROCUREMENT, HR, MARKETING, MEMBER, CUSTOMER
- **Deployment**: Vercel + Supabase

---

### 3. Key Architecture & File Structure
- **docs/**: Master architectural specifications (ARCHITECTURE.md, DATABASE.md, API.md, PROJECT_PLAN.md, SECURITY.md, TESTING.md, ADMIN.md, DEPLOYMENT.md)
- **prisma/**: Prisma schema with comprehensive data models (User, Company, Product, QuoteRequest, Order, Payment, Invoice, etc.)
- **src/app/**:
  - (admin)/: Full Admin dashboard (/admin, /admin/products, /admin/orders, /admin/quotes, /admin/customers, /admin/settings)
  - (auth)/: Authentication pages and server actions (/login, /register, /forgot-password, /reset-password)
  - (dashboard)/: Customer portal (/dashboard, /dashboard/company, /dashboard/settings)
  - corporate-gifts/: Public catalog with filtering & search
  - request-a-quote/: Comprehensive corporate quotation request form
  - contact/: Contact & inquiries with business hours & form
  - custom-branding/, bulk-orders/, employee-gifting/, event-gifts/: Dedicated service & solutions pages
  - about/, values/, sustainability/, careers/, faq/, privacy-policy/, terms-and-conditions/, refund-policy/, shipping-delivery/: Complete information & legal pages
- **src/components/**: Reusable UI components, product cards, admin sidebar, navigation bars, search modals.
- **src/lib/**: Supabase client/server helpers, Prisma singleton, utility helpers.
- **src/services/** & **src/types/**: Business logic layer and TypeScript types.

---

### 4. Areas for Claude's Suggestions & Improvements
When reviewing this codebase, please provide recommendations across:
1. **UI/UX & Design Polish**:
   - Enhancing visual hierarchy, luxury B2B aesthetics (deep navy/slate & champagne gold tones).
   - Micro-interactions, hover states, mobile responsiveness, and page transitions.
   - Catalog filtering, sorting UX, and intuitive quote builder flows.
2. **Feature Additions**:
   - Live custom logo mockup preview generator on products.
   - Tiered bulk-discount quantity slider on product detail pages.
   - Multi-recipient CSV shipping address uploader for employee welcome kits.
   - PDF quotation & invoice generation.
3. **Performance & SEO**:
   - Next.js Image optimizations, dynamic caching/ISR strategies.
   - Structured JSON-LD schema markup for B2B products and FAQs.
4. **Code Quality & Architecture**:
   - Server Component vs Client Component separation.
   - Form validation with Zod and React Hook Form / Server Actions.
   - Error boundaries, loading skeletons, and fallback states.
5. **Security & Production Readiness**:
   - Supabase Row Level Security (RLS) policies.
   - Role-based route protection middleware.
   - Rate limiting for public quotation & contact endpoints.
