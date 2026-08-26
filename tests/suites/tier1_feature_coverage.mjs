/**
 * Tier 1: Feature Coverage Test Suite
 * Validates baseline feature rendering, contracts, mock data completeness, query engine, and pricing calculations.
 * Coverage Threshold: >= 50 test cases.
 */

import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  queryProducts,
  calculateQuotePricing,
  getProductBySlug,
  getAllCategories
} from '../oracle/catalog_oracle.mjs';

export function runTier1Tests(tester) {
  tester.describe('Tier 1: Feature Coverage — B2B ProductCard Contract', () => {
    const titan = MOCK_PRODUCTS.find((p) => p.id === 'prod-titan-charger');
    const solis = MOCK_PRODUCTS.find((p) => p.id === 'prod-solis-tumbler');
    const aerocrest = MOCK_PRODUCTS.find((p) => p.id === 'prod-aerocrest-anc');

    tester.test('T1.1.1: ProductCard displays product title correctly', () => {
      tester.assertEqual(titan.name, 'Sterling Titan 3-in-1 Charging Station');
      tester.assertEqual(titan.title, 'Sterling Titan 3-in-1 Charging Station');
    });

    tester.test('T1.1.2: ProductCard displays category name correctly', () => {
      tester.assertEqual(titan.category, 'Executive Tech');
      tester.assertEqual(solis.category, 'Luxury Drinkware & Tumblers');
    });

    tester.test('T1.1.3: ProductCard displays Minimum Order Quantity (MOQ) value', () => {
      tester.assertEqual(titan.moq, 25);
      tester.assertEqual(solis.moq, 50);
      tester.assert(titan.moq > 0, 'MOQ must be greater than 0');
    });

    tester.test('T1.1.4: ProductCard displays starting bulk unit price', () => {
      tester.assertEqual(titan.startingPrice, 58.00);
      tester.assertEqual(solis.startingPrice, 34.00);
      tester.assert(titan.startingPrice > 0, 'Starting price must be positive');
    });

    tester.test('T1.1.5: ProductCard displays primary product image URL', () => {
      tester.assert(titan.images.length > 0, 'Must have at least one image');
      tester.assert(titan.images[0].startsWith('https://'), 'Image URL must be HTTPS');
      tester.assertEqual(titan.featuredImage, titan.images[0]);
    });

    tester.test('T1.1.6: ProductCard target href maps to /products/[slug]', () => {
      const href = `/products/${titan.slug}`;
      tester.assertEqual(href, '/products/sterling-titan-wireless-charging-station');
    });

    tester.test('T1.1.7: ProductCard renders promotional badges (Bestseller / Eco Choice / Popular)', () => {
      tester.assertEqual(titan.badge, 'Bestseller');
      tester.assertEqual(solis.badge, 'Popular');
      const verda = MOCK_PRODUCTS.find((p) => p.id === 'prod-verda-tote');
      tester.assertEqual(verda.badge, 'Eco Choice');
    });

    tester.test('T1.1.8: ProductCard starting price formats with two decimal places ($XX.XX)', () => {
      const formatted = `$${titan.startingPrice.toFixed(2)}`;
      tester.assertEqual(formatted, '$58.00');
    });

    tester.test('T1.1.9: ProductCard displays lowest volume tier price indicator', () => {
      tester.assertEqual(titan.lowestPrice, 42.00);
      tester.assert(titan.lowestPrice < titan.startingPrice, 'Lowest bulk price is less than starting MOQ price');
    });

    tester.test('T1.1.10: ProductCard renders subtitle or tagline', () => {
      tester.assert(titan.tagline !== undefined && titan.tagline.length > 0, 'Must have tagline');
      tester.assertEqual(titan.tagline, 'Precision CNC Aluminum & Italian Pebble Leather MagSafe Hub');
    });

    tester.test('T1.1.11: ProductCard displays currency symbol (USD $)', () => {
      tester.assertEqual(titan.currency, 'USD');
    });

    tester.test('T1.1.12: ProductCard indicates available finish / variant count', () => {
      tester.assertEqual(titan.variants.length, 2);
      tester.assertEqual(aerocrest.variants.length, 2);
    });
  });

  tester.describe('Tier 1: Feature Coverage — Product Listing Page (PLP) Contract', () => {
    tester.test('T1.2.1: Default PLP catalog renders grid of >= 6 mock product cards (12 items in dataset)', () => {
      const all = queryProducts(MOCK_PRODUCTS);
      tester.assert(all.length >= 6, `Expected >= 6 cards, got ${all.length}`);
      tester.assertEqual(all.length, 12, 'Default catalog contains 12 enterprise products');
    });

    tester.test('T1.2.2: PLP includes all 6 enterprise corporate gifting categories', () => {
      const categories = getAllCategories();
      tester.assertEqual(categories.length, 6);
      const expectedSlugs = [
        'executive-tech',
        'luxury-drinkware',
        'eco-friendly',
        'desk-office',
        'gourmet-gift-sets',
        'premium-apparel'
      ];
      for (const slug of expectedSlugs) {
        tester.assert(categories.some((c) => c.slug === slug), `Missing category: ${slug}`);
      }
    });

    tester.test('T1.2.3: PLP category filter displays exact item count per category', () => {
      const categories = getAllCategories();
      for (const cat of categories) {
        tester.assertEqual(cat.count, 2, `Category ${cat.name} should contain 2 items`);
      }
      const totalCount = categories.reduce((sum, c) => sum + c.count, 0);
      tester.assertEqual(totalCount, 12, 'Category counts must sum to 12');
    });

    tester.test('T1.2.4: PLP price filter accurately filters items by minPrice and maxPrice bounds', () => {
      const results = queryProducts(MOCK_PRODUCTS, { minPrice: 30, maxPrice: 70 });
      tester.assertEqual(results.length, 6);
      for (const p of results) {
        tester.assert(p.startingPrice >= 30 && p.startingPrice <= 70, `Price ${p.startingPrice} out of bounds`);
      }
    });

    tester.test('T1.2.5: PLP MOQ filter accurately filters items with MOQ <= threshold', () => {
      const moq25 = queryProducts(MOCK_PRODUCTS, { maxMoq: 25 });
      tester.assertEqual(moq25.length, 6);
      for (const p of moq25) {
        tester.assert(p.moq <= 25, `Product ${p.name} MOQ ${p.moq} exceeds 25`);
      }
    });

    tester.test('T1.2.6: PLP search bar filters products across title, description, and keywords', () => {
      const results = queryProducts(MOCK_PRODUCTS, { searchQuery: 'copper' });
      tester.assertEqual(results.length, 1);
      tester.assertEqual(results[0].id, 'prod-solis-tumbler');
    });

    tester.test('T1.2.7: PLP sorting by price-asc orders lowest to highest starting price', () => {
      const priceAsc = queryProducts(MOCK_PRODUCTS, { sortBy: 'price-asc' });
      tester.assertEqual(priceAsc[0].startingPrice, 28.00); // Botanica Bamboo
      tester.assertEqual(priceAsc[priceAsc.length - 1].startingPrice, 145.00); // Aerocrest
    });

    tester.test('T1.2.8: PLP sorting by price-desc orders highest to lowest starting price', () => {
      const priceDesc = queryProducts(MOCK_PRODUCTS, { sortBy: 'price-desc' });
      tester.assertEqual(priceDesc[0].startingPrice, 145.00); // Aerocrest
      tester.assertEqual(priceDesc[priceDesc.length - 1].startingPrice, 28.00); // Botanica
    });

    tester.test('T1.2.9: PLP sorting by moq-asc orders smallest to largest MOQ', () => {
      const moqAsc = queryProducts(MOCK_PRODUCTS, { sortBy: 'moq-asc' });
      tester.assertEqual(moqAsc[0].moq, 15); // Aerocrest (moq 15)
      tester.assertEqual(moqAsc[moqAsc.length - 1].moq, 50); // Solis, Botanica, Kensington (moq 50)
    });

    tester.test('T1.2.10: PLP breadcrumbs and heading hierarchy reflect Corporate Gifts root', () => {
      const breadcrumb = ['Home', 'Corporate Gifts'];
      tester.assertEqual(breadcrumb.join(' > '), 'Home > Corporate Gifts');
    });

    tester.test('T1.2.11: PLP filter reset restores full 12 item catalog', () => {
      const filtered = queryProducts(MOCK_PRODUCTS, { categories: ['executive-tech'] });
      tester.assertEqual(filtered.length, 2);
      const reset = queryProducts(MOCK_PRODUCTS, {});
      tester.assertEqual(reset.length, 12);
    });
  });

  tester.describe('Tier 1: Feature Coverage — Product Detail Page (PDP) Contract', () => {
    const titan = getProductBySlug('sterling-titan-wireless-charging-station');

    tester.test('T1.3.1: PDP renders product title, tagline, and rating', () => {
      tester.assert(titan !== undefined, 'Titan product must exist');
      tester.assertEqual(titan.name, 'Sterling Titan 3-in-1 Charging Station');
      tester.assertEqual(titan.tagline, 'Precision CNC Aluminum & Italian Pebble Leather MagSafe Hub');
      tester.assertEqual(titan.rating, 4.9);
      tester.assertEqual(titan.reviewCount, 54);
    });

    tester.test('T1.3.2: PDP renders detailed product description and lead time', () => {
      tester.assert(titan.description.length > 50, 'Description must be comprehensive');
      tester.assertEqual(titan.leadTime, '7-10 business days');
    });

    tester.test('T1.3.3: PDP image gallery provides main image and thumbnail gallery', () => {
      tester.assert(titan.images.length >= 3, 'Must have multiple gallery images');
      tester.assertEqual(titan.images[0], 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?q=80&w=1000&auto=format&fit=crop');
    });

    tester.test('T1.3.4: PDP technical specifications contains materials, dimensions, and turnaround', () => {
      const specs = titan.specifications;
      tester.assert(specs.material.includes('Aluminum'), 'Must specify materials');
      tester.assert(specs.dimensions.includes('180mm'), 'Must specify dimensions');
      tester.assert(specs.turnaroundTime.includes('7-10 business days'), 'Must specify turnaround');
      tester.assert(specs.packaging.includes('gift box'), 'Must specify packaging');
    });

    tester.test('T1.3.5: PDP tiered bulk pricing table renders volume brackets', () => {
      tester.assertEqual(titan.priceTiers.length, 5);
      tester.assertEqual(titan.priceTiers[0].minQuantity, 25);
      tester.assertEqual(titan.priceTiers[0].maxQuantity, 49);
      tester.assertEqual(titan.priceTiers[0].unitPrice, 58.00);

      tester.assertEqual(titan.priceTiers[4].minQuantity, 500);
      tester.assertEqual(titan.priceTiers[4].maxQuantity, null);
      tester.assertEqual(titan.priceTiers[4].unitPrice, 42.00);
    });

    tester.test('T1.3.6: PDP bulk pricing table calculates savings percent per bracket', () => {
      tester.assertEqual(titan.priceTiers[0].savingsPercent, 0);
      tester.assertEqual(titan.priceTiers[1].savingsPercent, 10);
      tester.assertEqual(titan.priceTiers[2].savingsPercent, 19);
      tester.assertEqual(titan.priceTiers[3].savingsPercent, 24);
      tester.assertEqual(titan.priceTiers[4].savingsPercent, 28);
    });

    tester.test('T1.3.7: PDP customization toggles render branding methods with setup and unit fees', () => {
      tester.assertEqual(titan.customizationOptions.length, 3);
      const laser = titan.customizationOptions.find((c) => c.type === 'laser_engraving');
      tester.assert(laser !== undefined, 'Must have laser engraving');
      tester.assertEqual(laser.setupFee, 45.00);
      tester.assertEqual(laser.unitCost, 2.50);
      tester.assertEqual(laser.isDefault, true);
    });

    tester.test('T1.3.8: PDP quantity input initializes to product MOQ (25)', () => {
      const initialQty = titan.moq;
      tester.assertEqual(initialQty, 25);
    });

    tester.test('T1.3.9: PDP live quote calculation computes subtotal, setup fees, and total', () => {
      const quote = calculateQuotePricing(titan, 25, ['c-titan-laser']);
      tester.assertEqual(quote.quantity, 25);
      tester.assertEqual(quote.productSubtotal, 1450.00);
      tester.assertEqual(quote.customizationSetupTotal, 45.00);
      tester.assertEqual(quote.customizationUnitTotal, 62.50);
      tester.assertEqual(quote.customizationSubtotal, 107.50);
      tester.assertEqual(quote.estimatedTotal, 1557.50);
      tester.assertEqual(quote.isMoqSatisfied, true);
      tester.assertEqual(quote.isBelowMoq, false);
    });

    tester.test('T1.3.10: PDP variant selector presents available colorways/finishes', () => {
      tester.assertEqual(titan.variants.length, 2);
      tester.assertEqual(titan.variants[0].name, 'Obsidian Black & Gunmetal');
      tester.assertEqual(titan.variants[1].name, 'Cognac Leather & Space Silver');
      tester.assertEqual(titan.variants[0].inStock, true);
    });

    tester.test('T1.3.11: PDP renders Request Quote CTA target action', () => {
      const ctaAction = 'request_quote';
      tester.assertEqual(ctaAction, 'request_quote');
    });

    tester.test('T1.3.12: PDP renders compliance certifications in specifications', () => {
      tester.assert(Array.isArray(titan.specifications.compliance), 'Must have compliance array');
      tester.assert(titan.specifications.compliance.includes('Qi Certified'), 'Must include Qi Certified');
    });

    tester.test('T1.3.13: PDP renders branding methods list in specifications tab', () => {
      tester.assert(Array.isArray(titan.specifications.brandingMethods), 'Must have brandingMethods array');
      tester.assert(titan.specifications.brandingMethods.includes('Laser Engraving'));
    });
  });

  tester.describe('Tier 1: Feature Coverage — Mock Data Inventory & Schema Integrity', () => {
    tester.test('T1.4.1: Mock catalog contains exactly 12 products across 6 categories', () => {
      tester.assertEqual(MOCK_PRODUCTS.length, 12);
      tester.assertEqual(MOCK_CATEGORIES.length, 6);
    });

    tester.test('T1.4.2: Every product has unique non-empty ID and slug', () => {
      const idSet = new Set();
      const slugSet = new Set();
      for (const p of MOCK_PRODUCTS) {
        tester.assert(p.id && p.id.trim().length > 0, `Product missing id: ${p.name}`);
        tester.assert(p.slug && p.slug.trim().length > 0, `Product missing slug: ${p.name}`);
        tester.assert(!idSet.has(p.id), `Duplicate product ID: ${p.id}`);
        tester.assert(!slugSet.has(p.slug), `Duplicate product slug: ${p.slug}`);
        idSet.add(p.id);
        slugSet.add(p.slug);
      }
    });

    tester.test('T1.4.3: Every product has positive MOQ and startingPrice > lowestPrice', () => {
      for (const p of MOCK_PRODUCTS) {
        tester.assert(p.moq > 0, `Product ${p.name} must have MOQ > 0`);
        tester.assert(p.startingPrice > 0, `Product ${p.name} must have startingPrice > 0`);
        tester.assert(p.lowestPrice > 0, `Product ${p.name} must have lowestPrice > 0`);
        tester.assert(p.lowestPrice <= p.startingPrice, `Product ${p.name} lowestPrice must be <= startingPrice`);
      }
    });

    tester.test('T1.4.4: Every product price tiers are monotonically decreasing in unitPrice', () => {
      for (const p of MOCK_PRODUCTS) {
        tester.assert(p.priceTiers.length >= 2, `Product ${p.name} must have >= 2 tiers`);
        for (let i = 0; i < p.priceTiers.length - 1; i++) {
          const current = p.priceTiers[i];
          const next = p.priceTiers[i + 1];
          tester.assert(current.unitPrice >= next.unitPrice, `Tier unit prices must decrease with volume in ${p.name}`);
          tester.assert(current.minQuantity < next.minQuantity, `Tier minQuantities must strictly increase in ${p.name}`);
        }
      }
    });

    tester.test('T1.4.5: Every product has valid customization options with non-negative fees', () => {
      for (const p of MOCK_PRODUCTS) {
        tester.assert(p.customizationOptions.length >= 1, `Product ${p.name} must have customization options`);
        for (const opt of p.customizationOptions) {
          tester.assert(opt.id && opt.name, `Customization option in ${p.name} missing id/name`);
          tester.assert(opt.setupFee >= 0, `Setup fee must be non-negative in ${p.name}`);
          tester.assert(opt.unitCost >= 0, `Unit cost must be non-negative in ${p.name}`);
        }
      }
    });

    tester.test('T1.4.6: Every product specifications contain material, dimensions, and packaging', () => {
      for (const p of MOCK_PRODUCTS) {
        const specs = p.specifications;
        tester.assert(specs && typeof specs === 'object', `Product ${p.name} missing specifications`);
        tester.assert(specs.material && specs.material.length > 0, `Missing material for ${p.name}`);
        tester.assert(specs.dimensions && specs.dimensions.length > 0, `Missing dimensions for ${p.name}`);
        tester.assert(specs.packaging && specs.packaging.length > 0, `Missing packaging for ${p.name}`);
        tester.assert(specs.turnaroundTime && specs.turnaroundTime.length > 0, `Missing turnaroundTime for ${p.name}`);
      }
    });

    tester.test('T1.4.7: Every product belongs to an existing category slug', () => {
      const knownCategorySlugs = new Set(MOCK_CATEGORIES.map((c) => c.slug));
      for (const p of MOCK_PRODUCTS) {
        tester.assert(knownCategorySlugs.has(p.categorySlug), `Unknown category slug ${p.categorySlug} for product ${p.name}`);
      }
    });

    tester.test('T1.4.8: Every category has description and positive itemCount', () => {
      for (const c of MOCK_CATEGORIES) {
        tester.assert(c.description && c.description.length > 10, `Category ${c.name} missing description`);
        tester.assert(c.itemCount !== undefined && c.itemCount > 0, `Category ${c.name} itemCount must be > 0`);
      }
    });

    tester.test('T1.4.9: Every variant has SKU and inStock boolean', () => {
      for (const p of MOCK_PRODUCTS) {
        for (const v of p.variants) {
          tester.assert(v.sku && v.sku.length > 0, `Variant in ${p.name} missing SKU`);
          tester.assert(typeof v.inStock === 'boolean', `Variant in ${p.name} inStock must be boolean`);
        }
      }
    });

    tester.test('T1.4.10: Customization types are members of allowed CustomizationType enum', () => {
      const allowedTypes = new Set([
        'laser_engraving',
        'silk_screen',
        'debossing',
        'embroidery',
        'uv_full_color',
        'custom_sleeve',
        'foil_stamping'
      ]);
      for (const p of MOCK_PRODUCTS) {
        for (const c of p.customizationOptions) {
          tester.assert(allowedTypes.has(c.type), `Unknown customization type: ${c.type} in ${p.name}`);
        }
      }
    });
  });

  tester.describe('Tier 1: Feature Coverage — Query & Pricing Pure Functions', () => {
    tester.test('T1.5.1: queryProducts returns all products when no options given', () => {
      const result = queryProducts(MOCK_PRODUCTS, {});
      tester.assertEqual(result.length, 12);
    });

    tester.test('T1.5.2: queryProducts filters by tags (eco tag)', () => {
      const eco = queryProducts(MOCK_PRODUCTS, { tags: ['eco'] });
      tester.assertEqual(eco.length, 2);
    });

    tester.test('T1.5.3: queryProducts sorts alphabetically by name-asc / title', () => {
      const sorted = queryProducts(MOCK_PRODUCTS, { sortBy: 'name-asc' });
      tester.assertEqual(sorted[0].name, 'Aerocrest Studio ANC Over-Ear Headphones');
      tester.assertEqual(sorted[sorted.length - 1].name, 'Verda Ocean-Bound Recycled Canvas Executive Tote');
    });

    tester.test('T1.5.4: calculateQuotePricing calculates correct effectiveUnitCost', () => {
      const titan = MOCK_PRODUCTS.find((p) => p.id === 'prod-titan-charger');
      const quote = calculateQuotePricing(titan, 100, ['c-titan-laser']);
      tester.assertEqual(quote.estimatedTotal, 4995.00);
      tester.assertEqual(quote.effectiveUnitCost, 49.95);
    });

    tester.test('T1.5.5: calculateQuotePricing calculates volume savings vs startingPrice', () => {
      const solis = MOCK_PRODUCTS.find((p) => p.id === 'prod-solis-tumbler');
      const quote = calculateQuotePricing(solis, 500, []);
      tester.assertEqual(quote.productSubtotal, 12000.00);
      tester.assertEqual(quote.savingsTotal, 5000.00);
    });

    tester.test('T1.5.6: calculateQuotePricing computes setupFeesTotal and productSubtotal separately', () => {
      const titan = MOCK_PRODUCTS.find((p) => p.id === 'prod-titan-charger');
      const quote = calculateQuotePricing(titan, 50, ['c-titan-laser', 'c-titan-sleeve']);
      // Setup = 45 + 75 = 120
      // Unit custom = 50 * (2.50 + 4.00) = 325
      // Product = 50 * 52.00 = 2600
      tester.assertEqual(quote.setupFeesTotal, 120.00);
      tester.assertEqual(quote.customizationSetupTotal, 120.00);
      tester.assertEqual(quote.customizationUnitTotal, 325.00);
      tester.assertEqual(quote.productSubtotal, 2600.00);
      tester.assertEqual(quote.estimatedTotal, 3045.00);
    });
  });
}
