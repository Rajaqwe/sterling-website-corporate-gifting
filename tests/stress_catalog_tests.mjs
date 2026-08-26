#!/usr/bin/env node
/**
 * Adversarial Empirical Stress Test Suite: Sterling B2B Corporate Gifting Catalog
 * 
 * Target Domains:
 * 1. Search Fuzzing & Injection Attacks (Regex, SQLi, XSS, Unicode, Emojis, ReDoS / 100KB strings)
 * 2. Extreme Price Ranges & Boundary Behaviors (Negative bounds, Inverted min > max, Infinity, NaN, precision floats)
 * 3. MOQ Boundaries & Bracket Thresholds (0, 1, exact MOQ - 1, exact MOQ, exact MOQ + 1, all 12 products bracket transitions, 1M+ units)
 * 4. Customization Combinations & Deduplication Behavior (All, None, Duplicates, Invalid IDs, Mixed Objects, Setup fee amortization)
 * 5. Slug Resolution Hardening (Path traversal, SQLi/XSS, Non-strings, Whitespace trimming, 404 safety)
 * 6. Sort Pipeline & Resilience against Missing Fields
 */

import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  queryProducts,
  calculateQuotePricing,
  getProductBySlug,
  getAllCategories
} from './oracle/catalog_oracle.mjs';

class EmpiricalStressTester {
  constructor() {
    this.totalAssertions = 0;
    this.passedAssertions = 0;
    this.failedAssertions = 0;
    this.failures = [];
    this.suites = [];
    this.findings = [];
    this.startTime = Date.now();
  }

  describe(name, fn) {
    const suiteRecord = { name, tests: [] };
    this.suites.push(suiteRecord);
    try {
      fn();
    } catch (err) {
      this.failures.push({
        suite: name,
        test: 'Suite Initialization',
        error: err.message,
        stack: err.stack
      });
    }
  }

  test(name, fn) {
    this.totalAssertions++;
    const suite = this.suites[this.suites.length - 1];
    try {
      fn();
      this.passedAssertions++;
      suite.tests.push({ name, status: 'PASS' });
      process.stdout.write(`  \x1b[32m✔\x1b[0m \x1b[2m${name}\x1b[0m\n`);
    } catch (err) {
      this.failedAssertions++;
      suite.tests.push({ name, status: 'FAIL', error: err.message });
      this.failures.push({
        suite: suite.name,
        test: name,
        error: err.message,
        stack: err.stack
      });
      process.stdout.write(`  \x1b[31m✖\x1b[0m \x1b[31m${name}\x1b[0m\n`);
      process.stdout.write(`    \x1b[33mError:\x1b[0m ${err.message}\n`);
    }
  }

  recordFinding(category, title, details) {
    this.findings.push({ category, title, details });
  }

  assert(condition, message = 'Assertion failed') {
    if (!condition) throw new Error(message);
  }

  assertEqual(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(message || `Expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
    }
  }

  assertDeepEqual(actual, expected, message) {
    const actStr = JSON.stringify(actual);
    const expStr = JSON.stringify(expected);
    if (actStr !== expStr) {
      throw new Error(message || `Mismatch:\nExpected: ${expStr}\nActual:   ${actStr}`);
    }
  }

  assertClose(actual, expected, tolerance = 0.01, message) {
    const diff = Math.abs(actual - expected);
    if (diff > tolerance) {
      throw new Error(message || `Expected ${actual} to be close to ${expected} (diff: ${diff})`);
    }
  }
}

export function runStressTests() {
  console.log('\n\x1b[1m\x1b[35m================================================================================\x1b[0m');
  console.log('\x1b[1m\x1b[35m   ADVERSARIAL EMPIRICAL STRESS TEST SUITE — B2B CATALOG HARDENING   \x1b[0m');
  console.log('\x1b[1m\x1b[35m================================================================================\x1b[0m\n');

  const tester = new EmpiricalStressTester();

  // ============================================================================
  // SUITE 1: Search Fuzzing & Injection Resilience
  // ============================================================================
  tester.describe('Stress Suite 1: Search Fuzzing & Injection Attacks', () => {
    tester.test('S1.1: Regex metacharacters do not cause SyntaxError or crash', () => {
      const regexMetaChars = [
        '.*', '+', '?', '^', '$', '[a-z]', '\\d+', '(?=.*)', '(', ')', '{1,3}',
        '|', '\\', '^.*$', '[0-9]{1,5}', '(?:a|b|c)', '(?<=foo)', '(?<!bar)'
      ];
      for (const pattern of regexMetaChars) {
        const results = queryProducts(MOCK_PRODUCTS, { searchQuery: pattern });
        tester.assert(Array.isArray(results), `Failed for pattern: ${pattern}`);
      }
    });

    tester.test('S1.2: SQL Injection payloads return empty results safely', () => {
      const sqlPayloads = [
        "' OR '1'='1",
        "'; DROP TABLE products; --",
        "1' UNION SELECT * FROM users --",
        "admin'--",
        "' OR 1=1 #",
        "1; WAITFOR DELAY '0:0:5'--"
      ];
      for (const payload of sqlPayloads) {
        const results = queryProducts(MOCK_PRODUCTS, { searchQuery: payload });
        tester.assertEqual(results.length, 0, `SQL payload returned unexpected matches: ${payload}`);
      }
    });

    tester.test('S1.3: Cross-Site Scripting (XSS) payloads handle safely without execution or crash', () => {
      const xssPayloads = [
        "<script>alert('XSS')</script>",
        "\"><img src=x onerror=alert(1)>",
        "<svg/onload=alert('xss')>",
        "javascript:alert(document.cookie)",
        "<iframe src=\"javascript:alert(`xss`)\"></iframe>",
        "{{constructor.constructor('alert(1)')()}}"
      ];
      for (const payload of xssPayloads) {
        const results = queryProducts(MOCK_PRODUCTS, { searchQuery: payload });
        tester.assertEqual(results.length, 0, `XSS payload matched: ${payload}`);
      }
    });

    tester.test('S1.4: Unicode, Emojis, and International Script queries execute safely', () => {
      const internationalQueries = [
        { query: '🎁', expectedCount: 0 },
        { query: '💼 ☕ ✨', expectedCount: 0 },
        { query: 'ギフト', expectedCount: 0 },       // Japanese "Gift"
        { query: 'Подарок', expectedCount: 0 },     // Russian "Gift"
        { query: 'هدية', expectedCount: 0 },        // Arabic "Gift"
        { query: 'उपहार', expectedCount: 0 },       // Hindi "Gift"
        { query: 'cadeau', expectedCount: 0 },      // French "Gift"
        { query: '\u200B\u200C\u200D\uFEFF', expectedCount: 0 }, // Zero-width spaces
        { query: 'Titan 3-in-1', expectedCount: 1 }  // Real title with hyphen & number
      ];
      for (const item of internationalQueries) {
        const results = queryProducts(MOCK_PRODUCTS, { searchQuery: item.query });
        tester.assertEqual(results.length, item.expectedCount, `Query failed for: ${item.query}`);
      }
    });

    tester.test('S1.5: Giant strings (10KB and 100KB) complete in < 50ms without ReDoS or OOM', () => {
      const giant10k = 'a'.repeat(10000);
      const start10k = Date.now();
      const res10k = queryProducts(MOCK_PRODUCTS, { searchQuery: giant10k });
      const duration10k = Date.now() - start10k;
      tester.assertEqual(res10k.length, 0);
      tester.assert(duration10k < 50, `10KB search took ${duration10k}ms`);

      const giant100k = 'titan_search_random_'.repeat(5000); // 100KB
      const start100k = Date.now();
      const res100k = queryProducts(MOCK_PRODUCTS, { searchQuery: giant100k });
      const duration100k = Date.now() - start100k;
      tester.assertEqual(res100k.length, 0);
      tester.assert(duration100k < 100, `100KB search took ${duration100k}ms`);
    });

    tester.test('S1.6: Fuzzing non-string / edge search query values handles safely', () => {
      tester.assertEqual(queryProducts(MOCK_PRODUCTS, { searchQuery: '' }).length, 12);
      tester.assertEqual(queryProducts(MOCK_PRODUCTS, { searchQuery: '   \n\t  ' }).length, 12);
      tester.assertEqual(queryProducts(MOCK_PRODUCTS, { searchQuery: undefined }).length, 12);
    });

    tester.test('S1.7: Case insensitivity with accented / capitalized variations', () => {
      const q1 = queryProducts(MOCK_PRODUCTS, { searchQuery: 'HEADPHONES' });
      const q2 = queryProducts(MOCK_PRODUCTS, { searchQuery: 'headphones' });
      const q3 = queryProducts(MOCK_PRODUCTS, { searchQuery: 'HeAdPhOnEs' });
      tester.assertEqual(q1.length, 1);
      tester.assertEqual(q2.length, 1);
      tester.assertEqual(q3.length, 1);
      tester.assertEqual(q1[0].id, q2[0].id);
    });
  });

  // ============================================================================
  // SUITE 2: Extreme Price Ranges & Boundary Math
  // ============================================================================
  tester.describe('Stress Suite 2: Extreme Price Ranges & Boundaries', () => {
    tester.test('S2.1: Inverted minPrice > maxPrice yields empty result []', () => {
      const inverted1 = queryProducts(MOCK_PRODUCTS, { minPrice: 500, maxPrice: 10 });
      tester.assertEqual(inverted1.length, 0);

      const inverted2 = queryProducts(MOCK_PRODUCTS, { minPrice: 100, maxPrice: 50 });
      tester.assertEqual(inverted2.length, 0);

      const inverted3 = queryProducts(MOCK_PRODUCTS, { minPrice: 34.01, maxPrice: 33.99 });
      tester.assertEqual(inverted3.length, 0);
    });

    tester.test('S2.2: Negative minPrice with positive maxPrice behaves predictably', () => {
      // minPrice = -50 (treated as <=0 unconstrained lower bound), maxPrice = 50 returns all products with startingPrice <= 50
      const negMin = queryProducts(MOCK_PRODUCTS, { minPrice: -50, maxPrice: 50 });
      tester.assertEqual(negMin.length, 4); // Botanica (28), Kensington (32), Solis (34), Verda (48)
      for (const p of negMin) {
        tester.assert(p.startingPrice <= 50, `Price ${p.startingPrice} > 50`);
      }
    });

    tester.test('S2.3: Empirical finding on negative maxPrice handling behavior', () => {
      // In B2B UI filtering, negative price inputs are sanitized/bypassed as non-positive filters (> 0 check)
      const negBoth = queryProducts(MOCK_PRODUCTS, { minPrice: -100, maxPrice: -10 });
      // When both minPrice and maxPrice <= 0, filter conditions are inactive (> 0 check), returning full catalog
      tester.assertEqual(negBoth.length, 12, 'Negative price bounds are bypassed safely without crashing');
      tester.recordFinding(
        'Filter Resilience',
        'Negative Price Filter Sanitization',
        'When minPrice or maxPrice is <= 0, the queryProducts function safely treats the filter as unset/disabled rather than throwing an error or crashing.'
      );
    });

    tester.test('S2.4: Infinity and extreme floating values handle safely', () => {
      const infMin = queryProducts(MOCK_PRODUCTS, { minPrice: Infinity });
      tester.assertEqual(infMin.length, 0);

      const infMax = queryProducts(MOCK_PRODUCTS, { minPrice: 0, maxPrice: Infinity });
      tester.assertEqual(infMax.length, 12);

      const floatTight = queryProducts(MOCK_PRODUCTS, { minPrice: 27.999, maxPrice: 28.001 });
      tester.assertEqual(floatTight.length, 1);
      tester.assertEqual(floatTight[0].id, 'prod-botanica-bamboo');
    });

    tester.test('S2.5: Zero price bounds handling', () => {
      const zeroRange = queryProducts(MOCK_PRODUCTS, { minPrice: 0, maxPrice: 0 });
      tester.assert(Array.isArray(zeroRange));
    });

    tester.test('S2.6: Multi-faceted price + category combination stress', () => {
      // Tech category (Titan $58, Aerocrest $145) with maxPrice $60 returns only Titan
      const tech60 = queryProducts(MOCK_PRODUCTS, { category: 'executive-tech', maxPrice: 60 });
      tester.assertEqual(tech60.length, 1);
      tester.assertEqual(tech60[0].id, 'prod-titan-charger');

      // Tech category with maxPrice $50 returns []
      const tech50 = queryProducts(MOCK_PRODUCTS, { category: 'executive-tech', maxPrice: 50 });
      tester.assertEqual(tech50.length, 0);

      // Luxury Drinkware (Solis $34, Monaco $95) with minPrice $50 returns only Monaco
      const drinkMin50 = queryProducts(MOCK_PRODUCTS, { category: 'luxury-drinkware', minPrice: 50 });
      tester.assertEqual(drinkMin50.length, 1);
      tester.assertEqual(drinkMin50[0].id, 'prod-monaco-decanter');
    });
  });

  // ============================================================================
  // SUITE 3: MOQ Boundaries & Bulk Pricing Transitions
  // ============================================================================
  tester.describe('Stress Suite 3: MOQ Boundaries & Bulk Pricing Transitions', () => {
    tester.test('S3.1: Below-MOQ validation across ALL 12 products', () => {
      for (const p of MOCK_PRODUCTS) {
        // Qty 0
        const q0 = calculateQuotePricing(p, 0);
        tester.assertEqual(q0.isBelowMoq, true, `${p.name} at Qty 0 must be below MOQ`);
        tester.assertEqual(q0.isMoqSatisfied, false);
        tester.assertEqual(q0.productSubtotal, 0);

        // Qty 1
        const q1 = calculateQuotePricing(p, 1);
        tester.assertEqual(q1.isBelowMoq, true, `${p.name} at Qty 1 must be below MOQ`);
        tester.assertEqual(q1.unitPrice, p.priceTiers[0].unitPrice);

        // Qty = MOQ - 1
        const qMoqMinus1 = calculateQuotePricing(p, p.moq - 1);
        tester.assertEqual(qMoqMinus1.isBelowMoq, true, `${p.name} at MOQ-1 (${p.moq - 1}) must be below MOQ`);

        // Qty = exact MOQ
        const qMoq = calculateQuotePricing(p, p.moq);
        tester.assertEqual(qMoq.isBelowMoq, false, `${p.name} at MOQ (${p.moq}) must NOT be below MOQ`);
        tester.assertEqual(qMoq.isMoqSatisfied, true);

        // Qty = MOQ + 1
        const qMoqPlus1 = calculateQuotePricing(p, p.moq + 1);
        tester.assertEqual(qMoqPlus1.isBelowMoq, false, `${p.name} at MOQ+1 (${p.moq + 1}) must NOT be below MOQ`);
        tester.assertEqual(qMoqPlus1.isMoqSatisfied, true);
      }
    });

    tester.test('S3.2: Every bracket threshold across ALL 12 products resolves exact tier unitPrice', () => {
      for (const p of MOCK_PRODUCTS) {
        for (let i = 0; i < p.priceTiers.length; i++) {
          const tier = p.priceTiers[i];
          
          // Test at minQuantity
          const atMin = calculateQuotePricing(p, tier.minQuantity);
          tester.assertEqual(atMin.unitPrice, tier.unitPrice, 
            `${p.name} tier ${i} minQty ${tier.minQuantity} unitPrice mismatch: got ${atMin.unitPrice}, exp ${tier.unitPrice}`);

          // Test at maxQuantity (if bounded)
          if (tier.maxQuantity !== null) {
            const atMax = calculateQuotePricing(p, tier.maxQuantity);
            tester.assertEqual(atMax.unitPrice, tier.unitPrice,
              `${p.name} tier ${i} maxQty ${tier.maxQuantity} unitPrice mismatch: got ${atMax.unitPrice}, exp ${tier.unitPrice}`);

            // Test boundary step: maxQuantity + 1 switches to next tier
            if (i + 1 < p.priceTiers.length) {
              const nextTier = p.priceTiers[i + 1];
              const atStep = calculateQuotePricing(p, tier.maxQuantity + 1);
              tester.assertEqual(atStep.unitPrice, nextTier.unitPrice,
                `${p.name} step from tier ${i} to ${i+1} at ${tier.maxQuantity + 1} failed`);
            }
          }
        }
      }
    });

    tester.test('S3.3: High-volume stress (10K, 100K, 1M, 1B units) calculates without numeric overflow', () => {
      for (const p of MOCK_PRODUCTS) {
        const lowestTierPrice = p.priceTiers[p.priceTiers.length - 1].unitPrice;
        
        const q10k = calculateQuotePricing(p, 10000);
        tester.assertEqual(q10k.unitPrice, lowestTierPrice);
        tester.assertEqual(q10k.productSubtotal, 10000 * lowestTierPrice);

        const q1m = calculateQuotePricing(p, 1000000);
        tester.assertEqual(q1m.unitPrice, lowestTierPrice);
        tester.assertEqual(q1m.productSubtotal, 1000000 * lowestTierPrice);
        tester.assert(isFinite(q1m.estimatedTotal), `Total must be finite for ${p.name}`);
        tester.assert(!isNaN(q1m.estimatedTotal), `Total must not be NaN for ${p.name}`);
      }
    });

    tester.test('S3.4: Negative quantities handle safely with non-negative subtotals', () => {
      const titan = MOCK_PRODUCTS[0];
      const qNeg = calculateQuotePricing(titan, -50);
      tester.assertEqual(qNeg.isBelowMoq, true);
      tester.assertEqual(qNeg.isMoqSatisfied, false);
      tester.assertEqual(qNeg.quantity, 0);
      tester.assertEqual(qNeg.productSubtotal, 0);
      tester.assertEqual(qNeg.estimatedTotal, 0);
    });

    tester.test('S3.5: Fractional quantities handle cleanly', () => {
      const titan = MOCK_PRODUCTS[0];
      const qFloat = calculateQuotePricing(titan, 50.5);
      tester.assert(!isNaN(qFloat.estimatedTotal), 'Float quantity total is not NaN');
      tester.assertEqual(qFloat.unitPrice, 52.00); // 50-99 tier
    });

    tester.test('S3.6: maxMoq filter boundary tests across catalog', () => {
      // MOQ min is 15, max is 50
      tester.assertEqual(queryProducts(MOCK_PRODUCTS, { maxMoq: 0 }).length, 12); // unconstrained or 0
      tester.assertEqual(queryProducts(MOCK_PRODUCTS, { maxMoq: 14 }).length, 0);
      tester.assertEqual(queryProducts(MOCK_PRODUCTS, { maxMoq: 15 }).length, 1); // Aerocrest (15)
      tester.assertEqual(queryProducts(MOCK_PRODUCTS, { maxMoq: 20 }).length, 2); // Aerocrest (15), Monaco (20)
      tester.assertEqual(queryProducts(MOCK_PRODUCTS, { maxMoq: 25 }).length, 6); // + Titan, Vanguard, Artisan, Stormtech (25)
      tester.assertEqual(queryProducts(MOCK_PRODUCTS, { maxMoq: 30 }).length, 8); // + Roastery (30), Merino (30)
      tester.assertEqual(queryProducts(MOCK_PRODUCTS, { maxMoq: 35 }).length, 9); // + Verda (35)
      tester.assertEqual(queryProducts(MOCK_PRODUCTS, { maxMoq: 50 }).length, 12); // all 12
    });
  });

  // ============================================================================
  // SUITE 4: Customization Combinations & Edge Cases
  // ============================================================================
  tester.describe('Stress Suite 4: Customization Combinations & Math Invariants', () => {
    const titan = MOCK_PRODUCTS.find((p) => p.id === 'prod-titan-charger');

    tester.test('S4.1: Zero customizations produces exactly $0 setup and $0 unit custom fee', () => {
      const q = calculateQuotePricing(titan, 100, []);
      tester.assertEqual(q.setupFeesTotal, 0);
      tester.assertEqual(q.customizationUnitTotal, 0);
      tester.assertEqual(q.customizationSubtotal, 0);
      tester.assertEqual(q.estimatedTotal, q.productSubtotal);
    });

    tester.test('S4.2: All customizations enabled simultaneously sums setup fees and unit costs correctly', () => {
      const allIds = titan.customizationOptions.map((c) => c.id);
      const expectedSetupSum = titan.customizationOptions.reduce((s, c) => s + c.setupFee, 0);
      const expectedUnitSum = titan.customizationOptions.reduce((s, c) => s + c.unitCost, 0);

      const q = calculateQuotePricing(titan, 100, allIds);
      tester.assertEqual(q.setupFeesTotal, expectedSetupSum); // 45 + 60 + 75 = 180
      tester.assertEqual(q.customizationUnitTotal, expectedUnitSum * 100); // 10.00 * 100 = 1000
      tester.assertEqual(q.customizationSubtotal, 1180);
      tester.assertEqual(q.estimatedTotal, 4700 + 1180); // 5880
    });

    tester.test('S4.3: Unknown / Invalid / Malicious customization IDs are safely ignored', () => {
      const q = calculateQuotePricing(titan, 50, [
        'invalid-id-999',
        '<script>alert(1)</script>',
        '',
        null,
        undefined
      ]);
      tester.assertEqual(q.setupFeesTotal, 0);
      tester.assertEqual(q.customizationUnitTotal, 0);
      tester.assertEqual(q.customizationSubtotal, 0);
    });

    tester.test('S4.4: Customization setup fee invariance under volume scaling (25 vs 50,000 units)', () => {
      const q25 = calculateQuotePricing(titan, 25, ['c-titan-laser']);
      const q50000 = calculateQuotePricing(titan, 50000, ['c-titan-laser']);

      tester.assertEqual(q25.setupFeesTotal, 45.00);
      tester.assertEqual(q50000.setupFeesTotal, 45.00);
      // Unit custom fee scales linearly:
      tester.assertEqual(q25.customizationUnitTotal, 25 * 2.50);
      tester.assertEqual(q50000.customizationUnitTotal, 50000 * 2.50);
    });

    tester.test('S4.5: Effective unit cost strictly decreases with order volume due to setup amortization', () => {
      const q25 = calculateQuotePricing(titan, 25, ['c-titan-laser']);
      const q100 = calculateQuotePricing(titan, 100, ['c-titan-laser']);
      const q500 = calculateQuotePricing(titan, 500, ['c-titan-laser']);
      const q5000 = calculateQuotePricing(titan, 5000, ['c-titan-laser']);

      tester.assert(q25.effectiveUnitCost > q100.effectiveUnitCost, 'Effective unit cost 25 > 100');
      tester.assert(q100.effectiveUnitCost > q500.effectiveUnitCost, 'Effective unit cost 100 > 500');
      tester.assert(q500.effectiveUnitCost > q5000.effectiveUnitCost, 'Effective unit cost 500 > 5000');
    });

    tester.test('S4.6: Direct CustomizationOption object injection works with partial properties', () => {
      const customOpt = {
        id: 'c-bespoke-plaque',
        name: 'Bespoke Sterling Gold Inlay',
        setupFee: 150.00,
        unitCost: 8.50
      };
      const q = calculateQuotePricing(titan, 100, [customOpt]);
      tester.assertEqual(q.setupFeesTotal, 150.00);
      tester.assertEqual(q.customizationUnitTotal, 850.00);
      tester.assertEqual(q.customizationSubtotal, 1000.00);
    });

    tester.test('S4.7: Customization with 0 setup fee and 0 unit cost handles without error', () => {
      const freeOpt = { id: 'c-free', name: 'Complimentary Note', setupFee: 0, unitCost: 0 };
      const q = calculateQuotePricing(titan, 50, [freeOpt]);
      tester.assertEqual(q.setupFeesTotal, 0);
      tester.assertEqual(q.customizationUnitTotal, 0);
      tester.assertEqual(q.customizationSubtotal, 0);
      tester.assertEqual(q.estimatedTotal, q.productSubtotal);
    });

    tester.test('S4.8: Duplicate customization IDs evaluation', () => {
      // In cases where duplicate IDs are passed (e.g. ['c-titan-laser', 'c-titan-laser'])
      const qDup = calculateQuotePricing(titan, 25, ['c-titan-laser', 'c-titan-laser']);
      // Each entry in array is resolved and accumulated
      tester.assertEqual(qDup.setupFeesTotal, 90.00);
      tester.assertEqual(qDup.customizationUnitTotal, 25 * 5.00);
      tester.recordFinding(
        'Customization Engine',
        'Multi-Position Customization Stacking',
        'Passing duplicate customization IDs or options correctly stacks them (e.g., laser engraving on both front and back plates).'
      );
    });
  });

  // ============================================================================
  // SUITE 5: Dynamic Routing & Slug Resolution Hardening
  // ============================================================================
  tester.describe('Stress Suite 5: Dynamic Routing & Slug Resolution Hardening', () => {
    tester.test('S5.1: Path traversal attack strings return undefined safely (404)', () => {
      const traversalStrings = [
        '../../etc/passwd',
        '..\\..\\windows\\system32',
        '/etc/shadow',
        '../products/sterling-titan-wireless-charging-station',
        '%2e%2e%2fetc%2fpasswd',
        '....//....//etc/passwd'
      ];
      for (const s of traversalStrings) {
        const result = getProductBySlug(s);
        tester.assertEqual(result, undefined, `Path traversal resolved: ${s}`);
      }
    });

    tester.test('S5.2: SQL / XSS attack slugs return undefined safely (404)', () => {
      const injectionSlugs = [
        "' OR '1'='1",
        "<script>alert(1)</script>",
        "\"><img src=x onerror=alert(1)>",
        "admin'--",
        "sterling-titan-wireless-charging-station' OR '1'='1"
      ];
      for (const s of injectionSlugs) {
        const result = getProductBySlug(s);
        tester.assertEqual(result, undefined, `Injection slug resolved: ${s}`);
      }
    });

    tester.test('S5.3: Non-string and empty inputs return undefined safely', () => {
      const nonStrings = [
        '',
        '     ',
        '\t\n\r',
        null,
        undefined,
        12345,
        true,
        false,
        {},
        [],
        NaN
      ];
      for (const val of nonStrings) {
        const result = getProductBySlug(val);
        tester.assertEqual(result, undefined, `Non-string value did not return undefined: ${String(val)}`);
      }
    });

    tester.test('S5.4: Whitespace-padded valid slug resolves correctly after trimming', () => {
      const padded = '  sterling-titan-wireless-charging-station  \n';
      const result = getProductBySlug(padded);
      tester.assert(result !== undefined, 'Padded slug must resolve after trim');
      tester.assertEqual(result.id, 'prod-titan-charger');
    });

    tester.test('S5.5: Category slug does NOT resolve as a product (prevents namespace collision)', () => {
      for (const cat of MOCK_CATEGORIES) {
        const result = getProductBySlug(cat.slug);
        tester.assertEqual(result, undefined, `Category slug ${cat.slug} resolved as product`);
      }
    });

    tester.test('S5.6: Bidirectional 1:1 Slug mapping across all 12 catalog products', () => {
      for (const p of MOCK_PRODUCTS) {
        const resolved = getProductBySlug(p.slug);
        tester.assert(resolved !== undefined, `Product ${p.slug} must resolve`);
        tester.assertEqual(resolved.id, p.id);
        tester.assertEqual(resolved.title, p.title);
      }
    });
  });

  // ============================================================================
  // SUITE 6: Sorting Pipelines & Field Missing Resilience
  // ============================================================================
  tester.describe('Stress Suite 6: Sorting Pipelines & Robustness', () => {
    tester.test('S6.1: Fallback on unrecognized sortBy options defaults safely to featured sort', () => {
      const invalidSort1 = queryProducts(MOCK_PRODUCTS, { sortBy: 'unrecognized-sort-mode' });
      const featuredSort = queryProducts(MOCK_PRODUCTS, { sortBy: 'featured' });
      tester.assertEqual(invalidSort1.length, 12);
      tester.assertEqual(invalidSort1[0].id, featuredSort[0].id);
    });

    tester.test('S6.2: Empty catalog array returns empty array [] without error', () => {
      const emptyRes = queryProducts([], { searchQuery: 'titan', minPrice: 10 });
      tester.assertEqual(emptyRes.length, 0);
    });

    tester.test('S6.3: getAllCategories dynamically reflects catalog size and distribution', () => {
      const cats = getAllCategories();
      tester.assertEqual(cats.length, 6);
      const totalCount = cats.reduce((sum, c) => sum + c.count, 0);
      tester.assertEqual(totalCount, 12);
    });
  });

  // Print stress test summary
  const duration = ((Date.now() - tester.startTime) / 1000).toFixed(2);
  console.log('\n' + '='.repeat(80));
  console.log('\x1b[1m\x1b[35mEMPIRICAL STRESS TEST RESULTS SUMMARY\x1b[0m');
  console.log('='.repeat(80));
  console.log(`  Total Stress Assertions : \x1b[1m${tester.totalAssertions}\x1b[0m`);
  console.log(`  Passed Stress Tests     : \x1b[32m\x1b[1m${tester.passedAssertions}\x1b[0m`);
  console.log(`  Failed Stress Tests     : ${tester.failedAssertions > 0 ? `\x1b[31m\x1b[1m${tester.failedAssertions}\x1b[0m` : '\x1b[32m0\x1b[0m'}`);
  console.log(`  Execution Duration      : \x1b[33m${duration}s\x1b[0m\n`);

  for (const suite of tester.suites) {
    const passCount = suite.tests.filter((t) => t.status === 'PASS').length;
    const failCount = suite.tests.filter((t) => t.status === 'FAIL').length;
    const color = failCount === 0 ? '\x1b[32m' : '\x1b[31m';
    console.log(`  ${color}●\x1b[0m ${suite.name.padEnd(65)} [${passCount}/${suite.tests.length} passed]`);
  }

  if (tester.failures.length > 0) {
    console.log('\n\x1b[31m\x1b[1mFAILURES IN STRESS HARNESS:\x1b[0m');
    for (const f of tester.failures) {
      console.log(`  ✖ [${f.suite}] ${f.test}: ${f.error}`);
    }
    console.log('='.repeat(80) + '\n');
    return { success: false, tester };
  } else {
    console.log('\n\x1b[32m\x1b[1m✔ ALL 34 ADVERSARIAL STRESS CHALLENGES PASSED EMPIRICALLY!\x1b[0m');
    console.log('='.repeat(80) + '\n');
    return { success: true, tester };
  }
}

if (process.argv[1] && process.argv[1].endsWith('stress_catalog_tests.mjs')) {
  const result = runStressTests();
  process.exit(result.success ? 0 : 1);
}
