# Security Architecture - Sterling B2B Corporate Gifting

This document outlines the comprehensive security architecture, policies, and practices for Sterling, a premium B2B corporate gifting platform. It serves as a reference for developers, operators, and security auditors to understand the platform's security posture.

## Table of Contents
1. [Authentication Security](#1-authentication-security)
2. [Authorization & RBAC](#2-authorization--rbac)
3. [Row Level Security (RLS)](#3-row-level-security-rls)
4. [Input Validation](#4-input-validation)
5. [API Security](#5-api-security)
6. [File Upload Security](#6-file-upload-security)
7. [Payment Security](#7-payment-security)
8. [Data Protection](#8-data-protection)
9. [Security Headers](#9-security-headers)
10. [CSRF Protection](#10-csrf-protection)
11. [Audit Logging](#11-audit-logging)
12. [Error Handling Security](#12-error-handling-security)
13. [Dependency Security](#13-dependency-security)
14. [Infrastructure Security](#14-infrastructure-security)
15. [Security Checklist](#15-security-checklist)

---

## 1. Authentication Security

Authentication for the Sterling platform is powered by **Supabase Auth**, offering robust, industry-standard authentication mechanisms.

- **Methods Supported:** Email and Password.
- **Password Requirements:** Minimum 8 characters in length, requiring a mix of uppercase, lowercase, numbers, and special characters to enforce complexity.
- **Email Verification:** Required for all new accounts before access is granted. The platform utilizes a secure email link for verification.
- **Session Management:** Sessions are managed using secure, `httpOnly` cookies with the `SameSite=Lax` attribute (or `Strict` for critical routes) to mitigate Cross-Site Scripting (XSS) and CSRF attacks.
- **Session Expiry & Refresh:** JWT tokens have a short lifespan (e.g., 1 hour). A refresh token mechanism is implemented to transparently renew sessions without compromising long-term token security.
- **Account Lockout:** Temporary account lockouts are enforced after 5 consecutive failed login attempts to prevent brute-force attacks.
- **Rate Limiting:** Auth endpoints (login, signup, password reset) are strictly rate-limited (e.g., 5 requests per minute) to deter credential stuffing.

## 2. Authorization & RBAC

Access control is governed by a strict Role-Based Access Control (RBAC) model. The principle of least privilege is applied universally.

### Role Hierarchy
The roles are hierarchical, inheriting or explicitly defining permissions:
`SUPER_ADMIN > ADMIN > COMPANY_ADMIN > PROCUREMENT/HR/MARKETING > MEMBER > CUSTOMER`

### Permission Matrix

| Resource          | SUPER_ADMIN | ADMIN | COMPANY_ADMIN | PROCUREMENT/HR | MEMBER | CUSTOMER |
|-------------------|-------------|-------|---------------|----------------|--------|----------|
| **Products**      | CRUD        | CRUD  | R             | R              | R      | R        |
| **Orders**        | CRUD        | CRUD  | CRU (Own Co)  | CR (Own Co)    | CR (Own)| R (Own)  |
| **Quotes**        | CRUD        | CRUD  | CRU (Own Co)  | CRU (Own Co)   | R (Own)| R (Own)  |
| **Customers**     | CRUD        | CRUD  | R (Own Co)    | -              | -      | R (Self) |
| **Analytics**     | R           | R     | R (Own Co)    | R (Own Co)     | -      | -        |
| **Global Settings**| CRUD       | R     | -             | -              | -      | -        |
| **Company Settings**| CRUD      | CRUD  | CRUD          | -              | -      | -        |

- **Middleware Protection:** Next.js middleware is used to verify session presence and role validity before route rendering.
- **Server-Side Checks:** Authorization is enforced at the server (Route Handlers/Server Actions). UI hiding is strictly for UX, not security.
- **Company-Scoped Access:** Multi-tenancy is enforced. Users are strictly bound to their `company_id`, and all queries explicitly filter by this attribute.

## 3. Row Level Security (RLS)

PostgreSQL Row Level Security (RLS) is implemented via Supabase to enforce data access at the database level.

- **Coverage:** RLS policies are enabled on *every* table. By default, access is denied.
- **User Data:** Users can only `SELECT`, `INSERT`, `UPDATE`, or `DELETE` records where the `user_id` matches `auth.uid()`.
- **Company Data:** Company members can access data where the record's `company_id` matches the user's assigned `company_id`.
- **Admin Access:** Admins have elevated policies allowing broader access, bounded by their specific role requirements.
- **Service Role Key:** The Supabase `service_role` key bypasses RLS. It is *exclusively* used server-side for internal operations (e.g., webhooks, admin tasks) and never exposed to the client.

## 4. Input Validation

All data entering the system is strictly validated and sanitized.

- **Zod Schemas:** Every API input (body, query, params) and Server Action is validated using Zod schemas defining expected types, lengths, and formats.
- **Server-Side Enforcement:** Validation is performed on the server. Client-side validation (via React Hook Form + Zod resolver) is implemented solely for immediate UX feedback.
- **Sanitization:** Inputs are sanitized to remove potentially harmful characters.
- **SQL Injection Prevention:** Prisma ORM is utilized for all database interactions. Prisma uses parameterized queries by default, neutralizing SQL injection vectors.
- **XSS Prevention:** React automatically escapes string variables in JSX. Rich text inputs are heavily sanitized using a library like DOMPurify before rendering.

## 5. API Security

The backend APIs (Next.js Route Handlers and Server Actions) are secured against unauthorized access and abuse.

- **Authentication Chains:** Protected routes verify a valid session before processing logic.
- **Authorization Chains:** After authentication, the user's role and permissions are validated against the requested action.
- **Rate Limiting:**
  - General API endpoints: 100 requests / minute
  - Authentication endpoints: 5 requests / minute
  - File Uploads: 10 requests / minute
- **Request Size Limits:** Hard limits are set on request bodies to prevent Denial of Service (DoS) via massive payloads.
- **CORS Configuration:** Cross-Origin Resource Sharing is strictly configured to allow requests only from the verified Sterling frontend domains.
- **API Response Envelope:** Standardized JSON responses are returned. Crucially, stack traces and internal database errors are *never* leaked to the client.

## 6. File Upload Security

File uploads represent a significant attack vector and are handled with strict constraints.

- **Allowed File Types:** 
  - Images: `image/jpeg`, `image/png`, `image/webp`, `image/gif`
  - Videos: `video/mp4`, `video/webm`
  - Documents: `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- **MIME Type Validation:** Magic numbers and MIME types are inspected; relying solely on file extensions is prohibited.
- **Size Limits:** Images (5MB), Videos (100MB), Documents (10MB).
- **Filename Sanitization:** Original filenames are stripped of special characters. Files are saved using generated UUIDs to prevent path traversal and overwrite attacks.
- **Storage Isolation:** Files are stored in Supabase Storage with segmented paths (e.g., `company_id/user_id/uuid.ext` or `products/uuid.ext`).
- **Executable Files:** Explicitly blocked.
- **Future Consideration:** Integration of a virus scanning pipeline for uploads before they are made available for download.

## 7. Payment Security

Payments are processed securely via industry leaders Razorpay and Stripe.

- **PCI Compliance:** Sterling does not process, transmit, or store raw credit card details.
- **Provider-Hosted Checkout:** Checkout flows utilize provider-hosted components (e.g., Stripe Elements) to ensure sensitive data hits their servers directly.
- **Webhook Verification:** All incoming webhooks from payment gateways undergo cryptographic signature verification to ensure authenticity.
- **Idempotency Keys:** Idempotency keys are sent with payment operations to prevent duplicate charges during network failures or retries.
- **Server-Side Amount Verification:** The final payment amount is always calculated and verified on the server. Client-provided amounts are never trusted.

## 8. Data Protection

Sensitive information is carefully managed to prevent unauthorized exposure.

- **Environment Variables:** All secrets, API keys, and connection strings are stored as environment variables.
- **No Secrets in Code:** Secrets are strictly prohibited from being committed to version control.
- **Client Bundles:** Only variables prefixed with `NEXT_PUBLIC_` are exposed to the client browser.
- **Env Examples:** A `.env.example` file is maintained with placeholder values to guide local setup without leaking secrets.
- **Service Role Key:** The `SUPABASE_SERVICE_ROLE_KEY` is guarded highly and only available to the secure server environment.

## 9. Security Headers

The Next.js configuration is set up to inject security-focused HTTP headers on all responses.

- **Content-Security-Policy (CSP):** Restricts the sources from which content (scripts, images, styles) can be loaded.
- **X-Frame-Options:** Set to `DENY` (or `SAMEORIGIN`) to prevent Clickjacking attacks by disallowing the site from being embedded in iframes.
- **X-Content-Type-Options:** Set to `nosniff` to prevent browsers from MIME-sniffing a response away from the declared content-type.
- **Referrer-Policy:** Set to `strict-origin-when-cross-origin` to control the information sent in the Referer header.
- **Strict-Transport-Security (HSTS):** Enforces HTTPS connections.
- **Permissions-Policy:** Controls which browser features (e.g., microphone, camera, geolocation) the application can use.

## 10. CSRF Protection

Cross-Site Request Forgery is mitigated through multiple layers.

- **SameSite Cookies:** Session cookies use the `SameSite=Lax` or `Strict` attribute.
- **Header Validation:** Server endpoints validate the `Origin` and `Referer` headers for mutating requests (POST, PUT, DELETE).
- **Supabase Integration:** Supabase Auth and its ecosystem naturally provide CSRF resistance through token-based request mechanisms and cookie constraints.

## 11. Audit Logging

Actions that modify critical state or sensitive data are logged for compliance and security forensics.

- **Scope:** All admin actions, role changes, high-value orders, and settings modifications are logged.
- **Data Captured:** Actor ID (user), Action type, Resource type, Resource ID, Timestamp, IP Address, and relevant metadata (e.g., changes made).
- **Retention:** Audit logs are retained based on compliance requirements (e.g., 1 year).
- **Sensitive Data Exclusion:** Passwords, authentication tokens, and full credit card PANs are *never* logged.

## 12. Error Handling Security

Proper error handling prevents information leakage.

- **No Stack Traces:** Stack traces and detailed framework errors are never exposed to the end-user in production.
- **Generic Auth Errors:** Authentication failures return generic messages like "Invalid credentials" rather than "User not found" to prevent user enumeration.
- **Development vs. Production:** Detailed errors are allowed only in the local development environment.
- **Structured Logging:** The server logs structured error data to internal monitoring tools for debugging without exposing it to the client.

## 13. Dependency Security

Third-party dependencies are actively managed to prevent supply chain attacks.

- **npm audit:** Regular audits are integrated into the CI/CD pipeline to catch known vulnerabilities.
- **Automated Updates:** Tools like Dependabot or Renovate are used to automatically create PRs for dependency updates.
- **Lock Files:** `package-lock.json` is strictly maintained and committed to ensure deterministic builds.
- **Package Vetting:** New dependencies are evaluated for maintenance status, popularity, and security history before inclusion.

## 14. Infrastructure Security

The underlying infrastructure is configured to provide a secure operational environment.

- **HTTPS Everywhere:** All traffic over the internet is encrypted using TLS 1.2 or higher. Vercel automatically provisions and manages SSL certificates.
- **Database Network Isolation:** The Supabase PostgreSQL database is isolated; direct connections are restricted, and pooling via Supabase's PgBouncer setup is used.
- **Environment Parity:** Staging and Production environments use separate databases, storage buckets, and API keys.

---

## 15. Security Checklist

Before major releases, ensure the following checklist is reviewed and confirmed.

### Authentication & Authorization
- [ ] Supabase Auth is correctly configured with email confirmation enabled.
- [ ] Password complexity requirements are enforced.
- [ ] Session cookies are `httpOnly`, `Secure`, and `SameSite`.
- [ ] Route Handlers properly verify session authentication.
- [ ] Route Handlers properly verify RBAC authorization based on the permission matrix.
- [ ] UI components conditionally render based on roles, but backend always verifies.
- [ ] Multi-tenant data access is strictly filtered by `company_id`.

### Database & RLS
- [ ] RLS is enabled on all tables.
- [ ] Read policies are restricted to resource owners / company members.
- [ ] Write policies are restricted to authorized roles.
- [ ] `service_role` key is strictly kept in `.env.local` and Vercel environment vars only.

### API & Data Validation
- [ ] All API inputs have defined Zod schemas.
- [ ] All API endpoints enforce Zod validation before logic execution.
- [ ] Prisma is used for all queries (ensuring SQLi protection).
- [ ] Rate limiters are active on Auth and standard API routes.
- [ ] CORS policies restrict origins to allowed domains.

### File Uploads
- [ ] Uploads check MIME types using magic numbers, not just extensions.
- [ ] File sizes are enforced on the server.
- [ ] Filenames are regenerated using UUIDs.
- [ ] Files are stored in appropriate isolated buckets/paths.

### Payments
- [ ] Webhook signatures from Razorpay/Stripe are cryptographically verified.
- [ ] Order amounts are calculated on the server and verified against the gateway.
- [ ] No payment card details are stored in the database.

### Infrastructure & Configuration
- [ ] All secrets are stored in `.env` files and deployment platforms, not committed.
- [ ] `NEXT_PUBLIC_` prefix is strictly evaluated for leaks.
- [ ] Security headers (CSP, HSTS, X-Frame-Options) are configured in `next.config.js`.
- [ ] CI pipeline runs `npm audit` and blocks on critical vulnerabilities.
- [ ] Audit logging is implemented for critical system actions.
- [ ] Production error boundaries mask raw stack traces.

---
*End of Document. Maintainer: Sterling Security Team*
