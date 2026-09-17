# Features

**Implemented**:
- Product browsing and filtering (via Prisma where-clause builder).
- Shopping Cart (Guest cart via cookies and authenticated cart).
- Checkout (Order creation from cart, with stock validation/warnings).
- Unified line-item pricing (calculates correct price based on variant and volume tier).
- Search (SKU, name, category).
- Quotes (Server-calculated quotes threaded with variant prices).
- Wishlist / Likes (with toast notifications for guests).

**Partially Implemented**:
- Payments: Webhooks exist but actual checkout flow might be incomplete.
- Admin Dashboard.

**Not Implemented**:
- Coupon / Discount system.