# Specification Report: B2B Corporate Gifting Catalog & Data Architecture
**Author**: Spec Miner 3 (Data Model & Specification Miner)  
**Date**: 2026-08-23  
**Status**: Authoritative Data Contract & Specification  
**Target Repository**: Sterling B2B Corporate Gifting Platform

---

## 1. Executive Summary & Specification Scope

This document provides the exhaustive data contracts, TypeScript interfaces, mock product catalog dataset, query/filter/pricing calculation logic, and Tier 1–4 verification test matrices for the Sterling B2B Corporate Gifting Platform.

### Authoritative Requirements from `ORIGINAL_REQUEST.md`:
1. **R1. B2B Product Card Component**: Display product image, title, category, Minimum Order Quantity (MOQ), and starting bulk price.
2. **R2. Product Listing Page (PLP)**: `/corporate-gifts` with category/price/MOQ filter sidebar, search bar, and responsive grid with >= 6 cards.
3. **R3. Product Detail Page (PDP)**: Generic PDP at `/products/[slug]` with image gallery, detailed specifications, variant/customization toggles (e.g. Logo Printing), tiered bulk pricing table, and primary "Request Quote" CTA.
4. **Acceptance Criteria**: Verifiable through Agent-as-Judge rubric, component unit tests, and clean TypeScript compilation (`npm run build`).

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Component | B2B Product Card | Reusable card displaying product thumbnail, title, category, MOQ, and starting volume price | `product: Product`, optional `className` | Rendered interactive card linking to `/products/[slug]` | Fallback placeholder image if image fails | `ORIGINAL_REQUEST.md` R1 |
| 2 | Routing & Layout | Product Listing Page (PLP) | Catalogs all corporate gifts at `/corporate-gifts` with filtering, search, and responsive grid | URL search params, FilterState | Interactive PLP with sidebar + responsive grid of >= 6 cards | Shows friendly empty state if 0 matches | `ORIGINAL_REQUEST.md` R2 |
| 3 | Filter & Search | Multi-Facet Filter Sidebar | Filters catalog by category, price bounds, and MOQ thresholds | Category slugs, Min/Max price, Max MOQ threshold | Filtered subset of `Product[]` | Resets to full catalog on "Reset Filters" click | `ORIGINAL_REQUEST.md` R2 |
| 4 | Filter & Search | Real-Time Search Bar | Case-insensitive search across title, description, category, tags, and materials | Search string query | Live filtered `Product[]` matching keyword | Returns 0 items with reset button if no query matches | `ORIGINAL_REQUEST.md` R2 |
| 5 | Routing & Layout | Product Detail Page (PDP) | Comprehensive dynamic PDP at `/products/[slug]` driven by static mock data | URL slug parameter (`params.slug`) | Full product view with gallery, specs, tiers, customization, CTA | Renders 404 Not Found if slug does not exist | `ORIGINAL_REQUEST.md` R3 |
| 6 | PDP Feature | Image Gallery | High-res main viewer with interactive thumbnail carousel/strip | `images: string[]`, active index state | Display of selected active image | Fallback placeholder if image load fails | `ORIGINAL_REQUEST.md` R3 |
| 7 | PDP Feature | Tiered Bulk Pricing Table | B2B volume pricing matrix showing bracket quantities, unit prices, and savings % | `priceTiers: PriceTier[]`, selected `quantity` | Dynamic table highlighting active bracket | Highlights lowest tier if below MOQ | `ORIGINAL_REQUEST.md` R3 |
| 8 | PDP Feature | Customization & Branding Toggles | Toggles/checkboxes for Laser Engraving, Debossing, Screen Print, Custom Sleeves | Customization option IDs, checked state | Live calculation of setup fees & per-unit charges | Disallows unsupported customization types | `ORIGINAL_REQUEST.md` R3 |
| 9 | PDP Feature | Variant Selector | Colorway / material finish selector with live swatch buttons | `variants: ProductVariant[]`, selected variant ID | Updates active SKU, image, and finish name | Disables out-of-stock variants | Codebase inspection |
| 10 | PDP Feature | Live Quote Calculator & CTA | Real-time quote estimate with quantity input and primary "Request Quote" CTA | Product, quantity, selected customizations | Calculated subtotal, setup fee, and estimated total | Shows warning notice if quantity < MOQ | `ORIGINAL_REQUEST.md` R3 |
| 11 | PDP Feature | Technical Specifications Accordion | Detailed tabs/accordion for materials, dimensions, turnaround time, packaging | `specifications: ProductSpecification` | Formatted key-value specifications grid | Displays "N/A" for optional missing attributes | `ORIGINAL_REQUEST.md` R3 |
| 12 | Catalog Model | Multi-Tiered Mock Catalog | Comprehensive static dataset of 12 enterprise gifts across 6 categories | In-memory static array | Strongly typed `Product[]` & `Category[]` | Compile-time TS validation | `ORIGINAL_REQUEST.md` & Spec Miner 3 |

---

## 3. Edge Cases & Boundary Behaviors

| # | Feature | Input | Observed / Expected Behavior |
|---|---------|-------|------------------------------|
| 1 | PLP Filter / Search | Search query with zero matches (e.g. "xyz999") | Grid renders an empty state with "No products found" and a prominent "Reset Filters" button that restores all products. |
| 2 | PLP Multi-Filter | Category "Executive Tech" + Price Range "$10-$20" (no items match) | Grid displays empty state; active filter pills show removable tags. |
| 3 | PDP Quantity Input | User enters quantity below MOQ (e.g. 5 units when MOQ is 25) | UI displays warning badge ("Minimum order quantity is 25 units"), uses base unit price, and flags warning before quote submission. |
| 4 | PDP Quantity Input | User enters very high bulk quantity (e.g. 5,000 units) | Successfully matches the highest tier (e.g. `500+`) and calculates total without overflow or NaN. |
| 5 | PDP Customization | User selects all available customizations simultaneously | Calculates setup fees additively (`Σ setupFee`) and unit fees additively (`Σ unitCost * quantity`). |
| 6 | PDP Routing | User accesses invalid product slug (`/products/invalid-slug`) | Renders clean 404 / "Product Not Found" view with button to return to `/corporate-gifts`. |
| 7 | PLP Mobile Viewport | Screen width < 768px | Filter sidebar collapses into a slide-over Sheet/Drawer accessible via a "Filters" toggle button. |
| 8 | Image Loading Failure | Broken image URL or network error | Image component gracefully falls back to an SVG placeholder with product title without breaking layout. |

---

## 4. Product Data Schema & TypeScript Interfaces

The following contracts must be implemented in `src/types/product.ts` (or `src/types/catalog.ts`).

```typescript
/**
 * Customization Branding Technique Types
 */
export type CustomizationType = 
  | 'laser_engraving'
  | 'silk_screen'
  | 'debossing'
  | 'embroidery'
  | 'uv_full_color'
  | 'custom_sleeve'
  | 'foil_stamping';

/**
 * Bulk Pricing Tier definition for B2B volume orders.
 */
export interface PriceTier {
  minQuantity: number;        // e.g. 25, 50, 100, 250, 500
  maxQuantity: number | null; // e.g. 49, 99, 249, 499, null for highest bracket
  unitPrice: number;          // e.g. 42.00
  savingsPercent?: number;    // e.g. 15 (15% off base MOQ tier)
}

/**
 * Customization / Branding option configuration.
 */
export interface CustomizationOption {
  id: string;
  name: string;
  type: CustomizationType;
  description: string;
  setupFee: number;           // One-time setup / tooling fee (e.g. 45.00)
  unitCost: number;           // Per-unit application cost (e.g. 2.50)
  placementOptions?: string[]; // e.g. ["Center Body", "Lower Corner", "Lid", "Gift Box Sleeve"]
  isDefault?: boolean;        // Whether pre-selected in PDP configurator
  leadTimeDays?: number;      // Additional production days (e.g. 2)
}

/**
 * Product Specification & Technical Details.
 */
export interface ProductSpecification {
  material: string;
  dimensions: string;
  weight?: string;
  turnaroundTime: string;      // e.g. "5-7 business days"
  brandingMethods: string[];  // e.g. ["Laser Engraving", "Debossing", "Screen Print"]
  packaging: string;          // e.g. "Luxury rigid gift box with EVA custom foam"
  countryOfOrigin?: string;
  ecoFriendly?: boolean;
  compliance?: string[];      // e.g. ["BPA Free", "RoHS", "FSC Certified", "Prop 65"]
  customKeyValues?: Record<string, string>; // e.g. { "Battery Capacity": "10,000 mAh", "Output": "20W PD" }
}

/**
 * Product Variant (Colorways, finishes, sizes).
 */
export interface ProductVariant {
  id: string;
  name: string;               // e.g. "Midnight Navy", "Brushed Silver", "Matte Black"
  sku: string;
  colorHex?: string;          // e.g. "#1E293B"
  image?: string;             // Variant-specific image URL
  inStock: boolean;
}

/**
 * Category Model.
 */
export interface Category {
  id: string;
  slug: string;               // e.g. "executive-tech", "eco-friendly"
  name: string;               // e.g. "Executive Tech"
  description: string;
  itemCount?: number;
  featuredImage?: string;
  icon?: string;
}

/**
 * Primary Product Entity.
 */
export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  tagline: string;
  description: string;
  categoryId: string;
  category: string;           // Display category name (e.g. "Executive Tech")
  categorySlug: string;       // e.g. "executive-tech"
  tags: string[];             // e.g. ["bestseller", "eco", "luxury", "quick-ship"]
  moq: number;                // Minimum Order Quantity (e.g. 25, 50, 100)
  startingPrice: number;      // Base price at MOQ tier (e.g. $48.00)
  lowestPrice: number;        // Deepest bulk tier unit price (e.g. $34.00)
  priceTiers: PriceTier[];
  images: string[];           // Array of high-res image URLs (index 0 is primary thumbnail)
  badge?: 'Bestseller' | 'Eco Choice' | 'Executive' | 'Quick Ship' | 'New' | 'Popular' | 'Premium';
  variants: ProductVariant[];
  customizationOptions: CustomizationOption[];
  specifications: ProductSpecification;
  rating?: number;            // e.g. 4.9
  reviewCount?: number;       // e.g. 42
  leadTime: string;           // e.g. "5-7 business days"
  featured?: boolean;
}

/**
 * State of PLP Catalog Filters & Search.
 */
export interface FilterState {
  searchQuery: string;
  categories: string[];       // Array of selected category slugs
  priceRange: {
    min: number;
    max: number;
  };
  moqThreshold: number | null; // e.g. 25, 50, 100 (filters products where product.moq <= threshold)
  tags: string[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'moq-asc' | 'name-asc' | 'rating-desc';
}

/**
 * Quote Request Payload.
 */
export interface QuoteItemCustomization {
  optionId: string;
  optionName: string;
  placement?: string;
  artworkNotes?: string;
  logoFileUrl?: string;
}

export interface QuoteRequest {
  productId: string;
  productSlug: string;
  productName: string;
  variantId?: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  selectedCustomizations: QuoteItemCustomization[];
  setupFeeTotal: number;
  estimatedTotal: number;
  customerInfo: {
    fullName: string;
    email: string;
    companyName: string;
    phone?: string;
    deliveryDate?: string;
    shippingZip?: string;
    notes?: string;
  };
  submittedAt?: string;
  status: 'draft' | 'submitted' | 'under_review' | 'quoted';
}
```

---

## 5. Mock Data Inventory (12 Enterprise B2B Products)

The catalog features 12 products spanning 6 enterprise gifting categories. Each item has complete pricing curves, MOQs, variants, customization specs, and photography URLs.

```typescript
// src/lib/mock-data/categories.ts
export const MOCK_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    slug: "executive-tech",
    name: "Executive Tech",
    description: "Premium charging stations, audio gear, and sleek desk electronics for modern executives.",
    itemCount: 2
  },
  {
    id: "cat-2",
    slug: "luxury-drinkware",
    name: "Luxury Drinkware & Tumblers",
    description: "Insulated vessels, crystal decanters, and sommelier-grade barware built for daily elegance.",
    itemCount: 2
  },
  {
    id: "cat-3",
    slug: "eco-friendly",
    name: "Eco-Friendly & Sustainable",
    description: "FSC-certified woods, recycled ocean plastics, and carbon-neutral corporate gifts.",
    itemCount: 2
  },
  {
    id: "cat-4",
    slug: "desk-office",
    name: "Desk & Office Accessories",
    description: "Full-grain Italian leather folios, precision brass pens, and minimalist stationery.",
    itemCount: 2
  },
  {
    id: "cat-5",
    slug: "gourmet-gift-sets",
    name: "Gourmet Gift Sets",
    description: "Artisan charcuterie boards, small-batch roast kits, and epicurean tasting assortments.",
    itemCount: 2
  },
  {
    id: "cat-6",
    slug: "premium-apparel",
    name: "Premium Apparel & Wearables",
    description: "Extra-fine merino wool pullovers, weatherproof shells, and tailored corporate attire.",
    itemCount: 2
  }
];
```

### Complete 12-Product Inventory Specification

```typescript
// src/lib/mock-data/products.ts
export const MOCK_PRODUCTS: Product[] = [
  // 1. Executive Tech - Titan Charging Station
  {
    id: "prod-titan-charger",
    slug: "sterling-titan-wireless-charging-station",
    name: "Sterling Titan 3-in-1 Charging Station",
    tagline: "Precision CNC Aluminum & Italian Pebble Leather MagSafe Hub",
    description: "Crafted for executive desks, the Sterling Titan charges iPhone, Apple Watch, and AirPods simultaneously. Weighted aircraft-grade aluminum chassis with genuine full-grain leather inlay and laser-engraved branding plate.",
    categoryId: "cat-1",
    category: "Executive Tech",
    categorySlug: "executive-tech",
    tags: ["executive", "tech", "bestseller", "premium"],
    moq: 25,
    startingPrice: 58.00,
    lowestPrice: 42.00,
    badge: "Bestseller",
    featured: true,
    rating: 4.9,
    reviewCount: 54,
    leadTime: "7-10 business days",
    images: [
      "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop"
    ],
    priceTiers: [
      { minQuantity: 25, maxQuantity: 49, unitPrice: 58.00, savingsPercent: 0 },
      { minQuantity: 50, maxQuantity: 99, unitPrice: 52.00, savingsPercent: 10 },
      { minQuantity: 100, maxQuantity: 249, unitPrice: 47.00, savingsPercent: 19 },
      { minQuantity: 250, maxQuantity: 499, unitPrice: 44.00, savingsPercent: 24 },
      { minQuantity: 500, maxQuantity: null, unitPrice: 42.00, savingsPercent: 28 }
    ],
    variants: [
      { id: "v-titan-obsidian", name: "Obsidian Black & Gunmetal", sku: "ST-TIT-BLK", colorHex: "#1C1C1E", inStock: true },
      { id: "v-titan-cognac", name: "Cognac Leather & Space Silver", sku: "ST-TIT-CGN", colorHex: "#8B5A2B", inStock: true }
    ],
    customizationOptions: [
      { id: "c-titan-laser", name: "Precision Laser Engraving", type: "laser_engraving", description: "Subtle silver tone etching on aluminum bezel", setupFee: 45.00, unitCost: 2.50, placementOptions: ["Base Front Edge", "Rear Plate"], isDefault: true },
      { id: "c-titan-deboss", name: "Leather Debossing", type: "debossing", description: "Blind heat deboss directly into the leather charging pad", setupFee: 60.00, unitCost: 3.50, placementOptions: ["Center Leather Inlay"] },
      { id: "c-titan-sleeve", name: "Custom Rigid Presentation Sleeve", type: "custom_sleeve", description: "Full-color soft-touch magnetic gift box sleeve", setupFee: 75.00, unitCost: 4.00, placementOptions: ["Exterior Packaging"] }
    ],
    specifications: {
      material: "Anodized Aerospace 6063 Aluminum & Top-Grain Leather",
      dimensions: "180mm x 90mm x 14mm (285g)",
      weight: "285g",
      turnaroundTime: "7-10 business days",
      brandingMethods: ["Laser Engraving", "Blind Debossing", "Custom Packaging Sleeve"],
      packaging: "Matte black soft-touch gift box with custom molded foam insert",
      countryOfOrigin: "Imported / Final Customization in USA",
      ecoFriendly: false,
      compliance: ["Qi Certified", "MagSafe Compatible", "FCC", "CE", "RoHS"],
      customKeyValues: {
        "Total Power Output": "25W (15W MagSafe Phone + 5W Watch + 5W Earbuds)",
        "Included Accessories": "65W GaN Power Adapter & Braided USB-C Cable (1.5m)"
      }
    }
  },

  // 2. Executive Tech - Aerocrest Headphones
  {
    id: "prod-aerocrest-anc",
    slug: "aerocrest-noise-cancelling-headphones",
    name: "Aerocrest Studio ANC Over-Ear Headphones",
    tagline: "Hybrid Active Noise Cancellation with Custom Engraved Ear Cups",
    description: "Engineered for executive travel and focused workspace productivity. Features 45mm custom dynamic drivers, 40-hour battery life, and memory foam protein leather ear cushions. Delivered in a hard travel case with customized branding.",
    categoryId: "cat-1",
    category: "Executive Tech",
    categorySlug: "executive-tech",
    tags: ["tech", "executive", "luxury"],
    moq: 15,
    startingPrice: 145.00,
    lowestPrice: 110.00,
    badge: "Executive",
    featured: true,
    rating: 5.0,
    reviewCount: 32,
    leadTime: "8-12 business days",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop"
    ],
    priceTiers: [
      { minQuantity: 15, maxQuantity: 29, unitPrice: 145.00, savingsPercent: 0 },
      { minQuantity: 30, maxQuantity: 59, unitPrice: 132.00, savingsPercent: 9 },
      { minQuantity: 60, maxQuantity: 119, unitPrice: 122.00, savingsPercent: 16 },
      { minQuantity: 120, maxQuantity: null, unitPrice: 110.00, savingsPercent: 24 }
    ],
    variants: [
      { id: "v-aero-matte-blk", name: "Matte Stealth Black", sku: "AC-ANC-BLK", colorHex: "#111111", inStock: true },
      { id: "v-aero-silver-grey", name: "Brushed Platinum & Grey", sku: "AC-ANC-SLV", colorHex: "#C0C0C0", inStock: true }
    ],
    customizationOptions: [
      { id: "c-aero-laser", name: "Laser Engraved Ear Cups", type: "laser_engraving", description: "Precision dual-ear cup logo etching", setupFee: 50.00, unitCost: 3.50, placementOptions: ["Dual Ear Cups", "Single Ear Cup"], isDefault: true },
      { id: "c-aero-case-print", name: "Travel Case Screen Print", type: "silk_screen", description: "1-Color metallic ink on hardshell EVA case", setupFee: 40.00, unitCost: 2.00, placementOptions: ["Case Front Center"] }
    ],
    specifications: {
      material: "Brushed Aluminum, Lightweight Polymer & Protein Memory Foam",
      dimensions: "195mm x 175mm x 80mm (250g)",
      turnaroundTime: "8-12 business days",
      brandingMethods: ["Laser Engraving", "Silk Screen Case Branding"],
      packaging: "Custom EVA hardshell travel case inside presentation gift box",
      compliance: ["Bluetooth 5.3", "Hi-Res Audio Certified", "FCC", "CE"]
    }
  },

  // 3. Luxury Drinkware - Solis Copper Tumbler Set
  {
    id: "prod-solis-tumbler",
    slug: "solis-copper-insulated-tumbler-set",
    name: "Solis 20oz Copper Vacuum Tumbler Duo",
    tagline: "Double-Walled 18/8 Stainless Steel with Copper Lining & Magnetic Lid",
    description: "A refined gifting staple for team appreciation and partner gifting. Maintains hot beverages for 12 hours and chilled drinks for 24 hours. Features a condensation-free matte powder coat with subtle copper accents.",
    categoryId: "cat-2",
    category: "Luxury Drinkware & Tumblers",
    categorySlug: "luxury-drinkware",
    tags: ["drinkware", "bestseller", "popular"],
    moq: 50,
    startingPrice: 34.00,
    lowestPrice: 24.00,
    badge: "Popular",
    featured: true,
    rating: 4.8,
    reviewCount: 96,
    leadTime: "5-7 business days",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1000&auto=format&fit=crop"
    ],
    priceTiers: [
      { minQuantity: 50, maxQuantity: 99, unitPrice: 34.00, savingsPercent: 0 },
      { minQuantity: 100, maxQuantity: 249, unitPrice: 30.00, savingsPercent: 12 },
      { minQuantity: 250, maxQuantity: 499, unitPrice: 27.00, savingsPercent: 21 },
      { minQuantity: 500, maxQuantity: null, unitPrice: 24.00, savingsPercent: 29 }
    ],
    variants: [
      { id: "v-solis-navy", name: "Sterling Midnight Navy", sku: "SLS-TUM-NVY", colorHex: "#0F172A", inStock: true },
      { id: "v-solis-white", name: "Alpine Matte White", sku: "SLS-TUM-WHT", colorHex: "#F8FAFC", inStock: true },
      { id: "v-solis-slate", name: "Slate Charcoal", sku: "SLS-TUM-SLA", colorHex: "#334155", inStock: true }
    ],
    customizationOptions: [
      { id: "c-solis-laser", name: "360° Seamless Laser Engraving", type: "laser_engraving", description: "Reveals the shiny stainless steel substrate beneath powder coat", setupFee: 35.00, unitCost: 1.75, placementOptions: ["Front Center", "360 Wrap"], isDefault: true },
      { id: "c-solis-screen", name: "1-Color Silk Screen Print", type: "silk_screen", description: "Crisp Pantone-matched ink application", setupFee: 30.00, unitCost: 1.25, placementOptions: ["Front Center"] }
    ],
    specifications: {
      material: "Pro-Grade 18/8 Stainless Steel with Copper Thermal Layer",
      dimensions: "Height: 185mm, Diameter: 85mm (Capacity: 590ml / 20oz)",
      turnaroundTime: "5-7 business days",
      brandingMethods: ["Laser Engraving", "Silk Screen", "Full Color UV"],
      packaging: "Custom cylindrical gift tube with gold foil stamped lid",
      compliance: ["BPA Free", "FDA Compliant", "Dishwasher Safe Lid"]
    }
  },

  // 4. Luxury Drinkware - Monaco Crystal Decanter Set
  {
    id: "prod-monaco-decanter",
    slug: "monaco-crystal-whiskey-decanter-set",
    name: "Monaco Handcrafted Crystal Decanter & Rocks Set",
    tagline: "Ultra-Clear Lead-Free European Crystal in Satin-Lined Gift Chest",
    description: "The gold standard in VIP corporate gifting. Includes a 750ml geometric crystal whiskey decanter and two weighted old fashioned rocks glasses, tailored with deep sandblast etching or monogram engraving.",
    categoryId: "cat-2",
    category: "Luxury Drinkware & Tumblers",
    categorySlug: "luxury-drinkware",
    tags: ["luxury", "executive", "drinkware"],
    moq: 20,
    startingPrice: 95.00,
    lowestPrice: 72.00,
    badge: "Executive",
    featured: false,
    rating: 4.95,
    reviewCount: 18,
    leadTime: "10-14 business days",
    images: [
      "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1000&auto=format&fit=crop"
    ],
    priceTiers: [
      { minQuantity: 20, maxQuantity: 49, unitPrice: 95.00, savingsPercent: 0 },
      { minQuantity: 50, maxQuantity: 99, unitPrice: 86.00, savingsPercent: 9 },
      { minQuantity: 100, maxQuantity: 249, unitPrice: 78.00, savingsPercent: 18 },
      { minQuantity: 250, maxQuantity: null, unitPrice: 72.00, savingsPercent: 24 }
    ],
    variants: [
      { id: "v-monaco-classic", name: "Classic Brilliant Cut Crystal", sku: "MNC-DEC-CLR", inStock: true }
    ],
    customizationOptions: [
      { id: "c-monaco-sandblast", name: "Deep Sandblast Glass Etching", type: "laser_engraving", description: "Deep permanent frosted etch on decanter and both glasses", setupFee: 65.00, unitCost: 6.00, placementOptions: ["Decanter Center + Both Glasses"], isDefault: true },
      { id: "c-monaco-plaque", name: "Engraved Brass Box Plaque", type: "laser_engraving", description: "Personalized brass plate affixed to the wooden chest lid", setupFee: 40.00, unitCost: 4.50, placementOptions: ["Exterior Box Lid"] }
    ],
    specifications: {
      material: "100% Lead-Free European Crystalline Glass & Acacia Wooden Chest",
      dimensions: "Decanter: 750ml (9.5\" H), Glasses: 320ml (3.8\" H)",
      turnaroundTime: "10-14 business days",
      brandingMethods: ["Deep Glass Etching", "Box Lid Foil / Plaque Engraving"],
      packaging: "Handcrafted satin-lined mahogany wood presentation box"
    }
  },

  // 5. Eco-Friendly - Verda Recycled Canvas Tote
  {
    id: "prod-verda-tote",
    slug: "verda-recycled-canvas-laptop-tote",
    name: "Verda Ocean-Bound Recycled Canvas Executive Tote",
    tagline: "GRS-Certified Recycled Ocean Canvas with Vegan Leather Accents",
    description: "A functional, sustainable everyday carry for conferences, employee onboarding, and client gifts. Padded compartment fits up to 16\" MacBook Pro, featuring water-resistant lining and reinforced brass hardware.",
    categoryId: "cat-3",
    category: "Eco-Friendly & Sustainable",
    categorySlug: "eco-friendly",
    tags: ["eco", "sustainable", "bestseller"],
    moq: 35,
    startingPrice: 48.00,
    lowestPrice: 36.00,
    badge: "Eco Choice",
    featured: true,
    rating: 4.85,
    reviewCount: 44,
    leadTime: "6-8 business days",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop"
    ],
    priceTiers: [
      { minQuantity: 35, maxQuantity: 74, unitPrice: 48.00, savingsPercent: 0 },
      { minQuantity: 75, maxQuantity: 149, unitPrice: 43.00, savingsPercent: 10 },
      { minQuantity: 150, maxQuantity: 299, unitPrice: 39.00, savingsPercent: 19 },
      { minQuantity: 300, maxQuantity: null, unitPrice: 36.00, savingsPercent: 25 }
    ],
    variants: [
      { id: "v-verda-olive", name: "Forest Olive Green", sku: "VRD-TOT-OLV", colorHex: "#3F4F38", inStock: true },
      { id: "v-verda-charcoal", name: "Heather Charcoal", sku: "VRD-TOT-CHR", colorHex: "#4A4A4A", inStock: true },
      { id: "v-verda-sand", name: "Natural Oat Sand", sku: "VRD-TOT-SND", colorHex: "#D7C9B1", inStock: true }
    ],
    customizationOptions: [
      { id: "c-verda-embroidery", name: "High-Density Thread Embroidery", type: "embroidery", description: "Up to 8,000 stitches in rich tonal thread", setupFee: 45.00, unitCost: 3.20, placementOptions: ["Front Pocket Center"], isDefault: true },
      { id: "c-verda-patch", name: "Recycled Leather Debossed Patch", type: "debossing", description: "Sewn-on vegan leather patch with crisp brand deboss", setupFee: 55.00, unitCost: 2.80, placementOptions: ["Upper Center Lip"] }
    ],
    specifications: {
      material: "100% GRS Recycled Post-Consumer Poly-Canvas & Plant-Based PU",
      dimensions: "420mm x 340mm x 120mm (Holds 16\" Laptops)",
      turnaroundTime: "6-8 business days",
      brandingMethods: ["Precision Embroidery", "Debossed Eco-Patch", "Water-Based Screen Print"],
      packaging: "Compostable cornstarch polybag with FSC kraft story tag",
      compliance: ["GRS Certified", "PETA Vegan Approved", "Oeko-Tex Standard 100"]
    }
  },

  // 6. Eco-Friendly - Botanica Bamboo Desk Station
  {
    id: "prod-botanica-bamboo",
    slug: "botanica-bamboo-desk-organizer-station",
    name: "Botanica Natural Bamboo Desk Organizer & Wireless Pad",
    tagline: "100% Certified Organic Moso Bamboo with 15W Fast Qi Charger",
    description: "Declutter workspace essentials with eco-conscious craftsmanship. Organizes pens, stationery, and smartphones while delivering fast wireless power. Arrives with a plantable seed-paper brand insert.",
    categoryId: "cat-3",
    category: "Eco-Friendly & Sustainable",
    categorySlug: "eco-friendly",
    tags: ["eco", "desk", "tech"],
    moq: 50,
    startingPrice: 28.00,
    lowestPrice: 19.00,
    badge: "Eco Choice",
    featured: false,
    rating: 4.7,
    reviewCount: 29,
    leadTime: "5-7 business days",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642532744-e377ab2570b2?q=80&w=1000&auto=format&fit=crop"
    ],
    priceTiers: [
      { minQuantity: 50, maxQuantity: 99, unitPrice: 28.00, savingsPercent: 0 },
      { minQuantity: 100, maxQuantity: 249, unitPrice: 24.50, savingsPercent: 13 },
      { minQuantity: 250, maxQuantity: 499, unitPrice: 21.50, savingsPercent: 23 },
      { minQuantity: 500, maxQuantity: null, unitPrice: 19.00, savingsPercent: 32 }
    ],
    variants: [
      { id: "v-botanica-nat", name: "Natural Blonde Bamboo", sku: "BOT-DSK-NAT", inStock: true }
    ],
    customizationOptions: [
      { id: "c-bot-laser", name: "Wood Laser Engraving", type: "laser_engraving", description: "Deep caramel laser burn on bamboo surface", setupFee: 35.00, unitCost: 1.50, placementOptions: ["Front Lip", "Wireless Pad Center"], isDefault: true },
      { id: "c-bot-seedcard", name: "Plantable Seed-Paper Insert Card", type: "custom_sleeve", description: "Wildflower seed card printed with your company note", setupFee: 25.00, unitCost: 0.85, placementOptions: ["Inside Box"] }
    ],
    specifications: {
      material: "100% Sustainably Harvested Moso Bamboo",
      dimensions: "260mm x 145mm x 18mm",
      turnaroundTime: "5-7 business days",
      brandingMethods: ["Wood Laser Etching", "Silk Screen"],
      packaging: "100% recycled unbleached kraft box with soy-ink printing",
      compliance: ["FSC 100% Bamboo", "RoHS", "Qi Wireless Spec"]
    }
  },

  // 7. Desk & Office - Vanguard Leather Portfolio
  {
    id: "prod-vanguard-portfolio",
    slug: "vanguard-full-grain-leather-portfolio",
    name: "Vanguard Executive Full-Grain Leather Portfolio",
    tagline: "Handcrafted Tuscan Vegetable-Tanned Leather with Magnetic Tab Closure",
    description: "Designed for boardrooms and client presentations. Contains a replaceable refillable A4 writing pad, dual stylus/pen loops, business card pockets, and an expanding tablet slip pocket.",
    categoryId: "cat-4",
    category: "Desk & Office Accessories",
    categorySlug: "desk-office",
    tags: ["executive", "desk", "luxury"],
    moq: 25,
    startingPrice: 65.00,
    lowestPrice: 48.00,
    badge: "Premium",
    featured: true,
    rating: 4.95,
    reviewCount: 47,
    leadTime: "7-10 business days",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1000&auto=format&fit=crop"
    ],
    priceTiers: [
      { minQuantity: 25, maxQuantity: 49, unitPrice: 65.00, savingsPercent: 0 },
      { minQuantity: 50, maxQuantity: 99, unitPrice: 58.00, savingsPercent: 11 },
      { minQuantity: 100, maxQuantity: 249, unitPrice: 52.00, savingsPercent: 20 },
      { minQuantity: 250, maxQuantity: null, unitPrice: 48.00, savingsPercent: 26 }
    ],
    variants: [
      { id: "v-vg-espresso", name: "Espresso Dark Brown", sku: "VG-FOL-ESP", colorHex: "#382216", inStock: true },
      { id: "v-vg-caramel", name: "Bourbon Caramel Tan", sku: "VG-FOL-CAR", colorHex: "#A0522D", inStock: true },
      { id: "v-vg-noir", name: "Onyx Black", sku: "VG-FOL-BLK", colorHex: "#1A1A1A", inStock: true }
    ],
    customizationOptions: [
      { id: "c-vg-blind-deboss", name: "Blind Hot-Foil Heat Deboss", type: "debossing", description: "Deep tactile imprint of corporate logo on lower right cover", setupFee: 50.00, unitCost: 2.50, placementOptions: ["Bottom Right Front", "Center Front"], isDefault: true },
      { id: "c-vg-gold-foil", name: "Metallic Gold Foil Stamp", type: "foil_stamping", description: "Lustrous metallic gold leaf hot pressed into leather", setupFee: 60.00, unitCost: 3.00, placementOptions: ["Center Front"] }
    ],
    specifications: {
      material: "Full-Grain Tuscan Vegetable-Tanned Cowhide & Suede Lining",
      dimensions: "325mm x 250mm x 25mm (Fits US Letter & A4 Pads)",
      turnaroundTime: "7-10 business days",
      brandingMethods: ["Blind Heat Debossing", "Metallic Foil Stamping"],
      packaging: "Two-piece linen textured presentation box with protective cotton dust bag"
    }
  },

  // 8. Desk & Office - Kensington Brass Pen Set
  {
    id: "prod-kensington-pen",
    slug: "kensington-brass-rollerball-pen-gift-box",
    name: "Kensington Heavyweight Brass Rollerball Pen",
    tagline: "Solid Machined Brass Body with German Ceramic Rollerball Cartridge",
    description: "Substantial 42-gram weighted pen with exceptional balance and effortless glide. Precision-machined knurling on grip section and polished mirror chrome or matte PVD finish.",
    categoryId: "cat-4",
    category: "Desk & Office Accessories",
    categorySlug: "desk-office",
    tags: ["desk", "quick-ship", "popular"],
    moq: 50,
    startingPrice: 32.00,
    lowestPrice: 22.00,
    badge: "Quick Ship",
    featured: false,
    rating: 4.75,
    reviewCount: 63,
    leadTime: "3-5 business days",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?q=80&w=1000&auto=format&fit=crop"
    ],
    priceTiers: [
      { minQuantity: 50, maxQuantity: 99, unitPrice: 32.00, savingsPercent: 0 },
      { minQuantity: 100, maxQuantity: 249, unitPrice: 28.00, savingsPercent: 12 },
      { minQuantity: 250, maxQuantity: 499, unitPrice: 25.00, savingsPercent: 22 },
      { minQuantity: 500, maxQuantity: null, unitPrice: 22.00, savingsPercent: 31 }
    ],
    variants: [
      { id: "v-ken-matte-black", name: "Matte Black & Gold Accents", sku: "KN-PEN-BLK", colorHex: "#181818", inStock: true },
      { id: "v-ken-raw-brass", name: "Raw Brushed Brass", sku: "KN-PEN-BRS", colorHex: "#D4AF37", inStock: true }
    ],
    customizationOptions: [
      { id: "c-ken-engrave", name: "Barrel Laser Engraving", type: "laser_engraving", description: "Fine precision etching on pen barrel or cap", setupFee: 30.00, unitCost: 1.20, placementOptions: ["Upper Cap", "Lower Barrel"], isDefault: true },
      { id: "c-ken-box-print", name: "Gift Box Foil Print", type: "foil_stamping", description: "Gold foil company logo on wooden gift box lid", setupFee: 40.00, unitCost: 2.00, placementOptions: ["Box Outer Lid"] }
    ],
    specifications: {
      material: "Solid Machined Brass with 0.7mm German Schmidt Refill",
      dimensions: "Length: 140mm, Diameter: 11mm (Weight: 42g)",
      turnaroundTime: "3-5 business days",
      brandingMethods: ["Rotary Laser Engraving", "Foil Stamping"],
      packaging: "High-gloss piano black lacquered wooden gift case"
    }
  },

  // 9. Gourmet Gift Sets - Artisan Charcuterie Board Set
  {
    id: "prod-artisan-charcuterie",
    slug: "artisan-reserve-charcuterie-tasting-board",
    name: "Artisan Reserve Gourmet Charcuterie & Tasting Board",
    tagline: "Solid Live-Edge Acacia Wood Platter with Artisanal Epicurean Pairings",
    description: "An unforgettable celebration gift for holidays and corporate milestones. Features an engraved 18\" solid acacia serving board, 3 brass cheese utensils, Italian truffle honey, cured salumi, and artisan crisps.",
    categoryId: "cat-5",
    category: "Gourmet Gift Sets",
    categorySlug: "gourmet-gift-sets",
    tags: ["gourmet", "bestseller", "luxury"],
    moq: 25,
    startingPrice: 88.00,
    lowestPrice: 68.00,
    badge: "Bestseller",
    featured: true,
    rating: 4.9,
    reviewCount: 71,
    leadTime: "7-10 business days",
    images: [
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=1000&auto=format&fit=crop"
    ],
    priceTiers: [
      { minQuantity: 25, maxQuantity: 49, unitPrice: 88.00, savingsPercent: 0 },
      { minQuantity: 50, maxQuantity: 99, unitPrice: 80.00, savingsPercent: 9 },
      { minQuantity: 100, maxQuantity: 249, unitPrice: 73.00, savingsPercent: 17 },
      { minQuantity: 250, maxQuantity: null, unitPrice: 68.00, savingsPercent: 23 }
    ],
    variants: [
      { id: "v-acacia-board", name: "Handcrafted Dark Acacia Wood", sku: "ART-CHRC-ACA", inStock: true }
    ],
    customizationOptions: [
      { id: "c-char-laser", name: "Wood Board Laser Engraving", type: "laser_engraving", description: "Large format laser engraving in corner or center of board", setupFee: 45.00, unitCost: 3.50, placementOptions: ["Board Corner Handle", "Board Center"], isDefault: true },
      { id: "c-char-ribbon", name: "Custom Branded Satin Ribbon & Card", type: "custom_sleeve", description: "Woven ribbon with silver foil logo & personalized greeting card", setupFee: 35.00, unitCost: 2.25, placementOptions: ["Gift Box Exterior"] }
    ],
    specifications: {
      material: "Sustainably Sourced Natural Acacia Wood & Food-Grade Stainless Steel",
      dimensions: "Board: 450mm x 220mm x 20mm",
      turnaroundTime: "7-10 business days",
      brandingMethods: ["Wood Laser Engraving", "Custom Ribbon", "Greeting Note Card"],
      packaging: "Custom rigid corporate gift hamper box with decorative crinkle fill",
      compliance: ["FDA Food Contact Safe", "Organic Ingredients Certified"]
    }
  },

  // 10. Gourmet Gift Sets - Roastery Coffee Kit
  {
    id: "prod-roastery-coffee",
    slug: "roastery-select-pour-over-coffee-kit",
    name: "Roastery Select Ceramic Pour-Over & Coffee Kit",
    tagline: "Matte Ceramic Dripper, Double-Wall Glass Server & Single-Origin Beans",
    description: "The ultimate perk for coffee enthusiasts. Contains a bespoke matte ceramic cone dripper, calibrated double-wall borosilicate glass carafe, hand-crank conical burr grinder, and 250g micro-lot roasted whole beans.",
    categoryId: "cat-5",
    category: "Gourmet Gift Sets",
    categorySlug: "gourmet-gift-sets",
    tags: ["gourmet", "popular"],
    moq: 30,
    startingPrice: 62.00,
    lowestPrice: 46.00,
    badge: "Popular",
    featured: false,
    rating: 4.8,
    reviewCount: 39,
    leadTime: "6-8 business days",
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop"
    ],
    priceTiers: [
      { minQuantity: 30, maxQuantity: 59, unitPrice: 62.00, savingsPercent: 0 },
      { minQuantity: 60, maxQuantity: 119, unitPrice: 56.00, savingsPercent: 10 },
      { minQuantity: 120, maxQuantity: 249, unitPrice: 50.00, savingsPercent: 19 },
      { minQuantity: 250, maxQuantity: null, unitPrice: 46.00, savingsPercent: 26 }
    ],
    variants: [
      { id: "v-rst-matte-white", name: "Matte Chalk White Ceramic", sku: "RST-COF-WHT", colorHex: "#FAFAFA", inStock: true },
      { id: "v-rst-matte-slate", name: "Matte Slate Ceramic", sku: "RST-COF-SLT", colorHex: "#475569", inStock: true }
    ],
    customizationOptions: [
      { id: "c-rst-ceramic-print", name: "Ceramic Kiln Fired Logo", type: "silk_screen", description: "Permanent high-temperature dishwasher safe logo print", setupFee: 50.00, unitCost: 2.20, placementOptions: ["Dripper Front", "Glass Carafe"], isDefault: true },
      { id: "c-rst-coffee-bag", name: "Custom Branded Coffee Bag Label", type: "uv_full_color", description: "Full-color custom labeled roast bag with your company art", setupFee: 35.00, unitCost: 1.50, placementOptions: ["Whole Bean Coffee Bag"] }
    ],
    specifications: {
      material: "High-Fire Matte Ceramic, Borosilicate Glass & Stainless Steel",
      dimensions: "Carafe Capacity: 600ml / 20oz",
      turnaroundTime: "6-8 business days",
      brandingMethods: ["Kiln Fired Ceramic Decal", "Full Color Bag Labeling"],
      packaging: "Custom foam-padded presentation gift box with gold foil lettering"
    }
  },

  // 11. Premium Apparel - Merino Quarter Zip
  {
    id: "prod-merino-quarter-zip",
    slug: "merino-loft-quarter-zip-sweater",
    name: "Merino Loft 100% Extra-Fine Merino Wool Quarter-Zip",
    tagline: "Ultra-Soft Australian Merino Wool with YKK Antique Silver Zipper",
    description: "An exceptional corporate layering piece offering natural temperature regulation, odor resistance, and an elegant tailored silhouette. Finished with rib-knit cuffs and subtle tonal embroidery.",
    categoryId: "cat-6",
    category: "Premium Apparel & Wearables",
    categorySlug: "premium-apparel",
    tags: ["apparel", "luxury", "bestseller"],
    moq: 30,
    startingPrice: 78.00,
    lowestPrice: 58.00,
    badge: "Bestseller",
    featured: true,
    rating: 4.9,
    reviewCount: 52,
    leadTime: "8-12 business days",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop"
    ],
    priceTiers: [
      { minQuantity: 30, maxQuantity: 59, unitPrice: 78.00, savingsPercent: 0 },
      { minQuantity: 60, maxQuantity: 119, unitPrice: 70.00, savingsPercent: 10 },
      { minQuantity: 120, maxQuantity: 249, unitPrice: 63.00, savingsPercent: 19 },
      { minQuantity: 250, maxQuantity: null, unitPrice: 58.00, savingsPercent: 26 }
    ],
    variants: [
      { id: "v-mrn-navy", name: "Deep Navy Melange", sku: "MRN-QZ-NVY", colorHex: "#1A243B", inStock: true },
      { id: "v-mrn-charcoal", name: "Charcoal Heather", sku: "MRN-QZ-CHR", colorHex: "#3A3A3A", inStock: true },
      { id: "v-mrn-camel", name: "Classic Camel Tan", sku: "MRN-QZ-CML", colorHex: "#C19A6B", inStock: true }
    ],
    customizationOptions: [
      { id: "c-mrn-embroidery", name: "Left Chest Tonal Embroidery", type: "embroidery", description: "Refined precision embroidery up to 6,000 stitches", setupFee: 40.00, unitCost: 3.50, placementOptions: ["Left Chest", "Right Bicep", "Back Neck Yoke"], isDefault: true },
      { id: "c-mrn-woven-label", name: "Custom Woven Neck & Hem Label", type: "custom_sleeve", description: "Bespoke woven damask brand label inside collar", setupFee: 65.00, unitCost: 1.80, placementOptions: ["Inside Collar", "Lower Left Hem"] }
    ],
    specifications: {
      material: "100% Ultra-Fine Australian Merino Wool (19.5 Micron)",
      dimensions: "Available in Unisex Sizing: XS to 3XL",
      turnaroundTime: "8-12 business days",
      brandingMethods: ["Precision Embroidery", "Woven Damask Labels"],
      packaging: "Individually folded in branded frosted matte zip-lock pouch",
      compliance: ["Woolmark Certified", "OEKO-TEX Standard 100"]
    }
  },

  // 12. Premium Apparel - Stormtech Commuter Jacket
  {
    id: "prod-stormtech-jacket",
    slug: "stormtech-commuter-waterproof-jacket",
    name: "Stormtech All-Weather Executive Commuter Jacket",
    tagline: "3-Layer 15,000mm Waterproof / Breathable Membrane with Magnetic Placket",
    description: "The ultimate all-weather shell for corporate teams and outdoor events. Fully seam-sealed, lightweight 4-way mechanical stretch fabric, interior waterproof zippered tech pockets, and low-profile tonal branding.",
    categoryId: "cat-6",
    category: "Premium Apparel & Wearables",
    categorySlug: "premium-apparel",
    tags: ["apparel", "executive", "premium"],
    moq: 25,
    startingPrice: 115.00,
    lowestPrice: 89.00,
    badge: "Executive",
    featured: false,
    rating: 4.95,
    reviewCount: 26,
    leadTime: "10-14 business days",
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop"
    ],
    priceTiers: [
      { minQuantity: 25, maxQuantity: 49, unitPrice: 115.00, savingsPercent: 0 },
      { minQuantity: 50, maxQuantity: 99, unitPrice: 104.00, savingsPercent: 10 },
      { minQuantity: 100, maxQuantity: 249, unitPrice: 95.00, savingsPercent: 17 },
      { minQuantity: 250, maxQuantity: null, unitPrice: 89.00, savingsPercent: 23 }
    ],
    variants: [
      { id: "v-stm-black", name: "Matte Blackout", sku: "STM-JKT-BLK", colorHex: "#0D0D0D", inStock: true },
      { id: "v-stm-midnight", name: "Midnight Harbor Blue", sku: "STM-JKT-BLU", colorHex: "#162238", inStock: true }
    ],
    customizationOptions: [
      { id: "c-stm-heat-seal", name: "Reflective High-Frequency Heat Transfer", type: "silk_screen", description: "Matte or reflective tonal heat-bonded logo", setupFee: 45.00, unitCost: 3.00, placementOptions: ["Left Chest", "Right Forearm", "Back Collar"], isDefault: true },
      { id: "c-stm-zipper-pull", name: "Custom Molded Rubber Zipper Pulls", type: "laser_engraving", description: "Custom 3D embossed silicone zipper tags (set of 3)", setupFee: 60.00, unitCost: 2.50, placementOptions: ["Main Front & Pocket Zippers"] }
    ],
    specifications: {
      material: "3-Layer 100% Recycled Poly Ripstop with 15k/15k Hydrophilic Membrane",
      dimensions: "Unisex Sizing: XS through 4XL",
      turnaroundTime: "10-14 business days",
      brandingMethods: ["High-Frequency Heat Seal", "Molded Zipper Pulls", "Laser Etched Patches"],
      packaging: "Branded garment bag with wooden executive coat hanger",
      compliance: ["15,000mm Waterproof", "15,000g/m² Breathability", "PFC-Free DWR"]
    }
  }
];
```

---

## 6. Query, Filter & Search Logic Specification

To ensure high performance, zero client stutter, and seamless SSR/SSG compatibility, catalog query logic should be implemented via pure functions in `src/lib/utils/catalog-filters.ts`.

### 6.1 Filter Pipeline Specification

```typescript
export interface FilterOptions {
  searchQuery?: string;
  categories?: string[];        // Category slugs
  minPrice?: number;
  maxPrice?: number;
  maxMoq?: number | null;       // Filter for products where product.moq <= maxMoq
  tags?: string[];
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'moq-asc' | 'name-asc' | 'rating-desc';
}

/**
 * Filter, search, and sort products in a pure immutable pipeline.
 */
export function queryProducts(products: Product[], options: FilterOptions): Product[] {
  const {
    searchQuery = '',
    categories = [],
    minPrice,
    maxPrice,
    maxMoq,
    tags = [],
    sortBy = 'featured'
  } = options;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = products.filter((product) => {
    // 1. Category Matching
    if (categories.length > 0) {
      const matchesCategory = categories.includes(product.categorySlug) || 
                              categories.includes(product.categoryId);
      if (!matchesCategory) return false;
    }

    // 2. MOQ Threshold Matching
    // If buyer sets MOQ filter to 50, products with MOQ <= 50 match.
    if (maxMoq !== undefined && maxMoq !== null && maxMoq > 0) {
      if (product.moq > maxMoq) return false;
    }

    // 3. Price Range Matching (Evaluated against startingPrice at MOQ)
    if (minPrice !== undefined && minPrice > 0) {
      if (product.startingPrice < minPrice) return false;
    }
    if (maxPrice !== undefined && maxPrice > 0) {
      if (product.startingPrice > maxPrice) return false;
    }

    // 4. Tags Matching
    if (tags.length > 0) {
      const matchesTag = tags.some((tag) => product.tags.includes(tag.toLowerCase()));
      if (!matchesTag) return false;
    }

    // 5. Full-Text Fuzzy/Substring Search
    if (normalizedQuery.length > 0) {
      const inName = product.name.toLowerCase().includes(normalizedQuery);
      const inTagline = product.tagline.toLowerCase().includes(normalizedQuery);
      const inDescription = product.description.toLowerCase().includes(normalizedQuery);
      const inCategory = product.category.toLowerCase().includes(normalizedQuery);
      const inTags = product.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
      const inMaterial = product.specifications.material.toLowerCase().includes(normalizedQuery);
      const inBranding = product.specifications.brandingMethods.some((b) => b.toLowerCase().includes(normalizedQuery));

      if (!inName && !inTagline && !inDescription && !inCategory && !inTags && !inMaterial && !inBranding) {
        return false;
      }
    }

    return true;
  });

  // 6. Sorting
  return filtered.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.startingPrice - b.startingPrice;
      case 'price-desc':
        return b.startingPrice - a.startingPrice;
      case 'moq-asc':
        return a.moq - b.moq;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'rating-desc':
        return (b.rating ?? 0) - (a.rating ?? 0);
      case 'featured':
      default:
        // Featured products first, then alphabetical
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
    }
  });
}
```

### 6.2 B2B Pricing Calculation Engine

```typescript
export interface PricingCalculationResult {
  quantity: number;
  isBelowMoq: boolean;
  activeTier: PriceTier;
  unitPrice: number;
  productSubtotal: number;
  customizationSetupTotal: number;
  customizationUnitTotal: number;
  customizationSubtotal: number;
  estimatedTotal: number;
  effectiveUnitCost: number;
  savingsTotal: number;
}

/**
 * Calculates real-time tiered volume pricing and customization costs.
 */
export function calculateQuotePricing(
  product: Product,
  quantity: number,
  selectedCustomizations: CustomizationOption[]
): PricingCalculationResult {
  const isBelowMoq = quantity < product.moq;

  // Resolve matching price tier
  // If quantity is below MOQ, use base tier (index 0)
  let activeTier = product.priceTiers[0];
  for (const tier of product.priceTiers) {
    if (quantity >= tier.minQuantity) {
      if (tier.maxQuantity === null || quantity <= tier.maxQuantity) {
        activeTier = tier;
        break;
      }
    }
  }

  const unitPrice = activeTier.unitPrice;
  const productSubtotal = unitPrice * quantity;

  // Customization math
  let customizationSetupTotal = 0;
  let customizationUnitTotal = 0;

  for (const opt of selectedCustomizations) {
    customizationSetupTotal += opt.setupFee;
    customizationUnitTotal += opt.unitCost * quantity;
  }

  const customizationSubtotal = customizationSetupTotal + customizationUnitTotal;
  const estimatedTotal = productSubtotal + customizationSubtotal;
  const effectiveUnitCost = quantity > 0 ? Number((estimatedTotal / quantity).toFixed(2)) : 0;
  
  // Total savings compared to base starting price without volume discount
  const baseSubtotal = product.startingPrice * quantity;
  const savingsTotal = Math.max(0, baseSubtotal - productSubtotal);

  return {
    quantity,
    isBelowMoq,
    activeTier,
    unitPrice,
    productSubtotal,
    customizationSetupTotal,
    customizationUnitTotal,
    customizationSubtotal,
    estimatedTotal,
    effectiveUnitCost,
    savingsTotal
  };
}
```

---

## 7. UI Component Specifications & Page Contracts

### 7.1 B2B Product Card (`src/components/products/ProductCard.tsx`)
Must render:
- **Visuals**: Primary high-resolution image with hover zoom/transition, image aspect ratio `4:3` or `1:1`, fallback image placeholder.
- **Badges**: Category pill and optional promotional badge (`Bestseller`, `Eco Choice`, `Executive`, `Quick Ship`).
- **Typography**: Product Title (`font-serif font-bold text-lg text-primary`), Tagline/Subtitle (`text-xs text-muted-foreground line-clamp-1`).
- **B2B Badges & MOQ**: Explicit MOQ indicator (`MOQ: ${moq} units`) styled with a distinct badge or icon.
- **Bulk Pricing**: Starting bulk price (`From $${startingPrice.toFixed(2)} / unit` or `From $${lowestPrice} at volume`).
- **CTA / Interaction**: Entire card or "View Details" button links to `/products/${slug}` with smooth hover state.

### 7.2 Product Listing Page (PLP) (`src/app/corporate-gifts/page.tsx`)
Must render:
- **Hero / Header**: Breadcrumbs (`Home > Corporate Gifts`), title, subtitle, item count display.
- **Top Toolbar**: Real-time search input with clear icon, sort dropdown (`Featured`, `Price: Low to High`, `Price: High to Low`, `MOQ: Low to High`), Mobile filter drawer toggle button.
- **Filter Sidebar (Desktop & Mobile Drawer)**:
  - Category selector (Checkboxes or pills for all 6 categories with item counts).
  - Minimum Order Quantity (MOQ) filter (Radio buttons or slider: `All MOQs`, `<= 25 units`, `<= 50 units`, `<= 100 units`).
  - Price Range filter (Dual range slider or preset brackets: `< $35`, `$35 - $75`, `$75 - $100`, `$100+`).
  - "Reset All Filters" button.
- **Product Grid**: Responsive CSS grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`), rendering `>= 6` Product Cards (default dataset has 12).
- **Empty State**: Friendly illustration/message ("No corporate gifts match your criteria") with one-click filter reset.

### 7.3 Product Detail Page (PDP) (`src/app/products/[slug]/page.tsx`)
Must render:
- **Product Image Gallery**:
  - Large main viewer with active image.
  - Interactive thumbnail strip (click/hover updates main image).
- **Header & Badges**:
  - Breadcrumbs (`Corporate Gifts > [Category] > [Product Name]`).
  - Title, Subtitle, Star Rating & Review count, Category badge.
- **Tiered Bulk Pricing Matrix**:
  - Visual table showing brackets: `Quantity`, `Unit Price`, `Savings (%)`.
  - Active tier highlighted based on the user's selected quantity input.
- **Variant Selector**:
  - Interactive colorway / material swatches or buttons (e.g. `Obsidian Black`, `Cognac Leather`).
- **Customization Options Configurator**:
  - Checkboxes/toggles for available branding methods (e.g. `Laser Engraving`, `Debossing`, `Custom Presentation Sleeve`).
  - Displays one-time setup fee + per-unit cost.
- **Quantity & Live Quote Estimator**:
  - Quantity input (with `+` / `-` buttons, prefilled with product MOQ).
  - Validation banner if entered quantity `< product.moq`.
  - Dynamic cost breakdown: Unit Price, Customization Setup Fee, Estimated Total.
- **CTAs**:
  - Primary: "Request Quote" button (triggers quote modal or navigates to `/request-quote?product=[slug]&qty=[quantity]`).
  - Secondary: "Download Spec Sheet / PDF".
- **Product Details Tabs / Accordion**:
  - Specifications (Materials, Dimensions, Weight, Country of Origin, Compliance).
  - Custom Branding Guide (Artwork guidelines, vector formats accepted, lead times).
  - Packaging & Shipping (Luxury gift box specs, multi-address drop shipping info).

---

## 8. Acceptance Criteria & Tier 1–4 Test Matrix

```
+--------------------------------------------------------------------------------------------------------------------+
| TIER 1: Static Analysis, Types & Smoke Tests                                                                       |
+---------+------------------------------------------+-----------------------------------+---------------------------+
| Test ID | Objective                                | Verification Method               | Pass Criteria             |
+---------+------------------------------------------+-----------------------------------+---------------------------+
| T1.1    | TypeScript Build Pass                    | `npm run build`                   | Exit code 0, 0 TS errors  |
| T1.2    | Type Definitions Export                  | Inspect `src/types/product.ts`    | All interfaces exported   |
| T1.3    | Mock Catalog Dataset Completeness        | Inspect `src/lib/mock-data`       | >= 12 products, 6 cats    |
| T1.4    | Route Availability (PLP & PDP)           | HTTP GET /corporate-gifts,        | HTTP Status 200 OK        |
|         |                                          | HTTP GET /products/[slug]         |                           |
+---------+------------------------------------------+-----------------------------------+---------------------------+

+--------------------------------------------------------------------------------------------------------------------+
| TIER 2: Core Feature & Happy Path Tests                                                                            |
+---------+------------------------------------------+-----------------------------------+---------------------------+
| Test ID | Feature                                  | User Action / Input               | Expected Observable Output|
+---------+------------------------------------------+-----------------------------------+---------------------------+
| T2.1    | B2B ProductCard Rendering                | Render mock product card          | Displays image, title,    |
|         |                                          |                                   | category, MOQ value, and  |
|         |                                          |                                   | starting price ($xx.xx)   |
| T2.2    | PLP Initial Load                         | Visit `/corporate-gifts`          | Renders sidebar + grid    |
|         |                                          |                                   | with >= 6 cards (12 total)|
| T2.3    | Category Filter                          | Click "Executive Tech" in sidebar | Grid filters to only tech |
|         |                                          |                                   | products (count matches)  |
| T2.4    | Search Input Filtering                   | Type "copper" or "titan" in search| Grid updates to matching  |
|         |                                          |                                   | keyword products instantly|
| T2.5    | MOQ Filter Slider/Radio                  | Select MOQ <= 25                  | Products with MOQ 50/100  |
|         |                                          |                                   | are excluded from grid    |
| T2.6    | Price Filter                             | Set Max Price to $50              | Only products with start  |
|         |                                          |                                   | price <= $50 are displayed|
| T2.7    | Card Navigation to PDP                   | Click on product card             | Navigates to correct slug |
|         |                                          |                                   | `/products/[slug]`        |
| T2.8    | PDP Gallery Interaction                  | Click thumbnail image 2           | Main image updates to #2  |
| T2.9    | PDP Bulk Pricing Table                   | Change quantity to 150            | 100-249 tier highlights   |
|         |                                          |                                   | and unit price updates    |
| T2.10   | PDP Customization Toggles                | Toggle "Laser Engraving" on/off   | Total quote estimate adds |
|         |                                          |                                   | setup fee & unit charge   |
| T2.11   | PDP Request Quote Button                 | Click "Request Quote"             | Opens quote modal or      |
|         |                                          |                                   | routes to quote form      |
+---------+------------------------------------------+-----------------------------------+---------------------------+

+--------------------------------------------------------------------------------------------------------------------+
| TIER 3: Edge Cases, Boundary Conditions & Resilience                                                               |
+---------+------------------------------------------+-----------------------------------+---------------------------+
| Test ID | Edge Case Scenario                       | Test Input                        | Expected Robust Behavior  |
+---------+------------------------------------------+-----------------------------------+---------------------------+
| T3.1    | Zero-Match Filter Combination            | Category "Drinkware" + Search "xyz"| Displays Empty State with |
|         |                                          |                                   | "Reset Filters" CTA       |
| T3.2    | Reset Filters Action                     | Click "Reset Filters" CTA         | Restores all 12 cards     |
| T3.3    | Below MOQ Quantity Input on PDP          | Enter quantity: 5 (where MOQ=25)  | Shows MOQ warning notice; |
|         |                                          |                                   | highlights MOQ minimum    |
| T3.4    | Highest Bulk Bracket Exceeded            | Enter quantity: 2,500 units       | Applies deepest discount  |
|         |                                          |                                   | tier without NaN/overflow |
| T3.5    | Non-Existent Product Slug                | Visit `/products/unknown-xyz`     | Displays clean 404 with   |
|         |                                          |                                   | link back to catalog      |
| T3.6    | Mobile Responsive Filter Drawer          | Viewport width < 768px            | Sidebar collapses to Sheet|
|         |                                          |                                   | drawer with trigger button|
+---------+------------------------------------------+-----------------------------------+---------------------------+

+--------------------------------------------------------------------------------------------------------------------+
| TIER 4: End-to-End Integration & B2B Quote Workflow                                                               |
+---------+------------------------------------------+-----------------------------------+---------------------------+
| Test ID | Workflow Step                            | Interaction Flow                  | Verifiable Result         |
+---------+------------------------------------------+-----------------------------------+---------------------------+
| T4.1    | Full Catalog-to-Quote Journey            | 1. Filter PLP by Category         | Complete journey executes |
|         |                                          | 2. Select Product Card            | without page reload errors|
|         |                                          | 3. Select Variant & Customization | or broken states.         |
|         |                                          | 4. Input Bulk Quantity            |                           |
|         |                                          | 5. Click "Request Quote"          | Quote payload prepared    |
| T4.2    | State Persistence in URL (Deep Linking)  | Visit `/corporate-gifts?category= | PLP initializes with      |
|         |                                          | luxury-drinkware&search=copper`   | matching filters active   |
+---------+------------------------------------------+-----------------------------------+---------------------------+
```

---

## 9. Next Steps for Implementation Agents

1. **Milestone 1**: Implement `src/types/product.ts`, `src/lib/mock-data/categories.ts`, and `src/lib/mock-data/products.ts` directly from these contracts.
2. **Milestone 2**: Build `src/components/products/ProductCard.tsx` consuming the `Product` type.
3. **Milestone 3**: Build `src/app/corporate-gifts/page.tsx` with sidebar filter and search logic from Section 6.
4. **Milestone 4**: Build `src/app/products/[slug]/page.tsx` with gallery, tiered table, and customization configurator.
5. **Testing Track**: Implement automated test runner and test cases corresponding to Tier 1–4 matrices.
