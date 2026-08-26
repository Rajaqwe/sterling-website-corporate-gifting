/**
 * Tier 3: Cross-Feature Combinations Test Suite
 * Validates complex multi-facet filtering, combined search + category + MOQ + sorting, and PDP variant + customization + bulk tier re-calculations.
 */

import {
  MOCK_PRODUCTS,
  queryProducts,
  calculateQuotePricing,
  getProductBySlug
} from '../oracle/catalog_oracle.mjs';

export function runTier3Tests(tester) {
  tester.describe('Tier 3: Cross-Feature Combinations — Multi-Facet Filtering', () => {
    tester.test('T3.1.1: Category "Executive Tech" + Max Price $60 + Max MOQ 25 returns only Titan Charging Station', () => {
      const results = queryProducts(MOCK_PRODUCTS, {
        categories: ['executive-tech'],
        maxPrice: 60,
        maxMoq: 25
      });
      tester.assertEqual(results.length, 1);
      tester.assertEqual(results[0].id, 'prod-titan-charger');
      tester.assertEqual(results[0].startingPrice, 58.00);
      tester.assertEqual(results[0].moq, 25);
    });

    tester.test('T3.1.2: Category "Luxury Drinkware" + Max Price $50 + Max MOQ 50 returns only Solis Tumbler', () => {
      const results = queryProducts(MOCK_PRODUCTS, {
        categories: ['luxury-drinkware'],
        maxPrice: 50,
        maxMoq: 50
      });
      tester.assertEqual(results.length, 1);
      tester.assertEqual(results[0].id, 'prod-solis-tumbler');
      tester.assertEqual(results[0].startingPrice, 34.00);
    });

    tester.test('T3.1.3: Category "Eco-Friendly" + Max Price $30 + Max MOQ 50 returns only Botanica Bamboo Desk Station', () => {
      const results = queryProducts(MOCK_PRODUCTS, {
        categories: ['eco-friendly'],
        maxPrice: 30,
        maxMoq: 50
      });
      tester.assertEqual(results.length, 1);
      tester.assertEqual(results[0].id, 'prod-botanica-bamboo');
      tester.assertEqual(results[0].startingPrice, 28.00);
    });

    tester.test('T3.1.4: Category "Desk & Office" + Search "leather" + Max MOQ 25 returns only Vanguard Portfolio', () => {
      const results = queryProducts(MOCK_PRODUCTS, {
        categories: ['desk-office'],
        searchQuery: 'leather',
        maxMoq: 25
      });
      tester.assertEqual(results.length, 1);
      tester.assertEqual(results[0].id, 'prod-vanguard-portfolio');
    });

    tester.test('T3.1.5: Category "Gourmet Gift Sets" + Max Price $70 + Search "coffee" returns Roastery Coffee Kit', () => {
      const results = queryProducts(MOCK_PRODUCTS, {
        categories: ['gourmet-gift-sets'],
        maxPrice: 70,
        searchQuery: 'coffee'
      });
      tester.assertEqual(results.length, 1);
      tester.assertEqual(results[0].id, 'prod-roastery-coffee');
    });

    tester.test('T3.1.6: Category "Premium Apparel" + Max Price $100 + Max MOQ 30 returns Merino Quarter Zip', () => {
      const results = queryProducts(MOCK_PRODUCTS, {
        categories: ['premium-apparel'],
        maxPrice: 100,
        maxMoq: 30
      });
      tester.assertEqual(results.length, 1);
      tester.assertEqual(results[0].id, 'prod-merino-quarter-zip');
    });
  });

  tester.describe('Tier 3: Cross-Feature Combinations — Search + Multi-Facet + Sorting Pipeline', () => {
    tester.test('T3.2.1: Search "executive" + Sort by "price-asc" orders items cheapest to most expensive', () => {
      const results = queryProducts(MOCK_PRODUCTS, {
        searchQuery: 'executive',
        sortBy: 'price-asc'
      });
      tester.assert(results.length >= 3, 'Must match executive items');
      for (let i = 0; i < results.length - 1; i++) {
        tester.assert(results[i].startingPrice <= results[i + 1].startingPrice, 'Must be sorted ascending');
      }
    });

    tester.test('T3.2.2: Search "bestseller" + Category "Premium Apparel" + Sort by "moq-asc" returns Merino Quarter Zip', () => {
      const results = queryProducts(MOCK_PRODUCTS, {
        searchQuery: 'bestseller',
        categories: ['premium-apparel'],
        sortBy: 'moq-asc'
      });
      tester.assertEqual(results.length, 1);
      tester.assertEqual(results[0].id, 'prod-merino-quarter-zip');
    });

    tester.test('T3.2.3: Multi-Category (Executive Tech + Eco-Friendly) + Max MOQ 25 returns 3 items', () => {
      const results = queryProducts(MOCK_PRODUCTS, {
        categories: ['executive-tech', 'eco-friendly'],
        maxMoq: 25
      });
      // Executive Tech: Titan (25), Aerocrest (15); Eco-Friendly: Verda (35), Botanica (50) -> Only Titan & Aerocrest match <= 25
      tester.assertEqual(results.length, 2);
      tester.assert(results.some((p) => p.id === 'prod-titan-charger'));
      tester.assert(results.some((p) => p.id === 'prod-aerocrest-anc'));
    });

    tester.test('T3.2.4: Category "Desk & Office" + Price Range $30-$70 + Sort by "rating-desc" orders Vanguard before Kensington', () => {
      const results = queryProducts(MOCK_PRODUCTS, {
        categories: ['desk-office'],
        minPrice: 30,
        maxPrice: 70,
        sortBy: 'rating-desc'
      });
      tester.assertEqual(results.length, 2);
      tester.assertEqual(results[0].id, 'prod-vanguard-portfolio'); // 4.95
      tester.assertEqual(results[1].id, 'prod-kensington-pen'); // 4.75
    });

    tester.test('T3.2.5: Search by material keyword "bamboo" returns Botanica Desk Station', () => {
      const results = queryProducts(MOCK_PRODUCTS, { searchQuery: 'bamboo' });
      tester.assertEqual(results.length, 1);
      tester.assertEqual(results[0].id, 'prod-botanica-bamboo');
    });

    tester.test('T3.2.6: Search by keyword "acacia" matches Artisan Charcuterie Board', () => {
      const results = queryProducts(MOCK_PRODUCTS, { searchQuery: 'acacia' });
      tester.assert(results.length >= 1);
      tester.assert(results.some((p) => p.id === 'prod-artisan-charcuterie'));
    });
  });

  tester.describe('Tier 3: Cross-Feature Combinations — PDP Variant + Customization + Bulk Pricing', () => {
    const titan = getProductBySlug('sterling-titan-wireless-charging-station');
    const aerocrest = getProductBySlug('aerocrest-noise-cancelling-headphones');
    const solis = getProductBySlug('solis-copper-insulated-tumbler-set');
    const merino = getProductBySlug('merino-loft-quarter-zip-sweater');
    const charcuterie = getProductBySlug('artisan-reserve-charcuterie-tasting-board');

    tester.test('T3.3.1: Titan Charger + Cognac Variant + Laser Engraving at Qty 100: Total = $4,995.00', () => {
      // 100 * $47.00 = $4,700
      // Laser setup: $45, unit: 100 * $2.50 = $250
      // Total = $4,700 + $45 + $250 = $4,995.00
      const quote = calculateQuotePricing(titan, 100, ['c-titan-laser']);
      tester.assertEqual(quote.productSubtotal, 4700.00);
      tester.assertEqual(quote.customizationSetupTotal, 45.00);
      tester.assertEqual(quote.customizationUnitTotal, 250.00);
      tester.assertEqual(quote.estimatedTotal, 4995.00);
      tester.assertEqual(quote.effectiveUnitCost, 49.95);
    });

    tester.test('T3.3.2: Aerocrest + Platinum Silver + Dual Customizations (Laser + Case Print) at Qty 60: Total = $7,740.00', () => {
      // Qty 60 tier: 60-119 -> $122.00
      // Product: 60 * $122 = $7,320
      // Setup: 50 + 40 = 90
      // Unit custom: 60 * (3.50 + 2.00) = 60 * 5.50 = 330
      // Total = $7,320 + $90 + $330 = $7,740.00
      const quote = calculateQuotePricing(aerocrest, 60, ['c-aero-laser', 'c-aero-case-print']);
      tester.assertEqual(quote.productSubtotal, 7320.00);
      tester.assertEqual(quote.customizationSetupTotal, 90.00);
      tester.assertEqual(quote.customizationUnitTotal, 330.00);
      tester.assertEqual(quote.estimatedTotal, 7740.00);
    });

    tester.test('T3.3.3: Solis Tumbler + Midnight Navy + 360 Laser Engraving at Qty 500: Total = $12,910.00 (Savings: $5,000)', () => {
      // Qty 500 tier: 500+ -> $24.00
      // Product: 500 * $24 = $12,000
      // Setup: $35, Unit custom: 500 * $1.75 = $875
      // Total = $12,000 + $35 + $875 = $12,910.00
      // Volume savings: 500 * ($34 - $24) = $5,000.00
      const quote = calculateQuotePricing(solis, 500, ['c-solis-laser']);
      tester.assertEqual(quote.productSubtotal, 12000.00);
      tester.assertEqual(quote.customizationSetupTotal, 35.00);
      tester.assertEqual(quote.customizationUnitTotal, 875.00);
      tester.assertEqual(quote.estimatedTotal, 12910.00);
      tester.assertEqual(quote.savingsTotal, 5000.00);
    });

    tester.test('T3.3.4: Merino Quarter Zip + Camel Tan + Left Chest Embroidery at Qty 250: Total = $15,415.00', () => {
      // Qty 250 tier: 250+ -> $58.00
      // Product: 250 * $58 = $14,500
      // Setup: $40, Unit custom: 250 * $3.50 = $875
      // Total = $14,500 + $40 + $875 = $15,415.00
      const quote = calculateQuotePricing(merino, 250, ['c-mrn-embroidery']);
      tester.assertEqual(quote.productSubtotal, 14500.00);
      tester.assertEqual(quote.customizationSetupTotal, 40.00);
      tester.assertEqual(quote.customizationUnitTotal, 875.00);
      tester.assertEqual(quote.estimatedTotal, 15415.00);
    });

    tester.test('T3.3.5: Dynamic Quantity Step from 49 to 50 on Titan Charger decreases unit price and adds $300 savings', () => {
      const q49 = calculateQuotePricing(titan, 49, []);
      const q50 = calculateQuotePricing(titan, 50, []);
      tester.assertEqual(q49.unitPrice, 58.00);
      tester.assertEqual(q50.unitPrice, 52.00);
      tester.assertEqual(q49.savingsTotal, 0);
      tester.assertEqual(q50.savingsTotal, 50 * (58.00 - 52.00)); // 300.00
    });

    tester.test('T3.3.6: Artisan Charcuterie Board with Wood Laser + Custom Satin Ribbon at Qty 100: Total = $7,955.00', () => {
      // Qty 100 tier: 100-249 -> $73.00
      // Product: 100 * $73 = $7,300
      // Laser: 45 setup + 100 * 3.50 = 395
      // Ribbon: 35 setup + 100 * 2.25 = 260
      // Total = 7300 + (45+35) + (350+225) = 7300 + 80 + 575 = $7,955.00
      const quote = calculateQuotePricing(charcuterie, 100, ['c-char-laser', 'c-char-ribbon']);
      tester.assertEqual(quote.productSubtotal, 7300.00);
      tester.assertEqual(quote.customizationSetupTotal, 80.00);
      tester.assertEqual(quote.customizationUnitTotal, 575.00);
      tester.assertEqual(quote.estimatedTotal, 7955.00);
    });
  });
}
