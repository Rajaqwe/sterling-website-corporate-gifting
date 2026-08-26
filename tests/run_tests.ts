/**
 * TypeScript Test Runner Entry Point for Sterling B2B Corporate Gifting Catalog
 * Directly wraps and executes the complete 4-Tier test suite.
 */

import { runAllCatalogTests } from './run_catalog_tests.mjs';

const result = runAllCatalogTests();
if (!result.passed) {
  process.exit(1);
} else {
  process.exit(0);
}
