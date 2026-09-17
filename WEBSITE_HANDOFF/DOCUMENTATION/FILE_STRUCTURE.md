# File Structure

```
.env.example           # Environment variables template
package.json           # Dependencies and scripts
prisma/
  schema.prisma        # Database models
public/                # Static assets (images, fonts)
src/
  app/                 # Next.js App Router pages and API routes
    (admin)/           # Admin dashboard routes
    (auth)/            # Authentication routes
    api/               # API routes (webhooks, cron, search)
    cart/              # Dedicated Cart page
    checkout/          # Checkout flow
    corporate-gifts/   # PLP (Product Listing Page)
    products/          # PDP (Product Detail Page) actions
  components/          # React components
    cart/              # Cart UI (Drawer, Context)
    layout/            # Navbar, SearchBar, Footer
    products/          # Product UI components
    ui/                # Shadcn UI primitives
  lib/                 # Utilities and core logic
    pricing/           # Centralized pricing logic (line-item.ts, server.ts)
    products/          # Product utilities (filter-utils.ts)
```
