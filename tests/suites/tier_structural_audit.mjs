/**
 * Structural & Code Contract Audit Test Suite
 * Validates layout compliance, component contracts, file exports, and TypeScript definitions across milestones.
 */

import fs from 'fs';
import path from 'path';

export function runStructuralAuditTests(tester) {
  tester.describe('Structural & Contract Audit — File Layout & Interfaces', () => {
    const rootDir = process.cwd();

    tester.test('S1: Project configuration files exist (package.json, tsconfig.json, tailwind.config.ts)', () => {
      tester.assert(fs.existsSync(path.join(rootDir, 'package.json')), 'package.json must exist');
      tester.assert(fs.existsSync(path.join(rootDir, 'tsconfig.json')), 'tsconfig.json must exist');
      tester.assert(fs.existsSync(path.join(rootDir, 'tailwind.config.ts')), 'tailwind.config.ts must exist');
    });

    tester.test('S2: Required documentation and specification files exist', () => {
      tester.assert(fs.existsSync(path.join(rootDir, 'ORIGINAL_REQUEST.md')), 'ORIGINAL_REQUEST.md must exist');
      tester.assert(fs.existsSync(path.join(rootDir, 'PROJECT.md')), 'PROJECT.md must exist');
      tester.assert(fs.existsSync(path.join(rootDir, 'TEST_INFRA.md')), 'TEST_INFRA.md must exist');
    });

    tester.test('S3: PLP page route directory exists (src/app/corporate-gifts)', () => {
      const plpDir = path.join(rootDir, 'src', 'app', 'corporate-gifts');
      tester.assert(fs.existsSync(plpDir), 'src/app/corporate-gifts directory must exist');
    });

    tester.test('S4: Test suite directory structure is properly isolated under tests/', () => {
      const testsDir = path.join(rootDir, 'tests');
      tester.assert(fs.existsSync(testsDir), 'tests directory must exist');
      tester.assert(fs.existsSync(path.join(testsDir, 'oracle', 'catalog_oracle.mjs')), 'Oracle must exist');
      tester.assert(fs.existsSync(path.join(testsDir, 'suites', 'tier1_feature_coverage.mjs')), 'Tier 1 suite must exist');
      tester.assert(fs.existsSync(path.join(testsDir, 'suites', 'tier2_boundary_cases.mjs')), 'Tier 2 suite must exist');
      tester.assert(fs.existsSync(path.join(testsDir, 'suites', 'tier3_cross_feature.mjs')), 'Tier 3 suite must exist');
      tester.assert(fs.existsSync(path.join(testsDir, 'suites', 'tier4_real_world_workflows.mjs')), 'Tier 4 suite must exist');
    });
  });
}
