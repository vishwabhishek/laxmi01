#!/usr/bin/env node

/**
 * Unified E2E Test Suite Runner for Laxmi Enterprises Modernization
 * Node.js 24 native test runner orchestration with ephemeral Vite preview server.
 *
 * Usage:
 *   node tests/e2e/runner.js              # Run all tiers (Tiers 1–4)
 *   node tests/e2e/runner.js --tier=1     # Run Tier 1: Feature Coverage (125 tests)
 *   node tests/e2e/runner.js --tier=2     # Run Tier 2: Boundary Cases (50 tests)
 *   node tests/e2e/runner.js --tier=3     # Run Tier 3: Pairwise Combinations (15 tests)
 *   node tests/e2e/runner.js --tier=4     # Run Tier 4: Real-World Scenarios (6 tests)
 *   node tests/e2e/runner.js --skip-build # Skip build preflight
 */

import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { run } from 'node:test';
import { spec } from 'node:test/reporters';
import { fileURLToPath } from 'node:url';

import { startServer, stopServer } from './helpers/server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

// Parse command line arguments
const args = process.argv.slice(2);
let selectedTier = null;
let skipBuild = false;
let testFilter = null;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg.startsWith('--tier=')) {
    const rawVal = arg.split('=')[1];
    selectedTier = parseInt(rawVal, 10);
    if (![1, 2, 3, 4].includes(selectedTier)) {
      console.error(`❌ [CLI Error] Unknown tier: "${rawVal}". Valid tiers are 1, 2, 3, 4.`);
      process.exit(1);
    }
  } else if (arg === '-t') {
    const rawVal = args[i + 1];
    selectedTier = parseInt(rawVal, 10);
    if (![1, 2, 3, 4].includes(selectedTier)) {
      console.error(`❌ [CLI Error] Unknown tier: "${rawVal}". Valid tiers are 1, 2, 3, 4.`);
      process.exit(1);
    }
    i++;
  } else if (arg === '--skip-build') {
    skipBuild = true;
  } else if (arg.startsWith('--filter=')) {
    testFilter = arg.split('=')[1];
  }
}

const SUITE_MAP = {
  1: path.resolve(__dirname, 'suites/tier1-features.test.js'),
  2: path.resolve(__dirname, 'suites/tier2-boundaries.test.js'),
  3: path.resolve(__dirname, 'suites/tier3-interactions.test.js'),
  4: path.resolve(__dirname, 'suites/tier4-journeys.test.js')
};

async function main() {
  console.log('\n======================================================');
  console.log('   Laxmi Enterprises Modernization - E2E Test Suite');
  console.log('======================================================\n');

  // Step 1: Preflight build check
  const distIndexPath = path.resolve(projectRoot, 'dist/index.html');
  if (!skipBuild || !fs.existsSync(distIndexPath)) {
    console.log('📦 [Preflight] Running production build (npm run build)...');
    try {
      const buildStart = Date.now();
      execSync('npm run build', { cwd: projectRoot, stdio: 'pipe', encoding: 'utf8' });
      console.log(`✓ [Preflight] Production build completed in ${Date.now() - buildStart}ms\n`);
    } catch (err) {
      console.error('❌ [Preflight] Build failed:', err.message);
      if (err.stderr) console.error(err.stderr);
      process.exit(1);
    }
  } else {
    console.log('⚡ [Preflight] Skipping build (--skip-build specified and dist/ exists)\n');
  }

  // Step 2: Start Ephemeral Vite Preview Server
  console.log('🚀 [Server] Launching ephemeral Vite preview server (port 0)...');
  let serverInfo;
  try {
    serverInfo = await startServer({ forceBuild: false });
    console.log(`✓ [Server] Server running at: ${serverInfo.baseUrl}\n`);
  } catch (err) {
    console.error('❌ [Server] Failed to launch preview server:', err.message);
    process.exit(1);
  }

  // Step 3: Determine which files to execute
  let filesToRun = [];
  if (selectedTier) {
    if (SUITE_MAP[selectedTier]) {
      filesToRun = [SUITE_MAP[selectedTier]];
      console.log(`🎯 [Execution] Running Tier ${selectedTier} only (${path.basename(SUITE_MAP[selectedTier])})\n`);
    } else {
      console.error(`❌ [CLI Error] Unknown tier: "${selectedTier}". Valid tiers are 1, 2, 3, 4.`);
      process.exit(1);
    }
  } else {
    filesToRun = Object.values(SUITE_MAP);
    console.log(`🎯 [Execution] Running all 4 tiers (${filesToRun.length} suite files, 196 total tests)\n`);
  }

  // Step 4: Run Tests via node:test programmatic API
  const overallStart = Date.now();
  let passCount = 0;
  let failCount = 0;
  const failedTests = [];

  const runOptions = {
    files: filesToRun,
    concurrency: 1
  };

  const testStream = run(runOptions);

  testStream.on('test:pass', (t) => {
    // Top-level suite describe blocks also emit pass/fail; only count leaf tests
    if (t.details?.type === 'test' || !t.details?.type) {
      passCount++;
    }
  });

  testStream.on('test:fail', (t) => {
    failCount++;
    const fullErr = t.details?.error?.message || 'Assertion failed';
    const cleanErr = fullErr.split('\n')[0].slice(0, 150);
    failedTests.push({
      name: t.name,
      file: t.file ? path.basename(t.file) : 'unknown',
      error: cleanErr
    });
  });

  // Pipe to native spec reporter for clean terminal output
  testStream.compose(new spec()).pipe(process.stdout);

  // Wait for test stream completion
  await new Promise((resolve) => {
    testStream.on('end', resolve);
  });

  const totalDuration = ((Date.now() - overallStart) / 1000).toFixed(2);

  // Step 5: Graceful server shutdown
  console.log('\n🛑 [Server] Shutting down preview server...');
  await stopServer();
  console.log('✓ [Server] Server stopped.\n');

  // Step 6: Print Clean Summary
  console.log('======================================================');
  console.log('                   TEST RUN SUMMARY                   ');
  console.log('======================================================');
  console.log(`  Total Duration : ${totalDuration}s`);
  console.log(`  Passed Tests   : ${passCount}`);
  console.log(`  Failed Tests   : ${failCount}`);

  if (failedTests.length > 0) {
    console.log('\n❌ FAILED TESTS SUMMARY:');
    failedTests.forEach((f, idx) => {
      console.log(`  ${idx + 1}. [${f.file}] ${f.name}`);
      console.log(`     Error: ${f.error}`);
    });
    console.log('\n⚠️  Some assertions failed because site implementation (M2/M3) is in progress.');
    console.log('======================================================\n');
    process.exit(1);
  } else {
    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! (100% Green)');
    console.log('======================================================\n');
    process.exit(0);
  }
}

main().catch(async (err) => {
  console.error('\n❌ Unhandled error during test run:', err);
  try {
    await stopServer();
  } catch {}
  process.exit(1);
});
