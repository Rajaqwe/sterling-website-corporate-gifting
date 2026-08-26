/**
 * Tier 5: Adversarial Hardening & DOM Contract Verification Suite
 * Stress-tests DOM compliance, state immutability, mathematical invariants, and component contracts.
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
} from '../oracle/catalog_oracle.mjs';

export function runTier5AdversarialTests(tester) {
  const rootDir = process.cwd();
  const readComponent = (relPath) => fs.readFileSync(path.join(rootDir, relPath), 'utf-8');

  tester.describe('Tier 5: Adversarial Hardening — DOM Contract Compliance', () => {
    tester.test('T5.1.1: ProductCard component contains data-testid="product-card"', () => {
      const code = readComponent('src/components/products/ProductCard.tsx');
      tester.assert(code.includes('data-testid="product-card"'), 'Missing data-testid="product-card"');
    });

    tester.test('T5.1.2: ProductCard component contains data-testid="moq-badge"', () => {
      const code = readComponent('src/components/products/ProductCard.tsx');
      tester.assert(code.includes('data-testid="moq-badge"'), 'Missing data-testid="moq-badge"');
    });

    tester.test('T5.1.3: ProductCard component contains data-testid="product-price"', () => {
      const code = readComponent('src/components/products/ProductCard.tsx');
      tester.assert(code.includes('data-testid="product-price"'), 'Missing data-testid="product-price"');
    });

    tester.test('T5.1.4: ProductFilterSidebar contains data-testid="filter-sidebar"', () => {
      const code = readComponent('src/components/products/ProductFilterSidebar.tsx');
      tester.assert(code.includes('data-testid="filter-sidebar"'), 'Missing data-testid="filter-sidebar"');
    });

    tester.test('T5.1.5: ProductSearch contains data-testid="catalog-search-input" and data-testid="sort-dropdown"', () => {
      const code = readComponent('src/components/products/ProductSearch.tsx');
      tester.assert(code.includes('data-testid="catalog-search-input"'), 'Missing data-testid="catalog-search-input"');
      tester.assert(code.includes('data-testid="sort-dropdown"'), 'Missing data-testid="sort-dropdown"');
    });

    tester.test('T5.1.6: ProductGrid contains data-testid="product-grid"', () => {
      const code = readComponent('src/components/products/ProductGrid.tsx');
      tester.assert(code.includes('data-testid="product-grid"'), 'Missing data-testid="product-grid"');
    });

    tester.test('T5.1.7: ProductGallery contains data-testid="product-gallery" and thumbnails', () => {
      const code = readComponent('src/components/products/ProductGallery.tsx');
      tester.assert(code.includes('data-testid="product-gallery"'), 'Missing data-testid="product-gallery"');
      tester.assert(code.includes('data-testid="gallery-thumbnails"'), 'Missing data-testid="gallery-thumbnails"');
    });

    tester.test('T5.1.8: ProductCustomization contains data-testid="product-customizations"', () => {
      const code = readComponent('src/components/products/ProductCustomization.tsx');
      tester.assert(code.includes('data-testid="product-customizations"'), 'Missing data-testid="product-customizations"');
    });

    tester.test('T5.1.9: TieredPricingTable contains data-testid="tiered-pricing-table"', () => {
      const code = readComponent('src/components/products/TieredPricingTable.tsx');
      tester.assert(code.includes('data-testid="tiered-pricing-table"'), 'Missing data-testid="tiered-pricing-table"');
    });

    tester.test('T5.1.10: QuoteRequestModal contains data-testid="request-quote-button" and data-testid="moq-warning"', () => {
      const code = readComponent('src/components/products/QuoteRequestModal.tsx');
      tester.assert(code.includes('data-testid="request-quote-button"'), 'Missing data-testid="request-quote-button"');
      tester.assert(code.includes('data-testid="moq-warning"'), 'Missing data-testid="moq-warning"');
    });
  });

  tester.describe('Tier 5: Adversarial Hardening — Immutability & Mathematical Consistency', () => {
    tester.test('T5.2.1: Master catalog is immutable under repeated queryProducts transformations', () => {
      const snapshot = JSON.stringify(MOCK_PRODUCTS);
      queryProducts(MOCK_PRODUCTS, { categories: ['executive-tech'], maxMoq: 25, sortBy: 'price-desc' });
      queryProducts(MOCK_PRODUCTS, { searchQuery: 'a', minPrice: 50, maxPrice: 100 });
      tester.assertEqual(JSON.stringify(MOCK_PRODUCTS), snapshot, 'MOCK_PRODUCTS was mutated');
    });

    tester.test('T5.2.2: Deeply frozen catalog operates seamlessly without mutating inputs', () => {
      const frozenCatalog = JSON.parse(JSON.stringify(MOCK_PRODUCTS)).map((p) => Object.freeze(p));
      Object.freeze(frozenCatalog);
      const res = queryProducts(frozenCatalog, { categories: ['executive-tech'] });
      tester.assertEqual(res.length, 2);
    });

    tester.test('T5.2.3: Pricing identity: productSubtotal + customizationUnitTotal + setupFeesTotal === estimatedTotal across all products', () => {
      const testQtys = [1, 25, 50, 100, 250, 500, 1000, 10000];
      for (const p of MOCK_PRODUCTS) {
        const custIds = (p.customizationOptions || []).map((c) => c.id);
        for (const q of testQtys) {
          const quote = calculateQuotePricing(p, q, custIds);
          const directSum = quote.productSubtotal + quote.customizationUnitTotal + quote.setupFeesTotal;
          tester.assertClose(quote.estimatedTotal, directSum, 0.001, `Identity failed for ${p.slug} at ${q}`);
          tester.assertClose(quote.estimatedTotal, quote.productSubtotal + quote.customizationSubtotal, 0.001);
        }
      }
    });

    tester.test('T5.2.4: Extreme volume stress test (10,000,000 units) does not produce NaN or Infinity', () => {
      const titan = MOCK_PRODUCTS[0];
      const quote = calculateQuotePricing(titan, 10000000, ['c-titan-laser']);
      tester.assert(!isNaN(quote.estimatedTotal), 'NaN total');
      tester.assert(isFinite(quote.estimatedTotal), 'Infinite total');
      tester.assertEqual(quote.isMoqSatisfied, true);
    });
  });
}
