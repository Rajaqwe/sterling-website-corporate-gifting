#!/usr/bin/env node
/**
 * Master Test Runner: Sterling B2B Corporate Gifting Platform Product Catalog
 * Covers all 4 Tiers:
 * - Tier 1: Feature Coverage (ProductCard, PLP, PDP, Data Contracts, Pure Functions)
 * - Tier 2: Boundary & Corner Cases (0-matches, extreme prices/MOQs, below MOQ, high-volume brackets, 404 slugs)
 * - Tier 3: Cross-Feature Combinations (Multi-facet filtering, search+filter+sort, PDP variant+customization+pricing)
 * - Tier 4: Real-World Application Workflows (Holiday Decanter Gift, Tech Summit, Eco Onboarding, Board Folio, etc.)
 * - Structural Audit: Layout & isolation compliance
 */

import { runTier1Tests } from './suites/tier1_feature_coverage.mjs';
import { runTier2Tests } from './suites/tier2_boundary_cases.mjs';
import { runTier3Tests } from './suites/tier3_cross_feature.mjs';
import { runTier4Tests } from './suites/tier4_real_world_workflows.mjs';
import { runTier5AdversarialTests } from './suites/tier5_adversarial.mjs';
import { runStructuralAuditTests } from './suites/tier_structural_audit.mjs';

class CatalogTestRunner {
  constructor() {
    this.currentSuite = '';
    this.suites = [];
    this.totalAssertions = 0;
    this.passedAssertions = 0;
    this.failedAssertions = 0;
    this.failures = [];
    this.startTime = Date.now();
  }

  describe(title, fn) {
    this.currentSuite = title;
    const suiteRecord = { title, tests: [] };
    this.suites.push(suiteRecord);
    try {
      fn();
    } catch (err) {
      this.failures.push({
        suite: title,
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
        suite: this.currentSuite,
        test: name,
        error: err.message,
        stack: err.stack
      });
      process.stdout.write(`  \x1b[31m✖\x1b[0m \x1b[31m${name}\x1b[0m\n`);
      process.stdout.write(`    \x1b[33mError:\x1b[0m ${err.message}\n`);
    }
  }

  assert(condition, message = 'Assertion failed') {
    if (!condition) {
      throw new Error(message);
    }
  }

  assertEqual(actual, expected, message) {
    const errorMsg = message || `Expected ${JSON.stringify(expected)}, but received ${JSON.stringify(actual)}`;
    if (actual !== expected) {
      throw new Error(errorMsg);
    }
  }

  assertDeepEqual(actual, expected, message) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr !== expectedStr) {
      throw new Error(message || `Deep equality mismatch:\nExpected: ${expectedStr}\nActual:   ${actualStr}`);
    }
  }

  assertThrows(fn, message = 'Expected function to throw an error') {
    let threw = false;
    try {
      fn();
    } catch (e) {
      threw = true;
    }
    if (!threw) {
      throw new Error(message);
    }
  }

  assertClose(actual, expected, tolerance = 0.01, message) {
    const diff = Math.abs(actual - expected);
    if (diff > tolerance) {
      throw new Error(message || `Expected ${actual} to be within ${tolerance} of ${expected} (diff: ${diff})`);
    }
  }

  printSummary() {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    console.log('\n' + '='.repeat(80));
    console.log('\x1b[1m\x1b[36mSTERLING B2B CORPORATE GIFTING — E2E PRODUCT CATALOG TEST SUITE\x1b[0m');
    console.log('='.repeat(80));

    console.log(`\n\x1b[1mTest Results Summary:\x1b[0m`);
    console.log(`  Total Test Assertions : \x1b[1m${this.totalAssertions}\x1b[0m`);
    console.log(`  Passed Assertions     : \x1b[32m\x1b[1m${this.passedAssertions}\x1b[0m`);
    console.log(`  Failed Assertions     : ${this.failedAssertions > 0 ? `\x1b[31m\x1b[1m${this.failedAssertions}\x1b[0m` : '\x1b[32m0\x1b[0m'}`);
    console.log(`  Execution Time        : \x1b[33m${duration}s\x1b[0m`);

    console.log('\n\x1b[1mTest Breakdown by Tier:\x1b[0m');
    for (const suite of this.suites) {
      const passCount = suite.tests.filter((t) => t.status === 'PASS').length;
      const failCount = suite.tests.filter((t) => t.status === 'FAIL').length;
      const statusColor = failCount === 0 ? '\x1b[32m' : '\x1b[31m';
      console.log(`  ${statusColor}●\x1b[0m ${suite.title.padEnd(65)} [${passCount}/${suite.tests.length} passed]`);
    }

    if (this.failures.length > 0) {
      console.log('\n\x1b[31m\x1b[1mFAILURES REPORT:\x1b[0m');
      for (const fail of this.failures) {
        console.log(`\n\x1b[31m✖ [${fail.suite}] ${fail.test}\x1b[0m`);
        console.log(`  ${fail.error}`);
      }
      console.log('\n' + '='.repeat(80));
      return false;
    } else {
      console.log('\n\x1b[32m\x1b[1m✔ ALL 4 TIERS PASSED PERFECTLY WITH ZERO DEFECTS!\x1b[0m');
      console.log('='.repeat(80) + '\n');
      return true;
    }
  }
}

export function runAllCatalogTests() {
  console.log('\x1b[1m\x1b[34m▶ Initializing Sterling B2B Catalog Automated Test Harness...\x1b[0m\n');
  const runner = new CatalogTestRunner();

  // Execute all 5 tiers & structural checks
  runStructuralAuditTests(runner);
  runTier1Tests(runner);
  runTier2Tests(runner);
  runTier3Tests(runner);
  runTier4Tests(runner);
  runTier5AdversarialTests(runner);

  const passed = runner.printSummary();
  return {
    passed,
    total: runner.totalAssertions,
    passedCount: runner.passedAssertions,
    failedCount: runner.failedAssertions,
    failures: runner.failures
  };
}

// Direct CLI execution
if (process.argv[1] && process.argv[1].endsWith('run_catalog_tests.mjs')) {
  const result = runAllCatalogTests();
  process.exit(result.passed ? 0 : 1);
}
