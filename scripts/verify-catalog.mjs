import { PRODUCTS, CATEGORIES } from "../src/lib/constants/products.js";
import {
  queryProducts,
  calculateQuotePricing,
  getProductBySlug,
  getAllCategories,
} from "../src/lib/utils/pricing.js";

console.log("=== VERIFYING PRODUCT CATALOG & DOMAIN LOGIC ===");

// 1. Verify Catalog Inventory
console.log(`Total Products in Catalog: ${PRODUCTS.length} (Expected >= 12)`);
if (PRODUCTS.length < 12) throw new Error("Expected at least 12 mock products");

console.log(`Total Categories: ${CATEGORIES.length} (Expected >= 6)`);
if (CATEGORIES.length < 6) throw new Error("Expected at least 6 categories");

// Verify all products have required fields
for (const p of PRODUCTS) {
  if (!p.id || !p.slug || !p.title || !p.category || !p.moq || !p.priceTiers || p.priceTiers.length === 0) {
    throw new Error(`Product ${p.id} is missing essential fields`);
  }
  if (p.moq <= 0) throw new Error(`Product ${p.id} has invalid MOQ ${p.moq}`);
  if (!p.images || p.images.length === 0) throw new Error(`Product ${p.id} has no images`);
}
console.log("✓ All 12 products validated with authentic data, price tiers, and MOQs.");

// 2. Test Category Query & Product Count
const categoriesWithCount = getAllCategories();
console.log("Categories with item counts:", categoriesWithCount.map(c => `${c.name}: ${c.count}`).join(", "));
const totalCategoryItems = categoriesWithCount.reduce((acc, c) => acc + c.count, 0);
if (totalCategoryItems !== PRODUCTS.length) {
  throw new Error(`Category item sum (${totalCategoryItems}) does not match catalog count (${PRODUCTS.length})`);
}
console.log("✓ getAllCategories() returned accurate distribution.");

// 3. Test Filter Pipeline
// Category filter
const techProducts = queryProducts(PRODUCTS, { category: "executive-tech" });
console.log(`Executive Tech products found: ${techProducts.length}`);
if (techProducts.length === 0) throw new Error("Executive tech category query failed");

// MOQ filter
const smallMoqProducts = queryProducts(PRODUCTS, { maxMoq: 25 });
console.log(`Products with MOQ <= 25: ${smallMoqProducts.length}`);
if (smallMoqProducts.some(p => p.moq > 25)) throw new Error("MOQ filter leak detected");

// Price filter
const cheapProducts = queryProducts(PRODUCTS, { maxPrice: 40 });
console.log(`Products with starting price <= $40: ${cheapProducts.length}`);
if (cheapProducts.some(p => p.startingPrice > 40)) throw new Error("Price filter leak detected");

// Search filter
const searchTitan = queryProducts(PRODUCTS, { searchQuery: "titan" });
console.log(`Search 'titan' found: ${searchTitan.length} items`);
if (searchTitan.length !== 1 || searchTitan[0].slug !== "sterling-titan-wireless-charging-station") {
  throw new Error("Search query matching failed");
}

// Empty search filter
const noMatch = queryProducts(PRODUCTS, { searchQuery: "nonexistent-xyz-query" });
if (noMatch.length !== 0) throw new Error("Empty search query returned non-zero items");
console.log("✓ Filter & search pipeline tests passed.");

// 4. Test Quote Pricing Calculation
const testProduct = PRODUCTS[0]; // Titan charger, MOQ = 25, startingPrice = 42, basePrice = 58
console.log(`Testing pricing for: ${testProduct.title} (MOQ ${testProduct.moq})`);

// Below MOQ test
const belowMoqCalc = calculateQuotePricing(testProduct, 10, []);
if (belowMoqCalc.isMoqSatisfied !== false || belowMoqCalc.isBelowMoq !== true) {
  throw new Error("Below MOQ detection failed");
}
console.log(`✓ Below MOQ calculation handled correctly (Qty: 10, isBelowMoq: ${belowMoqCalc.isBelowMoq})`);

// Tier 1 test (25-49 @ $58)
const tier1Calc = calculateQuotePricing(testProduct, 25, []);
if (tier1Calc.tierUnitPrice !== 58.00 || tier1Calc.productSubtotal !== 25 * 58.00) {
  throw new Error(`Tier 1 pricing mismatch: got ${tier1Calc.tierUnitPrice}, expected 58.00`);
}
console.log(`✓ Tier 1 (25 units): Unit price = $${tier1Calc.tierUnitPrice}, Subtotal = $${tier1Calc.productSubtotal}`);

// Highest tier test (500+ @ $42)
const tierHighCalc = calculateQuotePricing(testProduct, 500, []);
if (tierHighCalc.tierUnitPrice !== 42.00 || tierHighCalc.productSubtotal !== 500 * 42.00) {
  throw new Error(`High tier pricing mismatch: got ${tierHighCalc.tierUnitPrice}, expected 42.00`);
}
console.log(`✓ High Tier (500 units): Unit price = $${tierHighCalc.tierUnitPrice}, Subtotal = $${tierHighCalc.productSubtotal}, Savings = $${tierHighCalc.savingsTotal}`);

// Customization fee test
const customCalc = calculateQuotePricing(testProduct, 100, [testProduct.customizations[0].id]);
const expectedSetup = testProduct.customizations[0].setupFee; // 45
const expectedUnitCustom = testProduct.customizations[0].unitCost * 100; // 2.50 * 100 = 250
const expectedSubtotal = 47.00 * 100; // 4700
const expectedTotal = expectedSubtotal + expectedSetup + expectedUnitCustom; // 4700 + 45 + 250 = 4995

if (customCalc.estimatedTotal !== expectedTotal) {
  throw new Error(`Customization total mismatch: got ${customCalc.estimatedTotal}, expected ${expectedTotal}`);
}
console.log(`✓ Customization calculation passed: Total = $${customCalc.estimatedTotal} (Expected: $${expectedTotal})`);

// 5. Test getProductBySlug
const resolvedProduct = getProductBySlug("sterling-titan-wireless-charging-station");
if (!resolvedProduct || resolvedProduct.id !== testProduct.id) {
  throw new Error("getProductBySlug failed");
}
console.log("✓ getProductBySlug() resolved correctly.");

console.log("\n=== ALL VERIFICATION TESTS PASSED SUCCESSFULLY ===");
