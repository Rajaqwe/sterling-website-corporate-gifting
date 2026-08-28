# E2E Test Infra: Sterling B2B Corporate Gifting Platform

## Test Philosophy
- **Opaque-box, requirement-driven**: Tests derive strictly from `ORIGINAL_REQUEST.md` and user requirements.
- **Verification Methodology**: Category-Partition + Boundary Value Analysis + Cross-Feature Interactions + Realistic End-to-End Scenarios.
- **Independence**: Test suite exercises the rendered DOM, component output, routing, and data contracts without depending on internal implementation details.

## Feature Inventory
| # | Feature | Source (Requirement) | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---------|----------------------|:------:|:------:|:------:|:------:|
| 1 | B2B Product Card | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ | ✓ |
| 2 | Product Listing Page (PLP) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 3 | Filter Sidebar (Category, Price, MOQ) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 4 | Search & Sorting Bar | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ | ✓ |
| 5 | Product Detail Page (PDP) | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 6 | PDP Image Gallery | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 7 | Tiered Bulk Pricing Table | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 8 | Customization / Branding Toggles | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 9 | Request Quote CTA & Calculation | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ | ✓ |
| 10 | TypeScript Build Integrity | ORIGINAL_REQUEST Acceptance | 1 | 1 | ✓ | ✓ |

## Test Architecture
- **Test Runner**: Node.js / TypeScript test runner (`tests/run-all-tests.mjs` or `tests/e2e/catalog.test.ts` or custom runner script).
- **Pass/Fail Semantics**: All test assertions must evaluate to true with exit code 0.
- **Directory Layout**:
  - `tests/e2e/test_cases.ts` — Comprehensive test assertions across Tiers 1-4.
  - `tests/e2e/runner.ts` — Automated test executor that validates mock data, components, query engine, and routes.

## Test Tiers Breakdown
- **Tier 1 (Feature Coverage)**: 50 test assertions covering isolated feature rendering (ProductCard MOQ & price badges, PLP grid count >= 6, PDP image area, customization options, bulk pricing tiers, Request Quote button).
- **Tier 2 (Boundary & Corner Cases)**: 50 test assertions covering edge cases (zero search results, extreme price bounds, minimum and maximum MOQ quantities, extreme bulk volume brackets, invalid product slugs, missing optional specs).
- **Tier 3 (Cross-Feature Combinations)**: 15 pairwise integration tests (combining search query + category filter + MOQ slider + sorting; PDP variant toggle + multiple customization checkboxes + volume bracket tier pricing calculation).
- **Tier 4 (Real-World Application Scenarios)**: 8 realistic enterprise user workflows (e.g. Corporate Holiday Gift Procurement, Tech Summit Executive Swag Bag, Eco-Friendly Onboarding Kit, VIP Client Wine Gift Set).

## Coverage Thresholds
- Tier 1: >= 50 test cases (>= 5 per feature)
- Tier 2: >= 50 boundary test cases (>= 5 per feature)
- Tier 3: >= 10 cross-feature tests
- Tier 4: >= 5 application-level workflow tests
- **Total: >= 115 test cases**
