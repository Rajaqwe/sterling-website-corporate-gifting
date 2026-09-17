# Database

PostgreSQL database managed by Prisma.

**Core Models**:
- `User`, `Company`, `CompanyMember`: Auth and B2B accounts.
- `Product`, `ProductVariant`, `Category`, `BulkPricingTier`: Catalog.
- `Cart`, `CartItem`: Shopping cart.
- `Order`, `OrderItem`, `Payment`, `Invoice`: Checkout and fulfillment.
- `QuoteRequest`, `QuoteItem`: B2B Quoting flow.

**Relationships**:
- Products have many Variants.
- Products have many BulkPricingTiers.
- Cart belongs to User OR SessionId (for guests).