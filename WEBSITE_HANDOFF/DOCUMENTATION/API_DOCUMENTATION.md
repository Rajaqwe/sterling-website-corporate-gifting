# API Documentation

Most data mutation is handled via Next.js Server Actions (e.g., `addToCart`, `submitQuoteRequest`, `createOrderFromCart`).

**REST Endpoints**:
- `GET /api/search?q=...`: Returns `{ products: [], categories: [] }`. Unified with `buildPrismaWhereClause`.
- `POST /api/webhooks/stripe`: Stripe event listener.
- `POST /api/webhooks/razorpay`: Razorpay event listener.