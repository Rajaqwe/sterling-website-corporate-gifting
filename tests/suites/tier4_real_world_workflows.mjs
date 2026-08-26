/**
 * Tier 4: Real-World Application Workflows Test Suite
 * Validates complete end-to-end B2B corporate gifting scenarios from catalog discovery to quote generation.
 */

import {
  MOCK_PRODUCTS,
  queryProducts,
  calculateQuotePricing,
  getProductBySlug
} from '../oracle/catalog_oracle.mjs';

export function runTier4Tests(tester) {
  tester.describe('Tier 4: Real-World Application Workflows', () => {
    tester.test('W1: Fortune 500 Executive Holiday Decanter Gift (120 units)', () => {
      // 1. PLP Discovery
      const searchResults = queryProducts(MOCK_PRODUCTS, { searchQuery: 'crystal decanter' });
      tester.assertEqual(searchResults.length, 1);
      const product = searchResults[0];
      tester.assertEqual(product.slug, 'monaco-crystal-whiskey-decanter-set');

      // 2. Quantity & MOQ check
      const qty = 120;
      tester.assert(qty >= product.moq, 'Quantity satisfies MOQ (20)');

      // 3. Customizations: Sandblast ($65 + $6/unit) and Brass Box Plaque ($40 + $4.50/unit)
      const selectedCustomizations = ['c-monaco-sandblast', 'c-monaco-plaque'];
      const quote = calculateQuotePricing(product, qty, selectedCustomizations);

      // Math verification:
      // Tier: 100-249 units -> $78.00/unit
      // Product subtotal: 120 * $78.00 = $9,360.00
      // Setup total: $65.00 + $40.00 = $105.00
      // Unit custom total: 120 * ($6.00 + $4.50) = 120 * $10.50 = $1,260.00
      // Estimated total: $9,360.00 + $105.00 + $1,260.00 = $10,725.00
      tester.assertEqual(quote.activeTier.unitPrice, 78.00);
      tester.assertEqual(quote.productSubtotal, 9360.00);
      tester.assertEqual(quote.customizationSetupTotal, 105.00);
      tester.assertEqual(quote.customizationUnitTotal, 1260.00);
      tester.assertEqual(quote.customizationSubtotal, 1365.00);
      tester.assertEqual(quote.estimatedTotal, 10725.00);
      tester.assertEqual(quote.effectiveUnitCost, 89.38);
      tester.assertEqual(quote.isMoqSatisfied, true);
    });

    tester.test('W2: Global Tech Summit Speaker & VIP Swag Bag (250 units)', () => {
      // 1. PLP Discovery
      const techProducts = queryProducts(MOCK_PRODUCTS, { categories: ['executive-tech'] });
      const titan = techProducts.find((p) => p.slug === 'sterling-titan-wireless-charging-station');
      tester.assert(titan !== undefined);

      // 2. Select Variant: Obsidian Black
      const variant = titan.variants.find((v) => v.id === 'v-titan-obsidian');
      tester.assert(variant !== undefined && variant.inStock === true);

      // 3. Select Customizations: Laser Engraving ($45 + $2.50) + Custom Presentation Sleeve ($75 + $4.00)
      const qty = 250;
      const quote = calculateQuotePricing(titan, qty, ['c-titan-laser', 'c-titan-sleeve']);

      // Tier: 250-499 -> $44.00/unit
      // Product: 250 * $44.00 = $11,000.00
      // Setup: $45 + $75 = $120.00
      // Custom unit: 250 * ($2.50 + $4.00) = 250 * $6.50 = $1,625.00
      // Total = $11,000.00 + $120.00 + $1,625.00 = $12,745.00
      tester.assertEqual(quote.unitPrice, 44.00);
      tester.assertEqual(quote.productSubtotal, 11000.00);
      tester.assertEqual(quote.customizationSetupTotal, 120.00);
      tester.assertEqual(quote.customizationUnitTotal, 1625.00);
      tester.assertEqual(quote.estimatedTotal, 12745.00);
      tester.assertEqual(quote.effectiveUnitCost, 50.98);
    });

    tester.test('W3: Eco-Friendly New Hire Onboarding Kit (75 units)', () => {
      // 1. PLP Discovery
      const ecoProducts = queryProducts(MOCK_PRODUCTS, { categories: ['eco-friendly'] });
      const verda = ecoProducts.find((p) => p.slug === 'verda-recycled-canvas-laptop-tote');
      tester.assert(verda !== undefined);

      // 2. Select Olive Variant & Embroidery
      const qty = 75;
      const quote = calculateQuotePricing(verda, qty, ['c-verda-embroidery']);

      // Tier: 75-149 -> $43.00/unit
      // Product: 75 * $43.00 = $3,225.00
      // Setup: $45.00, Unit: 75 * $3.20 = $240.00
      // Total = $3,225.00 + $45.00 + $240.00 = $3,510.00
      tester.assertEqual(quote.unitPrice, 43.00);
      tester.assertEqual(quote.productSubtotal, 3225.00);
      tester.assertEqual(quote.customizationSetupTotal, 45.00);
      tester.assertEqual(quote.customizationUnitTotal, 240.00);
      tester.assertEqual(quote.estimatedTotal, 3510.00);
      tester.assertEqual(quote.effectiveUnitCost, 46.80);
    });

    tester.test('W4: Board of Directors Appreciation Folio (35 units)', () => {
      // 1. Discover Portfolio
      const portfolio = getProductBySlug('vanguard-full-grain-leather-portfolio');
      tester.assert(portfolio !== undefined);

      // 2. Customization: Metallic Gold Foil Stamp ($60 + $3.00/unit)
      const qty = 35;
      const quote = calculateQuotePricing(portfolio, qty, ['c-vg-gold-foil']);

      // Tier: 25-49 -> $65.00/unit
      // Product: 35 * $65.00 = $2,275.00
      // Setup: $60.00, Unit: 35 * $3.00 = $105.00
      // Total = $2,275.00 + $60.00 + $105.00 = $2,440.00
      tester.assertEqual(quote.unitPrice, 65.00);
      tester.assertEqual(quote.productSubtotal, 2275.00);
      tester.assertEqual(quote.customizationSetupTotal, 60.00);
      tester.assertEqual(quote.customizationUnitTotal, 105.00);
      tester.assertEqual(quote.estimatedTotal, 2440.00);
      tester.assertEqual(quote.effectiveUnitCost, 69.71);
    });

    tester.test('W5: All-Hands Corporate Milestone Coffee Celebration (500 units)', () => {
      const coffee = getProductBySlug('roastery-select-pour-over-coffee-kit');
      tester.assert(coffee !== undefined);

      // Qty 500 units + Dual Customization (Kiln Fired Ceramic $50+$2.20 + Roast Bag Label $35+$1.50)
      const qty = 500;
      const quote = calculateQuotePricing(coffee, qty, ['c-rst-ceramic-print', 'c-rst-coffee-bag']);

      // Tier: 250+ -> $46.00/unit (Starting price was $62.00)
      // Product: 500 * $46.00 = $23,000.00
      // Setup: $50 + $35 = $85.00
      // Unit custom: 500 * ($2.20 + $1.50) = 500 * $3.70 = $1,850.00
      // Total: $23,000.00 + $85.00 + $1,850.00 = $24,935.00
      // Volume savings on product: 500 * ($62 - $46) = $8,000.00
      tester.assertEqual(quote.unitPrice, 46.00);
      tester.assertEqual(quote.productSubtotal, 23000.00);
      tester.assertEqual(quote.customizationSetupTotal, 85.00);
      tester.assertEqual(quote.customizationUnitTotal, 1850.00);
      tester.assertEqual(quote.estimatedTotal, 24935.00);
      tester.assertEqual(quote.savingsTotal, 8000.00);
      tester.assertEqual(quote.effectiveUnitCost, 49.87);
    });

    tester.test('W6: Quick-Ship Trade Show Rush Swag Order (500 units)', () => {
      // 1. PLP Filter by tag 'quick-ship'
      const quickShipProducts = queryProducts(MOCK_PRODUCTS, { tags: ['quick-ship'] });
      tester.assertEqual(quickShipProducts.length, 1);
      const pen = quickShipProducts[0];
      tester.assertEqual(pen.slug, 'kensington-brass-rollerball-pen-gift-box');
      tester.assertEqual(pen.leadTime, '3-5 business days');

      // 2. Quantity 500 with Barrel Laser Engraving ($30 setup + $1.20/unit)
      const qty = 500;
      const quote = calculateQuotePricing(pen, qty, ['c-ken-engrave']);

      // Tier: 500+ -> $22.00/unit
      // Product: 500 * $22.00 = $11,000.00
      // Setup: $30.00, Unit: 500 * $1.20 = $600.00
      // Total = $11,000.00 + $30.00 + $600.00 = $11,630.00
      tester.assertEqual(quote.unitPrice, 22.00);
      tester.assertEqual(quote.productSubtotal, 11000.00);
      tester.assertEqual(quote.customizationSetupTotal, 30.00);
      tester.assertEqual(quote.customizationUnitTotal, 600.00);
      tester.assertEqual(quote.estimatedTotal, 11630.00);
    });

    tester.test('W7: Corporate Executive Winter Retreat Apparel Bundle (100 Jackets + 100 Sweaters)', () => {
      const jacket = getProductBySlug('stormtech-commuter-waterproof-jacket');
      const sweater = getProductBySlug('merino-loft-quarter-zip-sweater');

      // Jacket (qty 100, Tier 100-249: $95.00/unit, Heat Seal: $45 setup + $3.00/unit)
      const jacketQuote = calculateQuotePricing(jacket, 100, ['c-stm-heat-seal']);
      // Product = 100 * $95 = $9,500; Setup = $45; Custom = $300 -> $9,845.00
      tester.assertEqual(jacketQuote.estimatedTotal, 9845.00);

      // Sweater (qty 100, Tier 60-119: $70.00/unit, Embroidery: $40 setup + $3.50/unit)
      const sweaterQuote = calculateQuotePricing(sweater, 100, ['c-mrn-embroidery']);
      // Product = 100 * $70 = $7,000; Setup = $40; Custom = $350 -> $7,390.00
      tester.assertEqual(sweaterQuote.estimatedTotal, 7390.00);

      const consolidatedTotal = jacketQuote.estimatedTotal + sweaterQuote.estimatedTotal;
      tester.assertEqual(consolidatedTotal, 17235.00);
    });

    tester.test('W8: Multi-Variant Batch Corporate Gift Campaign (300 Tumbler Units Total)', () => {
      const tumbler = getProductBySlug('solis-copper-insulated-tumbler-set');
      // Total batch size of 300 across variants qualifies for 250-499 tier ($27.00/unit)
      const qty = 300;
      const quote = calculateQuotePricing(tumbler, qty, ['c-solis-laser']);

      // Tier: 250-499 -> $27.00/unit
      // Product: 300 * $27.00 = $8,100.00
      // Setup: $35.00, Unit: 300 * $1.75 = $525.00
      // Total = $8,100.00 + $35.00 + $525.00 = $8,660.00
      tester.assertEqual(quote.unitPrice, 27.00);
      tester.assertEqual(quote.productSubtotal, 8100.00);
      tester.assertEqual(quote.customizationSetupTotal, 35.00);
      tester.assertEqual(quote.customizationUnitTotal, 525.00);
      tester.assertEqual(quote.estimatedTotal, 8660.00);
    });

    tester.test('W9: Sustainable Office Modernization Kit (150 Bamboo Stations)', () => {
      const bamboo = getProductBySlug('botanica-bamboo-desk-organizer-station');
      const qty = 150;
      // Laser ($35 + $1.50) + Seed Card ($25 + $0.85)
      const quote = calculateQuotePricing(bamboo, qty, ['c-bot-laser', 'c-bot-seedcard']);

      // Tier: 100-249 -> $24.50/unit
      // Product: 150 * $24.50 = $3,675.00
      // Setup: $35 + $25 = $60.00
      // Unit custom: 150 * ($1.50 + $0.85) = 150 * $2.35 = $352.50
      // Total = $3,675.00 + $60.00 + $352.50 = $4,087.50
      tester.assertEqual(quote.unitPrice, 24.50);
      tester.assertEqual(quote.productSubtotal, 3675.00);
      tester.assertEqual(quote.customizationSetupTotal, 60.00);
      tester.assertEqual(quote.customizationUnitTotal, 352.50);
      tester.assertEqual(quote.estimatedTotal, 4087.50);
    });

    tester.test('W10: VIP Milestone Gourmet Hamper (60 Charcuterie Boards)', () => {
      const charcuterie = getProductBySlug('artisan-reserve-charcuterie-tasting-board');
      const qty = 60;
      // Wood laser ($45 + $3.50) + Ribbon ($35 + $2.25)
      const quote = calculateQuotePricing(charcuterie, qty, ['c-char-laser', 'c-char-ribbon']);

      // Tier: 50-99 -> $80.00/unit
      // Product: 60 * $80.00 = $4,800.00
      // Setup: $45 + $35 = $80.00
      // Unit custom: 60 * ($3.50 + $2.25) = 60 * $5.75 = $345.00
      // Total = $4,800.00 + $80.00 + $345.00 = $5,225.00
      tester.assertEqual(quote.unitPrice, 80.00);
      tester.assertEqual(quote.productSubtotal, 4800.00);
      tester.assertEqual(quote.customizationSetupTotal, 80.00);
      tester.assertEqual(quote.customizationUnitTotal, 345.00);
      tester.assertEqual(quote.estimatedTotal, 5225.00);
    });
  });
}
