# Pages and Routes

**Public Routes**:
- `/` : Homepage
- `/corporate-gifts` : Main product listing page.
- `/products/[slug]` : Product detail page.
- `/cart` : Shopping cart summary.
- `/checkout` : Checkout flow.
- `/request-a-quote` : Form for bulk quote requests.
- `/about`, `/contact`, `/faq`, `/privacy-policy`, `/terms-and-conditions` : Static pages.

**API Routes**:
- `/api/search` : Unified search endpoint for dropdown.
- `/api/webhooks/*` : Stripe/Razorpay webhooks.
- `/api/cron/*` : Scheduled tasks (reminders, quote cleanup).

**Admin/Auth Routes**:
- `/(auth)/*` : Login, signup, password reset.
- `/(admin)/*` : Admin dashboard (WIP).
- `/(dashboard)/*` : Customer dashboard (Order history, quotes).