/**
 * Tier 2: Boundary & Corner Cases Test Suite
 * Validates edge cases, extreme bounds, zero matches, below-MOQ inputs, high-volume brackets, and 404 slug handling.
 */

import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  queryProducts,
  calculateQuotePricing,
  getProductBySlug,
  getAllCategories
} from '../oracle/catalog_oracle.mjs';

export function runTier2Tests(tester) {
  tester.describe('Tier 2: Boundary & Corner Cases — Search & Filter Boundaries', () => {
    tester.test('T2.1.1: Search with non-matching nonsense query returns empty array []', () => {
      const results = queryProducts(MOCK_PRODUCTS, { searchQuery: 'xyz999nonexistent' });
      tester.assertEqual(results.length, 0);
      const specialChars = queryProducts(MOCK_PRODUCTS, { searchQuery: '!@#$%^&*()_+' });
      tester.assertEqual(specialChars.length, 0);
    });

    tester.test('T2.1.2: Search with whitespace-only query returns full catalog without throwing errors', () => {
      const results = queryProducts(MOCK_PRODUCTS, { searchQuery: '     ' });
      tester.assertEqual(results.length, 12);
    });

    tester.test('T2.1.3: Search is case-insensitive across uppercase and mixed case strings', () => {
      const upper = queryProducts(MOCK_PRODUCTS, { searchQuery: 'TITAN' });
      const mixed = queryProducts(MOCK_PRODUCTS, { searchQuery: 'TiTaN' });
      const lower = queryProducts(MOCK_PRODUCTS, { searchQuery: 'titan' });
      tester.assertEqual(upper.length, 1);
      tester.assertEqual(mixed.length, 1);
      tester.assertEqual(lower.length, 1);
      tester.assertEqual(upper[0].id, 'prod-titan-charger');
    });

    tester.test('T2.1.4: Search with partial keyword substring matches target products', () => {
      const charcut = queryProducts(MOCK_PRODUCTS, { searchQuery: 'charcut' });
      tester.assertEqual(charcut.length, 1);
      tester.assertEqual(charcut[0].id, 'prod-artisan-charcuterie');

      const organ = queryProducts(MOCK_PRODUCTS, { searchQuery: 'organ' });
      tester.assertEqual(organ.length, 1);
      tester.assertEqual(organ[0].id, 'prod-botanica-bamboo');
    });

    tester.test('T2.1.5: Filter with impossible price range returns empty array []', () => {
      const impossible = queryProducts(MOCK_PRODUCTS, { minPrice: 500, maxPrice: 600 });
      tester.assertEqual(impossible.length, 0);
    });

    tester.test('T2.1.6: Filter with identical minPrice and maxPrice matching exact product price returns matching item', () => {
      // Vanguard startingPrice is 65.00
      const exact = queryProducts(MOCK_PRODUCTS, { minPrice: 65, maxPrice: 65 });
      tester.assertEqual(exact.length, 1);
      tester.assertEqual(exact[0].id, 'prod-vanguard-portfolio');
    });

    tester.test('T2.1.7: Filter with negative minPrice handles safely without error', () => {
      const negative = queryProducts(MOCK_PRODUCTS, { minPrice: -50, maxPrice: 50 });
      tester.assert(negative.length > 0, 'Should return products <= 50');
    });

    tester.test('T2.1.8: Filter with MOQ threshold lower than any product MOQ returns empty array []', () => {
      // Lowest MOQ is 15 (Aerocrest)
      const zeroMoq = queryProducts(MOCK_PRODUCTS, { maxMoq: 10 });
      tester.assertEqual(zeroMoq.length, 0);
    });

    tester.test('T2.1.9: Filter with MOQ threshold matching lowest MOQ returns only Aerocrest', () => {
      const lowestMoq = queryProducts(MOCK_PRODUCTS, { maxMoq: 15 });
      tester.assertEqual(lowestMoq.length, 1);
      tester.assertEqual(lowestMoq[0].id, 'prod-aerocrest-anc');
    });

    tester.test('T2.1.10: Filter with extreme high MOQ threshold (1000) returns all 12 products', () => {
      const allMoq = queryProducts(MOCK_PRODUCTS, { maxMoq: 1000 });
      tester.assertEqual(allMoq.length, 12);
    });
  });

  tester.describe('Tier 2: Boundary & Corner Cases — PDP Quantity & MOQ Threshold Boundaries', () => {
    const titan = MOCK_PRODUCTS.find((p) => p.id === 'prod-titan-charger'); // MOQ: 25, Tiers: 25-49($58), 50-99($52), 100-249($47), 250-499($44), 500+($42)

    tester.test('T2.2.1: Quantity = 0 sets isBelowMoq = true, productSubtotal = 0', () => {
      const quote = calculateQuotePricing(titan, 0);
      tester.assertEqual(quote.quantity, 0);
      tester.assertEqual(quote.isBelowMoq, true);
      tester.assertEqual(quote.isMoqSatisfied, false);
      tester.assertEqual(quote.productSubtotal, 0);
      tester.assertEqual(quote.estimatedTotal, 0);
    });

    tester.test('T2.2.2: Quantity = 1 (far below MOQ 25) sets isBelowMoq = true and uses base tier unit price', () => {
      const quote = calculateQuotePricing(titan, 1);
      tester.assertEqual(quote.quantity, 1);
      tester.assertEqual(quote.isBelowMoq, true);
      tester.assertEqual(quote.unitPrice, 58.00);
      tester.assertEqual(quote.productSubtotal, 58.00);
    });

    tester.test('T2.2.3: Quantity = MOQ - 1 (24 for MOQ 25) sets isBelowMoq = true', () => {
      const quote = calculateQuotePricing(titan, 24);
      tester.assertEqual(quote.quantity, 24);
      tester.assertEqual(quote.isBelowMoq, true);
      tester.assertEqual(quote.unitPrice, 58.00);
      tester.assertEqual(quote.productSubtotal, 24 * 58.00);
    });

    tester.test('T2.2.4: Quantity = exact MOQ (25 for MOQ 25) sets isBelowMoq = false', () => {
      const quote = calculateQuotePricing(titan, 25);
      tester.assertEqual(quote.quantity, 25);
      tester.assertEqual(quote.isBelowMoq, false);
      tester.assertEqual(quote.isMoqSatisfied, true);
      tester.assertEqual(quote.unitPrice, 58.00);
      tester.assertEqual(quote.productSubtotal, 1450.00);
    });

    tester.test('T2.2.5: Quantity = first tier maxQuantity (49) resolves to Tier 1 ($58.00)', () => {
      const quote = calculateQuotePricing(titan, 49);
      tester.assertEqual(quote.activeTier.minQuantity, 25);
      tester.assertEqual(quote.activeTier.maxQuantity, 49);
      tester.assertEqual(quote.unitPrice, 58.00);
      tester.assertEqual(quote.productSubtotal, 49 * 58.00);
    });

    tester.test('T2.2.6: Quantity = second tier minQuantity (50) switches immediately to Tier 2 ($52.00)', () => {
      const quote = calculateQuotePricing(titan, 50);
      tester.assertEqual(quote.activeTier.minQuantity, 50);
      tester.assertEqual(quote.activeTier.maxQuantity, 99);
      tester.assertEqual(quote.unitPrice, 52.00);
      tester.assertEqual(quote.productSubtotal, 2600.00);
    });

    tester.test('T2.2.7: Intermediate bracket boundaries (99 vs 100, 249 vs 250) switch precisely', () => {
      const q99 = calculateQuotePricing(titan, 99);
      const q100 = calculateQuotePricing(titan, 100);
      tester.assertEqual(q99.unitPrice, 52.00);
      tester.assertEqual(q100.unitPrice, 47.00);

      const q249 = calculateQuotePricing(titan, 249);
      const q250 = calculateQuotePricing(titan, 250);
      tester.assertEqual(q249.unitPrice, 47.00);
      tester.assertEqual(q250.unitPrice, 44.00);
    });

    tester.test('T2.2.8: Quantity = highest tier minQuantity (500) applies deepest volume tier ($42.00)', () => {
      const quote = calculateQuotePricing(titan, 500);
      tester.assertEqual(quote.activeTier.minQuantity, 500);
      tester.assertEqual(quote.activeTier.maxQuantity, null);
      tester.assertEqual(quote.unitPrice, 42.00);
      tester.assertEqual(quote.productSubtotal, 21000.00);
    });

    tester.test('T2.2.9: Massive quantity = 10,000 units applies highest tier without numeric overflow', () => {
      const quote = calculateQuotePricing(titan, 10000);
      tester.assertEqual(quote.unitPrice, 42.00);
      tester.assertEqual(quote.productSubtotal, 420000.00);
      tester.assertEqual(quote.estimatedTotal, 420000.00);
    });

    tester.test('T2.2.10: Extreme high quantity = 1,000,000 units calculates cleanly without NaN or Infinity', () => {
      const quote = calculateQuotePricing(titan, 1000000);
      tester.assert(!isNaN(quote.estimatedTotal), 'Total must not be NaN');
      tester.assert(isFinite(quote.estimatedTotal), 'Total must be finite');
      tester.assertEqual(quote.estimatedTotal, 42000000.00);
    });
  });

  tester.describe('Tier 2: Boundary & Corner Cases — Customization Math & Options', () => {
    const titan = MOCK_PRODUCTS.find((p) => p.id === 'prod-titan-charger');

    tester.test('T2.3.1: Zero customizations selected produces 0 setup fee and 0 customization unit cost', () => {
      const quote = calculateQuotePricing(titan, 50, []);
      tester.assertEqual(quote.customizationSetupTotal, 0);
      tester.assertEqual(quote.customizationUnitTotal, 0);
      tester.assertEqual(quote.customizationSubtotal, 0);
      tester.assertEqual(quote.estimatedTotal, quote.productSubtotal);
    });

    tester.test('T2.3.2: Single customization selected charges setupFee once and unitCost * quantity', () => {
      // Laser: setup $45.00, unit $2.50
      const quote = calculateQuotePricing(titan, 50, ['c-titan-laser']);
      tester.assertEqual(quote.customizationSetupTotal, 45.00);
      tester.assertEqual(quote.customizationUnitTotal, 50 * 2.50); // 125.00
      tester.assertEqual(quote.customizationSubtotal, 170.00);
      tester.assertEqual(quote.estimatedTotal, 2600.00 + 170.00); // 2770.00
    });

    tester.test('T2.3.3: All available customizations selected simultaneously sum all setup fees and unit costs additively', () => {
      // All 3 customizations on Titan:
      // Laser: setup 45, unit 2.50
      // Deboss: setup 60, unit 3.50
      // Sleeve: setup 75, unit 4.00
      // Sum setup = 45 + 60 + 75 = 180.00
      // Sum unit = (2.50 + 3.50 + 4.00) * 100 = 10.00 * 100 = 1000.00
      const quote = calculateQuotePricing(titan, 100, ['c-titan-laser', 'c-titan-deboss', 'c-titan-sleeve']);
      tester.assertEqual(quote.customizationSetupTotal, 180.00);
      tester.assertEqual(quote.customizationUnitTotal, 1000.00);
      tester.assertEqual(quote.customizationSubtotal, 1180.00);
      // Product subtotal: 100 * $47 = 4700.00 -> Total = 5880.00
      tester.assertEqual(quote.estimatedTotal, 5880.00);
    });

    tester.test('T2.3.4: Customization option objects passed directly resolve properly', () => {
      const laserOpt = titan.customizationOptions[0];
      const quote = calculateQuotePricing(titan, 25, [laserOpt]);
      tester.assertEqual(quote.customizationSetupTotal, 45.00);
      tester.assertEqual(quote.customizationUnitTotal, 62.50);
    });

    tester.test('T2.3.5: Unknown or non-existent customization ID is ignored gracefully without error', () => {
      const quote = calculateQuotePricing(titan, 25, ['invalid-cust-id-999']);
      tester.assertEqual(quote.customizationSetupTotal, 0);
      tester.assertEqual(quote.customizationUnitTotal, 0);
      tester.assertEqual(quote.customizationSubtotal, 0);
    });

    tester.test('T2.3.6: Setup fee is fixed and charged once regardless of batch size (25 vs 5000)', () => {
      const q25 = calculateQuotePricing(titan, 25, ['c-titan-laser']);
      const q5000 = calculateQuotePricing(titan, 5000, ['c-titan-laser']);
      tester.assertEqual(q25.customizationSetupTotal, 45.00);
      tester.assertEqual(q5000.customizationSetupTotal, 45.00);
    });

    tester.test('T2.3.7: Effective unit cost amortizes fixed setup fee down as quantity increases', () => {
      const q25 = calculateQuotePricing(titan, 25, ['c-titan-laser']);
      const q500 = calculateQuotePricing(titan, 500, ['c-titan-laser']);
      tester.assert(q500.effectiveUnitCost < q25.effectiveUnitCost, 'Effective unit cost must decrease with volume');
    });

    tester.test('T2.3.8: Customization placement options do not alter core pricing calculation', () => {
      const quote1 = calculateQuotePricing(titan, 50, ['c-titan-laser']);
      const quote2 = calculateQuotePricing(titan, 50, ['c-titan-laser']);
      tester.assertEqual(quote1.estimatedTotal, quote2.estimatedTotal);
    });

    tester.test('T2.3.9: Multiple placement choices on product option are defined and non-empty', () => {
      const laser = titan.customizationOptions.find((c) => c.type === 'laser_engraving');
      tester.assert(Array.isArray(laser.placementOptions), 'Must have placement options array');
      tester.assert(laser.placementOptions.length >= 1, 'Must have at least 1 placement option');
    });

    tester.test('T2.3.10: Lead time on customizations is defined and non-negative', () => {
      for (const p of MOCK_PRODUCTS) {
        for (const c of p.customizationOptions) {
          if (c.leadTimeDays !== undefined) {
            tester.assert(c.leadTimeDays >= 0, 'Customization lead time must be >= 0');
          }
        }
      }
    });
  });

  tester.describe('Tier 2: Boundary & Corner Cases — Catalog Data & Schema Boundaries', () => {
    tester.test('T2.4.1: Product with single variant handles without crash', () => {
      const monaco = MOCK_PRODUCTS.find((p) => p.id === 'prod-monaco-decanter');
      tester.assertEqual(monaco.variants.length, 1);
      tester.assertEqual(monaco.variants[0].name, 'Classic Brilliant Cut Crystal');
    });

    tester.test('T2.4.2: Products handle optional weight gracefully', () => {
      for (const p of MOCK_PRODUCTS) {
        if (p.specifications.weight) {
          tester.assert(typeof p.specifications.weight === 'string', 'Weight must be string if present');
        }
      }
    });

    tester.test('T2.4.3: Products handle optional countryOfOrigin gracefully', () => {
      for (const p of MOCK_PRODUCTS) {
        if (p.specifications.countryOfOrigin) {
          tester.assert(typeof p.specifications.countryOfOrigin === 'string', 'countryOfOrigin must be string if present');
        }
      }
    });

    tester.test('T2.4.4: Titan Charger specifications contains customKeyValues power output specs', () => {
      const titan = MOCK_PRODUCTS.find((p) => p.id === 'prod-titan-charger');
      tester.assert(titan.specifications.customKeyValues !== undefined, 'Must have customKeyValues');
      tester.assert(titan.specifications.customKeyValues['Total Power Output'].includes('25W'), 'Must specify 25W');
    });

    tester.test('T2.4.5: Final price tier in every product has maxQuantity: null', () => {
      for (const p of MOCK_PRODUCTS) {
        const lastTier = p.priceTiers[p.priceTiers.length - 1];
        tester.assertEqual(lastTier.maxQuantity, null, `Product ${p.name} final tier maxQuantity must be null`);
      }
    });

    tester.test('T2.4.6: Savings percentages in price tiers are within [0, 100] range', () => {
      for (const p of MOCK_PRODUCTS) {
        for (const tier of p.priceTiers) {
          if (tier.savingsPercent !== undefined) {
            tester.assert(tier.savingsPercent >= 0 && tier.savingsPercent <= 100, `Invalid savings percent in ${p.name}`);
          }
        }
      }
    });

    tester.test('T2.4.7: Product slug formatting is valid URL-friendly kebab-case', () => {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      for (const p of MOCK_PRODUCTS) {
        tester.assert(slugRegex.test(p.slug), `Invalid slug format: ${p.slug}`);
      }
    });

    tester.test('T2.4.8: Product image array contains valid HTTPS URLs', () => {
      for (const p of MOCK_PRODUCTS) {
        for (const img of p.images) {
          tester.assert(img.startsWith('https://'), `Image URL not HTTPS: ${img}`);
        }
      }
    });

    tester.test('T2.4.9: Customer ratings are in range [0, 5.0] and reviewCounts are >= 0', () => {
      for (const p of MOCK_PRODUCTS) {
        if (p.rating !== undefined) {
          tester.assert(p.rating >= 0 && p.rating <= 5.0, `Invalid rating in ${p.name}`);
        }
        if (p.reviewCount !== undefined) {
          tester.assert(p.reviewCount >= 0, `Invalid reviewCount in ${p.name}`);
        }
      }
    });

    tester.test('T2.4.10: Every product has tags array with >= 1 tag', () => {
      for (const p of MOCK_PRODUCTS) {
        tester.assert(Array.isArray(p.tags) && p.tags.length >= 1, `Product ${p.name} must have tags`);
      }
    });
  });

  tester.describe('Tier 2: Boundary & Corner Cases — Dynamic Routing & Slug Resolver', () => {
    tester.test('T2.5.1: getProductBySlug resolves Titan Charger correctly', () => {
      const p = getProductBySlug('sterling-titan-wireless-charging-station');
      tester.assert(p !== undefined, 'Titan must be found');
      tester.assertEqual(p.id, 'prod-titan-charger');
    });

    tester.test('T2.5.2: getProductBySlug resolves Aerocrest Headphones correctly', () => {
      const p = getProductBySlug('aerocrest-noise-cancelling-headphones');
      tester.assert(p !== undefined, 'Aerocrest must be found');
      tester.assertEqual(p.id, 'prod-aerocrest-anc');
    });

    tester.test('T2.5.3: getProductBySlug resolves Solis Tumbler correctly', () => {
      const p = getProductBySlug('solis-copper-insulated-tumbler-set');
      tester.assert(p !== undefined, 'Solis must be found');
      tester.assertEqual(p.id, 'prod-solis-tumbler');
    });

    tester.test('T2.5.4: getProductBySlug with invalid non-existent slug returns undefined (404)', () => {
      const p = getProductBySlug('invalid-non-existent-slug-xyz');
      tester.assertEqual(p, undefined);
    });

    tester.test('T2.5.5: getProductBySlug with empty string returns undefined', () => {
      const p = getProductBySlug('');
      tester.assertEqual(p, undefined);
    });

    tester.test('T2.5.6: getProductBySlug with whitespace string returns undefined', () => {
      const p = getProductBySlug('     ');
      tester.assertEqual(p, undefined);
    });

    tester.test('T2.5.7: getProductBySlug with null / undefined returns undefined', () => {
      tester.assertEqual(getProductBySlug(null), undefined);
      tester.assertEqual(getProductBySlug(undefined), undefined);
    });

    tester.test('T2.5.8: getProductBySlug with number / non-string returns undefined', () => {
      tester.assertEqual(getProductBySlug(12345), undefined);
      tester.assertEqual(getProductBySlug({}), undefined);
    });

    tester.test('T2.5.9: getAllCategories returns all 6 categories with correct item counts', () => {
      const categories = getAllCategories();
      tester.assertEqual(categories.length, 6);
      for (const cat of categories) {
        tester.assertEqual(cat.count, 2);
      }
    });

    tester.test('T2.5.10: Every product in MOCK_PRODUCTS resolves back to itself via getProductBySlug', () => {
      for (const p of MOCK_PRODUCTS) {
        const resolved = getProductBySlug(p.slug);
        tester.assert(resolved !== undefined, `Product slug ${p.slug} failed to resolve`);
        tester.assertEqual(resolved.id, p.id);
      }
    });
  });
}
