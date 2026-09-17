# Environment Variables

**Required**:
- `NEXT_PUBLIC_APP_URL`
- `DATABASE_URL` & `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Optional/Integration**:
- Stripe Keys (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`)
- Razorpay Keys (`NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`)
- Resend API Key
- Upstash Redis credentials

*Note: No actual secrets are included in this codebase.*