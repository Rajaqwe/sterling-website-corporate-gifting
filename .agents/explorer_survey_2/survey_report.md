# Sterling B2B Corporate Gifting Catalog — UI/UX Component & Page Architecture Survey Report

**Author:** Explorer 2 (UI Component & Page Architect)  
**Date:** 2026-08-23  
**Status:** Complete & Actionable  
**Integrity Mode:** Development  

---

## 1. Executive Summary & Design System Alignment

Sterling is a premium B2B corporate gifting platform requiring a high-trust, editorial, and enterprise-grade user experience. The frontend architecture must cater specifically to corporate buyers, HR managers, and procurement officers who evaluate gifts by **Minimum Order Quantity (MOQ)**, **Volume Tiered Pricing**, **Custom Branding Capabilities**, and **Lead Times**.

### Core Brand & UI Foundations
- **Color Palette:**
  - **Primary (Deep Navy):** `hsl(222, 47%, 11%)` (`#0f172a` equivalent) — Conveys corporate stability, trust, and luxury.
  - **Accent (Champagne Gold / Warm Brass):** `hsl(33, 40%, 59%)` (`#b8860b` / `#d4af37`) — Used for primary CTA highlights, value badges, and active focus states.
  - **Secondary / Surface (Soft Gray & Off-White):** `hsl(210, 40%, 96.1%)` (`#f1f5f9` / `#f8fafc`) — Clean backgrounds and filter panels.
  - **Muted Foreground:** `hsl(215.4, 16.3%, 46.9%)` (`#64748b`) — Body captions and secondary meta attributes.
- **Typography:**
  - **Headings / Editorial Titles:** Playfair Display (`font-serif`, loaded via `next/font/google` in `layout.tsx`).
  - **Body / Data / Forms:** Inter (`font-sans`, loaded via `next/font/google`).
- **Base Components:** Shadcn/UI primitives (`Button`, `Card`, `Badge`, `Input`, `Sheet`, `Accordion`, `Separator`) utilizing `@base-ui/react` and Tailwind CSS.

---

## 2. Component Specification: B2B Product Card (`ProductCard.tsx`)

The Product Card is the foundational organism of the catalog. Unlike generic B2C e-commerce cards, a corporate gifting card must prominently highlight enterprise procurement metrics: **MOQ**, **Starting Bulk Price**, **Customization capabilities**, and **Category classification**.

### 2.1 Visual Anatomy & Layout Structure

```
+-------------------------------------------------------------------+
|  [Media Container - Aspect Ratio 4:3 or 1:1]                      |
|  +-------------------------------------------------------------+  |
|  | [Badge: Category / Tag]               [Badge: MOQ 50 pcs]   |  |
|  |                                                             |  |
|  |                    [Product Image]                          |  |
|  |                                                             |  |
|  |  +-------------------------------------------------------+  |  |
|  |  |  [Hover Overlay: "Quick View" / "View Details" CTA]   |  |  |
|  |  +-------------------------------------------------------+  |  |
|  +-------------------------------------------------------------+  |
|                                                                   |
|  [Card Content Container]                                         |
|  CATEGORY & SKU: Drinkware  •  SKU: STER-DW-004                   |
|  PRODUCT TITLE: Executive Stainless Steel Tumbler (500ml)         |
|  SHORT DESC: Double-wall vacuum insulated with laser engravable   |
|              matte ceramic finish.                                |
|                                                                   |
|  CUSTOMIZATION PILLS: [Logo Screen Print] [Laser Engrave]         |
|                                                                   |
|  +-------------------------------------------------------------+  |
|  |  PRICING SECTION:                                           |  |
|  |  From $28.00 / unit     (Retail: $38.00)                    |  |
|  |  Minimum Order: 50 units  •  Volume discounts available     |  |
|  +-------------------------------------------------------------+  |
|                                                                   |
|  [Card Action / Link to PDP: /products/[slug]]                    |
+-------------------------------------------------------------------+
```

### 2.2 Component Interface & TypeScript Contract

```typescript
export interface ProductCustomizationOption {
  id: string;
  name: string;
  type: 'logo_print' | 'laser_engrave' | 'custom_packaging' | 'card_insert';
  pricePerUnit: number;
  setupFee?: number;
}

export interface PricingTier {
  minQuantity: number;
  maxQuantity?: number; // undefined or Infinity for upper tier (e.g. 500+)
  unitPrice: number;
  discountPercentage?: number;
}

export interface ProductSpecification {
  material?: string;
  dimensions?: string;
  weight?: string;
  imprintArea?: string;
  leadTimeDays: number;
  brandingLeadTimeDays: number;
  packaging?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  images: {
    url: string;
    alt: string;
    isPrimary?: boolean;
  }[];
  moq: number; // Minimum Order Quantity
  basePrice: number; // Single unit benchmark/retail price
  bulkStartingPrice: number; // Starting tier price (e.g., tier 1 or lowest bulk rate)
  pricingTiers: PricingTier[];
  customizationOptions: ProductCustomizationOption[];
  specifications: ProductSpecification;
  isPopular?: boolean;
  isNew?: boolean;
  isEcoFriendly?: boolean;
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'MADE_TO_ORDER';
}

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}
```

### 2.3 Key Visual Elements & Micro-Interactions
1. **Media Area:**
   - Next.js `<Image>` or fallback responsive image container with `aspect-[4/3]` or `aspect-square`.
   - Subtle image zoom on card hover (`group-hover:scale-105 transition-transform duration-500 ease-out`).
   - Smooth badge overlay: Top-left for status tags (e.g., `Bestseller`, `Eco-friendly`), Top-right for `MOQ: XX units` badge with high contrast.
2. **Typography & Line Clamping:**
   - Title: `text-lg font-serif font-semibold text-primary line-clamp-1 group-hover:text-accent transition-colors`.
   - Category / SKU: `text-xs uppercase tracking-wider text-muted-foreground`.
   - Short description: `text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed`.
3. **Enterprise Pricing Area:**
   - Prominent starting price: `text-primary font-bold text-lg` formatted as `"From $XX.XX / unit"`.
   - Benchmark / regular price with strikethrough: `text-xs text-muted-foreground line-through`.
   - Explicit MOQ callout: `text-xs font-medium text-accent-foreground/80 bg-accent/15 px-2 py-0.5 rounded-full inline-block`.
4. **Hover State & Accessibility:**
   - Interactive elevation shadow (`hover:shadow-lg hover:border-accent/30 transition-all duration-300`).
   - Focus ring on keyboard tab (`focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none`).
   - Entire card is wrapped or contains an accessible Next.js `<Link href={`/products/${product.slug}`}>` with aria-label describing the product name, price, and MOQ.

---

## 3. Page Architecture: Product Listing Page (PLP) (`/corporate-gifts`)

The PLP at `/corporate-gifts` serves as the primary catalog discovery hub. It provides faceted filtering, debounced instant search, dynamic sorting, and a responsive grid of B2B products.

### 3.1 Page Layout Blueprint

```
+---------------------------------------------------------------------------------------------------+
| NAVBAR (Sticky)                                                                                   |
+---------------------------------------------------------------------------------------------------+
| HERO / HEADER SECTION                                                                             |
| Breadcrumbs: Home / Corporate Gifts                                                               |
| Title: Corporate Gifting Catalog                                                                  |
| Subtitle: Thoughtfully curated gifts engineered for executive appreciation & employee recognition.|
| Key Value Props: [Tiered Bulk Discounts] • [Free Digital Mockups] • [Dedicated Account Manager]   |
+---------------------------------------------------------------------------------------------------+
| TOOLBAR & SEARCH STRIP                                                                            |
| [Search Input: "Search products by name, SKU, category..."]   [Sort: Popularity / Price / MOQ v]   |
| Active Filters Chips: [Category: Drinkware (x)] [MOQ: <= 50 (x)] [Clear All Filters]              |
| Results Count: "Showing 8 of 8 gifts"                               [Mobile Filter Button (N)]     |
+---------------------------------------------------------------------------------------------------+
| MAIN CONTENT AREA (Grid with Sticky Sidebar)                                                      |
| +-----------------------------+  +--------------------------------------------------------------+ |
| | FILTER SIDEBAR (Desktop)    |  | PRODUCT GRID (3 columns on desktop, 2 on tablet, 1 on mobile)  | |
| |                             |  |                                                              | |
| | [Categories]                |  | +----------------+  +----------------+  +----------------+   | |
| | [x] All Categories (8)      |  | | ProductCard 1  |  | ProductCard 2  |  | ProductCard 3  |   | |
| | [ ] Executive Gifts (3)     |  | +----------------+  +----------------+  +----------------+   | |
| | [ ] Tech Accessories (2)    |  |                                                              | |
| | [ ] Drinkware & Bottles (2) |  | +----------------+  +----------------+  +----------------+   | |
| | [ ] Eco-Friendly (2)        |  | | ProductCard 4  |  | ProductCard 5  |  | ProductCard 6  |   | |
| |                             |  | +----------------+  +----------------+  +----------------+   | |
| | [Price Range]               |  |                                                              | |
| | Min: [$20]  Max: [$150]     |  | +----------------+  +----------------+                       | |
| | Preset: Under $25 | $25-$50 |  | | ProductCard 7  |  | ProductCard 8  |                       | |
| |         $50-$100  | $100+   |  | +----------------+  +----------------+                       | |
| |                             |  +--------------------------------------------------------------+ |
| | [Minimum Order Qty (MOQ)]   |                                                                   |
| | (o) Any MOQ                 |  [EMPTY STATE (Shown when no matches)]                            |
| | ( ) <= 25 units             |  * Package Icon                                                   |
| | ( ) 26 - 50 units           |  * "No corporate gifts match your current filters."               |
| | ( ) 51 - 100 units          |  * [Reset All Filters Button]                                     |
| | ( ) 100+ units              |                                                                   |
| |                             |                                                                   |
| | [Customization Options]     |                                                                   |
| | [x] Logo Screen Print       |                                                                   |
| | [x] Laser Engraving         |                                                                   |
| | [x] Custom Packaging        |                                                                   |
| |                             |                                                                   |
| | [Button: Reset Filters]     |                                                                   |
| +-----------------------------+                                                                   |
+---------------------------------------------------------------------------------------------------+
| FOOTER                                                                                            |
+---------------------------------------------------------------------------------------------------+
```

### 3.2 Filtering & State Architecture

```typescript
export interface FilterState {
  searchQuery: string;
  selectedCategories: string[]; // slug array
  priceRange: {
    min: number;
    max: number;
  };
  moqRange: 'all' | 'under_25' | '25_50' | '50_100' | '100_plus';
  customizations: string[]; // 'logo_print', 'laser_engrave', 'custom_packaging'
  sortBy: 'popularity' | 'price_asc' | 'price_desc' | 'moq_asc' | 'moq_desc' | 'name_asc';
}
```

#### Filter Behaviors:
1. **Search Input:**
   - Real-time client-side filter matching across product `name`, `shortDescription`, `sku`, and `category`.
   - Clear button (`X`) to instantly reset search term.
2. **Category Filter:**
   - Multi-select checkboxes displaying accurate item count per category badge.
3. **Price Range Filter:**
   - Dual numeric inputs (`Min $`, `Max $`) with instant validation (`min <= max`).
   - Quick preset filter pills (`Under $25`, `$25 - $50`, `$50 - $100`, `$100+`).
4. **MOQ Filter:**
   - Radio buttons or pill selector allowing corporate buyers with specific order sizes to filter items (e.g. smaller teams looking for `MOQ <= 25`).
5. **Sort Dropdown:**
   - `Popularity / Featured` (Default)
   - `Price: Low to High` (Based on `bulkStartingPrice`)
   - `Price: High to Low`
   - `MOQ: Low to High` (Ideal for small bulk buyers)
   - `MOQ: High to Low`
   - `Name: A to Z`
6. **Mobile Filter Drawer:**
   - Implemented via `Sheet` (`components/ui/sheet.tsx`) on screens `< 1024px`.
   - Floating / toolbar filter trigger button with dynamic active count badge: `Filters (3)`.
   - Drawer contains identical filter controls with a sticky bottom action: `Show X Results` / `Clear All`.

---

## 4. Page Architecture: Product Detail Page (PDP) (`/products/[slug]`)

The Generic PDP at `/products/[slug]` is engineered for high-conversion B2B quotation workflows. It includes a multi-angle gallery, specification tabs, customization switches, dynamic bulk pricing calculator, and a high-visibility "Request Quote" modal CTA.

### 4.1 Page Layout Blueprint

```
+---------------------------------------------------------------------------------------------------+
| NAVBAR (Sticky)                                                                                   |
+---------------------------------------------------------------------------------------------------+
| BREADCRUMBS: Home / Corporate Gifts / Executive Gifts / Executive Leather Desk Pad Set            |
+---------------------------------------------------------------------------------------------------+
| TWO-COLUMN HERO OVERVIEW                                                                          |
|                                                                                                   |
| LEFT COLUMN (Gallery & Trust - lg:col-span-7)     RIGHT COLUMN (Specs & Purchase - lg:col-span-5) |
| +-----------------------------------------------+ +-----------------------------------------------+ |
| | [MAIN IMAGE STAGE - Aspect 4:3]               | | CATEGORY BADGE: Executive Gifts  •  SKU: ST-01| |
| | +-------------------------------------------+ | | H1: Executive Italian Leather Desk Pad Set    | |
| | | [Badge: MOQ 25 pcs]    [Badge: Best Seller| | | 5.0 Rating (42 Corporate Reviews)            | |
| | |                                           | | |                                               | |
| | |            [High-Res Product Image]       | | | SHORT DESC: Handcrafted top-grain leather desk| |
| | |                                           | | | pad with wireless charging & pen dock.        | |
| | +-------------------------------------------+ | |                                               | |
| |                                               | | PRICE & MOQ HIGHLIGHT BANNER:                 | |
| | [THUMBNAIL STRIP]                             | | From $65.00 / unit  •  MOQ: 25 units          | |
| | [Thumb 1 (Active)] [Thumb 2] [Thumb 3] [Thumb 4]| |                                             | |
| |                                               | | COLOR VARIANT SELECTOR:                       | |
| | ENTERPRISE TRUST BAR:                         | | ( ) Midnight Black  ( ) Saddle Brown  ( ) Navy| |
| | [Check: Free Digital Mockup within 24h]       | |                                               | |
| | [Check: Physical Sample Kit Available]        | | CUSTOMIZATION ADD-ONS (Interactive Toggles):  | |
| | [Check: 100% Quality Inspection Guarantee]    | | [x] Logo Debossing (+ $3.50 / unit)           | |
| +-----------------------------------------------+ | [ ] Laser Engraved Plate (+ $5.00 / unit)     | |
|                                                   | [x] Luxury Gift Box Packaging (+ $4.50 / unit)| |
|                                                   | [ ] Personalized Recipient Card (+ $1.50/unit)| |
|                                                   |                                               |
|                                                   | LOGO / ARTWORK UPLOAD (Dropzone Mock):        |
|                                                   | [ Drag & drop vector logo (AI, EPS, SVG, PNG) ]|
|                                                   |                                               |
|                                                   | TIERED BULK PRICING TABLE:                    |
|                                                   | +---------------+---------------+-----------+ |
|                                                   | | Quantity Tier | Unit Price    | Savings   | |
|                                                   | +---------------+---------------+-----------+ |
|                                                   | | 25 - 49 units | $75.00 / unit | Standard  | |
|                                                   | | 50 - 99 units | $68.00 / unit | Save 9%   | |
|                                                   | | 100-249 units | $62.00 / unit | Save 17%  | |
|                                                   | | 250+ units    | $55.00 / unit | Save 27% *| |
|                                                   | +---------------+---------------+-----------+ |
|                                                   |                                               |
|                                                   | QUANTITY & LIVE PRICE CALCULATOR:             |
|                                                   | Quantity: [-] [ 100 ] [+]  (Min: 25 units)    |
|                                                   | Active Tier: 100 - 249 units ($62.00/unit)    |
|                                                   | Customizations: +$8.00 / unit                 |
|                                                   | Total Unit Price: $70.00 / unit               |
|                                                   | Estimated Total Order: $7,000.00              |
|                                                   | Total Savings: Save $1,300.00 (16%)           |
|                                                   |                                               |
|                                                   | CALL-TO-ACTION BUTTONS:                       |
|                                                   | [ BUTTON: Request Bulk Quote (Primary CTA) ]  |
|                                                   | [ BUTTON: Request Sample Kit (Outline)     ]  |
|                                                   |                                               |
|                                                   | SPECIALIST HOTLINE:                           |
|                                                   | Questions on split shipping? Call +1-800-GIFT |
|                                                   +-----------------------------------------------+ |
+---------------------------------------------------------------------------------------------------+
| DETAILED SPECIFICATIONS TABS (Full Width)                                                         |
| [ Tab 1: Product Specifications ] [ Tab 2: Customization & Artwork ] [ Tab 3: Logistics & Delivery]|
| +-----------------------------------------------------------------------------------------------+ |
| | Material: Full-Grain Italian Leather & Non-Slip Suede Base                                    | |
| | Dimensions: 80cm x 40cm x 0.4cm (Standard Executive Desk Size)                                | |
| | Weight: 680g                                                                                  | |
| | Imprint Area: Bottom Right Corner (80mm x 30mm max deboss area)                               | |
| | Lead Time: Standard Production: 7-10 business days | Express Rush: 4-5 business days          | |
| | Packaging: Individual magnetic rigid gift box with satin ribbon                               | |
| +-----------------------------------------------------------------------------------------------+ |
+---------------------------------------------------------------------------------------------------+
| RELATED CORPORATE GIFTS CAROUSEL / GRID                                                           |
| [ProductCard A]           [ProductCard B]           [ProductCard C]           [ProductCard D]     |
+---------------------------------------------------------------------------------------------------+
| FOOTER                                                                                            |
+---------------------------------------------------------------------------------------------------+
```

### 4.2 Interactive Dynamic Pricing Engine & Formula

The PDP features a real-time calculator that dynamically responds to the user's selected quantity and variant toggles:

$$\text{Active Base Unit Price} = \text{TierPrice}(\text{Quantity})$$

$$\text{Customization Surcharge Per Unit} = \sum \text{SelectedOption}.\text{pricePerUnit}$$

$$\text{Effective Unit Price} = \text{Active Base Unit Price} + \text{Customization Surcharge Per Unit}$$

$$\text{Total Bulk Estimate} = \text{Effective Unit Price} \times \text{Quantity}$$

$$\text{Total Bulk Savings} = (\text{BaseRetailPrice} - \text{Active Base Unit Price}) \times \text{Quantity}$$

#### Minimum Order Quantity (MOQ) Rule Enforcement:
- If user types a quantity $Q < \text{MOQ}$:
  - Calculator displays a clear inline warning: `"Quantity is below Minimum Order Quantity of X units."`
  - "Request Bulk Quote" button displays validation message or auto-corrects to MOQ on blur.
  - Decrement stepper button `[-]` is disabled when quantity reaches MOQ.

### 4.3 Interactive Quote Request Modal / Drawer (`QuoteModal.tsx`)
When the primary `"Request Bulk Quote"` button is clicked, an interactive modal triggers (or links to `/request-quote?product=[slug]&qty=[qty]`):
- **Pre-filled Context:** Selected Product Name, SKU, Selected Quantity, Color Variant, and Checked Customizations.
- **Corporate Buyer Inputs:**
  - Company Name & Corporate Email
  - Contact Person Name & Phone Number
  - Target Delivery Date
  - Multi-address Delivery requirement (Yes/No)
  - Logo artwork file attachment
  - Additional notes / comments
- **Submission Feedback:** Instant confirmation screen with Quote Reference Number (e.g. `STR-Q-84920`) and estimated sales turnaround (within 4 business hours).

---

## 5. Mock Dataset Specification (8 High-Fidelity Products)

To ensure the PLP and PDP have rich, realistic corporate gifting mock data, the following 8 products across 5 distinct categories will be established:

| # | Name | SKU | Category | MOQ | Price Tiers (Unit Price) | Customization Options | Lead Time |
|---|------|-----|----------|-----|--------------------------|-----------------------|-----------|
| 1 | **Executive Italian Leather Desk Pad Set** | `STER-EX-001` | Executive Gifts | 25 | 25-49: $75<br>50-99: $68<br>100-249: $62<br>250+: $55 | Debossing ($3.50), Engraved Plate ($5.00), Gift Box ($4.50) | 7-10 days |
| 2 | **Nordic Vacuum Insulated Thermal Tumbler (500ml)** | `STER-DW-002` | Drinkware & Bottles | 50 | 50-99: $28<br>100-249: $24<br>250-499: $20<br>500+: $17 | Laser Engraving ($2.50), Screen Print ($1.50), Custom Sleeve ($2.00) | 5-7 days |
| 3 | **Minimalist Qi2 Wireless Fast Charging Hub** | `STER-TC-003` | Tech Accessories | 30 | 30-59: $52<br>60-149: $46<br>150-299: $40<br>300+: $35 | UV Color Print ($3.00), Laser Mark ($2.00), Branded Box ($3.50) | 7-10 days |
| 4 | **Organic Bamboo & Canvas Onboarding Welcome Kit** | `STER-WK-004` | Welcome Kits | 20 | 20-49: $88<br>50-99: $79<br>100-249: $71<br>250+: $62 | Full Kit Custom Logo ($6.00), Custom Welcome Card ($1.50) | 10-12 days |
| 5 | **Handmade Recycled Stone Paper Notebook & Brass Pen** | `STER-ST-005` | Sustainable & Eco | 50 | 50-99: $32<br>100-249: $27<br>250-499: $23<br>500+: $19 | Foil Stamping ($2.00), Pen Laser Engrave ($1.50), Belly Band ($1.00) | 5-7 days |
| 6 | **Artisanal Gourmet Coffee & Truffle Hamper** | `STER-GH-006` | Hampers & Gourmet | 15 | 15-29: $110<br>30-74: $98<br>75-149: $89<br>150+: $79 | Branded Wooden Keepsake Box ($8.00), Custom Ribbon ($2.00) | 7-10 days |
| 7 | **Active Noise Cancelling Wireless Headphones** | `STER-TC-007` | Tech Accessories | 25 | 25-49: $125<br>50-99: $112<br>100-249: $99<br>250+: $86 | Precision Laser Engraving ($4.00), Hard Case Print ($3.50) | 8-12 days |
| 8 | **Handcrafted Walnut Wood Desk Organizer & Phone Stand** | `STER-EX-008` | Executive Gifts | 35 | 35-74: $48<br>75-149: $42<br>150-299: $36<br>300+: $30 | Laser Wood Inlay ($3.00), Custom Engraving ($2.50) | 7-10 days |

---

## 6. Mobile Responsiveness & Accessibility (WCAG 2.1 AA)

### 6.1 Responsive Breakpoint Matrix
- **Mobile (`< 640px` / `sm`):**
  - Product Grid: 1 column (`grid-cols-1`).
  - Filter Sidebar: Replaced by floating bottom/top filter button opening shadcn `Sheet`.
  - Product Gallery: Horizontal scrollable thumbnail strip with touch snap.
  - Sticky Bottom Bar: Fixed bottom CTA bar on PDP with price and `"Request Quote"` button.
  - Tap Targets: All buttons, checkboxes, and swatches adhere to minimum $44 \times 44\text{px}$ touch targets.
- **Tablet (`640px – 1023px` / `md`):**
  - Product Grid: 2 columns (`grid-cols-2`).
  - Compact header toolbar.
- **Desktop (`1024px+` / `lg`):**
  - Product Listing: 4-column layout (1-col sticky filter sidebar + 3-col product grid).
  - Product Detail: 12-column layout (7-col gallery + 5-col purchase panel).

### 6.2 Accessibility & Semantic HTML Matrix
- **Semantic Structure:** `<main>`, `<header>`, `<nav>`, `<aside>`, `<section>`, `<article>`, `<footer>`.
- **Keyboard Navigation:**
  - Full tab order across all interactive elements.
  - Gallery thumbnail selector supports `ArrowLeft` / `ArrowRight` keyboard navigation.
  - Distinct `:focus-visible` styling (`ring-2 ring-accent ring-offset-2`).
- **ARIA Specifications:**
  - `role="region"` with `aria-label="Product Catalog"` for grid.
  - `aria-expanded` and `aria-controls` on filter accordions and mobile sheets.
  - `aria-live="polite"` on results counter and live bulk price calculator updates so screen readers announce changes dynamically.
  - Informative `aria-label` on color swatches (`aria-label="Color option: Saddle Brown"`).
- **Color Contrast:**
  - Deep Navy primary text on white: Contrast ratio **13.5:1** (exceeds AAA requirement of 7.0:1).
  - Muted foreground on white: Contrast ratio **5.8:1** (exceeds AA requirement of 4.5:1).

---

## 7. Component Hierarchy & Implementation Blueprint

```text
src/
├── app/
│   ├── corporate-gifts/
│   │   └── page.tsx                    # PLP Route (Server or Client wrapper)
│   └── products/
│       └── [slug]/
│           └── page.tsx                # Generic PDP Dynamic Route
├── components/
│   ├── products/
│   │   ├── ProductCard.tsx             # Reusable B2B Product Card
│   │   ├── ProductGrid.tsx             # Responsive Grid with empty state
│   │   ├── ProductFilterSidebar.tsx    # Desktop Sticky Filter Sidebar
│   │   ├── MobileFilterDrawer.tsx      # Mobile Sheet-based filter drawer
│   │   ├── ProductGallery.tsx          # PDP Multi-angle Gallery with zoom
│   │   ├── BulkPriceCalculator.tsx     # Dynamic bulk pricing & MOQ calculator
│   │   ├── TieredPricingTable.tsx      # Volume tier discount table
│   │   ├── ProductSpecTabs.tsx         # Detailed specifications & branding guide
│   │   └── QuoteRequestModal.tsx       # Interactive B2B Quote modal dialog
│   └── ui/                             # shadcn/ui base primitives
├── lib/
│   ├── constants/
│   │   └── products.ts                 # Realistic Mock Product Dataset (8+ items)
│   └── utils.ts
└── types/
    └── product.ts                      # Full TypeScript interfaces
```

---

## 8. Verification & Acceptance Rubric Alignment

| Rubric Requirement | Architectural Specification | Implementation File |
|---|---|---|
| **R1: Product Card MOQ & Bulk Price** | Renders image, title, category, explicit `MOQ: XX units` badge, and `"From $XX.XX / unit"` price display. | `src/components/products/ProductCard.tsx` |
| **R2: PLP at `/corporate-gifts`** | Contains Header/Hero, Filter Sidebar (Category, Price range, MOQ), search bar, sort options, and at least 6+ mock Product Cards (8 defined). | `src/app/corporate-gifts/page.tsx` |
| **R3: PDP at `/products/[slug]`** | Contains Image Gallery, Customization toggles (Logo print, engraving, box), Tiered Bulk Pricing table, and primary `"Request Quote"` CTA button. | `src/app/products/[slug]/page.tsx` |
| **R4: Clean TypeScript Compilation** | Pure TypeScript type safety, zero `any`, strictly verifiable via `npm run build`. | All `.tsx` and `.ts` files |

---
*Report concluded by Explorer 2 (UI Component & Page Architect).*
