# Sterling - Deployment Guide

This document provides a comprehensive guide for deploying the Sterling corporate gifting platform. It covers everything from prerequisite setup to production deployment, database migrations, CI/CD, and monitoring.

## Prerequisites

Before starting the deployment process, ensure you have the following prerequisites installed and accounts created:

- **Node.js**: Version 18.x or higher (LTS recommended)
- **Package Manager**: npm (v9+) or pnpm (v8+)
- **Git**: For version control and deployment via GitHub
- **Supabase Account**: For database, authentication, and storage
- **Vercel Account**: For frontend and API deployment
- **Resend Account**: For transactional emails (planned)
- **Razorpay/Stripe Account**: For payment processing (planned)
- **GitHub Account**: For source code hosting and CI/CD

Make sure you have basic familiarity with Next.js App Router, Prisma ORM, and Supabase before proceeding.

## 1. Supabase Setup

Supabase acts as our backend as a service, providing PostgreSQL, Authentication, and Storage.

### 1.1 Create a New Project
1. Log in to your [Supabase dashboard](https://app.supabase.com/).
2. Click **New Project** and select your organization.
3. Name the project `sterling-production` (or `sterling-staging` for staging).
4. Provide a strong database password and save it securely.
5. Select a region closest to your primary user base (e.g., AWS ap-south-1 for India).
6. Click **Create new project**. Note that it may take a few minutes to provision.

### 1.2 Note Important Credentials
Once the project is ready, navigate to **Project Settings** > **API**. Note down the following:
- **Project URL**
- **anon / public key**
- **service_role key**

Navigate to **Project Settings** > **Database** and note the:
- **Connection string (URI)** - Note both the Transaction (connection pooling) and Session (direct) strings.

### 1.3 Enable Email Authentication
1. Go to **Authentication** > **Providers**.
2. Ensure **Email** is enabled.
3. Configure settings like "Confirm email" and "Secure email change" based on your security requirements.
4. Go to **Authentication** > **Email Templates** and customize the templates for:
   - Confirmation Address
   - Reset Password
   - Magic Link
   - Change Email Address

### 1.4 Create Storage Buckets
Navigate to **Storage** and create the following buckets:
1. `products`: For product images and videos.
2. `uploads`: For user/customer uploads (e.g., company logos for branding).
3. `brand-assets`: For site-wide assets like logos and banners.

### 1.5 Set Storage Policies
Configure the following Row Level Security (RLS) policies for your buckets under **Storage** > **Policies**:

**`products` bucket:**
- Allow public read access (SELECT) for everyone.
- Allow insert/update/delete only for authenticated admin users.

**`uploads` bucket:**
- Allow authenticated users to upload files.
- Allow authenticated users to read their own files.
- Allow admin users full access.

**`brand-assets` bucket:**
- Allow public read access.
- Allow admin users full access.

### 1.6 Configure Database RLS Policies
We use Prisma for the schema, but you should ensure RLS is enabled on tables where necessary via Supabase SQL Editor.
```sql
-- Example: Enable RLS on user profiles
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
```
(Specific RLS policies will be generated and applied during migrations).

## 2. Local Development Setup

To set up the project locally for development or testing before deployment:

### 2.1 Clone and Install
```bash
# Clone the repository
git clone https://github.com/your-org/sterling.git
cd sterling

# Install dependencies
npm install
# or pnpm install
```

### 2.2 Environment Variables
```bash
# Copy the example environment file
cp .env.example .env.local
```
Fill in the `.env.local` file with the values obtained from Supabase and other providers (see Section 3).

### 2.3 Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Push the schema to your local or development database
npx prisma db push

# Seed the database with initial data
npx prisma db seed
```

### 2.4 Run Development Server
```bash
npm run dev
# The app will be available at http://localhost:3000
```

## 3. Environment Variables

The application relies on several environment variables. Below is the full list with descriptions. Ensure these are set in your `.env.local` for development and in your hosting provider (Vercel) for production.

### Database (Prisma)
- `DATABASE_URL`: Your Supabase PostgreSQL connection string. **For production, use the connection pooling URL (Transaction mode, typically port 6543, with `?pgbouncer=true`).**
- `DIRECT_URL`: Your direct PostgreSQL connection string. **Used by Prisma for migrations (Session mode, typically port 5432).**

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`: The URL of your Supabase project.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The anonymous public key for Supabase. Safe to expose to the browser.
- `SUPABASE_SERVICE_ROLE_KEY`: The service role key for admin tasks. **NEVER expose this to the browser.**

### Application URL
- `NEXT_PUBLIC_SITE_URL`: The canonical URL of your website (e.g., `https://www.sterlinggifting.com`). Used for absolute URLs in SEO and emails.

### Email (Resend)
- `RESEND_API_KEY`: API key for Resend to send transactional emails.

### Payments (Razorpay & Stripe)
- `RAZORPAY_KEY_ID`: Razorpay API Key ID.
- `RAZORPAY_KEY_SECRET`: Razorpay API Key Secret.
- `RAZORPAY_WEBHOOK_SECRET`: Secret used to verify Razorpay webhooks.
- `STRIPE_SECRET_KEY`: Stripe Secret API Key.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe Publishable Key.
- `STRIPE_WEBHOOK_SECRET`: Secret used to verify Stripe webhooks.

## 4. Database Migrations

We use Prisma for managing database schema changes.

### 4.1 Development Workflow
When you make changes to `prisma/schema.prisma` locally:
```bash
npx prisma migrate dev --name descriptive_name
```
This generates a migration file in `prisma/migrations/` and applies it to your dev database.

### 4.2 Production Deployment
In production, migrations should be applied during the build process or via CI/CD.
```bash
npx prisma migrate deploy
```
This command applies all pending migrations from `prisma/migrations/` to the production database using the `DIRECT_URL`.

## 5. Seed Data

Seeding is useful for populating the database with initial required data or sample data for development.

### 5.1 Running the Seed
```bash
npx prisma db seed
```

### 5.2 What gets seeded:
The seed script (`prisma/seed.ts`) typically creates:
- The initial `SUPER_ADMIN` user.
- Default product categories and subcategories.
- Sample products with variants (for dev only).
- Initial FAQs and Testimonials.

### 5.3 Production Warning
> **WARNING: NEVER run the full seed script containing sample data in a production environment.**
If you need to create an initial admin user in production, either create a separate setup script or insert it manually via Supabase Studio.

## 6. Vercel Deployment

Vercel is the recommended hosting platform for Next.js applications.

### 6.1 Connect GitHub Repo
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import the `sterling` repository from your GitHub account.

### 6.2 Configure Settings
1. **Framework Preset**: Next.js (should be auto-detected).
2. **Root Directory**: `./` (unless your app is in a monorepo).
3. **Build Command**: `npm run build` (or `npx prisma generate && next build`).
4. **Install Command**: `npm install`.

### 6.3 Environment Variables
Add all the environment variables listed in Section 3 to the Vercel project settings. Ensure you use the production values.

### 6.4 Custom Domain and DNS
1. Go to **Settings** > **Domains**.
2. Add your custom domain (e.g., `sterlinggifting.com`).
3. Vercel will provide DNS records to add to your domain registrar:
   - **A Record**: Point `@` to Vercel's IP address (e.g., `76.76.21.21`).
   - **CNAME**: Point `www` to `cname.vercel-dns.com.`.
4. Wait for DNS propagation. Vercel will automatically provision SSL certificates.

## 7. Production Checklist

Before officially launching, ensure all items on this checklist are completed:

- [ ] All environment variables are correctly set in Vercel.
- [ ] Database migrations have been successfully applied (`prisma migrate deploy`).
- [ ] Initial admin user created securely.
- [ ] Supabase storage buckets (`products`, `uploads`, `brand-assets`) are created.
- [ ] RLS policies for database and storage are active and tested.
- [ ] Email provider (Resend) is verified and configured with correct domains.
- [ ] Payment providers (Razorpay/Stripe) are switched to Live mode and webhooks are configured.
- [ ] Custom domain is configured and resolving correctly.
- [ ] SSL certificates are active.
- [ ] Security headers (e.g., CSP) are configured in `next.config.mjs`.
- [ ] Monitoring and Analytics are set up.
- [ ] Error tracking (e.g., Sentry) is integrated.
- [ ] Test a complete end-to-end flow: Sign up, browse, request quote, checkout.

## 8. CI/CD Pipeline

While Vercel provides automatic deployments, you may want to set up GitHub Actions for running tests and checks before Vercel builds.

### 8.1 Example GitHub Action Workflow
Create a file at `.github/workflows/main.yml`:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npx prisma generate
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test # Vitest
      # Optional: Playwright E2E tests
```

### 8.2 Deployment Workflow
- **PRs**: Vercel automatically creates preview deployments for Pull Requests.
- **Main Branch**: Merging to `main` triggers a production deployment on Vercel.

## 9. Monitoring

Proper monitoring is essential for maintaining application health.

- **Vercel Analytics**: Enable Web Vitals and Audience analytics in the Vercel dashboard to track frontend performance.
- **Supabase Dashboard**: Monitor database load, API requests, and storage usage. Set up alerts for high resource utilization.
- **Error Tracking**: Integrate a tool like [Sentry](https://sentry.io/). This is crucial for catching unhandled exceptions in both the Next.js frontend and server functions.
- **Uptime Monitoring**: Use a service like Better Uptime, Datadog, or Pingdom to ensure the site is accessible globally.

## 10. Backup Strategy

Data integrity is critical for an e-commerce/gifting platform.

- **Supabase Automatic Backups**: Supabase Pro plan provides daily automated backups. Ensure your production project is on the Pro plan or higher.
- **Point-in-Time Recovery (PITR)**: Available on higher Supabase tiers, allowing you to restore the database to any specific second.
- **Manual Backups**: For extra safety, you can periodically run `pg_dump` via the Supabase direct connection string to export a logical backup of your database to secure cold storage.

## 11. Scaling Considerations

As traffic grows, keep the following in mind:

- **Vercel Edge Functions**: Move lightweight, latency-sensitive API routes to the Edge runtime to reduce response times.
- **Supabase Connection Pooling**: Always use the pooled connection string (`DATABASE_URL`) in Serverless environments (like Vercel) to prevent connection exhaustion on PostgreSQL.
- **CDN**: Vercel automatically acts as a CDN for static assets.
- **Image Optimization**: Utilize `next/image` to automatically resize, compress, and serve images in modern formats (like WebP) based on the client's device, significantly reducing bandwidth and improving load times.
- **Database Indexing**: Regularly review slow queries in Supabase and add appropriate Prisma indexes to heavily queried fields (e.g., `product.slug`, `order.userId`).

---
*End of Deployment Guide. Maintained by the Sterling Engineering Team.*
