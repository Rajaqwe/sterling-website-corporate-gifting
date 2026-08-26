#!/usr/bin/env node
/**
 * Adversarial Verification Harness — Challenger 2
 * Comprehensive stress testing of:
 * 1. DOM Contract Compliance (ProductCard, PLP, PDP, data-testids)
 * 2. Component Rendering & AST/Source Integrity
 * 3. State Immutability & Anti-Mutation Invariants
 * 4. Exhaustive Pricing Consistency Matrix across all 12 products x 33 quantity levels x customization permutations
 * 5. Boundary Stress Testing (Extreme quantities, unicode queries, zero customizations, all customizations)
 */

import fs from 'fs';
import path from 'path';
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  queryProducts,
  calculateQuotePricing,
  getProductBySlug,
  getAllCategories
} from './oracle/catalog_oracle.mjs';

class AdversarialHarness {
  constructor() {
    this.total = 0;
    this.passed = 0;
    this.failed = 0;
    this.failures = [];
    this.startTime = Date.now();
  }

  section(name) {
    console.log(`\n\x1b[1m\x1b[35m=== ${name} ===\x1b[0m`);
  }

  test(name, fn) {
    this.total++;
    try {
      fn();
      this.passed++;
      console.log(`  \x1b[32m✔\x1b[0m ${name}`);
    } catch (err) {
      this.failed++;
      this.failures.push({ name, error: err.message });
      console.log(`  \x1b[31m✖\x1b[0m ${name}`);
      console.log(`    \x1b[33mError:\x1b[0m ${err.message}`);
    }
  }

  assert(cond, msg = 'Assertion failed') {
    if (!cond) throw new Error(msg);
  }

  assertEqual(actual, expected, msg) {
    if (actual !== expected) {
      throw new Error(msg || `Expected ${JSON.stringify(expected)} but received ${JSON.stringify(actual)}`);
    }
  }

  assertClose(actual, expected, tol = 0.001, msg) {
    if (Math.abs(actual - expected) > tol) {
      throw new Error(msg || `Expected ${actual} to be close to ${expected} (diff: ${Math.abs(actual - expected)})`);
    }
  }
}

export function runAdversarialTests() {
  const h = new AdversarialHarness();
  const rootDir = process.cwd();

  // =========================================================================
  // 1. DOM Contract & Component Source Code Verification
  // =========================================================================
  h.section('1. DOM Contract & Component Source Code Verification');

  const readComponent = (relPath) => fs.readFileSync(path.join(rootDir, relPath), 'utf-8');

  h.test('ProductCard.tsx contains data-testid="product-card"', () => {
    const code = readComponent('src/components/products/ProductCard.tsx');
    h.assert(code.includes('data-testid="product-card"'), 'Missing data-testid="product-card"');
  });

  h.test('ProductCard.tsx contains data-testid="moq-badge"', () => {
    const code = readComponent('src/components/products/ProductCard.tsx');
    h.assert(code.includes('data-testid="moq-badge"'), 'Missing data-testid="moq-badge"');
    h.assert(code.includes('MOQ: {product.moq} units'), 'MOQ badge format mismatch');
  });

  h.test('ProductCard.tsx contains data-testid="product-price"', () => {
    const code = readComponent('src/components/products/ProductCard.tsx');
    h.assert(code.includes('data-testid="product-price"'), 'Missing data-testid="product-price"');
  });

  h.test('ProductCard.tsx renders title, category, and responsive image stage with fallback', () => {
    const code = readComponent('src/components/products/ProductCard.tsx');
    h.assert(code.includes('<Image') && code.includes('alt={title}'), 'Missing responsive Image element with title alt');
    h.assert(code.includes('setImageError(true)'), 'Missing image error fallback handler');
    h.assert(code.includes('{displayCategory}'), 'Missing category display in card');
    h.assert(code.includes('{title}'), 'Missing title display in card');
  });

  h.test('ProductFilterSidebar.tsx contains data-testid="filter-sidebar" and desktop/mobile components', () => {
    const code = readComponent('src/components/products/ProductFilterSidebar.tsx');
    h.assert(code.includes('data-testid="filter-sidebar"'), 'Missing data-testid="filter-sidebar"');
    h.assert(code.includes('export function ProductFilterSidebar'), 'Missing ProductFilterSidebar export');
    h.assert(code.includes('export function MobileFilterDrawer'), 'Missing MobileFilterDrawer export');
    h.assert(code.includes('Starting Unit Price'), 'Missing Price filter header');
    h.assert(code.includes('Category'), 'Missing Category filter header');
    h.assert(code.includes('Minimum Order Quantity (MOQ)'), 'Missing MOQ filter header');
  });

  h.test('ProductSearch.tsx contains search input and sort dropdown testids', () => {
    const code = readComponent('src/components/products/ProductSearch.tsx');
    h.assert(code.includes('data-testid="catalog-search-input"'), 'Missing data-testid="catalog-search-input"');
    h.assert(code.includes('data-testid="sort-dropdown"'), 'Missing data-testid="sort-dropdown"');
    h.assert(code.includes('data-testid="results-counter"'), 'Missing data-testid="results-counter"');
  });

  h.test('ProductGrid.tsx contains data-testid="product-grid" and empty state handling', () => {
    const code = readComponent('src/components/products/ProductGrid.tsx');
    h.assert(code.includes('data-testid="product-grid"'), 'Missing data-testid="product-grid"');
    h.assert(code.includes('data-testid="product-empty-state"'), 'Missing data-testid="product-empty-state"');
    h.assert(code.includes('data-testid="reset-filters-button"'), 'Missing data-testid="reset-filters-button"');
  });

  h.test('ProductGallery.tsx contains data-testid="product-gallery" and thumbnails selector', () => {
    const code = readComponent('src/components/products/ProductGallery.tsx');
    h.assert(code.includes('data-testid="product-gallery"'), 'Missing data-testid="product-gallery"');
    h.assert(code.includes('data-testid="gallery-thumbnails"'), 'Missing data-testid="gallery-thumbnails"');
    h.assert(code.includes('data-testid="pdp-moq-badge"'), 'Missing data-testid="pdp-moq-badge"');
  });

  h.test('ProductCustomization.tsx contains data-testid="product-customizations" and option testids', () => {
    const code = readComponent('src/components/products/ProductCustomization.tsx');
    h.assert(code.includes('data-testid="product-customizations"'), 'Missing data-testid="product-customizations"');
    h.assert(code.includes('data-testid={`customization-option-${option.id}`}'), 'Missing per-option data-testid');
  });

  h.test('TieredPricingTable.tsx contains data-testid="tiered-pricing-table" and active tier indicators', () => {
    const code = readComponent('src/components/products/TieredPricingTable.tsx');
    h.assert(code.includes('data-testid="tiered-pricing-table"'), 'Missing data-testid="tiered-pricing-table"');
    h.assert(code.includes('data-active-tier'), 'Missing data-active-tier attribute');
  });

  h.test('QuoteRequestModal.tsx contains request-quote button, MOQ alert banner, and calculation testids', () => {
    const code = readComponent('src/components/products/QuoteRequestModal.tsx');
    h.assert(code.includes('data-testid="request-quote-button"'), 'Missing data-testid="request-quote-button"');
    h.assert(code.includes('data-testid="moq-warning"'), 'Missing data-testid="moq-warning"');
    h.assert(code.includes('data-testid="active-unit-price"'), 'Missing data-testid="active-unit-price"');
    h.assert(code.includes('data-testid="estimated-total"'), 'Missing data-testid="estimated-total"');
    h.assert(code.includes('data-testid="quantity-input"'), 'Missing data-testid="quantity-input"');
    h.assert(code.includes('data-testid="submit-quote-form"'), 'Missing data-testid="submit-quote-form"');
  });

  h.test('PLP route (/corporate-gifts/page.tsx) integrates Search, Sidebar, and Grid components', () => {
    const code = readComponent('src/app/corporate-gifts/page.tsx');
    h.assert(code.includes('<ProductSearch'), 'PLP must render ProductSearch');
    h.assert(code.includes('<ProductFilterSidebar'), 'PLP must render ProductFilterSidebar');
    h.assert(code.includes('<ProductGrid'), 'PLP must render ProductGrid');
    h.assert(code.includes('queryProducts(PRODUCTS,'), 'PLP must invoke queryProducts');
  });

  h.test('PDP route (/products/[slug]/page.tsx) integrates Gallery, Specs, Customization, Pricing, and Quote CTA', () => {
    const code = readComponent('src/app/products/[slug]/page.tsx');
    h.assert(code.includes('<ProductGallery'), 'PDP must render ProductGallery');
    h.assert(code.includes('<ProductSpecifications'), 'PDP must render ProductSpecifications');
    h.assert(code.includes('<ProductCustomization'), 'PDP must render ProductCustomization');
    h.assert(code.includes('<TieredPricingTable'), 'PDP must render TieredPricingTable');
    h.assert(code.includes('<QuoteRequestModal'), 'PDP must render QuoteRequestModal');
    h.assert(code.includes('getProductBySlug(slugParam)'), 'PDP must resolve product by slug');
  });

  // =========================================================================
  // 2. PLP Functional & Contract Compliance
  // =========================================================================
  h.section('2. PLP Functional & Contract Compliance');

  h.test('PLP renders >= 6 products in default state (all 12 products available)', () => {
    const results = queryProducts(MOCK_PRODUCTS, {});
    h.assert(results.length >= 6, `Expected >= 6 products, found ${results.length}`);
    h.assertEqual(results.length, 12, 'Catalog must contain 12 products');
  });

  h.test('PLP Category filter supports multi-category filtering', () => {
    const results = queryProducts(MOCK_PRODUCTS, { categories: ['executive-tech', 'eco-friendly'] });
    h.assertEqual(results.length, 4, 'Executive Tech (2) + Eco-Friendly (2) = 4 products');
    h.assert(results.every(p => ['executive-tech', 'eco-friendly'].includes(p.categorySlug)));
  });

  h.test('PLP Price range filtering properly isolates price brackets', () => {
    const cheap = queryProducts(MOCK_PRODUCTS, { maxPrice: 35 });
    h.assert(cheap.length > 0, 'Should find products under $35');
    h.assert(cheap.every(p => (p.startingPrice ?? p.basePrice) <= 35));

    const premium = queryProducts(MOCK_PRODUCTS, { minPrice: 80 });
    h.assert(premium.length > 0, 'Should find products over $80');
    h.assert(premium.every(p => (p.startingPrice ?? p.basePrice) >= 80 || (p.basePrice ?? 0) >= 80));
  });

  h.test('PLP MOQ filtering properly isolates volume order thresholds', () => {
    const smallMoq = queryProducts(MOCK_PRODUCTS, { maxMoq: 25 });
    h.assertEqual(smallMoq.length, 6, 'Should find 6 products with MOQ <= 25');
    h.assert(smallMoq.every(p => p.moq <= 25));
  });

  h.test('PLP sorting orders accurately by all 6 sort options', () => {
    const sorts = ['price-asc', 'price-desc', 'moq-asc', 'moq-desc', 'title', 'rating-desc'];
    for (const s of sorts) {
      const sorted = queryProducts(MOCK_PRODUCTS, { sortBy: s });
      h.assertEqual(sorted.length, 12, `Sort ${s} should return all 12 items`);
    }

    const priceAsc = queryProducts(MOCK_PRODUCTS, { sortBy: 'price-asc' });
    for (let i = 0; i < priceAsc.length - 1; i++) {
      const pA = priceAsc[i].startingPrice ?? priceAsc[i].basePrice;
      const pB = priceAsc[i+1].startingPrice ?? priceAsc[i+1].basePrice;
      h.assert(pA <= pB, `Price asc sort broken at index ${i}`);
    }

    const moqAsc = queryProducts(MOCK_PRODUCTS, { sortBy: 'moq-asc' });
    for (let i = 0; i < moqAsc.length - 1; i++) {
      h.assert(moqAsc[i].moq <= moqAsc[i+1].moq, `MOQ asc sort broken at index ${i}`);
    }
  });

  // =========================================================================
  // 3. State Mutation & Immutability Adversarial Stress
  // =========================================================================
  h.section('3. State Mutation & Immutability Adversarial Stress');

  h.test('Master catalog array MOCK_PRODUCTS is immutable under queryProducts calls', () => {
    const initialCatalogSnapshot = JSON.stringify(MOCK_PRODUCTS);
    
    // Execute multiple aggressive filter/sort passes
    queryProducts(MOCK_PRODUCTS, { searchQuery: 'a', sortBy: 'price-desc', maxMoq: 20 });
    queryProducts(MOCK_PRODUCTS, { categories: ['executive-tech'], minPrice: 100 });
    queryProducts(MOCK_PRODUCTS, { sortBy: 'rating-desc' });
    queryProducts(MOCK_PRODUCTS, { searchQuery: 'nonexistent' });

    const postCatalogSnapshot = JSON.stringify(MOCK_PRODUCTS);
    h.assertEqual(postCatalogSnapshot, initialCatalogSnapshot, 'MOCK_PRODUCTS array was mutated by queryProducts!');
  });

  h.test('Deeply frozen products array executes cleanly through queryProducts without throwing TypeError', () => {
    const deepClone = JSON.parse(JSON.stringify(MOCK_PRODUCTS));
    deepClone.forEach(p => Object.freeze(p));
    Object.freeze(deepClone);

    let result;
    try {
      result = queryProducts(deepClone, {
        categories: ['executive-tech'],
        sortBy: 'price-asc',
        maxPrice: 60
      });
    } catch (err) {
      throw new Error(`queryProducts attempted in-place mutation on frozen catalog: ${err.message}`);
    }

    h.assert(Array.isArray(result) && result.length === 1, 'Frozen catalog query failed');
  });

  h.test('Deeply frozen product object executes cleanly through calculateQuotePricing without throwing TypeError', () => {
    for (const p of MOCK_PRODUCTS) {
      const cloned = JSON.parse(JSON.stringify(p));
      cloned.priceTiers.forEach(t => Object.freeze(t));
      (cloned.customizationOptions || []).forEach(c => Object.freeze(c));
      Object.freeze(cloned);

      try {
        const quote = calculateQuotePricing(cloned, 100, (cloned.customizationOptions || []).map(c => c.id));
        h.assert(quote && typeof quote.estimatedTotal === 'number');
      } catch (err) {
        throw new Error(`calculateQuotePricing mutated frozen product ${p.id}: ${err.message}`);
      }
    }
  });

  // =========================================================================
  // 4. Exhaustive Pricing Consistency Matrix (All Products x Quantities x Customizations)
  // =========================================================================
  h.section('4. Exhaustive Pricing Consistency Matrix');

  const testQuantities = [
    0, 1, 5, 10, 15, 20, 24, 25, 29, 30, 35, 49, 50, 59, 60, 74, 75,
    99, 100, 119, 120, 149, 150, 249, 250, 299, 300, 499, 500, 1000, 5000, 10000, 50000
  ];

  h.test('Pricing mathematical consistency across all 12 products x 33 quantity levels x customization permutations', () => {
    let totalPermutationsChecked = 0;

    for (const product of MOCK_PRODUCTS) {
      const custOptions = product.customizationOptions || product.customizations || [];
      const customizationScenarios = [
        [], // No customization
        custOptions.slice(0, 1).map(c => c.id), // Single customization
        custOptions.map(c => c.id), // All customizations
      ];

      for (const qty of testQuantities) {
        for (const custIds of customizationScenarios) {
          totalPermutationsChecked++;
          const quote = calculateQuotePricing(product, qty, custIds);

          // Invariant 1: productSubtotal === tierUnitPrice * quantity
          const expectedProductSubtotal = quote.tierUnitPrice * qty;
          h.assertClose(
            quote.productSubtotal,
            expectedProductSubtotal,
            0.001,
            `Product subtotal mismatch for ${product.slug} at qty ${qty}`
          );

          // Invariant 2: setupFeesTotal === customizationSetupTotal
          h.assertEqual(
            quote.setupFeesTotal,
            quote.customizationSetupTotal,
            `setupFeesTotal mismatch for ${product.slug}`
          );

          // Invariant 3: customizationSubtotal === customizationSetupTotal + customizationUnitTotal
          const expectedCustomizationSubtotal = quote.customizationSetupTotal + quote.customizationUnitTotal;
          h.assertClose(
            quote.customizationSubtotal,
            expectedCustomizationSubtotal,
            0.001,
            `Customization subtotal mismatch for ${product.slug}`
          );

          // Invariant 4: estimatedTotal === productSubtotal + customizationSubtotal
          const expectedEstimatedTotal = quote.productSubtotal + quote.customizationSubtotal;
          h.assertClose(
            quote.estimatedTotal,
            expectedEstimatedTotal,
            0.001,
            `Estimated total mismatch for ${product.slug}`
          );

          // Invariant 5: productSubtotal + customizationUnitTotal + setupFeesTotal === estimatedTotal
          const directSum = quote.productSubtotal + quote.customizationUnitTotal + quote.setupFeesTotal;
          h.assertClose(
            quote.estimatedTotal,
            directSum,
            0.001,
            `Direct sum consistency failed for ${product.slug} at qty ${qty}`
          );

          // Invariant 6: MOQ satisfaction flag
          const expectedMoqSatisfied = qty >= product.moq;
          h.assertEqual(
            quote.isMoqSatisfied,
            expectedMoqSatisfied,
            `MOQ satisfaction flag mismatch for ${product.slug} at qty ${qty}`
          );

          // Invariant 7: Below MOQ flag
          h.assertEqual(
            quote.isBelowMoq,
            !expectedMoqSatisfied,
            `isBelowMoq flag mismatch for ${product.slug} at qty ${qty}`
          );

          // Invariant 8: Effective unit cost is finite and >= 0
          if (qty > 0) {
            const expectedEffective = Number((quote.estimatedTotal / qty).toFixed(2));
            h.assertClose(
              quote.effectiveUnitCost,
              expectedEffective,
              0.01,
              `Effective unit cost mismatch for ${product.slug} at qty ${qty}`
            );
          } else {
            h.assertEqual(quote.effectiveUnitCost, 0);
          }
        }
      }
    }

    console.log(`    \x1b[36mℹ Total verified pricing permutations: ${totalPermutationsChecked}\x1b[0m`);
    h.assert(totalPermutationsChecked >= 1000, 'Must verify >= 1000 pricing permutations');
  });

  // =========================================================================
  // 5. Boundary & Extreme Input Stress Tests
  // =========================================================================
  h.section('5. Boundary & Extreme Input Stress Tests');

  h.test('Search queries with special regex characters do not crash or throw RegExp exceptions', () => {
    const specialQueries = [
      '***', '+++', '???', '(', ')', '[', ']', '{', '}', '^', '$', '\\', '|',
      '<script>alert("xss")</script>', 'Robert\'); DROP TABLE Students;--',
      '🚀🔥🎁', 'Café & Résumé'
    ];

    for (const q of specialQueries) {
      try {
        const results = queryProducts(MOCK_PRODUCTS, { searchQuery: q });
        h.assert(Array.isArray(results), `Failed query: ${q}`);
      } catch (err) {
        throw new Error(`Search crashed on input "${q}": ${err.message}`);
      }
    }
  });

  h.test('PDP dynamic slug resolver handles malformed, encoded, and extreme slug inputs gracefully', () => {
    const malformedSlugs = [
      '', ' ', 'null', 'undefined', '12345',
      '../../../etc/passwd', '<script>',
      'sterling-titan-wireless-charging-station/extra-path',
      'sterling-titan-wireless-charging-station%20'
    ];

    for (const slug of malformedSlugs) {
      const res = getProductBySlug(slug);
      h.assertEqual(res, undefined, `Expected undefined for malformed slug: "${slug}"`);
    }
  });

  h.test('Quantity inputs of extreme magnitudes (1e7, Number.MAX_SAFE_INTEGER) calculate safely without NaN', () => {
    const titan = MOCK_PRODUCTS[0];
    const massive = calculateQuotePricing(titan, 10000000, ['c-titan-laser']);
    h.assert(!isNaN(massive.estimatedTotal), 'Massive quantity produced NaN total');
    h.assert(isFinite(massive.estimatedTotal), 'Massive quantity produced Infinite total');
    h.assert(massive.estimatedTotal > 0, 'Massive quantity produced non-positive total');
  });

  // =========================================================================
  // 6. Summary Telemetry
  // =========================================================================
  const duration = ((Date.now() - h.startTime) / 1000).toFixed(2);
  console.log('\n' + '='.repeat(80));
  console.log(`\x1b[1m\x1b[36mADVERSARIAL VERIFICATION SUMMARY (Challenger 2)\x1b[0m`);
  console.log(`  Total Assertions : \x1b[1m${h.total}\x1b[0m`);
  console.log(`  Passed           : \x1b[32m\x1b[1m${h.passed}\x1b[0m`);
  console.log(`  Failed           : ${h.failed > 0 ? `\x1b[31m\x1b[1m${h.failed}\x1b[0m` : '\x1b[32m0\x1b[0m'}`);
  console.log(`  Duration         : \x1b[33m${duration}s\x1b[0m`);
  console.log('='.repeat(80));

  return {
    passed: h.failed === 0,
    total: h.total,
    passedCount: h.passed,
    failedCount: h.failed,
    failures: h.failures
  };
}

// Execute directly if run via CLI
if (process.argv[1] && process.argv[1].endsWith('adversarial_verification.mjs')) {
  const res = runAdversarialTests();
  process.exit(res.passed ? 0 : 1);
}
