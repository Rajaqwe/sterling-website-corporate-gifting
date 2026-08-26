# Project: Sterling B2B Corporate Gifting Platform — Frontend Product Catalog

## Architecture
- **Framework**: Next.js 14.2.35 (App Router), React 18, TypeScript 5 (strict mode), Tailwind CSS 3.4.1.
- **Design System**: Luxury navy (`hsl(222 47% 11%)`), champagne gold (`hsl(33 40% 59%)`), soft gray (`hsl(210 40% 96.1%)`), with `Inter` and `Playfair Display` typography, Lucide React icons, and accessible interactive primitives.
- **Data Flow**: Static in-memory mock catalog (`src/lib/constants/products.ts`) strongly typed via `src/types/product.ts`.
- **Pure Domain Logic**: Filtering (`queryProducts`), tier price calculation (`calculateQuotePricing`) in `src/lib/utils/pricing.ts`.
- **Page Routes**:
  - `/` — Homepage (existing)
  - `/corporate-gifts` — Product Listing Page (PLP) with multi-facet filters, search, and responsive grid.
  - `/products/[slug]` — Product Detail Page (PDP) with image gallery, specs, customization toggles, bulk tiers, and Quote CTA.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | TypeScript Domain Models | Comprehensive types for Product, PriceTier, CustomizationOption, ProductSpecification, FilterState, QuoteRequest | M1 | ORIGINAL_REQUEST.md & Spec Miner |
| 2 | Static Mock Catalog Data | 12 realistic enterprise corporate gifts across 6 categories with authentic volume tiers, MOQs, specs, and imagery | M1 | ORIGINAL_REQUEST.md & Spec Miner |
| 3 | Query & Pricing Logic Engine | Pure functions for faceted search, category/price/MOQ filtering, and dynamic volume quote calculation | M1 | Spec Miner & Explorer 2 |
| 4 | B2B Product Card Component | Reusable card displaying product image, title, category, MOQ badge, "From $XX.XX / unit" starting bulk price, and link | M2 | ORIGINAL_REQUEST.md R1 |
| 5 | Product Listing Page (PLP) | Complete `/corporate-gifts` page with hero banner, breadcrumbs, search bar, sort options, and responsive grid | M3 | ORIGINAL_REQUEST.md R2 |
| 6 | PLP Filter Sidebar | Desktop sticky sidebar and mobile Sheet drawer filtering by Category, Price Range, and MOQ thresholds | M3 | ORIGINAL_REQUEST.md R2 |
| 7 | Product Detail Page (PDP) | Dynamic `/products/[slug]` page rendering full corporate gift details driven by slug parameter | M4 | ORIGINAL_REQUEST.md R3 |
| 8 | PDP Image Gallery | Interactive high-resolution viewer with thumbnail selector and fallback placeholder handling | M4 | ORIGINAL_REQUEST.md R3 |
| 9 | PDP Tiered Bulk Pricing Table | Volume pricing bracket matrix (e.g., 25+, 50+, 100+, 250+, 500+) with active bracket highlighting and discount % | M4 | ORIGINAL_REQUEST.md R3 |
| 10 | PDP Customization Toggles | Interactive options for Logo Silk Screen, Laser Engraving, Debossing, Custom Sleeve with live fee calculation | M4 | ORIGINAL_REQUEST.md R3 |
| 11 | PDP Technical Specifications | Formatted specifications section (dimensions, materials, imprint area, lead time, packaging) | M4 | ORIGINAL_REQUEST.md R3 |
| 12 | Request Quote CTA & Modal | Prominent "Request Quote" CTA button with interactive quote summary modal and quantity input (MOQ enforced) | M4 | ORIGINAL_REQUEST.md R3 |
| 13 | E2E Opaque-Box Test Suite | Comprehensive 4-tier automated test suite covering all features and corner cases | E2E Track | ORIGINAL_REQUEST.md & TEST_INFRA |
| 14 | Adversarial Hardening & Build Verification | Tier 5 white-box stress testing, zero-warning `npm run build` compilation, and forensic integrity audit | M5 | ORIGINAL_REQUEST.md & Audit |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| E2E | E2E Testing Suite Track | Design and publish automated test harness and Tiers 1-4 test cases -> TEST_READY.md | none | DONE |
| M1 | Core Types & Mock Data Infrastructure | `src/types/product.ts`, `src/lib/constants/products.ts`, `src/lib/utils/pricing.ts` | none | DONE |
| M2 | Reusable B2B Product Card Component | `src/components/products/ProductCard.tsx` + UI badges | M1 | DONE |
| M3 | Product Listing Page (/corporate-gifts) | `src/app/corporate-gifts/page.tsx`, filter sidebar, search, responsive grid | M1, M2 | DONE |
| M4 | Product Detail Page (/products/[slug]) | `src/app/products/[slug]/page.tsx`, gallery, specs, customization, tiered pricing, quote modal | M1 | DONE |
| M5 | E2E Pass & Adversarial Hardening | Verify 100% E2E test pass, `npm run build` clean build, adversarial Tier 5 tests, Forensic Audit | E2E, M1-M4 | DONE |

## Interface Contracts
### `src/types/product.ts`
```typescript
export type CustomizationType = 
  | 'laser_engraving'
  | 'silk_screen'
  | 'debossing'
  | 'embroidery'
  | 'uv_full_color'
  | 'custom_sleeve'
  | 'foil_stamping';

export interface PriceTier {
  minQuantity: number;
  maxQuantity: number | null;
  unitPrice: number;
  savingsPercent?: number;
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: CustomizationType;
  description: string;
  setupFee: number;
  unitCost: number;
  placementOptions?: string[];
  isDefault?: boolean;
  leadTimeDays?: number;
}

export interface ProductSpecification {
  dimensions?: string;
  weight?: string;
  materials?: string[];
  imprintArea?: string;
  productionTimeDays?: number;
  packaging?: string;
  originCountry?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  colorName?: string;
  sku: string;
  image?: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  description: string;
  category: string;
  categorySlug: string;
  moq: number;
  startingPrice: number; // lowest tier bulk unit price
  basePrice: number;     // single unit / MOQ tier unit price
  currency: string;
  images: string[];
  featuredImage: string;
  priceTiers: PriceTier[];
  customizations: CustomizationOption[];
  specifications: ProductSpecification;
  variants?: ProductVariant[];
  tags: string[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isEcoFriendly?: boolean;
}

export interface FilterState {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  maxMoq: number | null;
  searchQuery: string;
  sortBy: 'price-asc' | 'price-desc' | 'moq-asc' | 'moq-desc' | 'featured' | 'title';
}

export interface QuoteCalculation {
  quantity: number;
  baseUnitPrice: number;
  tierUnitPrice: number;
  productSubtotal: number;
  customizationSubtotal: number;
  setupFeesTotal: number;
  estimatedTotal: number;
  savingsPercent: number;
  isBelowMoq: boolean;
}
```

### Pure Utility Signatures (`src/lib/utils/pricing.ts`)
- `queryProducts(products: Product[], filters: Partial<FilterState>): Product[]`
- `calculateQuotePricing(product: Product, quantity: number, selectedCustomizationIds: string[]): QuoteCalculation`
- `getProductBySlug(slug: string): Product | undefined`
- `getAllCategories(): { name: string; slug: string; count: number }[]`

## Code Layout
- `src/types/product.ts` — Type definitions (M1)
- `src/lib/constants/products.ts` — Mock catalog dataset of 12 enterprise products (M1)
- `src/lib/utils/pricing.ts` — Filtering and quote calculation helpers (M1)
- `src/components/products/ProductCard.tsx` — Reusable B2B Product Card (M2)
- `src/components/products/ProductFilterSidebar.tsx` — Desktop & Mobile filter controls (M3)
- `src/components/products/ProductSearch.tsx` — Search and sort bar (M3)
- `src/components/products/ProductGrid.tsx` — Responsive grid and empty state (M3)
- `src/app/corporate-gifts/page.tsx` — PLP route (M3)
- `src/components/products/ProductGallery.tsx` — Image gallery with thumbnails (M4)
- `src/components/products/ProductSpecifications.tsx` — Specs grid & tabs (M4)
- `src/components/products/ProductCustomization.tsx` — Customization checkboxes with pricing (M4)
- `src/components/products/TieredPricingTable.tsx` — Bulk pricing table & quantity input (M4)
- `src/components/products/QuoteRequestModal.tsx` — Request quote modal (M4)
- `src/app/products/[slug]/page.tsx` — PDP route (M4)
- `tests/` — Automated E2E test suites (134 assertions), stress tests, and runner (E2E Track & M5)
