# Sterling Test Infrastructure & Verification Architecture

## Overview
The Sterling Corporate Gifting Platform uses a multi-layered verification framework ensuring end-to-end reliability, mathematical accuracy, and DOM contract compliance.

## Test Suites

1. **Unit & Integration Testing**:
   - Framework: Vitest (`vitest.config.ts`)
   - Test files: `src/**/*.test.ts`, `tests/**/*.test.ts`
   - Command: `npx vitest run`

2. **Domain Oracle & Catalog Verification**:
   - Runner: `node tests/run_catalog_tests.mjs`
   - Test Tiers:
     - `tier_structural_audit.mjs`: Project layout, documentation, exports, and contracts.
     - `tier1_feature_coverage.mjs`: Core product filtering, sorting, price calculations, and quotation engine.
     - `tier2_boundary_cases.mjs`: MOQ edge cases, negative quantities, boundary discounts, zero custom fees.
     - `tier3_cross_feature.mjs`: Multi-category filtering combined with custom branding and volume pricing.
     - `tier4_real_world_workflows.mjs`: Bulk corporate purchase scenarios, split shipping, and checkout workflows.
     - `tier5_adversarial.mjs`: DOM contract enforcement, testid validation, and deep immutability checks.

3. **End-to-End Testing**:
   - Framework: Playwright (`playwright.config.ts`)
   - Command: `npx playwright test`

4. **Static Analysis & Type Integrity**:
   - TypeScript: `npx tsc --noEmit`
   - ESLint: Flat configuration with `cross-env ESLINT_USE_FLAT_CONFIG=true eslint src/`
