# Original User Request

## Initial Request — 2026-08-23T08:17:23Z

Build the frontend Product Catalog for the Sterling B2B corporate gifting platform using static mock data. This includes a robust Product Listing Page (PLP) with advanced filtering, a comprehensive Product Detail Page (PDP) showing bulk pricing and MOQ, and reusable premium Product Card components.

Working directory: c:\Users\Admin\Documents\sterling  website corporate gifting
Integrity mode: development

## Requirements

### R1. B2B Product Card Component
Create a reusable product card tailored for corporate gifting. It must display the product image, title, category, Minimum Order Quantity (MOQ), and starting bulk price.

### R2. Product Listing Page (PLP)
Implement the `/corporate-gifts` page. It must include a sidebar for filtering (by category, price, and MOQ), a search bar, and a responsive grid displaying the Product Cards populated with realistic mock data.

### R3. Product Detail Page (PDP)
Implement a generic PDP at `/products/[slug]`. It must feature a product image gallery, detailed specifications, variant/customization toggles (e.g., Logo Printing), tiered bulk pricing, and a primary "Request Quote" CTA, all driven by mock data.

## Acceptance Criteria

### Verification: Agent-as-Judge Rubric
- [ ] The Product Card component successfully renders a mock product, explicitly displaying both an MOQ value and a price.
- [ ] Navigating to `/corporate-gifts` renders a page containing a filter sidebar (with at least two filter categories like Price and Category) and a grid of at least 6 mock Product Cards.
- [ ] Navigating to `/products/mock-slug` renders a page containing an image area, customization options (e.g., checkboxes or toggles), bulk pricing tiers, and a "Request Quote" button.
- [ ] The codebase compiles without TypeScript errors (verifiable by running `npm run build`).
