# Sterling Corporate Gifting - Master Project Plan

## 1. Project Overview

**Business Context**
Sterling is a premium B2B corporate gifting platform designed to streamline and elevate the process of corporate gifting. In today's business environment, relationship building through curated, high-quality gifts is a critical strategy for retention and appreciation. Sterling bridges the gap between premium product curation and enterprise-grade procurement processes. The platform allows businesses to discover, customize, and order high-end gifts in bulk, while providing a seamless tracking and management experience.

**Target Audience**
- **Startups:** Seeking agile, modern gifting solutions for new hires and early investors.
- **SMEs (Small and Medium Enterprises):** Looking for scalable gifting options for holiday seasons and milestones.
- **Large Corporations:** Requiring enterprise-grade procurement, invoicing, and bulk shipping capabilities.
- **HR Teams:** Focusing on employee onboarding (welcome kits), anniversaries, and recognition programs.
- **Marketing Teams:** Procuring branded merchandise for campaigns, client outreach, and brand building.
- **Procurement Departments:** Needing structured quotation systems, vendor compliance, and budget tracking.
- **Event Organizers:** Sourcing premium gifts for conferences, seminars, and VIP retreats.
- **Executive Teams:** Curating exclusive, high-value gifts for key clients and board members.

## 2. Technology Stack

### Frontend Core
- **Framework:** Next.js 14+ (App Router)
  - *Justification:* Provides robust server-side rendering (SSR) and static site generation (SSG) for optimal SEO, essential for an e-commerce platform. The App Router introduces advanced routing, layouts, and React Server Components for improved performance.
- **Library:** React
  - *Justification:* Industry standard for building interactive UIs, with a massive ecosystem and talent pool.
- **Language:** TypeScript
  - *Justification:* Ensures type safety, reduces runtime errors, and significantly improves developer experience and codebase maintainability, especially critical in complex e-commerce and admin systems.

### Styling & UI
- **Styling:** Tailwind CSS
  - *Justification:* Utility-first CSS framework that allows for rapid UI development and consistent design system implementation without leaving the HTML/JSX.
- **Component Library:** shadcn/ui
  - *Justification:* Provides highly customizable, accessible, and beautifully designed base components that we own and can tweak to match the premium brand aesthetic.
- **Icons:** Lucide icons
  - *Justification:* Clean, modern, and comprehensive icon set that integrates seamlessly with React and Tailwind.

### Backend & Database
- **Backend Environment:** Next.js server-side (Route Handlers, Server Actions)
  - *Justification:* Keeps the tech stack unified. Server Actions simplify form submissions and data mutations directly from components.
- **Database:** PostgreSQL (via Supabase)
  - *Justification:* Powerful, open-source relational database ideal for handling complex e-commerce data relationships (users, orders, products).
- **BaaS/Platform:** Supabase (Auth, Storage, Database)
  - *Justification:* Accelerates backend development by providing out-of-the-box authentication, Row Level Security (RLS), and scalable storage for product images and assets.
- **ORM:** Prisma
  - *Justification:* Type-safe database client that simplifies database access, migrations, and schema management. Works beautifully with TypeScript.

### Integrations
- **Email:** Resend
  - *Justification:* Developer-first email API for sending transactional emails (order confirmations, quotes, password resets) reliably and quickly.
- **Payments:** Razorpay + Stripe
  - *Justification:* Dual gateway approach. Razorpay for the primary Indian market (assuming based on common B2B needs) and Stripe for international transactions.

### Testing & Deployment
- **Testing:** Vitest (Unit/Integration) + Playwright (E2E)
  - *Justification:* Vitest provides blazing-fast unit testing matching the Vite/Next.js ecosystem. Playwright offers robust, cross-browser end-to-end testing critical for checkout flows.
- **Deployment:** Vercel
  - *Justification:* Native hosting for Next.js, providing zero-configuration deployments, edge caching, and preview environments.

## 3. Complete Sitemap

### Public Pages (Storefront & Content)
| Route | Description |
| :--- | :--- |
| `/` | Homepage showcasing featured collections, value props, and categories. |
| `/corporate-gifts` | Main entry point for browsing all corporate gift categories. |
| `/gift-collections` | Curated collections based on themes or seasons. |
| `/products` | Full product catalog with advanced filtering and search. |
| `/products/[slug]` | Individual product detail page (PDP). |
| `/custom-corporate-gifts` | Landing page detailing customization capabilities. |
| `/bulk-orders` | Information and lead capture for high-volume orders. |
| `/employee-gifting` | Solutions specifically tailored for HR and team managers. |
| `/client-executive-gifts` | Premium tier products for VIPs and key accounts. |
| `/event-conference-gifts` | Bulk gifting solutions for events. |
| `/festive-corporate-gifting` | Seasonal landing page (Diwali, Christmas, etc.). |
| `/welcome-kits` | Curated onboarding boxes for new employees. |
| `/premium-luxury-gifts` | High-end, branded luxury items. |
| `/custom-branding` | Details on branding options (embossing, engraving, printing). |
| `/request-quote` | Global quote request form. |
| `/about` | Company history, mission, and team. |
| `/contact` | Contact information, map, and general inquiry form. |
| `/faq` | Frequently asked questions. |
| `/privacy-policy` | Legal privacy documentation. |
| `/terms-conditions` | Terms of service. |
| `/shipping-delivery` | Shipping policies and expected timelines. |
| `/refund-cancellation` | Policies regarding returns and order cancellations. |

### Authentication Pages
| Route | Description |
| :--- | :--- |
| `/login` | User authentication entry point. |
| `/register` | New user/company account creation. |
| `/forgot-password` | Initiate password recovery. |
| `/reset-password` | Complete password recovery (requires token). |
| `/verify-email` | Email verification landing page. |

### Customer Dashboard Pages
| Route | Description |
| :--- | :--- |
| `/dashboard` | Customer overview, recent activity, quick links. |
| `/dashboard/profile` | Personal details and preferences. |
| `/dashboard/company` | Company details, GST/Tax info, team members. |
| `/dashboard/addresses` | Saved billing and shipping addresses. |
| `/dashboard/enquiries` | Status of general inquiries. |
| `/dashboard/quotations` | Active and past quotes requested from sales. |
| `/dashboard/orders` | Order history, tracking, and reordering. |
| `/dashboard/invoices` | Downloadable tax invoices. |
| `/dashboard/wishlist` | Saved products for future consideration. |

### Admin Dashboard Pages
| Route | Description |
| :--- | :--- |
| `/admin` | Key metrics, revenue, active orders summary. |
| `/admin/products` | Manage product catalog. |
| `/admin/products/new` | Add a new product. |
| `/admin/products/[id]` | Edit existing product. |
| `/admin/products/bulk-upload` | CSV import for products. |
| `/admin/categories` | Manage product categories and sub-categories. |
| `/admin/orders` | Manage customer orders, fulfillment status. |
| `/admin/orders/[id]` | Order details and management. |
| `/admin/quotes` | Manage and respond to customer quotation requests. |
| `/admin/quotes/[id]` | Edit/approve/send a specific quote. |
| `/admin/customers` | Manage user accounts. |
| `/admin/companies` | Manage B2B company profiles and credit limits. |
| `/admin/content` | CMS overview. |
| `/admin/content/homepage` | Edit homepage banners, featured products. |
| `/admin/content/testimonials` | Manage client reviews. |
| `/admin/content/faqs` | Manage FAQ entries. |
| `/admin/content/banners` | Manage promotional banners site-wide. |
| `/admin/analytics` | Detailed sales and traffic reports. |
| `/admin/settings` | Global store settings, shipping rates, taxes. |
| `/admin/users` | Manage internal admin staff accounts. |
| `/admin/audit-log` | System activity tracking for security. |
| `/admin/import-history` | Logs of all bulk data imports. |

## 4. Database Schema Overview

*(Note: Full detailed schema and relationships will be documented in `DATABASE.md`)*

- **Users:** Core authentication and identity table linked to Supabase Auth.
- **Companies:** Stores B2B organization details, tax IDs, and billing information.
- **CompanyMembers:** Maps Users to Companies with specific roles.
- **Products:** The main catalog table containing base product info.
- **ProductVariants:** Handles variations like size, color, and specific pricing.
- **Categories:** Hierarchical taxonomy for organizing products.
- **ProductCategories:** Join table linking Products to Categories.
- **Orders:** Represents confirmed purchases.
- **OrderItems:** Individual lines within an Order.
- **Quotes:** Custom pricing requests from users.
- **QuoteItems:** Individual lines within a Quote.
- **Addresses:** Reusable physical locations for shipping/billing.
- **Invoices:** Generated financial documents for Orders.
- **Payments:** Records of transaction attempts and successes.
- **Wishlists:** User-saved product collections.
- **AuditLogs:** System-wide tracking of critical data changes.
- **Settings:** Key-value store for global platform configuration.

## 5. API Architecture Overview

*(Note: Full API contract details will be in `API.md`)*

The platform will utilize Next.js Route Handlers (`app/api/*`) for RESTful endpoints and Server Actions for form mutations where appropriate.

- `/api/auth/*`: Webhooks from Supabase, custom token handling, session management.
- `/api/products/*`: Catalog retrieval, search, filtering (optimized for public consumption).
- `/api/quotes/*`: Quote creation, status updates, PDF generation.
- `/api/orders/*`: Order placement, fulfillment status updates.
- `/api/payments/*`: Webhooks from Razorpay/Stripe, transaction verification.
- `/api/webhooks/*`: Generic entry points for external services (e.g., shipping updates).
- `/api/admin/*`: Protected routes for admin dashboard data fetching and mutations.

## 6. Authentication Architecture

### Supabase Auth Flow
We leverage Supabase Auth for robust, secure authentication.
1. **Client-side:** User initiates login/registration via email/password or magic link.
2. **Supabase:** Handles the credential verification and issues a JWT.
3. **Middleware (Next.js):** Intercepts requests to protected routes, verifies the JWT via Supabase client, and redirects unauthorized users.
4. **Session Management:** Cookies are used to maintain session state across server and client components.

### Roles & Permissions
A robust Role-Based Access Control (RBAC) system will be implemented.

**Internal Roles:**
- `SUPER_ADMIN`: Full unrestricted access to all system settings, data, and user management.
- `ADMIN`: Access to manage catalog, orders, quotes, and content.
- `PROCUREMENT`: Read-only access to orders/quotes, can manage inventory.

**External (Client) Roles:**
- `COMPANY_ADMIN`: Manages company profile, invites members, views all company orders/quotes.
- `HR`: Focused on employee gifting, can place orders against predefined budgets.
- `MARKETING`: Can request quotes for branded merchandise.
- `MEMBER`: Basic employee role, can view curated catalogs or place individual requests.
- `CUSTOMER`: Individual B2C or unassociated B2B user.

### RLS Strategy
Row Level Security (RLS) policies in PostgreSQL will be the primary line of defense to ensure users can only access their own data or data belonging to their company, regardless of frontend or API bugs.

## 7. Admin Architecture Overview

The Admin Dashboard is built as a separate layout within the Next.js application (`app/admin/layout.tsx`), optimized for data-density and efficiency.

- **Dashboard Features:**
  - Real-time data tables using TanStack Table for sorting, filtering, and pagination.
  - Interactive charts (Recharts) for sales and user analytics.
  - Quick action modules (e.g., "Approve Quote", "Fulfill Order").
  - Bulk operation capabilities (export to CSV, bulk status updates).
- **RBAC Enforcement:**
  - UI elements are conditionally rendered based on the user's role.
  - Server actions verify permissions before executing mutations.

## 8. UI/UX System

### Design Philosophy
"Premium, Professional, Trustworthy." The UI must reflect the high quality of the gifts being sold while maintaining the efficiency required by B2B procurement professionals.

### Color Palette
- **Primary:** Deep Navy / Charcoal (e.g., `#0f172a`, `#1e293b`) - Conveys corporate trust and premium quality.
- **Accent:** Warm Gold / Brass (e.g., `#d4af37`, `#b8860b`) - Adds a touch of luxury and highlights primary actions.
- **Neutrals:** Clean Whites and soft Grays (e.g., `#f8fafc`, `#e2e8f0`) - For backgrounds and borders to maintain a clean, uncluttered interface.

### Typography
- **Headings:** Playfair Display (or similar serif like Merriweather) for a sophisticated, editorial feel on landing pages and premium sections.
- **Body & UI:** Inter (or Roboto) for maximum legibility in data tables, dashboards, and long-form text.

### Spacing & Layout
- 8pt spacing system (Tailwind defaults).
- Generous whitespace to let product imagery breathe.
- Max-width containers for content (e.g., `max-w-7xl`) to ensure readability on large monitors.

### Component Library
- Utilizing `shadcn/ui` as the base, extensively customized to apply the color palette and typography rules.
- Custom complex components will be built for specific B2B needs (e.g., bulk order grid entry, multi-address shipping selectors).

## 9. Testing Strategy Overview

- **Unit Testing (Vitest):**
  - Focus on utility functions, pricing calculators, discount logic, and critical React hooks.
  - Target: 80%+ coverage for business logic.
- **Integration Testing (Vitest + React Testing Library):**
  - Test component interactions (e.g., adding an item to the cart, submitting a quote form).
  - Test API route handlers with mocked database calls.
- **End-to-End Testing (Playwright):**
  - Cover critical user journeys:
    1. User Registration -> Login
    2. Browsing Catalog -> Requesting Quote
    3. Adding to Cart -> Checkout -> Payment
    4. Admin Login -> Approving Quote -> Fulfilling Order

## 10. Deployment Strategy Overview

- **Hosting:** Vercel
  - Next.js application deployed seamlessly on Vercel infrastructure.
  - Vercel handles CI/CD, creating preview deployments for every pull request.
- **Database & Backend Services:** Supabase
  - Production database hosted on Supabase managed infrastructure.
  - Separate Supabase projects for `staging` and `production` environments.
- **Environment Variables:** Managed securely within Vercel's project settings and synced to local `.env.local` during development.
- **Monitoring:** Vercel Analytics for frontend performance, Sentry for error tracking.

## 11. Security Checklist

- [ ] Implement Supabase Auth for secure session management.
- [ ] Configure restrictive Row Level Security (RLS) policies on all PostgreSQL tables.
- [ ] Implement robust Role-Based Access Control (RBAC) in middleware and API routes.
- [ ] Validate all incoming data using Zod schemas before processing.
- [ ] Sanitize all user-generated content to prevent XSS.
- [ ] Implement rate limiting on sensitive endpoints (login, password reset, API).
- [ ] Secure payment webhooks by verifying signatures (Razorpay/Stripe).
- [ ] Ensure HTTPS is enforced everywhere.
- [ ] Hide sensitive environment variables; never expose server keys to the client.
- [ ] Implement comprehensive audit logging for admin actions.
- [ ] Regular dependency updates to patch known vulnerabilities.
- [ ] Disable directory listings and configure secure HTTP headers (Helmet equivalent in Next.js).

## 12. Implementation Roadmap

The project is divided into 20 focused phases to ensure systematic progress and quality control.

| Phase | Title | Focus Area |
| :--- | :--- | :--- |
| **Phase 1** | Architecture + Planning | Finalize this document, DB schema, API contracts, and infrastructure setup. |
| **Phase 2** | Project Setup + Design System | Initialize Next.js, configure Tailwind, setup shadcn/ui, establish git workflows. |
| **Phase 3** | Public Website | Develop homepage, static pages (About, Contact), and layout components (Header, Footer). |
| **Phase 4** | Product Catalog | Build category pages, product listing pages (PLP), and individual product detail pages (PDP). |
| **Phase 5** | Authentication | Integrate Supabase Auth, build login/register flows, setup protected routes middleware. |
| **Phase 6** | Database | Instantiate Prisma schema, run migrations, write initial seed data scripts. |
| **Phase 7** | Corporate Quotation System | Develop the request-a-quote flow, custom form handling, and initial database storage. |
| **Phase 8** | Customer Dashboard | Build the user portal: profile, addresses, order history, and quote tracking. |
| **Phase 9** | Admin Dashboard | Create the secure admin layout, RBAC implementation, and core management tables. |
| **Phase 10** | Orders + Checkout | Develop the B2B shopping cart and multi-step checkout process. |
| **Phase 11** | Payments + Invoices | Integrate Razorpay/Stripe gateways and automate PDF invoice generation. |
| **Phase 12** | Email + Notifications | Integrate Resend for transactional emails (order confirmed, quote ready, etc.). |
| **Phase 13** | Search + Filtering | Implement advanced catalog search, faceted filtering, and sorting capabilities. |
| **Phase 14** | SEO + Accessibility | Optimize metadata, sitemaps, semantic HTML, and ensure WCAG compliance. |
| **Phase 15** | Testing | Write unit, integration, and initial E2E tests (Vitest + Playwright). |
| **Phase 16** | Browser Verification | Cross-browser compatibility testing (Chrome, Safari, Firefox, Edge, Mobile). |
| **Phase 17** | Security Audit | Review RLS policies, run vulnerability scans, verify RBAC enforcement. |
| **Phase 18** | Production Optimization | Image optimization, caching strategies, bundle size reduction. |
| **Phase 19** | Deployment Preparation | Finalize production environment variables, setup custom domains, SSL. |
| **Phase 20** | Final Audit | End-to-end walkthrough, client sign-off, and go-live. |
