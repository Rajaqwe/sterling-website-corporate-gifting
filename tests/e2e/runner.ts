/**
 * E2E Test Suite Runner
 * References and executes tests across all 4 Tiers.
 */

import { runAllCatalogTests } from '../run_catalog_tests.mjs';

export function executeE2ETests() {
  return runAllCatalogTests();
}

if (typeof require !== 'undefined' && require.main === module) {
  const res = executeE2ETests();
  process.exit(res.passed ? 0 : 1);
}
